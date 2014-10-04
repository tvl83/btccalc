$( document ).ready( function(){
    var now;
    var btcPrice = 0.0;
    var btcPriceTime;
    var value = 0.0;
    var txtUSD = $('#usd');
    var txtBTC = $('#btc');
    var txtmBTC = $('#mbtc');
    var txtuBTC = $('#ubtc');
    var txtsatoshi = $('#satoshi');
    var totalOutput = $('#total');

    // Node-webkit variables
    var nw = require('nw.gui');
    var win = nw.Window.get();
    win.setResizable(false);

    function refreshBTCPrice(){
        $('#btcprice').text('$ ??? ');

        $.ajax({
            url: "https://api.coinbase.com/v1/prices/spot_rate"
        })
        .done(function( data ) {
          now = new Date();
          btcPrice = data.amount;
          btcPriceTime = now.toTimeString();
          $('#btcprice').text('$' + data.amount + " @ " + btcPriceTime)
        });
    }

    $( '#btnRefreshBTCPrice' ).on('click', function(){
        refreshBTCPrice();
      }
    );

    txtUSD.keyup(function() {
      txtBTC.val(      (parseFloat(txtUSD.val()) / btcPrice).toFixed(8) );
      txtmBTC.val(    ((parseFloat(txtUSD.val()) / btcPrice) * 1000).toFixed(8) );
      txtuBTC.val(    ((parseFloat(txtUSD.val()) / btcPrice) * 1000000).toFixed(8) );
      txtsatoshi.val( ((parseFloat(txtUSD.val()) / btcPrice) * 100000000).toFixed(8) );

      value = parseFloat(txtBTC.val()) * btcPrice;

      totalOutput.text( txtBTC.val() + " BTC is $" + value.toFixed(2));
      //txtUSD.val(value.toFixed(2));
    });

    txtBTC.keyup(function() {
      txtmBTC.val( parseFloat(txtBTC.val()) * 1000);
      txtuBTC.val( parseFloat(txtBTC.val()) * 1000000);
      txtsatoshi.val( (parseFloat(txtBTC.val()) * 100000000));

      value = parseFloat(txtBTC.val()) * btcPrice;

      totalOutput.text( txtBTC.val() + " BTC is $" + value.toFixed(2));

      txtUSD.val(value.toFixed(2));
    });

    txtmBTC.keyup(function() {
      txtBTC.val(parseFloat(txtmBTC.val()) / 1000);
      txtuBTC.val( parseFloat(txtmBTC.val()) * 1000);
      txtsatoshi.val( (parseFloat(txtmBTC.val()) * 100000));

      value = parseFloat(txtBTC.val()) * btcPrice;

      totalOutput.text( txtmBTC.val() + " mBTC is $" + value.toFixed(2));

      txtUSD.val(value.toFixed(2));
    });

    txtuBTC.keyup(function() {
      txtBTC.val(parseFloat(txtuBTC.val()) / 1000000);
      txtmBTC.val( parseFloat(txtuBTC.val()) / 1000);
      txtsatoshi.val( (parseFloat(txtuBTC.val()) * 100));

      value = parseFloat(txtBTC.val()) * btcPrice;

      totalOutput.text( txtuBTC.val() + " uBTC is $" + value.toFixed(2));

      txtUSD.val(value.toFixed(2));
    });

    txtsatoshi.keyup(function() {
      txtBTC.val( (parseFloat(txtsatoshi.val()) / 100000000).toFixed(8));
      txtmBTC.val( parseFloat(txtsatoshi.val()) / 1000);
      txtuBTC.val( (parseFloat(txtsatoshi.val()) / 100));

      value = parseFloat(txtBTC.val()) * btcPrice;

      totalOutput.text( txtsatoshi.val() + " satoshi is $" + value.toFixed(8));

      txtUSD.val(value.toFixed(2));
    });

        refreshBTCPrice();


        document.getElementById('windowControlMinimize').onclick = function()
        {
            win.minimize();
        };

        // Close
        document.getElementById('windowControlClose').onclick = function()
        {
            win.close();
        };
//
//        var Engine = require('tingodb')();
//
//        var db = new Engine.Db('/some/local/path', {});
  }
);

