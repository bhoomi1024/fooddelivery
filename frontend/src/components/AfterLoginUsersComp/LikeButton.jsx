// src/components/AfterLoginUsersComp/LikeButton.js
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LikeButton = ({ isLiked, onLike }) => {
  const handleLike = (e) => {
    e.stopPropagation();
    const message = !isLiked ? "Restaurant liked!" : "Restaurant unliked!";
    toast(message, { type: !isLiked ? "success" : "info" });
    onLike();
  };

  return (
    <button
      className={`absolute top-2 right-2 p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
      onClick={handleLike}
    >
      <FaHeart />
    </button>
  );
};

export default LikeButton;
