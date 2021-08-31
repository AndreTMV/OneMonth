// 1. Grab the input value

document.querySelector(".js-go").addEventListener("click", function () {
  clearBox();
  var input = document.querySelector("input").value;
  var url =
    "http://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=dc6zaTOxFJmzC";
  Ajax(url);
});

document.querySelector(".js-userinput").addEventListener("keyup", function (e) {
  var input = document.querySelector("input").value;
  // if the key ENTER is pressed..
  if (e.which == 13) {
    clearBox();
    var url =
      "http://api.giphy.com/v1/gifs/search?q=" +
      input +
      "&api_key=dc6zaTOxFJmzC";
    Ajax(url);
  }
});

// 2. Do the data stuff with de Api

// AJAX Request
function Ajax(url) {
  var GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open("GET", url);
  GiphyAJAXCall.send();

  GiphyAJAXCall.addEventListener("load", function (e) {
    var data = e.target.response;
    pushToDom(data);
  });
}

// 3. Show me the GIFs

function pushToDom(input) {
  var response = JSON.parse(input);
  var imageURL = response.data;
  var container = document.querySelector(".js-container");

  imageURL.forEach(function (image) {
    var src = image.images.fixed_height.url;
    container.innerHTML += '<img src="' + src + '" class="container-image">';
  });
}

function clearBox() {
  var container = document.querySelector(".js-container");
  container.innerHTML = "";
}
