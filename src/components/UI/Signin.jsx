import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToastError from "./ToastError";

const theme = createTheme();

export default function SignIn(props) {
  const [emailErr, setEmailErr] = useState(true);
  const [pswErr, setPswErr] = useState(true);
  const [emailVal, setEmailVal] = useState(null);
  const [pswVal, setPswVal] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let val = { email: data.get("email"), password: data.get("password") };
    // console.log(val);
    props.getData(val);
  };
  const validEmail = (e) => {
    return /\S+@\S+\.\S+/.test(e);
  };

  const handleChange = (event) => {
    event.length > 0 ? setEmailVal(true) : setEmailVal(false);
    if (!validEmail(event)) {
      setEmailErr(true);
      // setEmailVal("text");
    } else {
      setEmailErr(false);
    }
  };
  const handlePassword = (event) => {
    event.length > 0 ? setPswVal(true) : setPswVal(false);
    if (event.length > 8) {
      setPswErr(false);
    } else {
      setPswErr(true);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e.target.value)}
            />
            {/* {emailVal && emailErr && (
              <Alert severity="error">Invalid Email Format</Alert>
            )} */}
            {emailVal && emailErr && (
              <ToastError severity="error" message="Invalid Email format" />
            )}
            {/* <ToastError severity="error" validationData={{emailVal:emailVal,emailErr:emailErr}} /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handlePassword(e.target.value)}
            />
            {pswVal && pswErr && (
              <ToastError
                severity="error"
                valueVis="1000"
                message="Password must b 8 characters long"
              />
            )}
            {/* <ToastError severity="error" /> */}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {!props.isLoading ? (
              <Button
                disabled={emailErr || pswErr}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            ) : (
              <LoadingButton
                loading
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Signin in
              </LoadingButton>
            )}
            {props.loginError && (
              <Alert severity="error">{props.loginError}</Alert>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
