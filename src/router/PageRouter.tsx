import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import HomePage from "../pages/HomePage";

export const PageRouter = () => {
  const { accessToken } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {accessToken && accessToken !== "" ? (
          <>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/*" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Navigate to="/login" />} />
            <Route path="/accounts" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
