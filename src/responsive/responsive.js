window.onload = function getURL() {
  chrome.storage.local.get(['resURL'], function (result) {
    let url = result.resURL;
    if (url === undefined) {
      let pageStart = document.getElementById('frame-start');

      pageStart.setAttribute('style', 'color: red; font-size: 1.5rem;');
      pageStart.textContent =
        'No URL Detected. Go back to Dev Tabs Popup and enter URL!';
    } else {
      function createIframe(height, width) {
        let pageStart = document.getElementById('frame-start');
        let iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.setAttribute(
          'sandbox',
          'allow-scripts allow-forms allow-same-origin'
        );
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute(
          'style',
          `height: ${height}; width: ${width}; margin: 65px 45px`
        );
        pageStart.appendChild(iframe);
      }
      createIframe('846px', '412px');
      createIframe('786px', '393px');
      createIframe('812px', '375px');
      createIframe('800px', '1024px');
      createIframe('800px', '1280px');
    }
  });
};
