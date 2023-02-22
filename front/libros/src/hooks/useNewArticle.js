import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { alertToast } from '../utils/alertsUtils'
import { REACT_APP_API_URI_NODE } from '@env'
import * as ImagePicker from 'expo-image-picker'

const useNewArticle = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const [image, setImage] = useState('')
	const [newDonation, setNewDonation] = useState({})
	const user = useSelector(state => state)

	const uploadImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled) {
			alertToast(
				'success',
				'Imagen cargada',
				'La imagen se cargo correctamente!'
			)
			setImage(result.assets[0].uri)
		}
	}

	const handleSubmit = async (values, resetForm) => {
		const objDonation = {
			...values,
			image,
			userId: user.user.ID,
		}
		try {
			await axios
				.post(`${REACT_APP_API_URI_NODE}/book/donateBook`, objDonation)
				.then(response => {
					if (response.data.status === 200) {
						setNewDonation(response.data)
						setModalVisible(true)
					}
				})
		} catch (error) {
			console.log(error)
			alertToast('error', '❌', 'Error al crear la publicacion')
		}

		resetForm()
		setImage('')
	}

	return {
		modalVisible,
		image,
		uploadImage,
		handleSubmit,
		setModalVisible,
	}
}

export default useNewArticle
