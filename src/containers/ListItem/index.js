import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
import {Metrix} from '../../config';
import {connect} from 'react-redux';
import {UsersActions} from '../../store/actions';
class ListItem extends Component {
  handleUrlClick = () => {
    const {item} = this.props;
    Linking.canOpenURL(item.html_url).then(() => {
      Linking.openURL(item.html_url);
    });
  };
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.5}
        onPress={() => this.props.getSingleUser(item)}>
        <View style={styles.avatarContainer}>
          <Image source={{uri: item.avatar_url}} style={styles.avatar} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.login}</Text>
          <Text numberOfLines={1} onPress={this.handleUrlClick}>
            {item.html_url}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleUser: payload => dispatch(UsersActions.getSingleUser(payload)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(ListItem);

const styles = StyleSheet.create({
  itemContainer: {
    height: Metrix.VerticalSize(70),
    width: Metrix.HorizontalSize(321),
    marginVertical: Metrix.VerticalSize(10),
    ...Metrix.createShadow(),
    borderRadius: Metrix.Radius,
    flexDirection: 'row',
  },
  avatarContainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'gray',
    borderRightWidth: 1,
  },
  avatar: {
    height: Metrix.HorizontalSize(40),
    width: Metrix.HorizontalSize(40),
    borderRadius: Metrix.HorizontalSize(20),
  },
  textContainer: {
    width: '80%',
    height: '100%',
    justifyContent: 'space-around',
    paddingLeft: Metrix.HorizontalSize(10),
  },
  name: {fontSize: Metrix.FontMedium, fontWeight: 'bold'},
});
