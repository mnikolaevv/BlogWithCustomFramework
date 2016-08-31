class PostController {
    constructor(postView, requester, baseUrl, appKey) {
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts";
    }
    showCreatePostPage(fullName, isLoggedIn) {
        this._postView.showCreatePostPage(fullName, isLoggedIn);
    }
    createNewPost(data) {
        this._requester.post(this._baseServiceUrl, data, function(responseData) {
            showPopup('success', 'Post created successfully.');
            redirectUrl('#/');
        }, function(responseData) {
            showPopup('error', 'Post not created.');
            
            
        })
    }
}