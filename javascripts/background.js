var downloads = [];

var downloadSong = function(url, tabid){
  if( chrome.webRequest.onBeforeRequest.hasListeners() )
      chrome.webRequest.onBeforeRequest.removeListener(findmp3);

  chrome.tabs.sendMessage( tabid , {action: "getSong", url : url} );

  setTimeout(function(){ startListener(); },500)
}

var findmp3 = function(details){
  if( details.url.indexOf("api.tidalhifi.com/v1/tracks/") === -1 && downloads.indexOf(details.url) ) return;
  downloadSong(details.url, details.tabId)
};

var startListener = function(){
  chrome.webRequest.onBeforeRequest.addListener(
    findmp3,
    {urls: ["*://api.tidalhifi.com/v1/tracks/*"]},
    ['blocking']
  );
};
startListener();
