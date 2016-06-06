class UsersController < ApplicationController
  load_resource :find_by => :slug, :only => :show
  def show
  end
end
