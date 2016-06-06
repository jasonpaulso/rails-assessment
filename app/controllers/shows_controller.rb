class ShowsController < ApplicationController
  load_resource :find_by => :slug, :only => :show
  # skip_authorize_resource :only => [:index, :show]
  # load_and_authorize_resource



  def index
    @shows = Show.all
  end
  def show
  end
  def new
    @network = Network.first_or_create(params[:network])
  end
  def create
    @show = Show.where(title:show_params[:title]).first_or_create(show_params)
    current_user.shows << @show if !current_user.shows.find_by(title:@show.title)
    redirect_to @show
  end

  private

  def show_params
    params.require(:show).permit(:title, :day, :time)
  end

end
