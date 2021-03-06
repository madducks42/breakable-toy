class Api::V1::UsersController < ApiController
  # before_action :authorize_user, except: [:index, :show]
  
  def show
    render json: User.find(params[:id]), serializer: UserShowSerializer
  end

  def favorite
    favorite_status = params["favoriteStatus"]
    current_campground_id = params["campgroundID"].to_i
    campground = Campground.find(params["campgroundID"]) 

    if current_user
      current_user_id = current_user.id.to_i
    end

    if favorite_status == "true" && current_user
      favorite = Favorite.find_by(campground_id: current_campground_id, user_id: current_user_id)
        if favorite.destroy
          render json: {favoriteCampground: false}
        end
    elsif favorite_status == "false" && current_user
      favorite = Favorite.new(user: current_user, campground: campground)
      if favorite.save
        render json: {favoriteCampground: true}
      end
    elsif
      render json: {favoriteCampground: nil}
    end
  end

  def index
    render json: User.all, each_serializer: AdminUserSerializer
  end

  # Not sure if this is needed?
  def edit
    # binding.pry
    render json: User.find(params[:id])
  end

  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render json: user
    else
      render json: { errors: user.errors.full_messages }
    end 
  end

  def destroy
    binding.pry
    user = User.find(params[:id])
    if user.destroy
      render json: {destroyed: true}
    end
  end

  protected

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :role)
  end

end