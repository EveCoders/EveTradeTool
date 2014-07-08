/*Main JS, at your service*/

$(document).ready(function(){
    
    $('#fetch-marketstats').on('click', function(){
        
        var $xmlMarketData; /*Ein jQuery Objekt mit einem XML drin.*/
        
        var url = 'http://api.eve-central.com/api/marketstat',
            settings = {
               typeid : 34,
               hours : 1,
               regionlimit : 10000002
            };
    
        $.get(url, settings).done(function(data){
            $xmlMarketData = $(data);
            console.log("loaded Marketdata.");
        });
        
    });
    
});
    

    
    
