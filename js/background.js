chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'bounds': {
      'left': 100,
      'top': 100,
      'width': 400,
      'height': 500
    }
  });
});
