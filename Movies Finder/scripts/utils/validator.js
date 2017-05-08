import $ from "jquery";

class Validator {

    validate(registerNewUser, context) {
        if (!(/\S[_a-zA-Z0-9]{4,10}/).test(registerNewUser.username)) {
            $("#wrongSymbols").fadeIn();
            setTimeout(() => {
                $("#wrongSymbols").hide();
                context.redirect("#/register");
            }, 3000);

            return false;
        } else if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}/).test(registerNewUser.password)) {
            $("#wrongPassword").fadeIn();
            setTimeout(() => {
                $("#wrongPassword").hide();
                context.redirect("#/register");
            }, 3000);

            return false;
        } else {
            return true;
        }
    }
}

const validator = new Validator();
export { validator };