class Show < ActiveRecord::Base
  has_many :user_shows
  belongs_to :network
  has_many :show_actors
  has_many :actors, through: :show_actors
end
