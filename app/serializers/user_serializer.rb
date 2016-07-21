class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug 
  has_many :shows
  has_many :networks
end
