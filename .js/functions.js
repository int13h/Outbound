// Converters
function d2h(d) {
  return d.toString(16);
}

function h2d(h) {
  return parseInt(h, 16);
}

function s2h(tmp) {
  var str = '', i = 0, tmp_len = tmp.length, c;
  for (; i < tmp_len; i += 1) {
    c = tmp.charCodeAt(i);
    str += d2h(c);
  }
  return str;
}

function h2s(hex) {
  var str = ''; 
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }    
  return str;
}
