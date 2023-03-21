import * as express from 'express'
import { ExecuteQuery, missingPropertyChecker, missingPropertyResponse } from './helper'
export const getAllUsers = (
    req: express.Request, res: express.Response
) => {
    let queryString =
        'select u.id ,u.username,r.name as role,u.createdAt,u.updatedAt,u1.username as createdBy , u2.username as updatedBy from user as u inner join  role as r on u.roleid = r.id inner join user as u1 on u.createdBy =u1.id inner join user as u2 on u.updatedBy = u2.id'
    const QueryKeys = Object.keys(req.query)
    if (QueryKeys.includes('order') && QueryKeys.includes('orderCol')) {
        queryString += ' ORDER BY ' + req.query.orderCol + ' ' + req.query.order
    }
    if (QueryKeys.includes('limit')) {
        queryString += ' limit ' + req.query.limit
        if (QueryKeys.includes('offset')) {
            queryString += ' OFFSET ' + req.query.offset
        }
    }
    console.log(Object.entries(req.query))
    console.log(queryString)
    queryString += ' ;'
    ExecuteQuery(res, queryString)

}
export const getByUserId = (
    req: express.Request, res: express.Response
) => {
    const query =
        'select u.id ,u.username,r.name as role ,u.createdAt,u.updatedAt,u1.username as createdBy , u2.username as updatedBy from user as u inner join  role as r on u.roleid = r.id inner join user as u1 on u.createdBy =u1.id inner join user as u2 on u.updatedBy = u2.id where u.id =' +
        req.params.id +
        ';'
    ExecuteQuery(res, query)
}

export const createNewUser = (
    req: express.Request, res: express.Response
) => {
    const {
        username,
        password,
        roleid,
        createdAt,
        updatedAt,
        createdBy,
        updatedBy,
    } = req.body
    if (!missingPropertyChecker(
        [username,
            password,
            roleid,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy])) {

        const query = `insert into user (username,password,roleid,createdAt ,updatedAt , createdBy ,updatedBy )
            values("${username}","${password}",${roleid},"${createdAt}","${updatedAt}",${createdBy},${updatedBy});`

        ExecuteQuery(res, query)
    } else {
        missingPropertyResponse(res)
    }
}

export const updateUserPUT = (
    req: express.Request, res: express.Response
) => {
    const { username, password, roleid, updatedAt, updatedBy } = req.body
    const { id } = req.params
    if (!missingPropertyChecker(
        [username, password, roleid, id, updatedAt, updatedBy])) {

        const query = `update user  set username = "${username}" ,roleid = ${roleid}, password = "${password}" , updatedAt = "${updatedAt}" ,updatedBy = ${updatedBy} where id  = ${id};`

        ExecuteQuery(res, query)
    } else {
        missingPropertyResponse(res)
    }
}

export const updateUserPATCH = (
    req: express.Request, res: express.Response
) => {
    const { id } = req.params
    let query = 'update user  set'
    
    const lastOfQuery = `  where id  = ${id};`
    const updateKeys = Object.keys(req.body)

    updateKeys.forEach((key, index) => {
        let tempQuery =
            ' ' +
            key +
            '=' +
            (typeof req.body[key] === 'string' ? '"' : '') +
            req.body[key] +
            (typeof req.body[key] === 'string' ? '"' : '')
        if (updateKeys.length - 1 !== index) {
            tempQuery = tempQuery + ','
        }
        query += tempQuery
    })
    query += lastOfQuery
    ExecuteQuery(res, query)

}

