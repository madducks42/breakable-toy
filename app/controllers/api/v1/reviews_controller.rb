class Api::V1::ReviewsController < ApiController
  def create 
    campground = Campground.find(params[:campground_id])
    new_review = Review.new(review_params)
    new_review.campground = campground 
    new_review.user = current_user

    if new_review.save
      render json: new_review
    else
      render json: { errors: new_review.errors.full_messages }
    end
  end

  def update
    binding.pry
    review = Review.find(params[:id])
    biding.pry
    if review.update(review_params)
      render json: review
    else
      render json: { errors: review.errors.full_messages }
    end 
    
  end

  protected

  def review_params
    params.require(:review).permit([:title, :body, :rating])
  end
end