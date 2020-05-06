import React from "react";
import "./styles.css";

let id = 0

const TodoCounters = props => (
  <div className="flow-right controls">
    <span>
      Item count:
      <span id="item-count">{props.items}</span>
    </span>
    <span>
      Unchecked count:
      <span id="unchecked-count">{props.unchecked}</span>
    </span>
  </div>
);

const Todo = props => (
  <div className="todo-container">
    <input type="checkbox"
      title="Mark as Done"
      onChange={props.onToggle}
      className="todo-checkbox"
    />
    <button
      onClick={props.onDelete}
      className="todo-delete">
      Delete
    </button>
    <span
      className="todo-delete">
      {props.todo.text}
    </span>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  getItems() {
    return this.state.todos.length
  }

  getUnCheckedItems() {
    return [...this.state.todos.filter(todo => todo.checked === false)].length
  }

  addTodo() {
    let todo = prompt("Add a Todo Item","Todo #")
    if (typeof todo === "string") 
      this.setState({
        todos:[...this.state.todos, {
          id: id++,
          text: todo,
          checked: false
        }]
      }, ()=> console.log(this.state.todos))
  }

  toggleTodo(id) {
    this.setState({
      todos: [...this.state.todos.map(todo => {
        if (todo.id === id) todo.checked = !todo.checked
        return todo})]
    })
  }

  deleteTodo(id) {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    })
  }

  render() {
    return (
      <div className="container center">
        <h1 className="center title">My TODO App (React.JS)</h1>
        <TodoCounters
          items={this.getItems()}
          unchecked={this.getUnCheckedItems()}
        />
        <button className="button center" onClick={() => this.addTodo()}>
          New TODO
        </button>
        <ul id="todo-list" className="todo-list" >
          {
            this.state.todos.map(todo => {
              return (
                <Todo 
                  key={todo.id}
                  todo={todo}
                  onDelete={() => this.deleteTodo(todo.id)}
                  onToggle={() => this.toggleTodo(todo.id)}
                />
              )})
          }
        </ul>
      </div>
    );
  }
}

export default App;
