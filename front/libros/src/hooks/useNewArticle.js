import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { alertToast } from '../utils/alertsUtils'
import { REACT_APP_API_URI_NODE } from '@env'
import * as ImagePicker from 'expo-image-picker'

const useNewArticle = () => {
	const user = useSelector(state => state)

	const [modalVisible, setModalVisible] = useState(false)
	const [image, setImage] = useState('')
	const [newDonation, setNewDonation] = useState({})

	const uploadCloudinary = async imageCloud => {
		const data = new FormData()
		data.append('file', {
			uri: imageCloud.uri,
			type: imageCloud.image,
			fileName: imageCloud.fileName || 'photo.jpg',
		})
		data.append('upload_preset', 'libros-app')

		try {
			const response = await axios.post(
				'https://api.cloudinary.com/v1_1/dtjoj3fui/image/upload',
				data
			)
			const data = await response.json()
			console.log('Upload successful:', data)
		} catch (error) {
			console.log('cloudinary', error)
		}
	}

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
			uploadCloudinary(result.assets[0])
		} else {
			alertToast(
				'error',
				'Imagen rechazada',
				'La imagen no se cargo correctamente!'
			)
		}
	}

	const handleSubmit = async (values, resetForm) => {
		const objDonation = {
			...values,
			image:
				image === ''
					? 'https://noticias.uai.cl/assets/uploads/2020/04/nota-dia-del-libro-euge-980x470-c-default.jpg'
					: image,
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
		setImage,
		uploadImage,
		handleSubmit,
		setModalVisible,
	}
}

export default useNewArticle
