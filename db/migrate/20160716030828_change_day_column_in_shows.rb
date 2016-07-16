class ChangeDayColumnInShows < ActiveRecord::Migration
  def change
    change_column :shows, :day, :text, array: true, default: []
  end
end
