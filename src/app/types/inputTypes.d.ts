declare type HistoryOrderInput = {
	range: number;
};
declare type UpdateFavorite = {
	product_id?: number;
};
declare type ToggleFavoritePayload = {
	listProductHome: Categories[] | undefined;
	favoriteList: Product[] | undefined;
};
