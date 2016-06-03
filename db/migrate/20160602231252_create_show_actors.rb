class CreateShowActors < ActiveRecord::Migration
  def change
    create_table :show_actors do |t|
      t.integer :actor_id
      t.integer :show_id

      t.timestamps null: false
    end
  end
end
