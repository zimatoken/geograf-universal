(function () {
  'use strict';
  window.GEO_THEME = {
    toggle: function () {
      var c = document.documentElement.getAttribute('data-theme');
      var n = (c === 'dark') ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', n);
      localStorage.setItem('ecosystem_theme_universal_v2', n);
      localStorage.setItem('theme', n);
    },
    init: function () {
      var t = localStorage.getItem('ecosystem_theme_universal_v2') || localStorage.getItem('theme');
      if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    }
  };
  window.GEO_THEME.init();
})();
