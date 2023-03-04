import React from 'react'

const test = () => {
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

			const uri = result.assets[0].uri
			const type = result.assets[0].type
			const name = result.assets[0].fileName
			const objCloudinary = {
				uri,
				type,
				name,
			}
			uploadCloudinary(objCloudinary)
		} else {
			alertToast(
				'error',
				'Imagen rechazada',
				'La imagen no se cargo correctamente!'
			)
		}
	}

	const uploadCloudinary = async imageCloud => {
		try {
			const data = new FormData()
			data.append('file', imageCloud)
			data.append('upload_preset', 'libros-app')
			data.append('cloud_name', 'dtjoj3fui')

			const response = await axios.post(
				'https://api.cloudinary.com/v1_1/dtjoj3fui/image/upload',
				data
			)
			console.log('anda' + response)
		} catch (error) {
			console.log('aca', error)
		}
	}

	return <div>test</div>
}

export default test
