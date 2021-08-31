function clearBox() {
  var container = document.querySelector(".js-search-results");
  container.innerHTML = "";
}

var UI = {};

UI.click = function () {
  document.querySelector(".js-submit").addEventListener("click", function () {
    clearBox();
    var input = document.querySelector("input").value;
    SoundCloudAPI.getTrack(input);
  });
};

UI.press = function () {
  document.querySelector(".js-search").addEventListener("keyup", function (e) {
    var input = document.querySelector("input").value;

    if (e.which == 13) {
      clearBox();
      SoundCloudAPI.getTrack(input);
    }
  });
};
UI.click();
UI.press();

var SoundCloudAPI = {};

SoundCloudAPI.init = function () {};
SC.initialize({
  client_id: "cd9be64eeb32d1741c17cb39e41d254d",
});
SoundCloudAPI.init();

SoundCloudAPI.getTrack = function (inputValue) {
  SC.get("/tracks", {
    q: inputValue,
  }).then(function (tracks) {
    console.log(tracks);
    SoundCloudAPI.renderTracks(tracks);
  });
};

SoundCloudAPI.renderTracks = function (tracks) {
  tracks.forEach(function (track) {
    //card
    var card = document.createElement("div");
    card.classList.add("card");

    //image
    var imageDiv = document.createElement("div");
    imageDiv.classList.add("image");

    var image_img = document.createElement("img");
    image_img.classList.add("image_img");
    image_img.src =
      track.artwork_url || "http://lorempixel.com/100/100/abstract/";

    imageDiv.appendChild(image_img);

    //content
    var content = document.createElement("div");
    content.classList.add("content");

    var header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML =
      "<a href=" +
      track.permalink_url +
      ' target="_blank">' +
      track.title +
      "</a>";

    //button
    var button = document.createElement("div");
    button.classList.add("ui", "bottom", "attached", "button", "js-button");
    var icon = document.createElement("i");
    icon.classList.add("add", "icon");

    var buttonText = document.createElement("span");
    buttonText.innerHTML = "Add to playlist";

    //appendChild
    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);

    button.addEventListener("click", function () {
      SoundCloudAPI.getEmbed(track.permalink_url);
    });

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    var searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card);
  });
};

SoundCloudAPI.getEmbed = function (track_url) {
  SC.oEmbed(track_url, { auto_play: true }).then(function (oEmbed) {
    console.log("oEmbed response: ", oEmbed);
    var sideBar = document.querySelector(".js-playlist");
    var box = document.createElement("div");
    box.innerHTML = oEmbed.html;
    sideBar.insertBefore(box, sideBar.firstChild);
    localStorage.setItem("key", sideBar.innerHTML);
  });
};

var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");
