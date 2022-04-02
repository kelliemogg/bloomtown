//Set up
import { Router } from "express";
const task_router = Router()
import task_model from "../models/task"

//Create

/**
task_router.post('/', async (req, res)=>{

    const result = await task_model.create()
    res.json(result)
  }) */

//Read
task_router.get('/', async (req, res)=>{
    const result = await task_model.findAll()
    res.json(result)
  })

task_router.get('/:task_id', async (req, res)=>{
    const result = await task_model.findById(req.params.task_id)
    res.json(result)
})

task_router.get('/:location_type/:location_value', async (req, res)=>{
    const result = await task_model.findByLocation(req.params.location_type, req.params.location_value)
    res.json(result)
})

task_router.get('/:status', async (req, res)=>{
    const result = await task_model.findByStatus(req.params.status)
    res.json(result)
})

//Update

/**
task_router.patch('/:task_id', async (req, res)=>{
    const result = await task_model.update(
        req.params.task_id, req.params.key, req.params.value
        )
    res.json(result)
  }) */

//Delete
task_router.delete('/:task_id', async (req, res)=>{
    const result = await task_model.del(req.params.task_id)
    res.json(result)
  })

//Exports

export default task_router
