# My Gulp Workflow

### These workflow files are for static webpage builds using Gulp. An express server with body and cookie parsing along with log tracking for production and develpment scenarios. 



### The gulp workflow:

* The browser-sync task is started which activates the Nodemon task and starts the server.js file in the root directory which is the express server. The browser-sync task is proxied to the express server which is set for port 3000 and the website can be viewed on port 5000. Any HTML, Jade, CSS, or JavaScript files are watched in theier respective folders for changes and browser-sync updates the browser view. Any changes to the server.js file restarts the express server.

* CSS: All sass files in the public/sass folder are complied to css then combined into one file called style.css. This file is then run through a vender prefixer, a minifier, then sourcemaps are created in the destination folder in the public folder.

* JavaScript: All js files in the public/js folder are run through babel with es2015 presets that transform any ES6 code into ES6 and preforms linting operations. The files are then combined into the script.js file and is stored in the public folder.

* HTML and Jade files are watched for changes in the public and views folder respectively to refresh the browser.



### Still needing to implement: 

* Nodemon watcher for server folder for more complex backend static websites for adatabases, authentication, etc.