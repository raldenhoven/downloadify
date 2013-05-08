chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "getSong"){
      var title = document.title;
      if( title === 'Spotify Web Player' ) return;
      
      title = title.replace(/ - Spotify$/mgi, '');
      title = title.replace(/^[^0-9A-Z]*/mgi, '');
      
      var a = document.createElement('a'); 
      a.download = title + '.mp3';
      a.href = request.url;
      a.dataset.downloadurl = ['audio/mpeg', a.download, a.href].join(':'); 
      a.click();

    }else{
    }
});
