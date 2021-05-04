import UserModel from '../models/UserModel';
import * as express from 'express';
import Auth from "../services/JwtToken";
class UserController {

  /**
   * @api {get} /user Get all users
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */
  public getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (req.params) {
      UserModel
        .find({ _id: { $ne: req.params._id }, role: { $ne: req.params.role } })
        .then((data) => {
          return res.status(200).json({ data });
        })
        .catch((error: Error) => {
          res.status(500).json({
            error: error.message,
            errorStack: error.stack
          });
          return next(error);
        });
    } else {
      UserModel
        .find({})
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((error: Error) => {
          res.status(500).json({
            error: error.message,
            errorStack: error.stack
          });
          next(error);
        });
    }
  }

  public getUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
    UserModel
      .findOne(
        req.params,
      )
      .then((data) => {
        let newUser = {};
        if (!data) {
          UserModel.create({
            name: req.params.name,
            role: Math.random() > .5 ? "doctor" : "patient",
            img: "https://mpng.subpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg",
          }).then(res => {
            newUser = res;
            console.log("create user res:", res);
          });
          // return res.status(404).json({ error: "not found" })
        }
        res.status(200).json(data || newUser);
      })
      .catch((error: Error) => {
        res.status(500).json({
          error: error.message,
          errorStack: error.stack
        });
        next(error);
      });
  }
  public updateUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
    let updatePayload: any = {};
    UserModel.update(req.params, updatePayload)
      .then((update) => {
        res.status(200).json({ success: true });
      })
      .catch((error: Error) => {
        res.status(500).json({
          error: error.message,
          errorStack: error.stack
        });
        next(error);
      });
  }
}

export default new UserController();
