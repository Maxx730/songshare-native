import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Animated } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { AntDesign } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsCollapse: {
    borderColor: Colors.BORDER_COLOR,
    borderWidth: 1,
    marginTop: Constants.smallAmount,
    marginBottom: Constants.smallAmount
  },
  CollapseHead: {
    paddingTop: Constants.mediumLargeAmount,
    paddingBottom: Constants.mediumLargeAmount,
    paddingLeft: Constants.mediumLargeAmount,
    flexDirection: 'row'
  },
  CollapseContent: {

  },
  Round: {
    borderRadius: Constants.smallAmount
  }
});

class SsCollapse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: this.props.collapsed || false,
      rotation: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(this.state.rotation,{
      toValue: 90,
      duration: 5000
    }).start();
  }

  render() {
    return(
      <View style={[Styles.SsCollapse,this.props.round && Styles.Round]}>
        <View style={[Styles.CollapseHead]}>
          <TouchableOpacity onPress={() => {
            this.setState({
              collapsed: !this.state.collapsed
            });
          }}>
            <Animated.View>
              <AntDesign style={[]} name={'right'} size={20}/>
            </Animated.View>
          </TouchableOpacity>
          {
            this.props.label && <Text>
              {this.props.label}
            </Text>
          }
        </View>
        {
          this.state.collapsed && <View>
            {this.props.children}
          </View>
        }
      </View>
    );
  }
}

export default SsCollapse;
