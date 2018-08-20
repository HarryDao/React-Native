import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({children, onPress, style}) => {
    const {
        buttonStyle,
        textStyle,
    } = styles;

    return(
        <TouchableOpacity
            style = {[buttonStyle, style ? style.button || {} : {}]}
            onPress = {onPress}
        >
            <Text style={[textStyle, style ? style.text || {} : {}]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = {
    buttonStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#007aff',
        flex: 1,
        padding: 5,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontWeight: '600',
        fontSize: 16,
    }
}

export { Button };