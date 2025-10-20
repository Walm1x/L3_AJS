const fetchDataWithCallback = (endpoint, processingCallback) => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const requestUrl = `${baseUrl}/${endpoint}`;

    fetch(requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(payload => {
            processingCallback(null, payload);
        })
        .catch(error => {
            console.error(`Failed to fetch data from ${requestUrl}:`, error);
            processingCallback(error, null);
        });
};

const fetchAndSortPublications = (completionCallback) => {
    fetchDataWithCallback('posts', (postError, retrievedPosts) => {
        if (postError) {
            return completionCallback(postError);
        }

        const sortedPublications = retrievedPosts.sort((itemA, itemB) => {
            const titleLengthA = itemA.title ? itemA.title.length : 0;
            const titleLengthB = itemB.title ? itemB.title.length : 0;
            return titleLengthB - titleLengthA;
        });

        completionCallback(null, sortedPublications);
    });
};

const retrieveAndOrderComments = (completionCallback) => {
    fetchDataWithCallback('comments', (commentError, retrievedComments) => {
        if (commentError) {
            return completionCallback(commentError);
        }

        const orderedComments = retrievedComments.sort((commentItemA, commentItemB) => {
            const nameA = commentItemA.name || '';
            const nameB = commentItemB.name || '';
            return nameA.localeCompare(nameB);
        });

        completionCallback(null, orderedComments);
    });
};
