import {put, call, select, delay, debounce} from 'redux-saga/effects';
import {ApiCaller} from '../../config';
import {UsersActions} from '../actions';
const getState = state => state.Users;

function parseLink(link = '') {
  try {
    return link
      .split(';')[0]
      .split('.com/')[1]
      .replace('>', '');
  } catch (error) {
    return '';
  }
}
export function* getUsers() {
  const response = yield call(ApiCaller.Get, 'users');
  console.log(response);
  if (response) {
    if (response.status == 200) {
      yield put({
        type: UsersActions.GET_USERS_SUCCESS,
        payload: {
          users: response.data,
          nextPageEndPoint: parseLink(response.headers.link),
        },
      });
    } else {
      yield put({type: UsersActions.GET_USERS_FAIL});
    }
  } else {
    yield put({type: UsersActions.GET_USERS_FAIL});
  }
}

export function* getMoreUsers() {
  yield delay(1000);
  let {nextPageEndPoint, page, searchText} = yield select(getState);
  const response = yield call(
    ApiCaller.Get,
    searchText ? `search/users?q=${searchText}&page=${page}` : nextPageEndPoint,
  );
  if (response) {
    if (response.status == 200) {
      yield put({
        type: UsersActions.GET_MORE_USERS_SUCCESS,
        payload: {
          users: Array.isArray(response.data)
            ? response.data
            : response.data.items,
          nextPageEndPoint: parseLink(response.headers.link),
        },
      });
    } else {
      yield put({type: UsersActions.GET_MORE_USERS_FAIL});
    }
  } else {
    yield put({type: UsersActions.GET_MORE_USERS_FAIL});
  }
}

export function* getSingleUser(action) {
  const {payload} = action;
  const response = yield call(ApiCaller.Get, `users/${payload.login}`);
  if (response) {
    if (response.status == 200) {
      yield put({
        type: UsersActions.GET_SINGLE_USER_SUCCESS,
        payload: {userDetails: response.data},
      });
    } else {
      yield put({type: UsersActions.GET_SINGLE_USER_FAIL});
    }
  } else {
    yield put({type: UsersActions.GET_SINGLE_USER_FAIL});
  }
}

export function* searchUsers(action) {
  yield delay(5000);
  const {payload} = action;
  const response = yield call(
    ApiCaller.Get,
    `search/users?q=${payload.searchText}`,
  );
  if (response) {
    if (response.status == 200) {
      yield put({
        type: UsersActions.SEARCH_USER_SUCCESS,
        payload: {
          users: response.data.items,
          nextPageEndPoint: parseLink(response.headers.link),
          searchText: payload.searchText,
        },
      });
    } else {
      yield put({type: UsersActions.SEARCH_USER_FAIL});
    }
  } else {
    yield put({type: UsersActions.SEARCH_USER_FAIL});
  }
}
