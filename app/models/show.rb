class Show < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :network

  has_many :user_shows
  has_many :users, through: :user_shows

  # has_many :show_actors
  # has_many :actors, through: :show_actors


  validates_presence_of :network
  validates_associated :network

  validates_presence_of :description
  validates_presence_of :title


  def network_attributes=(network_attributes)
    self.network = Network.find_or_create_by(name:network_attributes[:name]) unless self.network_id
  end

  def rating
    self.user_shows.count
  end

  def self.most_popular_show
    self.joins(:user_shows).group("show_id").order("COUNT(*) DESC").limit(1).take
  end

end
