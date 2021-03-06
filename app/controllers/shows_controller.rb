class ShowsController < ApplicationController

  def index
    if params[:user_id]
        @user = User.find_by(slug: params[:user_id])
        if !@user.nil?
          @shows = @user.shows.order(:day)
          render_shows_format
        else
          flash[:error] = "That user does not exist."
          @shows = Show.all.order(:day)
          redirect_to shows_path
        end
    elsif params[:id]
        @network = Network.find_by(slug:params[:id])
        if !@network.nil?
          @shows = @network.shows.order(:day)
          render_shows_format
        else
          flash[:error] = "That network does not exist."
          redirect_to networks_path
        end
    else
      @shows = Show.all.order(:day)
      render_shows_format
    end
  end

  def show
      @show = Show.find_by(slug:params[:id])
      if !!@show
        respond_to do |format|
          format.html {render :show}
          format.json {render json: @show}
        end
      else
          flash[:error] = "That show does not exist."
          redirect_to shows_path
      end
  end

  def new
    @show = Show.new
    @network = Network.new
    @networks = Network.all
  end

  def edit
    @show = Show.find_by(slug:params[:id])
    if !@show.nil? && current_user.admin?
      @networks = Network.all
      render :edit
    else
      flash[:error] = "You are not authorized to edit shows or that show does not exist."
      redirect_to shows_path
    end
  end

   def update
    @show = Show.find_by(slug:params[:id])
    @show.update(show_params)
    redirect_to @show
  end

  def create
    if params[:remote_id] != nil
      if Show.find_by(remote_id: show_params[:remote_id]).remote_id != nil
        @show = Show.find_by(remote_id: show_params[:remote_id])
      end
    else
      @show = Show.create(show_params)

    end
    if @show.save
      current_user.shows << @show
      @network = @show.network
      render json: @show, status: 201, notice: 'Show was successfully created.'
    else
      @networks = Network.all
      render json: { errors: @show.errors }, status: 422
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
    params.require(:show).permit(:title, :day, :time, :description, :url, :remote_id, :network_id, network_attributes: [:name], actors: [:name])
  end

  def render_shows_format
      respond_to do |format|
      format.html {render :index}
      format.json {render json: @shows}
    end
  end

end
