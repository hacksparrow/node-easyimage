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

0.1.2 - 27-05-2012
------------------

1. refactored to pass all errors to callback instead of throwing since nodejs does not pass thrown exceptions up the call stack as expected