import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

// import userDetail from '../../mocks/userObj.json';
import avatar from '../../assets/avatar.jpeg';
import star from '../../assets/star.png';

// Para cambiar o quitar estrellas de la card del usuario 
// solo poner si es a la derecha true, si es a la izquierda false
// y si desean quitar las estrellas poner 'none' con las comillas
// aun me faltan algunas cosas que deseo integrar.

const UserImage = ({...props}) => {
    return(
        <Image source={avatar} style={styles.avatar} />
    )
}

const UserStar = ({...props}) => {
        return(
        <View style={styles.starContainer}>
        {
            props.starRight === false ? 
            (<Image source={star} style={styles.star} />)
            : props.starRight === 'none' ? ("") : 
            '' 
        }
        { props.starRight === 'none' ? '' 
        :  <Text>{props.star}</Text>
        }
        {
            props.starRight === true ?
            (<Image source={star} style={styles.star} />)
            : props.starRight === "none" ? ("") : 
            '' 
        }
        </View>
    )
}

const UserCard = ({data, starRight}) => {

    return (
        <View style={styles.userContainer}>
            <View style={styles.details}>
                <UserImage />
                <UserStar star={data.user.stars_Avg} starRight={starRight} />
                <Text style={styles.userName}>{data.user.name}</Text>
                <Text style={styles.location}>{data.user.location}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#131313',
        padding: 15
    },
    details: {
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
        padding: 10
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    userName: {
        fontWeight: 'bold',
    }, 
    location: {},
    starContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10
    },
    star: {
        width: 18,
        height: 18,
        marginHorizontal: 5
    }
});

export default UserCard;