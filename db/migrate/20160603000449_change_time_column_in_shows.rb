class ChangeTimeColumnInShows < ActiveRecord::Migration
  def change
    change_column :shows, :time, :string
  end
end
