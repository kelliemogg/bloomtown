import { nanoid } from 'nanoid';

const neo4j = require('neo4j-driver');
  
const uri = 'neo4j+s://2f4c5155.databases.neo4j.io';
const user_name = 'neo4j';
const password = 'bRdI3DS4lOqC9mCpalSAOqHQeRzKZqNH4mYuetyIvtw';

const driver = neo4j.driver(uri, neo4j.auth.basic(user_name, password))
const session = driver.session()

//Create

/**
 * create - Creates a new garden node.
 * @param {str} name The gardens name.
 * @param {str} building_num The number of the building from the garden's address.
 * @param {str} street The street from the garden's address.
 * @param {str} city The city from the garden's address.
 * @param {str} state The state from the garden's address.
 * @param {str} country The country from the garden's address. 
 * @param {str} zip The zipcode from the garden's address.
 * @returns: The id of the newly created garden.
 */
 
const create = async (name, building_num, street, city, state, country, zip) =>{
    const query = (`CREATE (g:Garden {building_num="${building_num}" ` + 
        `city="${city}", country="${country}", name="${name}", ` + 
        `state="${state}", street="${street}", zip="${zip}"}) Return (id(g))`)
    const result = await session.run(query)
    return result
}

//Read

/**
 * findAll - Finds all gardens.
 * @returns: The id, name, building_num, street, city, state, country, and zip
 *           of all gardens.
 */

const findAll = async () =>{
    const query = `MATCH (g:Garden) RETURN (g)`
    const result = await session.run(query)
    return result
}

/**
 * findById - Finds the garden with the given Id.
 * @param {str} garden_id The id of the garden.
 * @returns: The id, name, building_num, street, city, state, country, and zip
 *           of the garden.
 */

const findById = async (garden_id) =>{
    const query = `MATCH (g:Garden) WHERE id(g)=${garden_id} RETURN (g)`
    const result = await session.run(query)
    return result
}

/**
 * findByLocation - Finds all gardens from gardens in a specific location.
 * @param {str} location_type The location type; state, city, or zipcode.
 * @param {str} location_value The specific instance of the location type to
 *                              retirieve gardens from.
 * @returns: The id, name, building_num, street, city, state, country, and zip
 *           of the gardens from the specified location.
 */

const findByLocation = async (location_type, location_value) =>{
    const query = (`MATCH (g:Garden) WHERE g.${location_type}=` +
        `"${location_value}" RETURN (g)`)
    const result = await session.run(query)
    return result
}

/**
 * findLeader - Finds the leader of the specified garden.
 * @param {str} garden_id The id of the garden.
 * @returns The id, and name of the user that leads the garden.
 */

const findLeader = async (garden_id) =>{
    const query = `MATCH (g:Garden)<--(u:User) WHERE id(g)=${garden_id} RETURN ([id(u), u.name])`
    const result = await session.run(query)
    return result
}

/**
 * findTasks - Finds all tasks associated with a garden.
 * @param {str} garden_id The id of the graden.
 * @param {*} status 
 * @returns The id, due_date, description, status, and completion_date of all
 *          tasks from the specificed garden with the selected status.
 */

const findTasks = async (garden_id, status=null) =>{
    const query = (status == "claimed" || status == "complete" ||
        status == "open") ? (`MATCH (g:Garden)<--(t:Task) ` +
        `WHERE id(g)=${garden_id} AND t.status="${status}" RETURN (t)`)
    : (status == "current") ? (`MATCH (g:Garden)<--(t:Task) ` +
        `WHERE id(g)=${garden_id} AND (t.status="open" OR t.status="claimed") ` +
        `RETURN (t)`)
    : (`MATCH (g:Garden)<--(t:Task) WHERE id(g)=${garden_id} RETURN (t)`);
    const result = await session.run(query)
    return result
}

//Update

/**
 * update - Updates a peramater of a specified garden.
 * @param {int} garden_id The id of the garden.
 * @param {str} key The name of the perameter to update.
 * @param {str} value The new value for the perameter
 * @returns The id, name, building_num, street, city, state, country, and zip
 *           of the garden updated.
 */
const update = async (garden_id, key, value) =>{
    const query = `MATCH (g:Garden) WHERE id(g)=${garden_id} SET g.${key}="${value}" RETURN (g)`
    const result = await session.run(query)
    return result
}

//Delete

/**
 * del - Deletes a garden node and all relationships conected to it.
 * @param {int} garden_id Id of garden to delete.
 * @returns 
 */

const del = async (garden_id) =>{
    const query = `MATCH (g:Garden) WHERE id(g)=${garden_id} DETACH DELETE (g)`
    const result = await session.run(query)
    return result
}

//Exports

export default {
    create,
    findAll,
    findById,
    findByLocation,
    findLeader,
    findTasks,
    update,
    del
}
