import AuthHelper from 'app/helper/AuthHelper';
import axios from 'axios';

axios.interceptors.request.use(
	(config) => {
		// const token =
		// 	'jwt eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbSI6ImtpcyIsImNJZCI6MzQsInNnSWRzIjpbNSwyOF0sImxtIjozNSwidUlkIjoxMiwicklkIjoyMjA0LCJ1ZCI6eyJhY2NvdW50TnVtYmVycyI6WyJDMTAwMDExRCIsIkMxMDAwMTFYMSIsIkMxMDAwMTFNMSJdLCJ1c2VybmFtZSI6IkMxMDAwMTEiLCJtYXNEclRva2VuSWQiOiJ2ZXJ0eC13ZWIuc2Vzc2lvbj1iZDdkODVmNzJkZjY4MDA4N2ZiMjk5Yzg3NTVhYmNiYTsgUGF0aD0vOyBIVFRQT25seSIsIm1hc0VxdWl0eVRva2VuSWQiOiJ2ZXJ0eC13ZWIuc2Vzc2lvbj1iZDdkODVmNzJkZjY4MDA4N2ZiMjk5Yzg3NTVhYmNiYTsgUGF0aD0vOyBIVFRQT25seSJ9LCJybHMiOltdLCJwbCI6ImFuZHJvaWQiLCJndCI6InBhc3N3b3JkIiwib3NWIjoiOC4wLjAiLCJhcHBWIjoiMS4wLjE4Iiwic0lkIjpudWxsLCJpYXQiOjE2MzAzOTcxNjQsImV4cCI6MTYzMDQyNzE2NH0.UrfdbaH8zUvsR_oygwZvXWknJ9y9SEcHcj2mzBW69IIEc_4M9i6rWpAMiUv7toJagCDOda248YxjfHLqaBQGTjU81c1PB4V6ic8kh_3jCtIMb4PLqccInggfvHLfxYcyXKZ2Q1Kieyz0bh6uveFL3Gaj_naAlyFUeRmeE2kpeInQrgeJ-wT-fmtnVcwyY9saO1ByGCaEG8JS2RmTEwgEY5D0uA3aUgsDJKtPGx9lT02UmmKM6JPUw5UUadQDrxez0z4lEfPCNW5ZKwK2qgVaoVfArJrRkwhJEJt2n_fyBYxmKD5WWINe5Aq5TOVFsxxnVqtmpArwzFSbEdA7VLocCmZf4Qmd1w3YcmMxFKkty2z5wlfn_AfzzfJHnXx6-tMZfKmCY4ua1XJ2mtsGJFh4IytbPjuFyJIH6m98frggi8qiKEYfzfbHgaNR0cBiu0-vL1nGxpg_79AUwh_pJLwZhE7zNGAuwmULfGDpAeYlisk_HAB7-tNAbZ4bJuvICT0jzfQrZyaNKaRFe-ufIZR-Z5DbUBfHe7piWL9jtI5XdY5ayxOiTJJkioYkt3mPrRnSvDGTCJR2MSBFwXI9S6qmQX4V78FxywJ_UHfJtTc8leytILr8DNQ21_ixGmvD7PrDeST_ombJZMAgvWPshRQ2l28uZvE-qMP1ME0QGQR6I_Q';
		// if (token) {
		// 	config.headers.Authorization = token;
		// }
		return config;
	},
	(error) => Promise.reject(error)
);
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	function (error) {
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

		// return Error object with Promise
		return Promise.reject(error);
	}
);
export const setTokenAxios = (token: string) =>
	(axios.defaults.headers.common.Authorization = 'jwt ' + token);
export const query = <R, P>(url: string, params?: P): Promise<R> => {
	return axios
		.get(url, {
			params: params,
		})
		.then((res) => res.data)
		.catch((err) => console.log(err));
};
