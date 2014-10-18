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
          $.get(".inc/callback.php?" + urArgs, function(data){cb01(data,cbArgs)});
        });
      break;
    }
  }

  // Group by Question
  function cb00(data,cbArgs){
    eval("raw=" + data);
    var dID  = cbArgs.split("||")[0];
    var colT = cbArgs.split("||")[1];
    var tbl = '', head = '', row = ''; 
    head += "<thead><tr>";
    head += "<th width=40 class=sub>#Q</th>";
    head += "<th width=40 class=sub>%Q</th>";
    head += "<th width=40 class=sub>#SRC</th>";
    head += "<th width=40 class=sub>#DST</th>";
    head += "<th class=sub>" + colT + "</th>";
    head += "<th width=60 class=sub>LISTED</th>";
    head += "<th width=150 class=sub>EPOCH</th>";
    head += "<th width=150 class=sub>LAST</th>";
    head += "</tr></thead>";         
     
    var sum  = raw[raw.length - 1].n || 0;
    var rec  = raw[raw.length - 1].r || 0;

    if (rec == 0) {
      row = "<tr><td class=row colspan=3>No result.</td></tr>";
      // need to reflect change here!!
    }

    for (var i=0; i<raw.length - 1; i++) {
      var cnt = raw[i].d0 || "-";
      var dat = raw[i].d1 || "-";
      var sc  = raw[i].d2 || "-";
      var dc  = raw[i].d3 || "-";    
      var lt  = raw[i].d3 || "-";
      var fs  = raw[i].d4 || "-";
      var ls  = raw[i].d5 || "-";

      var per = 0;
      if (sum > 0) per = parseFloat(cnt/sum*100).toFixed(2);

      // Check Blacklist status
      var blStyle  = "style=\"color: #b5b5b5;\""; 
      var blStatus = "NO"; 

      row += "<tr class=dash_row>";
      row += "<td class=row><b>" + cnt + "</b></td>";
      row += "<td class=row><b>" + per + "%</b></td>";
      row += "<td class=row><b>" + sc + "</b></td>";
      row += "<td class=row><b>" + dc + "</b></td>";
      row += "<td class=row>" + dat + "</td>";
      row += "<td class=row " + blStyle + ">" + blStatus + "</td>";
      row += "<td class=\"row time\">" + fs + "</td>";
      row += "<td class=\"row time\">" + ls + "</td>";
      row += "</tr>";
      row += "<tr><td colspan=6><div class=bars style=\"width:" + per + "%;\"></div></td></tr>";
    }
    tbl += "<table id=top_" + dID + " class=dash cellpadding=0 cellspacing=0>";
    tbl += head;
    tbl += row;
    tbl += "</table>";
    $("#" + dID).html(tbl);
  }

  // Group by Answer 
  function cb01(data,cbArgs){
    eval("raw=" + data);
    var dID  = cbArgs.split("||")[0];
    var colT = cbArgs.split("||")[1];
    var tbl = '', head = '', row = ''; 
    head += "<thead><tr>";
    head += "<th width=60 class=sub>#Q</th>";
    head += "<th width=60 class=sub>%Q</th>";
    head += "<th class=sub>" + colT + "</th>";
    head += "<th width=60 class=sub>LISTED?</th>";
    head += "</tr></thead>";         
     
    var sum  = raw[raw.length - 1].n || 0;
    var rec  = raw[raw.length - 1].r || 0;

    if (rec == 0) {
      row = "<tr><td class=row colspan=3>No result.</td></tr>";
      // need to reflect change here!!
    }

    for (var i=0; i<raw.length - 1; i++) {
      var cnt = raw[i].d0 || "-";
      var dat = raw[i].d1 || "-";
      var sc  = raw[i].d2 || "-";
      var dc  = raw[i].d3 || "-";    
      var lt  = raw[i].d3 || "-";

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
    tbl += "<table id=top_" + dID + " class=dash cellpadding=0 cellspacing=0>";
    tbl += head;
    tbl += row;
    tbl += "</table>";
    $("#" + dID).html(tbl);
  }
});
