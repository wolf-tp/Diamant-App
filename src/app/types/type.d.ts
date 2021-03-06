declare type App = {
	isFirstTime?: boolean;
};
declare type Status = 'loading' | 'failed' | 'none' | 'success';
declare type LangName = 'en' | 'fr';
declare type LoadDataAPI<T> = [boolean | undefined, T];
declare type StatusResponse = 'OK' | 'NG' | undefined;
declare type ParamsNotification = {isFromNotification?: boolean};
declare interface Result<T> {
	status: StatusResponse;
	results: T;
}
declare type Product = {
	id?: number | string;
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
	category?: string;
	subCategory?: string;
	['sub-category']?: string;
	info?: Info[];
};
declare interface Info {
	id: number;
	unit_weight: string;
	packaging: string;
	gen_code: string;
	created_at: Date;
	updated_at: Date;
}
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
	category?: string;
	'sub-category'?: string;
	updated_at?: Date;
	isLoading?: boolean;
	is_permission?: boolean;
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
	status?: StatusResponse;
	results?: LoginResult;
	errors?: {auth: 'INACTIVE' | 'ACTIVE'};
}

declare interface LoginResult {
	token?: string;
	info?: UserInfo;
}
declare interface ReceiveNotification {
	is_receive_notify?: number;
}
declare interface UserInfo extends ReceiveNotification {
	id?: number;
	code?: string;
	user_name?: string;
	brand_name?: string;
	address?: string;
	email?: string;
	phone_number?: string;
	status?: string;
	created_at?: Date;
	updated_at?: Date;
}
declare type UserInput = {
	user_name: string;
	password: string;
	fcm_token?: string;
};
declare type LogoutOption = {
	tokenExpiration?: boolean;
};
declare type Favorite = {
	id?: number | string;
	user_id?: number;
	products?: Product[];
	created_at?: string;
	updated_at?: string;
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
	image?: string;
	created_at?: Date;
	updated_at?: Date;
	is_favorite?: boolean;
	amount?: string;
	info?: Info;
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
	'sub-category'?: string;
}
declare interface DetailAProduct {
	id: number;
	item_code: string;
	title?: string;
	description?: string;
	unit_weight?: string;
	packaging?: string;
	dlc?: string;
	gen_code: string;
	image?: string;
	is_favorite: boolean;
	info?: Array<InfoProduct>;
}
interface ProductList {
	id: number;
	user_id: number;
	amount?: number;
	products: ProductDetail[];
}
interface Order {
	id: number;
	user_id: number;
	code: string;
	date_of_delivery: string;
	comment?: string;
	products: ProductDetail[];
}
declare interface StatusOrder extends Order {
	bill_number?: number;
	private_comment?: string;
	status?: number;
	delivery_men?: number;
	is_read?: number;
}

declare type IObject = {[key: string]: string};
type ListProductRequest = number[][];
declare interface Notifications {
	id: number;
	admin_id?: number;
	group_ids?: null;
	user_ids?: string[];
	product_id?: null;
	category_id?: number;
	title?: string;
	content?: string;
	start_date?: null;
	end_date?: null;
	type?: string;
	created_at?: string;
	updated_at?: string;
	isRead?: boolean;
	is_permission?: boolean;
}

declare interface InfoProduct {
	id: number;
	packaging: string;
	unit_weight: string;
	gen_code: string;
}
declare interface ReadOtherNotification {
	user_id: number;
	noti_id: string;
	updated_at: Date;
	created_at: Date;
	id: number;
}
