import React, { useState } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Pressable,
	Image,
	FlatList,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles'
import CardReview from './../cardreview'
import { Platform } from 'react-native'

const CustomModal = ({ data, setModalVisible, modalVisible }) => {
	const Ionicons =
		Platform.OS === 'ios'
			? require('react-native-vector-icons/Ionicons').default
			: require('react-native-vector-icons/Ionicons').default

	return (
		<View style={styles.centeredView}>
			{/*
			 * Header modal
			 */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
					<Ionicons
						style={styles.arrrow}
						name='arrow-back'
						size={24}
						color='black'
					/>
				</TouchableOpacity>
				<Text style={styles.headerText}>Reseñas</Text>
			</View>
			{/*
			 * Card modal
			 */}
			<View style={[styles.card, styles.elevation]}>
				<View style={styles.containerImage}>
					<Image
						style={styles.image}
						source={require('./../../../../../../assets/avatar.jpeg')}
					/>
				</View>
				<View style={styles.containerReview}>
					<Text style={styles.textReview}>⭐️⭐️⭐️⭐️⭐️ 5.0</Text>
				</View>
				<Text style={styles.cardText}>{data[0]?.author}</Text>
				<Text style={styles.cardLocation}>México,Cuernavaca</Text>
				<TouchableOpacity style={styles.buttonCard}>
					<Text style={styles.textButtonCard}>Solicitar</Text>
				</TouchableOpacity>
			</View>
			{/*
			 * Content Reviews
			 */}

			<View style={styles.contentReview}>
				<Text style={styles.titleReview}>Reseñas</Text>
				<FlatList
					contentContainerStyle={styles.contentContainer}
					data={data}
					renderItem={({ item }) => <CardReview data={item} />}
					keyExtractor={item => item.isbn}
				/>
			</View>
		</View>
	)
}

export default CustomModal
