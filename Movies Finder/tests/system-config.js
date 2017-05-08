/*globals SystemJS*/

SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: "plugin-babel",
    // tell SystemJS where to look for the dependencies
    map: {
        "plugin-babel": "./node_modules/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "./node_modules/systemjs-plugin-babel/systemjs-babel-browser.js",
        // app start script
        "app": "./scripts/app.js",
        "sammy": "./node_modules/sammy/lib/sammy.js",
        "jquery": "./node_modules/jquery/dist/jquery.min.js",
        "handlebars": "./node_modules/handlebars/dist/handlebars.js",
        "cryptojs": "./node_modules/crypto-js/crypto-js.js",
        "mocha": "./node_modules/mocha/lib/mocha.js",
        "chai": "./node_modules/chai/chai.js",
        "sinon": "./node_modules/sinon/pkg/sinon-2.2.0.js",
        "sinon-chai": "./node_modules/sinon-chai/lib/sinon-chai.js",

        "template": "./scripts/template.js",
        "account-data": "./scripts/data/account-data.js",
        "gallery-data": "./scripts/data/gallery-data.js",
        "encryptor": "./scripts/еncryptor.js",
        "validator": "./scripts/utils/validator.js",
        "requester": "./scripts/requester/request.js",
        "galleryController": "./scripts/controllers/gallery-controller.js",
        "accountController": "./scripts/controllers/account-controller.js"
    }
});

System.import("app");