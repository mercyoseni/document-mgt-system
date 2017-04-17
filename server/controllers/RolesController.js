import db from '../models'
const Role = db.Role;

/**
 * RolesController class to create and manage roles
 */
class RolesController {
  /**
   * Create a new Role
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  static create(req, res) {
    Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send({
        message: error.errors[0].message
      }));
  }

  /**
   * List all Roles
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
   static list(req, res) {
     return Role
      .findAll()
      .then(roles => res.status(200).send(roles))
      .catch(error => res.status(400).send(error));
  }

  /**
   * Retrive a Role based on id with all users on that role
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
    static retrieve(req, res) {
      Role
        .findById(req.params.id)
        .then((role) => {
          if (!role) {
            return res.status(404).send({
              message: 'Role Does Not Exist',
            });
          }
          res.status(200).send(role);
        })
        .catch(() => res.status(400).send({
          message: 'An error occured. Invalid parameters, try again!'
        }));
    }
};

export default RolesController;