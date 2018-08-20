import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';


const Routers = () => {
    return (
        <Router>
            <Scene key='root' hideNavBar>
                <Scene key='login'>
                    <Scene
                        key='loginForm'
                        component={LoginForm}
                        title='Login'
                    />
                </Scene>
                <Scene key='main'>
                    <Scene 
                        key='employeeList'
                        component={EmployeeList}
                        title='Employees'
                        rightTitle='Add'
                        onRight={() => Actions.employeeCreate()}
                    />
                    <Scene 
                        // initial
                        key='employeeCreate'
                        component={EmployeeCreate}
                        title='Create New Employee'
                    />
                    <Scene
                        // initial
                        key='employeeEdit'
                        component={EmployeeEdit}
                        title='Edit'
                    />
                </Scene>
            </Scene>
        </Router>
    );
}

export default Routers;