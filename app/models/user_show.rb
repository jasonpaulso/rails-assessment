class UserShow < ActiveRecord::Base
  belongs_to :show
  belongs_to :user

  def title
    show.title
  end

  def network
    show.network
  end
  def slug
    show.slug
  end

end
