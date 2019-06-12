// ==UserScript==
// @name         Pandora: Now playing song in tab title
// @namespace    pandora-now-playing
// @version      0.1
// @description  Show now playing song in tab title
// @author       alexesprit
// @icon         https://www.pandora.com/favicon.ico
// @match        https://www.pandora.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var UPDATE_INTERVAL = 500;
    var DEFAULT_TITLE = 'Pandora Radio - Listen to Free Internet Radio, Find New Music';

    function updateArtistTrack() {
        var newTabTitle;

        if (isPlaying()) {
            var trackElem = document.querySelector('[data-qa="mini_track_title"]');
            if (!trackElem) {
                return;
            }

            var artistElem = document.querySelector('[data-qa="mini_track_artist_name"]');
            if (!artistElem) {
                return;
            }

            newTabTitle = trackElem.textContent + ' - ' + artistElem.textContent;
        } else {
            newTabTitle = DEFAULT_TITLE;
        }

        if (document.title !== newTabTitle) {
            document.title = newTabTitle;
        }
    }

    function isPlaying() {
        let playButtonElem = document.querySelector('[data-qa="play_button"]');
        return playButtonElem === null;
    }

    setInterval(updateArtistTrack, UPDATE_INTERVAL);
})();