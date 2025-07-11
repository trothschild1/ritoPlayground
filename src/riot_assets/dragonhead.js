var Riot = Riot || {};
"object" === typeof Riot &&
  (function () {
    var e = window,
      r = document,
      g = e.localStorage,
      a = (Riot.DDragon = {
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
          var h = r.createElement("script");
          h.setAttribute("type", "text/javascript");
          h.setAttribute("async", "async");
          h.setAttribute("src", a);
          if ("function" == typeof b)
            h.onload =
              "object" === typeof e.onload &&
              "object" === typeof e.onreadystatechange
                ? b
                : (h.onreadystatechange = b);
          h && r.body.appendChild(h);
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
                } catch (h) {
                  a = !1;
                }
              }
            else if (e.XMLHttpRequest)
              try {
                a = new XMLHttpRequest();
              } catch (d) {
                a = !1;
              }
            return a;
          },
          load: function (c, b, h) {
            if (a.xhr.ready) {
              var d = this.init();
              if (d && c) {
                try {
                  d.open("GET", c, !0);
                } catch (e) {
                  a.xhr.ready = !1;
                  a.jsonp(c, h);
                  return;
                }
                d.onreadystatechange = function () {
                  var e = "";
                  if (4 === d.readyState && a.xhr.ready)
                    switch (d.status) {
                      case 200:
                      case 304:
                        if (d.responseText) e = d.responseText;
                        b(e);
                        break;
                      default:
                        (a.xhr.ready = !1), a.jsonp(c, h);
                    }
                };
                d.send(null);
              }
            } else a.jsonp(c, h);
          },
          init: function () {
            return this.getHTTPObject();
          },
        },
        app: [],
        addApp: function (c, b) {
          a.app.push({ app: b, ms: c || [] });
        },
        mps: {},
        amp: function (c, b) {
          a.mps[c] ? a.mps[c].push(b) : (a.mps[c] = [b]);
        },
        addModelParser: function (c, b) {
          a.amp(c, b);
        },
        ddf: "/js/dragonmagic.js",
        lsp: function () {
          a.rd();
        },
        fin: function () {
          a.fn.init();
        },
        rd: function () {
          var c = !1;
          if (a.ls)
            if (((a.rdd = g.getItem("rg_ddragon_override")), null !== a.rdd))
              c = !0;
            else if (g.getItem("rg_ddragon_c") === a.m.dd) {
              var b;
              if ((b = g.getItem("rg_ddragon"))) {
                eval(b);
                a.fin();
                return;
              }
            }
          if (
            !c &&
            ((a.rdd = a.m.cdn + a.m.dd + "/js/dragonmagic.js"),
            "string" === typeof e.rg_force_ddragon)
          )
            a.rdd = e.rg_force_ddragon;
          a.xhr.load(
            a.rdd,
            function (b) {
              a.ls &&
                (g.setItem("rg_ddragon", b), g.setItem("rg_ddragon_c", a.m.dd));
              eval(b);
              a.fin();
            },
            function () {
              "object" === typeof a.fn && a.fin();
            }
          );
        },
      }),
      n;
    n || (n = {});
    (function () {
      function a(b) {
        return 10 > b ? "0" + b : b;
      }
      function b(a) {
        g.lastIndex = 0;
        return g.test(a)
          ? '"' +
              a.replace(g, function (a) {
                var b = p[a];
                return "string" === typeof b
                  ? b
                  : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"'
          : '"' + a + '"';
      }
      function e(a, d) {
        var c,
          m,
          k,
          g,
          q = i,
          j,
          f = d[a];
        f &&
          "object" === typeof f &&
          "function" === typeof f.toJSON &&
          (f = f.toJSON(a));
        "function" === typeof l && (f = l.call(d, a, f));
        switch (typeof f) {
          case "string":
            return b(f);
          case "number":
            return isFinite(f) ? "" + f : "null";
          case "boolean":
          case "null":
            return "" + f;
          case "object":
            if (!f) return "null";
            i += o;
            j = [];
            if ("[object Array]" === Object.prototype.toString.apply(f)) {
              g = f.length;
              for (c = 0; c < g; c += 1) j[c] = e(c, f) || "null";
              k =
                0 === j.length
                  ? "[]"
                  : i
                  ? "[\n" + i + j.join(",\n" + i) + "\n" + q + "]"
                  : "[" + j.join(",") + "]";
              i = q;
              return k;
            }
            if (l && "object" === typeof l) {
              g = l.length;
              for (c = 0; c < g; c += 1)
                "string" === typeof l[c] &&
                  ((m = l[c]),
                  (k = e(m, f)) && j.push(b(m) + (i ? ": " : ":") + k));
            } else
              for (m in f)
                Object.prototype.hasOwnProperty.call(f, m) &&
                  (k = e(m, f)) &&
                  j.push(b(m) + (i ? ": " : ":") + k);
            k =
              0 === j.length
                ? "{}"
                : i
                ? "{\n" + i + j.join(",\n" + i) + "\n" + q + "}"
                : "{" + j.join(",") + "}";
            i = q;
            return k;
        }
      }
      if ("function" !== typeof Date.prototype.toJSON)
        (Date.prototype.toJSON = function () {
          return isFinite(this.valueOf())
            ? this.getUTCFullYear() +
                "-" +
                a(this.getUTCMonth() + 1) +
                "-" +
                a(this.getUTCDate()) +
                "T" +
                a(this.getUTCHours()) +
                ":" +
                a(this.getUTCMinutes()) +
                ":" +
                a(this.getUTCSeconds()) +
                "Z"
            : null;
        }),
          (String.prototype.toJSON =
            Number.prototype.toJSON =
            Boolean.prototype.toJSON =
              function () {
                return this.valueOf();
              });
      var d =
          /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        g =
          /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        i,
        o,
        p = {
          "\u0008": "\\b",
          "\t": "\\t",
          "\n": "\\n",
          "\u000c": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\",
        },
        l;
      if ("function" !== typeof n.stringify)
        n.stringify = function (a, b, c) {
          var d;
          o = i = "";
          if ("number" === typeof c) for (d = 0; d < c; d += 1) o += " ";
          else "string" === typeof c && (o = c);
          if (
            (l = b) &&
            "function" !== typeof b &&
            ("object" !== typeof b || "number" !== typeof b.length)
          )
            throw Error("JSON.stringify");
          return e("", { "": a });
        };
      if ("function" !== typeof n.parse)
        n.parse = function (a, b) {
          function c(a, d) {
            var e,
              h,
              f = a[d];
            if (f && "object" === typeof f)
              for (e in f)
                Object.prototype.hasOwnProperty.call(f, e) &&
                  ((h = c(f, e)), void 0 !== h ? (f[e] = h) : delete f[e]);
            return b.call(a, d, f);
          }
          var e,
            a = "" + a;
          d.lastIndex = 0;
          d.test(a) &&
            (a = a.replace(d, function (a) {
              return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }));
          if (
            /^[\],:{}\s]*$/.test(
              a
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
            )
          )
            return (
              (e = eval("(" + a + ")")),
              "function" === typeof b ? c({ "": e }, "") : e
            );
          throw new SyntaxError("JSON.parse");
        };
    })();
    if (!Array.prototype.indexOf)
      Array.prototype.indexOf = function (a, b) {
        var e = this.length >>> 0,
          d = Number(b) || 0,
          d = 0 > d ? Math.ceil(d) : Math.floor(d);
        for (0 > d && (d += e); d < e; d++)
          if (d in this && this[d] === a) return d;
        return -1;
      };
    (function () {
      var c = document,
        b = c.body,
        e = c.documentElement,
        d = c.createElement("div");
      if (
        c.createElement &&
        b &&
        b.appendChild &&
        b.removeChild &&
        d.getBoundingClientRect
      ) {
        d.innerHTML = "x";
        d.style.cssText = "position:fixed;top:100px;";
        b.appendChild(d);
        var c = b.style.height,
          g = b.scrollTop;
        b.style.height = "3000px";
        b.scrollTop = 500;
        b.style.height = c;
        if (100 !== d.getBoundingClientRect().top)
          (a.fixed = "absolute"),
            (e.style.cssText = "height:100%;width:100%;"),
            (b.style.cssText = "height:100%;width:100%;");
        b.removeChild(d);
        b.scrollTop = g;
      }
      return null;
    })();
    var s = a,
      p;
    try {
      g.setItem("modernizr", "modernizr"), g.removeItem("modernizr"), (p = !0);
    } catch (t) {
      p = !1;
    }
    s.ls = p;
    if ("string" === typeof e.rg_force_manifest) a.mu = e.rg_force_manifest;
    if ("boolean" == typeof e.rg_force_jsonp) a.xhr.ready = !e.rg_force_jsonp;
    "object" === typeof e.rg_force_manifest_object
      ? (a.m = e.rg_force_manifest_object)
      : a.jsonp(a.mu, function () {
          if ("object" === typeof a.m) {
            if ("string" === typeof e.rg_force_language) {
              if (-1 === e.rg_force_language.indexOf("_"))
                e.rg_force_language = a.langInterface[e.rg_force_language];
              a.m.l = e.rg_force_language + "/";
            } else a.m.l += "/";
            a.m.cdn =
              "string" === typeof e.rg_force_cdn
                ? e.rg_force_cdn + "/"
                : a.m.cdn + "/";
            a.m.cdn = a.m.cdn.replace(/^http:/, "");
            a.lsp();
          }
        });
  })();
