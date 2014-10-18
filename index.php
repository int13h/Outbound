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
<script type="text/javascript" src=".js/jq.js"></script>
<script type="text/javascript" src=".js/outbound.js"></script>
<script type="text/javascript" src=".js/d3/d3.min.js"></script>
</head>
<body>

<div class=box>
  <div class=box100>
      <span class=label_a>SEARCH</span><input class=input id=search maxlength=500>
  </div>
</div>

<div class=box data-value=0>
  <div class=box_hdr id=gbyQhdr>Top Questions</div>
  <div class=box_hdr id=gbyAhdr>Top Answers</div>
  <div class=box50 id=gbyQ></div>
  <div class=box50 id=gbyA></div>
</div>

</body>
</html>
