import React, { useState } from "react"
import ErrorList from "./ErrorList"
import _ from 'lodash'

const CampgroundReviewFormContainer = (props) => {
  const [newReview, setNewReview] = useState({
    title: "",
    body: "",
    rating: "",
  });

  const [errors, setErrors] = useState({})
  const handleChange = event => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["title", "body", "rating"]
    
    requiredFields.forEach(field => {
      if (newReview[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    
    if (newReview["rating"] < 1 || newReview["rating"] > 5){
      submitErrors = {
        ...submitErrors,
        ["rating"]: "must be number between 1-5"
      }
    }

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (validForSubmission()) {
      props.addNewReview(newReview);
      setNewReview({
        title: "",
        body: "",
        rating: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}className="new-review-form callout">
      <h3>Leave A Review!</h3>
      <ErrorList errors={errors} />
      <label>
        Title:
        <input
          name="title"
          id="title"
          type="text"
          onChange={handleChange}
          value={newReview.title}
        />
      </label>
      <label>
        Body:
        <input
          name="body"
          id="body"
          type="text"
          onChange={handleChange}
          value={newReview.body}
        />
      </label>
      <label>
        Rating:
        <input
          name="rating"
          id="rating"
          type="text"
          onChange={handleChange}
          value={newReview.rating}
        />
      </label>
      <div className="button-group">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default CampgroundReviewFormContainer