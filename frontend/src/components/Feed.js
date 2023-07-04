
import './Feed.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';

import {
  collection,
  query,
  limit,
  where,
  getDocs,
  setDoc,
  doc,
  orderBy,
  updateDoc,
  serverTimestamp,
  getDoc,
  SnapshotMetadata,
} from "firebase/firestore";
import { database as db } from "../config/firebase";


const Feed = () => {



  
  
  const [err, setErr] = useState(false);
    const [data, setData] = useState([]);
  
    const genstory = async () => {
      const q = query(
        collection(db, "story"),
      );
  
      try {
        const querySnapshot = await getDocs(q);
        var arr = [];
        querySnapshot.forEach((doc) => arr.push(doc.data()));
        setData(arr);
        console.log(data);
      }
      catch (err)
      {
        setErr(true);
      }
     
    };
    useEffect(() => {
     
      genstory();
      console.log(data);
    }, []); 

  return (
    
    <div className="card-list">
      {data.map((sam, index) => (
        <div className="card" key={index}>
          <h2 className="card-heading">{sam.title}</h2>
          <p className="card-content">{sam.content}</p>
          <button className="card-button"> read more </button>
        </div>
      ))}
    </div>
  );
};

export default Feed;
