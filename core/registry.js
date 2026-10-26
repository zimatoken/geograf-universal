(function () {
  'use strict';
  var C = Object.create(null);
  var N = 0;
  window.GEO_REGISTER = function (c) {
    if (!c || !c.id) return false;
    if (!C[c.id]) N++;
    C[c.id] = c;
    return true;
  };
  window.GEO_GET = function (id) { return C[id] || null; };
  window.GEO_GET_ALL = function () { return Object.values(C); };
  window.GEO_COUNT = function () { return N; };
  window.GEO_FILTER = function (f) {
    var l = window.GEO_GET_ALL();
    if (!f) return l;
    if (f.continent) l = l.filter(function (c) { return c.continent === f.continent; });
    if (f.difficulty) l = l.filter(function (c) { return c.difficulty === f.difficulty; });
    if (f.search) {
      var s = f.search.toLowerCase();
      l = l.filter(function (c) { return (c.name + ' ' + c.capital).toLowerCase().indexOf(s) !== -1; });
    }
    return l;
  };
  window.GEO_GET_CONTINENTS = function () {
    var set = {};
    window.GEO_GET_ALL().forEach(function (c) { set[c.continent] = true; });
    return Object.keys(set).sort();
  };
  window.GEO_GET_BY_CONTINENT = function () {
    var m = {};
    window.GEO_GET_ALL().forEach(function (c) {
      if (!m[c.continent]) m[c.continent] = [];
      m[c.continent].push(c);
    });
    return m;
  };
  console.log('[GEO] Registry loaded');
})();
