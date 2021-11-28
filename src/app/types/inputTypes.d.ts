declare type LoadMore = {
	page?: number;
	notLoading?: boolean;
};
declare interface HistoryOrderInput extends LoadMore {
	range: number;
}
declare type UpdateFavorite = {
	product_id?: number;
};
declare type ToggleFavoritePayload = {
	listProductHome: Categories[] | undefined;
	favoriteList: Product[] | undefined;
};
declare type HandleLoadMoreParams = {
	data?: any[];
	nextData?: any[];
	status?: Status;
	page?: number;
};
