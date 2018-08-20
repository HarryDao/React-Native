import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import { Card, CardSection, Button, Spinner } from './common';
import EmployeeForm from './EmployeeForm';


class EmployeeCreatee extends Component {
    onButtonPress() {
        const { name, phone, shift, onEmployeeCreate } = this.props;

        onEmployeeCreate({ name, phone, shift: shift || 'Monday' }, () => {
            Actions.pop();
        });
    }

    renderButton() {
        const { loading } = this.props;

        if (loading) {
            return <Spinner />
        }

        return (
            <Button
                onPress={this.onButtonPress.bind(this)}
            >
                Create
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <EmployeeForm />

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}


const mapStateToProps = ({ employee }) => {
    const { name, phone, shift, loading } = employee.form;

    return { name, phone, shift, loading };
}

export default connect(mapStateToProps, actions)(EmployeeCreatee);