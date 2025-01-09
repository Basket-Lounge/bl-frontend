export interface IPaginationResult<T> {
    count: number;
    next: string | null;
    previous: string | null;
    current_page: number;
    first_page: number;
    last_page: number;
    results: T[];
}