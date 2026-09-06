// Shared light/dark theme toggle for skizoinvest.site.
// The CSS on every page already supports a data-theme="dark" / data-theme="light"
// override on <html> (falling back to the OS preference when absent) — this file
// only adds a visible button that sets/persists that attribute.
(function () {
  "use strict";
  var KEY = "skizo_theme"; // stores "light" or "dark"; absent = follow the OS setting

  function getStored() {
    try {
      var t = localStorage.getItem(KEY);
      return (t === "light" || t === "dark") ? t : null;
    } catch (e) { return null; }
  }

  function setStored(t) {
    try {
      if (t) localStorage.setItem(KEY, t);
      else localStorage.removeItem(KEY);
    } catch (e) { /* stockage indisponible : on continue sans mémoriser */ }
  }

  function apply(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }

  function isDarkNow() {
    var stored = getStored();
    if (stored) return stored === "dark";
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  var LABELS = {
    fr: { toDark: "Passer en mode sombre", toLight: "Passer en mode clair" },
    en: { toDark: "Switch to dark mode", toLight: "Switch to light mode" }
  };

  var refreshLabel = function () {};

  function initToggle() {
    apply(getStored());
    var btn = document.getElementById("themeToggle");
    if (!btn) return;

    function labelsFor() {
      var lang = window.SkizoI18n ? window.SkizoI18n.getLang() : "fr";
      return LABELS[lang] || LABELS.fr;
    }

    refreshLabel = function () {
      var dark = isDarkNow();
      btn.textContent = dark ? "☀️" : "🌙";
      btn.setAttribute("aria-label", dark ? labelsFor().toLight : labelsFor().toDark);
      btn.setAttribute("title", dark ? labelsFor().toLight : labelsFor().toDark);
    };

    refreshLabel();
    btn.addEventListener("click", function () {
      var next = isDarkNow() ? "light" : "dark";
      setStored(next);
      apply(next);
      refreshLabel();
    });
  }

  window.SkizoTheme = {
    getStored: getStored, setStored: setStored, apply: apply, isDarkNow: isDarkNow, initToggle: initToggle,
    // call this from a page's i18n onChange callback so the tooltip text stays in the right language
    refreshLabel: function () { refreshLabel(); }
  };
})();
