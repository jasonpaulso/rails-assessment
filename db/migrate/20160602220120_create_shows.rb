class CreateShows < ActiveRecord::Migration
  def change
    create_table :shows do |t|
      t.string :title
      t.integer :actor_id
      t.integer :network_id
    end
  end
end
