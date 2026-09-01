import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../config/firebase/config";

import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import {
  useTheme,
} from "@mui/material/styles";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  styled,
} from "@mui/material/styles";

import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  CircularProgress,
} from "@mui/material";


const CLOUD_NAME = "dojri6t9l";
const UPLOAD_PRESET = "institute";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight:
        ITEM_HEIGHT * 4.5 +
        ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(
  name,
  personName,
  theme
) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      <Link color="inherit" href="https://mui.com/">
        Ameer Muavia
      </Link>{' '}
      {2024}
      {"."}
    </Typography>
  );
}


const defaultTheme = createTheme();


export default function SignUp({
  Addcourse,
}) {

  const [courseAdd, setCourseAdd] =
    useState([]);

  const [Loading, setLoading] =
    useState(false);

  const [
    SelectImg,
    setSelectImg,
  ] = useState(null);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");


  const navigate =
    useNavigate();

  const theme =
    useTheme();

  const [
    personName,
    setPersonName,
  ] =
    React.useState([]);


  useEffect(() => {
    const GetCourseInfirebase = async () => {
      try {
        console.log("Fetching courses...");

        const snapshot = await getDocs(
          collection(db, "Course")
        );

        console.log("Course documents:", snapshot.size);

        const courses = snapshot.docs.map((doc) => {
          const data = doc.data();

          console.log("Course:", doc.id, data);

          return {
            id: doc.id,
            ...data,
          };
        });

        console.log("All courses:", courses);

        setCourseAdd(courses);

      } catch (error) {
        console.error(
          "COURSE FETCH ERROR:",
          error
        );
      }
    };

    GetCourseInfirebase();
  }, []);


  const handleChange = (
    event
  ) => {

    const {
      target: {
        value,
      },
    } = event;

    setPersonName(
      typeof value === "string"
        ? value.split(",")
        : value
    );

  };


  const FileChange = (
    e
  ) => {

    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectImg(file);

  };


  const uploadToCloudinary =
    async (file) => {

      if (!file) {
        throw new Error(
          "Please select an image."
        );
      }


      if (
        !CLOUD_NAME ||
        CLOUD_NAME ===
        "YOUR_CLOUD_NAME"
      ) {
        throw new Error(
          "Cloudinary cloud name is missing."
        );
      }


      if (
        !UPLOAD_PRESET ||
        UPLOAD_PRESET ===
        "YOUR_UNSIGNED_UPLOAD_PRESET"
      ) {
        throw new Error(
          "Cloudinary upload preset is missing."
        );
      }


      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        UPLOAD_PRESET
      );


      const response =
        await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result?.error?.message ||
          "Image upload failed."
        );

      }


      return result.secure_url;

    };


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setLoading(true);
      setErrorMessage("");


      try {

        const data =
          new FormData(
            event.currentTarget
          );


        const Email =
          data
            .get("email")
            ?.trim();

        const Password =
          data.get("password");

        const FirstName =
          data
            .get("firstName")
            ?.trim();

        const LastName =
          data
            .get("lastName")
            ?.trim();

        const Address =
          data
            .get("address")
            ?.trim();

        const Gender =
          data
            .get("Gender")
            ?.trim();


        if (!SelectImg) {
          throw new Error(
            "Please select a student image."
          );
        }


        if (
          !personName.length
        ) {
          throw new Error(
            "Please select a course."
          );
        }


        /*
         * 1. CREATE FIREBASE AUTH USER
         */
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            Email,
            Password
          );


        const user =
          userCredential.user;


        /*
         * 2. UPLOAD IMAGE TO CLOUDINARY
         */
        const imageUrl =
          await uploadToCloudinary(
            SelectImg
          );


        console.log(
          "Cloudinary image URL:",
          imageUrl
        );


        /*
         * 3. SAVE USER DETAILS TO FIRESTORE
         */
        await addDoc(
          collection(
            db,
            "AdmissionForm"
          ),
          {
            FirstName,
            LastName,
            Email,
            Address,
            Course:
              personName[0],
            Gender,
            Type:
              "Student",
            StudentImage:
              imageUrl,
            StudentUid:
              user.uid,
          }
        );


        /*
         * 4. NAVIGATE AFTER SUCCESS
         */
        navigate(
          "/student"
        );

      } catch (error) {

        console.error(
          "Registration error:",
          error
        );


        if (
          error?.code ===
          "auth/email-already-in-use"
        ) {

          setErrorMessage(
            "This email is already registered."
          );

        } else if (
          error?.code ===
          "auth/weak-password"
        ) {

          setErrorMessage(
            "Password is too weak."
          );

        } else if (
          error?.code ===
          "auth/invalid-email"
        ) {

          setErrorMessage(
            "Please enter a valid email."
          );

        } else {

          setErrorMessage(
            error?.message ||
            "Something went wrong."
          );

        }

      } finally {

        setLoading(false);

      }

    };


  return (
    <ThemeProvider
      theme={
        defaultTheme
      }
    >

      <Container
        component="main"
        maxWidth="xs"
      >

        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display:
              "flex",
            flexDirection:
              "column",
            alignItems:
              "center",
          }}
        >

          <Avatar
            sx={{
              m: 1,
              bgcolor:
                "secondary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>


          <Typography
            component="h1"
            variant="h5"
          >
            Admission Form
          </Typography>


          <Box
            component="form"
            noValidate
            onSubmit={
              handleSubmit
            }
            sx={{
              mt: 3,
            }}
          >

            <Grid
              container
              spacing={2}
            >

              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>


              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>


              <FormControl
                sx={{
                  marginTop: 2,
                  marginLeft: 2,
                  width: 480,
                }}
              >

                <InputLabel
                  id="Course"
                >
                  Course
                </InputLabel>


                <Select
                  labelId="Course"
                  id="Course"
                  multiple
                  value={
                    personName
                  }
                  onChange={
                    handleChange
                  }
                  input={
                    <OutlinedInput
                      label="Course"
                    />
                  }
                  MenuProps={
                    MenuProps
                  }
                >

                  {courseAdd.map(
                    (item) => (
                      <MenuItem
                        key={
                          item.CourseName
                        }
                        value={
                          item.CourseName
                        }
                        style={
                          getStyles(
                            item.CourseName,
                            personName,
                            theme
                          )
                        }
                      >
                        {
                          item.CourseName
                        }
                      </MenuItem>
                    )
                  )}

                </Select>

              </FormControl>


              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id="Gender"
                  label="Gender"
                  name="Gender"
                />
              </Grid>


              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>


              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                />
              </Grid>


              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>


              <Grid
                item
                xs={12}
              >

                <Button
                  component="label"
                  variant="contained"
                  startIcon={
                    <CloudUploadIcon />
                  }
                >
                  Upload file

                  <VisuallyHiddenInput
                    onChange={
                      FileChange
                    }
                    type="file"
                    accept="image/*"
                  />

                </Button>


                {SelectImg && (
                  <Typography
                    variant="caption"
                    sx={{
                      display:
                        "block",
                      mt: 1,
                    }}
                  >
                    {
                      SelectImg.name
                    }
                  </Typography>
                )}

              </Grid>

            </Grid>


            {errorMessage && (
              <Typography
                sx={{
                  color:
                    "error.main",
                  mt: 2,
                }}
              >
                {errorMessage}
              </Typography>
            )}


            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={
                Loading
              }
              sx={{
                mt: 3,
                mb: 2,
                minHeight: 46,
              }}
            >

              {Loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color:
                      "white",
                  }}
                />
              ) : (
                "Admission"
              )}

            </Button>


            <Grid
              container
              justifyContent="flex-end"
            >

              <Grid item>

                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() =>
                    navigate("/")
                  }
                >
                  Already have an account? Sign in
                </Link>

              </Grid>

            </Grid>

          </Box>

        </Box>


        <Copyright
          sx={{
            mt: 5,
          }}
        />

      </Container>

    </ThemeProvider>
  );
}
