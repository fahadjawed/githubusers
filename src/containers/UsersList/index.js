import React, { Component } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { UsersActions } from '../../store/actions';
import { Loader } from '../../components';
import { Metrix } from '../../config';
import { ListItem } from '..';
import _ from 'lodash';

class UsersList extends Component {
  constructor(props) {
    super(props);
    props.getUsers();
    this.debounceThis = _.debounce(this.getNextPage, 500);
  }

  renderItem = ({ item }) => <ListItem item={item} />;

  callDebounce = () => this.debounceThis();

  renderEmptyComponent = () => (
    <View style={styles.listEmptyContainer}>
      <Text style={styles.text}>No Result Found</Text>
    </View>
  );

  getNextPage = () => {
    const { nextPageEndPoint } = this.props;
    if (nextPageEndPoint) {
      this.props.getMoreUsers();
    }
  };

  render() {
    const { users, isLoading } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
        <View style={styles.container}>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={users}
            contentContainerStyle={styles.list}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            onEndReached={this.callDebounce}
            ListEmptyComponent={this.renderEmptyComponent}
            onEndReachedThreshold={0.01}
          />
        </View>
      );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.Users.isLoading,
    users: state.Users.users,
    nextPageEndPoint: state.Users.nextPageEndPoint,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(UsersActions.getUsers()),
    getMoreUsers: () => dispatch(UsersActions.getMoreUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);

const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(Metrix.defaultHeight - 75),
  },
  list: {
    width: Metrix.HorizontalSize(),
    alignItems: 'center',
  },
  listEmptyContainer: {
    height: Metrix.VerticalSize(Metrix.defaultHeight - 75),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: Metrix.FontLarge },
});
