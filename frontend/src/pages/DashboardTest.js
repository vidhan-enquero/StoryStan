import FeedContainer from "../components/FeedContainer";

import { Route, Routes, useNavigate } from "react-router-dom";
import WriteStory from "../components/WriteStory";
import Profile from "../components/Profile";

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Title Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-200 p-4 text-center z-10">
        <h1 className="font-bold">StoryStan</h1>
      </div>

      {/* Main Content */}
      <div className="flex pt-16 h-screen">
        {/* Sidebar */}
        <div className="w-1/6 bg-blue-900 text-white flex flex-col p-4">
          <button
            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              navigate("/dashboard/profile");
            }}
          >
            Profile
          </button>
          <button
            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              navigate("/dashboard/write");
            }}
          >
            Write Story
          </button>
          <button className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">
            Logout
          </button>
        </div>
        {/* <FeedContainer /> */}
        <Routes>
          <Route index element={<FeedContainer />} />
          <Route path="/write" element={<WriteStory />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/stockInfo/:stockId" element={<StockInfo />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route
            path="/profile"
            element={<Profile setAlerthandler={setAlerthandler} />}
          />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/deposit" element={<Deposit />} />
          <Route path="/wallet/withdraw" element={<Withdraw />} />
          <Route path="/deposit/wallet" element={<Wallet />} />
          <Route path="/learnings" element={<Learning />} /> */}
        </Routes>
        {/* < /> */}
      </div>
    </div>
  );
};

export default App;
