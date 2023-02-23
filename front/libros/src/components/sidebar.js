import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import UserCard from './userCard';
import data from '../../mocks/userObj.json';

const screenUrls = [
    {
        id: '1',
        url: '',
        title: 'Editar Perfil',
        icon: 'person',
    },
    {
        id: '2',
        url: '',
        title: 'Mis Donaciones',
        icon:'shopping-cart',
    },
    {
        id: '3',
        url: '',
        title: 'Mis Solicitudes',
        icon: 'account-circle',
    },
    {
        id: '4',
        url: '',
        title: 'Mis Reseñas',
        icon: 'logout',
    },
    {
        id: '5',
        url: '',
        title: 'Logout',
        icon: 'Logout'
    }
];



const DrawerContent = () => {
    return (
        <View style={styles.body}>                
            {screenUrls.map((item, index) => (
                    <Text 
                    key={index}
                    onPress={() => {
                        console.log('item', item);
                        console.log('index', index);
                        console.log('item.id', item.id);
                        console.log('item.url', item.url);
                        console.log('item.title', item.title);
                    }}
                    style={styles.text}>
                    {item.title}
                    </Text>
            ))}               
        </View>
    )
}

const Sidebar = (props) => {
   
    return(
        <View style={styles.container}>
        <MenuDrawer
          open={props.toggle}
          position={'left'}
          drawerPercentage={50}
          animationTime={250}
          overlay={true}
          opacity={1}
        >
            <UserCard data={data} style={styles.customCard} starRight={true}/>
            <DrawerContent/>
        </MenuDrawer>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 0,
      zIndex: 10, 
    },
    animatedBox: {
      flex: 1,
      padding: 0,
    },
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    customCard: {
        width: 300,
        backgroundColor: '#fff',
    },
    text: {
        margin: 10,
        paddingTop: 0,
    }
  })

export default Sidebar;