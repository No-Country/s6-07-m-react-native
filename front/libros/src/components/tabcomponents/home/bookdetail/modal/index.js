import React, { useState } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Pressable,
	Image,
	FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles'
import CardReview from './../cardreview'
import { Platform } from 'react-native'
//Redux
import { useSelector, useDispatch } from 'react-redux'
//Api
import { post } from '../../../../../utils/apiUtils'
//Alerts
import { alertToast } from '../../../../../utils/alertsUtils'
import { setHistoryChat } from '../../../../../store/slices/historyChat.slice'

const CustomModal = ({ data, setModalVisible, modalVisible }) => {
	const Ionicons =
		Platform.OS === 'ios'
			? require('react-native-vector-icons/Ionicons').default
			: require('react-native-vector-icons/Ionicons').default

	const user = useSelector(state => state.user)
	const { bookSelected } = useSelector(state => state.books)
	const historyChat = useSelector(state => state.historyChat)
	const dispatch = useDispatch()
	const { navigate } = useNavigation()

	const handlePressed = async () => {

		try {
			const data = {
				users: [user.ID, bookSelected.userId],
				bookId: bookSelected._id,
				chats: []
			}

			const { data: { done, status } } = await post('/chat', data)

			if (done) {
				dispatch(setHistoryChat({
					...historyChat,
					status: "idle"
				})
				)
				navigate("Chat", "Conversation")
			} else {
				alertToast("error", status, "Ocurrió un error. Intenta nuevamente.")
			}
		} catch (error) {
			console.log("Modal Catch Error: ", error)
		}
	}
	//
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
				<Text style={styles.cardText}>{data[0].author}</Text>
				<Text style={styles.cardLocation}>México,Cuernavaca</Text>
				<TouchableOpacity style={styles.buttonCard}>
					<Text style={styles.textButtonCard} onPress={handlePressed}>
						Solicitar
					</Text>
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
