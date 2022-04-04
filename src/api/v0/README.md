# Bloomtown API 0.0.0

The protype version of the bloomtown api creates endpoints for the users, tasks, gardens, and relationships stored in a Neo4j graph database. It establishes seprate routers and models for each kind of entity. The routers dictate how the response and requests are handeled and the models provided methods for passing queries to the database and returning the results to the routers.

## Endpoints

| Route | Endpoints | Request type |Description|
|:---|:---:|:---:|:---|
|[api/users or api/user](router.url "View model")| | | Where you can get information about users |
| | / | GET | Returns all users. |  