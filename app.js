// Express Server code
import user_router from './src/api/v0/routes/users'
import task_router from './src/api/v0/routes/tasks'
import garden_router from './src/api/v0/routes/gardens'
import relationship_router from './src/api/v0/routes/reationships'
const express = require('express')
const app = express()


app.listen(3000, () => {
  console.log("Application started and listening on port 3000");
  });

// Routers
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users', user_router)
app.use('/api/user', user_router)
app.use('/api/tasks', task_router)
app.use('/api/task', task_router)
app.use('/api/gardens', garden_router)
app.use('/api/garden', garden_router)
app.use('/api', relationship_router)

// Static Files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

(async() => {
  const neo4j = require('neo4j-driver')
  
  const uri = 'neo4j+s://2f4c5155.databases.neo4j.io';
  const user = 'neo4j';
  const password = 'bRdI3DS4lOqC9mCpalSAOqHQeRzKZqNH4mYuetyIvtw';
  
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  const session = driver.session()

  

  try {
    const readQuery = `MATCH (g:Garden) RETURN (g)`
    const readResult = await session.readTransaction(tx =>
      tx.run(readQuery)
    )
    readResult.records.forEach(record => {
      console.log(`Found garden: ${record._fields[0].properties.name}`)
    })
  } catch (error) {
    console.error('Something went wrong: ', error)
  } finally {
    await session.close()
  }
 
  // Don't forget to close the driver connection when you're finished with it
  await driver.close()
})();
