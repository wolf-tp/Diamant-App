export const UNDEFINE_FUNC = () => undefined;

export const getImageCardHeight = (width: number) => width * 1.24;

export const isValidImage = (url?: string) => url && url.match(/^https?:\/\/.+\/.+$/);
