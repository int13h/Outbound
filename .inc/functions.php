<?php

function retAv($x) {
    $y = array_sum($x);
    if ($y > 0) {
        $answer = $y / count($x);
        return $answer;
    }
    return 0;
}

function ret95($x) {
    sort($x);
    $answer = $x[round((95/100) * count($x) - .5)];
    return $answer;
}

function retND($x) {
    $x_std = stats_standard_deviation($x);
    $x_av = retAv($x);
    $answer = (array_sum($x) - $x_av) / $x_std;
    return $answer;
}

function retSD($x) {
    $answer = stats_standard_deviation($x);
    return $answer;
}

function checkDB() {
    if (file_exists('.inc/config.php')) {
        global $dbHost,$dbName,$dbUser,$dbPass;
        $link = mysql_connect($dbHost,$dbUser,$dbPass);

        if (!$link) {
            die('Connection failed: ' . mysql_error());
        }

        $db = mysql_select_db($dbName,$link);

        if (!$db) {
            die('Database selection failed: ' . mysql_error());
        }

    } else {
        echo "<center>
              <b>Configuration file not found</b><br>
              Edit 'config.php.sample' to taste and then rename it to 'config.php'
              </center>";
        die();
    }

}

function hextostr($x) {
  $s='';
  foreach(explode("\n",trim(chunk_split($x,2))) as $h) $s.=chr(hexdec($h));
  return($s);
}

function strtohex($x) {
  $s='';
  foreach(str_split($x) as $c) $s.=sprintf("%02X",ord($c));
  return($s);
} 
?>
