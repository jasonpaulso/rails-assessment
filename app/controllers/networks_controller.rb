class NetworksController < ApplicationController
  def index
    @networks = Network.all
    respond_to do |f|
        f.html { render :index }
        f.json { render json: @networks }
    end
  end

  def show
    @network = Network.find_by(slug:params[:id])
    if !@network.nil?
        respond_to do |f|
        f.html { render :show }
        f.json { render json: @network }
      end
    else
      flash[:error] = "That network does not exist."
      redirect_to networks_path
    end
  end

end
