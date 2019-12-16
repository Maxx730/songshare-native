import React from 'react';
import { View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Image,Dimensions,Animated } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';
import { CheckAccess } from '../utils/Network';
import { MaterialIcons } from '@expo/vector-icons';

//Import components
import SsAvatar from '../components/SsAvatar';
import SsButton from '../components/SsButton';
import SsCounter from '../components/SsCounter';

const Styles = StyleSheet.create({
  Profile: {

  },
  UserImage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.superAmount / 2
  },
  UserInfo: {
    flexDirection: 'row',
    paddingRight: Constants.largeAmount,
    paddingLeft: Constants.largeAmount
  },
  UserActions: {
    paddingBottom: Constants.largeAmount,
    paddingLeft: Constants.largeAmount,
    paddingRight: Constants.largeAmount
  },
  UserCounters: {
    flexDirection: 'row',
    paddingLeft: Constants.largeAmount,
    paddingRight: Constants.largeAmount,
    paddingTop: Constants.largeAmount
  },
  ProfileTop: {
    backgroundColor: Colors.PRIMARY,
    overflow: 'hidden'
  }
})

class Profile extends React.Component {
  render() {
    return(
      <View style={[Styles.Profile]}>
        <View style={[Styles.ProfileTop]}>
          <Image source={require('../../assets/img/register_background.jpg')} style={[{
            opacity: .4,
            position: 'absolute',
            width: Dimensions.get('window').width
          }]}/>
          <View style={[Styles.UserImage]}>
            <SsAvatar large round source={require('../../assets/img/default-user-img.jpg')}/>
          </View>
          <View style={[Styles.UserInfo]}>
            <View style={[{
              flex: 1,
              padding: Constants.largeAmount,
              alignItems: 'center'
            }]}>
              <Text style={[{
                fontSize: Constants.largerAmount,
                fontWeight: 'bold',
                color: Colors.WHITE
              }]}>
                Username
              </Text>
              <View style={[{
                flexDirection: 'row'
              }]}>
                <View style={[{
                  padding: Constants.tinySmallAmount
                }]}>
                  <MaterialIcons name={'location-on'} size={10} color={Colors.WHITE} style={{

                  }}/>
                </View>
                <View>
                  <Text style={[{
                    color: Colors.WHITE,
                    fontWeight: 'bold'
                  }]}>
                    Burlington, VT
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[Styles.UserActions]}>
            <SsButton label={Labels.FOLLOW} primary caps/>
          </View>
        </View>
        <View style={[Styles.UserCounters]}>
          <SsCounter value={127} label={Labels.FOLLOWERS}/>
          <SsCounter value={54} label={Labels.FOLLOWING}/>
          <SsCounter value={324} label={Labels.SHARED}/>
        </View>
      </View>
    );
  }
}

export default Profile;
