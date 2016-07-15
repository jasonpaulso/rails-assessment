class NetworkSerializer < ActiveModel::Serializer
  attributes :id, :name, :shows, :slug
  has_many :shows
end
