import {UsersActions} from '../actions/';

const INITIAL_STATE = {
  users: [],
  isLoading: false,
  nextPageEndPoint: '',
  gettingMoreUsers: false,
  showUserDetailsModal: false,
  gettingUserDetails: false,
  singleUserDetails: {},
  searchText: '',
  searchPage: 2,
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UsersActions.GET_USERS:
      return {...state, isLoading: true};
    case UsersActions.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.users,
        nextPageEndPoint: action.payload.nextPageEndPoint,
        searchText: '',
        searchPage: 2,
      };
    case UsersActions.GET_USERS_FAIL:
      return {...state, isLoading: false};
    case UsersActions.GET_MORE_USERS:
      return {...state, gettingMoreUsers: true};
    case UsersActions.GET_MORE_USERS_SUCCESS:
      return {
        ...state,
        users: [...state.users, ...action.payload.users],
        nextPageEndPoint: action.payload.nextPageEndPoint,
        gettingMoreUsers: false,
        page: state.searchText ? state.page + 1 : state.page,
      };
    case UsersActions.GET_MORE_USERS_FAIL:
      return {
        ...state,
        gettingMoreUsers: false,
      };
    case UsersActions.GET_SINGLE_USER:
      return {...state, showUserDetailsModal: true, gettingUserDetails: true};
    case UsersActions.GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        gettingUserDetails: false,
        singleUserDetails: action.payload.userDetails,
      };
    case UsersActions.GET_SINGLE_USER_FAIL:
      return {...state, gettingUserDetails: false, showUserDetailsModal: false};
    case UsersActions.CLOSE_USER_MODAL:
      return {...state, showUserDetailsModal: false};
    case UsersActions.SEARCH_USER:
      return {...state, isLoading: true};
    case UsersActions.SEARCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.users,
        nextPageEndPoint: action.payload.nextPageEndPoint,
        page: 2,
        searchText: action.payload.searchText,
      };
    case UsersActions.SEARCH_USER_FAIL:
      return {...state, isLoading: false};
    default:
      return state;
  }
}

export default Reducer;
