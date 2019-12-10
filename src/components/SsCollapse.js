import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
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
    paddingBottom: Constants.mediumLargeAmount
  },
  CollapseContent: {

  }
});

class SsCollapse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: this.props.collapsed || false
    }
  }

  render() {
    return(
      <View style={[Styles.SsCollapse]}>
        <View style={[Styles.CollapseHead]}>
          <AntDesign style={[]} name={'right'} size={20}/>
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
