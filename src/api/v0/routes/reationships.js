//Set up
import { Router } from "express";
const relationship_router = Router()
import relationship_model from "../models/relationship"

//Create

/**
relationship_router.post('/', async (req, res)=>{
    const result = await relationship_model.create(
        req.params.id
        )
    res.json(result)
  }) */

//Read

relationship_router.get('/Leaders', async (req, res)=>{
    const result = await relationship_model.findLeaders()
    res.json(result)
})

//Update

//Delete
relationship_router.delete('/:r_id', async (req, res)=>{
    const result = await relationship_model.delByID(req.params.r_id)
    res.json(result)
  })

//Exports

export default relationship_router
