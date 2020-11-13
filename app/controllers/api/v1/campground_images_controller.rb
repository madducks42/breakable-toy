class Api::V1::CampgroundImagesController < ApiController

  def create
    campground_image = CampgroundImage.new(image_params)
    if campground_image.save
      render json: campground_image
    else
      render json: { errors: campground_image.errors.full_messages }
    end
  end

  def image_params
    params.permit([:image, :campground_id])
  end
end