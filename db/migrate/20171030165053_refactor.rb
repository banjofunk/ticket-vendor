class Refactor < ActiveRecord::Migration[5.0]
  def change
    drop_table :attraction_skus
    drop_table :attractions
    rename_table :affiliates, :attractions

    create_table :tax_joins do |t|
      t.integer :tax_id
      t.integer :taxable_id
      t.string :taxable_type
    end

    create_table :admission_taxes do |t|
      t.integer :kind
      t.integer :amount
      t.string :description
      t.integer :transaction_taxable_id
      t.string :transaction_taxable_type
    end

    rename_column :attractions, :short_description, :subtitle
    rename_column :promotions, :affiliate_id, :attraction_id
    rename_column :promotions, :discount_in_cents, :net_price
    rename_column :promotions, :redemption_default, :redemption?
    rename_column :promotions, :retail_in_cents, :msrp
    rename_column :redemption_codes, :affiliate_id, :attraction_id

    add_column :attractions, :position, :integer
    add_column :images, :imageable_id, :integer
    add_column :images, :imageable_type, :string
    add_column :images, :position, :integer

    add_column :transaction_details, :agent, :string
    add_column :transactions, :braintree_id, :string
    add_column :transactions, :email, :string
    add_column :transactions, :phone, :string
    add_column :transactions, :total, :integer


    sql = "SELECT * from transaction_details"
    transaction_details = ActiveRecord::Base.connection.execute(sql)
    transaction_details.to_a.each do |det|
      txn = Transaction.find(det['transaction_id'])
      txn.braintree_id = det['bt_id']
      txn.total = det['total_in_cents']
      txn.email = det['email']
      txn.phone = det['phone']
      txn.save
    end

    Page.all.each do |page|
      Image.of_kind(:banner).last(5).each do |banner|
        page.banners.create(src: banner.src, position: banner.position)
      end
    end

    Promotion.all.each do |p|
      p.promotion_image_attributes = {src: Image.find_by_id(p.image_id).try(:src)}
      p.description = "#{p.title} - #{p.short_description.gsub('-', '')}"
      p.title = p.short_description
      p.save
    end

    Attraction.all.each.with_index(1) do |attraction, position|
      attraction.position = position
      logo = Image.find_by_id(attraction.logo_image_id).try(:src)
      attraction.logo_attributes = {src: logo}
      attraction_image = attraction.promotions.map(&:promotion_image).compact.try(:first).try(:src)
      attraction.attraction_image_attributes = {src: attraction_image} if attraction_image
      attraction.save
    end

    sql = "SELECT * from promotion_taxes"
    promotion_taxes = ActiveRecord::Base.connection.execute(sql)
    promotion_taxes.to_a.each do |pt|
      p = Promotion.find(pt['promotion_id'])
      p.taxes << Tax.find(pt['tax_id'])
    end

    remove_column :admissions, :cost, :integer
    remove_column :attractions, :attraction_sort, :integer
    remove_column :attractions, :attraction?, :boolean
    remove_column :attractions, :banners, :integer
    remove_column :attractions, :logo_image_id, :integer
    remove_column :attractions, :resort_sort, :integer
    remove_column :attractions, :resort?, :boolean
    remove_column :attractions, :sponsor_sort, :integer
    remove_column :promotions, :image_id, :integer
    remove_column :promotions, :short_description, :string
    remove_column :promotions, :subtitle, :string
    remove_column :transaction_details, :bt_id, :string
    remove_column :transaction_details, :summary, :json
    remove_column :transaction_details, :total_in_cents, :integer
    remove_column :transactions, :agent, :string
    remove_column :transactions, :ct_id, :string
    remove_column :transactions, :gateway_authcode, :string
    remove_column :transactions, :gateway_tx_id, :string

    drop_table :banner_collection_images
    drop_table :banner_collections
    drop_table :sales
    drop_table :transaction_details
    drop_table :transaction_line_items
    drop_table :promotion_taxes

  end
end
