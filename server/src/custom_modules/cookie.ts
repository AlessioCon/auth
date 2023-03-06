export class Cookie {

    static getCookie(cookies: string, key: string) : null | string {
        if(typeof cookies !== 'string' || cookies.length < 2) return null;
        //divido tutti gli spazzi
        let noSpace = cookies.split(/\s/g);

        //individuazione cookie richiesto
        let keyReg = new RegExp('\\b'+key+'=')
        let myCookie = noSpace.find(x => x.match(keyReg))
        if(!myCookie) return null

        //estrarre valore
        return myCookie.replace(/;$/, '').split(keyReg)[1] || null
    }
}