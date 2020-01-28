// require - includes a node package and puth it in a variable.
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

// exprot this object so webpack can use it (this is NodeJs syntax)
module.exports = {
    // this is the file where webpack will start looking 
    // for all the dependencies which it should bundle together.
    // we can specify more then one entry file like the code in polyfill
    entry: ['babel-polyfill', './src/js/index.js'],
    
    // tells to webpack where to bundle and save the file
    output: {
        // this should be an absolute path. It requires to use a builtin
        // node 'path' package
        // __dirname will return the current path.
        // we want the bundle.js to be saved in dist/js directory.
        path: path.resolve(__dirname, 'dist'),
        // standard name
        filename: 'js/bundle.js'
    },

    // in webpack 4 we have development and production modes.
    // development - builds the bundle with minifying our code in order to be as fast as possible
    // production - will enable automatically kinds of optimizations in order to reduce the bundle.js file size, and it takes more time.
    // can be also configured into the npm script (package.json)
    //mode: 'development'

    devServer: {
        // a dev server which will bundle our code and reload the app automatically
        // everytime we change a file.
        // should be activated in a "start" script which is a script that will always run in the background.

        // distrubution folder of all the bundled files.
        contentBase: path.resolve(__dirname, 'dist'),
    },

    // plugins allows us to do complex processing on our input files: like index.html
    plugins: [
        // this plugin allows us to inject the bundle.js to the on-the-fly-html created by the dev server
        // it will take a template from the template we specify.
        // in oroder for this html to be actually saved to the dist , we need to run the build/dev script
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            {
                // expresstion between /../ is a regex.
                test: /\.js$/, // all JS files will use this babel loader
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }

            }
        ]
    }

};