class Network < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :shows
  has_many :actors, through: :shows

  validates_presence_of :name
  validates_uniqueness_of :name, {case_sensitive: false, message: "Network exists in list above. Please select there." }





end
