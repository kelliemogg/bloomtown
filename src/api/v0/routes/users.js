//Initilaize
import { Router } from "express";
const user_router = Router()
import user_model from "../models/user"

//Create

/**
user_router.post('/', async (req, res)=>{
    const email
    const password
    const name
    const role
    const result = await user_model.create(email, password, name, role)
    res.json(result)
  }) */

//Read
user_router.get('/', async (req, res)=>{
    const result = await user_model.findAll()
    res.json(result)
  })

user_router.get('/:user_id', async (req, res)=>{
    const user_id = req.params["user_id"]
    const result = await user_model.findById(user_id)
    res.json(result)
})

user_router.get('/:user_id/favorites', async (req, res)=>{
    const user_id = req.params["user_id"]
    console.log(`Id: ${user_id}`)
    const result = await user_model.findFavorites(user_id)
    res.json(result)
})

user_router.get('/:user_id/favorites/tasks', async (req, res)=>{
    const user_id = req.params["user_id"]
    const result = await user_model.findFavoritesTasks(user_id)
    res.json(result)
})

user_router.get('/:user_id/favorites/tasks/:state', async (req, res)=>{
    const user_id = req.params["user_id"]
    const state = req.params["state"]
    const result = await user_model.findFavoritesTasks(user_id, state)
    res.json(result)
})

user_router.get('/:user_id/tasks', async (req, res)=>{
    const user_id = req.params["user_id"]
    const result = await user_model.findTasks(user_id)
    res.json(result)
})

user_router.get('/:user_id/tasks/claimed', async (req, res)=>{
    const user_id = req.params["user_id"]
    const state = "In progress"
    const result = await user_model.findTasks(user_id, state)
    res.json(result)
})

user_router.get('/:user_id/tasks/completed', async (req, res)=>{
    const user_id = req.params["user_id"]
    const state = "Completed"
    const result = await user_model.findTasks(user_id, state)
    res.json(result)
})

//Update

/**
user_router.patch('/:user_id', async (req, res)=>{
    const user_id = req.params["user_id"]
    const key = req.params["key"]
    const value = req.params["value"]
    const result = await user_model.update(user_id, key, value)
    res.json(result)
  }) */

//Delete
user_router.delete('/:user_id', async (req, res)=>{
    const user_id = req.params["user_id"]
    const result = await user_model.del(user_id)
    res.json(result)
  })

//Esports

export default user_router