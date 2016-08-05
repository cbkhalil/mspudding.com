const config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const gulp 			= require('gulp')
const pug 			= require('gulp-pug')
const s3 			= require('gulp-s3-upload')(config)

gulp.task('render-blog', function() {
	return 	gulp.src('./development/blog/*.pug')
			.pipe(pug({
				doctype: 'html'
			}))
			.pipe(gulp.dest('./production/blog/'))
})

gulp.task('render-site-components', function() {
	return 	gulp.src('./development/site-components/*.pug')
			.pipe(pug({
				doctype: 'html'
			}))
			.pipe(gulp.dest('./production/'))
})

gulp.task("upload", ['render-blog', 'render-site-components'], function() {
    return 	gulp.src("./production/**")
		    .pipe(s3({
		        Bucket: process.env.AWS_S3_BUCKET_NAME,
		        ACL:    'public-read'
		    }, 
		    {
		        maxRetries: 5
		    }))
})



gulp.task('default', ['upload'])