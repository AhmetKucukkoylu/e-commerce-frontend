import React from "react";
import { useUserReviews } from "../../context/UserReviewContext";
import UserReviewList from "./UserReviewList";

const MyReviewsPage = () => {
  return (
    <div>
      <div className="reviews-container">
        <h2>Yorumlarım</h2>
        <UserReviewList />
      </div>
    </div>
  );
};

export default MyReviewsPage;
