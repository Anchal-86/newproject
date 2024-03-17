import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Checkbox, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  addTodo,
  deleteTodo,
  setTodosList,
  toggleTodo,
} from "../slice/reducer";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [taskText, settaskText] = useState("");
  const handleAddTodo = () => {
    if (taskText) {
      dispatch(addTodo(taskText));
      settaskText("");
    }
  };

  const setTodosToLocalStorage = () => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  useEffect(() => {
    setTodosToLocalStorage();
  }, [todos]);

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    if (todosFromLocalStorage) {
      const todosList = JSON.parse(todosFromLocalStorage);
      if (todosList.length > 0) {
        dispatch(setTodosList(todosList));
      }
    }
  }, []);
  return (
    <div
      className="main-div"
      style={{
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "500px",
          height: "550px",
          backgroundColor: "#669999",
          boxShadow: "0px 0px 10px 0px #cccccc",
          borderRadius: "10px",
          fontFamily: "East Sea Dokdo",
          fontSize: "25px",
        }}
      >
        <div>
          <h2 style={{ textAlign: "center", fontFamily: "Vibur" }}>
            ToDo List
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <input
              onChange={(e) => {
                settaskText(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
              value={taskText}
              type="text"
              style={{
                width: "350px",
                height: "30px",
                borderRadius: "10px",
                textDecoration: "none",
                outline: 0,
                border: 0,
                fontFamily: "East Sea Dokdo",
                fontSize: "25px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "5px green solid",
                textAlign: "center",
                color: "green",
              }}
            >
              <IconButton sx={{ color: "green" }} onClick={handleAddTodo}>
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <div
            style={{
              paddingLeft: "30px",
              marginTop: "40px",
              paddingRight: "30px",
            }}
          >
            {todos.map((todo, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    height: "40px",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{display:"flex"}}>
                    <Checkbox
                      checked={todo.completed}
                      onChange={(e) => {
                        dispatch(toggleTodo(todo.id));
                      }}
                    />
                    <h4
                      style={{
                        marginLeft: "10px",
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.text}
                    </h4>
                  </div>

                  <IconButton
                    sx={{ color: "red", right: 0 }}
                    onClick={() => {
                      dispatch(deleteTodo(todo.id));
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
