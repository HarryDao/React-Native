import React, { Component } from 'react';
import { View, Text, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onFormSubmit() {
        const {
            email,
            password,

            onUserLogin,
        } = this.props;

        onUserLogin(email, password, () => {
            Actions.main();
        });
    }

    renderButton() {
        const { loading } = this.props;

        if (loading) {
            return <Spinner/>;
        }

        return (
            <Button
                onPress={this.onFormSubmit.bind(this)}
            >
                Login
            </Button>
        );
    }

    render() {
        const {
            email, 
            password,
            error,

            onAuthInputChange,
        } = this.props;

        const {
            errorContainerStyle,
            errorTextStyle,
        } = styles;

        return (
            <View>
                <Card>
                    <CardSection>
                        <Input
                            label='Email'
                            placeholder='user@gmail.com'
                            value={email}
                            onChangeText={email => onAuthInputChange('email', email)}
                        />
                    </CardSection>
                    
                    <CardSection>
                        <Input
                            secureTextEntry
                            label='Password'
                            placeholder='password'
                            value={password}
                            onChangeText={password => onAuthInputChange('password', password)}
                        />
                    </CardSection>

                    <View style={errorContainerStyle}>
                        <Text style={errorTextStyle}>
                            {error}
                        </Text>
                    </View>

                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const {
        email, 
        password, 
        error, 
        loading, 
        authenticated
    } = auth;

    return {
        email, 
        password, 
        error, 
        loading, 
        authenticated
    };
}


const styles = {
    errorContainerStyle: {
        alignItems: 'center',
    },
    errorTextStyle: {
        fontSize: 20,
        lineHeight: 50,
        color: 'red',
    }
}

export default connect(mapStateToProps, actions)(LoginForm);