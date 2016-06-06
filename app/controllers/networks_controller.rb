class NetworksController < ApplicationController
  def index
    @networks = Network.all
  end
  def show
    @network = Network.find_by(slug:params[:id])
  end
end
