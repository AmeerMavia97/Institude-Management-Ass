import * as React from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../../config/firebase/config";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Allstudent() {
  const navigate = useNavigate();

  const [AllStudentdata, setAllStudentdata] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Delete dialog state
  const [openDialog, setOpenDialog] = useState(false);

  // Student we want to delete
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Delete loading
  const [deleteLoading, setDeleteLoading] = useState(false);


  // ==============================
  // GET ALL STUDENTS
  // ==============================

  useEffect(() => {
    async function GetAllstudent() {
      try {
        setLoading(true);

        const q = query(
          collection(db, "AdmissionForm"),
          where("Type", "==", "Student")
        );

        const querySnapshot = await getDocs(q);

        const students = [];

        querySnapshot.forEach((document) => {
          students.push({
            docId: document.id,
            ...document.data(),
          });
        });

        setAllStudentdata(students);
      } catch (error) {
        console.error("Error getting students:", error);
      } finally {
        setLoading(false);
      }
    }

    GetAllstudent();
  }, []);


  // ==============================
  // OPEN DELETE CONFIRMATION
  // ==============================

  function handleDeleteClick(event, student, index) {
    // VERY IMPORTANT
    // Prevent AppBar onClick from firing
    event.stopPropagation();

    setStudentToDelete({
      student,
      index,
    });

    setOpenDialog(true);
  }


  // ==============================
  // CANCEL DELETE
  // ==============================

  function handleCancelDelete() {
    if (deleteLoading) return;

    setOpenDialog(false);
    setStudentToDelete(null);
  }


  // ==============================
  // CONFIRM DELETE
  // ==============================

  async function handleConfirmDelete() {
    if (!studentToDelete) return;

    try {
      setDeleteLoading(true);

      const { student, index } = studentToDelete;

      // Delete from Firestore
      await deleteDoc(
        doc(db, "AdmissionForm", student.docId)
      );

      // Remove from local state
      setAllStudentdata((prevStudents) =>
        prevStudents.filter((_, i) => i !== index)
      );

      // Close dialog
      setOpenDialog(false);
      setStudentToDelete(null);

    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setDeleteLoading(false);
    }
  }


  // ==============================
  // OPEN SINGLE STUDENT
  // ==============================

  function handleChange(studentUid) {
    console.log("Student UID:", studentUid);

    navigate(`/Admin/singlestudent/${studentUid}`);
  }


  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  // ==============================
  // UI
  // ==============================

  return (
    <>
      {AllStudentdata.length > 0 ? (
        AllStudentdata.map((item, index) => {
          return (
            <AppBar
              key={item.docId}
              position="static"
              onClick={() => handleChange(item.StudentUid)}
              sx={{
                marginBottom: 2,
                cursor: "pointer",
              }}
            >
              <Container
                maxWidth="xl"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Toolbar disableGutters>

                  {/* Avatar */}
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open student">
                      <Avatar
                        alt={`${item.FirstName} ${item.LastName}`}
                        src={item.StudentImage}
                      />
                    </Tooltip>
                  </Box>


                  {/* Student Name */}
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                      ml: 2,
                      display: {
                        xs: "none",
                        md: "flex",
                      },
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {item.FirstName} {item.LastName}
                  </Typography>

                </Toolbar>


                {/* DELETE BUTTON */}

                <DeleteIcon
                  onClick={(event) =>
                    handleDeleteClick(
                      event,
                      item,
                      index
                    )
                  }
                  sx={{
                    display: {
                      xs: "flex",
                    },
                    marginTop: 2,
                    cursor: "pointer",

                    "&:hover": {
                      color: "red",
                    },
                  }}
                />

              </Container>
            </AppBar>
          );
        })
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            mt: 4,
          }}
        >
          No students found.
        </Typography>
      )}


      {/* ================================= */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ================================= */}

      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>
          Delete Student?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>
              {studentToDelete?.student?.FirstName}{" "}
              {studentToDelete?.student?.LastName}
            </strong>
            ?

            <br />

            This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>

          {/* CANCEL */}

          <Button
            onClick={handleCancelDelete}
            disabled={deleteLoading}
          >
            Cancel
          </Button>


          {/* DELETE */}

          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Delete"
            )}
          </Button>

        </DialogActions>
      </Dialog>
    </>
  );
}

export default Allstudent;
