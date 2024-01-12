export default function uuid (n) {
  // 5 位时间（hex）+ (n-5) 位随机串
  n = n || 25;
  var suffix = ((new Date()).getTime() % 1000000).toString(16);
  if (suffix.length > 5) {
    suffix = suffix.substring(suffix.length - 5);
  } else if (suffix.length < 5) {
    suffix = (new Array(6 - suffix.length).join('0')) + suffix;
  }
  return random_string(n - 5, true) + suffix;
}

function random_string (n, case_insensitive) {
  var x = '0123456789abcdefghijklmnopqrstuvwxyz';
  var y = '';
  if (!case_insensitive) x += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = 0; i < n; i++) y += x[Math.floor(Math.random() * x.length)];
  return y;
}
