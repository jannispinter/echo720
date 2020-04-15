const IOS_USER_AGENT = "Mozilla/5.0 (iPad; CPU OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

var target_location = "*://echo360.rub.de/*";

function rewriteUserAgentHeader(e) {
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = IOS_USER_AGENT;
    }
  }
  return {requestHeaders: e.requestHeaders};
}

browser.runtime.onMessage.addListener(notify);
function notify(message) {
  target_location = "*://" + message.targetLocation + "/*";
  browser.webRequest.onBeforeSendHeaders.addListener(
   rewriteUserAgentHeader,
   {urls: [target_location]},
   ["blocking", "requestHeaders"]
  );
  setTimeout(browser.tabs.reload, 500);
}

