class UsersController < ApplicationController

  def show
    @user = User.find_by(slug:params[:id])
  end
  def index
    @users = User.all
  end

end
