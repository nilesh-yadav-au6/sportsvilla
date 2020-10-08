const users = [];

const addUser = ({ id, name, room }) => {
  name = name;
  room = room;

  const existingUser = users.find((user) => user.room === room && user.name === name);
  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) 
  {
    const index = users.findIndex((user)=> user.room === room && user.name === name )
    users.splice(index, 1)[0];
    check = false
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const checkCurrentUser = ({id, room, name})=> {
  const userExists = user.find((user)=> user.room === room && user.name === name && user.id === id )
  if(userExists) return true
  return false
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom, checkCurrentUser };