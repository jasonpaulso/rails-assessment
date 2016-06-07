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

  def edit
    @show = Show.find_by(slug:params[:id])
  end

  def create
    @show = Show.where(title:show_params[:title]).first_or_create(show_params)
    # raise params.inspect
    if @show.save
      current_user.shows << @show if !current_user.shows.find_by(title:@show.title)
      redirect_to @show
    else
      flash[:error] = "You cannot perform this action."
      render :new
    end
  end

  def destroy
    @show = Show.find_by(slug:params[:id])
    if current_user.admin?
      @show.destroy
      redirect_to shows_path
    else
      flash[:error] = "You cannot perform this action."
      redirect_to @show
    end
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

  def add_to_user_shows
    show = Show.find_by(slug:params[:show_id])
    if user_signed_in?
      current_user.shows << show
      redirect_to current_user
    else
      flash[:error] = "You cannot perform this action."
      redirect_to show
    end
  end


  private

  def show_params
    params.require(:show).permit(:title, :day, :time, :description, :network_id, network_attributes: [:name], actors: [:name])
  end

end
