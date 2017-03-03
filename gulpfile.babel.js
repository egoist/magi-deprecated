import { task, input, output, watch } from 'gulp-named'
import chmod from 'gulp-chmod'
import babel from 'gulp-babel'
import postcss from 'gulp-postcss'

const babelOptions = {
  presets: [
    ['env', {
      targets: {
        node: 4
      }
    }]
  ],
  plugins: ['transform-runtime']
}

task('js', () => {
  input('src/**/*.js')
    .pipe(babel(babelOptions))
    .pipe(output('./dist/lib'))
})

task('bin', () => {
  input('bin/**/*.js')
    .pipe(babel(babelOptions))
    .pipe(chmod(0o755))
    .pipe(output('./dist/bin'))
})

task('css', () => {
  input('static/css/*.css')
    .pipe(postcss([
      require('autoprefixer')({ browsers: ['ie > 8'] }),
      require('postcss-smart-import')(),
      require('cssnano')()
    ]))
    .pipe(output('./dist/css'))
})

task('copy', () => {
  input('static/template/*.pug')
    .pipe(output('dist/template'))
})

task('watch', () => {
  watch('src/**/*.js', ['js'])
  watch('bin/**/*.js', ['bin'])
  watch('static/css/*.css', ['css'])
  watch('static/template/*.pug', ['copy'])
})

task('build', ['js', 'bin', 'css', 'copy'])

task('default', ['build', 'watch'])
