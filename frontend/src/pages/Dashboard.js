import { useContext, useEffect } from "react";
import Feed from "../components/Feed.js";
import RightBar from "../components/RightBar.js";
import Sidebar from "../components/SideBar.js";
import TitleBar from "../components/TitleBar.js";

import { functions } from "../config/firebase.js";
import { httpsCallable } from "firebase/functions";
import { UserContext } from "../context/UserContext.js";

export default function Dashboard() {
  // const { userInfo } = useContext(UserContext);

  useEffect(() => {
    // const fetchData = async () => {
    //   // const verifyUser = httpsCallable(functions, "verifyUser");
    //   const response = await fetch(
    //     "https://us-central1-storystan-5ff27.cloudfunctions.net/verifyUser",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         token: userInfo.accessToken
    //       }),
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     }
    //   );
    //   if (response.status === 200) {
    //     alert("Successfully verified the user");
    //   } else {
    //     alert("Not verified");
    //   }
    // };
    // fetchData();
  });

  return (
    <>
      <TitleBar page="dashboard" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}
