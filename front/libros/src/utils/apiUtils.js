import axios from 'axios'
import { REACT_APP_API_URI_GO, REACT_APP_API_URI_NODE } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

console.log('URI GO: ', REACT_APP_API_URI_GO)
console.log('URI NODE: ', REACT_APP_API_URI_NODE)

const instance = axios.create({
	baseURL: REACT_APP_API_URI_GO,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	},
})

instance.interceptors.request.use(async config => {
	const token = await AsyncStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export const get = async url => {
	try {
		const { data, status } = await instance.get(url)
		return { ok: true, data, status }
	} catch (err) {
		return { ok: false, error: err, status: 500 }
	}
}

export const post = async (url, body) => {
	try {
		const { data, status } = await instance.post(url, body)
		return { ok: true, data, status }
	} catch (err) {
		return { ok: false, error: err, status: 500 }
	}
}

export const destroy = async url => {
	try {
		const { status } = await instance.delete(url)
		return { ok: true, status }
	} catch (err) {
		return { ok: false, error: err, status: 500 }
	}
}

export const put = async (url, body) => {
	try {
		const { data, status } = await instance.put(url, body)
		return { ok: true, data, status }
	} catch (err) {
		return { ok: false, error: err, status: 500 }
	}
}

export const patch = async (url, body) => {
	try {
		const { data, status } = await instance.patch(url, body)
		return { ok: true, data, status }
	} catch (err) {
		return { ok: false, error: err, status: 500 }
	}
}
