class NetworksController < ApplicationController
    load_resource :find_by => :slug, :only => :show
  def index
    @networks = Network.all
  end
  def show
  end
end
