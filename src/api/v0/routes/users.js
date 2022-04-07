//Set up
import { Router } from "express";
const user_router = Router()
import user_model from "../models/user"
import garden_model from "../models/garden"

//Create

user_router.post('/', async (req, res)=>{
    const result = await user_model.create(
        req.body.email, req.body.password, req.body.name, req.body.role
        )
    res.json(result)
  })

user_router.post('/id/:user_id/leads', async (req, res)=>{
    const result = await garden_model.create(
        req.params.user_id, req.body.name, req.body.building_num,
        req.body.street, req.body.city, req.body.state, req.body.country,
        req.body.zip
        )
    res.json(result)
})

//Read
user_router.get('/all', async (req, res)=>{
    const result = await user_model.findAll()
    res.json(result)
  })

user_router.get('/id/:user_id', async (req, res)=>{
    const result = await user_model.findById(req.params.user_id)
    res.json(result)
})

user_router.get('/id/:user_id/leads', async (req, res)=>{
    const result = await user_model.findLeads(req.params.user_id)
    res.json(result)
})

user_router.get('/id/:user_id/favorites', async (req, res)=>{
    const result = await user_model.findFavorites(req.params.user_id)
    res.json(result)
})

user_router.get('/id/:user_id/favorites/tasks', async (req, res)=>{
    const result = await user_model.findFavoritesTasks(req.params.user_id)
    res.json(result)
})

user_router.get('/id/:user_id/favorites/tasks/:status', async (req, res)=>{
    const result = await user_model.findFavoritesTasks(
        req.params.user_id, req.params.status
        )
    res.json(result)
})

user_router.get('/id/:user_id/tasks', async (req, res)=>{
    const result = await user_model.findTasks(req.params.user_id)
    res.json(result)
})

user_router.get('/id/:user_id/tasks/:status', async (req, res)=>{
    const result = await user_model.findTasks(
        req.params.user_id, req.params.status
        )
    res.json(result)
}) // Needs work 

//Update

user_router.patch('/id/:user_id', async (req, res)=>{
    const result = await user_model.update(
        req.params.user_id, req.body.key, req.body.value
        )
    res.json(result)
  })

//Delete
user_router.delete('/id/:user_id', async (req, res)=>{
    const result = await user_model.del(req.params.user_id)
    res.json(result)
  })

//Exports

export default user_router
