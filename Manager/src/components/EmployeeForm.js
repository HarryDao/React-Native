import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { CardSection, Input } from './common';

class EmployeeCreatee extends Component {
    renderDays() {
        const days = [
            'Monday', 
            'Tuesday', 
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];

        return days.map(day => {
            return <Picker.Item key={day} label={day} value={day} />
        });
    }

    render() {
        const {
            name,
            phone,
            shift,
            onEmployeeFormInputChange,
        } = this.props;

        return (
            <View>
                <CardSection>
                    <Input
                        label='Name'
                        placeholder='Jane'
                        value={name}
                        onChangeText={name => onEmployeeFormInputChange('name', name)}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label='Phone'
                        placeholder='555-555-5555'
                        value={phone}
                        onChangeText={phone => onEmployeeFormInputChange('phone', phone)}
                    />
                </CardSection>

                <CardSection style={styles.PickerContainerStyle}>
                    <Text style={styles.PickerTextStyle} >Shift</Text>
                    <Picker
                        selectedValue={shift}
                        onValueChange={shift => onEmployeeFormInputChange('shift', shift)}
                    >
                        {this.renderDays()}
                    </Picker>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    PickerContainerStyle: {
        flexDirection: 'column'
    },
    PickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 5,
    }
}

const mapStateToProps = ({ employee }) => {
    const { name, phone, shift } = employee.form;

    return { name, phone, shift };
}

export default connect(mapStateToProps, actions)(EmployeeCreatee);