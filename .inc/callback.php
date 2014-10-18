<?php
$base = dirname(__FILE__);
include_once "$base/config.php";
include_once "$base/functions.php";

$link = mysql_connect($dbHost,$dbUser,$dbPass);
$db = mysql_select_db($dbName,$link);

$type = $_REQUEST['type'];

$types = array(
                  0 => 'gbyQuestion',  
);

$type = $types[$type];

function gbyQuestion() {
    $query = "SELECT COUNT(question) AS count, question
              FROM questions
              GROUP BY question
              ORDER BY count DESC";

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
