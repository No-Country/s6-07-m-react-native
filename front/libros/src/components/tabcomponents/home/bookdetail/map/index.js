import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { grayscaleStyle } from '../../../../../utils/constants'
import { calculateDistance } from '../../../../../utils/calculoDistancia'

const Mapa = ({ navigation }) => {
	const [distance, setDistance] = useState(0)

	const initianRegion = {
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	}

	const userMarker = {
		title: 'User',
		coordinate: {
			latitude: 37.78825,
			longitude: -122.4324,
		},
	}

	const bookMarker = {
		title: 'Book',
		coordinate: {
			latitude: 37.78825,
			longitude: -122.4,
		},
	}

	const route = [userMarker.coordinate, bookMarker.coordinate]

	const distanceInKm = calculateDistance(
		userMarker.coordinate.latitude,
		userMarker.coordinate.longitude,
		bookMarker.coordinate.latitude,
		bookMarker.coordinate.longitude
	)

	useEffect(() => {
		setDistance(distanceInKm)
	}, [])

	return (
		<MapView
			provider={PROVIDER_GOOGLE}
			style={styles.map}
			initialRegion={initianRegion}
			customMapStyle={grayscaleStyle}
		>
			<Marker coordinate={bookMarker.coordinate}></Marker>
			<Marker coordinate={userMarker.coordinate}></Marker>
			<Polyline strokeColor='#FF3D45' strokeWidth={2} coordinates={route} />
		</MapView>
	)
}

export default Mapa
