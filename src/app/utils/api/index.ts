import {API_PREFIX} from 'app/config';
import {store} from 'app/redux/store';
import {logoutAuth} from 'app/screens/login/reducer';
import axios, {AxiosResponse} from 'axios';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
axios.defaults.timeout = 2000;

export const query = async <T, P>(
	url: string,
	method: Method,
	params?: P
): Promise<T | undefined> => {
	let response: Promise<AxiosResponse<T>>;
	const originUrl = API_PREFIX + url;

	switch (method) {
		case 'POST':
			response = axios.post(originUrl, params);
			break;
		case 'PUT':
			response = axios.put(originUrl, params);
			break;
		default:
			response = axios.get(originUrl, {params});
			break;
	}

	return response
		.then((_response) => _response.data)
		.catch((err) => {
			console.log('err===', err);
			return undefined;
		});
};

export const setTokenAxios = (token?: string) =>
	token && (axios.defaults.headers.common.Authorization = 'Bearer ' + token);

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		if (error.response.status === 401 && !error.response.config.url.includes('login')) {
			store.dispatch(logoutAuth());
		}
		return Promise.reject(error);
	}
);
