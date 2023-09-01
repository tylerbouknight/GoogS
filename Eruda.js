// ==UserScript==
// @name         Eruda
// @namespace    https://stay.app/
// @version      0.1
// @description  Template userscript created by Stay
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  var scriptEruda = document.createElement('script');
  scriptEruda.src = "https://cdn.jsdelivr.net/npm/eruda";
  document.body.append(scriptEruda);
  scriptEruda.onload = function () {
    var scriptErudaMonitor = document.createElement('script');
    scriptErudaMonitor.src = "https://cdn.jsdelivr.net/npm/eruda-monitor";
    document.body.append(scriptErudaMonitor);
    scriptErudaMonitor.onload = function () {
      var scriptErudaCode = document.createElement('script');
      scriptErudaCode.src = "https://cdn.jsdelivr.net/npm/eruda-code";
      document.body.append(scriptErudaCode);
      scriptErudaCode.onload = function () {
        eruda.init();
        eruda.add(erudaMonitor);
        eruda.add(erudaCode);
        eruda.hide();
      };
    };
  };
})();