(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_rkdVNnNF"; // Place your appKey from Kinvey here...
    let appSecret = "6e53230efa36406982f5b2d478358b43"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "ae0e5288-ea25-4ef6-b447-32627567def1.8a32Bf85mQnbHA1eJy3WCvNX7Mt/U92nxKpQ+BJ22yE="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...

    //Create AuthorizationService and Requester
    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    let requester = new Requester(authService);

    authService.initAuthorizationType("Kinvey");




    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController


    let homeView = new HomeView(mainContentSelector, selector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);
    
    let userView = new UserView(mainContentSelector, selector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    let postView = new PostView(mainContentSelector, selector);
    let postController = new PostController(postView, requester, baseUrl, appKey);

    initEventServices();

    onRoute("#/", function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if(authService.isLoggedIn()) {
            homeController.showUserPage();
        }
        else {
            homeController.showGuestPage();
        }
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
        let top = $("#post-" + this.params['id']).position().top;
        $(window).scrollTop(top);
    });

    onRoute("#/register", function () {
        // Show the register page...
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/login", function () {
        // Show the login page...
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        // Logout the current user...
       userController.logout();
    });

    onRoute('#/posts/create', function () {
        // Show the new post page...
        if(authService.isLoggedIn()) {
            let fullName = sessionStorage['fullName'];
        }
        postController.showCreatePostPage();
    });

    bindEventHandler('login', function (ev, data) {
        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        // Create a new post...
        postController.createNewPost(data);
    });

    run('#/');
})();
