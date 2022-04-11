//Set up
import { Router } from "express";
const relationship_router = Router()
import relationship_model from "../models/relationship"

//Create

relationship_router.post('/relationship', async (req, res)=>{
    const result = await relationship_model.create(
        req.body.a_id, req.body.b_id, req.body.type
    )
    res.json(result)
  })

//Read

relationship_router.get('/relationship', async (req, res)=>{
  const result = await relationship_model.findByIds(
      req.body.a_id, req.body.b_id
  )
  res.json(result)
})

relationship_router.get('/leaders', async (req, res)=>{
    const result = await relationship_model.findLeaders()
    res.json(result)
})

//Delete

relationship_router.delete('/relationship', async (req, res)=>{
    const result = await relationship_model.del(
      req.body.a_id, req.body.b_id, req.body.type
    )
    res.json(result)
  })

//Exports

export default relationship_router
