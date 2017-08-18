# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170801212720) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admissions", force: :cascade do |t|
    t.string   "code",                        null: false
    t.integer  "cost",           default: 0
    t.integer  "transaction_id"
    t.date     "expires_at"
    t.datetime "created_at"
    t.integer  "promotion_id"
    t.json     "ticket_data",    default: {}
  end

  create_table "affiliates", force: :cascade do |t|
    t.string  "name"
    t.boolean "active?",                     default: false
    t.integer "logo_image_id"
    t.integer "banners",                     default: [],    array: true
    t.boolean "attraction?",                 default: false
    t.integer "attraction_sort",             default: 0
    t.boolean "resort?",                     default: false
    t.integer "resort_sort",                 default: 0
    t.boolean "sponsor?",                    default: false
    t.integer "sponsor_sort",                default: 0
    t.string  "description"
    t.string  "short_description"
    t.text    "layout"
    t.string  "redemption_prefix", limit: 6
    t.integer "expiry_window",               default: 0
    t.string  "symbology"
  end

  create_table "attraction_skus", force: :cascade do |t|
    t.integer  "attraction_id",                      null: false
    t.binary   "background",                         null: false
    t.integer  "cost",               default: 0
    t.string   "description",                        null: false
    t.string   "question",                           null: false
    t.boolean  "redemption_default", default: false
    t.boolean  "creates_admission",  default: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  create_table "attractions", force: :cascade do |t|
    t.string   "name",                                    null: false
    t.text     "layout",                                  null: false
    t.string   "redemption_prefix", limit: 6
    t.integer  "expiry_window",               default: 0
    t.string   "symbology"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.index ["redemption_prefix"], name: "index_attractions_on_redemption_prefix", using: :btree
  end

  create_table "banner_collection_images", force: :cascade do |t|
    t.integer "banner_collection_id"
    t.integer "image_id"
    t.integer "position"
  end

  create_table "banner_collections", force: :cascade do |t|
    t.integer "page_id"
  end

  create_table "images", force: :cascade do |t|
    t.integer "kind"
    t.boolean "active?", default: true
    t.string  "src"
  end

  create_table "pages", force: :cascade do |t|
    t.string "name"
    t.json   "content"
  end

  create_table "promotion_taxes", force: :cascade do |t|
    t.integer "promotion_id"
    t.integer "tax_id"
  end

  create_table "promotions", force: :cascade do |t|
    t.boolean  "active?",            default: false
    t.integer  "position",           default: -1
    t.integer  "affiliate_id"
    t.integer  "image_id"
    t.string   "title"
    t.string   "subtitle"
    t.string   "short_description"
    t.string   "description"
    t.integer  "retail_in_cents"
    t.integer  "discount_in_cents"
    t.binary   "background"
    t.boolean  "redemption_default", default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "call_center?",       default: false
  end

  create_table "redemption_codes", primary_key: "code", id: :string, force: :cascade do |t|
    t.integer  "affiliate_id",   null: false
    t.integer  "transaction_id"
    t.datetime "created_at"
    t.integer  "admission_id"
  end

  create_table "sales", force: :cascade do |t|
    t.integer "redemption_code_id"
    t.string  "first_name"
    t.string  "last_name"
    t.integer "amount_in_cents"
    t.string  "card"
  end

  create_table "taxes", force: :cascade do |t|
    t.integer "kind"
    t.integer "amount"
    t.string  "description"
  end

  create_table "transaction_details", force: :cascade do |t|
    t.integer "transaction_id"
    t.string  "bt_id"
    t.string  "first_name"
    t.string  "last_name"
    t.string  "email"
    t.string  "phone"
    t.integer "total_in_cents"
    t.text    "summary"
  end

  create_table "transaction_line_items", force: :cascade do |t|
    t.integer "transaction_id"
    t.integer "promotion_id"
    t.integer "amount"
    t.integer "tax"
    t.integer "total"
    t.string  "tax_summary"
  end

  create_table "transactions", force: :cascade do |t|
    t.string   "ct_id"
    t.string   "gateway_authcode"
    t.string   "gateway_tx_id"
    t.string   "agent"
    t.string   "access_token"
    t.datetime "first_accessed_at"
    t.string   "first_accessed_from"
    t.datetime "created_at"
    t.index ["access_token"], name: "index_transactions_on_access_token", using: :btree
    t.index ["ct_id"], name: "index_transactions_on_ct_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "roles",                  default: [],              array: true
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "admissions", "promotions"
  add_foreign_key "admissions", "transactions"
  add_foreign_key "attraction_skus", "attractions"
  add_foreign_key "promotions", "affiliates"
  add_foreign_key "redemption_codes", "affiliates"
  add_foreign_key "redemption_codes", "transactions"
end
