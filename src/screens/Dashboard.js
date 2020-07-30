import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import ServiceOperations from "./ServiceOperations";
import CMDB from "./CMDB";
import HomeScreen from "./HomeScreen";
import Button from "../components/Button";
import AsyncStorage from '@react-native-community/async-storage';
import Users from "./User";

const {width} = Dimensions.get("window");

class LoadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainDrawer: true,
            host: '',
            currentComponent: '',
            loading: false,
            data: [],
            error: null,
            refreshing: false
        };

    }

    getData = async () => {
        try {
            const item = await AsyncStorage.getItem('userprofile');
            const jsonValue = JSON.parse(item);
            return jsonValue;
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount = () => {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = async () => {
        this.setState({loading: true});
        const data = await this.getData();

        this.setState({data: data});

        return data;
    };

    static CustomDrawerNavigation = (props) => {

        return (
            <SafeAreaView style={{flex: 1}}>

                <View style={{height: 100, backgroundColor: '#d2d2d2', opacity: 0.9}}>

                    <View
                        style={{height: 100, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center'}}>
                        <Text> DEMO ADMIN </Text>
                    </View>

                </View>
                <ScrollView>
                    <DrawerItems {...props} />
                </ScrollView>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>

                    <View>
                        <Button style={{alignItems: 'center', justifyContent: 'center', width: '50%'}} mode="contained"
                                onPress={() => {
                                    AsyncStorage.clear();
                                    props.navigation.navigate('HomeScreen')
                                }}>
                            Logout
                        </Button>
                    </View>

                </View>

            </SafeAreaView>
        );
    }

    static Drawer = createDrawerNavigator({
            ServiceOperations: {
                screen: ServiceOperations,
                navigationOptions: {
                    title: 'Service Operations'
                },
            },
            Ci: {
                screen: CMDB,
                navigationOptions: {
                    title: 'CMDB'
                },
            },
            User: {
                screen: Users,
                navigationOptions: {
                    title: 'Users'
                }
            }
        },
        {
            drawerPosition: 'left',
            contentComponent: this.CustomDrawerNavigation,
            drawerOpenRoute: 'DrawerOpen',
            drawerCloseRoute: 'DrawerClose',
            drawerToggleRoute: 'DrawerToggle',
            drawerWidth: (width / 3) * 2
        });

}

const Dashboard = createAppContainer(LoadComponent.Drawer);


export default Dashboard;
