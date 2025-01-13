export type TDialogSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface IPaginationResult<T> {
    count: number;
    next: string | null;
    previous: string | null;
    current_page: number;
    first_page: number;
    last_page: number;
    results: T[];
}

export interface ICursorPaginationResult<T> {
    results: T[];
    next?: string;
    previous?: string;
}