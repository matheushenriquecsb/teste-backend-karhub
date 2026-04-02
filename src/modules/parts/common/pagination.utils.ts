import { PaginationMeta, PaginationParams } from "../domain/value-objects/paginate";

export function getPagination(
    { page = 1, limit = 10 }: PaginationParams,
    total: number,
): PaginationMeta {
    const currentPage = Math.max(1, Number(page));
    const currentLimit = Math.max(1, Number(limit));

    const totalPages = total === 0 ? 0 : Math.ceil(total / currentLimit);

    const safePage =
        totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

    const offset = (safePage - 1) * currentLimit;

    return {
        page: safePage,
        limit: currentLimit,
        total,
        totalPages,
        offset,
    };
}
