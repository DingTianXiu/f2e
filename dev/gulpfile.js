/**
 * DMC gulpfile config
 * @type {[type]}
 */
var gulp = require('gulp'); // 主要
var uglify = require('gulp-uglify');
var del = require('del'); // rm -rf
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');
var zip = require('gulp-zip');
var jshint = require('gulp-jshint');
var taskListing = require('gulp-task-listing');
var templateCache = require('gulp-angular-templatecache');

var paths = {
    css: ['./styles/*.css'],
    html: ['./views/*.html'],
    img: ['./images/*.*'],
    buildPath: './build'

};

// css文件重新在浏览器渲染
gulp.task('css', function() {
    gulp.src('./styles/*.css')
        .pipe(browserSync.reload({
            stream: true
        }));
});

// html文件重新在浏览器渲染
gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 监控css文件的改变
gulp.task('watch', function() {
    gulp.watch('./styles/*.css', ['css']);
    gulp.watch('./*.html', ['html']);
});

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: __dirname + '/jshint-output.html',
      createMissingFolders : false
    }));
});


/**
 * 压缩修改html文件
 */
gulp.task('usemin', function(){
    // 压缩index文件
    gulp.src('./index.html')
        .pipe(usemin({
            indexCSS: [minifyCss(), 'concat', rev()],	// 压缩css、合并、添加版本号
            jsLibs: [rev()],
            jsMain: [uglify(), rev()],
            jsTpl: [rev()],
            html: [minifyHtml({empty:true, quotes: true})]
        }))
        .pipe(gulp.dest(paths.buildPath));
});

/**
 * 压缩views
 * @param  {[type]} 'minifyHtml' [description]
 * @param  {[type]} function(    [description]
 * @return {[type]}              [description]
 */
gulp.task('minifyHtml', function(){
    // 压缩index文件
    gulp.src('./views/**/*.html')
        .pipe(minifyHtml({empty:true, quotes: true}))
        .pipe(gulp.dest('./build/views'));
});

/**
 * cache
 * @param  {[type]} 'default' [description]
 * @param  {[type]} function  (             [description]
 * @return {[type]}           [description]
 */
gulp.task('cache',  function () {
  var stream = gulp.src('./views/**/*.html')
    .pipe(templateCache('templates.js', {module: 'App', root: '../views/'}))
    .pipe(gulp.dest('./build/script/'));

  return stream;

});

/**
 * 清除目录
 * @param  {[type]} )
 * @return {[type]}   [description]
 */
gulp.task('clean', function (cb) {
  del(paths.buildPath, cb);
});

/**
 * 拷贝图片目录
 */
gulp.task('copyImagesFolder', function(){
    // 图片排量拷贝
    var stream = gulp.src('./public/images/**/*')
        .pipe(gulp.dest(paths.buildPath + '/public/images/'));

    // fav
    gulp.src('./*.ico')
        .pipe(gulp.dest(paths.buildPath));

    // 拷贝wd目录
    gulp.src('./js/libs/My97DatePicker/skin/**/*')
        .pipe(gulp.dest(paths.buildPath + '/public/wdskin/skin'));

    // ligerUI
    gulp.src('./js/libs/ligerUI/skins/Aqua/**/*')
        .pipe(gulp.dest(paths.buildPath + '/public'));

    // layer
    gulp.src('./js/libs/layer/skin/**/*')
        .pipe(gulp.dest(paths.buildPath + '/script/skin'));

    // 预览文件
    gulp.src('./chartPreview.html')
        .pipe(gulp.dest(paths.buildPath));    

});

/**
 * 压缩生成压缩包
 * @param  {[type]} 'default' [description]
 * @param  {[type]} (         [description]
 * @return {[type]}           [description]
 */
gulp.task('zip', function() {
  // 生成时间戳
  var _t = new Date();
  var _m = _t.getMonth()+1 > 9 ? _t.getMonth()+1 : '0'+ (_t.getMonth()+1);
  var _d = _t.getDate() > 9 ? _t.getDate() : '0'+ _t.getDate();
  var _h = _t.getHours() > 9 ? _t.getHours() : '0'+ (_t.getHours());
  var _mm = _t.getMinutes() > 9 ? _t.getMinutes() : '0'+ _t.getMinutes();
  var _time = _t.getFullYear().toString() + _m + _d + '-' + _h + _mm;
	return gulp.src(paths.buildPath)
		.pipe(zip('build-'+_time+'.zip'))
		.pipe(gulp.dest('dist'));
});


// 开发时执行
gulp.task('dev', ['browser-sync', 'watch']);

// 打包文件
gulp.task('build', ['clean', 'cache', 'minifyHtml', 'copyImagesFolder', 'usemin', 'zip']);

// 显示task列表
gulp.task('help', taskListing);
