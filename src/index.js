import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
    HomeScreen,
    LoginScreen,
    ForgotPasswordScreen,
    Dashboard,
} from './screens';

const Router = createStackNavigator(
    {
        HomeScreen,
        LoginScreen,
        ForgotPasswordScreen,
        Dashboard,
    },
    {
        initialRouteName: 'HomeScreen',
        headerMode: 'none',
    }
);

export default createAppContainer(Router);
