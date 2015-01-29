## Contents

- [Setting Up PHPSpec With Laravel][setting-up-phpspec-with-laravel]
- [Creating A PHPSpec YML File][creating-a-phpspec-yml-file]
- [Updating The Composer.json File][updating-the-composerjson-file]
- [Auto Testing With Gulp][auto-testing-with-gulp]

## Setting Up PHPSpec With Laravel

First of all, include PHPSpec in your project by calling this command:

```language-shell
composer require phpspec/phpspec --dev
```

PHPSpec should now be located inside `vendor/bin/phpspec`. Navigate to make sure. Alias it for quick reference like this:

```language-shell
alias phpspec=vendor/bin/phpspec
```

## Creating A PHPSpec YML File

In order to play nicely with Laravel, the `phpspec.yml` file must be included to create custom suites. Here's a sample of a custom suite (sample file included in repo):

```language-yml
suites:
  acme_suite:
    namespace: Acme
    src_path: app
    spec_path: app
    spec_prefix: spec
```

Configure it however you want to reflect correct namespace. Now, running `phpspec describe Acme/Foo` should place the spec and source files in the correct destintaions.

## Updating The Composer.json File

A couple steps needed to make sure namespaced classes will be autoloaded. Make sure to include the following in your autoloader in the composer.json file, and rename it to whatever you want:

```language-json
"psr-4": {
    "Acme\\": "app/Acme"
}
```

Then run `composer dumpautoload` to refresh the autoload. Remember, the name of the directory must be consistent with the `phpspec.yml` file.

## Auto Testing With Gulp

First, create your `package.json` file if you don't have one already. Then, install the following gulp modules like this:

```language-shell
npm install gulp --save-dev
npm install gulp-notify --save-dev
npm install gulp-phpspec --save-dev
```

Your `package.json` file should be updated. A sample `gulpfile.js` is included in the source. It includes watchers on the necessary files for testing. Make sure to update it depending on your directory name. Here's the sample (sample file included in repo):

```language-javascript
var gulp = require('gulp');
var notify = require('gulp-notify');
var phpspec = require('gulp-phpspec');

gulp.task('phpspec', function() {

    var options = {
        notify: true,
        verbose: "v"
    };

    gulp.src('app/spec/**/*.php')
        .pipe(phpspec('', options))
        .on('error', notify.onError({
            title: "Tests failed",
            message: "Error(s) occured during the test"
        }))
        .pipe(notify({
            title: "Success",
            message: "Tests passed"
        }));

});

gulp.task('watch', function() {
    gulp.watch(['app/spec/**/*.php', 'app/Acme/src/**/*.php'], ['phpspec']);
});

gulp.task('default', ['phpspec', 'watch']);
```

You can now run the following from the command line:

```language-shell
gulp
```

Auto testing with PHPSpec in Laravel is now in full flight, including notifications.