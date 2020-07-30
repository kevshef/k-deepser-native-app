import React, {memo, useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Picker} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {userValidator, passwordValidator, urlValidator} from '../core/utils';
import DropDownPicker from 'react-native-dropdown-picker';
import DeepAPI from "../../api/lib/src/class/DeepAPI";
import {User} from "../../api/lib/src/class/DeepEntity";
import AsyncStorage from '@react-native-community/async-storage';


let state = {
    proto: '',
}

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('userprofile', JSON.stringify(value));
    } catch (err) {
        console.log(err);
    }
};


const LoginScreen = ({navigation}) => {
    const [user, setUser] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [url, setUrl] = useState({value: '', error: ''});


    async function _onLoginPressed() {
        const userError = userValidator(user.value);
        const passwordError = passwordValidator(password.value);
        const urlError = urlValidator(url.value);

        if (userError || passwordError || urlError) {
            setUser({...user, error: userError});
            setUrl({...url, error: urlError});
            setPassword({...password, error: passwordError});

        } else {
            url.value = (state.proto + url.value).toString();


            DeepAPI.getInstance()
                .setHost(url.value)
                .setUser(user.value)
                .setPassword(password.value)
                .setAuthMode('Basic');


            let us = (new User()).getCollection();
            us.addFieldToFilter('username', user.value, 'eq');
            let collection = await us.loadCollection();

            if (collection.items[0]) {
                collection.items.push({host: url.value})
                await storeData(collection.items);
                return navigation.navigate('Dashboard');
            }
        }
    }

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('HomeScreen')}/>
            <Logo/>

            <View style={styles.hContainer}>
                <View style={styles.urlField}>
                    <TextInput
                        label="Url"
                        returnKeyType="next"
                        value={url.value}
                        onChangeText={text => setUrl({value: text, error: ''})}
                        error={!!url.error}
                        errorText={url.error}
                        autoCapitalize="none"
                        textContentType="URL"
                        keyboardType="url"
                    />
                </View>

                <DropDownPicker
                    items={[
                        {label: 'HTTP', value: 'http://'},
                        {label: 'HTTPS', value: 'https://'},
                    ]}

                    defaultValue={state.proto = 'https://'}
                    containerStyle={{width: '30%', paddingVertical: 14, paddingHorizontal: 0, height: '102%',}}
                    onChangeItem={(item) => {
                        state.proto = item.value;
                    }}
                />
            </View>

            <TextInput
                label="User"
                returnKeyType="next"
                value={user.value}
                onChangeText={text => setUser({value: text, error: ''})}
                error={!!user.error}
                errorText={user.error}
                autoCapitalize="none"
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({value: text, error: ''})}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                    <Text>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            <Button mode="contained" onPress={_onLoginPressed}>
                Login
            </Button>
        </Background>
    );
};


const styles = StyleSheet.create({
    hContainer: {
        flexDirection: 'row-reverse',
        alignContent: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        zIndex: 1,
    },
    urlField: {
        width: '70%'
    },
    label: {
        padding: 0,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },


});

export default memo(LoginScreen);