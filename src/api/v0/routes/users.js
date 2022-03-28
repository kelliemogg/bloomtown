import { Router } from express

const user = Router()

user.get('/users/', async (req, res)=>{
    const result = await user.findAll()
    res.json(result)
  })

user.get('/user/:id/info', async (req, res)=>{
    const result = await user.findID()
    res.json(result)
})

user.get('/user/:id/favorites', async (req, res)=>{
    const result = await user.findFavorites()
    res.json(result)
})

user.get('/user/:id/claimed', async (req, res)=>{
    const result = await user.findClaimed()
    res.json(result)
})

user.get('/users/:id/favorites/tasks', async (req, res)=>{
    const result = await user.findFavoritesTasks()
    res.json(result)
})

export default user