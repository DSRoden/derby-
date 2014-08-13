(function(){
  'use strict';

  $(document).ready(function(){
    alert('the document is ready');
    $('.assets').click(showAsset);
  });

  function showAsset(){
    //debugger;
    var id = $(this).closest('.gambler').attr('data-gambler-id'),
        name = $(this).children('.assetName').text();
    console.log(id, name);
  }
})();

