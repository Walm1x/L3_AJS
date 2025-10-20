const fetchData = (url, callback) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} for URL: ${url}`);
            }
            return response.json();
        })
        .then(data => callback(null, data))
        .catch(error => {
            console.error(`Failed to fetch data from ${url}:`, error);
            callback(error, null);
        });
};
const sortPostsByTitleLength = (posts, callback) => {
    try {
        const sortedPosts = posts.sort((a, b) => {
            const titleLengthA = a.title ? a.title.length : 0;
            const titleLengthB = b.title ? b.title.length : 0;
            return titleLengthB - titleLengthA;
        });
        callback(null, sortedPosts);
    } catch (error) {
        console.error('Error sorting posts:', error);
        callback(error, null);
    }
};
const sortCommentsByName = (comments, callback) => {
    try {
        const sortedComments = comments.sort((a, b) => {
            const nameA = a.name || '';
            const nameB = b.name || '';
            return nameA.localeCompare(nameB);
        });
        callback(null, sortedComments);
    } catch (error) {
        console.error('Error sorting comments:', error);
        callback(error, null);
    }
};
const processPosts = (callback) => {
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    fetchData(postsUrl, (fetchError, posts) => {
        if (fetchError) {
            return callback(fetchError);
        }
        sortPostsByTitleLength(posts, (sortError, sortedPosts) => {
            if (sortError) {
                return callback(sortError);
            }
            callback(null, sortedPosts);
        });
    });
};
const processComments = (callback) => {
    const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
    fetchData(commentsUrl, (fetchError, comments) => {
        if (fetchError) {
            return callback(fetchError);
        }
        sortCommentsByName(comments, (sortError, sortedComments) => {
            if (sortError) {
                return callback(sortError);
            }
            callback(null, sortedComments);
        });
    });
};
});
