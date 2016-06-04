class ChangeRatingInShows < ActiveRecord::Migration
  def change
    change_column :user_shows, :rating, :float, :default => 0
  end
end
