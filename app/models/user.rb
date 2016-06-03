class User < ActiveRecord::Base
  has_many :user_shows
  has_many :shows, through: :user_shows
  has_many :actors, through: :shows
  has_many :networks, through: :shows
  
end
