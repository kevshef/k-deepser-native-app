import React, {memo, useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import AsyncStorage from "@react-native-community/async-storage";

const HomeScreen = ({navigation}) => {
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
        	const host = await AsyncStorage.getItem('host');
            const item = await AsyncStorage.getItem('userprofile');
            const jsonValue = JSON.parse(item);
            if(jsonValue !== null){
                return navigation.navigate('Dashboard');
            }

        } catch (err) {
            console.log(err);
        }

    }


	return (
		<Background>
			<Logo/>
			<Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
				Login
			</Button>

		</Background>
	);
};

export default memo(HomeScreen);
