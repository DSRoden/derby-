(function(){
  'use strict';

  $(document).ready(function(){
    alert('the document is ready');
    $('.assets').click(sellAsset);
  });

  function sellAsset(){
    //debugger;
    var id = $(this).closest('.gambler').attr('data-gambler-id'),
        name = $(this).children('.assetName').text(),
        type = 'delete',
        url = '/gamblers/'+ id + '/assets/' + name;

    console.log(id, name);
    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $gambler = $('.gambler[data-gambler-id='+data.id+']'),
          $asset = $('.assetName:contains('+data.name+')').closest('.assets');
      $gambler.find('.cash').text('$' + data.cash.toFixed(2));
      if(data.isDivorced){
        $gambler.find('.spouseName').addClass('divorce').text('divorced');
      }
      console.log($asset);
      $asset.fadeOut(2000);

      setTimeout(function(){$asset.remove();}, 2000);
    }});
  }
})();

