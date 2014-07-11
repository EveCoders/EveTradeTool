/*Main JS, at your service*/


$(document).ready(function(){
  
  /*activate plugins*/
  
  /*----------------*/
  
  

    var $tableBody = $('#market_table');
    var $xmlMarketData; /*Ein jQuery Objekt mit einem XML drin.*/
    var item_name_string, region_name_string;
    
    // autosuggestions while typing
    $('#input-item_name').on('keyup', function() {
        item_name_string = $('#input-item_name').val();
        // skip rest if we don't have at least three characters
        if ( item_name_string.length < 3) {
          $('#input-item-guess-field').parent().fadeOut();
          return;
          
        }
        var matched_items = searchForItemWithName(item_name_string);
        
        $('#input-item-guess-field').empty();
        $('#input-item-guess-field').parent().fadeIn();
        
        $(matched_items).each(function(){
          $('#input-item-guess-field').append('<li class="list-group-item">'+this.typeName+'</li>');
        })
        
        $('#input-item-guess-field').contents().on('click', function(){
           $('#input-item_name').val($(this).text());
           $('#input-item-guess-field').parent().fadeOut();
          });
        
    })
    
    $('#input-region_name').on('keyup', function() {
        region_name_string = $('#input-region_name').val();
        // skip rest if we don't have at least two characters
        if ( region_name_string.length < 2) {
          $('#input-region-guess-field').parent().fadeOut();
          return;
          
        }
        var matched_regions = searchForRegionWithName(region_name_string);
        
        $('#input-region-guess-field').empty();
        $('#input-region-guess-field').parent().fadeIn();
        
        $(matched_regions).each(function(){
          $('#input-region-guess-field').append('<li class="list-group-item">'+this.regionName+'</li>');
        })
        
        $('#input-region-guess-field').contents().on('click', function(){
           $('#input-region_name').val($(this).text());
           $('#input-region-guess-field').parent().fadeOut();
          });
    })
    

    $('#fetch-marketstats').on('click', function(){
        /* ITEM text field */
        // Get item name form value string
        item_name_string = $('#input-item_name').val();
        // In case we didn't have text input substitute by a default search string
        if (item_name_string === '') item_name_string = 'Tritanium';
        console.log("Item Name: " + item_name_string);

        // lookup corresponding typeID of first matching item

        //console.log("Matched items: " + matched_items);
        var tid = getFirstMatchingTypeID(item_name_string);
        if (tid === -1) {
            alert('Sorry, no matching item found.');
            return; // bypass market data query and return early
        }

        /* REGION text field */
        // Get region name form value string
        region_name_string = $('#input-region_name').val();
        // In case we didn't have text input substitute by a default search string
        if (region_name_string === '') region_name_string = 'Domain';
        console.log("Region Name: " + region_name_string);

        // lookup corresponding typeID of first matching item

        //console.log("Matched items: " + matched_items);
        var rid = getFirstMatchingRegionID(region_name_string);
        if (rid === -1) {
            alert('Sorry, no matching region found.');
            return; // bypass market data query and return early
        }
        
        var url = 'http://api.eve-central.com/api/quicklook',
            settings = {
               typeid : tid,
               sethours : 24,
               regionlimit : rid
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
    

    
    
