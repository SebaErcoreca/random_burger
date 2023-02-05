export function paginationUrl(currentPage, options, categoryValue) {
    let url = `/products?page=${currentPage}`;

    if (options.sort) url += `&sort=${options.sort.price}`;
    if (options.limit) url += `&limit=${options.limit}`;
    if (categoryValue) url += `&category=${categoryValue}`;
    else if (options.category) url += `&category=${options.category}`;

    return url;
}