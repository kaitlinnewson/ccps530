
var index = 1;
var maxIndex = 5;

function imgCall () {
  // Get JSON from API
  fetch("https://api.unsplash.com/collections/jHYXmhjO6kc/photos?client_id=6Q66WfE4SxapBJHwVyK4emy-MFL8f2SZxSYAD4DM8MY")
    .then(function (response) {
      return response.json();
    })
    .then(function (imgJson) {
      var img = document.querySelector('#cocktail-img')
      var desc = document.querySelector('#cocktail-img-desc')
      img.setAttribute('src',imgJson[0].urls.small)
      img.setAttribute('alt',imgJson[0].alt_description)
      desc.innerHTML = imgJson[0].alt_description
      setInterval(function() {
        // update the image
        img.setAttribute('src',imgJson[index].urls.small)
        img.setAttribute('alt',imgJson[index].alt_description)
        desc.innerHTML = imgJson[index].alt_description
        index ++;
        if (index == maxIndex) {
          index = 0;
        }
    }, 20000)
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

imgCall();
