const fetchData = (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} for URL: ${url}`);
            }
            return response.json();
        });
};

const transformUserData = (users) => {
    try {
        const transformedUsers = users.map(user => ({
            userId: user.id,
            fullName: user.name,
            alias: user.username,
            contactEmail: user.email,
            telephone: user.phone
        }));
        return Promise.resolve(transformedUsers);
    } catch (error) {
        console.error('Error transforming user data:', error);
        return Promise.reject(error);
    }
};

const processUsers = () => {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';
    return fetchData(usersUrl)
        .then(users => transformUserData(users));
};

const filterIncompleteTasks = (tasks) => {
    try {
        const incompleteTasks = tasks.filter(task => !task.completed);
        return Promise.resolve(incompleteTasks);
    } catch (error) {
        console.error('Error filtering tasks:', error);
        return Promise.reject(error);
    }
};

const processIncompleteTasks = () => {
    const tasksUrl = 'https://jsonplaceholder.typicode.com/todos';
    return fetchData(tasksUrl)
        .then(tasks => filterIncompleteTasks(tasks));
};
