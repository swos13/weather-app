const view = (() => {

    const searchInput = document.querySelector("#city-name");
    const searchButton = document.querySelector(".search-button");

    const getSearchInput = () => searchInput;
    const getSearchButton = () => searchButton;

    return { getSearchInput, getSearchButton }
})();

export default view;