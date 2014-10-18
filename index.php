<?php

include_once '.inc/config.php';
include_once '.inc/functions.php';

checkDB();
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<meta content="utf-8" http-equiv="encoding">
<link rel="stylesheet" type="text/css" href=".css/outbound.css" />
<link rel="stylesheet" type="text/css" href=".css/viz.css" />
<script type="text/javascript" src=".js/jq.js"></script>
<script type="text/javascript" src=".js/outbound.js"></script>
<script type="text/javascript" src=".js/d3/d3.min.js"></script>
<script type="text/javascript" src=".js/viz.js"></script>
</head>
<body>

<div class=box>
  <div class=box100>
      <span class=label_a>SEARCH</span><input class=input id=search maxlength=500 size=50>
  </div>
</div>

<div class=box data-value=0>
  <div class=box_hdr id=gbyQhdr>
    QUESTIONS
    <div id=ovestat class=ovstat></div>
    <div class=ovbi id=ov_gbyQ_msg></div>
    <div class=ovsl id=ov_gbyQ_sl></div>
    <div id=ov_gqyQ></div>
  </div>
  <div class=box50 id=gbyQ></div>

  <div class=box_hdr id=gbyAhdr>
    ANSWERS
    <div id=ovestat class=ovstat></div>
    <div class=ovbi id=ov_gbyA_msg></div>
    <div class=ovsl id=ov_gbyA_sl></div>
    <div id=ov_gqyA></div>
  </div>
  <div class=box50 id=gbyA></div>
</div>

</body>
</html>
