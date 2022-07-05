import { getPostData } from "./get-post.js";

(function () {
    function renderList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function renderListItem() {
        let item = document.createElement('li');
        item.classList.add('list-group-item');
        return {
            item,
        };
    };

    function createLink(href, number) {
        let name = document.createElement('a');
        name.href = `main.html?id=${href}`;
        name.classList.add('link-dark');
        name.textContent = `Страница ${number}`;
        return {
            name
        };
    }

    function createListPagination () {
        let paginationList = document.createElement('ul');
        paginationList.classList.add('pagination');

        return paginationList;
    };

    function createPagination (linkNum, numbering) {
        let paginationItem = document.createElement('li');
        paginationItem.classList.add('page-item');
        let paginationLink = document.createElement('a');
        paginationLink.classList.add('page-link');
        paginationLink.href = `index.html?page=${linkNum}`;
        paginationLink.textContent = `${numbering}`

        paginationItem.append(paginationLink);

        return {
            paginationItem
        }
    };
 


    function createBlogApp(container) {
        let blogList = renderList();
        let getPagList = createListPagination();
        let getPaginationItem;

            const createPostsNav = async () => {
                const posts = await getPostData();

                for (let a = 1; a <=posts.pagination.pages; a++) {
                    getPaginationItem = createPagination(a, a);
                    getPagList.append(getPaginationItem.paginationItem);
                }

                function hideOverPages() {
                    let items = [...pagination.children];
                    if (items.length > 5) {
                      items.forEach((item) => item.classList.add("_hide"));
                      items[0].classList.remove("_hide");
                      if (active.parentElement.previousElementSibling) {
                        active.parentElement.previousElementSibling.classList.remove("_hide");
                      }
                      active.parentElement.classList.remove("_hide");
                      if (active.parentElement.nextElementSibling) {
                        active.parentElement.nextElementSibling.classList.remove("_hide");
                      }
                      items[items.length - 1].classList.remove("_hide");
                    }
                  }


                const pageParams = new URLSearchParams(location.search);
                const postPage = pageParams.get('page');
                const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage}`);
                const result = await response.json();
            
                for (let i = 1; i <= posts.psts.length; i++) {
                    let listItem = renderListItem();
                    let getLink = createLink(posts.psts[i].id, i);
                    listItem.item.append(getLink.name);
                    blogList.append(listItem.item)
                }
            }

            createPostsNav();

        


        container.append(getPagList);
        container.append(blogList);
    }


    window.createBlogApp = createBlogApp
})();



