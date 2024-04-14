import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ReviewDTO } from 'types/interface/review.interface';
import ReviewComp from './ReviewComp'

interface ReviewTabProps {
  productId: number;
}

const ReviewTabComp: React.FC<ReviewTabProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/reviews/${productId}`);
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className="grid grid-rows w-full">
      {reviews.map((review, index) => (
        <ReviewComp key={index} review={review} />
      ))}
    </div>
  )
}
export default ReviewTabComp;