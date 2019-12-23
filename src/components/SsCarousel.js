import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated,FlatList } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

import SsButton from './SsButton';

const Styles = StyleSheet.create({
  SsCarousel: {
    paddingBottom: Constants.smallAmount
  },
  Header: {
    fontSize: Constants.largerAmount,
    fontWeight: 'bold',
    paddingLeft: Constants.largestAmount
  },
  Subtitle: {

  },
  Track: {
    paddingTop: Constants.largeAmount,
    paddingBottom: Constants.largeAmount
  },
  Item: {
    marginLeft: Constants.largeAmount,
    marginRight: Constants.largeAmount,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.PRIMARY,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: .6,
    shadowRadius: Constants.smallAmount,
  },
  ItemTitle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 9999,
    width: 137,
    textAlign: 'center',
    color: Colors.WHITE,
    padding: Constants.mediumAmount
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
      <View style={[Styles.SsCarousel,this.props.style && this.props.style]}>
        {
          this.props.header && <View>
            <Text style={[Styles.Header,this.props.headerStyle && this.props.headerStyle]}>
              {this.props.header}
            </Text>
          </View>
        }
        {
          this.props.subtitle && <View>
            <Text style={[this.props.headerStyle && this.props.headerStyle]}>
              {this.props.subtitle}
            </Text>
          </View>
        }
        <View style={[Styles.Track]}>
          <FlatList style={[{
            paddingBottom: Constants.largeAmount,
            paddingTop: Constants.largeAmount
          }]} horizontal={true} data={this.props.data} renderItem={(item,index) => {
            return(
              <View style={[Styles.Item]} key={`carousel-item-${item.item.name}`}>
                <Text style={[Styles.ItemTitle]}>{item.item.name}</Text>
                <Image source={{
                  uri: item.item.icons[0].url,
                  width: 137,
                  height: 137
                }}/>
              </View>
            )
          }}>

          </FlatList>
        </View>
      </View>
    );
  }
}

export default SsCarousel;
