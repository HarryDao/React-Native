import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from './common';

class EmployeeListItem extends React.Component {
    onItemPress() {
        const { employee } = this.props;

        Actions.employeeEdit({ employee });
    }

    render() {
        const { name, shift } = this.props.employee;

        return (
            <TouchableWithoutFeedback
                onPress={this.onItemPress.bind(this)}
            >
                <View>
                    <Card>
                        <CardSection>
                                <Text style={styles.TextStyle}>
                                    {name} ({shift})
                                </Text>
                        </CardSection>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    TextStyle: {
        fontSize: 23,
        lineHeight: 68,
        paddingLeft: 10,
    }
}

export default EmployeeListItem;