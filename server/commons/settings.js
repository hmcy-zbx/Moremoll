module.exports = {
    DB_HOST: "localhost",
    DB_PORT: "3306",
    DB_USER: "root",
    DB_PASSWORD: "123456",
    DB_DATABASE: "moll",
    
    DEFAULT_AVATAR: "http://localhost:3000/public/images/avatar.jpg",
    
    ALLOW_ORIGIN: "http://localhost:8080",
    ALLOW_HEADER: "content-type",
    ALLOW_METHOD: "POST, GET",
    ALLOW_CREDENTIAL: true,
    
    REQUEST_PREFIX: "api",

    SESSION_SECRET: "moremall",

    REQUIRE_LOGIN_URLS: ["/user/profile", "/cart/add", "/cart/list", "/cart/checked", "/cart/quantity", "/contact/list", "/order/buy", "/order/pay", "/order/list"]
}
