var Riot = Riot || {};
"object" === typeof Riot &&
  (function () {
    var j = window,
      l = document,
      c = j.localStorage,
      e = (Riot.DDragon = {
        mu: "http://ddragonqa.riotgames.com/realms/na.js",
        it: 0,
        fixed: "fixed",
        langInterface: {
          ar: "ar_AE",
          bg: "bg_BG",
          cs: "cs_CZ",
          de: "de_DE",
          el: "el_GR",
          en: "en_US",
          es: "es_ES",
          fr: "fr_FR",
          hu: "hu_HU",
          id: "id_ID",
          it: "it_IT",
          ja: "ja_JP",
          ko: "ko_KR",
          nl: "nl_NL",
          pl: "pl_PL",
          pt: "pt_BR",
          ro: "ro_RO",
          ru: "ru_RU",
          th: "th_TH",
          tr: "tr_TR",
          vi: "vi_VN",
          zh: "zh_CN",
        },
        jsonp: function (a, b) {
          var f = l.createElement("script");
          f.setAttribute("type", "text/javascript");
          f.setAttribute("async", "async");
          f.setAttribute("src", a);
          if ("function" == typeof b)
            f.onload =
              "object" === typeof j.onload &&
              "object" === typeof j.onreadystatechange
                ? b
                : (f.onreadystatechange = b);
          f && l.body.appendChild(f);
        },
        xhr: {
          ready: !0,
          getHTTPObject: function () {
            var a = !1;
            if ("undefined" !== typeof ActiveXObject)
              try {
                a = new ActiveXObject("Msxml2.XMLHTTP");
              } catch (b) {
                try {
                  a = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (f) {
                  a = !1;
                }
              }
            else if (j.XMLHttpRequest)
              try {
                a = new XMLHttpRequest();
              } catch (d) {
                a = !1;
              }
            return a;
          },
          load: function (a, b, f) {
            if (e.xhr.ready) {
              var d = this.init();
              if (d && a) {
                try {
                  d.open("GET", a, !0);
                } catch (h) {
                  e.xhr.ready = !1;
                  e.jsonp(a, f);
                  return;
                }
                d.onreadystatechange = function () {
                  var h = "";
                  if (4 === d.readyState && e.xhr.ready)
                    switch (d.status) {
                      case 200:
                      case 304:
                        if (d.responseText) h = d.responseText;
                        b(h);
                        break;
                      default:
                        (e.xhr.ready = !1), e.jsonp(a, f);
                    }
                };
                d.send(null);
              }
            } else e.jsonp(a, f);
          },
          init: function () {
            return this.getHTTPObject();
          },
        },
        app: [],
        addApp: function (a, b) {
          e.app.push({ app: b, ms: a || [] });
        },
        mps: {},
        amp: function (a, b) {
          e.mps[a] ? e.mps[a].push(b) : (e.mps[a] = [b]);
        },
        addModelParser: function (a, b) {
          e.amp(a, b);
        },
        ddf: "/js/dragonmagic.pure.js",
      });
    if ("string" === typeof j.rg_force_manifest) e.mu = j.rg_force_manifest;
    if ("boolean" == typeof j.rg_force_jsonp) e.xhr.ready = !j.rg_force_jsonp;
    "object" === typeof j.rg_force_manifest_object
      ? (e.m = j.rg_force_manifest_object)
      : e.jsonp(e.mu, function () {
          if ("object" === typeof e.m) {
            var a = e,
              b;
            try {
              c.setItem("modernizr", "modernizr"),
                c.removeItem("modernizr"),
                (b = !0);
            } catch (f) {
              b = !1;
            }
            a.ls = b;
            if ("string" === typeof j.rg_force_language) {
              if (-1 === j.rg_force_language.indexOf("_"))
                j.rg_force_language = e.langInterface[j.rg_force_language];
              e.m.l = j.rg_force_language + "/";
            } else e.m.l += "/";
            e.m.cdn =
              "string" === typeof j.rg_force_cdn
                ? j.rg_force_cdn + "/"
                : e.m.cdn + "/";
            e.fn.init();
          }
        });
  })();
Riot.DDragon.fn = {};
Riot.DDragon.dataTypes = "item,champion,mastery,rune,summoner,language".split(
  ","
);
(function () {
  function j(a, d) {
    switch (d) {
      default:
      case "normal":
        return a;
      case "small":
        return parseInt(0.75 * a);
      case "tiny":
        return parseInt(0.5 * a);
    }
  }
  function l(a) {
    var d = !0,
      b,
      e,
      a =
        a ||
        c(
          ((this.ownerDocument || this.document || this).parentWindow || window)
            .event
        );
    b = this.events[a.type];
    for (e in b)
      if (b.hasOwnProperty(e) && "function" === typeof b[e])
        (this.$$handleEvent = b[e]), !1 === this.$$handleEvent(a) && (d = !1);
    return d;
  }
  function c(a) {
    a.preventDefault = c.preventDefault;
    a.stopPropagation = c.stopPropagation;
    c.windowTarget = !0;
    return a;
  }
  var e = Riot.DDragon,
    a = e.fn;
  a.isArray = function (a) {
    return "[object Array]" === Object.prototype.toString.call(a);
  };
  a.getJSON = function (a, d) {
    if (e.xhr.ready)
      e.xhr.load(a, function (a) {
        d(JSON.parse(a));
      });
    else {
      var b = /([A-Za-z0-9]+)\.json/.exec(a);
      window["rg_data_callback_" + b[1]] = function (a) {
        d(a);
      };
      e.jsonp(a + "p");
    }
  };
  a.getCSS = function (f) {
    var d = document.createElement("link");
    d.rel = "stylesheet";
    d.type = "text/css";
    d.href = f;
    a.$("head", !0)[0].appendChild(d);
  };
  a.rebase = function (f) {
    for (var d = 0, b = arguments.length, c, e, k; ++d < b; )
      for (e in ((c = arguments[d]), c))
        c.hasOwnProperty(e) &&
          ((k = typeof c[e]),
          "undefined" === typeof f[e]
            ? "object" === k
              ? a.rebase((f[e] = a.isArray(c[e]) ? [] : {}), c[e])
              : (f[e] = c[e])
            : "object" === k &&
              "function" !== typeof f[e] &&
              a.rebase(f[e], c[e]));
    return f;
  };
  a.objectDig = function (a, d) {
    var b, c;
    if ("undefined" === typeof a || "undefined" === typeof d) return null;
    if (-1 !== d.indexOf(".")) {
      d = d.split(".");
      for (b = 0, c = d.length; b < c; b++) {
        if ("undefined" === typeof a[d[b]]) return null;
        a = a[d[b]];
      }
      return a;
    }
    return a[d];
  };
  a.sMath = function (a, d, b) {
    switch (d) {
      case "=":
      case "==":
      case "===":
        return a == b;
      case "!=":
      case "!==":
        return a != b;
      case ">":
        return a > b;
      case "<":
        return a < b;
      case ">=":
        return a >= b;
      case "<=":
        return a <= b;
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "/":
        return a / b;
      case "*":
        return a * b;
      case "%":
        return a % b;
      case "->":
        return -1 !== a.indexOf(b);
      default:
        return !1;
    }
  };
  a.mkDiv = function (a) {
    var d = document.createElement("div"),
      b,
      c;
    if ("object" === typeof a) {
      if ("string" === typeof a.classes) d.className = a.classes;
      if ("string" === typeof a.style) d.style.cssText = a.style;
      "undefined" !== typeof a.append && a.append.appendChild(d);
      if ("object" === typeof a.data)
        for (b = 0, c = a.data.length; b < c; b++)
          d.setAttribute("data-" + a.data[b].k, a.data[b].v);
    }
    return d;
  };
  a.rmDiv = function (a) {
    a.parentNode.removeChild(a);
  };
  a.hasWord = function (a, d) {
    return RegExp("(?:^|\\s)" + d + "(?!\\S)", "g").test(a);
  };
  a.removeWord = function (a, d) {
    return a.replace(RegExp("(?:^|\\s)" + d + "(?!\\S)", "g"), "");
  };
  a.hasValue = function (a, d) {
    var b;
    return (b = RegExp("(?:^|\\s)" + d + "=([^\\s\\t\\n]*)(?!\\S)").exec(a))
      ? b[1]
      : !1;
  };
  a.removeValue = function (a, d) {
    return a.replace(
      RegExp("(?:^|\\s)" + d + "=([^\\s\\t\\n]*)(?!\\S)", "g"),
      ""
    );
  };
  a.hasClass = function (f, d) {
    return a.hasWord(f.className, d);
  };
  a.addClass = function (a, d) {
    a.className += " " + d;
  };
  a.removeClass = function (f, d) {
    f.className = a.removeWord(f.className, d);
  };
  a.radioClass = function (f, d) {
    for (var b = f.parentNode.childNodes, c = b.length; c--; )
      b[c].className && a.removeClass(b[c], d);
    a.addClass(f, d);
  };
  a.deadChildren = function (a) {
    if (a.hasChildNodes()) {
      var a = a.childNodes,
        d = [],
        b,
        c;
      for (b = 0, c = a.length; b < c; b += 1) d.push(a[b]);
      return d;
    }
    return [];
  };
  var b = /{{ (.+?) }}/;
  a.format = function (f, d) {
    a.isArray(f) && (f = f.join(""));
    for (var c; (c = b.exec(f)); ) f = f.replace(b, a.objectDig(d, c[1]));
    return f;
  };
  a.each = function (f, d) {
    if (a.isArray(f))
      for (var b = 0, c = f.length; b < c && !(!1 === d(f[b], b)); b += 1);
    else d(f, 0);
  };
  a.rgData = function (a, d) {
    var b = a.getAttribute("data-rg-" + d);
    return null === b || "" === b ? !1 : b;
  };
  a.rgInfo = function (b, d) {
    for (var c; d; ) {
      try {
        b.getAttribute("data");
      } catch (e) {
        return !1;
      }
      c = {
        name: a.rgData(b, "name"),
        id: a.rgData(b, "id"),
        aux: a.rgData(b, "aux"),
      };
      c = !1 === c.name && !1 === c.id && !1 === c.aux ? !1 : c;
      if (!1 !== c) break;
      if (--d) b = b.parentNode;
    }
    return c;
  };
  a.makeTest = function (b) {
    var d;
    if ("" == b) return !0;
    if (
      (d =
        /^(\!?)([a-zA-Z][a-zA-Z0-9\.]*)(\->|\*=|\^=|\$=|===|==|=|<=|<|>=|>|\+|\-|\*|\/|%)?([^\|]*)?(\|.+)?$/.exec(
          b
        ))
    ) {
      b = { key: d[2], inv: "!" === d[1] };
      if ("undefined" === typeof d[3]) b.det = 1;
      else {
        "undefined" === typeof d[4] && (d[4] = "");
        try {
          switch (d[3]) {
            case "*=":
              b.det = 2;
              b.reg = RegExp(d[4], "i");
              break;
            case "^=":
              b.det = 2;
              b.reg = RegExp("^" + d[4], "i");
              break;
            case "$=":
              b.det = 2;
              b.reg = RegExp(d[4] + "$", "i");
              break;
            case "->":
              b.det = 3;
              b.evOp = "->";
              b.evVs = d[4];
              break;
            default:
              (b.det = 3),
                (b.evOp = d[3]),
                (b.evVs =
                  /[^0-9\.]/.test(d[4]) || "" === d[4]
                    ? d[4]
                    : parseFloat(d[4]));
          }
        } catch (c) {
          b = !1;
        }
      }
      if (d[5]) b.or = a.makeTest(d[5].substring(1));
      return b;
    }
    return /^\s+$/.test(b) ? !0 : !1;
  };
  a.runTest = function (b, d) {
    function c(e) {
      d.inv && (e = !e);
      return d.or && !1 === e ? e || a.runTest(b, d.or) : e;
    }
    if ("boolean" === typeof d) return d;
    var e = a.objectDig(b, d.key);
    if (null === e) return c(!1);
    try {
      switch (d.det) {
        case 1:
          return c(!0);
        case 2:
          return c(d.reg.test(e));
        case 3:
          return c(a.sMath(e, d.evOp, d.evVs));
      }
    } catch (g) {}
    return c(!1);
  };
  a.getImg = function (b, d) {
    if (!b.image) return '<span data-rg-error="getImg(' + b.id + ')"></span>';
    var c = b.image,
      i = {
        src: "sprite",
        path: "",
        version: "",
        group: "",
        cap: "",
        wrap: 2,
        classes: "",
        attrs: "",
        skin: 0,
        gray: !1,
        size: "normal",
      },
      g = "",
      k = "",
      d = "object" !== typeof d ? i : a.rebase(d, i);
    "string" === typeof b.version
      ? (d.version = b.version + "/")
      : "" !== d.version && (d.version += "/");
    switch (d.src) {
      case "sprite":
        d.group = "sprite";
        d.cap = c.sprite;
        0 < d.wrap &&
          ((g =
            "height:" +
            j(c.h, d.size) +
            "px; width:" +
            j(c.w, d.size) +
            "px; background: url('"),
          (k =
            "') -" +
            j(c.x, d.size) +
            "px -" +
            j(c.y, d.size) +
            "px no-repeat;"),
          1 < d.wrap &&
            ((g = '<div class="img ' + d.classes + '" style="' + g),
            (k = k + '" ' + d.attrs + "></div>")));
        break;
      case "full":
        d.group = c.group;
        d.cap = c.full;
        1 < d.wrap &&
          ((g = '<img class="' + d.classes + '" src="'),
          (k = '" ' + d.attrs + " />"));
        break;
      case "loading":
        d.group = c.group + "/loading";
      case "splash":
        if ("" === d.group) d.group = c.group + "/splash";
        d.version = "";
        d.cap = b.id + "_" + d.skin + ".jpg";
        1 < d.wrap &&
          ((g = '<img class="' + d.classes + '" src="'),
          (k = '" ' + d.attrs + " />"));
    }
    if (d.gray) d.cap = "gray_" + d.cap;
    if ("normal" !== d.size) d.cap = d.size + "_" + d.cap;
    return (
      g + e.m.cdn + d.version + "img/" + d.path + d.group + "/" + d.cap + k
    );
  };
  a.getElementsByClassName = (function () {
    var b = document.getElementsByTagName("body")[0];
    return document.getElementsByClassName
      ? function (a, c) {
          c = c || b;
          return c.getElementsByClassName(a);
        }
      : function (d, c) {
          var c = c || b,
            e = c.getElementsByTagName("*"),
            g,
            k,
            j,
            l = [];
          for (g = 0, k = e.length; g < k; ++g)
            (j = e[g]), a.hasClass(j, d) && l.push(j);
          return l;
        };
  })();
  e.fn$data = {};
  e.fn$serve = function (b, d) {
    var d = d || document,
      c;
    switch (b.charAt(0)) {
      case "#":
        return (c = d.getElementById(b.substring(1))), null === c ? [] : [c];
      case ".":
        return a.getElementsByClassName(b.substring(1), d);
      default:
        return d.getElementsByTagName(b);
    }
  };
  a.$ = function (a, b) {
    var c;
    b && (c = e.fn$data[a]);
    "undefined" === typeof c && ((c = e.fn$serve(a)), b && (e.fn$data[a] = c));
    return c;
  };
  a.er = function (a, b, c) {
    b = "ERROR: " + c + " at [ddragon." + b + "]";
    "undefined" !== typeof console &&
      "undefined" !== typeof console.log &&
      console.log(b);
    setTimeout(function () {
      throw a;
    }, 1);
    return "<p><b>" + b + "</b></p>";
  };
  a.addEvent = function (b, d, e) {
    function i(a) {
      var b = {
        target: c.windowTarget ? a.srcElement : a.target,
        event: a,
        type: d,
        button: !1,
        buttonRestrict: -1,
      };
      if ("mousedown" === d || "mouseup" === d)
        b.button = c.buttonData[a.button];
      e.call(this, b);
    }
    "string" === typeof b && (b = a.$(b)[0]);
    if (!b.events) b.events = {};
    b.events[d] = b.events[d] || { handles: [] };
    b.events[d].handles.push(i);
    if (b.addEventListener) b.addEventListener(d, i, !1);
    else {
      if (!i.$$guid) i.$$guid = a.addEvent.guid++;
      b.events[d][i.$$guid] = i;
      b["on" + d] = l;
    }
    return i;
  };
  a.addEvent.guid = 1;
  a.removeEvent = function (b, d, c) {
    if (c)
      b.removeEventListener
        ? b.removeEventListener(d, c, !1)
        : b.events && b.events[d] && delete b.events[d][c.$$guid];
    else if (b.events && b.events[d])
      for (; (c = b.events[d].handles.pop()); ) a.removeEvent(b, d, c);
  };
  c.windowTarget = !1;
  c.preventDefault = function () {
    this.returnValue = !1;
  };
  c.stopPropagation = function () {
    this.cancelBubble = !0;
  };
  c.buttonData = window.addEventListener ? [0, 0, 2, 0, 1] : [-1, 0, 1, 2];
  a.watch = function (b, d, c) {
    a.addEvent(b, "focus", function (b) {
      function f() {
        var b = a.objectDig(f.target, f.dig);
        if (b !== f.store) c(f.target, b, f.store), (f.store = b);
        f.timer = setTimeout(f, 32);
      }
      function e() {
        clearTimeout(f.timer);
        a.removeEvent(b.target, "blur", e);
      }
      f.target = b.target;
      f.dig = d;
      f.timer = setTimeout(f, 32);
      f.store = !1;
      a.addEvent(b.target, "blur", e);
    });
  };
  a.fire = {
    data: {},
    plan: function (b, d, c) {
      "object" !== typeof a.fire.data[b] && (a.fire.data[b] = []);
      return a.fire.data[b].push({ planData: d, callback: c }) - 1;
    },
    scrap: function (b, d) {
      "object" === typeof a.fire.data[b] && a.fire.data[b].splice(d, 1);
    },
    exec: function (b, d) {
      if ("object" === typeof a.fire.data[b]) {
        var c;
        for (c = 0; c < a.fire.data[b].length; c++)
          a.fire.data[b][c].callback(a.fire.data[b][c].planData, d, c);
      }
    },
  };
})();
Riot.DDragon.fn.init = function (j) {
  var l = window,
    c = Riot.DDragon,
    e = c.fn;
  if (0 < arguments.length) c.fn$serve = j;
  c.models = {};
  c.modelParsers = {
    champion: [
      function (a) {
        if ("undefined" === typeof a.loadedPartial) {
          a.stats.attackspeed = e.calcAspd(
            1,
            a.stats.attackspeedoffset,
            a.stats.attackspeedperlevel
          );
          for (
            var b = "armor,attackdamage,hp,hpregen,mp,mpregen,spellblock".split(
                ","
              ),
              c,
              d,
              h;
            (c = b.pop());

          )
            (d = 1e3 * a.stats[c]),
              (h = 1e3 * a.stats[c + "perlevel"]),
              (a.stats["l1" + c] = (d + h) / 1e3);
          a.loadedPartial = !0;
        }
        if (a.loadedFull)
          for (b = a.spells.length; b--; ) a.spells[b].version = a.version;
      },
    ],
  };
  c.addModelParser("profileicon", function () {
    this.remapFunc = function (a) {
      var b = parseInt(a, 10);
      return b > c.m.profileiconmax && 500 > b ? "0" : a;
    };
  });
  c.model = function (a, b, f) {
    var d = this;
    this.init = !1;
    this.loading = { all: !1 };
    this.keysLoaded = this.override = !1;
    this.name = a;
    this.translated = !1;
    this.format = "all";
    this.type = "Full" === a.substr(-4, 4) ? a.substr(0, a.length - 4) : a;
    this.version = "string" === typeof b ? b : c.m.n[this.type];
    this.remapFunc = function (a) {
      return this.remapKeys[a];
    };
    this.lsKey =
      "rg_data_" + c.m.l + "_" + a + (this.override ? "_" + this.version : "");
    this.source = c.m.cdn + this.version + "/data/" + c.m.l + a;
    if ("string" === typeof f) this.loadAll(f);
    else if (!this.init && !this.loading.all)
      (this.loading.all = !0),
        e.getJSON(this.source + ".json", function (a) {
          d.loadAll(a);
          d.init &&
            (d.makeKeys(d.data), e.fire.exec("model", { name: d.name }));
          d.loading.all = !1;
        });
  };
  c.model.prototype.rename = function (a) {
    this.name = a;
    return this;
  };
  c.model.prototype.makeKeys = function (a) {
    this.keys = [];
    this.remapKeys = {};
    for (var b in a)
      a.hasOwnProperty(b) &&
        (a[b].key && (this.remapKeys[a[b].key] = b), this.keys.push(b));
    this.keysLoaded = !0;
  };
  c.model.prototype.loadAll = function (a) {
    "string" === typeof a && (a = JSON.parse(a));
    if (a.version === this.version)
      (this.data = a.data),
        (this.keys = a.keys),
        (this.init = !0),
        (this.basic = "undefined" !== typeof a.basic ? a.basic : !1),
        (this.tree = "undefined" !== typeof a.tree ? a.tree : {}),
        (this.format = "undefined" !== typeof a.format ? a.format : "all"),
        this.runFullParsers();
  };
  c.model.prototype.runFullParsers = function () {
    if (c.mps[this.type]) {
      var a = this;
      e.each(c.mps[this.type], function (b) {
        b.call(a);
      });
    }
  };
  c.addModelParser = function (a, b) {
    c.amp(a, b);
    for (model in c.models)
      c.models.hasOwnProperty(model) && model.type === a && b.call(model);
  };
  c.model.prototype.loadSingle = function (a) {
    "standAloneComplex" === this.format &&
      ("string" === typeof a && (a = JSON.parse(a)),
      e.rebase(this.data, a.data));
  };
  c.model.prototype.parseData = function (a) {
    var b = this.data[a];
    if (!b.parsed || !this.translate) {
      if (!b.parsed) {
        "object" === typeof this.basic && (b = e.rebase(b, this.basic));
        if ("undefined" !== typeof c.modelParsers[this.type]) {
          var f, d;
          for (f = 0, d = c.modelParsers[this.type].length; f < d; ++f)
            c.modelParsers[this.type][f].call(this, b);
        }
        "standAloneComplex" === this.format
          ? b.loadedFull
            ? (b.parsed = !0)
            : (b.loadedFull = !1)
          : (b.parsed = !0);
        b.id = a;
      }
      this.translate = c.useModel("language").init;
      if ("string" === typeof b.name) {
        b.searchName = e.tFilter(b.name);
        b.searchHash = {};
        b.searchRaw = "";
        b.searchString = "";
        a = b.searchName.split(" ");
        for (f = 0, d = a.length; f < d; ++f)
          (b.searchHash[a[f]] = !0),
            (b.searchRaw += ";" + a[f]),
            (b.searchString += ";" + a[f]);
        b.colloq && (b.searchString += b.colloq);
        if (b.tags)
          for (f = 0, d = b.tags.length; f < d; ++f) {
            b.searchHash[b.tags[f]] = !0;
            b.searchRaw += ";" + b.tags[f];
            var a = "colloq_" + b.tags[f],
              h = e.t(a);
            h === a && (h = "");
            b.searchString += ";" + e.tFilter(e.t(b.tags[f])) + h;
          }
      }
    }
  };
  c.model.prototype.parseAllData = function () {
    if (!this.parsed && this.init) {
      var a, b;
      for (a = 0, b = this.keys.length; a < b; ++a) this.get(this.keys[a]);
      this.parsed = !0;
    }
  };
  c.model.prototype.get = function (a, b, c) {
    var b = b || !1,
      d = this;
    b && (a = this.remapFunc.call(this, a));
    if (this.init) {
      var h = this.data[a];
      if ("object" === typeof h)
        return (
          this.parseData(a), "undefined" !== typeof c && c.call(this, h), h
        );
      if ("string" === typeof h)
        return "undefined" !== typeof c && c.call(this, h), h;
    } else
      "undefined" !== typeof c &&
        e.fire.plan("model", { name: type }, function (h, g, k) {
          g.name === h.name &&
            (e.fire.scrap("model", k), c.call(d, d.get(a, b)));
        });
    return { _action: "get", _name: this.name, id: a };
  };
  c.model.prototype.getFull = function (a, b, f) {
    var b = b || !1,
      d = this;
    b && (a = this.remapFunc.call(this, a));
    if (this.init) {
      var h = this.get(a);
      if ("standAloneComplex" !== this.format || h.loadedFull)
        return "undefined" !== typeof f && f.call(this, h), h;
      this.loading[a] ||
        ((this.loading[a] = !0),
        e.getJSON(
          c.m.cdn +
            h.version +
            "/data/" +
            c.m.l +
            this.type +
            "/" +
            a +
            ".json",
          function (c) {
            d.loadSingle(c);
            d.get(a, b).loadedFull = !0;
            d.loading[a] = !1;
            e.fire.exec("model", { name: d.name, sub: a });
            "undefined" !== typeof f && f.call(d, d.get(a, b));
          }
        ));
    } else
      "undefined" !== typeof f &&
        e.fire.plan("model", { name: type, sub: a }, function (c, h, k) {
          h.name === c.name &&
            h.id === c.id &&
            (e.fire.scrap("model", k), f.call(d, d.get(a, b)));
        });
    return { _action: "getFull", _name: this.name, id: a };
  };
  c.model.prototype.getImg = function (a, b, c) {
    c && (a = this.remapFunc.call(this, a));
    if (this.init) {
      c = { version: this.version };
      if ("object" !== typeof b) b = c;
      else {
        if (b.wrap && 2 < b.wrap) {
          if ("undefined" === typeof b.attrs) b.attrs = "";
          b.attrs += ' data-rg-name="' + this.name + '" data-rg-id="' + a + '"';
        }
        b = e.rebase(b, c);
      }
      return e.getImg(this.get(a), b);
    }
    return "";
  };
  c.model.prototype.all = function () {
    return this.keys.slice(0);
  };
  c.collect = function (a) {
    this.parent = a;
    this.sData = {};
    this.fData = [];
    if (a.init) this.keys = a.keys.slice(0);
  };
  c.collect.prototype.filterInit = function (a) {
    this.f = !0;
    this.fData = a;
    this.fKeys = {};
    this.test = !1;
  };
  c.collect.prototype.sortInit = function (a) {
    this.s = !0;
    this.sData = a;
  };
  c.collect.prototype.filter = function (a) {
    function b(b) {
      b && this.keys.splice(a, 1);
      this.test = !0;
      return b;
    }
    if (!this.f || "undefined" !== typeof this.fKeys[this.keys[a]]) return !1;
    this.fKeys[this.keys[a]] = 1;
    var c = this.parent.data[this.keys[a]],
      d,
      h,
      i,
      g,
      k,
      j = !1;
    for (d = 0; d < this.fData.length; ++d) {
      h = typeof this.fData[d];
      if ("boolean" === h) {
        if (!0 === this.fData[d]) continue;
        return b.call(this, !0);
      }
      if ("string" === h)
        if ((g = /^searchKey:(.*)$/.exec(this.fData[d]))) {
          g = e.tFilter(g[1]).split(" ");
          k = g.length - 1;
          for (h = 0, i = g.length; h < i; ++h)
            this.fData[k === h ? d : this.fData.length] = e.makeTest(
              "searchString*=" + g[h]
            );
          --d;
          continue;
        } else this.fData[d] = e.makeTest(this.fData[d]);
      if ((j |= !e.runTest(c, this.fData[d]))) return b.call(this, !0);
    }
    return b.call(this, j);
  };
  c.collect.prototype.sortDefault = function (a, b) {
    return a > b;
  };
  c.collect.prototype.sort = function (a, b) {
    var c = e.objectDig(this.parent.data[a], this.sData.key),
      d = e.objectDig(this.parent.data[b], this.sData.key);
    return this.sData.callback(c, d);
  };
  c.collect.prototype.merge = function (a, b, c, d, e) {
    for (var i = c, g = d, k; c < e; ++c)
      (k = "undefined" === typeof a[g] ? !0 : !this.sort(a[i], a[g])),
        (b[c] = i < d && (g >= e || k) ? a[i++] : a[g++]);
  };
  c.model.prototype.collect = function (a, b) {
    var f;
    if ("undefined" === typeof this.collection)
      this.collection = new c.collect(this);
    f = this.collection;
    f.s = !1;
    f.f = !1;
    "object" === typeof a && !(a instanceof Array)
      ? f.sortInit(a)
      : ("string" === typeof a && (a = [a]),
        "undefined" !== typeof a &&
          ("" !== a[0] && f.filterInit(a),
          "object" === typeof b && f.sortInit(b)));
    if (this.init) {
      var d = 0;
      this.parseAllData();
      if (f.f) for (; d < f.keys.length; ) f.filter(d) || ++d;
      f.sN = f.keys.length;
      if (f.s && 1 < f.sN) {
        if (!f.sData.callback) f.sData.callback = f.sortDefault;
        var d = [f.keys.slice(0), []],
          e = 0,
          i = 1,
          g,
          k;
        for (g = 1; g < f.sN; g *= 2) {
          for (k = 0; k < f.sN; k += 2 * g)
            f.merge(
              d[e],
              d[i],
              k,
              Math.min(k + g, f.sN),
              Math.min(k + 2 * g, f.sN)
            );
          e ^= 1;
          i ^= 1;
        }
        f.keys = d[e].slice(0);
      }
      return f.keys;
    }
    this.deleteCollect();
    return {
      _action: "collect",
      _name: this.name,
      s: f.s,
      f: f.f,
      sData: f.sData,
      fData: f.fData,
    };
  };
  c.model.prototype.deleteCollect = function () {
    delete this.collection;
  };
  c.model.prototype.datamap = function (a) {
    var b,
      c = {};
    for (b = 0; b < a.length; ++b) c[this.data[a[b]].id] = this.data;
    return c;
  };
  c.model.prototype.remodel = function (a, b) {
    "undefined" === typeof b && (b = this.collect());
    return this.init
      ? (c.models[a] = new c.model(
          this.type,
          this.version,
          JSON.stringify({ data: this.datamap(b), keys: b, basic: this.basic })
        ).rename(a))
      : !1;
  };
  c.rmModel = function (a) {
    delete c.models[a];
  };
  c.useModel = function (a, b, f) {
    var d = a,
      h;
    "string" === typeof b
      ? ((d += "_" + b),
        (h =
          "object" !== typeof c.models[d]
            ? (c.models[d] = new c.model(a, b).rename(d))
            : c.models[d]))
      : (h =
          "object" !== typeof c.models[d]
            ? (c.models[d] = new c.model(a).rename(d))
            : c.models[d]);
    h.init && "undefined" !== typeof f
      ? f.call(h)
      : "undefined" !== typeof f &&
        e.fire.plan("model", { name: a }, function (a, b, d) {
          b.name === a.name && (e.fire.scrap("model", d), f.call(h));
        });
    return h;
  };
  c.retryModel = function (a) {
    if ("object" === typeof a && "string" === typeof a._name) {
      var b = c.useModel(a._name);
      switch (a._action) {
        case "collect":
          return a.s && a.f
            ? b.collect(a.fData, a.sData)
            : a.f
            ? b.collect(a.fData)
            : a.s
            ? b.collect(a.sData)
            : b.collect();
        case "get":
          return b.get(a.id);
        case "getFull":
          return b.getFull(a.id);
      }
    }
    return !1;
  };
  c.modelAux = function (a) {
    function b(b, c) {
      if (e.hasWord(d.aux, b))
        c(),
          (d.aux = e.removeWord(d.aux, b)),
          a.setAttribute("data-rg-aux", d.aux);
    }
    function f(b, c) {
      var f;
      if ((f = e.hasValue(d.aux, b)))
        c(f),
          (d.aux = e.removeValue(d.aux, b)),
          a.setAttribute("data-rg-aux", d.aux);
    }
    var d = e.rgInfo(a, 1);
    d &&
      d.aux &&
      c.addApp([d.name], function () {
        d.inline = !0;
        d.wrap = 2;
        d.size = "normal";
        b("remap_keys", function () {
          var b = c.useModel(d.name);
          d.id = b.remapFunc.call(b, d.id);
          a.setAttribute("data-rg-id", d.id);
        });
        b("empty", function () {
          a.innerHTML = "";
        });
        f("wrap", function (a) {
          d.wrap = parseInt(a, 10);
        });
        f("size", function (a) {
          d.size = a;
        });
        f("img", function (b) {
          a.innerHTML += c
            .useModel(d.name)
            .getImg(d.id, { src: b, wrap: d.wrap, size: d.size });
        });
        f("query", function (b) {
          c.useModel(d.name).get(d.id).hasOwnProperty("_action") ||
            (a.innerHTML += e.objectDig(c.useModel(d.name).get(d.id), b));
        });
        b("no_inline", function () {
          d.inline = !1;
        });
        b("strip_data", function () {
          a.setAttribute("data-rg-name", "");
          a.setAttribute("data-rg-id", "");
          a.setAttribute("data-rg-aux", "");
        });
        if (d.inline) a.style.display = "inline-block";
      });
  };
  c.dynamicScan = (function () {
    function a(f) {
      var d, e, i, g;
      for (e = 0, i = f.childNodes.length; e < i; ++e) {
        for (g = f.childNodes[e]; (d = b.exec(g.className)); )
          g.setAttribute(d[1], d[2].replace(/,/g, " ")),
            (g.className = g.className.replace(b, ""));
        c.modelAux(g);
        a(g);
      }
    }
    var b = /(data-rg-[a-zA-Z]+)=([a-zA-Z0-9_\.,]+)/;
    return a;
  })();
  e.t = function (a) {
    var b = c.useModel("language").get(a);
    return "string" === typeof b ? b : a;
  };
  e.tFilter = function (a) {
    var b, f, d;
    if ((b = c.useModel("language").tree)) {
      f = b.searchKeyIgnore;
      "" !== f && (a = a.replace(RegExp("[" + f + "]", "g"), ""));
      f = b.searchKeyRemap;
      for (d = f.length; d--; )
        (b = RegExp("[" + f[d].v + "]", "g")), (a = a.replace(b, f[d].k));
      a = a
        .toLowerCase()
        .replace(
          /(\s+|\t+|(\n\r)+|\n+|,+|\u00b7+|\u3001+|\u3002+|\u060C+)/g,
          " "
        )
        .replace(/\.|'/g, "")
        .replace(/(^\s+|\s+$)/g, "");
    }
    return a;
  };
  c.useModel("language");
  e.getCSS(c.m.cdn + c.m.css + "/css/view.css");
  c.displayFail = function () {
    return '<img src="' + c.m.cdn + 'img/global/load01.gif" />';
  };
  c.display = {};
  c.addDisplay = function (a) {
    c.display[a.type] = a;
  };
  c.displayList = function (a, b) {
    for (var f = "", d = b.length, e = 0, i = c.display[a].success; e < d; ++e)
      f += i.call(this, this.model.get(b[e]));
    return f;
  };
  c.addDisplay({
    type: "item_tree",
    success: function (a) {
      this.workingData.select = !0;
      this.workingData.depth = a.depth;
      return (
        '<div class="rg-item-tree"><div class="treebox">' +
        this.applyDisplay("item_tree_worker", a) +
        "</div></div>"
      );
    },
  });
  c.addDisplay({
    type: "item_tree_worker",
    success: function (a) {
      var b = a.from.length,
        f,
        d;
      f = !1;
      var e = c.display.item_tree_worker.success,
        i,
        g;
      if (this.workingData.select)
        (f = this.workingData.select), (this.workingData.select = !1);
      f = this.model.getImg(a.id, {
        size: 3 < this.workingData.depth ? "small" : "normal",
        wrap: 3,
        classes: this.runClassTest(a) + (f ? "selected " : "") + "treeimg",
      });
      if (0 !== b) {
        i = 100 / b;
        g = 1 === b ? "single" : "multi";
        f = '<div class="treehead ' + g + '">' + f;
        "multi" === g &&
          (f +=
            '<div class="branch multi"></div><div class="branch limb" style="width: ' +
            (100 - i) +
            '%;"></div>');
        f += "</div>";
        for (d = 0; d < b; d++)
          f +=
            '<div class="treebox" style="width: ' +
            i +
            '%;"><div class="branch ' +
            g +
            '"></div>' +
            e.call(this, this.model.get(a.from[d])) +
            "</div>";
      }
      return f;
    },
  });
  c.addDisplay({
    type: "item_tooltip",
    success: function (a) {
      return (
        this.model.getImg(a.id) +
        '<div class="info"><div class="name">' +
        a.name +
        '</div><div class="description">' +
        a.description +
        '</div><div class="cost">' +
        e.t("Cost_") +
        ' <span class="gold">' +
        (0 !== a.specialRecipe
          ? e.t("SpecialRecipeLarge")
          : a.gold.total + " (" + a.gold.base + ")") +
        "</span></div></div>"
      );
    },
  });
  c.addDisplay({
    type: "item_modal",
    success: function (a) {
      return (
        '<div class="item-into">' +
        this.applyDisplay("item_modal_build", a) +
        "</div>" +
        this.applyDisplay("item_tree", a) +
        '<div class="item-desc">' +
        this.applyDisplay("item_modal_description", a) +
        "</div>"
      );
    },
    onFill: function () {
      var a = this;
      e.addEvent(this.box, "mousedown", function (b) {
        var f = e.rgInfo(b.target, 3);
        if (f) {
          var d = c.useModel(f.name).get(f.id);
          e.hasClass(b.target, "treeimg")
            ? (e.removeClass(e.$(".selected", this.box)[0], "selected"),
              e.addClass(b.target, "selected"),
              (e.$(".item-desc", this.box)[0].innerHTML = a.view.applyDisplay(
                "item_modal_description",
                d
              )),
              (e.$(".item-into", this.box)[0].innerHTML = a.view.applyDisplay(
                "item_modal_build",
                d
              )))
            : e.hasClass(b.target, "intoimg") && a.redraw("getFull", f.id);
        }
      });
    },
    onWipe: function () {
      e.removeEvent(this.box, "mousedown");
    },
  });
  c.addDisplay({
    type: "item_modal_description",
    success: function (a) {
      return (
        '<div class="title">' +
        this.model.getImg(a.id, { src: "full" }) +
        '<div class="name">' +
        a.name +
        '</div><div class="cost">' +
        e.t("Cost_") +
        ' <span class="gold">' +
        (0 !== a.specialRecipe
          ? e.t("SpecialRecipeLarge")
          : a.gold.total + " (" + a.gold.base + ")") +
        '</span></div></div><div class="description">' +
        a.description +
        "</div>"
      );
    },
  });
  c.addDisplay({
    type: "item_modal_build",
    success: function (a) {
      var b,
        c,
        d = "";
      for (b = 0, c = a.into.length; b < c; ++b)
        d += this.model.getImg(a.into[b], { wrap: 3, classes: "intoimg" });
      return d;
    },
  });
  c.addDisplay({
    type: "rune_tooltip",
    success: function (a) {
      return (
        this.model.getImg(a.id) +
        '<div class="info"><div class="name">' +
        a.name +
        '</div><div class="description">' +
        a.description +
        "</div></div>"
      );
    },
  });
  c.addDisplay({
    type: "mastery_trunk",
    success: function (a) {
      var b = a.length,
        c,
        d,
        e;
      for (d = '<div class="rg-mastery-trunk">'; b--; )
        for (c = a[b].length; c--; )
          null !== a[b][c] &&
            ((e = this.model.get(a[b][c].masteryId)),
            (d +=
              '<div class="mastery left' +
              c +
              " top" +
              b +
              '" data-rg-name="' +
              this.model.name +
              '" data-rg-id="' +
              e.id +
              '">' +
              this.model.getImg(e.id) +
              "</div>"));
      return d + "</div>";
    },
  });
  c.addDisplay({
    type: "champion_tooltip",
    success: function (a) {
      return (
        this.model.getImg(a.id) +
        '<div class="info"><div class="name">' +
        a.name +
        '</div><div class="description">' +
        a.blurb +
        "</div></div>"
      );
    },
  });
  c.addDisplay({
    type: "summoner_tooltip",
    success: function (a) {
      return (
        this.model.getImg(a.id) +
        '<div class="info"><div class="name">' +
        a.name +
        '</div><div class="description">' +
        a.description +
        "</div></div>"
      );
    },
  });
  c.views = {};
  c.view = function (a) {
    this.init = !1;
    this.display = c.display[a];
    this.content = "";
    this.model = !1;
    this.workingData = {};
    this.onFill = c.display[a].onFill
      ? function () {
          var a = this;
          setTimeout(function () {
            a.view.display.onFill.call(a);
          }, 0);
        }
      : function () {};
    this.onWipe = c.display[a].onWipe || function () {};
    this.onReactive = c.display[a].onReactive || function () {};
    this.classTestsHash = {};
    this.classTests = [];
  };
  c.view.prototype.loadModel = function (a) {
    this.model = a;
  };
  c.view.prototype.applyDisplay = function (a, b) {
    var f;
    try {
      f = c.display[a].success.call(this, b);
    } catch (d) {
      f =
        "undefined" === typeof c.display[a]
          ? e.er(d, "view.applyDisplay", "Nonexistent display (" + a + ")")
          : e.er(
              d,
              "view.applyDisplay",
              "Invalid data used for display (" + a + ")"
            );
    }
    return f;
  };
  c.view.prototype.load = function (a) {
    this.data = a;
    "object" === typeof a && "string" === typeof a._action
      ? ((this.content =
          "object" === typeof this.display.fail
            ? this.display.fail.call(this)
            : c.displayFail()),
        (this.init = !1))
      : ((this.workingData = {}),
        (this.content = this.applyDisplay(this.display.type, a)),
        (this.init = !0));
  };
  c.view.prototype.reload = function () {
    (!this.init ||
      ("object" === typeof data && "string" === typeof data._action)) &&
      this.load(c.retryModel(this.data));
  };
  c.view.prototype.addClassTest = function (a, b) {
    var c = e.makeTest(a);
    c.classes = b;
    "undefined" !== typeof this.classTestsHash[c.key]
      ? (this.classTests[this.classTestsHash[c.key]] = c)
      : (this.classTestsHash[c.key] = this.classTests.push(c) - 1);
  };
  c.view.prototype.runClassTest = function (a) {
    for (var b = this.classTests.length, c = ""; b--; )
      e.runTest(a, this.classTests[b]) &&
        (c += this.classTests[b].classes + " ");
    return c;
  };
  c.useView = function (a) {
    return new c.view(a);
  };
  c.box = {
    modal: {
      overrides: ["target"],
      type: "modal",
      dataTarget: "commonbox",
      target: "body",
      empty: !1,
      preselect: !0,
      wrapsChildren: !0,
      position: "viewport",
      drawFrom: "center",
      drawTo: "center",
      offsetX: 0,
      offsetY: 0,
      classes: "",
      onCreate: function () {
        var a = this;
        e.addEvent(this.wDown, "mousedown", function () {
          a.destroy();
        });
      },
      onDestroy: function () {
        this.wDown && e.removeEvent(this.wDown, "mousedown");
      },
    },
    tooltip: {
      type: "tooltip",
      dataTarget: "commonbox",
      target: "body",
      empty: !1,
      preselect: !0,
      wrapsChildren: !1,
      position: "mouse",
      drawTo: "center",
      offsetX: 30,
      offsetY: 30,
      classes: "",
    },
    container: {
      overrides: ["target"],
      type: "container",
      dataTarget: "target",
      target: "body",
      empty: !1,
      preselect: !0,
      wrapsChildren: !1,
      position: "none",
      classes: "",
    },
  };
  c.addBox = function (a) {
    c.box[a.type] = a;
  };
  c.controllers = { cur: 0 };
  c.controller = function (a) {
    var b = [];
    if (-1 !== a.indexOf("_")) {
      b = a.split("_");
      this.loadBox(b.shift());
      for (a = 0; a < b.length; a++)
        this.boxData[this.boxData.overrides[a]] = b[a];
    } else this.loadBox(a);
    this.repos = this.visible = this.model = this.view = !1;
    this.refix = "absolute" === c.fixed;
    this.box = this.ranView = !1;
    this.classes = "";
    this.id = "cont" + ++c.controllers.cur;
    c.controllers[this.id] = this;
    this.wrapper = [];
    this.wDown = !1;
    this.wChildren = [];
    this.current = "";
    this.store = {};
    this.onCreate = function () {};
    this.onDestroy = function () {};
    this.onShow = function () {};
    this.onHide = function () {};
    this.onReactive = function () {};
  };
  c.controller.prototype.loadBox = function (a) {
    this.boxData = e.rebase({}, c.box[a], {
      onCreate: function () {},
      onDestroy: function () {},
      onShow: function () {},
      onHide: function () {},
      onReactive: function () {},
    });
    this.initSingleWrap = !1;
    this.singleWrap =
      window.rg_force_reducereflow &&
      this.boxData.wrapsChildren &&
      "commonbox" === this.boxData.dataTarget
        ? !0
        : !1;
  };
  c.controller.prototype.create = function () {
    var a = this.boxData,
      b = "";
    this.target =
      "string" === typeof a.target ? e.$(a.target, a.preselect)[0] : a.target;
    !1 !== this.box && this.destroy();
    this.box = e.mkDiv({
      classes: "ninja rg-box-" + a.type + this.classes,
      data: [{ k: "control", v: this.id }],
    });
    switch (a.dataTarget) {
      case "rel":
        this.target = e.$(this.target.getAttribute("rel"), a.preselect)[0];
      case "target":
        if (a.empty) this.target.innerHTML = "";
        break;
      case "commonbox":
        (b = "rg-commonbox-" + a.type),
          (holder = e.$("#" + b, !0)).length && c.destroyBox(holder[0]),
          (this.box.id = b);
      case "box":
        if ("target" === a.position)
          (this.box.style.position = "absolute"), (this.repos = !0);
        switch (a.position) {
          case "mouse":
            a.drawFrom = "mouse";
          case "viewport":
            (this.repos = !0),
              (this.box.style.position = c.fixed),
              (this.refix &= 1);
          case "target":
            this.target.style.position = "relative";
        }
        if (this.repos) {
          switch (a.drawFrom) {
            case "mouse":
            case "center":
            case "page":
              this.repos = [a.drawFrom, a.drawFrom];
              break;
            default:
              this.repos = a.drawFrom.split(" ");
          }
          switch (a.drawTo) {
            case "center":
            case "page":
              this.repos.push(a.drawTo, a.drawTo);
              break;
            default:
              this.repos = this.repos.concat(a.drawTo.split(" "));
          }
        }
        if (a.wrapsChildren)
          if (
            ((this.box.className += " wrap-ceil"),
            this.singleWrap && this.initSingleWrap)
          )
            e.removeClass(this.wDown, "ninja");
          else {
            this.wChildren = e.deadChildren(this.target);
            this.groupWrapper = e.mkDiv({
              classes: "wrap-floor",
              append: this.target,
            });
            this.wDown = e.mkDiv({
              classes: "wrap-wall",
              append: this.target,
              style: "position:" + c.fixed + ";",
            });
            this.singleWrap
              ? (this.initSingleWrap = !0)
              : (this.wrapper = [this.groupWrapper, this.wDown, this.box]);
            for (a = 0, b = this.wChildren.length; a < b; a++)
              this.groupWrapper.appendChild(this.wChildren[a]);
          }
    }
    this.target.appendChild(this.box);
    this.move();
    this.boxData.onCreate.call(this);
    this.onCreate.call(this);
  };
  c.controller.prototype.addClass = function (a) {
    e.hasWord(this.classes, a) ||
      ((this.classes += " " + a), !1 !== this.box && e.addClass(this.box, a));
  };
  c.controller.prototype.removeClass = function (a) {
    this.classes = e.removeWord(this.classes, a);
    !1 !== this.box && e.removeClass(this.box, a);
  };
  c.controller.prototype.destroy = function () {
    if (this.singleWrap && this.initSingleWrap)
      e.addClass(this.wDown, "ninja"), this.target.removeChild(this.box);
    else {
      var a, b;
      if (this.boxData.wrapsChildren) {
        for (a = 0, b = this.wChildren.length; a < b; ++a)
          this.target.appendChild(this.wChildren[a]);
        for (a = 0, b = this.wrapper.length; a < b; ++a)
          this.target.removeChild(this.wrapper[a]);
        this.wDown = !1;
      } else e.rmDiv(this.box);
    }
    this.visible = this.box = !1;
    if (this.view) this.view.onWipe.call(this), (this.ranView = !1);
    this.boxData.onDestroy.call(this);
    this.onDestroy.call(this);
  };
  c.controller.prototype.newMV = function (a, b) {
    2 > arguments.length && (b = a + "_" + this.boxData.type);
    this.removeClass("rg-display-[A-Za-z_0-9.]+");
    this.model = c.useModel(a);
    this.view = c.useView(b);
    this.view.controller = this;
    this.addClass("rg-display-" + this.view.display.type);
    this.view.loadModel(this.model);
  };
  c.controller.prototype.fillInView = function (a) {
    this.ranView ? a.onWipe.call(this) : (this.ranView = !0);
    this.box.innerHTML = a.content;
  };
  c.controller.prototype.runView = function () {
    !1 !== this.box &&
      this.view &&
      (this.fillInView(this.view),
      !1 === this.view.init
        ? e.fire.plan(
            "model",
            { view: this.view, controller: this },
            function (a, b, c) {
              "undefined" !== typeof a.view.data &&
                a.view.data._name === b.name &&
                (a.view.reload(),
                a.controller.fillInView(a.view),
                a.controller.view.onFill.call(a.controller),
                e.fire.scrap(c));
            }
          )
        : this.view.onFill.call(this));
  };
  c.controller.prototype.redraw = function (a) {
    switch (a + arguments.length) {
      case "get2":
        this.view.load(this.model.get(arguments[1]));
        break;
      case "get3":
        this.view.load(this.model.get(arguments[1], arguments[2]));
        break;
      case "getFull2":
        this.view.load(this.model.getFull(arguments[1]));
        break;
      case "getFull3":
        this.view.load(this.model.getFull(arguments[1], arguments[2]));
        break;
      case "collect1":
        this.view.load(this.model.collect());
        break;
      case "collect2":
        this.view.load(this.model.collect(arguments[1]));
        break;
      case "collect3":
        this.view.load(this.model.collect(arguments[1], arguments[2]));
    }
    this.runView();
  };
  c.controller.prototype.moveXY = function (a, b) {
    this.refix &&
      ((a += document.documentElement.scrollLeft),
      (b += document.documentElement.scrollTop));
    this.box.style.left = a + "px";
    this.box.style.top = b + "px";
  };
  c.controller.prototype.move = function (a) {
    "undefined" === typeof a && (a = { clientY: 0, clientX: 0 });
    if (this.repos) {
      var b, c, d;
      switch (this.boxData.position) {
        case "target":
          d = [this.target.offsetHeight, this.target.offsetWidth];
          break;
        case "mouse":
        case "viewport":
          d = [
            window.innerHeight ||
              document.documentElement.clientHeight ||
              document.body.clientHeight,
            window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth,
          ];
      }
      switch (this.repos[0]) {
        case "center":
          b = d[0] / 2;
          break;
        case "page":
          b = d[0];
          break;
        case "mouse":
          (b = a.clientY), (this.repos[2] = b < d[0] / 2 ? "bottom" : "top");
      }
      switch (this.repos[1]) {
        case "center":
          c = d[1] / 2;
          break;
        case "page":
          c = d[1];
          break;
        case "mouse":
          (c = a.clientX), (this.repos[3] = c < d[1] / 2 ? "right" : "left");
      }
      switch (this.repos[2]) {
        case "center":
          b -= this.box.offsetHeight / 2;
          break;
        case "top":
          b -= this.box.offsetHeight + this.boxData.offsetY;
          break;
        case "bottom":
          b += this.boxData.offsetY;
      }
      switch (this.repos[3]) {
        case "center":
          c -= this.box.offsetWidth / 2;
          break;
        case "left":
          c -= this.box.offsetWidth + this.boxData.offsetX;
          break;
        case "right":
          c += this.boxData.offsetX;
      }
      this.moveXY(c, b);
    }
  };
  c.controller.prototype.show = function () {
    if (!this.visible)
      e.removeClass(this.box, "ninja"),
        (this.visible = !0),
        this.boxData.onShow.call(this),
        this.onShow.call(this);
  };
  c.controller.prototype.hide = function () {
    if (this.visible)
      e.addClass(this.box, "ninja"),
        (this.visible = !1),
        this.boxData.onHide.call(this),
        this.onHide.call(this);
  };
  c.controller.prototype.addEvent = function (a, b) {
    var c = this;
    e.addEvent(this.target || e.$(this.boxData.target)[0], a, function (a) {
      b.call(c, a);
    });
  };
  c.controller.prototype.reactive = function (a) {
    a = e.rebase(a, {
      action: "get",
      reactDepth: 5,
      stopSimilar: !1,
      allowShow: !0,
      allowMove: !0,
      allowHide: !0,
      allowModelChange: !0,
      allowBoxCreate: !0,
      onReactive: function () {},
      success: function () {},
      fail: function () {},
      execute: !0,
    });
    if (!(-1 !== a.buttonRestrict && a.button !== a.buttonRestrict))
      if (((a.info = e.rgInfo(a.target, a.reactDepth)), !1 === a.info))
        a.allowHide && this.hide(), a.fail.call(this, a);
      else {
        if (
          !1 === this.onReactive(a) ||
          (this.view && !1 === this.view.onReactive.call(this, a)) ||
          !1 === a.onReactive.call(this, a)
        )
          a.execute = !1;
        if (!1 === a.execute) a.fail.call(this, a);
        else {
          a.info.wrongModel = a.info.name !== this.model.name;
          a.info.modelChange = a.info.wrongModel && a.allowModelChange;
          if (a.info.modelChange) this.newMV(a.info.name);
          else if (a.info.wrongModel) return;
          if (a.allowBoxCreate && !1 === this.box)
            this.create(), (this.current = "");
          a.info.idChange = a.info.id !== this.current || a.info.modelChange;
          if (a.info.idChange)
            "collect" === a.action
              ? this.redraw("collect")
              : this.redraw(a.action, a.info.id),
              (this.current = a.info.id);
          if (a.stopSimilar) {
            var b = function (a) {
              a.event.stopPropagation();
            };
            e.addEvent(this.box, a.type, b);
            this.onDestroy = function () {
              e.removeEvent(this.box, a.type, b);
            };
          }
          if (a.allowShow) {
            var c = this.visible;
            this.show();
            (a.allowMove || !c) && this.move(a.event);
          }
          a.success.call(this, a);
        }
      }
  };
  c.controller.prototype.addReactiveEvent = function (a, b) {
    this.addEvent(a, function (a) {
      this.reactive(e.rebase(a, b || {}));
    });
  };
  c.destroyBox = function (a) {
    var b = a.getAttribute("data-control");
    null !== b || "" !== b ? c.controllers[b].destroy() : e.rmDiv(a);
  };
  c.useController = function (a) {
    return new c.controller(a);
  };
  c.buildController = function () {
    var a = arguments.length,
      b = !0;
    4 === a && (b = arguments[0]);
    var f = c.useController(arguments[a - 1]);
    f.newMV(arguments[a - 3], arguments[a - 2]);
    b && f.create();
    return f;
  };
  c.players = {};
  c.player = function (a) {
    a = a || {};
    e.rebase(this, a, {
      name: "",
      summonerlevel: 30,
      champion: !1,
      level: 1,
      summoner: [],
      item: [],
      rune: { red: [], yellow: [], blue: [], black: [] },
      mastery: {},
      masteryString: "",
      stacks: {},
    });
    for (a = 72; a--; ) this.masteryString += "0";
    this.stats = this.basicStats();
  };
  c.player.prototype.basicStats = function () {
    return {
      armor: 0,
      basearmor: 0,
      bonusarmor: 0,
      spellblock: 0,
      basespellblock: 0,
      bonusspellblock: 0,
      attackdamage: 0,
      spelldamage: 0,
      dodge: 0,
      flatarmorpenetration: 0,
      flatmagicpenetration: 0,
      percentarmorpenetration: 0,
      percentmagicpenetration: 0,
      cooldown: 0,
      cooldownsummoner: 0,
      attackrange: 0,
      attackspeed: 0,
      crit: 0,
      critdamage: 2,
      hp: 0,
      hpregen: 0,
      mp: 0,
      mpregen: 0,
      movespeed: 300,
      goldper10: 0,
      timedead: 0,
    };
  };
  c.player.prototype.setMastery = function (a, b) {
    this.mastery[a] = b;
    this.updateMasteryStringFor(a);
    return !0;
  };
  c.player.prototype.addMastery = function (a) {
    var b = c.useModel("mastery");
    if (!b.init) return !1;
    b = b.get(a);
    if (this.getMastery(a) >= b.ranks) return !1;
    this.mastery[a] += 1;
    this.updateMasteryStringFor(a);
    return !0;
  };
  c.player.prototype.setMasteryByString = function (a) {
    for (var b = 4, c = 7, d = 5, e, i; --b; )
      for (; --c; )
        for (; --d; )
          if (((e = 24 * b + 4 * c + d), (e = parseInt(a.charAt(e), 10))))
            (i = b + "" + c + "" + d), (this.mastery[i] = e);
    this.masteryString = a;
  };
  c.player.prototype.updateMasteryStringFor = function (a) {
    var b = parseInt(a.charAt(0), 10) - 2,
      c = parseInt(a.charAt(1), 10) - 1,
      d = parseInt(a.charAt(2), 10) - 1,
      b = 24 * b + 4 * c + d;
    this.masteryString =
      this.masteryString.slice(0, b) +
      this.mastery[a] +
      this.masteryString.slice(b + 1);
  };
  c.player.prototype.getMastery = function (a) {
    "undefined" === typeof this.mastery[a] && (this.mastery[a] = 0);
    return this.mastery[a];
  };
  c.player.prototype.setRune = function (a) {
    var b = c.useModel("rune");
    if (!b.init) return !1;
    var a = b.get(a),
      b = a.rune.type,
      e = this.rune[b].length;
    if (("black" === b && 3 <= e) || 9 <= e) return !1;
    this.rune[b].push(a.id);
    return !0;
  };
  c.player.prototype.setChampion = function (a) {
    this.champion = a;
    return !0;
  };
  c.defaultPlayer = new c.player();
  e.calcAspd = function (a, b, c, d) {
    return (
      Math.round(
        ((1e3 * 1) / (1.6 * (1 + b))) * (1 + (d || 0) + (c * (a - 1)) / 100)
      ) / 1e3
    );
  };
  c._spellDataLink = function (a, b, c, d) {
    this.calc = a;
    this.spell = b;
    this.spellLevel = c;
    this.player = d;
    this.data = fn.rebase({}, spell.datavalues);
    this.generateLinks();
  };
  c._spellDataLink.prototype.generateLinks = function () {
    var a, b, c;
    for (a = 0, b = this.spell.vars.length; a < b; ++a)
      (c = this.spell.vars[a]), (this.data[c.key] = this.generateLink(c));
    for (a = 1, b = this.spell.effect.length; a < b; ++a)
      this.data["e" + a] =
        0 === this.calc
          ? this.spell.effectBurn[a]
          : this.spell.effect[a][this.spellLevel - 1];
  };
  c._spellDataLink.prototype.generateLink = function (a) {
    if (0 === this.calc)
      switch (a.link) {
        case "@player.level":
          return a.coeff[0] + " - " + a.coeff[a.coeff.length - 1];
        case "@cooldownsummoner":
        case "@cooldownchampion":
          return this.spell.cooldownBurn;
        case "@stacks":
          return "object" === typeof a.coeff
            ? a.coeff.join("/") + " " + e.t("perStack")
            : a.coeff + " " + e.t("perStack");
        default:
          if (0 === a.link.indexOf("@dynamic.")) break;
          return "object" === typeof a.coeff ? a.coeff.join("/") : a.coeff;
      }
    else if (1 === this.calc)
      switch (a.link) {
        case "@player.level":
          return a.coeff[0] + " - " + a.coeff[a.coeff.length - 1];
        case "@stacks":
          return "object" === typeof a.coeff
            ? a.coeff[this.spellLevel - 1] + " " + e.t("perStack")
            : a.coeff + " " + e.t("perStack");
        case "@cooldownsummoner":
        case "@cooldownchampion":
          return this.spell.cooldown[this.spellLevel - 1];
        default:
          return "object" === typeof a.coeff
            ? a.coeff[this.spellLevel - 1]
            : a.coeff;
      }
    return "";
  };
  c._spellDataLink.prototype.getLeveltip = function () {};
  c._spellDataLink.prototype.getTooltip = function () {
    return e.format(this.spell.tooltip, this.data);
  };
  c.spellDataLink = function (a, b, e, d) {
    d = d || c.defaultPlayer;
    return new c._spellDataLink(a, b, e || 1, d);
  };
  "undefined" !== typeof l.rg_force_endapp
    ? l.rg_force_endapp()
    : (c.dynamicScan(e.$("body")[0]),
      (c.endApp = {
        tooltip: c.buildController("item", "item_tooltip", "tooltip"),
        itemmodal: c.buildController(!1, "item", "item_modal", "modal"),
      }),
      c.endApp.tooltip.addReactiveEvent("mousemove"),
      c.endApp.itemmodal.addReactiveEvent("click", {
        buttonRestrict: 0,
        stopSimilar: !0,
        allowModelChange: !1,
        action: "getFull",
        success: function () {
          c.endApp.tooltip.hide();
        },
      }));
  (function () {
    function a(a) {
      var b;
      b = 0;
      a: for (; b < a.ms.length; ++b) {
        for (; c.useModel(a.ms[b]).init; )
          if ((a.ms.splice(b, 1), "undefined" === typeof a.ms[b])) break a;
        e.fire.plan("model", { index: b, app: a }, function (a, b, c) {
          a.app.ms[a.index] === b.name &&
            (a.app.ms.splice(a.index, 1),
            0 === a.app.ms.length && (a.app.app(), e.fire.scrap(c)));
        });
      }
      0 === a.ms.length && a.app();
    }
    c.addApp = function (b, c) {
      a({ app: c, ms: b });
    };
    var b, f;
    for (b = 0, f = c.app.length; b < f; ++b) a(c.app[b]);
  })();
};
