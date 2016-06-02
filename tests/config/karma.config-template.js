// karma configuration

module.exports = function (config, extensions, options) {
    var baseConfig = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify', 'tap'],


        // list of files / patterns to load in the browser
        files: [
            'tests/mocks/angular-mocks.init.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/bootstrap-toggle/js/bootstrap-toggle.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/a0-angular-storage/dist/angular-storage.js',
            'app/bower_components/toastr/toastr.js',
            'app/bower_components/lodash/dist/lodash.js',

            'tests/mocks/**/*.js',

            'app/app.module.js',
            'app/core/core.module.js',
            'app/modules/command-sender/commands.module.js',
            'app/modules/configurator/configurator.module.js',
            'app/modules/hosts/hosts.module.js',
            'app/modules/screen/screen.module.js',
            'app/components/components.module.js',
            'app/plugins/plugins.module.js',
            'app/plugins/player/player.module.js',

            'app/*.js',
            'app/core/**/*.js',
            'app/components/**/*.js',
            'app/modules/**/*.js',
            'app/plugins/**/*.js',

            'app/modules/**/*.html',

            'tests/unit/**/*.js'
        ],


        // list of files to exclude
        exclude: [],


        // Karma will require() these plugins
        plugins: [
            'karma-tap',
            'karma-phantomjs-launcher',
            'karma-browserify',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests/unit/**/*.js': ['browserify'],
            'tests/mocks/**/*.js': ['browserify'],
            
            'app/*.js': ['coverage'],
            'app/core/**/*.js': ['coverage'],
            'app/components/**/*.js': ['coverage'],
            'app/modules/**/*.js': ['coverage'],
            'app/plugins/**/*.js': ['coverage'],

            'app/modules/**/*.html': ['ng-html2js']
        },

        // optionally, configure the reporter
        coverageReporter: {
            dir: 'reports/',
            reporters: [
                { type: 'lcov', subdir: 'lcov' }
            ]
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',

            moduleName: 'handlio.client.templateCache'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 3005,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,


        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    };

    var conf = _extend(baseConfig, extensions || {});
    if (options) {
        if (options.plugins) {
            Array.prototype.push.apply(conf.plugins, options.plugins);
        }
        if (options.browsers) {
            Array.prototype.push.apply(conf.browsers, options.browsers);
        }
    }
    config.set(conf);
};

function _extend(dist, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            dist[key] = src[key];
        }
    }

    return dist;
}