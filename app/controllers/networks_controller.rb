class NetworksController < ApplicationController
  def index
    @networks = Network.all
  end

  def show
    @network = Network.find_by(slug:params[:id])
    if !@network.nil?
      @network
    else
      flash[:error] = "That network does not exist."
      redirect_to networks_path
    end
  end
end
