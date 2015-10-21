define([], function(){
  
  function Values(ngApp){
  
    ngApp.value('dummies', {
      apptitle: 'My Sample Appliii'
    })
    ngApp.value('tracks', {
      active: -1,
      songs: [
        'broken_moon_vocal',
        'broken_moon'
      ]
    });
  }
  return Values;
});