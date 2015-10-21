define([], function(){
  
  function Values(ngApp){
  
    ngApp.value('dummies', {
      apptitle: 'My Sample Appliii'
    })
    ngApp.value('tracks', {
      active: -1,
      autoNext: true,
      loop: false,
      songs: [
        'broken_moon_vocal',
        'broken_moon'
      ]
    });
  }
  return Values;
});