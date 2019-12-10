import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import SsButton from './SsButton';

const Styles = StyleSheet.create({
  SsCard: {
    borderColor: Colors.BORDER_COLOR,
    borderWidth: 1,
    marginTop: Constants.smallAmount,
    marginBottom: Constants.smallAmount
  },
  CardHead: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
    padding: Constants.mediumLargeAmount
  },
  CardContent: {
    padding: Constants.smallMediumAmount
  },
  CardFoot: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER_COLOR
  },
  CardAction: {
    flex: 1,
    textAlign: 'center',
    paddingTop: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount
  },
  Round: {
    borderRadius: Constants.smallAmount
  }
})

class SsCard extends React.Component {
  render() {
      return(
        <View style={[Styles.SsCard,this.props.round && Styles.Round]}>
          {
            this.props.title && <View style={[Styles.CardHead]}>
              <Text>
                {this.props.title}
              </Text>
            </View>
          }
          <View style={[Styles.CardContent]}>
            {
              this.props.children
            }
          </View>
          {
            this.props.actions && <View style={[Styles.CardFoot]}>
            {
              this.props.actions.map((action,index) => {
                  return <TouchableOpacity  style={[Styles.CardAction,index > 0 && {
                    borderLeftWidth: 1,
                    borderLeftColor: Colors.BORDER_COLOR
                  }]} key={`card-action-${index}`}>
                      <Text style={[{
                        textAlign: 'center'
                      }]}>{action.label}</Text>
                    </TouchableOpacity>
              })
            }
            </View>
          }
        </View>
      );
  }
}

export default SsCard;
