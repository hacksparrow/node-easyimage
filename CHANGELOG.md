0.0.1 - 28-02-2012
------------------

Initial release

0.0.2 - 29-02-2012
------------------

1. Fixed space character in file name bug
2. crop() will assume width and height as cropwidth and cropheight if they are not specified

0.0.3 - 29-02-2012
------------------

1. '(' and ')' escaped in filenames

0.0.4 - 29-02-2012
------------------

1. Fixed file name special character bug. More complicated than assumed!

0.0.5 - 09-04-2012
------------------

1. File names can have more than once space

0.0.6 - 09-04-2012
------------------

1. Better fix for file name issues.
2. info() bug fixed

0.0.7 - 10-04-2012
------------------

1. New method - thumbnail()

0.0.8 - 11-04-2012
------------------

1. Bug in thumbnail() fixed

0.0.9 - 15-04-2012
------------------

1. Optimized info()

0.1.0 - 18-04-2012
------------------

1. Operations return an image object

0.1.1 - 09-05-2012
------------------

1. Crop bug fixed
2. Fill option

0.1.2 - 27-05-2012
------------------

1. Unsupported files should not crash

0.1.3 - 11-06-2012
------------------

1. Refactored to return an error object instead of crashing the app, in case of errors

0.1.4 - 25-11-2013
------------------

1. Add density info (Kevin Smith ksmth@github)
2. Made testing easier with a sample image and output directory

0.1.7 - 11-07-2014
------------------

1. Thumbnail generation optimized

1.0.0 - 14-07-2014
------------------

1. Changed to promise-based interface
2. Mocha tests

1.0.1 - 03-08-2014
------------------

1. Fixed potential hidden bugs - thanks to @jheusala

1.0.2 - 21-08-2014
------------------

1. Remove PixelsPerCentimeter
2. Test output dir

1.0.3 - 27-09-2014
------------------

1. Use child_process.execFile instead of child_process.exec to prevent potential shellshock exploit

