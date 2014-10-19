$(document).ready(function(){

  // Make intial boxes
  var limit = 10;
  mkBox("gbyQ",limit,"*",0);
  mkBox("gbyA",limit,"*",0);

  // Query builder and box maker
  function mkBox(box,limit,question,cid) {
  
    var filter = s2h("nope");
    switch (box) {
      case "gbyQ":
        var urArgs = "type=0&limit=" + limit + "&filter=" + filter;
        var cbArgs = box + "||QUESTION";
        $(function(){
          $.get(".inc/callback.php?" + urArgs, function(data){cb00(data,cbArgs)});
        });
      break;
      case "gbyA":
        var urArgs = "type=1&limit=" + limit + "&filter=" + filter;
        var cbArgs = box + "||ANSWER";
        $(function(){
          $.get(".inc/callback.php?" + urArgs, function(data){cb01(data,cbArgs)});
        });
      break;
      case "src_ip":
        filter = s2h(question);
        var urArgs = "type=2&limit=" + limit + "&filter=" + filter;
        var cbArgs = box + "||SRC IP";
        $(function(){
          $.get(".inc/callback.php?" + urArgs, function(data){cb02(data,cbArgs,cid)});
        });
      break;
      case "dst_ip":
        var urArgs = "type=3&limit=" + limit + "&filter=" + filter;
        var cbArgs = box + "||DST IP";
        $(function(){
          $.get(".inc/callback.php?" + urArgs, function(data){cb03(data,cbArgs,cid)});
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
      var fs  = raw[i].d4 || "-";
      var ls  = raw[i].d5 || "-";
      var bl  = raw[i].d6 || "-";

      var per = 0;
      if (sum > 0) per = parseFloat(cnt/sum*100).toFixed(2);

      // Check blacklists
      switch (bl) {
        case "-":
          var blStyle  = "style=\"color: #b5b5b5;\""; 
          var blStatus = "NO";
        break;
        default:
          var blStyle  = "style=\"color: #cc0000; font-weight:bold;\"";
          var blStatus = "<img class=indicator src=\".css/bad.png\">";
        break;
      }  
      
      var rID = dID + "_" + i;
      row += "<tr id=" + rID + " class=dash_row data-col=8 data-val=" + dat + ">";
      row += "<td class=row><b>" + cnt + "</b></td>";
      row += "<td class=row><b>" + per + "%</b></td>";
      row += "<td data-obj=src_ip class=\"row row_filter\"><b>" + sc + "</b></td>";
      row += "<td data-obj=dst_ip class=\"row row_filter\"><b>" + dc + "</b></td>";
      row += "<td data-obj=question class=\"row row_filter\">" + dat + "</td>";
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
    if ($("#top" + dID)[0]) $("#top" + dID).remove();
    $("#ov_" + dID + "_msg").html("viewing <b><span id=ov_" + dID + "_sl_lbl>" + i + "</b> of <b>" + rec + " </b>results"); 
    mkSlider("ov_" + dID + "_sl", i, rec);
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
    head += "<th width=60 class=sub>RECORD</th>";
    head += "<th width=60 class=sub>ACTIVE</th>";
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
      var rt  = raw[i].d2 || "-";    
      var ac  = raw[i].d3 || "-";
      var fs  = raw[i].d4 || "-";
      var ls  = raw[i].d5 || "-";
      var bl  = raw[i].d6 || "-";

      var per = 0;
      if (sum > 0) per = parseFloat(cnt/sum*100).toFixed(2);

      // Check blacklists
      switch (bl) {
        case "-":
          var blStyle  = "style=\"color: #b5b5b5;\""; 
          var blStatus = "NO";
        break;
        default:
          var blStyle  = "style=\"color: #cc0000; font-weight:bold;\"";
          var blStatus = "<img class=indicator src=\".css/bad.png\">";
        break;
      }  

      // Is Active?
      switch (ac) {
        case "0":
          var acVal = "NO";
          var acStyle = " style=\"color:#cc0000;\"";
        break;
        case "1":
          var acVal = "YES";
          var acStyle = " style=\"color:green;\"";
        break;
        default:
          var acVal = "--";
      }

      var rID = dID + "_" + i;
      row += "<tr id=" + rID + " class=dash_row data-col=8 data-val=" + dat + ">";
      row += "<td class=row><b>" + cnt + "</b></td>";
      row += "<td class=row><b>" + per + "%</b></td>";
      row += "<td class=\"row row_filter\">" + dat + "</td>";
      row += "<td class=row>" + rt + "</td>";
      row += "<td class=row" + acStyle + ">" + acVal + "</td>";
      row += "<td class=row " + blStyle + ">" + blStatus + "</td>";
      row += "<td class=row>" + fs + "</td>";
      row += "<td class=row>" + ls + "</td>";
      row += "</tr>";
      row += "<tr><td colspan=6><div class=bars style=\"width:" + per + "%;\"></div></td></tr>";
    }
    tbl += "<table id=top_" + dID + " class=dash cellpadding=0 cellspacing=0>";
    tbl += head;
    tbl += row;
    tbl += "</table>";
    if ($("#top" + dID)[0]) $("#top" + dID).remove();
    $("#ov_" + dID + "_msg").html("viewing <b><span id=ov_" + dID + "_sl_lbl>" + i + "</b> of <b>" + rec + " </b>results"); 
    mkSlider("ov_" + dID + "_sl", i, rec);
    $("#" + dID).html(tbl);
  }

  // Sub src_ip or dst_ip query 
  function cb02(data,cbArgs,cid){
    eval("raw=" + data);
    var dID  = cid;
    var colT = cbArgs.split("||")[1];
    var tbl = '', head = '', row = ''; 
    head += "<thead><tr>";
    head += "<th width=60 class=sub1>SRC IP</th>";
    head += "<th width=60 class=sub1>DST IP</th>";
    head += "<th width=60 class=sub1>QUESTION</th>";
    head += "<th width=60 class=sub1>TIMESTAMP</th>";
    head += "</tr></thead>";         

    if (raw.length == 0) {
      row = "<tr><td class=row colspan=8>No result.</td></tr>";
    }
    for (var i=0; i<raw.length; i++) {
      var sip = raw[i].d0 || "-";
      var dip = raw[i].d1 || "-";
      var qst = raw[i].d2 || "-";    
      var ts  = raw[i].d3 || "-";

      var rID = dID + "_" + i;
      row += "<tr id=" + rID + " class=dash_row>";
      row += "<td class=row>" + sip + "</td>";
      row += "<td class=row>" + dip + "</td>";
      row += "<td class=row>" + qst + "</td>";
      row += "<td class=row>" + ts + "</td>";
      row += "</tr>";
    }
    tbl += "<table id=top_" + dID + " class=dash cellpadding=0 cellspacing=0>";
    tbl += head;
    tbl += row;
    tbl += "</table>";
    $("#sub_" + dID).append(tbl);
  }

  // Slider events
  $(".ovsl").mouseup(function() {
    var section = $(this).attr('id');
    var base    = section.split("_")[1];
    var limit   = Number($("#" + section + "_lbl").text());
    if (limit > 0) mkBox(base, limit);
  });

  //
  // Click handlers 
  //

  // Rows - object subqueries
  $(document).on('click', '.row_filter', function() {
     // Add class to clicked row, if we are already expanded then return 
     if ($('.dash_row_active')[0]) return;
     var cid = $(this).parent().attr('id');
     $("#" + cid).attr('class','dash_row_active');

     var type = $(this).data('obj');
     var question = $("#" + cid).data('val');
     var col = $("#" + cid).data('col');
     // Create the object for our dst data
     var row = "<tr><td id=sub_" + cid + " class=row_sub colspan=" + col + "></td></tr>";
     $("#" + cid).after(row);
     mkBox(type,10,question,cid);
  });

  // Rows - remove subqueries
  $(document).on('click', '.dash_row_active', function() {
    var cid = $(this).attr('id');
    $("#" + cid).attr('class','dash_row');
    $("#sub_" + cid).parent().fadeOut('fast', function() {
      $("#sub_" + cid).parent().remove();
    );
    
  });
// End
});
