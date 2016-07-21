class ShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :url, :slug, :time, :day, :network
  has_one :network, serializer: ShowNetworkSerializer
  has_many :users
end
