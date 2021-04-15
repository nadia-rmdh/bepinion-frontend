const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_BASE_API_URL || 'https://hris-dev.widyaskilloka.com',
            changeOrigin: true,
            onError: (err, req, res) => {
                if (err.response?.status === 422) {
                    return;
                }
                console.error(err);
            }
        }),
    )

    app.use(
        '/files',
        createProxyMiddleware({
            target: process.env.REACT_APP_BASE_FILE_URL || 'https://hris-dev.widyaskilloka.com',
            changeOrigin: true,
        }),
    )
}
