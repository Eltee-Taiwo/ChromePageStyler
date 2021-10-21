// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.Action === "SetPageStyler") {
        var style = document.getElementById('PageStylerContent');
        if (style === null) {
            style = document.createElement('style')
            style.id = "PageStylerContent";
        }
        style.innerHTML = msg.PageStylerContent;
        document.head.appendChild(style);
        // the web-page's DOM content as argument
        //sendResponse(msg.PageStylerContent);
        return;
    }
    if (msg.Action === "GetPageStyler") {
        let styleContent = GetStyleContent();
        sendResponse(styleContent);
    }

});

function GetStyleContent() {
    var style = document.getElementById('PageStylerContent');
    if (style === null) {
        return null;
    }
    return style.innerHTML;
}