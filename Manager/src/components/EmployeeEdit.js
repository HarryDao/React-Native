import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';
import * as actions from '../actions';
import { Card, CardSection, Button, Spinner, Confirm } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends React.Component {
    state = {
        showModal: false,
        loadingSave: false,
        loadingRemove: false,
    };

    componentWillMount() {
        const { employee, onEmployeeFormInputChange } = this.props;
        const { name, phone, shift} = employee;

        onEmployeeFormInputChange('name', name);
        onEmployeeFormInputChange('phone', phone);
        onEmployeeFormInputChange('shift', shift);
    }

    onToggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    onSavePress() {
        const { uid } = this.props.employee;
        const {
            name, 
            phone, 
            shift,
            onEmployeeEdit,
        } = this.props;
    
        this.setState({ loadingSave: true });

        onEmployeeEdit({ uid, name, phone, shift }, (err) => {
            this.setState({ loadingSave: false });

            if (!err) {
                Actions.pop();
            }
        });
    } 

    onTextPress() {
        const { name, phone, shift } = this.props.employee;
        const message = `Hi ${name}, your upcoming shift is on ${shift}`;

        Communications.text(phone, message);
    }

    onRemovePress() {
        const { employee, onEmployeeRemove } = this.props;

        this.setState({ loadingRemove: true });
        
        onEmployeeRemove({ uid: employee.uid }, (err) => {
            this.setState({ loadingRemove: false });

            if (!err) {
                this.onToggleModal();
                Actions.pop();
            }
        });
    }

    renderSaveButton() {
        if (this.state.loadingSave) {
            return <Spinner/>
        }

        return (
            <Button onPress={this.onSavePress.bind(this)}>
                Save Changes
            </Button>
        );
    }

    renderRemoveButton() {
        if (this.state.loadingRemove) {
            return <Spinner/>
        }

        return (
            <Button
                style={styles.removeStyle}
                onPress={this.onToggleModal.bind(this)}
            >
                Remove
            </Button>
        );
    }

    render() {
        const { name } = this.props.employee;

        return (
            <Card>
                <EmployeeForm/>

                <CardSection>
                    {this.renderSaveButton()}
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    {this.renderRemoveButton()}
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onConfirm={this.onRemovePress.bind(this)}
                    onCancel={this.onToggleModal.bind(this)}
                >
                    Are you sure you want to remove {name}?
                </Confirm>
            </Card>
        );
    }
}

const styles = {
    removeStyle: {
        button: {
            borderColor: 'red'
        },
        text: {
            color: 'red'
        }
    }

}

const mapStateToProps = ({ employee }) => {
    const { name, phone, shift } = employee.form;
    return { name, phone, shift };
}

export default connect(mapStateToProps, actions)(EmployeeEdit);