module.exports = (function () {
  'use strict';

  function hourAngle(hour, minute) {
    return (hour % 12) * 30 + minute * 0.5 - 90;
  }

  function minuteAngle(minute) {
    return minute * 6 - 90;
  }

  function polar(cx, cy, len, deg) {
    var rad = deg * Math.PI / 180;
    return {
      x: cx + len * Math.cos(rad),
      y: cy + len * Math.sin(rad)
    };
  }

  function renderSvg(hour, minute, size) {
    size = size || 180;
    var cx = size / 2;
    var cy = size / 2;
    var r = size / 2 - 10;
    var ha = hourAngle(hour, minute);
    var ma = minuteAngle(minute);
    var hEnd = polar(cx, cy, r * 0.48, ha);
    var mEnd = polar(cx, cy, r * 0.68, ma);
    var html = '<svg class="clock-svg" viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '">';
    html += '<circle class="clock-face-bg" cx="' + cx + '" cy="' + cy + '" r="' + r + '"/>';
    var n;
    for (n = 1; n <= 12; n++) {
      var pos = polar(cx, cy, r - 16, n * 30 - 90);
      html += '<text class="clock-num" x="' + pos.x + '" y="' + (pos.y + 5) + '" text-anchor="middle">' + n + '</text>';
    }
    html += '<line class="clock-hand-minute" x1="' + cx + '" y1="' + cy + '" x2="' + mEnd.x + '" y2="' + mEnd.y + '"/>';
    html += '<line class="clock-hand-hour" x1="' + cx + '" y1="' + cy + '" x2="' + hEnd.x + '" y2="' + hEnd.y + '"/>';
    html += '<circle class="clock-center" cx="' + cx + '" cy="' + cy + '" r="4"/>';
    html += '</svg>';
    return html;
  }

  function renderHtml(clock) {
    if (!clock) return '';
    return '<div class="clock-visual-wrap">' +
      renderSvg(clock.hour, clock.minute) +
      '</div>';
  }

  function flattenForWx(clock) {
    if (!clock) return { show: false };
    return {
      show: true,
      hour: clock.hour,
      minute: clock.minute,
      hourDeg: hourAngle(clock.hour, clock.minute) + 90,
      minuteDeg: minuteAngle(clock.minute) + 90
    };
  }

  return {
    renderHtml: renderHtml,
    renderSvg: renderSvg,
    flattenForWx: flattenForWx,
    hourAngle: hourAngle,
    minuteAngle: minuteAngle
  };
})();


