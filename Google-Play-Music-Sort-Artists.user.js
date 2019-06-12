// ==UserScript==
// @name         Google Play Music: Sort artists
// @namespace    gpm-sort-artists
// @version      0.1
// @description  Show now playing song in tab title
// @author       alexesprit
// @icon         https://play-music.gstatic.com/fe/a378fe189aaa5edc65bb398051842c53/favicon_32x32.png
// @match        https://play.google.com/music/listen
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var songListContainerSelector = '.songlist-container';
    var artistColSelector = '[data-col="artist"]';

    initObserver();

    function initObserver() {
      var observer = new MutationObserver(() => {
        var songListElement = document.querySelector(songListContainerSelector);
        if (songListElement) {
          observer.disconnect();
          sortArtists();
        }
      });
      
      observer.observe(document.body, {
        childList: true, subtree: true,
        attributes: false, characterData: false
      });
    }

    function sortArtists() {
      var artistColElement = document.querySelector(artistColSelector);
      if (!artistColElement) {
        throw new Error('No artist column found');
      }
      
      var areArtistsSorted = artistColElement.classList.contains('ascending');
      if (!areArtistsSorted) {
        artistColElement.click();
      }
    }
})();