const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@store': path.resolve(__dirname, 'src/store/'),
        },
    },
};
