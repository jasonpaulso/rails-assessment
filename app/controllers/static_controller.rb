class StaticController < ApplicationController
  def index
    @show = Show.last
  end
end
