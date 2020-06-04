let users = [
  {
    id: 'a_unique_id',
    name: 'Jane Doe',
    bio: "Not Tarzan's Wife, another Jane",
  },
]

function getUsers() {
  return users
}

function getUserById(id) {
  return users.find(u => u.id === id)
}

function createUser(data) {
  const payload = {
    ...data,
  }

  users.push(payload)
  return payload
}

function updateUser(id, data) {
  const index = users.findIndex(u => u.id === id)
  users[index] = {
    ...users[index],
    ...data,
  }

  return users[index]
}

function deleteUser(id) {
  users = users.filter(u => u.id != id)
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
