import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsCarousel: {

  }
});

class SsCarousel extends React.Component {
  render() {
    return(
      <View style={[Styles.SsCarousel]}>
        {
          this.props.header && <View>
            <Text>
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
        <View>

        </View>
      </View>
    );
  }
}

export default SsCarousel;
