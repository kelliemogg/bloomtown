(async() => {
  const neo4j = require('neo4j-driver')
  
  const uri = 'neo4j+s://2f4c5155.databases.neo4j.io';
  const user = 'neo4j';
  const password = 'bRdI3DS4lOqC9mCpalSAOqHQeRzKZqNH4mYuetyIvtw';
  
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  const session = driver.session()
 

  // Static Files
  const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  });

  try {
 
    const readQuery = `MATCH (g:Garden)
                       RETURN (g)`
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
