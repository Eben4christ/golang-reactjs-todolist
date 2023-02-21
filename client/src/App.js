import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import ToDoList from "./to-Do-List"


function App() {
  return(
    <div>
      <Container>
        <ToDoList />
      </Container>
    </div>
  )
}

export default App