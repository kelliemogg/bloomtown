// imports
import { Router } from "express";
import task_model from "../../api/v0/models/task"
import garden_model from "../../api/v0/models/garden"

// routers
const volunteer_router = Router()

volunteer_router.get('/', async (req, res)=>{
    const task_array = []
    const garden_array = []
    const task_result = await task_model.findAll()
    const garden_result = await garden_model.findAll()

    task_result.records.forEach(record => {
        record.forEach (field => {
            task_array.push(field)
        })
    })

    garden_result.records.forEach(record => {
        record.forEach (field => {
            garden_array.push(field)
        })
    })

    // JSON.stringify(task_result.records)
    // console.log(`Found task: ${JSON.parse(record)}`)})

    res.render('volunteer.ejs', { data: {
        task_result: task_array, garden_result: garden_array    
    }})
})

export default volunteer_router
