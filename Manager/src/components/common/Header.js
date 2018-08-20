import React from 'react';
import { View, Text } from 'react-native';

const Header = ({children}) => {
    const {
        containerStyle,
        textStyle
    } = styles;

    return(
        <View style={containerStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </View>
    );
}

const styles = {
    containerStyle: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    textStyle: {
        fontSize: 20,
        paddingTop: 15,
    }
}

export { Header };