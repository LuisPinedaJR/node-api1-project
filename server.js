const express = require('express')
var shortid = require('shortid')
const db = require('./database.js')

const server = express()

server.use(express.json())

server.get('/users', (req, res) => {
  const users = db.getUsers()

  if (users) {
    res.json(users)
  } else {
    res.status(500).json({
      message: 'The users information could not be retrieved.',
    })
  }
})

server.get('/users/:id', (req, res) => {
  // the param variable matches up to the name of our URL param above
  const user = db.getUserById(req.params.id)

  if (user) {
    res.json(user)
  } else if (!user) {
    message: 'The user information could not be retrieved.'
  } else {
    res.status(404).json({
      message: 'The user with the specified ID does not exist.',
    })
  }
})

server.post('/users', (req, res) => {
  if (!req.body.name || !req.body) {
    return res.status(400).json({
      message: 'Please provide name and bio for the user.',
    })
  }

  const newUSer = db.createUser({
    id: shortid.generate(),
    name: req.body.name,
    bio: req.body.bio,
  })
  res.status(201).json(newUSer)
})

server.put('/users/:id', (req, res) => {
  const user = db.getUserById(req.params.id)

  if (user) {
    const updatedUser = db.updateUser(req.params.id, {
      name: req.body.name || user.name,
      bio: req.body.bio,
    })
    res.json(updatedUser)
  } else if (!user) {
    message: 'The user with the specified ID does not exist.'
  } else if (!req.body.name || user.name) {
    res.status(400).json({
      message: 'Please provide name and bio for the user.',
    })
  } else {
    message: 'The user information could not be modified.'
  }
})

server.delete('/users/:id', (req, res) => {
  const user = db.getUserById(req.params.id)

  if (user) {
    db.deleteUser(user.id)
    // 204 is just a successful empty response,
    // since we don't really have anything to return
    res.status(204).end()
  } else if (!user) {
    message: 'The user could not be removed'
  } else {
    res.status(404).json({
      message: 'The user with the specified ID does not exist.',
    })
  }
})

server.listen(8080, () => {
  console.log('express server stated on port 8080')
})
