define('config/values.js', [], function(){
  
  function Values(ngApp){
  
    ngApp.value('dummies', {
      apptitle: 'My Sample Appliii'
    })
  }
  return Values;
});