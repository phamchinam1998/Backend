import { Validate } from "../validateStr/validate";

export default class ValidateStr {

    Selector(str, type) {
        switch (type) {
            case "FullName":
                return this.FullName(str);
            case "UserName":
                return this.UserName(str);
            case "Email":
                return this.EmailRegex(str);
            case "Password":
                return this.UserName(str);
            case "PhoneNumber":
                return this.PhoneNumber(str);
            default:
                break;
        }
    }

    FullName(str) {
        const word = str.split(" ")[1];
        const length = str.length;
        const re = this.Regex(Validate(str.split(" ").join("")));
        if (re && word && length > 3 && length < 30) return true;
        else return false;
    }

    UserName(str) {
        const length = str.length;
        const re = this.Regex(str);
        if (re && length > 8 && length < 20) return true;
        else return false;
    }

    Regex(str) {
        const re = /\W/i;
        const result = re.test(str);
        if (!result) return true;
        else return false;
    }

    EmailRegex(str) {
        if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(str)) return true;
        else return false;
    }

    PhoneNumber(str) {
        if (/^\d{10,11}$/.test(str)) return true;
        return false;
    }

    TagValidate(str) {
        const re = /[A-Z]/g;
        const arr = str.split("#").map(str => {
            str = this.SpecialCharValidate(str);
            let modified = str.replace(re, function (match) {
                return match.toLowerCase();
            });
            return modified
        })
        arr.splice(0, 1);
        return arr;
    }

    SpecialCharValidate(str) {
        const arr = [];
        const re = /\w/igm;
        str.split(" ").map(s => {
            if (re.test(Validate(s))) {
                arr.push(s);
            }
        })
        return arr.join(" ");
    }
}