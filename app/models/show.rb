class Show < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged

  has_many :user_shows
  belongs_to :network
  has_many :show_actors
  has_many :actors, through: :show_actors

  def rating
    user_shows.sum(:rating) / user_shows.count
  end
end
