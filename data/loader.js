(function () {
  'use strict';

  var xhr = new XMLHttpRequest();
  var countriesUrl = new URL('countries.json', document.currentScript.src);
  xhr.open('GET', countriesUrl.href, true);

  xhr.onload = function () {
    if (xhr.status === 200 || xhr.status === 0) {
      try {
        var data = JSON.parse(xhr.responseText);
        for (var i = 0; i < data.length; i++) {
          window.GEO_REGISTER(data[i]);
        }
        console.log('[GEO] Registered:', window.GEO_COUNT(), 'countries');
        if (window.GEO_ON_LOADED) window.GEO_ON_LOADED();
      } catch (e) {
        console.error('[GEO] Parse error:', e);
      }
    } else {
      console.error('[GEO] Load error:', xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error('[GEO] Network error');
  };

  xhr.send();
})();
