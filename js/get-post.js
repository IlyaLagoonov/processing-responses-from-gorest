export const getPostData = async () => {
    const pageParams = new URLSearchParams(location.search);
    const postPage = pageParams.get('page');

    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage == null ? 1 : postPage}`);
    const result = await response.json();

    return {
        psts: result.data,
        pagination: result.meta.pagination,
    };
};