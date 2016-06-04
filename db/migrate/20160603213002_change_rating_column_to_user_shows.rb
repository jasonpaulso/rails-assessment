class ChangeRatingColumnToUserShows < ActiveRecord::Migration
  def change
    change_column :user_shows, :rating, :decimal, :default => 0
  end
end
