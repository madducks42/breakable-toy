class Api::V1::UsersController < ApiController
  # before_action :authorize_user, except: [:index, :show]
  def show
    render json: User.find(params[:id]), serializer: UserShowSerializer
  end

  def favorite
    favorite_status = params["favoriteStatus"]
    current_campground_id = params["campgroundID"].to_i
    current_user_id = current_user.id.to_i
    campground = Campground.find(params["campgroundID"]) 

    if favorite_status == "true"
      favorite = Favorite.find_by(campground_id: current_campground_id, user_id: current_user_id)
        if favorite.destroy
          render json: {favoriteCampground: false}
        end
    elsif favorite_status == "false"
      favorite = Favorite.new(user: current_user, campground: campground)
      if favorite.save
        render json: {favoriteCampground: true}
      end
    end
  end

end