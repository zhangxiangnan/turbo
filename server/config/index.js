var src = './client/'
module.exports = {
    host: {
        REMOTE_API: 'http://dd:3000/comments'
    },
    isDev: function () {
        return true;
    }
    // iconFonts: {
    //     name: 'Jalo Icons',
    //     src: src + 'icons/*.svg',
    //     dest: src + '/fonts',
    //     sassPath: '../css/_icons.scss',
    //     template: 'gulp/tasks/iconFont/template.scss',
    //     fontPath: '../fonts',
    //     className: 'ja-icon',
    //     copysrc: src + '/fonts/**',
    //     copydest: dest + '/fonts',
    //     options: {
    //         fontName: 'jalo-icons',
    //         appendCodepoints: true,
    //         normalize: false
    //     }
    // }
};
