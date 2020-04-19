import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {UsersList, UserDetailsModal, SearchInput} from './src/containers';
const App = () => {
  return (
    <Provider store={store}>
      <SearchInput />
      <UsersList />
      <UserDetailsModal />
    </Provider>
  );
};

export default App;
