import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated,FlatList } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsCarousel: {
    padding: Constants.largerAmount
  },
  Header: {
    fontSize: Constants.largerAmount,
    fontWeight: 'bold'
  },
  Subtitle: {

  },
  Track: {
    paddingTop: Constants.largeAmount,
    paddingBottom: Constants.largeAmount
  }
});

class SsCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View style={[Styles.SsCarousel]}>
        {
          this.props.header && <View>
            <Text style={[Styles.Header]}>
              {this.props.header}
            </Text>
          </View>
        }
        {
          this.props.subtitle && <View>
            <Text>
              {this.props.subtitle}
            </Text>
          </View>
        }
        <View style={[Styles.Track]}>
          <FlatList>
            {this.props.children}
          </FlatList>
        </View>
      </View>
    );
  }
}

export default SsCarousel;
