class Show < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged

  has_many :user_shows
  belongs_to :network
  has_many :show_actors
  has_many :actors, through: :show_actors

  def rating
    if user_shows.empty?
      return "Not yet rated"
    else
      ((user_shows.sum(:rating) / user_shows.count)*2).floor.to_f / 2
    end
  end
end
