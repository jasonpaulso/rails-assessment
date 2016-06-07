class Network < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :shows
  has_many :actors, through: :shows
  validates :name, length: { minimum: 2 }




end
