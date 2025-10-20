const loadUsersData = (dataSource) => {
    return fetch(dataSource)
        .then(response => response.json())
        .then(allUsers =>
            allUsers.map(userData => ({
                userId: userData.id,
                fullName: userData.name,
                alias: userData.username,
                contactEmail: userData.email,
                telephone: userData.phone
            }))
        );
};

const fetchIncompleteTasks = (source) => {
    return fetch(source)
        .then(response => response.json())
        .then(allTasks => allTasks.filter(task => !task.completed));
};
