import React from "react";

const Card = ({ title, content }) => {
  return (
    <div className="space-y-2 p-4 border-2 border-black bg-gray-700 max-w-sm rounded-2xl shadow-md">
      <h3 className="font-semibold text-lg text-yellow-400">{title}</h3>
      <p className="text-white">
        {content}
      </p>
    </div>
  );
};
export default Card;