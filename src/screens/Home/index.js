import React, { useState, useEffect } from 'react';
// import { request, PERMISSIONS } from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
import { RefreshControl } from 'react-native';
import { 
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea
} from './styles';

import BarberItem from '../../components/BarberItem'

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Api from '../../Api'



export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const [refreshing, setRefreshing] = useState(false)

    const handleLocationFinder = async() => {
        setCoords(null)
        let { status } = await Location.requestBackgroundPermissionsAsync();
        if(status === 'granted') {
            setLoading(true)
            setLocationText('')
            setList([])

            const location = await Location.getCurrentPositionAsync({});
            setCoords(location.coords)
            getBarbers()
        }
    }

    const getBarbers = async() => {
        setLoading(true)
        setList([])
        
        let lat = null;
        let lng = null;
        if(coords) {
            lat = coords.latitude;
            lng = coords.longitude;
        }
        
        let res = await Api.getBarbers(lat, lng);
        if(!res.error === '') {
            alert('Erro : '+res.error)
        }

        setList(res.data);

        setLoading(false);

        
    }

    useEffect(() => {
        getBarbers();
    }, []);

    const onRefresh = () => {
        refreshing(false)
        getBarbers();
    }

    const handleLocationSearch = () => {
        setCoords({})
        getBarbers();
    }

    return (
        <Container>
            <Scroller RefreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

                <HeaderArea>
                    <HeaderTitle numberOfLines={2} >Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon  width='26' height='26' fill='#FFFFFF' />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder="Onde voce está ?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={ t => setLocationText(t)}
                        ondEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width='24' height='24' fill='#FFFFFF' />
                    </LocationFinder>
                </LocationArea>
                { loading && 
                    <LoadingIcon size='large' color='#FFFFFF' />
                }

                <ListArea>
                    { list.map((item, key) => (
                        <BarberItem key={key} data={item} />
                     )) }
                </ListArea>
                



            </Scroller>
        </Container>
  )
}