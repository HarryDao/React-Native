import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as actions from '../actions';

class SettingsScreen extends React.Component {
    render() {
        return (
            <View>
                <Button
                    title='Reset Liked Jobs'
                    large
                    buttonStyle={styles.buttonStyle}
                    icon={{ name: 'delete-forever' }}
                    onPress={this.props.clearLikedJobs}
                />
            </View>
        );
    }
}

const styles= {
    buttonStyle: {
        marginTop: 10,
        backgroundColor: 'red'
    }
}

export default connect(null, actions)(SettingsScreen);