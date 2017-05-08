import $ from "jquery";

class Validator {

    validate(registerNewUser) {
        if (!(/\S[_a-zA-Z0-9]{4,10}/).test(registerNewUser.username)) {
            $("#wrongSymbols").fadeIn();
            setTimeout(() => {
                $("#wrongSymbols").hide();
            }, 3000);

            return true;
        } else if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}/).test(registerNewUser.password)) {
            $("#wrongPassword").fadeIn();
            setTimeout(() => {
                $("#wrongPassword").hide();
            }, 3000);

            return true;
        } else {
            return false;
        }
    }
}

const validator = new Validator();
export { validator };