const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};

const sortPosts = (posts) => {
    return posts.sort((a, b) => (b.title?.length || 0) - (a.title?.length || 0));
};

const sortComments = (comments) => {
    return comments.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
};

const transformUsers = (users) => {
    return users.map(user => ({
        userId: user.id,
        fullName: user.name,
        alias: user.username,
        contactEmail: user.email,
        telephoneNumber: user.phone
    }));
};

const filterTodos = (todos) => {
    return todos.filter(todo => !todo.completed);
};

const manageDataFlow = async () => {
    const dataEndpoint = 'https://jsonplaceholder.typicode.com';

    const postsData = await fetchData(`${dataEndpoint}/posts`);
    const sortedPostsContent = sortPosts(postsData);

    const commentsData = await fetchData(`${dataEndpoint}/comments`);
    const orderedCommentsList = sortComments(commentsData);

    const usersRawData = await fetchData(`${dataEndpoint}/users`);
    const userProfileData = transformUsers(usersRawData);

    const todosRawData = await fetchData(`${dataEndpoint}/todos`);
    const incompleteTasksList = filterTodos(todosRawData);

    return {
        sortedPostsContent,
        orderedCommentsList,
        userProfileData,
        incompleteTasksList
    };
};
