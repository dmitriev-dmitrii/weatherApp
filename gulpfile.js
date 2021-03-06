const {src,dest,watch,series} = require('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const del = require('del');
const cssnano = require('gulp-cssnano');
const validator = require('gulp-w3c-html-validator');
const formatHtml = require('gulp-format-html');
const removeComments = require('gulp-strip-css-comments'); 
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');



// Собирает все файлы html в страницы

const htmlInclude = () => {
    return src([
        'src/html/*.html',
    ])
    .pipe(fileinclude({
        prefix: '@',
        basepath: '@file',
    }))
    .pipe(validator())
    .pipe(formatHtml())
    .pipe(dest('app/'))
    .pipe(sync.stream());
}



// Конвертирует scss в css

const translateScss = () => {
    return src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss({
        outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
        overrideBrowserslist: 'last 8 versions'
    }))
    .pipe(rename({
        basename: "main",
    }))
    .pipe(dest('app/css'))
    .pipe(rename({
        suffix: ".min",
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('app/css'))
    .pipe(sync.stream());
}




// Генерирует svg спрайт

const sprite = () => {
    return src('src/images/sprite/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            },
        }
    }))
    .pipe(dest('app/images'))
}

// минификаия картинок

const imagesCompress = () => {
    return src('src/images/default/**/*.*')
    .pipe(cache(imagemin()))
    .pipe(dest('app/images'))
}

// Работа с шрифтами

const  delFolder = async () => {
    del.sync('app/fonts')
}


const fonts = async () => {

    del.sync('app/fonts');

    const srcFonts = 'src/fonts/';
    const generateScssFonts = 'src/scss/helpers/_fonts.scss';

    // форматирование в woff
    src('src/fonts/**/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('app/fonts'));

    // форматирование в woff2
    src('src/fonts/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'));

    // добавление шрифтов в fonts.scss

    const checkWeight = {
        black: 900,
        extrabold: 800,
        bold: 700,
        semibold: 600,
        medium: 500,
        regular: 400,
        light: 300,
        thin: 100
    }

    fs.writeFile(generateScssFonts, "",()=>{});

    fs.readdir(srcFonts,(err,items) =>{
        items.forEach((item)=>{
            const font_url = item.split('.')[0];
            const font_name = item.split('-')[0];
            let font_weight  = item.split('-')[1].split('.')[0].toLowerCase();
            let font_style  = item.split('-')[1].split('.')[0].toLowerCase();
            if (font_weight.includes('italic')) {
                font_weight = font_weight.split('italic')[0];
            }
            if (font_weight === '') {
                font_weight = 'regular';
            }
            if (font_style.includes('italic')) {
                font_style = 'italic';
            }
            else {
                font_style = 'normal';
            }
            fs.appendFileSync(generateScssFonts, `@include font("${font_url}","${font_name}", ${checkWeight[font_weight]}, "${font_style}"); \n`);
        });
    });
}

// Перемещение и работа js файлов



const translateJs = () => 
{
    return src('./src/js/**/*.js')
    .pipe(dest('app/js'))
    .pipe(sync.stream());
}


// Сервер и Отслеживание в изменениях файлов

const watcher = () => {
    sync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch('src/scss/**/*.scss',translateScss);
    watch('src/html/**/*.html',htmlInclude);
    watch('src/images/default/**/*.*',imagesCompress);
    watch('src/js/*.js',translateJs);

}

const build = () => {
    return src('app/css/main.min.css')
    .pipe(removeComments({
        preserve: false,
    }))
    .pipe(dest('dist'))
}


exports.sprite = sprite;
exports.fonts = fonts;

exports.translateScss = translateScss;
exports.delFolder = delFolder;
exports.build = build;
exports.imagesCompress = imagesCompress;



exports.default = series(imagesCompress,htmlInclude,translateScss,translateJs,watcher);