import React, { useState } from "react";

import ErrorList from '../../ErrorList'

const EditReviewTile = (props) => {
  
  const [review, setReview] = useState({
    title: props.review.title,
    body: props.review.body,
    rating: props.review.rating
  });

  const [errors, setErrors] = useState({})
  const handleChange = event => {
    setReview({
      ...review,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  // const validForSubmission = () => {
  //   let submitErrors = {}
  //   const requiredFields = ['title', 'body', 'rating']
    
  //   requiredFields.forEach(field => {
  //     debugger
  //     if (review[field].trim() === '') {
  //       submitErrors = {
  //         ...submitErrors,
  //         [field]: 'is blank'
  //       }
  //     }
  //   });
    
  //   if (review['rating'] < 1 || review['rating'] > 5){
  //     submitErrors = {
  //       ...submitErrors,
  //       ['rating']: 'must be number between 1-5'
  //     }
  //   };

  //   setErrors(submitErrors)
  //   return _.isEmpty(submitErrors)
  // };

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   if (validForSubmission()) {
  //     props.editReview(review);
  //     setReview({
  //       title: '',
  //       body: '',
  //       rating: '',
  //     })
  //   }
  // };

  const handleSubmit = event => {
    event.preventDefault();
    props.editReview(review);
    setReview({
      title: '',
      body: '',
      rating: '',
    })
  };

  return (
    <form onSubmit={handleSubmit}className='new-review-form callout'>
      <h3>Edit Review</h3>
      <ErrorList errors={errors} />
      <label>
        Title:
        <input
          name='title'
          id='title'
          type='text'
          onChange={handleChange}
          value={review.title}
        />
      </label>
      <label>
        Body:
        <input
          name='body'
          id='body'
          type='text'
          onChange={handleChange}
          value={review.body}
        />
      </label>
      <label>
        Rating:
        <input
          name='rating'
          id='rating'
          type='text'
          onChange={handleChange}
          value={review.rating}
        />
      </label>
      <div className='button-group'>
        <input className='button' type='submit' value='Submit' />
      </div>
    </form>
  );
};

export default EditReviewTile;