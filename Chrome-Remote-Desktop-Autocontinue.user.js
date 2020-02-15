// ==UserScript==
// @name        Chrome Remote Desktop: Autocontinue
// @namespace   crd-autocontinue
// @match       https://remotedesktop.google.com/unsupported-browser/
// @grant       none
// @version     0.1.0
// @author      -
// @description Clicks on "Continue" button for unsupported browsers automatically.
// ==/UserScript==

var continueButtonSelector = '.CwaK9';

(function() {
  'use strict';

  initObserver();

  function initObserver() {
    var observer = new MutationObserver(() => {
      var button = document.querySelectorAll(continueButtonSelector);
      
      if (button.length > 0) {
        observer.disconnect();
        clickOnButton(button[1]);
      }
    });

    observer.observe(document.body, {
      childList: true, subtree: true,
      attributes: false, characterData: false
    });
  }

  function clickOnButton(button) {
    button.click();
  }
})();
