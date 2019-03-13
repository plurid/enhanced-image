/**
 * Utility function to load dummy data
 * which will be received from the server.
 *
 * @param path {string}
 * @param callback {Function}
 */
export const loadJSON = (path: string, callback: Function) => {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");

    xobj.open('GET', path, true);
    xobj.onreadystatechange = () => {
        if (xobj.readyState == 4 && xobj.status == 200) {
            callback(JSON.parse(xobj.responseText));
        }
    };

    xobj.send(null);
}
