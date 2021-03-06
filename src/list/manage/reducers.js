/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { combineReducers } from "redux";

import * as actions from "../actions";
import { cacheReducer, listReducer, profileReducer,
       } from "../reducers";

export function appReducer(state, action) {
  return combineReducers({
    profileWrap: profileReducer,
  })(state, action);
}

export function editorReducer(state = {
  editing: false, changed: false, hideHome: false,
}, action) {
  switch (action.type) {
  case actions.ADD_ITEM_FAILED:
  case actions.UPDATE_ITEM_FAILED:
    return {...state, editing: true, hideHome: false, error: action.error};
  case actions.ADD_ITEM_COMPLETED:
  case actions.UPDATE_ITEM_COMPLETED:
    if (action.interactive) {
      return {...state, editing: false, changed: false};
    }
    return state;
  case actions.SELECT_ITEM_STARTING:
    return {...state, editing: false, changed: false, hideHome: state.editing};
  case actions.SELECT_ITEM_COMPLETED:
    return {...state, hideHome: false};
  case actions.START_NEW_ITEM:
  case actions.EDIT_CURRENT_ITEM:
    return {...state, editing: true,  error: null};
  case actions.EDITOR_CHANGED:
    return {...state, changed: true};
  case actions.CANCEL_EDITING:
  case actions.REMOVE_ITEM_STARTING:
    return {...state, editing: false, changed: false};
  default:
    return state;
  }
}

export function modalReducer(state = {id: null, props: null}, action) {
  switch (action.type) {
  case actions.SHOW_MODAL:
    return {...state, id: action.id, props: action.props};
  case actions.HIDE_MODAL:
    return {...state, id: null, props: null};
  default:
    return state;
  }
}

export default combineReducers({
  app: appReducer,
  cache: cacheReducer,
  list: listReducer,
  editor: editorReducer,
  modal: modalReducer,
});
