import handlebars from "handlebars";
// import Handlebars from "handlebars";
import $ from "jquery";

class Template {
    get(name) {
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