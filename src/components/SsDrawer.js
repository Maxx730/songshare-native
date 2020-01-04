import React from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity,Switch,Dimensions,Animated } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsDrawer: {
    position: 'absolute'
  },
  Shade: {
    backgroundColor: Colors.BLACK,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    opacity: Constants.shadeAmount
  },
  Drawer: {
    backgroundColor: Colors.WHITE
  },
  Head: {
    flexDirection: 'row',
    borderBottomColor: Colors.BORDER_COLOR,
    borderBottomWidth: 1
  },
  Title: {
    flex: 1,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: Constants.largeAmount,
    color: Colors.PRIMARY
  },
  Close: {
    justifyContent: 'flex-end',
    padding: Constants.mediumAmount,
    borderLeftWidth: 1,
    borderLeftColor: Colors.BORDER_COLOR
  },
  Content: {
    padding: Constants.largeAmount
  }
})

class SsDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerHeight: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.drawerHeight,{
      toValue: this.props.height,
      duration: Constants.drawerDuration
    }).start();
  }

  render() {
    return(
      <View style={[Styles.SsDrawer]}>
        <View style={[Styles.Shade]}>

        </View>
        <Animated.View style={[Styles.Drawer,{
          height: this.state.drawerHeight
        }]}>
          <View style={[Styles.Head]}>
            <Text style={[Styles.Title]}>
              {this.props.head ? this.props.head : 'DEFAULT HEAD'}
            </Text>
            <TouchableOpacity style={[Styles.Close]} onPress={() => {
              Animated.timing(
                this.state.drawerHeight,
                {
                  toValue: 0,
                  duration: Constants.drawerDuration
                }
              ).start(this.props.onClose && this.props.onClose);
            }}>
              <Feather name={'x'} size={36} color={Colors.PRIMARY}/>
            </TouchableOpacity>
          </View>
          <View style={[Styles.Content]}>
            {this.props.children}
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default SsDrawer;
