import React from 'react';
import { Modal, Text, View } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onConfirm, onCancel }) => {
    const {
      containerStyle,
      textStyle,
      buttonStyle
    } = styles;

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <CardSection>
                  <Text style={textStyle}>
                    {children}
                  </Text>
                </CardSection>

                <CardSection>
                  <Button onPress={onConfirm} style={buttonStyle}>
                    Confirm
                  </Button>

                  <Button onPress={onCancel} style={buttonStyle}>
                    Cancel
                  </Button>
                </CardSection>

            </View>
        </Modal>

    );
}

const styles = {
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)', 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 25,
    color: 'red'
  },
  buttonStyle: {
    button: {
      margin: 5,
    }
  }
}

export { Confirm };