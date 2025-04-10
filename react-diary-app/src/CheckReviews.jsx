import React, { useState, useEffect } from 'react';

function CheckReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/reviews/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format received');
            }
            setReviews(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setError(error.message);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <h3>Last 3 reviews:</h3>
            {loading ? (
                <p>Loading reviews...</p>
            ) : error ? (
                <p>Error loading reviews: {error}</p>
            ) : reviews.length === 0 ? (
                <p>No reviews found</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review._id || review.date || Math.random()}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{review.date}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{review.entry}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CheckReviews;
