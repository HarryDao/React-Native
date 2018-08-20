import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import _ from 'lodash';
import * as actions from '../actions';
import { Spinner } from './common';
import EmployeeListItem from '../components/EmployeeListItem';



class EmployeeList extends Component {
    state = { loadingList: true }

    componentWillMount() {
        this.props.onEmployeesFetch(() => {
            this.setState({ loadingList: false });
        });
        
        this.initializeDatabase(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.initializeDatabase(nextProps);
    }

    initializeDatabase(props) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        
        this.setState({ dataSource: ds.cloneWithRows(props.employees) })
    }

    renderRow(employee) {
        return (
            <EmployeeListItem
                employee={employee}
            />
        );
    }

    render() {
        if (this.state.loadingList) {
            return <Spinner />;
        }

        return (
            <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = ({ employee }) => {
    const employees = _.map(employee.employees, (employee, uid) => {
        employee.uid = uid;
        return employee;
    });

    return { employees };
}

export default connect(mapStateToProps, actions)(EmployeeList);