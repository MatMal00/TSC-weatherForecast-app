const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@img': path.resolve(__dirname, 'src/img/'),
            '@store': path.resolve(__dirname, 'src/store/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
        },
    },
};
