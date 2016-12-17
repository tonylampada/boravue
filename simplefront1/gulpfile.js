//////////////////////////////////////////////
////////// requires
//////////////////////////////////////////////

var gulp = require('gulp');
// var debug = require('gulp-debug');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var linker = require('gulp-linker');
var webserver = require('gulp-webserver');
// var ngTemplates = require('gulp-ng-templates');
// var htmlmin = require('gulp-htmlmin');
// var merge = require('merge-stream');
// var jshint = require('gulp-jshint');
// var karma = require('karma').server;
// var argv = require('yargs').argv;
// var uglify = require('gulp-uglify');
// var cssmin = require('gulp-cssmin');

////////////////////////////////////////////////////////////////////////////////////////////
////////// parameters
////////////////////////////////////////////////////////////////////////////////////////////














////////////////////////////////////////////////////////////////////////////////////////////
////////// source location
////////////////////////////////////////////////////////////////////////////////////////////


var app = {
    js: [
        './src/**/*.js',
    ],
    jstests: [
        './settings/dev.js',
        './src/main/app_global.js',
        './src/commons/jsutils.js',
        './src/*.js',
        './src/!(api)/**/*.js',
        './src/api/api_mock.js',
    ],
    scss : [
        './src/**/*.scss',
    ],
    html: [
        './src/**/*.html',
        '!./src/**/docs**/*.html',
    ],
};


var lib = {
    //file extensions like .js, .min.js, .css, .min.css are implicit
    js: [
        'lib/jquery/dist/jquery',
        'lib/bootstrap/dist/js/bootstrap',
        'lib/vue/dist/vue',
        'lib/vue-router/dist/vue-router',
    ],
    css: [
        'lib/bootstrap/dist/css/bootstrap',
        'lib/bootstrap/dist/css/bootstrap-theme',
        'lib/font-awesome/css/font-awesome',
    ],
}

var testlib = {
    js: [
        './testlib/chai/chai.js',
        './testlib/sinon/sinon.js',
        './testlib/setup_globals.js',
    ],
};










////////////////////////////////////////////////////////////////////////////////////////////
////////// gulp tasks
////////////////////////////////////////////////////////////////////////////////////////////


////////// Big tasks

gulp.task('dev', [
    'concatjslib',
    'concatjslibmin',
    'concatcsslib',
    'concatcsslibmin',
    'sass',
    'copyassets',
    'linkjsdev'
]);


var concatjstasks = [
    'concatjsapp', 
    'concatjsappdocs', 
    'concatjsdocs'
]

var moreprodtasks = ['copydocssamples'];
// if(minify){
//     moreprodtasks = moreprodtasks.concat(['minifyjs', 'minifycss']);
// }
moreprodtasks = moreprodtasks.concat(['linkjsprod'])
// gulp.task('prod', commontasks.concat(concatjstasks).concat(moreprodtasks));
// gulp.task('prod', commontasks.concat(concatjstasks).concat(['copydocssamples', 'minifycss', 'linkjsprod']));

////////// Common tasks
concattask('concatjslib', {src: lib.js, appendsuffix: '.js', dest: 'js/lib.js'});
concattask('concatjslibmin', {src: lib.js, appendsuffix: '.min.js', dest: 'js/lib.min.js'});
concattask('concatcsslib', {src: lib.css, appendsuffix: '.css', dest: 'css/lib.css'});
concattask('concatcsslibmin', {src: lib.css, appendsuffix: '.min.css', dest: 'css/lib.min.css'});
copytask('copyassets', 'assets/**/*', '', {prefix: 1});
sasstask('sass');
linktaskdev('linkjsdev');
webservertask('runserver');
// minifyjstask('minifyjs');
// minifycsstask('minifycss');
// jshinttask('jshintall')

////////// Dev tasks
// jstesttask('test')

////////// Prod tasks
// concattask('concatjsapp', {src: app.js('prod'), html: app.html, ngmodule: 'apptemplates', tmplprefix: 'TEMPLATE_CACHE/', dest: 'js/app.js'});
// concattask('concatjsappdocs', {src: appdocs.js, dest: 'js/appdocs.js'});
// concattask('concatjsdocs', {src: docs.js, html: docs.html, ngmodule: 'docstemplates', tmplprefix: 'TEMPLATE_CACHE/', dest: 'js/docs.js'});
// copytask('copydocssamples', appdocs.samples, 'docs_samples/', {prefix: 1});
// linktaskprod('linkjsprod');






////////////////////////////////////////////////////////////////////////////////////////////
////////// Helper functions
////////////////////////////////////////////////////////////////////////////////////////////

function concattask(id, options){
    var src = options.src;
    if(options.appendsuffix){
        src = src.map(function(v){
            return v + options.appendsuffix;
        });
    }
    gulp.task(id, function() {
        var stream_concat = gulp
            .src(src)
            .pipe(concat(options.dest));
        if(options.html){
            var stream_ngtemplates = gulp.src(options.html)
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(ngTemplates({
                    filename: 'zzz.js',
                    module: options.ngmodule,
                    path: function (path, base) {
                        var result = options.tmplprefix + path.replace(base, '');
                        // console.log(result);
                        return result;
                    },
                }));
            stream_concat = merge(stream_concat);
            stream_concat.add(stream_ngtemplates);
            stream_concat = stream_concat.pipe(concat(options.dest))
        }
        return stream_concat
            .pipe(gulp.dest('./dist/'));
    });
}

function minifyjstask(id){
    gulp.task(id, ['concatjsapp'], function () {
        return gulp.src('./dist/js/app.js')
            .pipe(ngmin({dynamic: false}))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'));
    });
}

function minifycsstask(id){
    gulp.task(id, ['sass'], function (p) {
        // console.log(JSON.stringify(p))
        return gulp.src('./dist/css/app.css')
            .pipe(debug())
            .pipe(cssmin())
            .pipe(gulp.dest('./dist/css'));
    });

}

function jstesttask(id){
    var singleRun = argv.singleRun == 'true';
    var coverage = argv.coverage == 'true';
    var grep = argv.grep;

    var karmacfg = {
        basePath: './',
        frameworks: ['mocha'],
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        autoWatch: true,
        singleRun: singleRun,
        client: {
            mocha: {
                grep: grep,
            }
        },
        colors: true,
        files : concatall([
            lib.js,
            testlib.js,
            docs.js,
            app.jstests,
        ]),
    }
    if(coverage){
        karmacfg.reporters = ['progress', 'coverage'];
        karmacfg.preprocessors = {
            './src/**/!(docs)/*.js': ['coverage']
        };
        karmacfg.coverageReporter = {
            reporters: [
                { type : 'html', dir : 'coverage/' },
                { type : 'cobertura'},
            ]
        };
    }

    gulp.task(id, function (done) {
        karma.start(karmacfg, done);
    });
}

function concatall(arrays){
    var result = [];
    arrays.map(function(arr){
        result = result.concat(arr);
    });
    return result;
}

function sasstask(id){
    gulp.task('sass', function () {
        gulp.src(app.scss)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./dist/css'));
    });
}

function jshinttask(id){
    gulp.task(id, function() {
        return gulp.src(['./src/**/*.js', './docs_src/**/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
        return stream;
    });
}

function linktaskdev(id){
    gulp.task(id, function() {
        return gulp.src('./src/*.html')
            // .pipe(linker(linker_params(appdocs.js, 'APPDOCSJS', '.')))
            .pipe(linker(linker_params(app.js, 'APPJS', '.')))
            // .pipe(linker(linker_params(docs.js, 'DOCSJS', '.')))
            .pipe(gulp.dest('./dist/'));
    });
}

function linktaskprod(id){
    gulp.task(id, ['concatjsapp', 'concatjsappdocs', 'concatjsdocs'], function() {
        return gulp.src('./src/*.html')
            .pipe(linker(linker_params('./dist/js/app.js', 'APPJS', 'dist/')))
            .pipe(linker(linker_params('./dist/js/appdocs.js', 'APPDOCSJS', 'dist/')))
            .pipe(linker(linker_params('./dist/js/docs.js', 'DOCSJS', 'dist/')))
            .pipe(gulp.dest('./dist/'));
    });
}

function linker_params(src, marker, approot){
    return {
        scripts: src,
        startTag: '<!--'+marker+'-->',
        endTag: '<!--'+marker+' END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: approot,
    };
}

function webservertask(id){
    gulp.task(id, function() {
        return gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: false,
            port: 9001,
        }));
    });
}

function copytask(id, from, to, options){
    gulp.task(id, function() {
        return gulp.src(from)
        .pipe(copy('./dist/'+to, options));
    });
}
