class ShowsController < ApplicationController

  def index
    @shows = Show.all
  end
  def show
    @show = Show.find_by(slug:params[:id])
  end
  def new
    @show = Show.new
    @network = Network.new
  end
  def create
    @show = Show.where(title:show_params[:title]).first_or_create(show_params)
    current_user.shows << @show if !current_user.shows.find_by(title:@show.title)
    redirect_to @show
  end

  def remove_from_user_shows
    @user = User.find_by(slug:params[:user_id])
    show = Show.find_by(slug:params[:show_id])
    if @user == current_user
      @user.shows.delete(show)
      redirect_to @user
    else
      flash[:error] = "You cannot perform this action."
      redirect_to @user
    end
  end


  private

  def show_params
    params.require(:show).permit(:title, :day, :time, network_attributes: [:name], actors: [:name])
  end

end
