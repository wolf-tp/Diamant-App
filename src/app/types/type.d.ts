declare type App = {
	isFirstTime?: boolean;
};
declare type Status = 'loading' | 'failed' | 'none' | 'success';
declare interface Result<T> {
	status: string;
	results: T;
}
declare type Product = {
	id?: number;
	item_code?: string;
	title?: string;
	description?: string;
	unit_weight?: number;
	packaging?: string;
	dlc?: string;
	gen_code?: string;
	image?: string;
	created_at?: string;
	updated_at?: string;
	is_favorite?: boolean;
};
declare type BannerData = {
	id?: number;
	admin_id?: number;
	group_ids?: null;
	user_ids?: string[];
	product_id?: number | null;
	category_id?: number | null;
	title?: string;
	content?: string;
	start_date?: Date;
	end_date?: Date;
	type?: string;
	created_at?: Date;
	updated_at?: Date;
	isLoading?: boolean;
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
declare type Favorite = {
	id?: number;
	user_id?: number;
	products?: Product[];
	created_at?: Date;
	updated_at?: Date;
};
declare interface ListOrders extends Favorite {
	code?: string;
	date_of_delivery?: string;
	comment?: string;
	private_comment?: string;
	status?: number;
	delivery_men?: number;
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
declare interface Categories {
	id?: number;
	name?: string;
	image?: null;
	description?: null;
	type?: number | null;
	created_at?: string;
	updated_at?: string;
	products?: Product[];
	'sub-category'?: {[key: string]: Categories};
	subCategories?: Categories[];
}
declare interface CategorySubTitle {
	categoryTitle?: string;
	totalCount?: number;
}
declare interface DetailAProduct {
	id: Number;
	item_code: String;
	title: String;
	description?: String;
	unit_weight: String;
	packaging: String;
	dlc: String;
	gen_code: String;
	image?: String;
	is_favorite: Boolean;
}