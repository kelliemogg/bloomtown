//Set up
import { Router } from "express";
const garden_router = Router()
import garden_model from "../models/garden"
import task_model from "../models/task"

//Create

garden_router.post('/id/:garden_id/tasks', async (req, res)=>{
  const result = await task_model.create(
      req.params.garden_id, req.body.description, req.body.due_date
      )
  res.json(result)
})

//Read

garden_router.get('/all', async (req, res)=>{
    const result = await garden_model.findAll()
    res.json(result)
  })

garden_router.get('/id/:garden_id', async (req, res)=>{
    const result = await garden_model.findById(req.params.garden_id)
    res.json(result)
})

garden_router.get('/location/:location_type/:location_value', async (req, res)=>{
    const result = await garden_model.findByLocation(req.params.location_type, req.params.location_value)
    res.json(result)
})

garden_router.get('/id/:garden_id/tasks', async (req, res)=>{
    const result = await garden_model.findTasks(req.params.garden_id)
    res.json(result)
})

garden_router.get('/id/:garden_id/tasks/:status', async (req, res)=>{
    const result = await garden_model.findTasks(req.params.garden_id, req.params.status)
    res.json(result)
})

garden_router.get('/id/:garden_id/leader', async (req, res)=>{
    const result = await garden_model.findLeader(req.params.garden_id)
    res.json(result)
})

//Update

garden_router.patch('/id/:garden_id', async (req, res)=>{
    const result = await garden_model.update(
        req.params.garden_id, req.body.key, req.body.value
        )
    res.json(result)
  })

//Delete
garden_router.delete('/id/:garden_id', async (req, res)=>{
    const result = await garden_model.del(req.params.garden_id)
    res.json(result)
  })

//Exports

export default garden_router
