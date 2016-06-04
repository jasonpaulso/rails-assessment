class AddRatingToUserShows < ActiveRecord::Migration
  def change
    add_column :user_shows, :rating, :integer, :default => 0
  end
end
