class AddImageUrlToShows < ActiveRecord::Migration
  def change
    add_column :shows, :url, :string
  end
end
