import React from "react";

export default function StoryCard({ story }) {
  return (
    <div className="border border-gray-300 mb-4 p-4">
      <h3 className="font-bold mb-2">Title of the story</h3>
      <p>{story.content}</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
        Likes
      </button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
        Comments
      </button>
    </div>
  );
}
