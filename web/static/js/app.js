// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import {Socket} from "deps/phoenix/web/static/js/phoenix"
// import {Socket} from "phoenix"
class App {

  static init(){
    var $messages = $("#table-body")
    var $type = $("#type")
    var $count = $("#count")
    var $run = $("#run")
  


    let socket = new Socket("/socket"); 
    socket.connect();

    let drawTable = function (msg) {
      console.log("drawing a table");

      var table = msg.table;
      var mtable = $("#multiplication_table");
      mtable.text = table;
    };

    let chan = socket.channel("maketable:", {})
    chan.join().receive("ok", chan => {
        console.log("Welcome to maketable!")
    })


    chan.on("drawtable",  msg => {
        $messages.html("");
        $messages.append("<xmp>" + msg.table + "</xmp>");
    });

    let callback = function (chan) {
      chan.onError(function (e) {
        return console.log("something went wrong", e);
      });
      chan.onClose(function (e) {
        return console.log("channel closed", e);
      });

    };

   
    let requestTable = function(type,count) {
      if (count == "" ){ count = "10"; }
      console.log(type, count);
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
