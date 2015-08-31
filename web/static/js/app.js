import "deps/phoenix_html/web/static/js/phoenix_html"

import {Socket} from "deps/phoenix/web/static/js/phoenix"

class App {

  static init(){
    var $table = $("#table-body");
    var $type = $("#type");
    var $count = $("#count");
    var $run = $("#run");
  
    let socket = new Socket("/socket"); 
    socket.connect();

    let chan = socket.channel("maketable:", {});

    chan.join().receive("ok", chan => {
        console.log("Welcome to maketable!");
    })

    chan.on("drawtable",  msg => {
        $table.html("");
        $table.append("<xmp>" + msg.table + "</xmp>");
    });

    chan.onError(function (e) {
        return console.log("something went wrong", e);
    });
    chan.onClose(function (e) {
        return console.log("channel closed", e);
    });

    let requestTable = function(type,count) {
      if (count == "" ){ count = "10"; }
      chan.push("maketable", {type: type, count: count}).receive("ignore", function () {
      return console.log("auth error");
      });
    };

    $run.on("click", e => {
      var type = $type.val();
      var count = $count.val();
      console.log("in click");
      requestTable(type,count);
    })
  }
}

$( () => App.init() )

export default App
