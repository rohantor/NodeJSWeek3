
import * as express from 'express'
import { ExecuteQuery, missingPropertyChecker, missingPropertyResponse } from './helper';
export const getAllRoles = (req: express.Request, res: express.Response) => {
  let queryString = 'select * from role';
  ExecuteQuery(res, queryString)
}

export const getRoleById = (req: express.Request, res: express.Response) => {
  let queryString = 'select * from role where id = ' + req.params.id;
  ExecuteQuery(res, queryString)
}

export const insertIntoRole = (req: express.Request, res: express.Response) => {

  const { name, createdAt, createdBy, updatedAt, updatedBy } = req.body

  if (!missingPropertyChecker([name, createdAt, createdBy, updatedAt, updatedBy])) {

    let queryString = `insert into role (name, createdAt, createdBy, updatedAt, updatedBy) values ("${name}","${createdAt}",${createdBy},"${createdAt}",${updatedBy});`

    ExecuteQuery(res, queryString)
  } else {
    missingPropertyResponse(res)
  }

}

export const updateRolePUT = (req: express.Request, res: express.Response) => {
  const { name, createdAt, createdBy, updatedAt, updatedBy, id } = req.body;
  if (!missingPropertyChecker([name, createdAt, createdBy, updatedAt, updatedBy, id])) {
    const query = `update role  set name = "${name}" ,createdAt = "${createdAt}", createdBy = "${createdBy}" , updatedAt = "${updatedAt}" ,updatedBy = ${updatedBy} where id  = ${id};`
    ExecuteQuery(res, query)
  } else {
    missingPropertyResponse(res)
  }
}