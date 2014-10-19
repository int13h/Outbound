<?php
$base = dirname(__FILE__);
include_once "$base/config.php";
include_once "$base/functions.php";

$link = mysql_connect($dbHost,$dbUser,$dbPass);
$db = mysql_select_db($dbName,$link);

$type = $_REQUEST['type'];
$types = array(
                  0 => 'gbyQuestion',
                  1 => 'gbyAnswer',
                  2 => 'queryAnswer',
);

$type   = $types[$type];
$limit  = $_REQUEST['limit'];
$filter = hextostr(mysql_real_escape_string($_REQUEST['filter']));
if ($filter == 'nope') {
  $filter = '';
}

function gbyQuestion() {
    global $limit, $filter;
    $query = "SELECT COUNT(question) AS d0, 
              question AS d1,
              COUNT(DISTINCT(src_ip)) AS d2,
              COUNT(DISTINCT(dst_ip)) AS d3,
              MIN(timestamp) AS d4,
              MAX(timestamp) AS d5,
              object AS d6
              FROM questions
              LEFT JOIN listed ON question = object
              $filter
              GROUP BY d1
              ORDER BY d5 DESC";
    $result = mysql_query($query);
    $rows = array();
    $i = 0;
    $n = 0; 
    $r = mysql_num_rows($result);
    while ($row = mysql_fetch_assoc($result)) {
        $n += $row["d0"];
        $i++;
        if ($i <= $limit) $rows[] = $row; 
    }    
    $rows[] = array("n" => $n, "r" => $r); 
    $theJSON = json_encode($rows);
    echo $theJSON;
}

function gbyAnswer() {
    global $limit, $filter;
    $query = "SELECT COUNT(data) AS d0,
              data AS d1,
              record AS d2,
              active AS d3,
              created_at AS d4,
              updated_at AS d5,
              object AS d6
              FROM answers   
              LEFT JOIN listed ON data = object
              $filter
              GROUP BY d1
              ORDER BY d5 DESC";
    $result = mysql_query($query);
    $rows = array();
    $i = 0;
    $n = 0; 
    $r = mysql_num_rows($result);
    while ($row = mysql_fetch_assoc($result)) {
        $n += $row["d0"];
        $i++;
        if ($i <= $limit) $rows[] = $row; 
    }    
    $rows[] = array("n" => $n, "r" => $r); 
    $theJSON = json_encode($rows);
    echo $theJSON;
}

function queryAnswer() {
    global $limit, $filter;
    $query = "SELECT src_ip AS d0,
              dst_ip AS d1,
              question AS d2,
              timestamp AS d3,
              HEX(packet) AS d4
              FROM questions   
              WHERE question = '$filter'
              ORDER BY d3 DESC";
    $result = mysql_query($query);
    $rows = array();
    while ($row = mysql_fetch_assoc($result)) {
        $rows[] = $row;
    }    
    $theJSON = json_encode($rows);
    echo $theJSON;
}
$type();
?>
