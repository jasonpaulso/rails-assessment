class Actor < ActiveRecord::Base
  has_many :show_actors
  has_many :shows, through: :show_actors
  has_many :networks, through: :shows
  validates :title, presence: true
end
