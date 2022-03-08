import React, { useState, useContext } from 'react';
import { useNavigation }  from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext  } from '../../contexts/UserContext'

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SignInput';
import Api from '../../Api';


export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);


    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async() => {
        if(emailField === '' && passwordField === ''){
            return alert('Preencha os campos')           
        }

        let json = await Api.signIn(emailField, passwordField);
        if(!json.token) {    
            return alert('Email ou senha errados');            
        }

        await AsyncStorage.setItem('token', json.token);
        userDispatch({
            type: 'setAvatar',
            payload: {
                avatar: json.data.avatar
            }
        });

        navigation.reset({
            routes: [{ name: 'MainTab' }]
        })

    }

    const handleMessageButtonClick = () => {        
        navigation.reset({
            routes: [{name: 'SignUp'}]
        })
    }



    return (
        <Container>
            <BarberLogo width="100%" height="160" ></BarberLogo>
            
            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite o seu email"
                    value={emailField}
                    onChangeText={ t => setEmailField(t)}
                />
                
                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={ t => setPasswordField(t)}
                    password={true}
                />


                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Login</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta ?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
            
        </Container>
    )
}