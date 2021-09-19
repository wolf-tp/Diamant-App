declare type App = {
	isFirstTime?: boolean;
};
declare type Status = 'loading' | 'failed' | 'none' | 'success';
declare type Product = {
	url?: string;
	title?: string;
	description?: string;
	price?: string | number;
	code: string;
};
declare type BannerData = {
	title: string;
	content: string;
};
declare interface Navigate<T> {
	route?: Route<T>;
}

declare interface Route<T> {
	key?: string;
	name?: string;
	params?: T;
}
declare enum MethodHttp {
	GET = 'GET',
	POST = 'POST',
}
declare interface LoginResponse {
	status?: string;
	results?: LoginResult;
}

declare interface LoginResult {
	token?: string;
	info?: UserInfo;
}
declare interface UserInfo {
	id?: number;
	first_name?: string;
	last_name?: string;
	user_name?: string;
	email?: string;
	phone_number?: string;
	created_at?: Date;
	updated_at?: Date;
}
declare type UserInput = {
	user_name: string;
	password: string;
};
