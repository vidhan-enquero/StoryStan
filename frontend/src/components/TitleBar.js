import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function TitleBar(props) {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StoryStan
          </Typography>
          {props.page === "landing" ? (
            <>
              <a>
                <Button
                  style={{ color: "white" }}
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </a>
              <a>
                <Button
                  style={{ color: "white" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </a>
            </>
          ) : (
            <>
              <a>
                <Button
                  style={{ color: "white" }}
                  onClick={async () => {
                    await signOut(auth);
                    setUserInfo({ isAuthenticated: false });
                  }}
                >
                  Logout
                </Button>
              </a>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
