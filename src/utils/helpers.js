export function paginationUrl(currentPage, options) {
    let url = `/products?page=${currentPage}`;
    if (options.sort.price) url += `&sort=${options.sort.price}`;
    if (options.limit) url += `&limit=${options.limit}`;
    if (options.categories) url += `&categories=${options.categories}`;
    return url;
}