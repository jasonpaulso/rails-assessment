class ChangeValueInDayColumnInShows < ActiveRecord::Migration
  def change
    change_column :shows, :day, :text, default: "Shedule unknown. Please edit this show to add its air day."
  end
end
