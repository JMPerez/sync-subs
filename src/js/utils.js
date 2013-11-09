function toTwoNumbers(number) {
  var str = number + '';
  if (str.length === 1) {
    return '0' + str;
  } else {
    return str;
  }
}

function formatTime(time) {
  //ie 0.743 => 00:00:00,743
  var milliseconds = 0,
    seconds = 0,
    minutes = 0,
    hours = 0,
    positive = time >= 0,
    remain = Math.abs(time);

  milliseconds = Math.round(remain % 1 * 1000);
  remain = remain - milliseconds / 1000;
  seconds = Math.round(remain % 60);
  remain = remain - seconds;
  minutes = Math.round((remain / 60) % 60);
  remain = remain - minutes * 60;
  hours = Math.round(remain / 3600);

  return (positive ? "" : "-") + toTwoNumbers(hours) + ':' + toTwoNumbers(minutes) + ':' + toTwoNumbers(seconds) + ',' + milliseconds;
}

var Utils = {
  formatTime: formatTime
};
module.exports = Utils;
