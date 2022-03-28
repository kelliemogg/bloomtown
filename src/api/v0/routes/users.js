//Imports
import { Router } from express

//Initilaize
const user = Router()

//Create

user.post('/users', async (req, res)=>{
    const result = await user.findAll()
    res.json(result)
  })

//Read
user.get('/users', async (req, res)=>{
    const result = await user.findAll()
    res.json(result)
  })

user.get('/user/:user_id/info', async (req, res)=>{
    user_id = req.params["user_id"]
    const result = await user.findById(user_id)
    res.json(result)
})

user.get('/user/:id/favorites', async (req, res)=>{
    user_id = req.params["user_id"]
    const result = await user.findFavorites(user_id)
    res.json(result)
})

user.get('/user/:id/favorites/tasks', async (req, res)=>{
    user_id = req.params["user_id"]
    const result = await user.findFavoritesTasks(user_id)
    res.json(result)
})

user.get('/user/:id/favorites/tasks/:state', async (req, res)=>{
    user_id = req.params["user_id"]
    state = req.params["status"]
    const result = await user.findFavoritesTasks(user_id, state)
    res.json(result)
})

user.get('/user/:id/tasks', async (req, res)=>{
    user_id = req.params["user_id"]
    const result = await user.findTasks(user_id)
    res.json(result)
})

user.get('/user/:id/tasks/claimed', async (req, res)=>{
    user_id = req.params["user_id"]
    state = "In progress"
    const result = await user.findTasks(user_id, state)
    res.json(result)
})

user.get('/user/:id/tasks/completed', async (req, res)=>{
    user_id = req.params["user_id"]
    state = "Completed"
    const result = await user.findTasks(user_id, state)
    res.json(result)
})

//Update

user.patch('/user/:id', async (req, res)=>{
    user_id = req.params["user_id"]
    key = req.params["key"]
    value = req.params["value"]
    const result = await user.update(user_id, key, value)
    res.json(result)
  })

//Delete
user.delete('/user/:id', async (req, res)=>{
    user_id = req.params["user_id"]
    const result = await user.del(user_id)
    res.json(result)
  })

//Esports

export default user