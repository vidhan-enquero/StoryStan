import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Dashboard() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleLogout = () => {
    setUserInfo({ isAuthenticated: false });
  };
  return (
    <>
      <TitleBar />
      <SideBar />
      <Feed />
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
