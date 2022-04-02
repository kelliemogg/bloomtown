//Set up
import { Router } from "express";
const garden_router = Router()
import garden_model from "../models/garden"

//Create

/**
garden_router.post('/', async (req, res)=>{
    const result = await garden_model.create(
        req.params.name, req.params.building_num, req.params.street,
        req.params.city, req.params.state, req.params.country, req.params.zip
        )
    res.json(result)
  }) */

//Read

garden_router.get('/', async (req, res)=>{
    const result = await garden_model.findAll()
    res.json(result)
  })

garden_router.get('/:garden_id', async (req, res)=>{
    const result = await garden_model.findById(req.params.garden_id)
    res.json(result)
})

garden_router.get('/:location_type/:location_value', async (req, res)=>{
    const result = await garden_model.findByLocation(req.params.location_type, req.params.location_value)
    res.json(result)
})

garden_router.get('/:garden_id/leader', async (req, res)=>{
    const result = await garden_model.findLeader(req.params.garden_id)
    res.json(result)
})

//Update

/**
garden_router.patch('/:garden_id', async (req, res)=>{
    const result = await garden_model.update(
        req.params.garden_id, req.params.key, req.params.value
        )
    res.json(result)
  }) */

//Delete
garden_router.delete('/:garden_id', async (req, res)=>{
    const result = await garden_model.del(req.params.garden_id)
    res.json(result)
  })

//Exports

export default garden_router
