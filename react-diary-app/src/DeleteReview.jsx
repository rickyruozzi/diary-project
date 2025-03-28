import React, { useState } from 'react';

function DeleteReview() {
  const [reviewId, setReviewId] = useState(''); // State for the review ID

  const handleDelete = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetch('http://localhost:8000/delete/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entry_id: reviewId }), // Send the review ID to the backend

    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="delete-review">
      <h2>Delete Review</h2>
      <p>Are you sure you want to delete this review?</p>
      <form onSubmit={handleDelete}>
        <label>
          Review ID:
          <input 
            type="text" 
            value={reviewId} 
            onChange={(e) => setReviewId(e.target.value)} // Update state on change
            required 
          />
        </label>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default DeleteReview;
