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
);

$limit = 10;
$type = $types[$type];

function gbyQuestion() {
    global $limit;
    $query = "SELECT COUNT(question) AS d0, 
              question AS d1,
              COUNT(DISTINCT(src_ip)) AS d2,
              COUNT(DISTINCT(dst_ip)) AS d3,
              MIN(timestamp) AS d4,
              MAX(timestamp) AS d5
              FROM questions
              GROUP BY d1
              ORDER BY d0 DESC";
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
    global $limit;
    $query = "SELECT COUNT(data) AS d0, data AS d1
              FROM answers
              GROUP BY d1
              ORDER BY d0 DESC";
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

$type();
?>
