$(document).ready(function(){

  // Make intial boxes
  var limit = 20;
  mkBox("gbyQ",limit);
  mkBox("gbyA",limit);

  function mkBox(box,limit) {
    switch (box) {
      case "gbyQ":
        var urArgs = "type=0";
        var cbArgs = box + "||QUESTION";
        $(function(){
          $.get(".inc/callback.php?" + urArgs, function(data){cb00(data,cbArgs)});
        });
      break;
      case "gbyA":
        var urArgs = "type=1";
        var cbArgs = box + "||ANSWER";
        $(function(){
          $.get(".inc/callback.php?" + urArgs, function(data){cb00(data,cbArgs)});
        });
      break;
    }
  }
  // Group by Q or A
  function cb00(data,cbArgs){
    eval("raw=" + data);
    var tbl = '', head = '', row = ''; 
    head += "<thead><tr>";
    head += "<th width=60 class=sub>#Qs</th>";
    head += "<th width=20 class=sub>%Qs</th>";
    head += "<th class=sub>" + cbArgs.split("||")[1] + "</th>";
    head += "<th class=sub>LISTED?</th>";
    head += "</tr></thead>";         
     
    var sum  = raw[raw.length - 1].n || 0;
    var rec  = raw[raw.length - 1].r || 0;

    if (rec == 0) {
      row = "<tr><td class=row colspan=3>No result.</td></tr>";
      // need to reflect change here!!
    }

    for (var i=0; i<raw.length - 1; i++) {
      var cnt    = raw[i].d0 || "-";
      var dat    = raw[i].d1 || "-";
      var per = 0;
      if (sum > 0) per = parseFloat(cnt/sum*100).toFixed(2);

      // Check Blacklist status
      var blStyle  = "style=\"color: #b5b5b5;\"";
      var blStatus = "NO"; 

      row += "<tr class=dash_row>";
      row += "<td class=row><b>" + cnt + "</b></td>";
      row += "<td class=row><b>" + per + "%</b></td>";
      row += "<td class=row>" + dat + "</td>";
      row += "<td class=row " + blStyle + ">" + blStatus + "</td>";
      row += "</tr>";
      row += "<tr><td colspan=6><div class=bars style=\"width:" + per + "%;\"></div></td></tr>";
    }
    tbl += "<table id=top" + cbArgs.split("||")[0] + " class=dash cellpadding=0 cellspacing=0>";
    tbl += head;
    tbl += row;
    tbl += "</table>";
    $("#" + cbArgs.split("||")[0]).append(tbl);
  }
});
