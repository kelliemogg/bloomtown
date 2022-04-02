// Express Server code
import user_router from './src/api/v0/routes/users'
import task_router from './src/api/v0/routes/tasks'
const express = require('express');
const app = express();
const Cors = require('cors');


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

// CSS files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

// Static Files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/AboutUs.html')
});
app.get('/leader', (req, res) => {
  res.sendFile(__dirname + '/views/leader.html')
});
app.get('/user', (req, res) => {
  res.sendFile(__dirname + '/views/user.html')
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
