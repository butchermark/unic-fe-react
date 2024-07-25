import { Button } from "@mui/material";

const LogoutButton = () => {
  return (
    <Button
      onClick={() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
