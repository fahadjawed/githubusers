import React, {Component} from 'react';
import {View, TextInput, Keyboard, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {UsersActions} from '../../store/actions';
import {Metrix} from '../../config';
import _ from 'lodash';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.debounceThis = _.debounce(text => this.changeHandler(text), 1000);
  }
  changeHandler = text => {
    Keyboard.dismiss();
    if (text) {
      this.props.searchUsers({searchText: text});
    } else {
      this.props.getUsers();
    }
  };
  callDebounce = text => {
    this.debounceThis(text);
  };
  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Search Users'}
          style={styles.input}
          onChangeText={this.callDebounce}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(UsersActions.getUsers()),
    searchUsers: payload => dispatch(UsersActions.searchUsers(payload)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(SearchInput);

const styles = StyleSheet.create({
  inputContainer: {
    height: Metrix.VerticalSize(50),
    justifyContent: 'center',
    alignItems: 'center',
    ...Metrix.createShadow(),
    width: Metrix.HorizontalSize(321),
    alignSelf: 'center',
    marginVertical: Metrix.VerticalSize(15),
  },
  input: {width: '90%'},
});
