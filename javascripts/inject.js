chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

	// TIDAL username and pass
	var u = '';
	var p = '';

	// TIDAL iOS app config, might need to be updated in future
	var version = '1.3.0';
	var token = 'GvFhCVAYp3n43EN3';
	var key = '8ED5FAF9-10ED-4C34-B43B-284F2BB801C3';

	if (request.action == "getSong"){
	  console.log('[tidalWave] injected...');
	  $.post("https://api.tidalhifi.com/v1/login/username", { username: u, password: p , clientVersion: version, token: token, clientUniqueKey: key} ).done(function(data) {
		var session = data.sessionId;
		console.log('[tidalWave] grabbed mobile session: ' + session);

		var base = request.url;
		var fixed = base.replace(/[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i, session);
		console.log('[tidalWave] grabbed mobileApi streamUrl: ' + fixed);

		$.getJSON(fixed, function(data) {
		  var swagUrl = data.url;
		  var id = data.trackId;

		  console.log('[tidalWave] grabbed mobileApi download: ' + swagUrl);
		  console.log('[tidalWave] starting download!');

		  var a = document.createElement('a');
		  a.download = id + '.m4a';
		  a.href = swagUrl;
		  a.dataset.downloadurl = ['audio/m4a', a.download, a.href].join(':');
		  a.click();
		});

	  });

	}else{
	}
});
