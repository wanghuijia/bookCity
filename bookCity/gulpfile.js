//下载引入
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var fs = require('fs');
var path = require('path');
var url = require('url');
var list = require('./data/data.json');
var querystring = require('querystring');
var userList = [{
    user: 'whj',
    pwd: '123'
}, {
    user: 'aaa',
    pwd: '123'
}]
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe()
})
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                // if (pathname === '/api/list') {
                //     res.end(JSON.stringify(list))
                // } else if (pathname === '/api/login') {
                //     var arr = [];
                //     req.on('data', function(chunk) {
                //         arr.push(chunk);
                //     })
                //     req.on('end', function() {
                //         var data = Buffer.concat(arr).toString();
                //         var param = querystring.parse(data);
                //         var Success = userList.some(function(file) {
                //             return file.user === param.user && file.pwd === param.pwd;
                //         })
                //         if (Success) {
                //             res.end(JSON.stringify({ code: '1', msg: "登陆成功" }))
                //         } else {
                //             res.end(JSON.stringify({ code: '0', msg: "登录失败" }))
                //         }
                //     })
                // } else {
                //  }
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))


            }
        }))
})