var downloads = [];

var downloadSong = function(url, tabid){
  if( chrome.webRequest.onBeforeRequest.hasListeners() )
      chrome.webRequest.onBeforeRequest.removeListener(findmp3);

  chrome.tabs.sendMessage( tabid , {action: "getSong", url : url} );
  
  setTimeout(function(){ startListener(); },500)
}

var findmp3 = function(details){
  if( details.url.indexOf("cloudfront.net/mp3/") === -1 && downloads.indexOf(details.url) ) return;
  
  downloadSong(details.url, details.tabId)
};

var startListener = function(){
  chrome.webRequest.onBeforeRequest.addListener(
    findmp3,
    {urls: ["*://*.cloudfront.net/mp3/*"]},
    ['blocking']
  );
};
startListener();
