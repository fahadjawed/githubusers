export default class Action {
  //Constants
  static GET_USERS = 'GET_USERS';
  static GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
  static GET_USERS_FAIL = 'GET_USERS_FAIL';
  static GET_MORE_USERS = 'GET_MORE_USERS';
  static GET_MORE_USERS_SUCCESS = 'GET_MORE_USERS__SUCCESS';
  static GET_MORE_USERS_FAIL = 'GET_MORE_USERS_FAIL';
  static GET_SINGLE_USER = 'GET_SINGLE_USER';
  static GET_SINGLE_USER_SUCCESS = 'GET_SINGLE_USER_SUCCESS';
  static GET_SINGLE_USER_FAIL = 'GET_SINGLE_USER_FAIL';
  static CLOSE_USER_MODAL = 'CLOSE_USER_MODAL';
  static SEARCH_USER = 'SEARCH_USER';
  static SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
  static SEARCH_USER_FAIL = 'SEARCH_USER_FAIL';

  //Actions
  static getUsers() {
    return {
      type: Action.GET_USERS,
    };
  }
  static getMoreUsers() {
    return {
      type: Action.GET_MORE_USERS,
    };
  }
  static getSingleUser(payload) {
    return {
      type: Action.GET_SINGLE_USER,
      payload,
    };
  }
  static closeUserModal() {
    return {
      type: Action.CLOSE_USER_MODAL,
    };
  }
  static searchUsers(payload) {
    return {
      type: Action.SEARCH_USER,
      payload,
    };
  }
}
