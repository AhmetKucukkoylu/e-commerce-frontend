import React, { useEffect } from "react";
import { useUserReviews } from "../../context/UserReviewContext";
import UserReviewItem from "./UserReviewItem";
import UserReviewEditModal from "./UserReviewEditModal";

const UserReviewList = () => {
  const { userReviews, fetchUserReviews, loading, error } = useUserReviews();

  useEffect(() => {
    fetchUserReviews();
  }, [fetchUserReviews]);

  if (loading) return <p>Yorumlarınız yükleniyor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!userReviews.length) {
    return <p>Henüz hiç yorum yapmamışsınız.</p>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <UserReviewEditModal /> {/* Modal burada çalışır durumda durur */}
      {userReviews.map((review) => (
        <UserReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default UserReviewList;
