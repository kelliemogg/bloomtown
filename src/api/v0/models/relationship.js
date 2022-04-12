const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
    process.env.URI,
    neo4j.auth.basic(process.env.USER_NAME, process.env.PASSWORD)
)
const session = driver.session()

//Create

/**
 * create - Creates a relationship of specified type between a and b.
 * @param {str} a_id The id of the node the relationship points from.
 * @param {str} b_id The id of the node the relationship points to.
 * @param {str} type The label for the new relationship.
 * @returns The id of the new relationship.
 */

const create = async (a_id, b_id, type) =>{
    const query = (
        `MATCH (a) WHERE id(a)=${a_id} MATCH (b) WHERE id(b)=${b_id} ` +
        `CREATE (a)-[r:${type}]->(b) RETURN ([a, b, r])`
    )
    const result = await session.run(query)
    return result
}

//Read

/**
 * findByIds - Finds a relationship via the relationships ids.
 * @param {str} a_id The id of the node the relationship points from.
 * @param {str} b_id The id of the node the relationship points to.
 * @param {str} type The type of relationship between a and b.
 * @returns The relationship between the a and b.
 */

const findByIds = async (a_id, b_id) =>{
    const query = `MATCH (a)-[r]->(b) WHERE id(a)=${a_id} AND id(b)=${b_id} RETURN (r)`
    const result = await session.run(query)
    return result
}

/**
 * findLeaders - Finds all Leaders.
 * @returns The id of each relationship, the id and name of all leaders, and the
 *          id and name of their gardens.
 */

const findLeaders = async () =>{
    const query = `MATCH (u:User)-[r:Leads]->(g:Garden) ` +
        `RETURN ([id(r), id(u), u.name, id(g), (g.name)])`
    const result = await session.run(query)
    return result
}

//Delete

/**
 * delByIds - Deletes a relationship of the provided type between two nodes.
 * @param {str} a_id The id of the node the relationship points from.
 * @param {str} b_id The id of the node the relationship points to.
 * @param {str} type The label of the relationship to delete.
 * @returns None
 */

const del = async (a_id, b_id, type) =>{
    const query = `MATCH (a)-[r:${type}]->(b) WHERE id(a)=${a_id} AND id(b)=${b_id} DELETE (r)`
    const result = await session.run(query)
    return result
}

//Exports

export default {
    create,
    findByIds,
    findLeaders,
    del
}
