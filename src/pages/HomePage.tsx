import { Box, Typography } from "@mui/material";
import BooksGrid from "../components/BooksGrid";
import LogoutButton from "../components/LogoutButton";

const HomePage = () => {
  return (
    <Box>
      <Typography>Home Page</Typography>
      <BooksGrid />
      <LogoutButton />
    </Box>
  );
};

export default HomePage;
