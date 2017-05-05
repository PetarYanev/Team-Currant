import handlebars from "handlebars";
// import Handlebars from "handlebars";
import $ from "jquery";

class Template {
    get(name) {
        handlebars.registerHelper('ifThird', function(index, options) {
            if (index % 3 === 0) {
                return options.fn(this);
            }
        });

        handlebars.registerHelper('ifThirdLast', function(index, options) {
            if (index % 3 === 2) {
                return options.fn(this);
            }
        });

        let promise = new Promise(function(resolve, reject) {
            let url = `templates/${name}.handlebars`;

            $.get(url, function(templateHtml) {
                let templ = handlebars.compile(templateHtml);
                resolve(templ);
            });
        });

        return promise;
    }
}
const template = new Template();
export { template };