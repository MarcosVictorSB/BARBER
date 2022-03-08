import React, { useState, useContext } from 'react';
import { useNavigation }  from '@react-navigation/native'
// import AsyncStorage from '@react-native-community/async-storage';
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
import PersonIcon from '../../assets/person.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SignInput';

import Api from '../../Api';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async() => {
        if(emailField === '' && passwordField === '' && nameField){
            return alert('Preencha os campos')           
        }

        let res = await Api.signUp(nameField, emailField, passwordField);
        if(!res.token){
            return alert("Error: "+res.error)
        }

        await AsyncStorage.setItem('token', res.token);
        userDispatch({
            type: 'setAvatar',
            payload: {
                avatar: json.data.avatar
            }
        });

        navigation.reset({
            routes: [{ name: 'SignIn' }]
        })
    }

    const handleMessageButtonClick = () => {        
        navigation.reset({
            routes: [{name: 'SignIn'}]
        })
    }



    return (
        <Container>
            <BarberLogo width="100%" height="160" ></BarberLogo>
            
            <InputArea>
              <SignInput 
                    IconSvg={PersonIcon}
                    placeholder="Digite o seu nome"
                    value={nameField}
                    onChangeText={ t => setNameField(t)}
                />
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
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta ?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça o login</SignMessageButtonTextBold>
            </SignMessageButton>
            
        </Container>
    )
}