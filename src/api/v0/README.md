# Bloomtown API 0.0.0

The protype version of the bloomtown api creates endpoints for the users, tasks, gardens, and relationships stored in a Neo4j graph database. It establishes seprate routers and models for each kind of entity. The routers dictate how the response and requests are handeled and the models provided methods for passing queries to the database and returning the results to the routers.

## Routes & Requests

| Route | Endpoints | Request type |Description|
|:---|:---|:---:|:---|
| [api/ ](https://github.com/kelliemogg/bloomtown/blob/master/src/api/v0/routes/relationships.js "View code for route") | | | Routes for handeling relationships between users, tasks, and gardens. |
| | /relationship | POST | Creates a relationship between 2 entaties represented by "a" and "b". Passing "a_id" and "b_id" as the id's of the two objects and "type" as the lable of the relationship you wish to create. |
| | | GET | Returns information about the relationships between 2 objects, represented as "a" and "b". Achieved by passing "a_id' and "b_id" as the id's of the objects in the body of the request. |
| | | DELETE | Deletes a relationship between 2 objects. The two objects are indicated by passing "a_id" and "b_id" in the body of the request. The lable of the relationship should be indicated by "type" in the body of request as well. |
| | /leaders | GET | Returns all leaders and the gardens they lead.|
|[api/users or api/user](https://github.com/kelliemogg/bloomtown/blob/master/src/api/v0/routes/users.js "View code for route")| | | Route that handles all information related to users. |
| | / | POST | Create a new user by passing an email, password, name, role in the body of the request. |
| | /all | GET | Returns all users. | 
| | /id/{id} | GET | Returns the information of the user with the given id. |
| | | PATCH | Updates the info of the user based on a "key" and "value" passed in the body of the request. |
| | | DELETE | Deletes the user with the given id and all relationships associated with them. |
| | /id/{id}/leads | POST | Creates a new garden and corespoding "Leads" relationship with the user with the given id. Must be passed name, building_num, street, city, state, country, and zip in the body of the request. |
| | | GET | Returns all gardens the user "Leads". |
| | /id/{id}/favorites | GET | Returns all gardens "Liked" by the user with the given id. |
| | /id/{id}/favorites/tasks | GET | Returns all tasks associated with the gardens "Liked" by the user with the given id. |
| | /id/{id}/favorites/tasks/{status} | GET | Returns all tasks with the coresponding statu associated with the gardens "Liked" by the user with the given id. "open" returns all open tasks, "claimed" returns all tasks claimed but not completed by users, "current" reuturns all open and claimed tasks, and "complete" returns all completed tasks. Any other value will return tasks regardless of status. |
| | /id/{id}/tasks | GET | Returns all tasks claimed by the user with the given id. |
| | /id/{id}/tasks/{status} | GET | Returns all tasks with the coresponding status associated with the gardens "Liked" by the user with the given id. "open" returns all open tasks, "claimed" returns all tasks claimed but not completed by users, "current" reuturns all open and claimed tasks, and "complete" returns all completed tasks. Any other value will return tasks regardless of status. |
| [api/gardens or api/garden](https://github.com/kelliemogg/bloomtown/blob/master/src/api/v0/routes/gardens.js "View code for route") | | | Route that handles all information related to users. |
| | /all | GET | Returns all gardens. |
| | /id/{id} | GET | Returns the information of the garden with the given id. |
| | | PATCH | Updates the garden with the given id. Takes "key" and "value" arguemnts from the body of the request to update garden paramaters. |
| | | DELETE | Deletes the garden with the given id. |
| | /id/{id}/tasks | POST | Creates a task with coresponding "Locatted" relationship with the garden of the given id. Takes "description" and "due_date" from the request body to create the new task. |
| | | GET | Returns all tasks associated with the garden. |
| | /id/{id}/tasks/{status} | GET | Returns all tasks with the coresponding status associated with the garden with the given id. "open" returns all open tasks, "claimed" returns all tasks claimed but not completed by users, "current" reuturns all open and claimed tasks, and "complete" returns all completed tasks. Any other value will return tasks regardless of status. |
| | /id/{id}/leader | GET | Returns the leader of the garden.|
| | /location/{location_type}/{location_value} | GET | Returns all of the gardens filtered by city, state, zipcode, or country. |
| [api/tasks or api/task](https://github.com/kelliemogg/bloomtown/blob/master/src/api/v0/routes/tasks.js "View code for route") | | | Route that handles task related opperations. |
| | /all | GET | Returns all tasks. |
| | /id/{id} | GET | Returns the information of a task with the given id. |
| | | PATCH | Updates the task with the given id using "key" and "value" from the request body. |
| | | DELETE | Deletes the task with the given id. |
| | /location/{location_type}/{location_value} | GET | Returns all tasks filtered by city, state, zipcode or country. |
| | /status/{status} | GET | Returns tasks filtered by their status. "open" returns all open tasks, "claimed" returns all tasks claimed but not completed by users, "current" reuturns all open and claimed tasks, and "complete" returns all completed tasks. Any other value will return tasks regardless of status.  |
