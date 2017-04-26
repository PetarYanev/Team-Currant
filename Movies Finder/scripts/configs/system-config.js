/*globals SystemJS*/

SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: "plugin-babel",
    // tell SystemJS where to look for the dependencies
    map: {
        "plugin-babel": "../../node_modules/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "../../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js",
        // app start script
        "app": "./scripts/app.js",
        "sammy": "./node_modules/sammy/lib/sammy.js",
        "jquery": "./node_modules/jquery/dist/jquery.min.js",
        "handlebars": "./node_modules/handlebars/dist/handlebars.js",
        "template": "./scripts/template.js",
        "account-controller": "./scripts/controllers/account-controller.js"
    }
});

System.import("app");