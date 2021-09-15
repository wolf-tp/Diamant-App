import {getKey, setKey} from 'app/utils/storage';

export default class AuthHelper {
	private static TOKEN_SAVE = 'TOKEN_SAVE';
	private static TOKEN_REFRESH = 'TOKEN_REFRESH';
	private static token = '';
	private static tokenRefresh = '';

	static setToken = (token: string = '', refreshToken: string = '') => {
		setKey(this.TOKEN_SAVE, token);
		setKey(this.TOKEN_REFRESH, refreshToken);

		this.token = token;
		this.tokenRefresh = refreshToken;
	};
	static getToken = () => this.token;
	static getRefreshToken = () => this.tokenRefresh;

	static loadToken = async () => {
		this.token = (await getKey(this.TOKEN_SAVE)) || '';
		this.tokenRefresh = (await getKey(this.TOKEN_REFRESH)) || '';
		return Promise.resolve();
	};
}
