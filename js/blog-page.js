
(function () {

    function createPageTitle(titleTxt) {
        let title = document.createElement('h1');
        title.textContent = titleTxt;
        return {
            title,
        };
    };

    function createPageDscr(dscr) {
        let pageDscr = document.createElement('p');
        pageDscr.textContent = dscr;

        return {
            pageDscr,
        };
    };


    function createCommentsBlock() {
        let title2 = document.createElement('h2');
        title2.textContent = "Комментарии:";
        let list = document.createElement('ul');
        list.classList.add('list-group');

        return {
            list,
            title2
        }
    };

    function createCommentsBody(loginUser, userEmail, userСomment) {
        let item = document.createElement('li');
        let commentTitle = document.createElement('h3');
        let commentSubtitle = document.createElement('span');
        let commentBody = document.createElement('p');
        item.classList.add('list-group-item');
        commentTitle.textContent = loginUser;
        commentSubtitle.textContent = userEmail;
        commentBody.textContent = userСomment;


        item.append(commentTitle);
        item.append(commentSubtitle);
        item.append(commentBody);

        return {
            item,
            commentTitle,
            commentSubtitle,
            commentBody
        };
    };



    async function createBlogPage(container) {

        const pageParams = new URLSearchParams(location.search);
        const postID = pageParams.get('id');
        const response = await fetch(`https://gorest.co.in/public-api/posts/${postID}`);
        const result = await response.json();
        const post = result.data;


        let createTitle = createPageTitle(result.data.title);
        let createDscr = createPageDscr(result.data.body);
        let createListComment = createCommentsBlock();
        container.append(createTitle.title);
        container.append(createDscr.pageDscr);
        container.append(createListComment.title2);



        const commentsParams = new URLSearchParams(location.search);
        const commentsID = pageParams.get('id');
        const responseComments = await fetch(`https://gorest.co.in/public-api/comments?post_id=${postID}`);
        const resultComments = await responseComments.json();
        const postComments = resultComments.data;

        postComments.map(element => {
            let createListComment = createCommentsBlock();
            let createCommentBody = createCommentsBody(element.name, element.email, element.body);
            container.append(createListComment.list);
            createListComment.list.append(createCommentBody.item);
        })
    };

    window.createBlogPage = createBlogPage

})();