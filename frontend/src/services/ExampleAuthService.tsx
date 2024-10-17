class ExampleAuthService {
    private user = { name: 'John Doe', isLoggedIn: true };

    getUser() {
        return this.user;
    }

    login(username: string, password: string) {
        // Logik zur Anmeldung
        this.user.isLoggedIn = true;
    }

    logout() {
        this.user.isLoggedIn = false;
    }
}

export default new ExampleAuthService();
