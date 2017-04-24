import jwt from 'jsonwebtoken';
import db from'../models';
import ControllerHelper from '../helpers/ControllerHelper';
const User = db.User;
const Role = db.Role;
const secret = process.env.SECRET || 'mySecret';

/**
 * UsersController class to create and manage users
 */
class UsersController {
  /**
   * Login a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static login(req, res) {
    const query = {
      where: { email: req.body.email }
    };
    User.findOne(query)
      .then((user) => {
        if (!req.body.password) {
          return res.status(401)
            .send({ message: 'Invalid Login Credentials. Try Again!' });
        }
        if (user && user.validatePassword(req.body.password)) {
          const token = jwt.sign({ userId: user.id, roleId: user.roleId },
          secret, { expiresIn: '12 hours' });
          return res.status(200).send({
            token,
            userId: user.id,
            roleId: user.roleId
          });
        }
        res.status(401)
            .send({ message: 'Invalid Login Credentials. Try Again!' });
      });
  }

  /**
   * Logout a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static logout(req, res) {
    res.status(200)
      .send({ message: 'Successfully logged out!' });
  }

  /**
   * Create a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static createUser(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).send({
            message: 'User Already Exist!'
          });
        }

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            roleId: 33,
          })
          .then((user) => {
            const token = jwt.sign({ userId: user.id, roleId: user.roleId },
            secret, { expiresIn: '12 hours' });
            res.status(201).send({ token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId
              }
            });
          })
          .catch(() => res.status(400).send({
            message: 'An error occured. Invalid parameters, try again!'
          }));
      });
  }

  /**
   * List all users
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static listUsers(req, res) {
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 10;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.attributes = { exclude: ['password', 'roleId'] };
    
    User
      .findAndCountAll(query)
      .then((users) => {
        const pagination = ControllerHelper.pagination(
          query.limit, query.offset, users.count
        );
        res.status(200).send({
          pagination, users: users.rows
        });
      });
  }

   /**
   * Retrive a user's details
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static retrieveUser(req, res) {
    User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Does Not Exist',
          });
        }
        res.status(200).send({
          message: 'Update Successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!'
      }));
  }

  /**
   * Update a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static updateUser(req, res) {
    Role.findById(33)
      .then((role) => {
        User
          .findById(req.params.id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User Does Not Exist',
              });
            }
            if (req.body.id) {
              return res.status(403).send({
                message: 'Unauthorised access. You cannot update userId property'
              });
            }
            if ((role.title !== 'admin') && !(user.id === 8)) {
              return res.status(403).send({
                message: 'Unauthorised access. You cannot update this user\'s property'
              });
            }
            
            // roleId should not be updated by a regular user
            if (!(role.title === 'admin') && req.body.roleId) {
              return res.status(403).send({
                message: 'Unauthorised access. You cannot update roleId property'
              });
            }
            user
              .update(req.body, { fields: Object.keys(req.body) })
              .then((user) => res.status(200).send({
                message: 'Update Successful!',
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
            }));
        })
        .catch(() => res.status(400).send({
          message: 'An error occured. Invalid parameters, try again!'
        }));
    });
  }

  /**
   * Delete a particular Document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static deleteUser(req, res) {
    Role
      .findById(33)
      .then((role) => {
        User
          .findById(req.params.id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User Does Not Exist',
              });
            }
            if ((role.title !== 'admin') && (user.id !== 9)) {
              return res.status(403).send({
                message: 'You are not authorized to delete this document',
              });
            }
          user
            .destroy()
            .then(() => res.status(200).send({
              message: 'User deleted successfully.',
          }));
        })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!'
      }));
    });
  }
}

export default UsersController;
