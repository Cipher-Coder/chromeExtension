document.getElementById('getURL').addEventListener('click', getCurrentURL);
function getCurrentURL() {
  let inputurl = document.getElementById('userURL').value;

  const app = document.getElementById('displayQR');

  let apiurl = 'https://chart.googleapis.com/chart?cht=qr&chs=120x120&chl=';
  fetch(apiurl + inputurl)
    .then(function (response) {
      if (response.ok) {
        return response.blob();
      }
      throw new Error('Network Response was not OK.');
    })
    .then(function (myBlob) {
      let img = document.createElement('img');
      app.appendChild(img);
      img.src = URL.createObjectURL(myBlob);
    })
    .catch(function (error) {
      console.log('Fetch did not work: ', error.message);
    });
}

// Get url for responsive viewer && store it in local storage

document
  .getElementById('responsiveCheck')
  .addEventListener('click', getResponsiveURL);

function getResponsiveURL() {
  let responsiveURL = document.getElementById('responsive-url').value;
  chrome.storage.local.set({ resURL: responsiveURL }, () => {
    console.log('URL is: ' + responsiveURL);
  });

  chrome.tabs.create({ url: 'src/responsive/index.html' });
}
