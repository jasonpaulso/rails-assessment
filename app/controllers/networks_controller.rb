class NetworksController < ApplicationController
  def index

    @networks = Network.all
  end


  def show
    # binding.pry
    @network = Network.find_by(slug:params[:id])
  end
end
