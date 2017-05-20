import axios from 'axios';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import { DISPLAY_ALL_ROLES, DISPLAY_UPDATED_ROLE,
  DELETE_ROLE } from '../actions/types';

const myColor = { background: '#ff0000', text: '#FFFFFF' };

/**
 *
 *
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {Object}
 */
export function fetchRoles(offset = 0, limit = 10) {
  return dispatch => axios.get(`api/roles?offset=${offset}&limit=${limit}`)
  .then((res) => {
    const allRoles = res.data.roles;
    dispatch({
      type: DISPLAY_ALL_ROLES,
      allRoles,
      pagination: res.data.pagination,
    });
  })
  .catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, myColor);
  });
}

export function updateRole(role) {
  return dispatch => axios.put(`api/roles/${role.id}`, role).then((res) => {
    const updatedRole = res.data.updatedRole;
    dispatch({
      type: DISPLAY_UPDATED_ROLE,
      updatedRole,
    });
    notify.show('Update successful',
      'success', 3000);
    // browserHistory.push('/documents');
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, myColor);
  });
}

export function deleteRole(roleId) {
  return dispatch => axios.delete(`api/roles/${roleId}`).then(() => {
    dispatch({
      type: DELETE_ROLE,
      roleId,
    });
    notify.show('Role deleted successfully',
      'success', 3000);
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, myColor);
  });
}