declare type App = {
	isFirstTime?: boolean;
};
declare type Status = 'loading' | 'failed' | 'none' | 'success';
declare interface Result<T> {
	status: string;
	results: T;
}
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
declare type LogoutOption = {
	tokenExpiration?: boolean;
};
declare interface ListOrders {
	id?: number;
	code?: string;
	user_id?: number;
	products?: ProductDetail[];
	date_of_delivery?: string;
	comment?: string;
	private_comment?: string;
	status?: number;
	delivery_men?: number;
	created_at?: Date;
	updated_at?: Date;
}

declare interface ProductDetail {
	id?: number;
	item_code?: string;
	title?: string;
	description?: null;
	unit_weight?: null;
	packaging?: null;
	dlc?: null;
	gen_code?: string;
	image?: null;
	created_at?: Date;
	updated_at?: Date;
	amount?: number;
}
