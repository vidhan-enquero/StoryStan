import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Feed from "../components/Feed.js";
import Sidebar from "../components/SideBar.js"
import TitleBar from "../components/TitleBar.js"
import RightBar from "../components/RightBar.js"

export default function Dashboard() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleLogout = () => {
    setUserInfo({ isAuthenticated: false });
  };
  return (
    <>
    
    <TitleBar page="dashboard"/>
    <div style={{display : "flex" , flexDirection : "row" }}>
    <Sidebar/>
      <Feed />
      <RightBar/>
    </div>
      

    </>
  );

  // return (
  //   <div>
  //     <div>
  //       <ul>
  //         {Object.keys(userInfo).map((key) => (
  //           <li>
  //             {key}=={userInfo[key]}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //     <button onClick={handleLogout}>Logout</button>
  //   </div>
  // );
}
