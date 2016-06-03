class AddSlugToNetworks < ActiveRecord::Migration
  def change
    add_column :networks, :slug, :string
    add_index :networks, :slug, unique: true
  end
end
