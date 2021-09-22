import {API_PREFIX} from 'app/config';
import {store} from 'app/redux/store';
import {logout} from 'app/screens/login/reducer';
import axios, {AxiosResponse} from 'axios';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const query = async <T, P>(
	url: string,
	method: Method,
	params: P
): Promise<T | undefined> => {
	let response: Promise<AxiosResponse<T>>;
	const originUrl = API_PREFIX + url;

	switch (method) {
		case 'POST':
			response = axios.post(originUrl, params);
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
		// const originalRequest = error.config;
		// if (error.response.status === 401 && !originalRequest._retry) {
		// 	originalRequest._retry = true;
		// 	return axios
		// 		.post('url_refreshToken', {
		// refresh_token: AuthHelper.getRefreshToken(),
		// 		})
		// 		.then((res) => {
		// 			if (res.status === 201) {
		// 				// 1) put token to LocalStorage
		// AuthHelper.setToken(res.data)

		// 				// 2) Change Authorization header
		// 				axios.defaults.headers.common.Authorization =
		// 					'jwt ' + localStorageService.getAccessToken();

		// 				// 3) return originalRequest object with Axios.
		// 				return axios(originalRequest);
		// 			}
		// 		});
		// }
		console.log('Response === ', error.response.status);
		//Logout when token fail
		if (error.response.status === 401) {
			store.dispatch(logout());
		}
		// return Error object with Promise
		return Promise.reject(error);
	}
);
