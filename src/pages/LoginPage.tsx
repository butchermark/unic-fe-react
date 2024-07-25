import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AuthContext from "../context/AuthContext";
import LoginIcon from "@mui/icons-material/Login";
import { Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreateUserPanel } from "../components/RegistrationPanel";
import { signUser, registerUser } from "../services/auth.service";

export const LoginPage = () => {
  const ctx = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [userEmail, setCreateUserEmail] = useState("");
  const [userPassword, setCreateUserPassword] = useState("");
  const [isReload, setIsReload] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (isSubmit) {
        try {
          await signUser(
            ctx.email,
            password,
            ctx.setAccessToken,
            ctx.setRefreshToken,
            setIsSubmit,
            setIsLogin
          );
          ctx.setIsLoggedIn(true);
        } catch (error) {
          console.error("Error during user login:", error);
          ctx.setIsLoggedIn(false);
        }
      }
    };

    fetchData();
  }, [isSubmit, isReload]);

  const handleSubmit = () => {
    setIsSubmit(true);
  };

  const handleCreate = async () => {
    setCreatingUser(false);
    if (!userEmail || !userPassword) {
      window.alert("Please fill all the fields");
    } else if (regexExp.test(userEmail)) {
      try {
        await registerUser(
          userEmail,
          userPassword,
          setIsReload,
          setCreatingUser
        );
        ctx.setIsLoggedIn(true);
        navigate("/home");
      } catch (error) {
        console.error("Error during user registration:", error);
        ctx.setIsLoggedIn(false);
      }
    } else {
      window.alert("Please enter a valid email");
      ctx.setIsLoggedIn(false);
    }
  };

  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          maxWidth: null,
          minWidth: "100vw",
          margin: 0,
          padding: 0,
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <CreateUserPanel
          close={() => setCreatingUser(false)}
          status={creatingUser}
          method={"Create new User"}
          useremail={(e: any) => setCreateUserEmail(e.target.value)}
          userpassword={(e: any) => setCreateUserPassword(e.target.value)}
          submit={handleCreate}
        ></CreateUserPanel>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            paddingTop: 5,
            marginBottom: 5,
          }}
        ></Container>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: "black",
            }}
            fontFamily={"Raleway"}
          >
            Email
          </Typography>
          <TextField
            sx={[
              isLogin
                ? {
                    borderColor: "black",
                    borderWidth: 1,
                    borderRadius: "6px",
                    borderStyle: "solid",
                  }
                : { border: "1px solid red", borderRadius: 2 },
            ]}
            type="text"
            className="login-input-field"
            value={ctx.email}
            onChange={(e) => ctx.setEmail(e.target.value)}
          />
          <Typography
            sx={{
              color: "black",
              marginTop: 2,
            }}
            fontFamily={"Raleway"}
          >
            Password
          </Typography>
          <TextField
            sx={[
              isLogin
                ? {
                    borderColor: "black",
                    borderWidth: 1,
                    borderRadius: "6px",
                    borderStyle: "solid",
                  }
                : { border: "1px solid red", borderRadius: 2 },
            ]}
            type="password"
            className="login-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Container>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Button
            type="button"
            className="submit-button"
            disabled={isSubmit}
            onClick={handleSubmit}
            variant="outlined"
            sx={{
              marginTop: 2,
              marginBottom: 2,
              marginRight: 2,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: "10px",
              borderStyle: "solid",
            }}
          >
            <LoginIcon
              sx={{
                color: "black",
              }}
            />
          </Button>
          <Button
            sx={{
              borderColor: "black",
              borderWidth: 1,
              borderRadius: "10px",
              borderStyle: "solid",
            }}
            variant="outlined"
            onClick={() => setCreatingUser(true)}
          >
            <Typography
              fontFamily={"Raleway"}
              fontSize={"16px"}
              sx={{ color: "black" }}
            >
              Register
            </Typography>
          </Button>
        </Container>
      </Container>
    </Container>
  );
};
