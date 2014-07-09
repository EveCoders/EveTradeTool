/*Main JS, at your service*/

var item_name_string;
$(document).ready(function(){
    
    var $tableBody = $('#market_table');
    var $xmlMarketData; /*Ein jQuery Objekt mit einem XML drin.*/
    $('#fetch-marketstats').on('click', function(){
        // Get item name form value string
        item_name_string = $('#input-item_name').val();
        // In case we didn't have text input substitute by a default search string
        if (item_name_string === '') item_name_string = 'Tritanium';
        console.log("Item Name: " + item_name_string);

        // lookup corresponding typeID of first matching item
        //var matched_items = searchForItemWithName(item_name_string);
        //console.log("Matched items: " + matched_items);
        var tid = getFirstMatchingTypeID(item_name_string);
        if (tid === -1) {
            alert('Sorry, no item found.');
            return; // bypass market data query and return early
        }

        var url = 'http://api.eve-central.com/api/quicklook',
            settings = {
               typeid : tid,
               sethours : 1,
               regionlimit : 10000002
            };
    
        $.get(url, settings).done(function(data){
            $tableBody.empty();

            $xmlMarketData = $(data);
            console.log("loaded Marketdata.");
            var itemname, station_name, reported_time, expiry_date, vol_remaining, min_volume, price;
        
            itemname = $xmlMarketData.find('itemname').text();
            var sellorders = $xmlMarketData.find('sell_orders').find('order');
            sellorders.each( function(){
                station_name    = $(this).find('station_name').text();
                reported_time   = $(this).find('reported_time').text();
                expiry_date     = $(this).find('expires').text(); 
                vol_remaining   = $(this).find('vol_remain').text(); 
                min_volume      = $(this).find('min_volume').text();
                price           = $(this).find('price').text(); 

                $tableBody.append('<tr><td>' + itemname +
                                  '</td><td>'+ station_name +
                                  '</td><td>'+ reported_time +
                                  '</td><td>'+ expiry_date +
                                  '</td><td>'+ vol_remaining +
                                  '</td><td>'+ min_volume +
                                  '</td><td>'+ price +
                                  '</td></tr>');                    
                }
            );
            

        });
        

    
    });
    
});
    

    
    
