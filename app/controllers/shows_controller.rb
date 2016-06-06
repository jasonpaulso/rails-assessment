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
  end
  def create
    @show = Show.create(show_params)
    redirect_to @show
  end

  private

  def show_params
    params.require(:show).permit(:title, :network, :day, :time)
  end

end
