// Express Server code
import user_router from './src/api/v0/routes/users'
import task_router from './src/api/v0/routes/tasks'
import garden_router from './src/api/v0/routes/gardens'
import relationship_router from './src/api/v0/routes/reationships'
import f_task_router from './src/api/v0/routes/frontendroutes'
const express = require('express')
const app = express()
const ejs = require('ejs')
let PORT = process.env.PORT || 3000

// CORS 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Render CSS and JS files
app.use(express.static(__dirname + '/public/'));

// Set view engine
app.set('view engine', 'ejs')

app.listen(PORT, () => {
  console.log(`Application started and listening on port ${PORT}`);
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

// Frontend routes
app.use('/volunteer', f_task_router)


// Static Files
app.get('/', (req, res) => {
  res.render('index')
});
app.get('/about', (req, res) => {
  res.render('about')
});
app.get('/leader', (req, res) => {
  res.render('leader')
});
app.get('/volunteer', (req, res) => {
  res.render('volunteer')
});


(async() => {  
  const neo4j = require('neo4j-driver');
  const driver = neo4j.driver(
    process.env.URI,
    neo4j.auth.basic(process.env.USER_NAME, process.env.PASSWORD)
  )
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
