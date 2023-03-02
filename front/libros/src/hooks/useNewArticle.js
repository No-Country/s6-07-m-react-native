import axios, { Axios } from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { alertToast } from '../utils/alertsUtils'
import { REACT_APP_API_URI_NODE } from '@env'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../configFirebase'

const useNewArticle = () => {
	const user = useSelector(state => state)

	const [modalVisible, setModalVisible] = useState(false)
	const [image, setImage] = useState(null)
	const [newDonation, setNewDonation] = useState({})
	const [province, setProvince] = useState('')

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
			const source = {
				uri: result.assets[0].uri,
				fileName: result.assets[0].uri,
			}
			setImage(source)
		} else {
			alertToast(
				'error',
				'Imagen rechazada',
				'La imagen no se cargo correctamente!'
			)
		}
	}
	console.log(image)
	const uploadFirebase = async () => {
		const response = await fetch(image.uri)
		const blob = await response.blob()
		const filename = 'my-image.jpg'
		var ref = firebase.storage().ref().child(filename).put(blob)

		try {
			await ref
		} catch (error) {
			console.log(error)
		}
		setImage(null)
	}

	const CargarFirebase = async () => {
		uploadFirebase()
		const imageRef = await firebase.storage().ref().getDownloadURL()
		console.log(imageRef)
	}

	const handleSubmit = async (values, resetForm) => {
		uploadFirebase()
		const objDonation = {
			...values,
			image:
				image === ''
					? 'https://noticias.uai.cl/assets/uploads/2020/04/nota-dia-del-libro-euge-980x470-c-default.jpg'
					: image.uri,
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
		setProvince,
		uploadFirebase,
		CargarFirebase,
	}
}

export default useNewArticle
