class ShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :url, :slug
  has_one :network, serializer: ShowNetworkSerializer
  # has_many :users
end
