import React, { useState, useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { toDoContext } from "../../Contexts/ToDoContext";
import { v4 as uuidv4 } from "uuid"; //uniq id
import { purple } from '@mui/material/colors';


// components
import { ToDo } from "../ToDo/ToDo";
import { ToggleButtonGroup } from "@mui/material";

const btnTheme = createTheme({
  //???????????? How import App.css

  status: {
    button: {
      fontFamily: ["btn"],
    },
  },
  primary: {
    main: "#357a38",
  },
  secondary: {
    main: '#f44336',
  },
});

export const ToDoMain = () => {
  //value from context
  const { lisdToDo, setLisdToDo } = useContext(toDoContext);

  const [inputValue, setInputValue] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");
  // filtration To Do   (2)
  const [displayTodosType, setDisplayTodosType] = useState("all");

  // filtration To Do   (1)
  const completedTodos = lisdToDo.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTodos = lisdToDo.filter((t) => {
    return !t.isCompleted;
  });

  // filtration To Do   (4)
  let todosToBeRendered = lisdToDo;
  if (displayTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType == "nonCompleted") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = lisdToDo;
    
  }

  //map to show todos     //we change map here to show type of tasks
  const toDos = todosToBeRendered.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  //To save to storage    (3)
  useEffect(() => {
    console.log(" use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setLisdToDo(storageTodos);
  }, []); //if [] is empty it will call with every change

  const handleAddClicked = () => {
    const newToDo = {
      id: uuidv4(),
      title: inputValue,
      description: descriptionTask,
      isCompleted: false,
    };
    //To save to storage    (1)
    const updatedTodos = [...lisdToDo, newToDo];
    setLisdToDo(updatedTodos);
    //To save to storage    (2)
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setDescriptionTask([...lisdToDo, descriptionTask]);
    setInputValue("");
    setDescriptionTask("");
  };
  // filtration To Do   (3)
  const changeDisplayedType = (e) => {
    console.log(e.target.value);
    setDisplayTodosType(e.target.value);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ margin: "15px" }}>
        <Card
          sx={{ minWidth: 345, p: 3, boxShadow: 3 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <Typography
            variant="h3"
            gutterBottom
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Title",
            }}
          >
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src="https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/960x0.jpg?format=jpg&width=960"
            />
            To Do Daily Tasks{" "}
          </Typography>

          <ThemeProvider theme={btnTheme}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                value="nonCompleted"
                onClick={changeDisplayedType}
                sx={{
                  m: 2,
                  fontFamily: "btn",
                  color:"primary",                  //???????
                  ":hover": {
                    bgcolor: "green",
                    color: "white",
                    transition: "1s",
                    boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                  },
                }}
                variant="outlined"
                style={{color:"primary"}}             //????
              >
                Next up
              </Button>
              <Button
                onClick={changeDisplayedType}
                value="completed"
                sx={{
                  m: 2,
                  fontFamily: "btn",
                  ":hover": {
                    bgcolor: "primary.main",
                    color: "white",
                    transition: "1s",
                    boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                  },
                }}
                variant="outlined"
              >
                Done
              </Button>
              <Button
                onClick={changeDisplayedType}
                value="All"
                sx={{
                  m: 2,
                  fontFamily: "btn",
                  ":hover": {
                    bgcolor: "red",
                    color: "white",
                    transition: "1s",
                    boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                  },
                }}
                variant="outlined"
                id="sAll"
              >
                All
              </Button>
            </div>
          </ThemeProvider>

          <CardHeader

          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          />

          <CardMedia
            component="img"
            height="194"
            image="https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/960x0.jpg?format=jpg&width=960"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {/* ToDos */}

              {/* <ToDo /> */}
              {toDos}
              {/* ToDos */}
            </Typography>
            {/* Add new Input */}
            <Grid container spacing={2} style={{ marginTop: "5px" }}>
              <Grid item xs={8} sx={{ alignItems: "center" }}>
                {" "}
                <TextField
                  sx={{ width: "100%" }}
                  id="filled-basic"
                  label="New Task"
                  variant="filled"
                  color="success"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={4} sx={{ display: "flex" }}>
                <Button
                  sx={{ width: "100%" }}
                  variant="outlined"
                  startIcon={<LibraryAddIcon />}
                  onClick={() => {
                    handleAddClicked();
                  }}
                  disabled = {inputValue.length <= 0}
                >
                  Add
                </Button>
              </Grid>
              <TextField
                sx={{ width: "100%", marginTop: "3px" }}
                id="filled-basic"
                label="Description Task"
                variant="filled"
                color="success"
                value={descriptionTask}
                onChange={(e) => {
                  setDescriptionTask(e.target.value);
                }}
              />
            </Grid>

            {/* Add new Input */}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
