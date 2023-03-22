import * as express from 'express'
import { createNewUser, getAllUsers, getByUserId, updateUserPATCH, updateUserPUT } from '../Controllers/userController'
import { connection } from '../db';


const idExistsChecker = (req: express.Request, res: express.Response, next: any) => {
    console.log("Logged", req.url)
    console.log(req.params)
    const query = `SELECT * FROM user WHERE user.id = ${req.params.id}`;

    connection.query(query, (error, result, field) => {
        if (error) {
            res.status(406).send(JSON.stringify('Error ' + error))
           
        } else {
            if (result.length == 0) {
                res.write("Record  not found for  id = " + req.params.id)
                res.end()
            } else {
                next()
            }
        }
    })


}
const router = express.Router()
router.get('/', getAllUsers)
router.post('/', createNewUser)
router.get('/:id', getByUserId)

router.put('/:id', idExistsChecker, updateUserPUT)
router.patch('/:id', idExistsChecker, updateUserPATCH)


export default router

JSON.stringify