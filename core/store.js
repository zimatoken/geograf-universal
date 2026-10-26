(function () {
  'use strict';
  var K = 'geo_stats_v2';
  var D = 'geo_discovered_v2';

  var ACH = {
    first_country: { title: 'Первая страна', desc: 'Изучи 1 страну', xp: 30 },
    ten_countries: { title: 'Путешественник', desc: '10 стран', xp: 100 },
    twentyfive_countries: { title: 'Исследователь', desc: '25 стран', xp: 300 },
    fifty_countries: { title: 'Кругосветка', desc: 'Все 50 стран', xp: 1000 },
    all_continents: { title: 'Все континенты', desc: '6 континентов', xp: 500 },
    quiz_1: { title: 'Первый квиз', desc: '1 квиз', xp: 30 },
    quiz_10: { title: '10 квизов', desc: '10 квизов', xp: 200 },
    quiz_perfect: { title: 'Идеальный квиз', desc: '5/5', xp: 100 },
    streak_3: { title: 'Первый стрик', desc: '3 дня', xp: 100 },
    streak_7: { title: 'Неделя силы', desc: '7 дней', xp: 250 },
    streak_30: { title: 'Месяц огня', desc: '30 дней', xp: 1000 },
    level_5: { title: 'Уровень 5', desc: '5 ур.', xp: 0 },
    level_10: { title: 'Уровень 10', desc: '10 ур.', xp: 0 },
    level_20: { title: 'Уровень 20', desc: '20 ур.', xp: 0 }
  };

  function stats() {
    return JSON.parse(localStorage.getItem(K) ||
      '{"xp":0,"level":1,"streak":0,"lastActiveDate":null,"quizzes":0,"perfectQuizzes":0,"totalAnswers":0,"correctAnswers":0,"discovered":[],"achievements":[]}');
  }
  function save(s) { localStorage.setItem(K, JSON.stringify(s)); }
  function addXP(a) {
    var s = stats();
    s.xp += a;
    var nl = Math.floor(s.xp / 100) + 1;
    var lv = false;
    if (nl > s.level) {
      s.level = nl;
      lv = true;
      if (nl >= 5) tryUnlock('level_5');
      if (nl >= 10) tryUnlock('level_10');
      if (nl >= 20) tryUnlock('level_20');
    }
    save(s);
    return { leveledUp: lv, newLevel: s.level, xp: s.xp };
  }
  function checkStreak() {
    var s = stats();
    var t = new Date().toISOString().split('T')[0];
    if (s.lastActiveDate === t) return s.streak;
    var y = new Date(); y.setDate(y.getDate() - 1);
    var yS = y.toISOString().split('T')[0];
    if (s.lastActiveDate === yS) s.streak += 1;
    else s.streak = 1;
    s.lastActiveDate = t;
    save(s);
    if (s.streak >= 3) tryUnlock('streak_3');
    if (s.streak >= 7) tryUnlock('streak_7');
    if (s.streak >= 30) tryUnlock('streak_30');
    return s.streak;
  }
  function tryUnlock(id) {
    var s = stats();
    if (s.achievements.indexOf(id) !== -1) return null;
    var a = ACH[id];
    if (!a) return null;
    s.achievements.push(id);
    if (a.xp) s.xp += a.xp;
    save(s);
    return a;
  }

  window.GEO_STORE = {
    getStats: stats, saveStats: save, addXP: addXP, checkStreak: checkStreak, tryUnlock: tryUnlock,
    ACHIEVEMENTS: ACH,
    getDiscovered: function () { return JSON.parse(localStorage.getItem(D) || '[]'); },
    discover: function (id) {
      var l = window.GEO_STORE.getDiscovered();
      if (l.indexOf(id) !== -1) return false;
      l.push(id);
      localStorage.setItem(D, JSON.stringify(l));
      var s = stats();
      s.discovered = l;
      save(s);
      addXP(10);
      checkStreak();
      if (l.length === 1) tryUnlock('first_country');
      if (l.length >= 10) tryUnlock('ten_countries');
      if (l.length >= 25) tryUnlock('twentyfive_countries');
      if (l.length >= 50) tryUnlock('fifty_countries');
      var cs = {};
      var all = window.GEO_GET_ALL();
      l.forEach(function (x) {
        var c = all.find(function (y) { return y.id === x; });
        if (c) cs[c.continent] = true;
      });
      if (Object.keys(cs).length >= 6) tryUnlock('all_continents');
      return true;
    },
    isDiscovered: function (id) {
      return window.GEO_STORE.getDiscovered().indexOf(id) !== -1;
    },
    registerQuiz: function (c, t) {
      var s = stats();
      s.quizzes += 1;
      s.totalAnswers += t;
      s.correctAnswers += c;
      var p = (c === t);
      if (p) s.perfectQuizzes += 1;
      var xp = c * 10 + (p ? 20 : 0);
      save(s);
      addXP(xp);
      checkStreak();
      if (s.quizzes === 1) tryUnlock('quiz_1');
      if (s.quizzes >= 10) tryUnlock('quiz_10');
      if (p) tryUnlock('quiz_perfect');
      return { xp: xp, perfect: p };
    }
  };
  console.log('[GEO] Store loaded');
})();
