declare interface InsideTouch {
	children?: React.ReactChild | React.ReactChild[];
	loading?: boolean;
	solidPrimary?: boolean;
	clean?: boolean;
	solidWhite?: boolean;
	outline?: boolean;
}
declare type Upload = {
	access_mode?: string;
	asset_id?: string;
	bytes?: number;
	created_at?: Date;
	etag?: string;
	format?: string;
	height?: number;
	placeholder?: boolean;
	public_id?: string;
	resource_type?: string;
	secure_url?: string;
	signature?: string;
	tags?: any[];
	type?: string;
	url?: string;
	version?: number;
	version_id?: string;
	width?: number;
};
declare type TabData = {
	key: string;
	title: string;
};
declare type StatusModal = 'SUCCESS' | 'INFO' | 'ERROR';
declare type BreadCrumbData = {
	title?: string;
	onPress?: () => void;
}[];
type LoadMoreState = {page?: number; isMore?: boolean};

declare type ReturnTypeLoadMore = {
	data: any[];
	status?: Status;
} & LoadMoreState;

declare type PayloadFavorite = [undefined | number, Favorite | undefined];
