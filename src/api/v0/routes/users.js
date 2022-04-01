//Set up
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
    const result = await user_model.findById(req.params.user_id)
    res.json(result)
})

user_router.get('/:user_id/favorites', async (req, res)=>{
    console.log(`Id: ${user_id}`)
    const result = await user_model.findFavorites(req.params.user_id)
    res.json(result)
})

user_router.get('/:user_id/favorites/tasks', async (req, res)=>{
    const result = await user_model.findFavoritesTasks(req.params.user_id)
    res.json(result)
})

user_router.get('/:user_id/favorites/tasks/:state', async (req, res)=>{
    const state = req.params["state"]
    const result = await user_model.findFavoritesTasks(req.params.user_id, state)
    res.json(result)
})

user_router.get('/:user_id/tasks', async (req, res)=>{
    const result = await user_model.findTasks(req.params.user_id)
    res.json(result)
})

user_router.get('/:user_id/tasks/claimed', async (req, res)=>{
    const state = "In progress"
    const result = await user_model.findTasks(req.params.user_id, state)
    res.json(result)
})

user_router.get('/:user_id/tasks/completed', async (req, res)=>{
    const state = "Completed"
    const result = await user_model.findTasks(req.params.user_id, state)
    res.json(result)
})

//Update

/**
user_router.patch('/:user_id', async (req, res)=>{
    const result = await user_model.update(
        req.params.user_id, req.params.key, req.params.value
        )
    res.json(result)
  }) */

//Delete
user_router.delete('/:user_id', async (req, res)=>{
    const result = await user_model.del(req.params.user_id)
    res.json(result)
  })

//Esports

export default user_router
