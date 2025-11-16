export type PaginatedResponseMeta = {
	next_page: number | null;
	previous_page: number | null;
	total: number;
};

export type PaginatedResponse<T> = {
	count: number;
	results: T[];
	meta: PaginatedResponseMeta;
};
