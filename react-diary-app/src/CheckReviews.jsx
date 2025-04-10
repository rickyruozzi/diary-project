import React, { useState, useEffect } from 'react';

function CheckReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit]=useState(3);

    useEffect(() => {
        fetch('http://localhost:8000/reviews/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({limit:limit})
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
    }, [limit]);

    return (
        <div>
            <h3>Last {limit} reviews:</h3>
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
            <button onClick={()=>{setLimit(3)}}>3</button>
            <button onClick={()=>{setLimit(5)}}>5</button>
            <button onClick={()=>{setLimit(10)}}>10</button>
        </div>
    );
}

export default CheckReviews;
