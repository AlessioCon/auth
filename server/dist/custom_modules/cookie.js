"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
class Cookie {
    static getCookie(cookies, key) {
        if (typeof cookies !== 'string' || cookies.length < 2)
            return null;
        let noSpace = cookies.split(/\s/g);
        let keyReg = new RegExp('\\b' + key + '=');
        let myCookie = noSpace.find(x => x.match(keyReg));
        if (!myCookie)
            return null;
        return myCookie.replace(/;$/, '').split(keyReg)[1] || null;
    }
}
exports.Cookie = Cookie;
//# sourceMappingURL=cookie.js.map