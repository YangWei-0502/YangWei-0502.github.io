(function () {
  "use strict";

  var scenes = (window.SCENES || []).filter(function (s) { return s && (s.nodes || s.layers); });
  if (!scenes.length) return;

  var stage = document.getElementById("stage");
  var chapterEl = document.getElementById("chapter");
  var counterEl = document.getElementById("counter");
  var titleEl = document.getElementById("sceneTitle");
  var captionEl = document.getElementById("caption");
  var pointsEl = document.getElementById("points");
  var dotsEl = document.getElementById("dots");
  var toggleBtn = document.getElementById("toggle");
  var prevBtn = document.getElementById("prev");
  var nextBtn = document.getElementById("next");

  var STEP = 520;        // 每张卡片入场间隔
  var POINT_GAP = 640;   // 讲解要点逐条出现间隔
  var HOLD = 1700;       // 一幕讲完停留

  var idx = 0;
  var queue = [];
  var timer = null;
  var paused = false;
  var token = null;
  var cards = [];        // {el, band}
  var arrows = [];
  var bands = [];

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clearQueue() {
    if (timer) { clearTimeout(timer); timer = null; }
    queue = [];
  }

  function enqueue(fn, gap) { queue.push({ fn: fn, gap: gap === undefined ? STEP : gap }); }

  function pump() {
    timer = null;
    if (paused) return;
    if (!queue.length) {
      if (idx < scenes.length - 1) {
        timer = setTimeout(function () { timer = null; goTo(idx + 1); }, HOLD);
      }
      return;
    }
    var item = queue.shift();
    item.fn();
    timer = setTimeout(pump, item.gap);
  }

  function tokenEl() {
    if (!token) {
      token = document.createElement("div");
      token.className = "token";
      stage.appendChild(token);
    }
    return token;
  }

  function centerOf(el) {
    var sr = stage.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    return { x: r.left - sr.left + r.width / 2, y: r.top - sr.top - 24 };
  }

  function moveToken(el) {
    var t = tokenEl();
    var p = centerOf(el);
    t.style.left = Math.round(p.x) + "px";
    t.style.top = Math.round(Math.max(0, p.y)) + "px";
    t.classList.add("show");
  }

  function setHot(list, k) {
    list.forEach(function (c, j) {
      if (c.band) {
        c.band.classList.toggle("on", j <= k);
        c.el.classList.toggle("hot", j === k);
      } else {
        c.el.classList.toggle("hot", j === k);
      }
    });
  }

  function resetStage(cls) {
    stage.textContent = "";
    stage.className = "stage" + (cls ? " " + cls : "");
    token = null;
    cards = [];
    arrows = [];
    bands = [];
  }

  function rowsFor(n) {
    if (n <= 4) return [n];
    if (n === 5) return [3, 2];
    if (n === 6) return [3, 3];
    if (n === 7) return [4, 3];
    if (n === 8) return [4, 4];
    return [n];
  }

  function buildFlow(scene) {
    resetStage("flow");
    var nodes = scene.nodes || [];
    var rows = rowsFor(nodes.length);
    var k = 0;
    rows.forEach(function (count) {
      if (!count) return;
      var row = document.createElement("div");
      row.className = "flow-row";
      var prev = null;
      for (var j = 0; j < count && k < nodes.length; j++) {
        var a = null;
        if (j > 0) {
          a = document.createElement("span");
          a.className = "arrow";
          a.textContent = "→";
          row.appendChild(a);
          arrows.push(a);
        }
        var n = nodes[k];
        var c = document.createElement("div");
        c.className = "node tone-" + (n.tone || "actor");
        var l = document.createElement("span");
        l.className = "label";
        l.textContent = n.label;
        c.appendChild(l);
        if (n.sub) {
          var s = document.createElement("span");
          s.className = "sub";
          s.textContent = n.sub;
          c.appendChild(s);
        }
        row.appendChild(c);
        if (a) { a._l = prev; a._r = c; }
        cards.push({ el: c, band: null, pre: a });
        prev = c;
        k++;
      }
      stage.appendChild(row);
    });
  }

  function buildLayers(scene) {
    resetStage("layers");
    (scene.layers || []).forEach(function (b) {
      var band = document.createElement("div");
      band.className = "band";
      var inner = document.createElement("div");
      inner.className = "band-inner";
      var name = document.createElement("div");
      name.className = "band-name";
      name.textContent = b.name;
      var chips = document.createElement("div");
      chips.className = "band-chips";
      inner.appendChild(name);
      inner.appendChild(chips);
      band.appendChild(inner);
      stage.appendChild(band);
      bands.push(band);

      (b.chips || []).forEach(function (c) {
        var el = document.createElement("div");
        el.className = "chip tone-" + (c.tone || "actor");
        var l = document.createElement("span");
        l.className = "label";
        l.textContent = c.label;
        el.appendChild(l);
        if (c.sub) {
          var s = document.createElement("span");
          s.className = "sub";
          s.textContent = c.sub;
          el.appendChild(s);
        }
        chips.appendChild(el);
        cards.push({ el: el, band: band });
      });
    });
  }

  function renderScene(i) {
    idx = i;
    var sc = scenes[i];
    chapterEl.textContent = sc.chapter || "";
    counterEl.textContent = "第 " + (i + 1) + " / " + scenes.length + " 幕";
    titleEl.textContent = sc.title || "";
    captionEl.textContent = sc.narration || "";
    captionEl.classList.add("in");
    pointsEl.textContent = "";

    if (sc.layers && sc.layers.length) buildLayers(sc); else buildFlow(sc);

    var pointEls = (sc.points || []).map(function (p) {
      var li = document.createElement("li");
      li.textContent = p;
      pointsEl.appendChild(li);
      return li;
    });

    queue = [];
    cards.forEach(function (c, k) {
      enqueue(function () {
        if (c.band) {
          c.band.classList.add("in");
          setHot(cards, k);
        }
        c.el.classList.add("in");
        if (!c.band) setHot(cards, k);
        moveToken(c.el);
        if (c.pre) c.pre.classList.add("in");
      }, STEP);
    });
    pointEls.forEach(function (li) {
      enqueue(function () { li.classList.add("in"); }, POINT_GAP);
    });

    dotsEl.querySelectorAll(".dot").forEach(function (d, j) {
      d.classList.toggle("on", j === i);
    });
    fixArrows();
  }

  function goTo(i) {
    if (i < 0 || i >= scenes.length) return;
    clearQueue();
    renderScene(i);
    if (!paused && !reduceMotion) pump();
  }

  function renderStatic(i) {
    idx = i;
    var sc = scenes[i];
    chapterEl.textContent = sc.chapter || "";
    counterEl.textContent = "第 " + (i + 1) + " / " + scenes.length + " 幕";
    titleEl.textContent = sc.title || "";
    captionEl.textContent = sc.narration || "";
    captionEl.classList.add("in");
    pointsEl.textContent = "";
    if (sc.layers && sc.layers.length) buildLayers(sc); else buildFlow(sc);
    cards.forEach(function (c) {
      if (c.band) { c.band.classList.add("in"); c.band.classList.add("on"); }
      c.el.classList.add("in");
      if (c.pre) c.pre.classList.add("in");
    });
    (sc.points || []).forEach(function (p) {
      var li = document.createElement("li");
      li.className = "in";
      li.textContent = p;
      pointsEl.appendChild(li);
    });
    dotsEl.querySelectorAll(".dot").forEach(function (d, j) {
      d.classList.toggle("on", j === i);
    });
    fixArrows();
  }

  function fixArrows() {
    arrows.forEach(function (a) {
      var left = a._l;
      var right = a._r;
      if (!left || !right) return;
      if (Math.abs(left.getBoundingClientRect().top - right.getBoundingClientRect().top) > 6) {
        a.style.display = "none";
      } else {
        a.style.display = "";
      }
    });
  }

  function buildDots() {
    dotsEl.textContent = "";
    scenes.forEach(function (s, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "dot";
      d.title = (s.chapter ? s.chapter + " · " : "") + (s.title || "");
      d.setAttribute("aria-label", d.title);
      d.addEventListener("click", function () { paused = false; setToggle(); goTo(i); });
      dotsEl.appendChild(d);
    });
  }

  function setToggle() {
    toggleBtn.textContent = paused ? "继续播放" : "暂停";
  }

  toggleBtn.addEventListener("click", function () {
    paused = !paused;
    setToggle();
    if (paused) {
      if (timer) { clearTimeout(timer); timer = null; }
    } else {
      pump();
    }
  });
  prevBtn.addEventListener("click", function () { paused = false; setToggle(); goTo(idx - 1 < 0 ? 0 : idx - 1); });
  nextBtn.addEventListener("click", function () {
    paused = false; setToggle();
    if (idx >= scenes.length - 1) { goTo(0); return; }
    goTo(idx + 1);
  });

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fixArrows, 120);
  });

  var startAt = 0;
  try {
    var q = new URLSearchParams(window.location.search).get("s");
    if (q !== null && q !== "") {
      var n = parseInt(q, 10);
      if (!isNaN(n) && n >= 0 && n < scenes.length) startAt = n;
    }
  } catch (e) { startAt = 0; }

  buildDots();
  setToggle();
  if (reduceMotion) {
    paused = true;
    setToggle();
    renderStatic(startAt);
  } else {
    goTo(startAt);
  }
})();
