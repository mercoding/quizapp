export function loadJSON(file) {
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", file, false);
    xhReq.send(null);
    return JSON.parse(xhReq.responseText);
}