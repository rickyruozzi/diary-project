import React, { useState, useEffect } from 'react';

function CheckReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // TODO: Replace with actual API call
        const mockReviews = [
            { id: 1, date: '2023-11-01', content: 'Great experience' },
            { id: 2, date: '2023-11-02', content: 'Would recommend' },
            { id: 3, date: '2023-11-03', content: 'Excellent service' },
            { id: 4, date: '2023-11-04', content: 'Very satisfied' },
            { id: 5, date: '2023-11-05', content: 'Will come again' }
        ];
        setReviews(mockReviews);
    }, []);

    return (
        <div>
            <h3>Last 5 reviews: </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{review.date}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{review.content}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CheckReviews;
