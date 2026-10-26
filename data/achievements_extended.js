window.OTD_GEO_ACHIEVEMENTS_EXTENDED = [
  // Существующие 14 (базовые)
  {id:'first_country', name:'Первая страна', desc:'Изучи 1 страну', xp:30, icon:'🌍', check:function(s){return s.openedCountries>=1;}},
  {id:'traveler', name:'Путешественник', desc:'Изучи 10 стран', xp:100, icon:'✈️', check:function(s){return s.openedCountries>=10;}},
  {id:'researcher', name:'Исследователь', desc:'Изучи 25 стран', xp:300, icon:'🔍', check:function(s){return s.openedCountries>=25;}},
  {id:'around_world', name:'Кругосветка', desc:'Изучи все 50 стран', xp:1000, icon:'🌐', check:function(s){return s.openedCountries>=50;}},
  {id:'all_continents', name:'Все континенты', desc:'Открой 6 континентов', xp:500, icon:'🗺️', check:function(s){return s.openedContinents>=6;}},
  {id:'first_quiz', name:'Первый квиз', desc:'Пройди 1 квиз', xp:30, icon:'🎯', check:function(s){return s.quizzesPassed>=1;}},
  {id:'quiz_10', name:'10 квизов', desc:'Пройди 10 квизов', xp:200, icon:'🎯', check:function(s){return s.quizzesPassed>=10;}},
  {id:'perfect_quiz', name:'Идеальный квиз', desc:'5/5 в квизе', xp:150, icon:'⭐', check:function(s){return s.perfectQuizzes>=1;}},
  {id:'perfect_5', name:'Пять идеальных', desc:'5 идеальных квизов', xp:500, icon:'🌟', check:function(s){return s.perfectQuizzes>=5;}},
  {id:'first_streak', name:'Первый стрик', desc:'3 дня подряд', xp:100, icon:'🔥', check:function(s){return s.streak>=3;}},
  {id:'streak_7', name:'Неделя', desc:'7 дней подряд', xp:300, icon:'🔥', check:function(s){return s.streak>=7;}},
  {id:'streak_30', name:'Месяц', desc:'30 дней подряд', xp:1000, icon:'🔥', check:function(s){return s.streak>=30;}},
  {id:'flags_master', name:'Знаток флагов', desc:'Узнай 25 флагов в квизе', xp:400, icon:'🏳️', check:function(s){return s.flagsLearned>=25;}},
  {id:'capitals_expert', name:'Эксперт столиц', desc:'Узнай 25 столиц', xp:400, icon:'🏛️', check:function(s){return s.capitalsLearned>=25;}},
  
  // НОВЫЕ 8 (расширение)
  {id:'fact_reader', name:'Читатель фактов', desc:'Прочитай 10 фактов дня', xp:100, icon:'📖', check:function(s){return s.factsRead>=10;}},
  {id:'fact_master', name:'Знаток фактов', desc:'Прочитай 50 фактов дня', xp:500, icon:'📚', check:function(s){return s.factsRead>=50;}},
  {id:'fact_100', name:'100 фактов', desc:'Прочитай все 100 фактов', xp:1000, icon:'🎓', check:function(s){return s.factsRead>=100;}},
  {id:'europe_expert', name:'Европовед', desc:'Изучи все 15 стран Европы', xp:500, icon:'🇪🇺', check:function(s){return (s.byContinent&&s.byContinent.europe)>=15;}},
  {id:'asia_expert', name:'Азиевед', desc:'Изучи все 12 стран Азии', xp:500, icon:'🌏', check:function(s){return (s.byContinent&&s.byContinent.asia)>=12;}},
  {id:'africa_expert', name:'Африканист', desc:'Изучи все 8 стран Африки', xp:500, icon:'🌍', check:function(s){return (s.byContinent&&s.byContinent.africa)>=8;}},
  {id:'america_expert', name:'Американист', desc:'Изучи все 12 стран Америк', xp:500, icon:'🌎', check:function(s){return (s.byContinent&&(s.byContinent.north_america+s.byContinent.south_america))>=12;}},
  {id:'geo_guru', name:'Гуру географии', desc:'Открой все 22 достижения', xp:2000, icon:'👑', check:function(s){return s.totalAchievements>=22;}}
];

window.OTD_GEO_ACHIEVEMENTS_CHECK = function(stats) {
  var unlocked = JSON.parse(localStorage.getItem('otd_geo_achievements') || '[]');
  var newly = [];
  window.OTD_GEO_ACHIEVEMENTS_EXTENDED.forEach(function(a) {
    if (unlocked.indexOf(a.id) === -1 && a.check(stats)) {
      unlocked.push(a.id);
      newly.push(a);
      if (window.OTD_IDENTITY) window.OTD_IDENTITY.addXP(a.xp);
    }
  });
  localStorage.setItem('otd_geo_achievements', JSON.stringify(unlocked));
  return newly;
};

window.OTD_GEO_ACHIEVEMENTS_GET = function() {
  return JSON.parse(localStorage.getItem('otd_geo_achievements') || '[]');
};
