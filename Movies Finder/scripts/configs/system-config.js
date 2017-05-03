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
        "cryptojs": "./node_modules/crypto-js/crypto-js.js",
        "template": "./scripts/template.js",
        "account-controller": "./scripts/controllers/account-controller.js",
        "gallery-controller": "./scripts/controllers/gallery-controller.js",
        "encryptor": "./scripts/еncryptor.js",
        "mocha": "../../node_modules/mocha/mocha.js",
        "chai": "../../node_modules/chai/chai.js",
        "sinon": "../../node_modules/sinon/pkg/sinon.js",
        "sinon-chai": "../../node_modules/sinon-chai/lib/sinon-chai.js"
    }
});

System.import("app");