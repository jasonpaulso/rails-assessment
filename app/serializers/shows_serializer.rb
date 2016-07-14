class ShowsSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_one :network
end
