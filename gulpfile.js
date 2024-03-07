//importanto propriedades do gulp e do sass
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

//importanto funções JS
const asomae = require ('./source/scripts/sum.js');
const asube = require ('./source/scripts/sub.js');
const amulte = require('./source/scripts/mult.js');
const adive = require('./source/scripts/div.js');


//função para compilar arquivos .SASS em .CSS, minimizar os arquivos .CSS e mapear a origem dos atributos de estilo nos arquivos .SASS 
function compilaSass () {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputstyle: 'compressed'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
    
}

//função para minimizar os arquivos JS
function comprimeJS(){
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

//função para minimizar as imagens
function comprimeImg(){
    return gulp.src('./source/imagem/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/imagens'));
}



exports.default = function () {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJS));
    gulp.watch('./source/imagem/*', {ignoreInitial: false}, gulp.series(comprimeImg));
}

