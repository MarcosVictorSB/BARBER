import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Container,
    Scroller,
    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,
    PageBody,
    UserInfoArea,
    ServiceArea,
    TestimonialArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton
    
} from './styles';
import Stars from '../../components/Starts'

import FavoriteIcon from '../../assets/favorite.svg'

import Swiper from 'react-native-swiper';
import Api from '../../Api';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    })

    const [barberInfo, setBarberInfo] = useState({})

    

    useEffect(() => {
        const getBarberInfo = async () => {
            setLoading(true);
    
            let json = await Api.getBarber(userInfo.id);
            if(json.error === '') {               
                setBarberInfo(json.data);                
            }else{
                alert("Erro: "+json.error);            
            }
            
            setLoading(false);
        }
        
        getBarberInfo();
    }, []);

    return (
        <Container>
            <Scroller>
                { barberInfo.photos && barberInfo.photos.length > 0 ? 
                    <Swiper
                        style={{height: 240}}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay={true}
                    > 
                        { barberInfo.photos.map((item, key) => (
                            <SwipeItem key={key}>
                                <SwipeImage source={{ uri: item.url }} resizeMode="cover" />
                            </SwipeItem>
                        ))}  
                    </Swiper> 
                    : 
                    <FakeSwiper></FakeSwiper>
                }

                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{ uri: barberInfo.avatar }} />
                        <UserInfo>
                            <UserInfoName>{ barberInfo.name }</UserInfoName>
                            <Stars stars={ barberInfo.stars } showNumber={ true } />
                        </UserInfo>
                    
                        <UserFavButton>
                            <FavoriteIcon width="24" height="24" fill="#FF0000" />
                        </UserFavButton>
                    </UserInfoArea>

                    <ServiceArea>

                    </ServiceArea>

                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>

            </Scroller>
        </Container>
    )
}