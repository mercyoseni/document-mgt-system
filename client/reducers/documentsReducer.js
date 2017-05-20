import { DISPLAY_ALL_DOCUMENTS, DISPLAY_MY_DOCUMENTS,
  UPDATE_DOCUMENT_SUCCESS, DOC_FETCHED,
  DELETE_DOCUMENT } from '../actions/types';

const initialState = { documents: [], document: {}, pagination: {} };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DISPLAY_ALL_DOCUMENTS:
      return Object.assign({}, state,
      { documents: action.allDocs, pagination: action.pagination });

    case DISPLAY_MY_DOCUMENTS:
      return Object.assign({}, state,
      { documents: action.myDocs, pagination: action.pagination });

    case UPDATE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, { document: action.updatedDocument });

    case DOC_FETCHED:
      return Object.assign({}, state, { document: action.doc });

    case DELETE_DOCUMENT: {
      return Object.assign({}, state);
    }

    default: return state;
  }
};