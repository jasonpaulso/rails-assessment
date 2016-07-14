class ShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  has_one :network, serializer: ShowNetworkSerializer
  # has_many :users
end
