import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import _ from 'lodash'

import ImagesTile from './ShowComponents/ImagesTile'
import DescriptionTile from './ShowComponents/DescriptionTile'
import AmenitiesTile from './ShowComponents/AmenitiesTile'
import ReviewForm from './ReviewForm'
import ReviewsContainer from './ShowComponents/ReviewsContainer'

const CampgroundShowContainer = (props) => {
  const[campgroundShow, setCampgroundShow] = useState({})
  const[currentUser, setCurrentUser] = useState({})
  const[reviews, setReviews] = useState([])
  
  useEffect(() => {
    let id = props.match.params.id
    fetch(`/api/v1/campgrounds/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Errror(errorMessage)
        throw error
      }
    })
    .then(body => {
      setCampgroundShow(body)
      setReviews(body.reviews)
      if (body.currentUser != null) {
        setCurrentUser(body.currentUser)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, []);
  
  const addNewReview = (formData) => {
    fetch(`/api/v1/campgrounds/${props.match.params.id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(formData),
      credentials: 'same-origin',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(body => {
      setReviews([...reviews, body]);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  // const editReview = (message) => {
  //   let reviewId = message.id;
  //   let payload = message.review;
  //   fetch(`/api/v1/giraffes/${id}/reviews/${reviewId}`, {
  //     credentials: "same-origin",
  //     method: "PATCH",
  //     body: JSON.stringify(payload),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         let errorMessage = `${response.status} (${response.statusText})`,
  //           error = new Error(errorMessage);
  //         throw error;
  //       }
  //     })
  //     .then((response) => response.json())
  //     .then((updatedReview) => {
  //       if (!updatedReview.errors) {
  //         let reviewIndex = giraffe.reviews.findIndex(
  //           (review) => review.id === updatedReview.id
  //         );

  //         let tempReviews = [...giraffe.reviews];
  //         tempReviews.splice(reviewIndex, 1, updatedReview);

  //         setGiraffe({
  //           ...giraffe,
  //           reviews: tempReviews,
  //         });
  //       } else if (review.errors) {
  //         setErrors(review.errors);
  //       }
  //     })
  //     .catch((error) => console.error(`Error in fetch: ${error.message}`));
  // };

  // const deleteReview = (message) => {
  //   let reviewId = message.id;

  //   fetch(`/api/v1/giraffes/${id}/reviews/${reviewId}`, {
  //     credentials: "same-origin",
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         let errorMessage = `${response.status} (${response.statusText})`,
  //           error = new Error(errorMessage);
  //         throw error;
  //       }
  //     })
  //     .then((response) => response.json())
  //     .then((removeReview) => {
  //       if (!removeReview.errors) {
  //         let reviewIndex = giraffe.reviews.findIndex(
  //           (review) => review.id === removeReview.id
  //         );

  //         let tempReviews = [...giraffe.reviews];
  //         tempReviews.splice(reviewIndex, 1);

  //         setGiraffe({
  //           ...giraffe,
  //           reviews: tempReviews,
  //         });
  //       } else if (review.errors) {
  //         setErrors(review.errors);
  //       }
  //     })
  //     .catch((error) => console.error(`Error in fetch: ${error.message}`));
  // };

  let reviewForm
  if (campgroundShow.userSignedIn) {
    reviewForm = <ReviewForm addNewReview={addNewReview}/>
  }

  let noReviewsMessage = ""

  if (reviews.length === 0) {
    noReviewsMessage = "No reviews yet."
  }

  let averageRatingMessage = campgroundShow.averageRating
  if (averageRatingMessage === null) {
    averageRatingMessage = "No ratings yet."
  }

  return (
    <div className='grid-container fluid show-container wrapper'>
      <div className='grid-x grid-margin-x'>
        <div className='cell auto'>
          < ImagesTile />
        </div>
      </div>
      <div className='grid-x grid-margin-x'>
        <div className='cell auto'>
          < DescriptionTile 
            key={campgroundShow.id}
            campgroundLink={campgroundShow.campground_link}
            name={campgroundShow.name}
            description={campgroundShow.description}
            location={campgroundShow.location}
          />
        </div>
      </div>
      <div className='grid-x grid-margin-x amenities-container'>
        <div className='cell small-4'>Placeholder for map</div>
        <div className='cell auto'>
        < AmenitiesTile 
            key={campgroundShow.id}
            campgroundLink={campgroundShow.campground_link}
            dogsAllowed={campgroundShow.dogs_allowed}
            electronicHookups={campgroundShow.electronic_hookups}
            waterHookups={campgroundShow.water_hookups}
            potableWater={campgroundShow.potable_water}
            dumpStation={campgroundShow.dump_station}
            bathrooms={campgroundShow.bathrooms}
            showers={campgroundShow.showers}
          />
        </div>
      </div>
      {currentUser.role === 'admin' && <div className='grid-x grid-margin-x admin-flex'>
        <Link className='admin-link' to={`/campgrounds/${campgroundShow.id}/update`}>Update Campground</Link>
        <Link className='admin-link' to={`/campgrounds/${campgroundShow.id}/destroy`}>Delete Campground</Link>
      </div>}
      <div className='grid-x grid-margin-x'>
        <div className='cell'>
          {reviewForm}
        </div>
      </div>
      <div className='grid-x grid-margin-x reviews-container'>
        <div className='cell'>
          <h3>Average Rating: {averageRatingMessage}</h3>
          <h3>Reviews: {noReviewsMessage}</h3>
          <ReviewsContainer
            reviews={reviews}
            currentUser={currentUser}
            // editReview={editReview}
            // deleteReview={deleteReview}
          />
        </div>
      </div>
    </div>
  )
}

export default CampgroundShowContainer