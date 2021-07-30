const Todoitem = [];

function find() {
  return Todoitem;
}

const inc = (init = 0) => () => ++init
const genId = inc();

function create(title) {
  let todo = {
    id: genId(),
    title: title,
    done: false
  }
  Todoitem.push(todo);
  return todo;
}

function findById(id) {
  let todoId = parseInt(id);
  if (todoId > Todoitem.length) {
    return false;
  } else {
    return Todoitem.find(todo => todo.id === todoId);
  }
}

function findByIdAndUpdate(id, todo) {
  let todoId = parseInt(id);
  if (todoId > Todoitem.length) {
    return false;
  } else {
    return Object.assign(findById(todoId), todo);
  }
}

function findByIdAndReplace(id, todo) {
  let todoId = parseInt(id);

  if (todoId > Todoitem.length) {
    return false;
  } else {
    let tempTodo = findById(todoId);
    tempTodo.title = todo.title !== undefined ? todo.title : 'todo name';
    tempTodo.done = todo.done !== undefined ? todo.done : false;
    return tempTodo
  }
}


//parse str to bool
//add validation of inputed data

export {
  find, create, findById, findByIdAndUpdate, findByIdAndReplace
}