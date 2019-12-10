import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import SsButton from './SsButton';

const Styles = StyleSheet.create({
  SsButtonSet: {
    flexDirection: 'row'
  }
})

class SsButtonSet extends React.Component {
  constructor(props) {
    super(props);

    this.setActiveButton = this.setActiveButton.bind(this);

    this.state = {
      //Default the active button to the first one if it is not defined.
      active: this.props.active || 0
    }
  }

  render() {
    return(
      <View style={[Styles.SsButtonSet]}>
        {
          this.props.children.map((child,index) => {
              return <SsButton buttonPosition={index} onPress={() => {
                this.setActiveButton(index);
              }} primary={index == this.state.active ? true : false} icon={child.props.icon ? child.props.icon : null} position={this.getButtonPosition(index)} key={`buttonset-button-${index}`} label={child.props.label}/>
          })
        }
      </View>
    );
  }

  getButtonPosition(index) {
    if(index > 0 && index < (this.props.children.length - 1)){
      return 'center';
    } else {
      if(index > 0) {
        return 'right';
      } else {
        return 'left';
      }
    }
  }

  setActiveButton(button) {
    this.setState({
      active: button
    });
  }
}

export default SsButtonSet;
