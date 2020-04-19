// Imports: Dependencies
import {all, takeEvery, take} from 'redux-saga/effects';

// Imports: Actions
import {UsersActions} from '../actions/';

// Imports: Redux Sagas
import {getUsers, getMoreUsers, getSingleUser, searchUsers} from './UsersSaga';

// Redux Saga: Root Saga
export function* rootSaga() {
  //console.log("From Saga Root watcher");

  yield all([
    //sagas will go here
    takeEvery(UsersActions.GET_USERS, getUsers),
    takeEvery(UsersActions.GET_MORE_USERS, getMoreUsers),
    takeEvery(UsersActions.GET_SINGLE_USER, getSingleUser),
    takeEvery(UsersActions.SEARCH_USER, searchUsers),
  ]);
}
