import React from 'react';
import { View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Image,Dimensions,Animated } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';
import Global from '../styles/Global';
import { CheckAccess } from '../utils/Network';
import { MaterialIcons } from '@expo/vector-icons';
import { GetValue } from '../utils/Storage';

//Import components
import SsAvatar from '../components/SsAvatar';
import SsButton from '../components/SsButton';
import SsCounter from '../components/SsCounter';

const Styles = StyleSheet.create({
  Profile: {
    paddingTop: Constants.largestAmount,
    flex: 1
  },
  ProfileCard: {
    flex: 2
  },
  ProfileHeader: {
    padding: Constants.largeAmount
  },
  ProfileTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  AvatarFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.largerAmount,
    paddingBottom: Constants.largerAmount,
    height: Dimensions.get('window').height / 4
  },
  BlurredBackground: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  BlurredFrame: {
    overflow: 'hidden',
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width
  }
})

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundBlur: new Animated.Value(0),
      username: 'TESTING',
      email: 'TEST@TESTING.COM'
    }
  }

  componentDidMount() {
    GetValue('username').then(data => {
      this.setState({
        username: data
      });
    });

    Animated.timing(
      this.state.backgroundBlur,
      {
        toValue: 50,
        duration: 250
      }
    ).start();
  }

  render() {
    return(
      <View style={[Styles.Profile]}>
        <View style={[Styles.ProfileHeader]}>
          <Text style={[Styles.ProfileTitle]}>
            {Labels.PROFILE}
          </Text>
        </View>
        <View style={[Styles.AvatarFrame]}>
          <View style={[Styles.BlurredFrame]}>
            <Animated.Image blurRadius={20} source={{
              uri: 'https://cdn.vox-cdn.com/thumbor/i3jZzYEmCQbePOxn1GjHgE8f7TQ=/0x0:3840x2160/1200x800/filters:focal(2224x848:2838x1462)/cdn.vox-cdn.com/uploads/chorus_image/image/60888389/Spyro_Reignited_Trilogy_010_Press_Release.0.jpg',
              width: Dimensions.get('window').width,
              height: 300
            }} style={[Styles.BlurredBackground]}/>
          </View>
          <SsAvatar large round style={{
            position: 'absolute',
            top: 40,
            left: 0,
            width: 200,
            height: 200
          }}/>
        </View>
        <View style={[Styles.ProfileCard]}>
          <Text style={[Global.ScreenTitle]}>
            {this.state.username}
          </Text>
          <Text style={[Global.ScreenSubTitle]}>
            {Labels.FRIENDS_SHARED}
          </Text>
        </View>
      </View>
    );
  }
}

export default Profile;
