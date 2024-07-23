const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/server',
        createProxyMiddleware({
            target: env.process.REACT_APP_API_URL,
            changeOrigin: true,
        })
    );
};