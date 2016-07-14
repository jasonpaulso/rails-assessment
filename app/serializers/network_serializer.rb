class NetworkSerializer < ActiveModel::Serializer
  attributes :id, :name, :shows
  has_many :shows
end
