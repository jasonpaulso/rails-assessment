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
    @show = Show.new
    @network = Network.new
  end
  def create
    @show = Show.where(title:show_params[:title]).first_or_create(show_params)
    # raise params.inspect
    # @show.actors << Actor.find_or_create_by(name:show_params[:actors][:name])
    current_user.shows << @show if !current_user.shows.find_by(title:@show.title)
    redirect_to @show
  end

  private

  def show_params
    params.require(:show).permit(:title, :day, :time, network_attributes: [:name], actors: [:name])
  end

end
