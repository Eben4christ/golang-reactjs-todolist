import React, { Component } from "react";
import Axios from "axios";
import { Card, Header, Form, Icon, Input } from "semantic-ui-react";

// let endpoint = "http://localalhost:9090";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: [],
    };
  }
  componentDidMount() {
    this.getTask();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = () => {
    let { task } = this.state;
    
    if (task) {
      Axios.post(
        "/api/task",
        {
          task,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then((res) => {
        this.getTask();
        this.setState({
          task: "",
        });
        console.log(res);
      });
    }
  };

  getTask = () => {
    Axios.get("/api/task").then((res) => {
      if (res.data) {
        this.setState({
          items: res.data.map((item) => {
            let color = "yellow";
            let style = {
              wordwrap: "break-word",
            };
            if (item.status) {
              color = "green";
              style["textDecorationLine"] = "Line-through";
            }

            return (
              <Card key={it._id} color={color} fluid className="rough">
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={style}>{item.task}</div>
                  </Card.Header>

                  <Card.Meta textAlign="right">
                    <Icon
                      name="check circle"
                      color="blue"
                      onClick={() => this.updateTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Undo</span>
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => this.deleteTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>delete</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          }),
        });
      } else {
        this.setState({
          item: [],
        });
      }
    });
  };

  updateTask = (id) => {
    Axios.put("api/task" + id, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => {
      console.log(res);
      this.getTask();
    });
  };

  undoTask = (id) => {
    Axios.put("/api/undoTask" + id, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => {
      console.log(res);
      this.getTask();
    });
  };

  deleteTask = (id) => {
    Axios.delete("/api/deleteTask" + id, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => {
      console.log(res);
      this.getTask();
    });
  };

  render() {
    return (
      <div>
        <div>
          <Header className="header" as="h2" color="yellow">
            TO DO LIST
          </Header>
        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Create Task"
            />
            {/* <button>Create task</button> */}
          </Form>
        </div>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;
