class AddRemoteIdToShows < ActiveRecord::Migration
  def change
    add_column :shows, :remote_id, :integer
  end
end
