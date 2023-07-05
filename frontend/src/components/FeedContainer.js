import React, { useState, useEffect } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { database as db } from "../config/firebase";

import StoryCard from "./StoryCard ";

export default function FeedContainer() {
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    genstory();
    console.log(data);
  }, []);

  const genstory = async () => {
    const q = query(collection(db, "story"));

    try {
      const querySnapshot = await getDocs(q);
      var arr = [];
      querySnapshot.forEach((doc) => arr.push(doc.data()));
      setData(arr);
      console.log(data);
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      {/* Feed */}
      <div className="w-4/6 bg-white p-4 overflow-y-auto">
        {/* Feed content with stories */}
        {data.map((story) => {
          return <StoryCard story={story} />;
        })}
      </div>
      ;{/* Genre Selector */}
      <div className="w-1/6 bg-gray-200 p-4">
        <h3 className="font-bold mb-2">Select Genre</h3>
        {/* Genre options */}
        <div className="bg-white p-2 mb-2">Genre 1</div>
        <div className="bg-white p-2 mb-2">Genre 2</div>
        <div className="bg-white p-2 mb-2">Genre 3</div>
      </div>
      ;
    </>
  );
}
