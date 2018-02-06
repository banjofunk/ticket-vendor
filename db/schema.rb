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

ActiveRecord::Schema.define(version: 20171030165053) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pg_stat_statements"

  create_table "admission_taxes", force: :cascade do |t|
    t.integer "kind"
    t.integer "amount"
    t.string  "description"
    t.integer "transaction_taxable_id"
    t.string  "transaction_taxable_type"
  end

  create_table "admissions", force: :cascade do |t|
    t.string   "code",                        null: false
    t.integer  "transaction_id"
    t.date     "expires_at"
    t.datetime "created_at"
    t.integer  "promotion_id"
    t.json     "ticket_data",    default: {}
  end

  create_table "attractions", force: :cascade do |t|
    t.string  "name"
    t.boolean "active?",                     default: false
    t.boolean "sponsor?",                    default: false
    t.string  "description"
    t.string  "subtitle"
    t.text    "layout"
    t.string  "redemption_prefix", limit: 6
    t.integer "expiry_window",               default: 0
    t.string  "symbology"
    t.integer "position"
  end

  create_table "images", force: :cascade do |t|
    t.integer "kind"
    t.boolean "active?",        default: true
    t.string  "src"
    t.integer "imageable_id"
    t.string  "imageable_type"
    t.integer "position"
  end

  create_table "pages", force: :cascade do |t|
    t.string "name"
    t.json   "content"
  end

  create_table "promotions", force: :cascade do |t|
    t.boolean  "active?",       default: false
    t.integer  "position",      default: -1
    t.integer  "attraction_id"
    t.string   "title"
    t.string   "description"
    t.integer  "msrp"
    t.integer  "net_price"
    t.binary   "background"
    t.boolean  "redemption?",   default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "call_center?",  default: false
  end

  create_table "redemption_codes", primary_key: "code", id: :string, force: :cascade do |t|
    t.integer  "attraction_id",  null: false
    t.integer  "transaction_id"
    t.datetime "created_at"
    t.integer  "admission_id"
  end

  create_table "tax_joins", force: :cascade do |t|
    t.integer "tax_id"
    t.integer "taxable_id"
    t.string  "taxable_type"
  end

  create_table "taxes", force: :cascade do |t|
    t.integer "kind"
    t.integer "amount"
    t.string  "description"
  end

  create_table "transactions", force: :cascade do |t|
    t.string   "access_token"
    t.datetime "first_accessed_at"
    t.string   "first_accessed_from"
    t.datetime "created_at"
    t.string   "braintree_id"
    t.string   "email"
    t.string   "phone"
    t.integer  "total"
    t.index ["access_token"], name: "index_transactions_on_access_token", using: :btree
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
  add_foreign_key "promotions", "attractions"
  add_foreign_key "redemption_codes", "attractions"
  add_foreign_key "redemption_codes", "transactions"
end
