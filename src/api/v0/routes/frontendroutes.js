   
// import models
import { Router } from "express";
const f_task_router = Router()

import task_model from "../models/task"
// import user_model from "../models/user";
// import garden_model from "../models/garden";
// import relationship_model from "../models/relationship";


f_task_router.get('/', async (req, res)=>{
    const field_array = []
    const task_result = await task_model.findAll()
    task_result.records.forEach(record => {
        record.forEach (field => {
            console.log(field)
            field_array.push(field)
        })
    })
    // JSON.stringify(task_result.records)
    // console.log(`Found task: ${JSON.parse(record)}`)})
    res.render('volunteer.ejs', {task_result: field_array})
  })

export default f_task_router
