import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {Metrix, Images} from '../../config';
import {UsersActions} from '../../store/actions';
import {Loader} from '../../components';

class UserDetailsModal extends Component {
  hideModal = () => {
    this.props.closeUserModal();
  };
  render() {
    const {
      singleUserDetails,
      gettingUserDetails,
      showUserDetailsModal,
    } = this.props;
    return (
      <Modal visible={showUserDetailsModal} transparent>
        <TouchableOpacity
          style={styles.backDrop}
          activeOpacity={1}
          onPress={this.hideModal}>
          <TouchableOpacity
            onPress={this.hideModal}
            style={styles.closeIconContainer}>
            <Image source={Images.closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            {gettingUserDetails ? (
              <Loader
                containerHeight={Metrix.VerticalSize(150)}
                containerWidth={Metrix.HorizontalSize(300)}
              />
            ) : (
              <>
                <View style={styles.containerHeader}>
                  <View style={styles.headersSideContainer}>
                    <Text>{singleUserDetails.followers}</Text>
                    <Text>Followers</Text>
                  </View>
                  <Image
                    source={{uri: singleUserDetails.avatar_url}}
                    style={styles.avatar}
                  />
                  <View style={styles.headersSideContainer}>
                    <Text>{singleUserDetails.following}</Text>
                    <Text>Following</Text>
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.text, styles.name]}>
                    {singleUserDetails.name}
                  </Text>
                  <Text style={styles.text}>{singleUserDetails.location}</Text>
                </View>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    showUserDetailsModal: state.Users.showUserDetailsModal,
    gettingUserDetails: state.Users.gettingUserDetails,
    singleUserDetails: state.Users.singleUserDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeUserModal: () => dispatch(UsersActions.closeUserModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsModal);

const styles = StyleSheet.create({
  backDrop: {
    height: Metrix.VerticalSize(),
    width: Metrix.HorizontalSize(),
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    height: Metrix.HorizontalSize(30),
    width: Metrix.HorizontalSize(30),
    right: Metrix.HorizontalSize(15),
    top: Metrix.VerticalSize(30),
  },
  closeIcon: {height: '100%', width: '100%'},
  container: {
    height: Metrix.VerticalSize(150),
    width: Metrix.HorizontalSize(321),
    backgroundColor: 'white',
    borderRadius: Metrix.Radius,
  },
  containerHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '50%',
  },
  headersSideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: Metrix.HorizontalSize(100),
    width: Metrix.HorizontalSize(100),
    borderRadius: Metrix.HorizontalSize(50),
    marginTop: Metrix.HorizontalSize(-50),
  },
  textContainer: {marginTop: Metrix.VerticalSize(10)},
  text: {
    alignSelf: 'center',
  },
  name: {
    fontSize: Metrix.FontLarge,
  },
});
