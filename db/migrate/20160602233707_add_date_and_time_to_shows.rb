class AddDateAndTimeToShows < ActiveRecord::Migration
  def change
    add_column :shows, :day, :string
    add_column :shows, :time, :time
  end
end
