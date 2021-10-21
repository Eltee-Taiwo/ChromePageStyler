// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.PageStylerContent) {
        var style = document.getElementById('PageStylerContent');
        if (style === null) {
            style = document.createElement('style')
            style.id = "PageStylerContent";
        }
        style.innerHTML = msg.PageStylerContent;
        document.head.appendChild(style);
        // the web-page's DOM content as argument
        //console.log(`I am sending the following style content ${msg.PageStylerContent}`)
        //sendResponse(msg.PageStylerContent);
    }
});