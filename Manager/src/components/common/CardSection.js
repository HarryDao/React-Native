import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    const {
        containerStyle,
    } = styles;

    return(
        <View style={[containerStyle, props.style]}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        padding: 5,
        flexDirection: 'row',
    }
}

export { CardSection };