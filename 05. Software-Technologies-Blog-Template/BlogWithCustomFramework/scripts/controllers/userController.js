class UserController {
    constructor(userView, requester, baseUrl, appKey) {
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/"; //TODO
    }

    showLoginPage(isLoggedIn) {
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn) {
        this._userView.showRegisterPage(isLoggedIn);
    }

    register(data) {
        if (data.username.length < 6) {
            showPopup('error', 'The username must contain of atleast 6 symbols.');
            return;
        }
        if (data.fullName.length < 5) {
            showPopup('error', 'The full name must contain of atleast 6 symbols.');
            return;
        }
        if (data.password != data.confirmPassword) {
            showPopup('error', 'The passwords do not match');
            return;
        }
        if (data.password.length < 8) {
            showPopup('error', 'The password must contain of atleast 8 symbols.');
            return;
        }
        delete data['confirmPassword'];

        this._requester.post(this._baseServiceUrl, data,
            function successCallback(response) {
                showPopup('success', 'You have successfully registered.');
                redirectUrl('#/login');
            },
            function errorCallback(response) {
                showPopup('error', 'Your registration has been unsuccessful.');

            })


    }

    login(data) {
        let requestUrl = this._baseServiceUrl + "login";
        this._requester.post(requestUrl, data,
            function successCallback(response) {
                sessionStorage.setItem('username', response.username);
                sessionStorage.setItem('_authToken', response._kmd.authtoken);
                sessionStorage.setItem('fullName', response.fullname);

                showPopup('success', 'You have successfully logged in.');
                redirectUrl('#/');
            },
            function errorCallback(response) {
                showPopup('error', 'Your login was unsuccesful.');
            });
    }


    logout() {

        sessionStorage.clear();
        redirectUrl('#/');
    }
}




