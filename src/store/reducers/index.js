import {combineReducers} from 'redux';

// imports: Reducers
import UsersReducer from './UsersReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  //reducers will go here
  Users: UsersReducer,
});

export default rootReducer;
