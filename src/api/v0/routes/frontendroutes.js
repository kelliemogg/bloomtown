   
// import models
import { Router } from "express";
const frontend_router = Router()

import task_model from "../models/task"
// import user_model from "../models/user";
import garden_model from "../models/garden";
// import relationship_model from "../models/relationship";


// get all tasks
frontend_router.get('/', async (req, res)=>{
    const field_array = []
    const garden_array = []
    const task_result = await task_model.findAll()
    const garden_result = await garden_model.findAll()
    task_result.records.forEach(record => {
        record.forEach (field => {
            field_array.push(field)
        })
    })
    garden_result.records.forEach(record => {
        record.forEach (field => {
            garden_array.push(field)
        })
    })
    // JSON.stringify(task_result.records)
    // console.log(`Found task: ${JSON.parse(record)}`)})
    res.render('volunteer.ejs', { data: {task_result: field_array, garden_result: garden_array} })
  })



// get all gardens
// frontend_router.get('/', async (req, res)=>{
//     const field_array = []
//     console.log(`hi we here`)
//     const garden_result = await garden_model.findAll()
//     garden_result.records.forEach(record => {
//         record.forEach (field => {
//             console.log(field)
//             field_array.push(field)
//         })
//     })
//     // JSON.stringify(task_result.records)
//     // console.log(`Found task: ${JSON.parse(record)}`)})
//     res.render('volunteer', {garden_result: field_array})

export default frontend_router
