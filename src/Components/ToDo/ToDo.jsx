import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { shadows } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { toDoContext } from "../../Contexts/ToDoContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const ToDo = ({ todo, handelCheckd }) => {
  const { lisdToDo, setLisdToDo } = useContext(toDoContext);

  const handelCheck = () => {
    // handelCheckd(todo.id);
    const updateToDo = lisdToDo.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setLisdToDo(updateToDo);
    // alert( todo.id)

    //To save to storage (4)
    localStorage.setItem("todos", JSON.stringify(updateToDo));
  };

  //delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handelDeleteClick = () => {
    setShowDeleteModal(true);
  };
  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };
  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    handleCloseModal();
  };

  const handleDeleteConfirm = () => {
    const updateTodos = lisdToDo.filter((t) => {
      // if(t.id == todo.id) {
      //   return false
      // } else {
      //   return true
      // }
      return t.id != todo.id;
    });

    setLisdToDo(updateTodos);
    //To save to storage (5)
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  };

  //Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    description: todo.description,
  });
  const handleCloseEdit = () => {
    setShowEditModal(false);
  };
  const handleCloseEditModal = (e, reason) => {
    if (reason && reason == "backdropClick") return;
    handleCloseEdit();
  };
  const handleEdit = () => {
    setShowEditModal(true);
  };
  const handleUpdateConfirm = () => {
    const updatedTodo = lisdToDo.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: updateTodo.title,
          description: updateTodo.description,
        };
      } else {
        return t;
      }
    });
    setLisdToDo(updatedTodo);
    setShowEditModal(false);
    //To save to storage (6)
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  };

  return (
    <>
      {/* Edit Task */}
      <Dialog
        open={showEditModal}
        onClose={() => {
          handleCloseEditModal();
        }}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            // type="text"
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Content"
            // type="text"
            fullWidth
            variant="standard"
            value={updateTodo.description}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleUpdateConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
      {/* ====Edit Task==== */}

      {/* delete Modal */}
      <Box
        sx={{
          position: "absolute", //important
          height: 300,
          flexGrow: 1,
          minWidth: 300,
          transform: "translateZ(0)",
          "@media all and (-ms-high-contrast: none)": {
            display: "none",
          },
        }}
      >
        <Modal
          onClose={() => {
            handleClose();
          }}
          // disablePortal                    //?
          // disableEnforceFocus                      //?
          // disableBackdropClick       //?
          // disableAutoFocus                   //?
          open={showDeleteModal}
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          sx={{
            display: "flex",
            p: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 400,
              height: 100,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: (theme) => theme.shadows[5],
              p: 4,
            }}
          >
            <Typography id="server-modal-title" variant="h6" component="h2">
              Are You Sure To Delete This Task?
            </Typography>
            <Typography id="server-modal-description" sx={{ pt: 2 }}>
              You cannot undo this Act{" "}
            </Typography>
            <div style={{ position: "absolute", right: " 0" }}>
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                sx={{ margin: "5px" }}
                size="small"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ margin: "5px" }}
                size="small"
                onClick={handleDeleteConfirm}
              >
                Yes Delete
              </Button>
            </div>
          </Box>
        </Modal>
      </Box>
      {/*==== delete Modal ==== */}

      <Card className="toDoStyle" sx={{ minWidth: 500, marginTop: 5 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={7} sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "italic2",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
                variant="h5"
              >
                {todo.title}
              </Typography>
              <Typography sx={{ fontFamily: "italic1" }} variant="h6">
                {todo.description}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{ display: "flex" }}>
              {/* check Icon */}
              <IconButton
                aria-label="check"
                variant="contained"
                size="medium"
                style={{
                  margin: "5px",
                  border: "solid #8bc34a 3px",
                  background: todo.isCompleted ? "green" : "white",
                  color: todo.isCompleted ? "white" : "green",
                }}
                sx={{
                  ":hover": {
                    bgcolor: "green", // theme.palette.primary.main
                    color: "white",
                    transition: "1s",
                    boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                  },
                }}
                onClick={() => {
                  handelCheck();
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* check Icon */}

              {/* Edit Icon */}
              <IconButton
                onClick={handleEdit}
                aria-label="check"
                variant="contained"
                color="success"
                size="medium"
                style={{
                  margin: "5px",
                  border: "solid #8bc34a 3px",
                }}
                sx={{
                  ":hover": {
                    bgcolor: "primary.main", // theme.palette.primary.main
                    color: "white",
                    transition: "1s",
                    boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
              {/* Edit Icon */}

              {/* delete Btn */}
              <IconButton
                aria-label="delete"
                variant="contained"
                color="error"
                size="medium"
                style={{
                  margin: "5px",
                  border: "solid #8bc34a 3px",
                }}
                sx={{
                  ":hover": {
                    bgcolor: "red",
                    color: "white",
                    transition: "1s",
                    boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                  },
                }}
                onClick={() => {
                  handelDeleteClick();
                }}
              >
                <DeleteIcon />
              </IconButton>
              {/* ===delete Btn=== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
