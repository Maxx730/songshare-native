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
    marginBottom: Constants.smallAmount,
    backgroundColor: Colors.WHITE,
    flex: 1
  },
  CardHead: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
    paddingTop: Constants.mediumLargeAmount,
    paddingBottom: Constants.mediumLargeAmount,
    paddingLeft: Constants.largeAmount
  },
  CardContent: {
    padding: Constants.largeAmount,
    flex: 1
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
  },
  Shadow: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
})

class SsCard extends React.Component {
  render() {
      return(
        <View style={[Styles.SsCard,this.props.round && Styles.Round,this.props.shadow && Styles.Shadow]}>
          {
            this.props.title && <View style={[Styles.CardHead]}>
              <Text style={[{
                fontWeight: 'bold',
                fontSize: Constants.largeAmount
              }]}>
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
