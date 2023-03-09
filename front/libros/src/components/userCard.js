import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'

// import userDetail from '../../mocks/userObj.json';
import avatar from '../../assets/avatar.jpeg'
import star from '../../assets/star.png'

// Para cambiar o quitar estrellas de la card del usuario
// solo poner si es a la derecha true, si es a la izquierda false
// y si desean quitar las estrellas poner 'none' con las comillas
// aun me faltan algunas cosas que deseo integrar.

const UserImage = ({ ...props }) => {
	return (
		<Image
			source={{
				uri: 'https://us.123rf.com/450wm/jemastock/jemastock1904/jemastock190432680/123069327-libros-volando-y-dibujos-animados-apilados-sobre-fondo-azul-splash.jpg?ver=6',
			}}
			style={styles.avatar}
		/>
	)
}

const UserStar = ({ ...props }) => {
	return (
		<View style={styles.starContainer}>
			{props.starRight === false ? (
				<Image source={star} style={styles.star} />
			) : props.starRight === 'none' ? (
				''
			) : (
				''
			)}
			{props.starRight === 'none' ? '' : <Text>{props.star}</Text>}
			{props.starRight === true ? (
				<Image source={star} style={styles.star} />
			) : props.starRight === 'none' ? (
				''
			) : (
				''
			)}
		</View>
	)
}

const UserCard = ({ data, starRight, style }) => {
	return (
		<View style={[styles.userContainer, style]}>
			<View style={styles.details}>
				<UserImage />
				<Text style={styles.userName}>franrey</Text>
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
		padding: 15,
	},
	details: {
		backgroundColor: '#f1f1f1',
		borderRadius: 10,
		width: '60%',
		alignItems: 'center',
		padding: 10,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	userName: {
		fontWeight: 'bold',
		paddingTop: 20,
	},
	location: {},
	starContainer: {
		display: 'flex',
		flexDirection: 'row',
		padding: 10,
	},
	star: {
		width: 18,
		height: 18,
		marginHorizontal: 5,
	},
})

export default UserCard
