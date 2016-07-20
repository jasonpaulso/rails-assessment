class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug 
  has_many :shows
end
