// ==UserScript==
// @name         Spotify: Now playing song in tab title
// @namespace    spotify-now-playing
// @version      0.1
// @description  Show now playing song in tab title
// @author       alexesprit
// @icon         https://open.scdn.co/static/images/favicon.png
// @match        https://open.spotify.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var UPDATE_INTERVAL = 500;
    var DEFAULT_TITLE = 'Spotify Web Player';

    function updateArtistTrack() {
        var newTabTitle;

        if (isPlaying()) {
            var trackElem = document.querySelector('.track-info__name a');
            if (!trackElem) {
                return;
            }

            var artistElem = document.querySelectorAll('.track-info__artists a');
            if (artistElem.length === 0) {
                return;
            }
            var artist = '';
            var artists = [];
            for (var i = 0; i < artistElem.length; ++i) {
                artists.push(artistElem[i].textContent);
            }

            newTabTitle = trackElem.textContent + ' - ' + artists.join(', ');
        } else {
            newTabTitle = DEFAULT_TITLE;
        }

        if (document.title !== newTabTitle) {
            document.title = newTabTitle;
        }
    }

    function isPlaying() {
        let playButtonElem = document.querySelector('[class*="spoticon-play-"]');
        return playButtonElem === null;
    }

    setInterval(updateArtistTrack, UPDATE_INTERVAL);
})();