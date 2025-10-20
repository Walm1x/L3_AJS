const manageDataFlow = async () => {
    const dataEndpoint = 'https://jsonplaceholder.typicode.com';

    const postsData = await fetch(`${dataEndpoint}/posts`).then(response => response.json());
    const sortedPostsContent = postsData.sort((postOne, postTwo) => {
        const lenOne = postOne.title ? postOne.title.length : 0;
        const lenTwo = postTwo.title ? postTwo.title.length : 0;
        return lenTwo - lenOne;
    });

    const commentsData = await fetch(`${dataEndpoint}/comments`).then(response => response.json());
    const orderedCommentsList = commentsData.sort((commentOne, commentTwo) => {
        const nameOne = commentOne.name || '';
        const nameTwo = commentTwo.name || '';
        return nameOne.localeCompare(nameTwo);
    });

    const usersRawData = await fetch(`${dataEndpoint}/users`).then(response => response.json());
    const userProfileData = usersRawData.map(userData => ({
        identifier: userData.id,
        displayName: userData.name,
        handle: userData.username,
        contactInfo: userData.email,
        telephoneNumber: userData.phone
    }));

    const todosRawData = await fetch(`${dataEndpoint}/todos`).then(response => response.json());
    const incompleteTasksList = todosRawData.filter(task => !task.completed);

    return {
        sortedPostsContent,
        orderedCommentsList,
        userProfileData,
        incompleteTasksList
    };
};
