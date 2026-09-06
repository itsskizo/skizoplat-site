// Shared FR/EN language toggle mechanics for skizoinvest.site.
// Each page defines its own dictionary (I18N = { fr: {...}, en: {...} }) and calls
// SkizoI18n.initToggle(I18N, onChange) once its DOM is ready.
(function () {
  "use strict";
  var KEY = "skizo_lang";

  function getLang() {
    try {
      var l = localStorage.getItem(KEY);
      return (l === "en" || l === "fr") ? l : "fr";
    } catch (e) { return "fr"; }
  }

  function setLang(l) {
    try { localStorage.setItem(KEY, l); } catch (e) { /* stockage indisponible : on continue sans mémoriser */ }
  }

  function applyDom(dict, lang) {
    var d = dict[lang] || dict.fr;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (d[key] !== undefined) el.textContent = d[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (d[key] !== undefined) el.innerHTML = d[key];
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (d[key] !== undefined) el.setAttribute("title", d[key]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (d[key] !== undefined) el.setAttribute("aria-label", d[key]);
    });
    document.documentElement.lang = lang;
  }

  function initToggle(dict, onChange) {
    var lang = getLang();
    applyDom(dict, lang);
    var toggle = document.getElementById("langToggle");
    if (toggle) {
      var btns = Array.prototype.slice.call(toggle.querySelectorAll("button"));
      btns.forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
        b.addEventListener("click", function () {
          var newLang = b.getAttribute("data-lang");
          if (newLang === getLang()) return;
          setLang(newLang);
          btns.forEach(function (bb) { bb.setAttribute("aria-pressed", bb.getAttribute("data-lang") === newLang ? "true" : "false"); });
          applyDom(dict, newLang);
          if (typeof onChange === "function") onChange(newLang);
        });
      });
    }
    if (typeof onChange === "function") onChange(lang);
  }

  window.SkizoI18n = { getLang: getLang, setLang: setLang, applyDom: applyDom, initToggle: initToggle };
})();
