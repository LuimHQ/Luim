class User {
    constructor(
        public userName: String,
        private email: String,
        private password: String
    ) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}
export default User;
