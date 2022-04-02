//Module that contains CRUD functions for Neo4j

//Create


//READ

/*
User
---
*/

//Get list of all users
app.get('/users', async (req, res)=>{
  querry = `MATCH (u:User) RETURN ([u.id, u.name])`
  const result = await session.run(querry)
  return res.json(result)
})

//Get user by id
app.get('/user/:userId', async (req, res)=>{
  user_id = req.params["userId"]
  querry = `MATCH (u:User) WHERE u.id=${user_id} RETURN (u)`
  const result = await session.run(querry)
  return res.json(result)
})

//Get user by garden
//MATCH (u:User)-->(g:Garden) WHERE g.name="Kyu" RETURN (u)
 
/*
Get Garden by
---
*/

//Get garden by user any relationship
//MATCH (u:User)-->(g:Garden) WHERE u.name="Ichi" RETURN (g)
 
//Get garden by location
//MATCH (g:Garden) WHERE g.state="OK" RETURN (g)
 
//Get Garden by name
//MATCH (g:Garden) WHERE g.name="Kyu" RETURN (g)
 
 
/*
Task
---
*/

//Get tasks by garden
//MATCH (t:Task)-->(g:Garden) WHERE g.name="Zu" RETURN (t)
 
//Get task by users Subscribed Gardens
//MATCH (t:Task)-->(g:Garden)<--(u:User) WHERE u.name="Ichi" RETURN (t)
 
// Get task by location
//MATCH (t:Task)-->(g:Garden) WHERE g.state="OK" RETURN (t)
 
//Get tasks by user
//MATCH (u:User)-->(t:Task) WHERE u.name="San" RETURN (t)

 
/*
Leader
---
*/

//Get garden leader
//MATCH (u:User)-[r:Leads]->(g:Garden) WHERE g.name="Zu" RETURN (u)


//UPDATE


//DELETE

