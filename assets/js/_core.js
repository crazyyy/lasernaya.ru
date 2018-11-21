function _typeof(e) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  })(e)
}! function (a) {
  for (var i = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !a.requestAnimationFrame; ++t) a.requestAnimationFrame = a[e[t] + "RequestAnimationFrame"], a.cancelAnimationFrame = a[e[t] + "CancelAnimationFrame"] || a[e[t] + "CancelRequestAnimationFrame"];
  if (a.requestAnimationFrame || (a.requestAnimationFrame = function (e, t) {
      var n = (new Date).getTime(),
        r = Math.max(0, 16 - (n - i)),
        o = a.setTimeout(function () {
          e(n + r)
        }, r);
      return i = n + r, o
    }), a.cancelAnimationFrame || (a.cancelAnimationFrame = function (e) {
      clearTimeout(e)
    }), Array.prototype.includes || (Array.prototype.includes = function (e) {
      "use strict";
      var t = Object(this),
        n = parseInt(t.length, 10) || 0;
      if (0 === n) return !1;
      var r, o = parseInt(arguments[1], 10) || 0;
      for (0 <= o ? r = o : (r = n + o) < 0 && (r = 0); r < n;) {
        var a = t[r];
        if (e === a || e != e && a != a) return !0;
        r++
      }
      return !1
    }), Object.values || Object.defineProperty(Object, "values", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function (t) {
        return "string" == typeof t ? t.split("") : Array.isArray(t) ? t : "object" !== _typeof(t) ? [] : Object.keys(t).map(function (e) {
          return t[e]
        })
      }
    }), "function" != typeof a.CustomEvent) {
    var n = function (e, t) {
      t = t || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
    };
    n.prototype = a.Event.prototype, a.CustomEvent = n
  }
  a.svg4everybody = function () {
    function b(e, t) {
      if (t) {
        var n = document.createDocumentFragment(),
          r = t.getAttribute("viewBox");
        e.setAttribute("viewBox", r);
        for (var o = t.cloneNode(!0); o.childNodes.length;) n.appendChild(o.firstChild);
        e.appendChild(n)
      }
    }

    function p(r) {
      r.onreadystatechange = function () {
        if (4 === r.readyState) {
          var n = r._cachedDocument;
          n || ((n = r._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = r.responseText, r._cachedTarget = {}), r._embeds.splice(0).map(function (e) {
            var t = r._cachedTarget[e.id];
            t || (t = r._cachedTarget[e.id] = n.getElementById(e.id)), b(e.svg, t)
          })
        }
      }, r.onreadystatechange()
    }
    return function (e) {
      var m, s = Object(e);
      m = "polyfill" in s ? s.polyfill : /\bTrident\/[5-7]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) || /\bEdge\/(\d+)\.(\d+)\b/.test(navigator.userAgent) || (navigator.userAgent.match(/\bAp{2}leWebKit\/(\d+)\b/) || [])[1] < 537;
      var l = {},
        d = a.requestAnimationFrame || setTimeout,
        f = document.getElementsByTagName("use");
      m && function e() {
        for (var t = 0; t < f.length;) {
          var n = f[t],
            r = n.parentNode;
          if (r && /svg/i.test(r.nodeName)) {
            var o = n.getAttribute("xlink:href");
            if (m && (!s.validate || s.validate(o, r, n))) {
              r.removeChild(n);
              var a = o.split("#"),
                i = a.shift(),
                c = a.join("#");
              if (i.length) {
                var u = l[i];
                u || ((u = l[i] = new XMLHttpRequest).open("GET", i), u.send(), u._embeds = []), u._embeds.push({
                  svg: r,
                  id: c
                }), p(u)
              } else b(r, document.getElementById(c))
            }
          } else ++t
        }
        d(e, 67)
      }()
    }
  }()
}(window);
! function (e) {
  function o(e) {
    e.preventDefault()
  }
  e.videoImgFallback = function (e) {
    console.warn("video load error, gif fallback used");
    var o = e.querySelector("img");
    o && e.parentNode.replaceChild(o, e)
  }, e.getCookie = function (e) {
    var o = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([$()*+./?[\\\]^{|}])/g, "\\$1") + "=([^;]*)"));
    return o ? decodeURIComponent(o[1]) : void 0
  }, e.setCookie = function (e, o, n) {
    void 0 === n && (n = {});
    var i = n.expires;
    if ("number" == typeof i && i) {
      var t = new Date;
      t.setTime(t.getTime() + 1e3 * i), i = n.expires = t
    }
    i && i.toUTCString && (n.expires = i.toUTCString());
    var r = e + "=" + (o = encodeURIComponent(o));
    for (var c in n) {
      r += "; " + c;
      var d = n[c];
      !0 !== d && (r += "=" + d)
    }
    document.cookie = r
  }, e.deleteCookie = function (e) {
    setCookie(e, "", {
      expires: -1
    })
  }, e.getJsonFromUrl = function (e) {
    var o;
    if (e) {
      var n = location.href.indexOf("?");
      if (-1 === n) return [];
      o = location.href.substr(n + 1)
    } else o = location.search.substr(1);
    var d = {};
    return o.split("&").forEach(function (e) {
      if (e) {
        var o = (e = e.split("+").join(" ")).indexOf("="),
          n = -1 < o ? e.substr(0, o) : e,
          i = -1 < o ? decodeURIComponent(e.substr(o + 1)) : "",
          t = n.indexOf("[");
        if (-1 === t) d[decodeURIComponent(n)] = i;
        else {
          var r = n.indexOf("]", t),
            c = decodeURIComponent(n.substring(t + 1, r));
          n = decodeURIComponent(n.substring(0, t)), d[n] || (d[n] = []), c ? d[n][c] = i : d[n].push(i)
        }
      }
    }), d
  }, e.chunkSplit = function (e, o, n) {
    return void 0 === o && (o = 3), void 0 === n && (n = " "), (e += "").split("").reverse().join("").match(new RegExp(".{0," + o + "}", "g")).join(n).split("").reverse().join("").trim()
  }, e.preventBodyScrolling = function (e) {
    void 0 === e && (e = !1), document.body[!0 === e ? "addEventListener" : "removeEventListener"]("touchmove", o, !1)
  }
}(window);
void 0 === window.flexbe_cli && (window.flexbe_cli = {}), window.spaced_cli = window.flexbe_cli, flexbe_cli._init = function () {
  function l() {
    if (!flexbe_cli.isInited)
      if ("undefined" != typeof jQuery) {
        flexbe_cli.init(), flexbe_cli.isInited = !0;
        var i = ["ready"];
        i.push(flexbe_cli.run.is_touch ? "is-touch" : "is-pointer"), i.push(flexbe_cli.is_admin ? "is-editor" : "is-view");
        try {
          var e;
          (e = document.body.classList).add.apply(e, i)
        } catch (e) {
          document.body.className += " " + i.join(" ")
        }
        flexbe_cli.run.is_screenshoter || (window.onpopstate = function () {
          flexbe_cli.modal.popstate()
        }), svg4everybody({
          polyfill: !flexbe_cli.is_admin && (flexbe_cli.run.is_ie || flexbe_cli.run.is_EDGE)
        })
      } else setTimeout(l, 10)
  } ["complete", "loaded"].includes(document.readyState) ? l() : document.addEventListener("DOMContentLoaded", function () {
    l()
  }), window.addEventListener("load", function () {
    l(), flexbe_cli.isLoaded = !0
  })
};

function _typeof(t) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  })(t)
}
flexbe_cli.events = {
  init: function () {
    $.observable = function (n) {
      var i = {
        _JQInit: function () {
          this._JQ = $(this)
        },
        emit: function (t, n) {
          return !this._JQ && this._JQInit(), this._JQ.trigger(t, n), this
        },
        once: function (t, n) {
          return !this._JQ && this._JQInit(), this._JQ.one(t, n), this
        },
        on: function (t, n) {
          return !this._JQ && this._JQInit(), this._JQ.bind(t, n), this
        },
        off: function (t, n) {
          return !this._JQ && this._JQInit(), this._JQ.unbind(t, n), this
        }
      };
      return "object" !== _typeof(n) && (n = this), Object.keys(i).forEach(function (t) {
        n[t] = i[t].bind(n)
      }), i
    }, $.observable(this)
  }
};
flexbe_cli.run = {
  init: function () {
    this.deviceInfo()
  },
  deviceInfo: function () {
    var i = navigator.userAgent.toLowerCase();
    this.is_screen_tablet = 768 <= window.innerWidth && window.innerWidth <= 1024, this.is_screen_tablet_s = 570 <= window.innerWidth && window.innerWidth < 768, this.is_screen_mobile = window.innerWidth < 570, this.is_screen_mobile_s = window.innerWidth < 350, this.is_screen_all_mobile = this.is_screen_tablet_s || this.is_screen_mobile, this.is_screen_small_pc = 1024 < window.innerWidth && window.innerWidth < 1200, this.is_screen_pc = 1200 <= window.innerWidth, this.is_touch = "ontouchstart" in window, this.is_pointer = !this.is_touch, this.is_bot = /bot|aolbuild|bingpreview|msnbot|baidu|duckduckgo|mediapartners-google|teoma|slurp/gi.test(i), this.is_mobile = -1 !== i.indexOf("mobile") || this.is_screen_mobile || this.is_screen_tablet_s, this.is_desktop = !this.is_mobile, this.is_webkit = -1 !== i.indexOf("webkit"), this.is_safari = -1 !== i.indexOf("safari") && i.match(/version\/(\d+)/), this.is_firefox = -1 !== i.indexOf("firefox"), this.is_mobile_ie = -1 !== i.indexOf("iemobile"), this.is_ie = -1 !== i.indexOf("trident") || -1 !== i.indexOf("msie"), this.is_EDGE = -1 !== i.indexOf("edge"), this.is_OSX = /iPad|iPhone|iPod|Macintosh/gi.test(i), this.is_android = -1 !== i.indexOf("android"), this.is_ios = this.is_touch && this.is_mobile && this.is_OSX, this.is_screenshoter = -1 < i.indexOf("slimerjs") || -1 < i.indexOf("phantomjs"), this.is_screen_mobile ? this.device_type = "mobile" : this.is_screen_tablet_s || this.is_screen_tablet ? this.device_type = "tablet" : this.device_type = "desktop"
  }
};
flexbe_cli.lib = {
  init: function () {
    $(document).on("click.beforeLoadedLg", "[data-lg]", function (e) {
      e.preventDefault()
    }), this.lg.init()
  },
  lg: {
    init: function () {
      var i = this;
      if (!flexbe_cli.is_admin && 99 != flexbe_cli.theme_id) {
        var l = ".lg-container";
        $(l).filter(function (e, t) {
          return !$(t).parents(l).length
        }).on("mouseover.initLightGallery", function (e) {
          var t = $(e.currentTarget);
          t.off(".initLightGallery"), i.wrap(t)
        }), $(window).one("load.flexbe_lg", function () {
          i.required || i.require()
        })
      }
    },
    require: function (e) {
      $("[data-lg]").length && flexbe_cli.require(["/js/lg-spaced-bundle.min.js"], e), this.required = !0
    },
    wrap: function (e) {
      var t = !1,
        i = "1" === e.find(".component-slider").attr("data-loop"),
        l = !e.attr("data-lg-single");

      function n() {
        history.state && history.state.lg && history.replaceState(null, null, "#")
      }
      this.require(function () {
        e.lightGallery({
          selector: "[data-lg]:not(.swiper-slide-duplicate [data-lg])",
          counter: !0,
          download: !1,
          slideEndAnimation: !1,
          getCaptionFromTitleOrAlt: !0,
          closable: !0,
          loop: i,
          easing: "ease-out",
          hideBarsDelay: 6e3,
          zoomIcons: !1,
          actualSize: !1,
          enableSlide: l
        }), e.on("onBeforeOpen.lg", function () {
          t = !0, n(), history.state && history.state.lg || history.pushState({
            lg: !0
          }, null, "#image")
        }), e.on("onBeforeClose.lg", function () {
          history.state && history.state.lg && (t = !1, history.back()), n()
        }), $(document).off("click.beforeLoadedLg"), n(), window.addEventListener("popstate", function () {
          !t || history.state && history.state.lg || e.each(function (e, t) {
            var i = $(t),
              l = i.data("lightGallery");
            l && l.destroy()
          })
        })
      })
    }
  }
};
! function () {
  var f = [];
  flexbe_cli.require = function (t, n, i, e) {
    if (void 0 === t && (t = ""), void 0 === n && (n = function () {}), void 0 === i && (i = 15e3), void 0 === e && (e = !1), t && 0 !== t.length || n(!1), !e) {
      "string" == typeof t && (t = [t]);
      var o = 0,
        r = function (e) {
          var i = t.every(function (e) {
            return "boolean" == typeof f[e]
          });
          o += 1, i && o === t.length && n(e)
        };
      return Array.isArray(t) && t.forEach(function (e) {
        flexbe_cli.require(e, r, i, !0)
      }), !1
    }
    if (!0 === f[t]) n(!0);
    else if (Array.isArray(f[t])) f[t].push(n);
    else {
      var c, d = !1,
        s = function (i) {
          if (void 0 === i && (i = !0), !d) {
            d = !0, clearTimeout(c);
            var e = f[t];
            f[t] = i, e.forEach(function (e) {
              "function" == typeof e && e(i)
            })
          }
        };
      if (f[t] = [n], /\.css$/.test(t)) {
        var u = document.createElement("link");
        u.onerror = s.bind(this, !1), u.onload = s.bind(this, !0), c = setTimeout(s.bind(this, "timeout"), i), u.rel = "stylesheet", u.href = t, document.body.appendChild(u)
      } else {
        var a = document.createElement("script");
        a.onload = s.bind(this, !0), a.onerror = s.bind(this, !1), c = setTimeout(s.bind(this, "timeout"), i), a.async = !0, a.src = t, document.body.appendChild(a)
      }
    }
  }
}();

function _extends() {
  return (_extends = Object.assign || function (t) {
    for (var n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      for (var e in r) Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e])
    }
    return t
  }).apply(this, arguments)
}
flexbe_cli.lang = _extends({
  current: "ru",
  currency: "₽",
  country: "RUS",
  locale: {},
  init: function (t) {
    var c = this;
    void 0 === t && (t = "body"), $("[data-lang]", t).each(function (t, n) {
      var r = $(n).attr("data-lang"),
        e = $(n).attr("data-lang-content"),
        a = String(c.get(r));
      $(n).html(a.replace(/%s/, e))
    })
  },
  get: function (t) {
    if (t) return "currency" === t ? this.currency : String(t).split(".").reduce(function (t, n) {
      return t && t[n]
    }, this.locale) || ""
  }
}, flexbe_cli.lang);
flexbe_cli.resize = {
  width: window.innerWidth,
  height: window.innerHeight,
  oldWidth: window.innerWidth,
  oldHeight: window.innerHeight,
  init: function () {
    this.simulateWindowResized(), this.simulateDocumentResize()
  },
  simulateWindowResized: function () {
    var i, e = this,
      t = this.oldWidth,
      n = this.oldHeight;
    $(window).on("resize orientationchange", function () {
      e.width = window.innerWidth, e.height = window.innerHeight, clearTimeout(i), i = setTimeout(function () {
        e.oldWidth = t, e.oldHeight = n, t = e.width, n = e.height, flexbe_cli.run.deviceInfo(), $(window).trigger("resized")
      }, 80)
    })
  },
  simulateDocumentResize: function () {
    var e = this;
    this.documentHeight = document.body.scrollHeight;
    var i = flexbe_cli.is_admin ? 500 : 150;
    setInterval(function () {
      ! function () {
        if (!flexbe_cli.scroll.inScroll) {
          var i = document.body.scrollHeight;
          3 < Math.abs(i - e.documentHeight) && (e.documentHeight = i, $(window).trigger("documentresize"))
        }
      }()
    }, i)
  }
};
flexbe_cli.scroll = {
  inScroll: !1,
  latest: window.pageYOffset,
  init: function () {
    var e = this;
    this.latest = window.pageYOffset, document.addEventListener("scroll", function () {
      e.latest = window.pageYOffset, e.inScroll = !0
    }, {
      passive: !0
    }), document.addEventListener("scrollend", function () {
      e.inScroll = !1
    }, {
      passive: !0
    }), this.scrollImprovement.init()
  },
  scrollImprovement: {
    scrollTimer: 0,
    pointerState: !1,
    init: function () {
      this.createStopScrollEvent(), this.pointerEvents()
    },
    createStopScrollEvent: function () {
      var t = this,
        n = flexbe_cli.scroll.latest;
      document.addEventListener("scroll", function () {
        var e = n > flexbe_cli.scroll.latest ? "up" : "down";
        clearTimeout(t.scrollTimer), t.scrollTimer = setTimeout(function () {
          n = flexbe_cli.scroll.latest, document.dispatchEvent(new CustomEvent("scrollend", {
            detail: {
              direction: e
            }
          }))
        }, 200)
      }, {
        passive: !0
      })
    },
    pointerEvents: function () {
      var e = this;
      flexbe_cli.is_admin || (document.addEventListener("scroll", function () {
        e.pointerState || (e.pointerState = !0, document.body.classList.add("disable-pointer-events"))
      }, {
        passive: !0
      }), document.addEventListener("scrollend", function () {
        e.pointerState && (e.pointerState = !1, document.body.classList.remove("disable-pointer-events"))
      }))
    }
  }
};

function _typeof(e) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  })(e)
}
flexbe_cli.stat = {
  u_id: 0,
  time: 0,
  goals: {
    quiz: "quiz_start",
    modal: "modal_open",
    modal_form: "form_open",
    modal_product: "product_show",
    modal_done: "order_done",
    cart: "add_to_cart",
    link: "link_open",
    file: "file_load",
    close: "modal_close"
  },
  init: function () {
    var e = getCookie("user_id");
    if (flexbe_cli.is_admin || flexbe_cli.run.is_bot || flexbe_cli.run.is_screenshoter || !flexbe_cli.p_id || e) return !1;
    var t = getCookie("f_uid");
    t ? (this.u_id = t, this.user_visit()) : this.user_create(), this.AB.init(), this.ecommerce.init()
  },
  getGoal: function (e, t) {
    return "modal" === e && (/form/.test(t) && (e = "modal_form"), /done/.test(t) ? e = "modal_done" : /product/.test(t) && (e = "modal_product")), this.goals[e] || !1
  },
  reach_goal: function (e, t) {
    if (t = void 0 !== t ? t : {}, !flexbe_cli.is_admin) try {
      if (flexbe_cli.yandex_id) var i = setInterval(function () {
        if ("undefined" == typeof Ya || "object" !== _typeof(Ya._metrika.counter)) return !1;
        clearInterval(i), Ya._metrika.counter.reachGoal(e, t)
      }, 50);
      "function" == typeof ga && ga("send", "event", e, "send")
    } catch (e) {}
  },
  ecommerce: {
    currencyCodes: {
      "€": {
        code: "EUR",
        name: "Евро"
      },
      Br: {
        code: "BYR",
        name: "Белорусский Рубль"
      },
      "₴": {
        code: "UAH",
        name: "Гривна"
      },
      "грн.": {
        code: "UAH",
        name: "Гривна"
      },
      "₸": {
        code: "KZT",
        name: "Тенге"
      },
      "тңг": {
        code: "KZT",
        name: "Тенге"
      }
    },
    currencyCode: "RUB",
    initialized: !1,
    init: function () {
      flexbe_cli.lang.currency && this.currencyCodes[flexbe_cli.lang.currency] && (this.currencyCode = this.currencyCodes[flexbe_cli.lang.currency].code), this.initialized = !0, window.dataLayer || (window.dataLayer = [])
    },
    add: function (e, t, i, o) {
      this.initialized && window.dataLayer.push({
        ecommerce: {
          currencyCode: this.currencyCode,
          add: {
            products: [{
              id: e,
              name: t,
              price: o,
              quantity: i
            }]
          }
        }
      })
    },
    remove: function (e, t) {
      this.initialized && window.dataLayer.push({
        ecommerce: {
          currencyCode: this.currencyCode,
          remove: {
            products: [{
              id: e,
              name: t
            }]
          }
        }
      })
    },
    purchase: function (e, t) {
      if (void 0 === t && (t = !1), this.initialized && (e || 0 != e.length)) {
        t || (t = Math.ceil(1e4 * Math.random()));
        try {
          window.dataLayer.push({
            ecommerce: {
              currencyCode: this.currencyCode,
              purchase: {
                actionField: {
                  id: t
                },
                products: e.map(function (e) {
                  return {
                    id: e.id,
                    name: e.title,
                    price: e.price,
                    quantity: e.count
                  }
                })
              }
            }
          })
        } catch (e) {}
      }
    }
  },
  get_utm: function () {
    var e = function (e) {
        if ("" === e) return {};
        for (var t = {}, i = 0; i < e.length; ++i) {
          var o = e[i].split("=");
          2 == o.length && (t[o[0]] = decodeURIComponent(o[1].replace(/\+/g, " ")))
        }
        return t
      }(window.location.search.substr(1).split("&")),
      i = {};
    return $.each(e, function (e, t) {
      "utm_" === e.substring(0, 4) && (i[e] = t)
    }), document.referrer && (i.url = document.referrer), i
  },
  user_create: function () {
    var t = this;
    $.ajax({
      url: "/mod/stat/",
      type: "POST",
      dataType: "json",
      data: {
        s_id: flexbe_cli.s_id,
        group_id: flexbe_cli.group_id,
        p_id: flexbe_cli.p_id,
        utm_data: this.get_utm(),
        device: {
          type: flexbe_cli.run.device_type,
          width: window.innerWidth,
          browser: navigator.userAgent
        }
      }
    }).done(function (e) {
      "object" == _typeof(e) && null !== e && e.u_id ? (setCookie("f_uid", e.u_id, {
        Path: "/"
      }), t.u_id = e.u_id) : console.warn("cookie не установлена", e)
    })
  },
  user_visit: function () {
    $.ajax({
      url: "/mod/stat/visit/",
      type: "POST",
      dataType: "json",
      data: {
        s_id: flexbe_cli.s_id,
        group_id: flexbe_cli.group_id,
        p_id: flexbe_cli.p_id,
        u_id: this.u_id
      }
    }).done($.proxy(function (e) {
      e.v_id || console.warn("cookie визита не установлена", e)
    }, this))
  },
  AB: {
    init: function () {
      var o = this;
      flexbe_cli.events.off("entity_event.abstat").on("entity_event.abstat", function (e, t) {
        if (t && "screen" === t.type && t.state && t.core && "block" === t.core.is) {
          var i = t.core.$area;
          o.fixview(i.attr("data-abtest-id"), i.attr("data-abtest-variant"))
        }
      })
    },
    setcookie: function (e) {
      setCookie("f_ab", JSON.stringify(e), {
        expires: 604800,
        path: "/",
        domain: document.location.hostname
      })
    },
    getcookie: function () {
      var t = !0,
        e = getCookie("f_ab");
      if (e) try {
        e = JSON.parse(decodeURIComponent(e)), t = !1
      } catch (e) {
        console.warn("cant parse abtest cookie", e), t = !0
      }
      return t && (e = {
        view: {},
        lead: []
      }), e
    },
    proccess: {},
    fixview: function (i, o) {
      if (void 0 === i || void 0 === o || "a" != o && "b" != o) return !1;
      void 0 !== this.getcookie().view[i] || this.proccess[i] || (this.proccess[i] = !0, $.ajax({
        url: "/mod/stat/abtest",
        type: "POST",
        dataType: "json",
        data: {
          test_id: i,
          variant: o,
          s_id: flexbe_cli.s_id,
          p_id: flexbe_cli.p_id
        }
      }).done($.proxy(function (e) {
        if (this.proccess[i] = !1, 1 == e.status) {
          var t = flexbe_cli.stat.AB.getcookie();
          t.view[i] = o, flexbe_cli.stat.AB.setcookie(t)
        }
      }, this)))
    },
    fixlead: function (e) {
      if (flexbe_cli.bill && 1 != flexbe_cli.bill.abtest) return !1;
      if (0 < e.length) {
        var t = this.getcookie(),
          i = $.merge(t.lead, e);
        t.lead = $.grep(i, function (e, t) {
          return $.inArray(e, i) === t
        }), this.setcookie(t)
      }
    }
  }
};

function _typeof(t) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  })(t)
}
var EntityCore = function () {
  function t(t, i) {
    var n = this;
    void 0 === i && (i = {});
    var e = $(t),
      s = e.attr("data-is"),
      o = e.attr("data-id"),
      r = e.attr("data-mod-id") || 0,
      a = "zone" === s ? "e" : s[0],
      h = e.attr("data-" + a + "-id"),
      c = e.data(a + "Type") || [],
      f = e.data("components") || !0;
    this.require = [], this.$area = e, this.area = e[0], this.$root = e, this.root = e[0], this.is = s, this.id = o, this.template_id = h, this.mod_id = r, this.type = c, this.components = f, this.tween = {}, this.isVisible = !1, this.isBeside = !1, this.isView = !1, this.isFocused = !1, Object.keys(i).forEach(function (t) {
      var e = i[t];
      "object" === _typeof(e) ? n[t] = $.extend(!0, Array.isArray(e) ? [] : {}, e) : n[t] = e
    })
  }
  var e = t.prototype;
  return e.onInit = function () {}, e.onUpdate = function () {}, e.onLoad = function () {}, e.onReady = function () {}, e.onBeside = function () {}, e.onFocus = function () {}, e.onScreen = function () {}, e.onView = function () {}, e.onMsg = function () {}, e.onResize = function () {}, e.getNested = function () {
    if (4 !== flexbe_cli.theme_id) return [];
    if (this._nestedElementsCache) return this._nestedElementsCache;
    var t = $(".content-zone, .element-item", this.area).toArray().map(function (t) {
      return flexbe_cli.element.bind(t).core || !1
    }).filter(function (t) {
      return t
    });
    return flexbe_cli.is_admin || (this._nestedElementsCache = t), t
  }, e.init = function (t) {
    var e = this,
      i = this.inited ? "update" : "init";
    "init" === i ? this._onInit(t) : "update" === i && this._onUpdate(t), ("init" === i || t.templateRendered) && flexbe_cli.require(this.require, function () {
      e._onLoad(t)
    })
  }, e._onInit = function (t) {
    this.inited = !0, this._tween(), this.onInit(t), flexbe_cli.events.emit("entity_event", {
      type: "inited",
      core: this,
      params: t
    })
  }, e._onLoad = function (t) {
    this.loaded = !0, this.onLoad(t), this.onReady(t), this._tween({
      force: !0
    })
  }, e._onUpdate = function (t) {
    this.updated = !0, (t.templateRendered || t.styleRendered) && this._tween(), this.onUpdate(t), flexbe_cli.events.emit("entity_event", {
      type: "updated",
      core: this,
      params: t
    })
  }, e._onResize = function (t) {
    this._tween() && (this.onResize(t), flexbe_cli.events.emit("entity_event", {
      type: "resize",
      core: this,
      params: t
    }), this.$area.trigger("onResize", {}))
  }, e._onMsg = function (t, e) {
    this.onMsg(t, e)
  }, e._onFocus = function (t) {
    var e = t.state;
    if (this.isFocused !== e) {
      this.isFocused = e, this.onFocus(e), flexbe_cli.events.emit("entity_event", {
        type: "focus",
        core: this,
        state: e
      }), this.$area.trigger("onFocus", {
        state: e
      })
    }
  }, e._onScreen = function (t) {
    var e = t.state;
    if (this.isVisible !== e) {
      this.isVisible = e, this.onScreen(e), flexbe_cli.events.emit("entity_event", {
        type: "screen",
        core: this,
        state: e
      }), this.$area.trigger("onScreen", {
        state: e
      })
    }
  }, e._onView = function (t) {
    var e = t.state;
    if (this.isView !== e) {
      this.isView = e, this.onView(e), flexbe_cli.events.emit("entity_event", {
        type: "view",
        core: this,
        state: e
      }), this.$area.trigger("onView", {
        state: e
      })
    }
  }, e._onBeside = function (t) {
    var e = t.state;
    if (this.isBeside !== e) {
      this.isBeside = e, this.onBeside(e), flexbe_cli.events.emit("entity_event", {
        type: "beside",
        core: this,
        state: e
      }), this.$area.trigger("onBeside", {
        state: e
      })
    }
  }, e._tween = function () {
    var t = this.area.offsetWidth,
      e = this.area.offsetHeight,
      i = t !== this.tween.width || e !== this.tween.height;
    return this.tween.width = t, this.tween.height = e, i
  }, t
}();

function _inheritsLoose(e, t) {
  e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t
}
var BlockCore = function (n) {
  function e(e, t) {
    var i;
    return (i = n.call(this, e, t) || this).is = "block", i.$block = i.$area, i
  }
  _inheritsLoose(e, n);
  var t = e.prototype;
  return t._onInit = function (e) {
    flexbe_cli.block.fixCoverHeight(this.$area), n.prototype._onInit.call(this, e)
  }, t._onUpdate = function (e) {
    e.templateRendered && flexbe_cli.block.fixCoverHeight(this.$area), n.prototype._onUpdate.call(this, e)
  }, t._tween = function (e) {
    var t = (void 0 === e ? {} : e).force,
      i = void 0 !== t && t,
      l = this,
      n = this.area.offsetWidth,
      c = this.area.offsetHeight,
      o = this.area.offsetTop,
      s = n !== this.tween.width || c !== this.tween.height;
    this.tween.width = n, this.tween.height = c, this.tween.start = o, this.tween.end = o + c, i && (this.isVisible = null, this.isBeside = null, this.isView = null, this.isFocused = null);
    var r = this.$area.find(".container")[0];
    return this.tween.color = r && getComputedStyle(r).color || "#fff", h(), $(window).off("scroll.tween_" + this.id).on("scroll.tween_" + this.id, $.throttle(h, 50)), s;

    function h() {
      if (!l.inited) return !1;
      var e, t, i, n = Math.max(flexbe_cli.resize.height - c, 0),
        o = 1 / l.tween.height * (window.pageYOffset - l.tween.start),
        s = (e = window.pageYOffset + flexbe_cli.resize.height / 2, t = l.tween.start + l.tween.height / 2, (e - t + l.tween.height / 2) / l.tween.height),
        r = (i = l.tween.start - flexbe_cli.resize.height, 1 / (l.tween.end - i) * (window.pageYOffset - i));
      l.tween.fix = n, l.tween.position = o, l.tween.positionAbs = r;
      var h = 0 < (l.tween.positionCenter = s) && s < 1,
        w = function () {
          if (!l.tween.width) return !1;
          var e = flexbe_cli.resize.height >= l.tween.height ? l.tween.height / 4 : flexbe_cli.resize.height / 3;
          return window.pageYOffset + flexbe_cli.resize.height > l.tween.start + e && window.pageYOffset < l.tween.end - e
        }(),
        f = function () {
          if (!l.tween.width) return !1;
          return 0 <= l.tween.positionAbs && l.tween.positionAbs <= 1
        }(),
        a = function () {
          if (!l.tween.width) return !1;
          return -.2 <= l.tween.positionAbs && l.tween.positionAbs <= 1.2
        }();
      l.tween.focus = h, l.tween.view = w, l.tween.onscreen = f, l.tween.beside = a, l._onBeside({
        state: a
      }), l._onScreen({
        state: f
      }), l._onView({
        state: w
      }), l._onFocus({
        state: h
      })
    }
  }, e
}(EntityCore);

function _inheritsLoose(e, o) {
  e.prototype = Object.create(o.prototype), (e.prototype.constructor = e).__proto__ = o
}
var ModalCore = function (s) {
  function e(e, o) {
    var t;
    return (t = s.call(this, e, o) || this).is = "modal", t.isOpen = !1, t.$modal = t.$area, t.$list = flexbe_cli.modal.$list, t
  }
  _inheritsLoose(e, s);
  var o = e.prototype;
  return o.open = function (e, o) {
    var t = this;
    void 0 === o && (o = {}), this.isOpen = !0, flexbe_cli.block.pushOverlay("modal", !0), this.lastOptions = o, this.lastScroll = flexbe_cli.scroll.latest;
    var s = this.$area.find(".modal-data > ._anchor").attr("name") || this.id;
    flexbe_cli.lockPopstate = !0, location.hash = "#" + s, flexbe_cli.lockPopstate = !1, this.$list.addClass("show"), this.$area.addClass("show"), setTimeout(function () {
      t.$list.addClass("overlay"), t._onOpen(e), t._onScreen({
        state: !0
      }), t._onBeside({
        state: !0
      }), t._onView({
        state: !0
      }), t._onFocus({
        state: !0
      }), "function" == typeof o.onOpen && o.onOpen(t)
    }, 30), $("body").addClass("is-modal-open"), flexbe_cli.run.is_desktop ? $("body").addClass("overflow") : flexbe_cli.run.is_screen_all_mobile && $("body, html").scrollTop(0)
  }, o.close = function (e) {
    var o = (void 0 === e ? {} : e).from,
      t = this.lastOptions;
    this.lastOptions = {}, this.isOpen = !1, flexbe_cli.block.removeOverlay("modal"), /^#{1,2}/.test(location.hash) && (flexbe_cli.lockPopstate = !0, location.hash = "##", flexbe_cli.lockPopstate = !1), this.$area.removeClass("show"), o || ($("body").removeClass("overflow"), this.$list.removeClass("show overlay")), this._onClose(), this._onScreen({
      state: !1
    }), this._onBeside({
      state: !1
    }), this._onView({
      state: !1
    }), this._onFocus({
      state: !1
    }), "function" == typeof t.onClose && t.onClose(this), $("body").removeClass("is-modal-open"), flexbe_cli.run.is_screen_all_mobile && $("body, html").scrollTop(this.lastScroll)
  }, o._onOpen = function (e) {
    this._tween(), this.onOpen(e), flexbe_cli.events.emit("entity_event", {
      type: "opened",
      core: this,
      data: e
    })
  }, o._onClose = function () {
    this.onClose(), flexbe_cli.events.emit("entity_event", {
      type: "closed",
      core: this
    })
  }, o.onOpen = function () {}, o.onClose = function () {}, e
}(EntityCore);

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), (t.prototype.constructor = t).__proto__ = o
}
var WidgetCore = function (r) {
  function t(t, o) {
    var e;
    return (e = r.call(this, t, o) || this).is = "widget", e.$widget = e.$area, e
  }
  return _inheritsLoose(t, r), t.prototype._tween = function () {}, t
}(EntityCore);
flexbe_cli.components = {
  instances: {},
  classes: {},
  helpers: {},
  init: function () {
    var o = this,
      i = this.instances;
    this.links(), flexbe_cli.lang.init(), flexbe_cli.events.on("entity_event.components_init", function (e, t) {
      if (!(t && t.type && t.core && t.core.id)) return !1;
      var n = i[t.core.id] || [];
      "inited" === t.type || "updated" === t.type && t.params.templateRendered ? (o.initComponents({
        core: t.core,
        reason: t.type,
        params: t.params
      }), flexbe_cli.lang.init(t.core.area)) : /resize/.test(t.type) ? n.forEach(function (e) {
        return e._onResize({
          core: t.core,
          reason: t.type,
          params: t.params
        })
      }) : /screen/.test(t.type) ? n.forEach(function (e) {
        return e._onView({
          state: t.state
        })
      }) : /focus/.test(t.type) ? n.forEach(function (e) {
        return e._onFocus({
          state: t.state
        })
      }) : /beside/.test(t.type) ? n.forEach(function (e) {
        return e._onBeside({
          state: t.state
        })
      }) : /open/.test(t.type) && "modal" === t.core.is ? n.forEach(function (e) {
        e._onOpen({
          data: t.data
        })
      }) : /close/.test(t.type) && "modal" === t.core.is && n.forEach(function (e) {
        e._onClose({
          data: t.data
        })
      })
    }), $(window).off("load.core_components").one("load.core_components", function () {
      Object.values(i).forEach(function (e) {
        e.forEach(function (e) {
          return e._onPageLoad()
        })
      })
    })
  },
  initComponents: function (e) {
    var s = this,
      t = void 0 === e ? {} : e,
      l = t.core,
      n = t.reason,
      f = void 0 === n ? "inited" : n,
      o = t.force,
      m = void 0 !== o && o,
      i = l.id,
      a = l.$area,
      r = l.components,
      c = !1;
    if (!0 === r ? c = "[data-component]" : Array.isArray(r) && (c = r.map(function (e) {
        return '[data-component^="' + e + '"]'
      }).join(", ")), c) {
      var d = a.find(c).toArray(),
        p = {};
      this.instances[i] = d.map(function (e) {
        var t = [],
          n = String(e.getAttribute("data-component")).trim().split(":"),
          o = n[0],
          i = n[1];
        i && (t = String(i).replace(/^\[|\]$/g, "").split(",")), void 0 === p[o] && (p[o] = 0);
        var a = p[o];
        if (p[o] += 1, e.componentInstance && !m) return e.componentInstance.index = a, e.componentInstance;
        var r = s.classes[o];
        if ("function" == typeof r) {
          var c = new r({
            args: t,
            component: e,
            index: a,
            core: l,
            reason: f
          });
          if (c instanceof BaseComponent) return (e.componentInstance = c)._onInit(), l.isVisible && c._onView({
            state: !0
          }), c
        }
        return !1
      }).filter(function (e) {
        return e
      })
    }
    if (this.instances[i] && !this.instances[i].length) return delete this.instances[i], !1
  },
  links: function (e) {
    void 0 === e && (e = "body"), $(e).off("click.component-links").on("click.component-links", "a[href], a[data-action]", function (e) {
      var t = $(e.currentTarget).attr("href"),
        n = $(e.currentTarget).attr("data-action");
      if (t || n) {
        if (/#{1,2}.+/.test(t)) {
          if (1 === flexbe_cli.theme_id) $(e.currentTarget).closest(".mobile-menu").removeClass("active");
          else $("body > .mobile-menu").trigger("close"), $("body").removeClass("overflow fixed");
          var o = (t = t.replace(/^(?:\.\/)#{2}/, "#").trim()).trim().split("#"),
            i = "" === o[0] || "./" === o[0] ? location.pathname : o[0],
            a = o[o.length - 1];
          if (i !== location.pathname) return !0;
          var r = flexbe_cli.block.$list.find(".b_" + a + ', ._anchor[name="' + a + '"]').eq(0),
            c = flexbe_cli.modal.$list.find(".m_" + a + ', ._anchor[name="' + a + '"]').eq(0);
          if (flexbe_cli.events.emit("mobilemenu_command", {
              command: "close"
            }), r.length) {
            var s = r.closest(".b_block");
            flexbe_cli.events.emit("modal_command", {
              command: "close"
            }), flexbe_cli.block.scrollTo(s), window.location.hash = "#" + a
          } else if (c.length) {
            if (flexbe_cli.is_admin) return !0;
            var l = c.closest(".m_modal").data("id");
            flexbe_cli.events.emit("modal_command", {
              command: "open",
              id: l,
              data: {}
            })
          }
          e.preventDefault(), e.stopPropagation()
        } else if ("button" === n) {
          var f = $(e.currentTarget).closest("[data-item-id]").find(".component-button");
          f[0] && f[0].click()
        }
        return t && flexbe_cli.is_admin && (e.preventDefault(), e.stopPropagation()), !0
      }
    })
  }
};
var BaseComponent = function () {
  function i(i) {
    var n = this,
      t = i.component,
      e = i.index,
      o = i.core,
      s = i.reason;
    this.core = o, this.owner = o.area, this.root = o.root, this.index = e || 0, this.component = t, this.$component = $(t), this.require = [], this.isPageLoaded = flexbe_cli.isLoaded || !1, this.isUpdated = "updated" === s, this.isLoaded = !1, this.isInited = !1, this.isViewed = !1, this.isBesided = !1, this.inView = !1, this.inBeside = !1, Object.defineProperty(this, "isVisible", {
      get: function () {
        return n.$component.is(":visible")
      },
      enumerable: !0,
      configurable: !0
    })
  }
  var n = i.prototype;
  return n.onInit = function () {}, n.onLoad = function () {}, n.onView = function () {}, n.onBeside = function () {}, n.onPageLoad = function () {}, n.onResize = function () {}, n.onFocus = function () {}, n.onOpen = function () {}, n.onClose = function () {}, n._onInit = function () {
    var i = this;
    "function" == typeof this.onInit && this.onInit(), flexbe_cli.require(this.require, function () {
      i._onLoad()
    }), this.isInited = !0
  }, n._onLoad = function () {
    "function" == typeof this.onLoad && this.onLoad(), this.isLoaded = !0
  }, n._onView = function (i) {
    var n = i.state;
    this.inView = n, this.onView({
      state: n,
      isFirst: n && !this.isViewed
    }), n && (this.isViewed = !0)
  }, n._onFocus = function (i) {
    var n = i.state;
    this.inFocus = n, this.onFocus({
      state: n,
      isFirst: n && !this.isFocused
    }), n && (this.isFocused = !0)
  }, n._onResize = function (i) {
    this.onResize(i)
  }, n._onOpen = function (i) {
    this.onOpen(i)
  }, n._onClose = function (i) {
    this.onClose(i)
  }, n._onBeside = function (i) {
    var n = i.state;
    this.inBeside = n, this.onBeside({
      state: n,
      isFirst: n && !this.isBesided
    }), n && (this.isBesided = !0)
  }, n._onPageLoad = function () {
    this.onPageLoad(), this.isPageLoaded = !0
  }, i
}();

function _typeof(i) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (i) {
    return typeof i
  } : function (i) {
    return i && "function" == typeof Symbol && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i
  })(i)
}

function _inheritsLoose(i, t) {
  i.prototype = Object.create(t.prototype), (i.prototype.constructor = i).__proto__ = t
}! function () {
  var a = function () {
      function i(i, t, e) {
        var o = this;
        this.id = i, this.params = e, this.pending = !1, this.visible = !1, this.size = !1, this.imSize = {
          w: 0,
          h: 0
        }, this.$outer = $(".parallax-outer", t), this.overlay = $(".overlay", t).get(0), this.canvas = $("canvas", this.$outer).get(0), this.offScreen = document.createElement("canvas"), this.ovOp = +$(this.overlay).css("opacity"), this.factor = 1 === e.parallax || 2 === e.parallax ? .3 : 0, this.zoomRatio = 3 === e.parallax || 4 === e.parallax ? .2 : 0, this.zoomType = 3 === e.parallax || 4 === e.parallax ? 2 : 0, this.zoomD = 3 === e.parallax ? .5 : 4 === e.parallax ? 1 : 0, this.fadeout = 1 === e.parallax ? 0 : 3 === e.parallax ? .5 : 1;
        var a = 1.5 <= window.devicePixelRatio ? 1960 / window.devicePixelRatio : 1960,
          s = this.$outer.width(),
          n = this.$outer.height(),
          r = this.$outer.offset() || {};
        this.blSize = {
          w: s <= a ? s : a
        }, this.blSize.r = this.blSize.w / s, this.blSize.h = this.blSize.r * n, this.blSize.x = this.blSize.r * r.top, this.winSize = {
          w: $("window").width() * this.blSize.r,
          h: $("window").height() * this.blSize.r
        }, this.blSizeOr = {
          w: s,
          h: n,
          x: r.top
        }, this.offCtx = this.offScreen.getContext("2d", {
          alpha: !1
        }), this.canvas.width = 0, this.canvas.height = 0, this.ctx = this.canvas.getContext("2d", {
          alpha: !1
        }), this.img = document.createElement("img"), this.position = {
          x: +this.$outer.data("bg-pos-x").replace("%", "") / 100,
          y: +this.$outer.data("bg-pos-y").replace("%", "") / 100
        }, this.dispatchEvents(), this.img.onload = function () {
          o.loaded = !0, o.imSize = {
            w: o.img.width,
            h: o.img.height
          }, o.imSize.r = o.imSize.h / o.imSize.w, o.updateCanvasSource(), setTimeout(function () {
            o.$outer.addClass("ready")
          }, 30)
        }, this.img.src = this.$outer.attr("data-image")
      }
      var t = i.prototype;
      return t.dispatchEvents = function () {
        var e = this;
        $(window).off("resized." + this.id + " documentresize." + this.id).on("resized." + this.id + " documentresize." + this.id, function () {
          e.updateCanvasSource()
        }), $(window).off("scroll.component-bg-" + this.id).on("scroll.component-bg-" + this.id, function () {
          e.pending || (e.pending = !0, e.updateInst())
        }), flexbe_cli.events.off("editor_change.bg_" + this.id).on("editor_change.bg_" + this.id, function (i, t) {
          t.entity && t.entity.id == e.id && "editor_settings" === t.reason && (e.ovOp = .01 * t.entity.data.background.opacity, e.pending || (e.pending = !0, e.updateInst()))
        }), flexbe_cli.events.off("layout_change.bg_" + this.id).on("layout_change.bg_" + this.id, function (i, t) {
          t && t.test && t.test.current && t.test[t.test.current] === e.id && e.updateCanvasSource()
        })
      }, t.toggleRendering = function (i) {
        if ("boolean" != typeof i) return !1;
        i !== this.visible && (this.visible = i, $(this.overlay).toggleClass("will-change", i))
      }, t.getCosPoint = function (i, t, e) {
        return void 0 === e && (e = 1), e < 1 - i && (i = e), (1 - Math.cos(Math.PI * i * t)) / 2
      }, t.getZoomCoords = function (i) {
        var t = 1 === this.zoomType ? i : -1 === this.zoomType ? 100 - i : 2 === this.zoomType ? 100 - 100 * this.getCosPoint(.01 * i, 2, this.zoomD) : 0,
          e = {
            ratio: this.zoomRatio / 100 * t
          };
        return e.w = this.blSize.w * (1 + e.ratio), e.h = this.blSize.h * (1 + e.ratio), e.x = (e.w - this.canvas.width) / 2, e.y = (e.h - this.blSize.h) / 2, e
      }, t.draw = function (i, t) {
        var e, o = this;
        if (this.fadeout && (e = 1 - (1 - this.ovOp) * this.getCosPoint(.01 * t, 2, this.fadeout)), this.zoomRatio) {
          var a = this.getZoomCoords(t);
          requestAnimationFrame(function () {
            o.overlay.style.opacity = e, o.ctx.drawImage(o.offScreen, Math.ceil(-1 * a.x), Math.ceil(i * o.factor - o.winSize.h * o.factor - a.y), a.w, a.h), o.pending = !1
          })
        } else {
          var s = Math.ceil(i * this.factor - this.winSize.h * this.factor);
          requestAnimationFrame(function () {
            o.overlay.style.opacity = e, o.ctx.drawImage(o.offScreen, 0, s), o.pending = !1
          })
        }
      }, t.updateInst = function () {
        if (this.winSize.x = (window.scrollY || window.pageYOffset) * this.blSize.r, this.winSize.x + this.winSize.h > this.blSize.x - 200 && this.winSize.x < this.blSize.x + this.blSize.h) {
          this.toggleRendering(!0);
          var i = this.winSize.x + this.winSize.h - this.blSize.x,
            t = 100 - i / (this.blSize.h + this.winSize.h) * 100;
          this.draw(i, t)
        } else this.toggleRendering(!1), this.pending = !1
      }, t.prerender = function () {
        this.loaded && (this.fitToOuter(), this.offScreen.width = this.blSize.w, this.offScreen.height = this.zoomRatio ? this.blSize.h : Math.ceil(this.size.offH), this.drawOffscreenImage(this.position.x, this.position.y))
      }, t.updateCanvasSource = function () {
        this.prerender(), this.updateInst()
      }, t.drawOffscreenImage = function (i, t) {
        (i = "number" == typeof i ? i : .5) < 0 && (i = 0), (t = "number" == typeof t ? t : .5) < 0 && (t = 0), 1 < i && (i = 1), 1 < t && (t = 1);
        var e, o, a, s, n = this.offCtx.canvas.width,
          r = this.offCtx.canvas.height;
        r / n <= this.imSize.r ? (e = 0, o = ((s = (a = n) * this.imSize.r) - r) * t * -1) : (o = 0, e = ((a = (s = r) / this.imSize.r) - n) * i * -1), this.offCtx.drawImage(this.img, e, o, a, s)
      }, t.fitToOuter = function () {
        var i = 1.5 <= window.devicePixelRatio ? 1600 : 1960;
        this.blSize = {
          w: this.$outer.width() <= i ? this.$outer.width() : i
        }, this.blSize.r = this.blSize.w / this.$outer.width(), this.blSize.h = this.blSize.r * this.$outer.height(), this.blSize.x = this.blSize.r * this.$outer.offset().top, this.winSize = {
          w: $(window).width() * this.blSize.r,
          h: $(window).height() * this.blSize.r
        }, this.canvas.width = this.blSize.w, this.canvas.height = this.blSize.h, this.canvas.style.transform = "scale(" + 1 / this.blSize.r + ")";
        var t, e = Math.max(this.winSize.h, this.blSize.h),
          o = e - (e - Math.min(this.winSize.h, this.blSize.h)) * (this.blSize.h > this.winSize.h ? this.factor : 1 - this.factor),
          a = o / this.blSize.w;
        (t = this.imSize.r >= a ? {
          w: this.blSize.w,
          h: this.blSize.w * this.imSize.r
        } : {
          h: o,
          w: o / this.imSize.r
        }).offH = o, t.x = (t.w - this.blSize.w) / 2, this.size = t
      }, t.destroy = function () {
        this.destroyed = !0, $(window).off("resize." + this.id + " documentresize." + this.id), $(window).off("scroll.component-bg-" + this.id), flexbe_cli.events.off("editor_change.bl.bg_" + this.id), this.$outer.removeClass("ready"), this.offScreen.remove(), this.img.remove()
      }, i
    }(),
    i = function (s) {
      function i() {
        for (var i, t = arguments.length, e = new Array(t), o = 0; o < t; o++) e[o] = arguments[o];
        var a = (i = s.call.apply(s, [this].concat(e)) || this).$component;
        return i.data = {
          type: a.data("type") || "color",
          parallax: a.data("parallax") || 0,
          video: a.data("video") || !1,
          videoParallaxFactor: .6
        }, i.data.parallax && flexbe_cli.run.is_mobile && (flexbe_cli.run.is_screen_mobile_s || flexbe_cli.run.is_screen_all_mobile && "video" === i.data.type) && (i.data.parallax = 0), i
      }
      _inheritsLoose(i, s);
      var t = i.prototype;
      return t.onInit = function () {
        this.loadImage(), this.imageParallaxInit(), this.videoParallaxInit()
      }, t.onView = function (i) {
        if (!i.state || this.isViewed || this.isBesided) return !1;
        this.playVideo()
      }, t.onBeside = function (i) {
        if (!i.state || this.isViewed || this.isBesided) return !1;
        this.playVideo()
      }, t.loadImage = function () {
        if (!flexbe_cli.is_admin) {
          var i, t = this.$component,
            e = t.find(".image, .parallax-outer"),
            o = e.find(".loader-image"),
            a = o.attr("data-src");
          if (a) {
            var s = new Image;
            s.onload = n, s.src = a, i = setTimeout(n, 1e3)
          }
        }

        function n() {
          clearTimeout(i), e.css("backgroundImage", ""), t.removeClass("loading"), setTimeout(function () {
            o.remove()
          }, 300)
        }
      }, t.imageParallaxInit = function () {
        if ("image" !== this.data.type || !this.data.parallax) return !1;
        var i = this.owner,
          t = this.$component,
          e = this.data,
          o = i._core && i._core.id || i.getAttribute("data-id");
        "object" === _typeof(i._bgEffects) && i._bgEffects.destroy(), i._bgEffects = new a(o, t, e)
      }, t.videoParallaxInit = function () {
        var e = this;
        if ("video" !== this.data.type || !this.data.parallax || !this.owner._core) return !1;
        var i = $(".image-holder, .video_bg_container", this.$component),
          o = i.find(".image, .video_bg_player"),
          a = this.owner._core;
        flexbe_cli.resize.height < a.tween.height && 500 < a.tween.width ? i.css("height", a.tween.height + "px") : i.css("height", "");
        var t = !1,
          s = function () {
            var i = a.tween.start,
              t = 1 - (1 - e.data.videoParallaxFactor) * (a.tween.height / flexbe_cli.resize.height);
            t < 0 && (t = e.data.videoParallaxFactor / 2), o.css("transform", "translate3d(0, " + -(window.pageYOffset - i) * t + "px, 0)")
          };
        s(), $(window).off("scroll.component-bg-" + a.id).on("scroll.component-bg-" + a.id, function () {
          !t && a.tween.onscreen && (t = !0, requestAnimationFrame(function () {
            s(), t = !1
          }))
        })
      }, t.playVideo = function () {
        var i = this,
          t = this.$component,
          e = this.data,
          o = e.video;
        if ("video" !== e.type || !o || "youtube" !== o.type || !o.id) return !1;
        if (flexbe_cli.run.is_mobile || flexbe_cli.run.is_screen_all_mobile) return !1;
        if (t.data("video_bg_played")) {
          if (o.id === t.data("video_bg_played")) return;
          this.destroyVideo()
        }
        t.data("video_bg_played", o.id), flexbe_cli.require(["/js/jquery.youtubebackground.js"], function () {
          t.YTPlayer({
            videoId: o.id,
            videoURL: o.url,
            callback: function () {
              i.videoParallaxInit(), setTimeout(function () {
                i.videoParallaxInit()
              }, 1e3)
            }
          })
        })
      }, t.destroyVideo = function () {
        var i = this.$component;
        i.data("ytPlayer") && i.data("ytPlayer").destroy(), i.removeData("video_bg_played")
      }, i
    }(BaseComponent);
  flexbe_cli.components.classes.background = i
}();

function _extends() {
  return (_extends = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
    }
    return t
  }).apply(this, arguments)
}

function _inheritsLoose(t, e) {
  t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
}! function () {
  var r = {},
    s = function (t, e) {
      void 0 === e && (e = function () {});
      var i = new Image;
      return i.onload = function () {
        "function" == typeof i.remove && i.remove(), e(i)
      }, i.src = t, i
    },
    c = function (t, e) {
      var i = t.id,
        n = t.name,
        o = t.ext,
        a = t.resizable,
        r = Math.max(1, window.devicePixelRatio || 1);
      return e = Math.round(Math.min(2560, e * r)), ["/img/" + i, a && e ? "_" + e : "", o ? "." + o : "/" + n].join("")
    },
    t = function (a) {
      function t() {
        for (var t, e = arguments.length, i = new Array(e), n = 0; n < e; n++) i[n] = arguments[n];
        if ((t = a.call.apply(a, [this].concat(i)) || this).is = "image", t.autoSet = !0, t.params = {}, t.component.getAttribute("data-img-loaded") && (t.imageLoaded = !0, t.autoSet = !1), t.img = t.$component.find("img").get(0), t.layer = t.$component.find("[data-img-layer]").get(0) || t.component, t.overlay = t.$component.find(".overlay-content").get(0), !t.img) return t;
        var o = t.$component.parent();
        o.hasClass("slider-item") && (o.closest(".component-slider").attr("data-current-index") == o.attr("data-real-index") || (t.autoSet = !1));
        return t.$component.on("setImage sliderActivate", function () {
          t.set()
        }), t
      }
      _inheritsLoose(t, a);
      var e = t.prototype;
      return e.onInit = function () {
        this.isUpdated && this.set()
      }, e.onView = function (t) {
        if (!t.state || !this.autoSet || this.isSet) return !1;
        this.set()
      }, e.onBeside = function (t) {
        if (!t.state || !this.autoSet || this.isSet) return !1;
        this.set()
      }, e.onResize = function () {
        this.updateSize(), this.setOverlaySize()
      }, e.set = function (t) {
        var a = this;
        void 0 === t && (t = !1), (t || !this.isSet && this.isVisible && !this.imageLoaded) && (this.isSet = !0, this.updateParams(), this.updateSize(), this.setOverlaySize(), this.getOptimalSize(function (t) {
          var e = t.width,
            i = a.params,
            n = c(i, e),
            o = setTimeout(function () {
              a.setImage(n)
            }, 1e3);
          s(n, function () {
            a.setImage(n), clearTimeout(o)
          })
        }))
      }, e.setImage = function (t) {
        var e = this,
          i = this.params;
        if (t || (t = c(i)), this.imageLoaded || (this.imageLoaded = !0, requestAnimationFrame(function () {
            e.$component.removeClass("loading")
          })), this.img && this.img.src === t) return !1;
        if (this.img && (this.img.src = t), "background" === i.type) {
          var n = "url(" + t + ")",
            o = i.x + " " + i.y;
          this.layer.style.backgroundImage = n, this.layer.style.backgroundPosition = o
        }
      }, e.setOverlaySize = function () {
        var t = this.overlay,
          e = this.componentWidth,
          i = this.componentHeight;
        if (t) {
          var n = "medium";
          650 <= e && 400 <= i ? n = "large" : (e <= 400 || i <= 250) && (n = "small"), t.setAttribute("data-size", n)
        }
      }, e.updateParams = function () {
        var t = this.params,
          e = this.component,
          i = this.img;
        if (!t.id) {
          var n = e.getAttribute("data-img-id");
          if (r[n]) t = _extends({}, r[n]);
          else {
            if (t.id = n, t.ext = e.getAttribute("data-img-ext"), t.type = e.getAttribute("data-img-type"), t.name = e.getAttribute("data-img-name"), t.proportion = +e.getAttribute("data-img-proportion") / 100, !t.ext) {
              var o = t.name.match(/\.(!:jpeg|jpg|png|gif|bmp|webp|svg)$/i) || [];
              t.ext = o[1] || "jpg"
            }
            t.resizable = !["svg", "gif"].includes(t.ext)
          }
          t.x = e.getAttribute("data-img-x"), t.y = e.getAttribute("data-img-y")
        }
        return !t.proportion && i && i.src && (t.proportion = i.naturalHeight / i.naturalWidth), r[t.id] || (r[t.id] = _extends({}, t)), this.params = t
      }, e.updateSize = function () {
        var t = this.component;
        this.componentWidth = Math.round(t.offsetWidth), this.componentHeight = Math.round(t.offsetHeight)
      }, e.getProportion = function (e) {
        void 0 === e && (e = function () {});
        var i = this.params;
        if (i.proportion) e(i.proportion);
        else {
          var t = c(i, 50);
          s(t, function (t) {
            i.proportion = t.naturalHeight / t.naturalWidth, r[i.id] && (r[i.id].proportion = i.proportion), e(i.proportion)
          })
        }
      }, e.getOptimalSize = function (n) {
        void 0 === n && (n = function () {});
        var o = this.componentWidth,
          a = this.componentHeight,
          r = a / o;
        this.getProportion(function (t) {
          var e, i;
          t < r ? (e = a / t, i = a) : i = (e = o) * t, e = Math.round(e), i = Math.round(i), n({
            width: e,
            height: i
          })
        })
      }, t
    }(BaseComponent);
  flexbe_cli.components.classes.image = t, flexbe_cli.components.helpers.replacePlaceholder = function (t) {
    var e = $(t);
    e && 0 !== e.length && e.each(function (t, e) {
      var i = $(e).data("src"),
        n = $(e).data("srcset"),
        o = new Image;
      o.onload = function () {
        i && (e.src = i), n && (e.srcset = n), $(e).addClass("loaded")
      }, i && (o.src = i), n && (o.srcset = n)
    })
  }
}();

function _inheritsLoose(e, t) {
  e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t
}! function () {
  var e = function (a) {
    function e() {
      for (var e, t = arguments.length, i = new Array(t), o = 0; o < t; o++) i[o] = arguments[o];
      (e = a.call.apply(a, [this].concat(i)) || this).is = "video", e.type = e.$component.data("type"), e.autoplay = !!+e.$component.data("autoplay"), e.$preview = e.$component.find(".video-preview"), e.hasPreview = e.$preview.length, e.frameLoaded = !1, e.autoSet = !e.hasPreview;
      var n = e.$component.parent();
      n.hasClass("slider-item") && (n.closest(".component-slider").attr("data-current-index") === n.attr("data-real-index") || (e.autoSet = !1));
      return e.$component.off("sliderActivate").on("sliderActivate", function () {
        e.set()
      }), e.$component.off("sliderDeactivate").on("sliderDeactivate", function () {
        e.pause()
      }), e
    }
    _inheritsLoose(e, a);
    var t = e.prototype;
    return t.onInit = function () {
      this.bindEvents()
    }, t.onView = function (e) {
      var t = this,
        i = e.state;
      if (i ? this.autoplay && this.onFrameLoaded(function () {
          t.play()
        }) : this.pause(), !i || !this.autoSet || this.isViewed || this.isBesided) return !1;
      this.set()
    }, t.onBeside = function (e) {
      if (!e.state || !this.autoSet || this.isViewed || this.isBesided) return !1;
      this.set()
    }, t.onPageLoad = function () {
      var e = this;
      setTimeout(function () {
        if (!e.autoSet || e.isViewed || e.isBesided) return !1;
        e.set()
      }, 2e3)
    }, t.bindEvents = function () {
      var i = this;
      this.hasPreview && !flexbe_cli.is_admin && this.$preview.on("click", function (e) {
        var t = $(e.currentTarget).parents(".slider-wrapper").get(0);
        e.preventDefault(), t && t.swiper && t.swiper.autoplay && t.swiper.autoplay.pause(), i.set({
          autoplay: !0
        }), setTimeout(function () {
          i.$component.attr("data-state", "play")
        }, 250)
      })
    }, t.set = function (e) {
      var t = (void 0 === e ? {} : e).autoplay;
      if (this.isSet) return !1;
      this.isSet = !0;
      var i = this.component.querySelector("iframe");
      if (!i) return !1;
      var o = i.getAttribute("data-src"),
        n = i.getAttribute("src");
      o && !n && (i.src = o + (t ? "&autoplay=1" : ""))
    }, t.play = function () {
      var e = this.component.querySelector("iframe"),
        t = e && e.contentWindow;
      if (!t) return !1;
      this.isPaused = !1, "vimeo" === this.type ? t.postMessage({
        method: "play"
      }, "*") : t.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
    }, t.pause = function () {
      var e = this.component.querySelector("iframe"),
        t = e && e.contentWindow;
      if (!t) return !1;
      this.isPaused = !0, "vimeo" === this.type ? t.postMessage({
        method: "pause"
      }, "*") : t.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
    }, t.onFrameLoaded = function (e) {
      var t = this;
      this.frameLoaded ? "function" == typeof e && e() : this.component.querySelector("iframe").onload = function () {
        t.frameLoaded = !0, "function" == typeof e && e()
      }
    }, e
  }(BaseComponent);
  flexbe_cli.components.classes.video = e
}();

function _inheritsLoose(t, i) {
  t.prototype = Object.create(i.prototype), (t.prototype.constructor = t).__proto__ = i
}

function _typeof(t) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  })(t)
}

function _extends() {
  return (_extends = Object.assign || function (t) {
    for (var i = 1; i < arguments.length; i++) {
      var e = arguments[i];
      for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
    }
    return t
  }).apply(this, arguments)
}! function () {
  function w(t, i, e, n) {
    var a = $(t),
      s = i ? '[data-component="' + i + '"]' : "[data-component]";
    a.is(s) ? a.trigger(e, n) : $(t).find(s).each(function (t, i) {
      $(i).trigger(e, n)
    })
  }

  function p(t) {
    return ["normal", "active"].includes(t)
  }
  var x = function () {
      function t(t, i) {
        if (i = _extends({
            init: !0,
            targets: "span",
            active: 0
          }, i), "object" !== _typeof(t) || !t.querySelectorAll) return !1;
        Array.isArray(i.targets) || i.targets instanceof NodeList || i.targets instanceof HTMLCollection ? this.targets = Array.from(i.targets) : this.targets = Array.from(t.querySelectorAll(i.targets)), this.pagination = t, this.options = i, this.active = i.active, this.visible = i.visible || +t.getAttribute("data-bullets-visible"), this.visible || (this.visible = 8 <= this.targets.length ? 3 : this.targets.length), i.init && this.setActive(this.active, !0)
      }
      return t.prototype.setActive = function (t, i) {
        var s, o, e = this.targets,
          n = this.active,
          r = this.oldMap,
          a = this.newMap;
        if (!e.length) return t;
        if (t = Math.max(Math.min(t, e.length - 1), 0), r = r && r.length ? r : e.map(function (t) {
            return {
              target: t,
              state: t.getAttribute("data-state") || "hidden"
            }
          }), (i ? 0 : r.reduce(function (t, i) {
            return t + (p(i.state) ? 1 : 0)
          }, 0)) !== this.visible) o = Math.min(t + this.visible - 1, e.length - 1), s = Math.max(o - this.visible + 1, 0), a = r.map(function (t, i) {
          var e = t.target;
          t.state;
          return {
            target: e,
            state: s <= i && i <= o ? "normal" : "hidden"
          }
        });
        else {
          var l = function t(i) {
            var e = i.from,
              n = i.to,
              a = i.map,
              s = i.move,
              o = void 0 === s ? 0 : s,
              r = a[n - o],
              l = r && p(r.state);
            return !r || l ? o : e < n ? t({
              from: e,
              to: n,
              map: a,
              move: o + 1
            }) : n < e ? t({
              from: e,
              to: n,
              map: a,
              move: o - 1
            }) : o
          }({
            from: n,
            to: t,
            map: r
          });
          a = r.map(function (t, i) {
            var e = t.target,
              n = t.state,
              a = r[i - l];
            return "normal" === (n = a && a.state && p(a.state) ? "normal" : "hidden") && (void 0 === s && (s = i), o = i), {
              target: e,
              state: n
            }
          })
        }
        return a[t].state = "active", a[s - 1] && (a[s - 1].state = "next"), a[s - 2] && (a[s - 2].state = "more"), a[o + 1] && (a[o + 1].state = "next"), a[o + 2] && (a[o + 2].state = "more"), e.forEach(function (t, i) {
          t.setAttribute("data-state", a[i].state)
        }), this.active = t, this.oldMap = a, t
      }, t
    }(),
    _ = function () {
      function t(t, i) {
        this.options = _extends({
          init: !0,
          tag: "span"
        }, i), this.pagination = t, this.tag = this.options.tag, this.filled = !1, this.states = ["hidden", "more", "next", "active", "next", "more", "hidden"], this.init()
      }
      var i = t.prototype;
      return i.init = function () {
        this.bindEvents(), this.options.init && this.fillPagination({
          states: this.states,
          force: !0
        })
      }, i.bindEvents = function () {
        var t = this.tag,
          i = this.pagination,
          a = this.options,
          e = $(i);
        "function" == typeof a.onClick && e.on("click", t, function (t) {
          var i = $(t.currentTarget),
            e = +i.siblings('[data-state="active"]').attr("data-index"),
            n = +i.attr("data-index") - e;
          a.onClick(n)
        })
      }, i.setActive = function (e, t, i) {
        var n = this.states,
          a = this.filled && e;
        if (this.fillPagination({
            states: n,
            force: !0,
            activeIndex: t,
            inRow: i
          }), a) {
          var s = n.map(function (t, i) {
            return ("prev" === e ? n[i + 1] : n[i - 1]) || "hidden"
          });
          this.pagination.offsetWidth;
          this.fillPagination({
            states: s
          })
        }
      }, i.fillPagination = function (t) {
        var i = void 0 === t ? {} : t,
          n = i.states,
          e = i.force,
          a = $(this.pagination),
          s = this.tag;
        if (this.filled = !0, e) {
          var o = n.reduce(function (t, i, e) {
            return t + "<" + s + ' data-index="' + e + '" class="swiper-pagination-bullet" data-state="' + i + '"></' + s + ">"
          }, "");
          a.html(o)
        } else a.find(s).each(function (t, i) {
          var e = $(i);
          e.attr("data-state", n[t] || "hidden"), e.attr("data-index", t)
        })
      }, t
    }(),
    t = function (o) {
      function t() {
        for (var t, i = arguments.length, e = new Array(i), n = 0; n < i; n++) e[n] = arguments[n];
        var a = (t = o.call.apply(o, [this].concat(e)) || this).component;
        t.require = ["/js/swiper.v4.js"], t.is = "slider", t.swiper = null, t.wrapperEl = a.querySelector(".slider-wrapper"), t.paginationEl = a.querySelector(".slider-pagination"), t.prevEl = a.querySelector('.slider-prev, [data-direction="prev"]'), t.nextEl = a.querySelector('.slider-next, [data-direction="next"]');
        var s = t.paginationEl && t.paginationEl.getAttribute("data-type") || "bullets";
        return t.options = {
          count: a.getAttribute("data-count"),
          paginationType: s,
          loop: Boolean(!flexbe_cli.is_admin && Math.floor(a.getAttribute("data-loop"))),
          autoplay: !flexbe_cli.is_admin && Math.floor(a.getAttribute("data-autoplay")) || !1
        }, t
      }
      _inheritsLoose(t, o);
      var i = t.prototype;
      return i.onInit = function () {
        this.isUpdated && this.isLoaded && this.initSwiper()
      }, i.onLoad = function () {
        if (!this.inView && !this.inBeside) return !1;
        this.initSwiper()
      }, i.onView = function (t) {
        var i = t.state;
        if (!this.isLoaded) return !1;
        this.swiper || this.initSwiper(), this.toggleAutoplay({
          state: i
        })
      }, i.onBeside = function (t) {
        if (!t.state || !this.isLoaded || this.swiper) return !1;
        this.initSwiper()
      }, i.onResize = function () {
        this.setComponentSize(), this.swiper && this.swiper.update()
      }, i.initSwiper = function () {
        var a = this;
        if (this.swiper || this.options.count <= 1 || "undefined" == typeof Swiper) return !1;
        this.setComponentSize();
        var t = this.options,
          s = this.component,
          i = this.owner,
          o = this.root,
          e = this.index,
          n = this.wrapperEl,
          r = this.paginationEl,
          l = this.prevEl,
          p = this.nextEl,
          c = (i._core && i._core.id || "-") + ":" + e,
          d = t.count,
          u = t.loop,
          h = t.paginationType,
          f = {
            prevEl: l,
            nextEl: p
          },
          g = {
            el: r,
            type: h,
            clickable: 4 !== flexbe_cli.theme_id || !u,
            modifierClass: "slider-pagination-"
          },
          v = !!t.autoplay && {
            delay: 1e3 * t.autoplay,
            stopOnLastSlide: !u
          },
          m = 0;
        if (flexbe_cli.is_admin) {
          o._sliderState || (o._sliderState = {});
          var y = o._sliderState;
          y[c] && (m = Math.max(0, Math.min(d - 1, y[c]) || 0)), y[c] = m
        }
        this.$component.one("mouseover.loadImages touchstart.loadImages", function () {
          a.$component.off(".loadImages"), w(a.$component, "image", "setImage")
        }), this.swiper = new Swiper(n, {
          init: !1,
          speed: 450,
          wrapperClass: "slider",
          slideClass: "slider-item",
          slideActiveClass: "active",
          noSwipingClass: "redactor-box",
          initialSlide: m,
          navigation: f,
          pagination: g,
          autoplay: v,
          loop: u,
          simulateTouch: !flexbe_cli.is_admin,
          roundLengths: !0,
          touchMoveStopPropagation: !1,
          preventClicksPropagation: !0,
          preventClicks: !0,
          runCallbacksOnInit: !1
        }), this.swiper.on("init", function () {
          ($(l).add(p).removeClass("disabled"), u) && ($(".swiper-slide-duplicate", s).find(".component-image").removeAttr("data-lg"), flexbe_cli.components.initComponents({
            core: a.owner._core
          }))
        });
        var b = !1;
        this.swiper.on("slideChangeTransitionEnd", function () {
          var t = a.swiper;
          u && t.activeIndex !== t.realIndex + 1 ? (b = !0, t.slideToLoop(t.realIndex, 0)) : b = !1
        }), this.swiper.on("slideChange", function () {
          var t = a.swiper;
          if (!b) {
            var i = t.slides[t.previousIndex],
              e = t.slides[t.activeIndex],
              n = e && e.getAttribute("data-type") || "image";
            s.setAttribute("data-current-content", n), flexbe_cli.is_admin && (o._sliderState[c] = t.realIndex), w(i, !1, "sliderDeactivate"), w(e, !1, "sliderActivate")
          }
        }), this.swiper.on("paginationRender", function () {
          4 === flexbe_cli.theme_id && "bullets" === g.type && (u ? a.loopPagination = new _(r, {
            init: !1,
            tag: "span",
            onClick: function (t) {
              t < 0 ? a.swiper.slidePrev() : 0 < t && a.swiper.slideNext()
            }
          }) : a.bulletsPagination = new x(r, {
            init: !1,
            targets: "span",
            active: a.swiper.realIndex
          })), $(r).removeClass("disabled")
        }), this.swiper.on("paginationUpdate", function () {
          if (!b)
            if (a.bulletsPagination) a.bulletsPagination.setActive(a.swiper.realIndex);
            else if (a.loopPagination) {
            var t = a.swiper.previousIndex < a.swiper.activeIndex ? "next" : "prev";
            a.loopPagination.setActive(t)
          }
        }), this.swiper.init(), this.toggleAutoplay({
          state: this.inView
        })
      }, i.toggleAutoplay = function (t) {
        var i = t.state;
        if (!this.swiper) return !1;
        var e = this.swiper;
        this.options.autoplay && e.autoplay && (i && !e.autoplay.running ? e.autoplay.start() : !i && e.autoplay.running && e.autoplay.stop())
      }, i.setComponentSize = function () {
        this.$component.css("width", "");
        var t = this.$component.outerWidth();
        0 < t % 1 && this.$component.css("width", parseInt(t, 10) + "px")
      }, t
    }(BaseComponent);
  flexbe_cli.components.classes.slider = t, flexbe_cli.components.classes.bulletsPagination = x, flexbe_cli.components.classes.bulletsLoopPagination = _
}();

function _extends() {
  return (_extends = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a])
    }
    return t
  }).apply(this, arguments)
}

function _inheritsLoose(t, e) {
  t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
}! function () {
  var t = function (n) {
    function t() {
      for (var t, e = arguments.length, i = new Array(e), a = 0; a < e; a++) i[a] = arguments[a];
      return (t = n.call.apply(n, [this].concat(i)) || this).is = "button", t
    }
    _inheritsLoose(t, n), t.getProductInfo = function (t, e) {
      void 0 === e && (e = !1);
      var i = flexbe_cli.theme_id < 4 ? t.closest("[data-item-id], .modal-data").eq(0) : t.parents("[data-item-id], .content-zone, .flexbe-card, .flexbe-column, .modal-content").last(),
        a = e ? {} : t.data("product");
      if (!1 !== a) {
        if ((a = _extends({}, a)).count || (a.count = 1), !a.img) {
          var n = i.find("[data-img-id]").filter(function (t, e) {
              return !$(e).closest(".swiper-slide-duplicate").length
            }).eq(0),
            o = n.attr("data-img-id"),
            l = n.attr("data-img-name");
          a.img = !(!o || !l) && "/img/" + o + "_200/" + l
        }
        if (!a.title) {
          var c = i.find(".name, .title, .item-title, .text_title, .element-text--title, .text-style-title, .text-style-subtitle").eq(0);
          c.length || (c = i.find(".text-style-conntent").eq(0)), a.title = c.text().trim() || ""
        }
        if (!a.price && 0 !== a.price) {
          var r = i.find(".price, .item-price, .main-price, .element-text--price").eq(0).clone();
          r.length || (r = i.clone()), r.find("del, s, strike").remove();
          var m = r.text().replace(/[,.]/g, ".").replace(/\.$/, "");
          m = m.match(/(?:[1-9] ?[0-9]{0,3} ?[0-9]{0,3})(?:[\.,][0-9]{1,2})?/g), m = (m = String(m && m[0] || "")).replace(/[^\d]/, ""), m = parseInt(m, 10) || 0, a.price = m
        }
      }
      return a
    };
    var e = t.prototype;
    return e.onInit = function () {
      this.$component.off("click.core-component").on("click.core-component", this.onClick.bind(this))
    }, e.onClick = function (t) {
      if (flexbe_cli.is_admin) return t.preventDefault(), !0;
      var e = this.$component,
        i = e.attr("data-action"),
        a = this.owner.getAttribute("data-id");
      if (!i) return !0;
      var n = e.attr("data-modal-id"),
        o = flexbe_cli.stat.getGoal(i, n);
      flexbe_cli.stat.reach_goal(o);
      try {
        var l = e.find('[name="goal"]').val();
        l && flexbe_cli.stat.reach_goal(l);
        var c = e.find('[name="goal_html"]').val();
        c && ($("body").find(".button-html-goal").detach(), $("body").eq(0).append('<div class="button-html-goal" style="display:none"></div>'), $("body").find(".button-html-goal").html(c))
      } catch (t) {
        console.warn(t.message)
      }
      var r = !1;
      if (!["link", "file", "close", "quiz"].includes(i) && !(r = this.constructor.getProductInfo(e) || {}).id) {
        var m = flexbe_cli.p_id,
          d = e.closest("[data-item-id]").attr("data-item-id") || 0,
          s = this.root && this.root.getAttribute("data-multivar") || "";
        r.id = "" + m + a + d + s
      }
      if (r && (r.title && "-" !== r.title || r.price) || (r = !1), n && i.match(/^modal|^form/)) {
        if (!flexbe_cli.modal.find(n)) n = parseInt(String(a).split("_")[0], 10) + "_" + n;
        flexbe_cli.events.emit("mobilemenu_command", {
          command: "close"
        }), flexbe_cli.events.emit("modal_command", {
          command: "open",
          id: n,
          data: {
            items: r ? [r] : []
          }
        })
      } else if (r && i.match(/^cart$/)) {
        var f = e.closest(".m_modal").length;
        e.addClass("animate-add-to-cart"), setTimeout(function () {
          e.removeClass("animate-add-to-cart"), f && (flexbe_cli.events.emit("modal_command", {
            command: "close"
          }), flexbe_cli.events.emit("cart_command", {
            command: "add",
            item: r
          }))
        }, 1600), f || flexbe_cli.events.emit("cart_command", {
          command: "add",
          item: r
        })
      } else "quiz" === i ? flexbe_cli.events.emit("quiz_command", {
        command: "start",
        id: a
      }) : "close" === i && flexbe_cli.events.emit("modal_command", {
        command: "close"
      })
    }, t
  }(BaseComponent);
  flexbe_cli.components.classes.button = t
}();

function _inheritsLoose(e, o) {
  e.prototype = Object.create(o.prototype), (e.prototype.constructor = e).__proto__ = o
}! function () {
  var e = function (a) {
      function e() {
        for (var e, o = arguments.length, t = new Array(o), n = 0; n < o; n++) t[n] = arguments[n];
        return (e = a.call.apply(a, [this].concat(t)) || this).is = "map", e.$map = e.$component, e.data = e.$component.data("data"), e.$component.removeAttr("data-data"), e
      }
      _inheritsLoose(e, a);
      var o = e.prototype;
      return o.onInit = function () {
        this.isUpdated && this.isLoaded && this.createMap()
      }, o.onLoad = function () {
        (this.inView || this.inBeside) && this.createMap()
      }, o.onView = function (e) {
        var o = e.state;
        if (!this.isLoaded) return !1;
        !o || this.isViewed || this.isBesided || this.createMap()
      }, o.onBeside = function (e) {
        var o = e.state;
        if (!this.isLoaded) return !1;
        !o || this.isViewed || this.isBesided || this.createMap()
      }, o.createMap = function () {}, e
    }(BaseComponent),
    t = function (a) {
      function e() {
        for (var e, o = arguments.length, t = new Array(o), n = 0; n < o; n++) t[n] = arguments[n];
        return (e = a.call.apply(a, [this].concat(t)) || this).require = ["//api-maps.yandex.ru/2.1/?lang=ru_RU"], e
      }
      _inheritsLoose(e, a);
      var o = e.prototype;
      return o.onResize = function () {
        var e = this.map;
        e && e.container.fitToViewport()
      }, o.createMap = function () {
        var e = this;
        "undefined" != typeof ymaps && ymaps.ready(function () {
          e.createVendor(), e.setPlaces(), e.dispatchEvents(), e.fixBehavior(), e.$component.trigger("mapInit"), e.$component.removeClass("loading")
        })
      }, o.createVendor = function () {
        this.map && this.map.destroy(), this.map = new ymaps.Map(this.$component.find(".map")[0], {
          center: this.data.center,
          zoom: this.data.zoom,
          controls: ["zoomControl"],
          behaviors: ["default", "scrollZoom"],
          type: "yandex#map"
        })
      }, o.setPlaces = function () {
        var n = this,
          a = this.map,
          e = this.data;
        if (a) {
          a.geoObjects.removeAll();
          var o = ymaps.templateLayoutFactory.createClass('<svg title="$[properties.balloonContent]" class="placemark" width="32" height="48" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.36 0 0 5.36 0 12c0 8 12 20 12 20s12-12 12-20c0-6.64-5.36-12-12-12zm0 8a4 4 0 0 1 4 4c0 2.22-1.78 4-4 4a4 4 0 0 1-4-4c0-2.2 1.8-4 4-4z" fill="$[properties.color]" fill-rule="evenodd"/></svg>');
          ymaps.layout.storage.get("custom#placemark") || ymaps.layout.storage.add("custom#placemark", o), e.places.forEach(function (e, o) {
            e.color = e.color || "#3D52B0";
            var t = new ymaps.Placemark(e.coords, {
              balloonContentHeader: e.name || !1,
              balloonContent: e.address,
              color: e.color
            }, {
              hideIconOnBalloonOpen: !1,
              balloonOffset: [0, -48],
              balloonCloseButton: !1,
              iconLayout: "custom#placemark",
              iconShape: {
                type: "Rectangle",
                coordinates: [
                  [-16, -48],
                  [16, 0]
                ]
              }
            });
            t.events.add("balloonopen", function () {
              n.$component.trigger("balloonOpen", o, e)
            }), a.geoObjects.add(t), e._mark = t
          })
        }
      }, o.dispatchEvents = function () {
        var n = this.data,
          a = this.map;
        a && (this.$component.on("selectMark", function (e, o) {
          if (n.places.length && n.places[o]) {
            var t = n.places[o];
            a.setCenter(t.coords, n.zoom, {
              duration: 350,
              checkZoomRange: !0
            }).then(function () {
              a.setCenter(t.coords)
            }), t._mark && t._mark.balloon.open()
          }
        }), this.$component.on("resizeMap", function () {
          a.container.fitToViewport()
        }))
      }, o.fixBehavior = function () {
        var e, o = this.map;
        o && (o.behaviors.disable("scrollZoom"), this.$component.off("mouseenter.preventzoom").on("mouseenter.preventzoom", function () {
          e = setTimeout(function () {
            o.behaviors.enable("scrollZoom")
          }, 500)
        }), this.$component.off("mouseleave.preventzoom").on("mouseleave.preventzoom", function () {
          e && (clearTimeout(e), o.behaviors.disable("scrollZoom"))
        }), flexbe_cli.run.is_mobile && o.behaviors.disable("drag"))
      }, e
    }(e),
    n = function (i) {
      function e() {
        for (var e, o = arguments.length, t = new Array(o), n = 0; n < o; n++) t[n] = arguments[n];
        e = i.call.apply(i, [this].concat(t)) || this;
        var a = flexbe_cli.google_maps_api_key || "AIzaSyBZ5MufayEgZaNJ-dDo6epfouAZr5wATEs";
        return e.require = ["//maps.googleapis.com/maps/api/js?key=" + a], e
      }
      _inheritsLoose(e, i);
      var o = e.prototype;
      return o.createMap = function () {
        "undefined" != typeof google && (this.createVendor(), this.styleMap(), this.setPlaces(), this.dispatchEvents(), this.fixBehavior(), this.$component.trigger("mapInit"), this.$component.removeClass("loading"))
      }, o.createVendor = function () {
        var e = this.data;
        this.map = new google.maps.Map(this.$component.find(".map")[0], {
          center: {
            lat: e.center[0],
            lng: e.center[1]
          },
          zoom: e.zoom,
          disableDefaultUI: !0,
          panControl: !0,
          zoomControl: !0,
          mapTypeControl: !1,
          streetViewControl: !1,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: !1
        })
      }, o.dispatchEvents = function () {
        var t = this,
          e = this.$component,
          o = this.map;
        o && (e.on("selectMark", function (e, o) {
          t.selectMark(o, !0)
        }), e.on("resizeMap", function () {
          google.maps.event.trigger(o, "resize")
        }))
      }, o.setPlaces = function () {
        var a = this,
          e = this.data,
          i = this.map;
        i && e.places.forEach(function (e, o) {
          var t = '<svg width="32" height="48" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.36 0 0 5.36 0 12c0 8 12 20 12 20s12-12 12-20c0-6.64-5.36-12-12-12zm0 8a4 4 0 0 1 4 4c0 2.22-1.78 4-4 4a4 4 0 0 1-4-4c0-2.2 1.8-4 4-4z" fill="' + (e.color || "#222") + '" fill-rule="evenodd"/></svg>',
            n = new google.maps.Marker({
              position: {
                lat: e.coords[0],
                lng: e.coords[1]
              },
              map: i,
              visible: !0,
              animation: google.maps.Animation.DROP,
              icon: {
                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(t)
              }
            });
          (e._mark = n).addListener("click", function () {
            a.selectMark(o)
          })
        })
      }, o.styleMap = function () {
        var e = this.data,
          o = this.map;
        if (o)
          if ("default" !== e.style && e.style) {
            var t = "/_s/lib/google/maps/styles/" + e.style + ".json";
            $.getJSON(t, function (e) {
              e && Array.isArray(e) && o.setOptions({
                styles: e
              })
            })
          } else o.setOptions({
            styles: []
          })
      }, o.selectMark = function (e, o) {
        void 0 === o && (o = !1);
        var t = this.data,
          n = this.map,
          a = t.places;
        if (n && a && a.length && a[e]) {
          a.forEach(function (e) {
            return e._info && e._info.close()
          });
          var i = a[e],
            s = "";
          i.name && (s += '<div style="margin-bottom: 3px;"><strong>' + i.name + "</strong></div>"), i.address && (s += "<div>" + i.address + "</div>"), i._info = new google.maps.InfoWindow({
            content: s
          }), i._info.open(n, i._mark), o && n.panTo({
            lat: i.coords[0],
            lng: i.coords[1]
          }), this.$component.trigger("balloonOpen", e, i)
        }
      }, o.fixBehavior = function () {
        var e, o = this.$component,
          t = this.map;
        t && (o.off("mouseenter.preventzoom").on("mouseenter.preventzoom", function () {
          e = setTimeout(function () {
            t.setOptions({
              scrollwheel: !0
            })
          }, 500)
        }), o.off("mouseleave.preventzoom").on("mouseleave.preventzoom", function () {
          e && (clearTimeout(e), t.setOptions({
            scrollwheel: !1
          }))
        }))
      }, e
    }(e);
  flexbe_cli.components.classes.map = function (e) {
    var o = e.args[0] || "yandex";
    return "google" === o && !flexbe_cli.is_admin && String(flexbe_cli.google_maps_api_key.length) < 32 && (o = "yandex"), new("google" === o ? n : t)(e)
  }
}();

function _typeof(e) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  })(e)
}

function _extends() {
  return (_extends = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = arguments[t];
      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
    }
    return e
  }).apply(this, arguments)
}

function _inheritsLoose(e, t) {
  e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t
}! function () {
  var o = {
      phone: {
        RUS: ["+7 (***) ***-**-**", "8 (***) ***-**-**"],
        KAZ: ["+7 (***) ***-**-**", "8 (***) ***-**-**"],
        UKR: ["+38 (***) ***-****"],
        BLR: ["+375 ** *******"],
        USA: ["+1 (***) ***-****"]
      }
    },
    e = function (a) {
      function e() {
        for (var e, t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
        return (e = a.call.apply(a, [this].concat(i)) || this).is = "form", e.ownerId = e.owner.getAttribute("data-id"), e.eventId = "." + e.ownerId, e.$form = e.$component.find("form"), e.$fields = e.$form.find(".form-fields"), e.action = e.$form.find('input[name="action"]').val(), e.$form.find('input[name="p_id"]').val(flexbe_cli.p_id), e
      }
      _inheritsLoose(e, a), e.getDefaultMask = function (e) {
        var t = String(e).toLowerCase(),
          i = flexbe_cli.lang.country,
          n = o[t] && o[t][i];
        return n && "string" == typeof n && (n = [n]), _extends([], n)
      }, e.initMask = function (t) {
        if ("undefined" == typeof IMask) return !1;
        var i = {
            lazy: !0,
            padFractionalZeros: !0,
            definitions: {
              0: void 0,
              "*": /[0-9]/
            }
          },
          e = t.getAttribute("data-required"),
          n = t.getAttribute("data-mask");
        n = n && !/[ ()*{}]/.test(n) ? flexbe_cli.components.classes.form.getDefaultMask(n) : [n];
        try {
          n = 1 === (n = n.filter(function (e) {
            return /[ ()*_{}]/.test(e)
          })).length ? String(n[0]) : n.map(function (e) {
            return _extends({}, i, {
              mask: e
            })
          });
          var a = new IMask(t, _extends({}, i, {
            mask: n,
            dispatch: function (e, t) {
              var i = t.compiledMasks;
              if (1 == i.length) return i[0];
              var n = (t.value + e).replace(/\W/g, "");
              return i.find(function (e) {
                var t = e.mask.replace(/\W/g, "")[0];
                return n[0] == t
              }) || i[0]
            }
          }));
          a.on("accept", function () {
            a.masked.isComplete || !e && !a.value ? t.setAttribute("data-mask-complete", !0) : t.removeAttribute("data-mask-complete"), t.setAttribute("value", a.value)
          }), t._mask = a
        } catch (e) {
          return t.removeAttribute("data-mask"), !1
        }
      };
      var t = e.prototype;
      return t.onInit = function () {
        this.$masked = this.$form.find("[data-mask]"), !flexbe_cli.is_admin && this.$masked.length && (this.needInitMasks = !0, this.require = ["/ja/imask.min.js"])
      }, t.onLoad = function () {
        this.needInitMasks && (this.isViewed || this.isBesided) && this.inputMask()
      }, t.onView = function (e) {
        if (!e.state || this.isViewed || this.isBesided) return !1;
        this.formInit()
      }, t.onBeside = function (e) {
        if (!e.state || this.isViewed || this.isBesided) return !1;
        this.formInit()
      }, t.onOpen = function (e) {
        void 0 === e && (e = {}), this.$component.find(".form-field").find("input, textarea").eq(0).focus(), e.data && this.setData(e.data)
      }, t.formInit = function () {
        if (this.formInited) return !1;
        this.formInited = !0, this.unbindEvents(), this.bindEvents(), this.customize()
      }, t.customize = function () {
        this.fileInput(), this.customSelect(), this.enterSubmit(), this.textResize(), this.needInitMasks && this.isLoaded && this.inputMask()
      }, t.unbindEvents = function () {
        this.$component.off(this.eventId), this.$form.off(this.eventId)
      }, t.bindEvents = function () {
        var e = this;
        this.$fields.find(".form-field-text > input, .form-field-text > textarea").on("input" + this.eventId + " change" + this.eventId, function (e) {
          var t = e.currentTarget,
            i = t.value,
            n = $(t);
          n.attr("value", i), n.closest(".form-field").removeClass("is_error")
        }), this.$form.on("click" + this.eventId, ".form_field_submit, .form-field-submit", function () {
          e.$form.submit()
        }), this.$form.on("submit" + this.eventId, function () {
          if (e.busy || !e.validateForm()) return !1;
          if (e.busy = !0, flexbe_cli.stat.u_id && e.addFields([{
              name: "f_uid",
              type: "hidden",
              value: flexbe_cli.stat.u_id
            }], !1), "function" == typeof e.beforeSend && !1 === e.beforeSend()) return e.busy = !1;
          if (e.addFields([{
              name: "jsform",
              type: "hidden",
              value: parseInt(448312, 10)
            }], !1), "undefined" != typeof FormData) e.sendFormdata();
          else {
            if (!(e.$form.find('input[type="file"]').length < 1)) return !0;
            e.sendAjax()
          }
          return !1
        })
      }, t.setData = function (e) {
        if (!e) return !1;
        e && e.fields && this.addFields(e.fields), e && e.items && this.addItems(e.items)
      }, t.onBeforeSend = function (e) {
        "function" == typeof e && (this.beforeSend = e)
      }, t.onAfterSent = function (e) {
        "function" == typeof e && (this.afterSent = e)
      }, t.addFields = function (e, t) {
        void 0 === t && (t = !0);
        var i = this.$form.find(".form_fields_advanced");
        e.length && i[0] && (t && i.empty(), e.forEach(function (e) {
          i.find('input[name="' + e.name + '"]').remove();
          var t = $("<input>").attr("type", e.type).attr("name", e.name).attr("value", e.value);
          i.append(t)
        }))
      }, t.addItems = function (e) {
        if (void 0 === e && (e = []), e && e.length) {
          var t = 0,
            i = 0,
            n = "",
            a = [];
          e = e.map(function (e) {
            return "object" !== _typeof(e) ? {} : (e.count = parseInt(e.count, 10) || 1, e.price = parseFloat(e.price) || 0, e.title = "string" == typeof e.title && e.title.trim() || e.title || "", t += e.price * e.count || 0, i += e.count, e)
          });
          try {
            n = JSON.stringify(e)
          } catch (e) {}
          a.push({
            type: "hidden",
            name: "product[items]",
            value: n
          }), a.push({
            type: "hidden",
            name: "product[price]",
            value: t
          }), a.push({
            type: "hidden",
            name: "product[total]",
            value: i
          }), t && (a.push({
            type: "hidden",
            name: "pay[price]",
            value: t
          }), a.push({
            type: "hidden",
            name: "pay[desc]",
            value: 1 < i ? "Товаров в корзине: " + i : e[0].title
          })), this.addFields(a)
        }
      }, t.sendFormdata = function () {
        var t = this,
          e = new FormData(this.$form.get(0));
        if (e.append("is_ajax", "true"), "undefined" != typeof flexbeAPI && void 0 !== flexbeAPI.customLeadData && e.append("customLeadData", JSON.stringify(flexbeAPI.customLeadData)), flexbe_cli.run.is_OSX && "function" == typeof e.entries) {
          var i = e.entries(),
            n = Array.isArray(i),
            a = 0;
          for (i = n ? i : i[Symbol.iterator]();;) {
            var o;
            if (n) {
              if (a >= i.length) break;
              o = i[a++]
            } else {
              if ((a = i.next()).done) break;
              o = a.value
            }
            var s = o,
              r = s[0],
              l = s[1];
            "object" === _typeof(l) && l instanceof File && 0 === l.size && e.delete(r)
          }
        }
        e.append("f_ab", JSON.stringify(flexbe_cli.stat.AB.getcookie())), this.$component.addClass("submitting");
        var d = $.ajax({
          url: this.$form.attr("action"),
          type: "POST",
          dataType: "json",
          processData: !1,
          contentType: !1,
          data: e,
          xhr: function () {
            return $.ajaxSettings.xhr()
          }
        });
        d.done(function (e) {
          t.$component.addClass("success submit-ok"), t.$component.removeClass("submitting"), e.send_formdata = !0, void 0 !== e.pay && (t.pay = e.pay), t.showDone(), setTimeout(function () {
            t.$component.removeClass("success submit-ok")
          }, 1e3)
        }), d.fail(function (e) {
          console.error("sendFormdata error: ", e), t.busy = !1, t.$component.removeClass("submitting")
        })
      }, t.sendAjax = function () {
        var t = this,
          e = this.$form.serialize();
        $.ajax({
          url: this.$form.attr("action"),
          type: "POST",
          dataType: "json",
          data: e + "&is_ajax=true"
        }).done(function (e) {
          t.$form.get(0).reset(), e.send_ajax = !0, void 0 !== e.pay && (t.pay = e.pay), t.showDone()
        }).fail(function (e) {
          console.error("sendAjax: Ошибка при отправке формы", e), t.busy = !1, t.$component.removeClass("submitting")
        })
      }, t.resetForm = function () {
        this.$form.get(0).reset(), this.$form.find(".file-input-outer").removeClass("active"), this.$fields.find("input:not(:hidden)").each(function (e, t) {
          t.value = null, t.checked = !1, t.removeAttribute("value"), t.removeAttribute("checked"), t.removeAttribute("data-mask-complete"), t._mask && t._mask.updateValue()
        })
      }, t.validateForm = function () {
        var l = this,
          d = !0,
          f = !0;
        return this.$form.find("[data-type]").each(function (e, t) {
          var i = $(t),
            n = i.find("input, textarea, select").not('[type="hidden"]')[0],
            a = "checkbox" === n.type ? n.checked : n.value,
            o = l.checkField(n);
          if (i.removeClass("is_error"), o) {
            var s = i.attr("data-type"),
              r = i.find(".error");
            i.outerWidth(), i.addClass("is_error"), r.length && (r.attr("title", o), r.find(".error-text").text(o)), "checkbox" === s && i.find(".form-field-checkbox--box").attr("title", o), d = !1
          }
          f && a && (f = !1)
        }), this.$fields.removeClass("all-fields-empty"), this.$fields.removeClass("has-error"), this.$fields.outerWidth(), d || this.$fields.addClass("has-error"), f && (this.$fields.toggleClass("all-fields-empty", f), 4 === flexbe_cli.theme_id && (d = !1)), d
      }, t.showDone = function () {
        this.resetForm(), "function" == typeof this.afterSent && this.afterSent(), this.busy = !1, flexbe_cli.stat.reach_goal("order_done");
        try {
          var e = this.$form.find('input[name="goal"]').val();
          void 0 !== e && "" !== e && flexbe_cli.stat.reach_goal(e)
        } catch (e) {}
        try {
          var t = this.$form.find('textarea[name="goal_html"]').val();
          if ("string" == typeof t && t.trim()) {
            var i = document.write;
            document.write = function (e) {
              $("body").eq(0).append(e)
            }, $("body").eq(0).append('<div style="display:none">' + t + "</div>"), setTimeout(function () {
              document.write = i
            }, 1e4)
          }
        } catch (e) {}
        if ("pay" === this.action && void 0 !== this.pay && null !== this.pay) {
          if (0 < this.pay.pay_link.length) {
            var n = window.location.origin + window.location.pathname + (window.location.search ? window.location.search + "&" : "?") + "pay_id=" + this.pay.pay_id + "&h=" + this.pay.pay_hash;
            try {
              history.pushState(null, null, n), setTimeout(function () {
                flexbe_cli.events.emit("pay", {
                  action: "init"
                })
              }, 200)
            } catch (e) {
              setTimeout(function () {
                document.location = n
              }, 500)
            }
          }
        } else if ("redirect" === this.action) {
          var a = this.$form.find('input[name="action_redirect"]').val();
          0 < a.length && setTimeout(function () {
            flexbe_cli.modal.close(), document.location = a
          }, 500)
        } else {
          var o = this.$component.find("[data-modal-id]").attr("data-modal-id");
          if (!flexbe_cli.modal.find(o)) {
            var s = String(this.ownerId);
            o = (s && s.split("_")[0]) + "_" + o
          }
          flexbe_cli.modal.find(o) ? flexbe_cli.events.emit("modal_command", {
            command: "open",
            id: o
          }) : console.warn("Modal open error:", "There is no window attached to the form.", o)
        }
      }, t.fileInput = function () {
        this.$component.on("change" + this.eventId, ".file-input", function (e) {
          var t = $(e.currentTarget),
            i = t.parents(".form_field_file_holder"),
            n = t.val(),
            a = e.currentTarget.files.length;
          if (i.addClass("active"), t.parents(".form_field").removeClass("is_error"), 1 === a && i.find(".files_name_holder_text").text(n), 1 < a) {
            var o, s = a % 100,
              r = a % 10,
              l = Math.floor(s / 10);
            o = 1 === r && 11 !== s ? "form.filesMult" : 1 < r && r < 5 && 1 !== l ? "form.filesMult1" : "form.filesMult2", i.find(".files_name_holder_text").text(a + " " + flexbe_cli.lang.get(o))
          }
          0 === a && i.removeClass("active")
        }), this.$component.on("click" + this.eventId, ".clear_files", function (e) {
          var t = $(e.currentTarget).parents(".form_field_file_holder");
          t.find(".file-input").val(""), t.removeClass("active")
        })
      }, t.enterSubmit = function () {
        flexbe_cli.is_admin || $(window).on("keyup" + this.eventId, function (e) {
          if (13 == e.which) {
            var t = $(".m_modal.show").eq(0);
            if (t.find(".form_field_textarea").is(":focus")) return !1;
            t.find("form").submit()
          }
        })
      }, t.textResize = function () {
        this.$component.find(".autosize").each(function (e, t) {
          var i = t.offsetHeight - t.clientHeight,
            n = $(t);
          n.removeAttr("data-autoresize"), n.off("keyup input").on("keyup input", function (e) {
            e.currentTarget.style.height = e.currentTarget.scrollHeight + i + "px"
          })
        })
      }, t.customSelect = function () {
        this.$component.find(".dropdown-container").remove(), this.$component.find("select.custom-select").each(function (e, t) {
          var n = $(t),
            i = n.children("optgroup"),
            a = n.closest('[data-type="select"]'),
            s = "",
            r = "";
          i.length && i.each(function (e, t) {
            var i = $(t),
              n = i.attr("label");
            r += '<li class="optgroup">' + n + "</li>", i.children("option").each(function (e, t) {
              var i = $(t),
                n = i.attr("value").replace(/"/g, "&quot;"),
                a = i.text() || "—",
                o = i.attr("selected");
              r += "selected" === o ? '<li class="selected" data-value="' + n + '">' + (s = a) + "</li>" : '<li data-value="' + n + '">' + a + "</li>"
            })
          }), n.children("option").each(function (e, t) {
            var i = $(t),
              n = i.val().replace(/"/g, "&quot;"),
              a = i.text() || "—",
              o = i.attr("selected");
            r += "selected" === o ? '<li class="selected" data-value="' + n + '">' + (s = a) + "</li>" : '<li data-value="' + n + '">' + a + "</li>"
          });
          var o = $('<div class="dropdown-container">\n                        <div class="dropdown-select">\n                            <span>' + s + '</span>\n                        </div>\n                        <ul class="dropdown-select-ul">' + r + "</ul>\n                    </div>");
          n.after(o), o.off("click.selectdd").on("click.selectdd", ".dropdown-select", function () {
            var e = o.hasClass("active");
            o.toggleClass("active", !e), a.toggleClass("active", !e), e || a.siblings('[data-type="select"]').removeClass("active").find(".dropdown-container").removeClass("active")
          }), o.off("click.selectli").on("click.selectli", ".dropdown-select-ul li", function (e) {
            var t = $(e.currentTarget);
            if (!t.hasClass("optgroup")) {
              var i = t.closest("ul").siblings(".dropdown-select");
              o.toggleClass("active"), o.closest('[data-type="select"]').toggleClass("active"), t.siblings("li").removeClass("selected"), t.addClass("selected"), n.val(t.attr("data-value")), i.children("span").html(t.text())
            }
          })
        })
      }, t.checkField = function (e) {
        var t = e.type,
          i = "checkbox" === t ? e.checked : "file" === t ? e.files : e.value,
          n = e.getAttribute("data-required") || !1,
          a = e.getAttribute("data-check") || !1,
          o = !(!n || i) && "form.required";
        if (e.getAttribute("data-mask") || !1) !n && !i || e.getAttribute("data-mask-complete") || (o = "tel" === t && i ? "form.phone" : "form.required");
        else if (a)
          if (i.length && "email" === t) {
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Zа-яёА-ЯЁ\-0-9]+\.)+[a-zA-Zа-яёА-ЯЁ]{2,}))$/.test(i) || (o = "form.email")
          } else if (i.length && "tel" == t) {
          if (/[^0-9+\(\)\-\s]/.test(i)) o = "form.digits";
          else i.replace(/[^0-9]/g, "").length < 5 && (o = "form.minlength")
        } else "file" == t && (o = !(!n || i.length) && "form.required");
        return o = o && flexbe_cli.lang.get(o) || !1
      }, t.inputMask = function () {
        return "undefined" != typeof IMask && (this.needInitMasks = !1, this.$masked.each(function (e, t) {
          flexbe_cli.components.classes.form.initMask(t)
        }), !0)
      }, e
    }(BaseComponent);
  flexbe_cli.components.classes.form = e
}();

function _typeof(e) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  })(e)
}

function _inheritsLoose(e, t) {
  e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t
}! function () {
  var e = function (n) {
    function e() {
      for (var e, t = arguments.length, i = new Array(t), s = 0; s < t; s++) i[s] = arguments[s];
      e = n.call.apply(n, [this].concat(i)) || this;
      var a = i[0].core;
      return e.is = "quiz", e.id = a.id, e.eventId = "." + a.id, e.$quiz = null, e.current = 0, e.total = 0, e.hidePrevOnFirstStep = !!e.$component.data("hide-prev-on-firt"), e.textLoader = e.$component.data("text-loader"), e.outerModalId = 4 === flexbe_cli.theme_id && "modal" === a.is && a.id, e.swiper = [], e.createQuiz(a.$area), e
    }
    _inheritsLoose(e, n);
    var t = e.prototype;
    return t.onView = function (e) {
      if (!e.state || this.isViewed || this.isBesided) return !1;
      this.init()
    }, t.onBeside = function (e) {
      if (!e.state || this.isViewed || this.isBesided) return !1;
      this.init()
    }, t.onOpen = function () {
      this.inited && this.toStep(1)
    }, t.onInit = function () {
      this.$masked = this.$form.find("[data-mask]"), this.require = [], !flexbe_cli.is_admin && this.$masked.length && (this.needInitMasks = !0, this.require.push("/js/imask.min.js")), flexbe_cli.run.is_screen_all_mobile && (this.needInitSwiper = this.$component.find(".form-field-image-group").length, this.needInitSwiper && this.require.push("/js/swiper.v4.js"))
    }, t.onLoad = function () {
      (this.isViewed || this.isBesided) && (this.needInitSwiper && this.initSwiper(this.current), this.needInitMasks && this.inputMask()), this.isLoaded = !0
    }, t.createQuiz = function (e) {
      this.$area = e, this.$container = e.find(".quiz-container"), this.$quiz = e.find(".component-quiz"), this.$form = this.$quiz.find("form"), this.$steps = this.$quiz.find(".quiz-steps"), this.$stepsWrapper = this.$quiz.find(".steps-wrapper"), this.$progress = this.$quiz.find('[data-quiz-part="progress"]'), this.$progress[0] || (this.$progress = e.find('[data-quiz-part="progress"]')), this.hasWelcome = !!parseInt(this.$quiz.attr("data-welcome"), 10), this.current = parseInt(this.$quiz.attr("data-active-step"), 10) || 0, this.total = parseInt(this.$quiz.attr("data-total-steps"), 10)
    }, t.init = function () {
      if (!this.inited) {
        this.inited = !0, this.bindEvents(), this.customize(), this.control();
        var e = this.hasWelcome && !this.outerModalId ? 0 : 1;
        this.toStep(this.$area.data("quiz-step") || e, !0)
      }
    }, t.bindEvents = function () {
      var e = this;
      flexbe_cli.events.off("quiz_command").on("quiz_command", function (e, t) {
        var i;
        flexbe_cli.components.instances[t.id] && flexbe_cli.components.instances[t.id].forEach(function (e) {
          "quiz" === e.is && (i = e)
        }), i && ("start" === t.command ? i.toStep(1) : "step" === t.command && i.toStep(t.step))
      }), this.$form.off(this.eventId), this.$form.on("input" + this.eventId + " change" + this.eventId, "input, textarea", function (e) {
        var t = e.currentTarget,
          i = t.value,
          s = $(t);
        s.attr("value", i), s.closest(".field").removeClass("is_error")
      }), this.$form.on("submit" + this.eventId, function () {
        return !(e.busy || flexbe_cli.is_admin || e.current <= e.total) && (e.busy = !0, flexbe_cli.stat.u_id && e.addFields([{
          name: "f_uid",
          type: "hidden",
          value: flexbe_cli.stat.u_id
        }], !1), e.addFields([{
          name: "jsform",
          type: "hidden",
          value: parseInt(448312, 10)
        }], !1), "undefined" != typeof FormData ? (e.sendFormdata(), !1) : !(e.$form.find('input[type="file"]').length < 1) || (e.sendAjax(), !1))
      })
    }, t.control = function () {
      var c = this;
      flexbe_cli.is_admin || ($("body").off("keydown" + this.eventId).on("keydown" + this.eventId, function (e) {
        if ([9, 13].includes(e.keyCode)) {
          var t = flexbe_cli.block.hasOverlay || [],
            i = c.outerModalId && "modal" === t[t.length - 1],
            s = !c.outerModalId && !t.length,
            a = c.inFocus && (s || i),
            n = 9 === e.keyCode,
            r = 13 === e.keyCode,
            o = e.metaKey || e.ctrlKey,
            l = e.shiftKey;
          if (a && (r || n) && ("TEXTAREA" !== e.target.tagName || !r || o)) return l && n ? 1 < c.current && c.toStep(c.current - 1) : c.current <= c.total && c.toStep(c.current + 1), e.preventDefault(), !1
        }
      }), this.$quiz.off("click.control").on("click.control", "[data-quiz-action]", function (e) {
        var t = $(e.currentTarget).data("quizAction"),
          i = c.current;
        "wellcome" === t ? i = 1 : "next" === t ? i += 1 : "prev" === t ? i -= 1 : "send" === t && (i = c.total + 1), c.toStep(i)
      }))
    }, t.setProgress = function () {
      var e = this.$progress.find(".progress-loader-bar .current"),
        t = this.current,
        i = this.total,
        s = parseInt(100 * t / i, 10),
        a = e.data("unit");
      if (e.length && a) {
        var n = s + "%";
        "step" === a ? n = t + " / " + i : "none" === a && (n = ""), e.attr("data-value", n)
      }
      this.$progress.attr("data-current", 0 < t ? t : 0), this.$progress.attr("data-current-progress", 0 < t ? s : 0), this.$progress.find(".progress-text .current").text(t), this.$progress.find(".progress-percent .current").text(s), this.$progress.find(".progress-loader-bar .current").css("width", s + "%"), this.$progress.find(".progress-loader-circle .current").attr("stroke-dashoffset", "" + Math.abs(100 - s))
    }, t.toStep = function (e, t) {
      var i = this;
      flexbe_cli.is_admin && e > this.total && (e = this.total);
      var s = this.hasWelcome && e <= 0,
        a = this.hasWelcome && !this.outerModalId ? 0 : 1;
      if (void 0 === e || e < a) e = a;
      else {
        if (!flexbe_cli.is_admin && e > this.current && !this.validateStep()) return !1;
        if (e > this.total) return this.current = e, this.$form.submit(), !0
      }
      if (t && this.$area.addClass("noanimate"), this.current = e, this.$area.data("quiz-step", e), this.$quiz.attr("data-active-step", e), this.$container.attr("data-active-step", e), this.$container.toggleClass("quiz-state-wellcome", s), this.$container.toggleClass("quiz-state-started", !s), this.setProgress(), s) {
        if (this.outerModalId) flexbe_cli.modal.close(this.outerModalId);
        else if (this.$container.length) {
          var n = this.$container.find('[data-quiz-part="' + (s ? "wellcome" : "done") + '"]').outerHeight() || 0;
          this.$container.css("minHeight", n), this.$stepsWrapper.css("minHeight", ""), flexbe_cli.run.is_ie && flexbe_cli.block.fixCoverHeight(this.$area)
        }
      } else {
        var r = this.$steps.find('[data-step-id="' + e + '"]'),
          o = r.outerHeight(),
          l = !!r.find(".form-field-text-input").length;
        if (r.prevAll().removeClass("active next").addClass("prev"), r.nextAll().removeClass("active prev").addClass("next"), r.removeClass("next prev").addClass("active"), !flexbe_cli.is_admin && !t) {
          var c = r.find(".form-field-text input, .form-field-text textarea, .dropdown-select");
          c.length && (c.focus(), setTimeout(function () {
            c.focus()
          }, 150))
        }
        if (this.$container.css("minHeight", o + "px"), this.$stepsWrapper.css("minHeight", o + "px"), flexbe_cli.run.is_ie && this.$area.find(".cover").css("height", "auto"), 2 === flexbe_cli.theme_id && flexbe_cli.block.headers) this.$area.find(".b_head").length && flexbe_cli.block.headers.setHeaders();
        setTimeout(function () {
          (i.initSwiper(e), i.initSwiper(e + 1), flexbe_cli.is_admin || flexbe_cli.run.is_mobile && l || !i.alreadyStepped && !i.hasWelcome) ? i.hasWelcome || (i.alreadyStepped = !0): (i.alreadyStepped = !0, !i.$area[0]._core || i.outerModalId || t || flexbe_cli.block.scrollTo(i.$area, !0, !0))
        }, 350)
      }
      return t && setTimeout(function () {
        i.$area.removeClass("noanimate")
      }, 150), flexbe_cli.events.emit("quiz_event", {
        event: "to_step",
        sender: "core",
        quiz: this
      }), !0
    }, t.validateStep = function (e) {
      var a = this;
      e || (e = this.current);
      var n = !0;
      return this.$steps.find('[data-step-id="' + e + '"]').find("[data-type]").each(function (e, t) {
        var i = $(t);
        i.removeClass("is_error");
        var s = a.checkField(i);
        s && (i.outerWidth(), i.addClass("is_error"), i.find(".error").text(s), i.find("input, textarea").focus(), n = !1)
      }), n
    }, t.checkField = function (e) {
      var t, i = e.find("input, textarea, select").not('[type="hidden"]'),
        s = i[0],
        a = e[0],
        n = a.getAttribute("data-type"),
        r = [!0, 1, "true", "1"].includes(a.getAttribute("data-is-required")),
        o = s.getAttribute("data-check") || !1,
        l = s.getAttribute("data-mask") || !1;
      t = 0 <= ["checkbox", "radio", "image"].indexOf(n) ? !!i.closest(":checked").length : "file" === n ? s.files : s.value;
      var c = !(!r || t) && "form.required";
      if (l) !r && !t || s.getAttribute("data-mask-complete") || (c = "phone" === n && t ? "form.phone" : "form.required");
      else if (o)
        if (t.length && "email" === n) {
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Zа-яёА-ЯЁ\-0-9]+\.)+[a-zA-Zа-яёА-ЯЁ]{2,}))$/.test(t) || (c = "form.email")
        } else if (t.length && "phone" == n) {
        if (/[^0-9+\(\)\-\s]/.test(t)) c = "form.digits";
        else t.replace(/[^0-9]/g, "").length < 5 && (c = "form.minlength")
      } else "file" == n && (c = !(!r || t.length) && "form.required");
      return c = c && flexbe_cli.lang.get(c) || !1
    }, t.customize = function () {
      this.customImageSelect(), this.customSelect(), this.customTextarea(), this.customFile(), this.needInitMasks && this.isLoaded && this.inputMask()
    }, t.customImageSelect = function () {
      this.$quiz.find(".form-field-image-item").on("click", function (e) {
        var t = $(e.currentTarget).find("input");
        t[0].checked = !t[0].checked
      })
    }, t.customFile = function () {
      this.$quiz.on("change", ".file-input", function (e) {
        var t = $(e.currentTarget),
          i = t.parents(".form-field-file"),
          s = i.find(".form-field-file-files"),
          a = t.val(),
          n = e.currentTarget.files.length;
        if (i.addClass("active"), t.parents(".field").removeClass("is_error"), 0 === n) i.removeClass("active");
        else if (1 === n) s.find(".text").text(a);
        else if (1 < n) {
          var r, o = n % 10;
          r = 1 === o && 11 !== n % 100 ? "form.filesMult" : 1 < o && o < 5 ? "form.filesMult1" : "form.filesMult2", s.find(".text").text(n + " " + flexbe_cli.lang.get(r))
        }
      }), this.$quiz.off("click.clear-files").on("click.clear-files", ".clear-files", function (e) {
        var t = $(e.currentTarget).parents(".form-field-file");
        t.find(".file-input").val(""), t.removeClass("active")
      })
    }, t.customSelect = function () {
      var u = this;
      this.$quiz.find(".dropdown-container").remove(), this.$quiz.find("select").each(function (e, t) {
        var s = $(t),
          i = s.children("optgroup"),
          o = s.closest('[data-type="select"]'),
          r = "",
          l = "";
        i.length && i.each(function (e, t) {
          var i = $(t),
            s = i.attr("label");
          l += '<li class="optgroup">' + s + "</li>", i.children("option").each(function (e, t) {
            var i = $(t),
              s = i.attr("value").replace(/"/g, "&quot;"),
              a = i.text() || "—",
              n = i.attr("selected");
            l += "selected" === n ? '<li class="selected" data-value="' + s + '">' + (r = a) + "</li>" : '<li data-value="' + s + '">' + a + "</li>"
          })
        }), s.children("option").each(function (e, t) {
          var i = $(t),
            s = i.val().replace(/"/g, "&quot;"),
            a = i.text() || "—",
            n = i.attr("selected");
          l += "selected" === n ? '<li class="selected" data-value="' + s + '">' + (r = a) + "</li>" : '<li data-value="' + s + '">' + a + "</li>"
        });
        var c = $('<div class="dropdown-container">\n                    <div class="dropdown-select">\n                        <span>' + r + '</span>\n                        <i></i>\n                    </div>\n                    <ul class="dropdown-select-ul">' + l + "</ul>\n                </div>"),
          d = c.find(".dropdown-select-ul");
        s.after(c), c.off("click.selectdd").on("click.selectdd", ".dropdown-select", function () {
          var e = u.$quiz.closest(".b_block"),
            t = e[0]._core,
            i = e.outerHeight() - 60,
            s = d.outerHeight(),
            a = Math.min(i, s),
            n = c.offset().top,
            r = t.tween.end - 30;
          r < n + a && d.css({
            top: r - (n + a) + "px",
            maxHeight: a + "px"
          }), setTimeout(function () {
            var e = !c.hasClass("active");
            c.toggleClass("active", e), o.toggleClass("active", e), e && $("body").on("click.quiz-select-element", function (e) {
              $(e.target).is(c) || $(e.target).closest(c).length || (c.removeClass("active"), o.removeClass("active"), $("body").off("click.quiz-select-element"))
            })
          }, 50)
        }), c.off("click.selectli").on("click.selectli", ".dropdown-select-ul li", function (e) {
          var t = $(e.currentTarget);
          if (!t.hasClass("optgroup")) {
            var i = t.closest("ul").siblings(".dropdown-select");
            c.removeClass("active"), o.removeClass("active"), t.siblings("li").removeClass("selected"), t.addClass("selected"), s.val(t.attr("data-value")), i.children("span").html(t.text())
          }
        })
      })
    }, t.customTextarea = function () {
      this.$quiz.find("textarea.autosize").each(function (e, t) {
        var i = t.offsetHeight - t.clientHeight,
          s = $(t);
        s.removeAttr("data-autoresize"), s.off("keyup input").on("keyup input", function (e) {
          e.currentTarget.style.height = "auto", e.currentTarget.style.height = e.currentTarget.scrollHeight + i + "px"
        })
      })
    }, t.sendFormdata = function () {
      var t = this,
        e = new FormData(this.$form.get(0));
      if (e.append("is_ajax", "true"), "undefined" != typeof flexbeAPI && void 0 !== flexbeAPI.customLeadData && e.append("customLeadData", JSON.stringify(flexbeAPI.customLeadData)), e.append("f_ab", JSON.stringify(flexbe_cli.stat.AB.getcookie())), flexbe_cli.run.is_OSX && "function" == typeof e.entries) {
        var i = e.entries(),
          s = Array.isArray(i),
          a = 0;
        for (i = s ? i : i[Symbol.iterator]();;) {
          var n;
          if (s) {
            if (a >= i.length) break;
            n = i[a++]
          } else {
            if ((a = i.next()).done) break;
            n = a.value
          }
          var r = n,
            o = r[0],
            l = r[1];
          "object" === _typeof(l) && l instanceof File && 0 === l.size && e.delete(o)
        }
      }
      this.$component.addClass("submitting"), this.$form.addClass("submitting"), $.ajax({
        url: this.$form.attr("action"),
        type: "POST",
        dataType: "json",
        processData: !1,
        contentType: !1,
        data: e,
        xhr: function () {
          var e = $.ajaxSettings.xhr();
          return e.upload, e
        }
      }).done(function (e) {
        t.$component.addClass("success"), t.$component.removeClass("submitting"), t.$form.removeClass("submitting"), e.send_formdata = !0, void 0 !== e.pay && (t.pay = e.pay), t.afterSend(), setTimeout(function () {
          t.$component.removeClass("success")
        }, 1e3)
      }).fail(function () {
        t.$component.removeClass("submitting success"), t.$form.removeClass("submitting"), t.busy = !1
      })
    }, t.sendAjax = function () {
      var t = this;
      this.$form.addClass("submitting");
      var e = this.$form.serialize();
      $.ajax({
        url: this.$form.attr("action"),
        type: "POST",
        dataType: "json",
        data: e + "&is_ajax=true"
      }).done(function (e) {
        t.$form.removeClass("submitting"), e.send_ajax = !0, void 0 !== e.pay && (t.pay = e.pay), t.afterSend()
      }).fail(function () {
        t.$form.removeClass("submitting")
      })
    }, t.afterSend = function () {
      var e = this,
        t = this.$form.find('input[name="action"]').val();
      flexbe_cli.stat.reach_goal("order_done");
      try {
        var i = this.$form.find('input[name="goal"]').val();
        void 0 !== i && "" !== i && flexbe_cli.stat.reach_goal(i)
      } catch (e) {}
      try {
        var s = this.$form.find('textarea[name="goal_html"]').val();
        if ("string" == typeof s && s.trim()) {
          var a = document.write;
          document.write = function (e) {
            $("body").eq(0).append(e)
          }, $("body").eq(0).append('<div style="display:none">' + s + "</div>"), setTimeout(function () {
            document.write = a
          }, 1e4)
        }
      } catch (e) {}
      if ("pay" === t && void 0 !== this.pay && null !== this.pay && 0 < this.pay.pay_link.length) {
        var n = window.location.origin + window.location.pathname + (window.location.search ? window.location.search + "&" : "?") + "pay_id=" + this.pay.pay_id + "&h=" + this.pay.pay_hash;
        try {
          window.history.pushState(null, null, n), setTimeout(function () {
            flexbe_cli.events.emit("pay", {
              action: "init"
            })
          }, 200)
        } catch (e) {
          setTimeout(function () {
            document.location = n
          }, 500)
        }
      } else if ("redirect" === t) {
        var r = this.$form.find('input[name="action_redirect"]').val();
        0 < r.length && setTimeout(function () {
          document.location = r
        }, 500)
      } else {
        var o = this.$component.find(".quiz-submit").attr("data-modal-id");
        if (!flexbe_cli.modal.find(o)) {
          var l = String(this.ownerId);
          o = (l && l.split("_")[0]) + "_" + o
        }
        flexbe_cli.modal.find(o) ? flexbe_cli.events.emit("modal_command", {
          command: "open",
          id: o
        }) : console.warn("Modal open error:", "There is no window attached to the form.", o)
      }
      setTimeout(function () {
        e.busy = !1, e.resetForm(), e.toStep(0)
      }, 1e3)
    }, t.resetForm = function () {
      this.$form.get(0).reset(), this.$form.find(".form-field-file, .file-input-outer").removeClass("active"), this.$form.find(".step-fields input:not(:hidden)").each(function (e, t) {
        t.value = null, t.checked = !1, t.removeAttribute("value"), t.removeAttribute("checked"), t.removeAttribute("data-mask-complete"), t._mask && t._mask.updateValue()
      })
    }, t.addFields = function (e, t) {
      void 0 === t && (t = !0);
      var i = this.$quiz.find(".form-fields-advanced");
      e.length && i[0] && (t && i.empty(), e.forEach(function (e) {
        i.find('input[name="' + e.name + '"]').remove();
        var t = $("<input>").attr("type", e.type).attr("name", e.name).attr("value", e.value);
        i.append(t)
      }))
    }, t.initSwiper = function (e) {
      if (!flexbe_cli.run.is_screen_all_mobile || !this.isLoaded) return !1;
      var t = this.$component.find('[data-step-id="' + e + '"] .quiz-slider-outer');
      t.length && !this.swiper[e] && (this.swiper[e] = new Swiper(t.eq(0), {
        init: !1,
        speed: 450,
        slidesPerView: "auto",
        freeMode: !0,
        spaceBetween: 0,
        slideToClickedSlide: !0,
        threshold: 10,
        autoHeight: !1,
        preventClicks: !0,
        touchMoveStopPropagation: !1,
        preventClicksPropagation: !0,
        preventInteractionOnTransition: !0,
        wrapperClass: "form-field-image-group",
        slideClass: "form-field-image-item",
        noSwipingClass: "redactor-box"
      }), this.swiper[e].init())
    }, t.inputMask = function () {
      return "undefined" != typeof IMask && (this.needInitMasks = !1, this.$masked.each(function (e, t) {
        flexbe_cli.components.classes.form.initMask(t)
      }), !0)
    }, e
  }(BaseComponent);
  flexbe_cli.components.classes.quiz = e
}();

function _inheritsLoose(t, e) {
  t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
}! function () {
  var t = function (s) {
    function t() {
      for (var t, e = arguments.length, i = new Array(e), a = 0; a < e; a++) i[a] = arguments[a];
      return (t = s.call.apply(s, [this].concat(i)) || this).is = "timer", t
    }
    _inheritsLoose(t, s);
    var e = t.prototype;
    return e.onInit = function () {
      this.$timer = this.$component.find(".timer"), this.data = this.$timer.data("time"), this.initTimer()
    }, e.initTimer = function () {
      var t = this.$timer,
        e = this.data,
        i = new Date;
      if ("date" === e.type) {
        var a = e.my ? String(e.my).replace(".", "/").split("/") : [1, 2018];
        this.finalDate = new Date(a[1], parseInt(a[0], 10) - 1, e.d, e.h, e.m)
      } else if ("monthly" === e.type) this.finalDate = new Date(i.getFullYear(), i.getMonth(), e.d, e.h, e.m), i.getTime() > this.finalDate.getTime() && (this.finalDate = new Date(i.getFullYear(), i.getMonth() + 1, e.d, e.h, e.m)), parseInt(e.d, 10) != this.finalDate.getDate() && (this.finalDate.setDate(0), i.getTime() > this.finalDate.getTime() && (this.finalDate = new Date(this.finalDate.getFullYear(), this.finalDate.getMonth() + 2, 0, e.h, e.m)));
      else if ("weekly" === e.type) {
        var s = parseInt(i.getDate(), 10) - parseInt(i.getDay(), 10) + parseInt(e.dw, 10);
        this.finalDate = new Date(i.getFullYear(), i.getMonth(), s, e.h, e.m), i.getTime() > this.finalDate.getTime() && this.finalDate.setDate(this.finalDate.getDate() + 7)
      } else "daily" === e.type ? (this.finalDate = new Date(i.getFullYear(), i.getMonth(), i.getDate(), e.h, e.m), i.getTime() > this.finalDate.getTime() && this.finalDate.setDate(this.finalDate.getDate() + 1)) : (this.finalDate = new Date, this.finalDate.setMonth(this.finalDate.getMonth() + 1, 15));
      this.$itemDay1 = t.find(".d [data-value]").eq(0), this.$itemDay2 = t.find(".d [data-value]").eq(1), this.$itemDay3 = t.find(".d [data-value]").eq(2), this.$itemHour1 = t.find(".h [data-value]").eq(0), this.$itemHour2 = t.find(".h [data-value]").eq(1), this.$itemMinute1 = t.find(".m [data-value]").eq(0), this.$itemMinute2 = t.find(".m [data-value]").eq(1), this.$itemSecond1 = t.find(".s [data-value]").eq(0), this.$itemSecond2 = t.find(".s [data-value]").eq(1), this.lastOffset = {
        d: void 0,
        h: void 0,
        m: void 0,
        s: void 0
      }, !flexbe_cli.is_admin && "none" !== this.data.on_expired && this.finalDate.getTime() < i.getTime() ? "element" === this.data.on_expired ? $(this.owner).hide() : $(this.root).hide() : this.start()
    }, e.tick = function () {
      if (this.secondLeft = this.finalDate.getTime() - (new Date).getTime(), this.secondLeft = Math.ceil(this.secondLeft / 1e3), this.secondLeft = this.secondLeft < 0 ? 0 : this.secondLeft, this.offset = {
          d: Math.floor(this.secondLeft / 60 / 60 / 24),
          h: Math.floor(this.secondLeft / 60 / 60) % 24,
          m: Math.floor(this.secondLeft / 60) % 60,
          s: this.secondLeft % 60
        }, this.lastOffset.d !== this.offset.d) {
        var t = this.offset.d.toString().split("");
        t.length < 2 && t.unshift(0), t.length < 3 && t.unshift(0), this.$itemDay1.attr("data-value", t[0]).text(t[0]), this.$itemDay2.attr("data-value", t[1]).text(t[1]), this.$itemDay3.attr("data-value", t[2]).text(t[2])
      }
      if (this.lastOffset.h !== this.offset.h) {
        var e = this.offset.h.toString().split("");
        e.length < 2 && e.unshift(0), this.$itemHour1.attr("data-value", e[0]).text(e[0]), this.$itemHour2.attr("data-value", e[1]).text(e[1])
      }
      if (this.lastOffset.m !== this.offset.m) {
        var i = this.offset.m.toString().split("");
        i.length < 2 && i.unshift(0), this.$itemMinute1.attr("data-value", i[0]).text(i[0]), this.$itemMinute2.attr("data-value", i[1]).text(i[1])
      }
      if (this.lastOffset.s !== this.offset.s) {
        var a = this.offset.s.toString().split("");
        a.length < 2 && a.unshift(0), this.$itemSecond1.attr("data-value", a[0]).text(a[0]), this.$itemSecond2.attr("data-value", a[1]).text(a[1])
      }
      this.lastOffset = this.offset, this.secondLeft < 0 && this.stop()
    }, e.start = function () {
      var t = this;
      this.tick(), clearInterval(this.interval), this.interval = setInterval(function () {
        t.tick()
      }, 200)
    }, e.stop = function () {
      clearInterval(this.interval)
    }, t
  }(BaseComponent);
  flexbe_cli.components.classes.timer = t
}();

function _typeof(e) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  })(e)
}! function () {
  var r = {};
  flexbe_cli.block = {
    hasOverlay: [],
    $list: !1,
    get $blocks() {
      return this.$list && this.$list.find(".b_block")
    },
    init: function () {
      var i = this;
      this.$list = $(" header, .container-list, footer"), this.$blocks.toArray().forEach(function (e) {
        return i.bind(e, {}, "init")
      }), this.dispathEvents()
    },
    dispathEvents: function () {
      var n = this;
      $(window).on("documentresize.flexbe_block", function () {
        n.checkSizes()
      }), $(window).on("resized.flexbe_block orientationchange.flexbe_block", function () {
        n.checkSizes(), n.fixCoverHeight()
      }), $(window).on("load.flexbe_block", function () {
        if (/^#/.test(location.hash)) {
          var e = String(location.hash).replace(/^#{1,2}/, ""),
            i = n.$list.find(".b_" + e + ', .b_block ._anchor[name="' + e + '"]').eq(0);
          i && n.scrollTo(i.closest(".b_block"))
        }
      }), flexbe_cli.is_admin && (flexbe_cli.events.on("block_render.flexbe_block block_change.flexbe_block", function (e, i) {
        if (i && i.id && (/render/.test(e.type) || i.name && !i.templateRendered && !i.styleRendered)) {
          var t = $('[data-id="' + i.id + '"]', n.$list)[0];
          n.bind(t, i, "render")
        }
      }), flexbe_cli.events.on("block_resize", function (e, i) {
        if (i && i.id) {
          var t = document.querySelector('[data-id="' + i.id + '"]');
          n.bind(t, i, "resize")
        }
      }), flexbe_cli.events.on("client_msg.flexbe_block", function (e, i) {
        if (i && i.id && "block" === i.is) {
          var t = $('[data-id="' + i.id + '"]', n.$list)[0];
          n.bind(t, i, "message")
        }
      }), flexbe_cli.events.off("layout_change.flexbe_block").on("layout_change.flexbe_block", $.debounce(function (e, i) {
        i && "block" !== !i.is && (n.updateTweens(), n.fixCoverHeight())
      }, 100)))
    },
    pushOverlay: function (e, i) {
      return i && this.hasOverlay.includes(e) && this.hasOverlay.splice(this.hasOverlay.indexOf(e)), this.hasOverlay.push(e), !0
    },
    removeOverlay: function (e) {
      return this.hasOverlay.includes(e) && this.hasOverlay.splice(this.hasOverlay.indexOf(e)), !0
    },
    updateTweens: function () {
      this.$blocks.each(function (e, i) {
        i._core && i._core._tween()
      })
    },
    checkSizes: function () {
      var i = this;
      this.$blocks.toArray().forEach(function (e) {
        return i.bind(e, {}, "resize")
      })
    },
    scrollTo: function (e, i, t) {
      if (void 0 === i && (i = !0), void 0 === t && (t = !1), e = ("object" !== _typeof(e) ? $('.b_block[data-id="' + e + '"]', this.$list).eq(0) : $(e))[0]) {
        var n, o = e,
          l = o.offsetTop,
          r = o.offsetHeight,
          c = flexbe_cli.resize.height - r;
        i && r < flexbe_cli.resize.height ? (n = l - c / 2, c < 180 && flexbe_cli.run.is_screen_pc && $('[data-b-type*="header"][data-b-type*="floating"]').length && (n -= 80)) : n = t && r > flexbe_cli.resize.height ? l + (r - flexbe_cli.resize.height) / 2 : l, $("body, html").animate({
          scrollTop: n
        })
      }
    },
    fixCoverHeight: function (e) {
      void 0 === e && (e = this.$list.find(".b_block")), e.each(function (e, i) {
        var t = $(i),
          n = t.find(".cover");
        if (n.length) {
          var o = 0,
            l = flexbe_cli.resize.height;
          if ([2, 3].includes(flexbe_cli.theme_id)) {
            var r, c = t.prevAll(".b_block");
            r = (r = flexbe_cli.is_admin && t.is('[data-abtest-variant="b"]') ? c.eq(1) : c.eq(0)).filter('[data-b-type*="header"]').not('[data-b-type*="overflow"]'), o = Math.max(0, r.outerHeight() || 0)
          }
          var s = l - o;
          n.css("min-height", s + "px"), flexbe_cli.run.is_ie && s >= n.outerHeight() && n.css("height", "1px")
        }
      })
    },
    bind: function (e, i, t) {
      if (void 0 === i && (i = {}), !e) return !1;
      var n = e.getAttribute("data-b-id"),
        o = e._core;
      if (!o) {
        var l = r[n] || {};
        o = new BlockCore(e, l), e._core = o, t && !["message"].includes(t) || o.init(i)
      }
      return ["init", "render"].includes(t) ? o.init(i) : "resize" === t ? o._onResize(i) : "message" === t && o._onMsg(i.msg, i.data), {
        core: o
      }
    },
    register: function (e, i) {
      void 0 === i && (i = {}), e || console.warn("Element register error: Element must have templateId"), r[e] = i
    }
  }
}();
! function () {
  var l = {};
  flexbe_cli.modal = {
    opened: {},
    init: function () {
      var t = this;
      this.list = document.querySelector(".modal-list"), this.$list = $(this.list), this.$list.find(".m_modal").toArray().forEach(function (e) {
        return t.bind(e, {}, "init")
      });
      var e = getJsonFromUrl();
      if (e.service && e.m_id) return this.$list.addClass("noanimate"), this.open(e.m_id), !1;
      this.popstate(), this.dispathEvents()
    },
    dispathEvents: function () {
      var o = this;
      flexbe_cli.events.on("modal_render.flexbe_modal modal_change.flexbe_modal", function (e, t) {
        if (t && t.id && (/render/.test(e.type) || t.name && !t.templateRendered && !t.styleRendered)) {
          var i = (o.find(t.id) || {}).modal;
          o.bind(i, t, "render")
        }
      }), flexbe_cli.events.on("client_msg.flexbe_modal", function (e, t) {
        if (t && t.id && "modal" === t.is) {
          var i = (o.find(t.id) || {}).modal;
          o.bind(i, t, "message")
        }
      }), flexbe_cli.events.on("modal_command.flexbe_modal", function (e, t) {
        if (t) switch (t.command) {
          case "open":
            o.open(t.id, t.data);
            break;
          case "close":
            o.close(t.id)
        }
      }), $("body").on("click.modal-close", ".m_modal .close", function (e) {
        e.preventDefault(), e.stopPropagation();
        var t = $(e.currentTarget).closest(".m_modal").data("id");
        o.close(t)
      }), flexbe_cli.is_admin || $("body").off("click.modal-close-overlay").on("click.modal-close-overlay", ".modal-data", function (e) {
        if (!flexbe_cli.run.is_mobile && Object.keys(o.opened).length && ($(e.target).is(".modal-data") || $(e.target).is('[data-overlay="true"]'))) {
          var t = $(".m_modal.show").eq(0).attr("data-id");
          o.close(t)
        }
      }), flexbe_cli.is_admin || $(window).off("keyup.modal-close-esc").on("keyup.modal-close-esc", function (e) {
        if (27 !== e.keyCode) return !0;
        var t = $(".m_modal.show").eq(0).attr("data-id");
        o.close(t)
      })
    },
    popstate: function () {
      var i = this;
      if (flexbe_cli.is_admin || flexbe_cli.lockPopstate) return !1;
      setTimeout(function () {
        if (/^#{1,2}/.test(location.hash) && location.hash.replace(/^#{1,2}/, "")) {
          var e = location.hash.replace(/^#{1,2}/, ""),
            t = i.$list.find('._anchor[name="' + e + '"], .m_modal[data-id="' + e + '"]').closest(".m_modal").attr("data-id");
          i.opened[t] || i.open(t)
        } else i.close()
      }, 50)
    },
    find: function (e) {
      var t = this.$list.find('[data-id="' + e + '"]').toArray(),
        i = t[0] || !1;
      return !!i && {
        modals: t,
        modal: i
      }
    },
    open: function (e, t, i) {
      if (void 0 === t && (t = {}), void 0 === i && (i = {}), !e) return !1;
      var o = this.find(e) || {},
        a = o.modals,
        n = o.modal,
        l = $(a);
      if (1 < l.length) {
        var d = i.multivar;
        if (!d) {
          var r = String(e).split("_")[0];
          d = $('[data-id="' + r + '"]').attr("data-multivar")
        }
        var s = [];
        d && "default" !== d && (s = l.filter('[data-multivar="' + d + '"]').eq(0)), n = (l = s.length ? s.eq(0) : l.eq(0))[0]
      }
      var c = (n && this.bind(n) || {}).core;
      return c ? (this.close(null, e), c.open(t, i), this.opened[e] = c, !0) : (console.warn("Try to open modal without core object,", "id: " + e + ",", "modal: ", n), !1)
    },
    close: function (e, t) {
      var i = this;
      if (!e) return Object.keys(this.opened).map(function (e) {
        if (i.opened[e] && e != t) return i.close(e, t)
      });
      if (!this.opened[e]) return !1;
      delete this.opened[e];
      var o = (this.find(e) || {}).modal,
        a = (o && this.bind(o) || {}).core;
      return a ? (a.close({
        from: t
      }), !0) : (console.warn("Try to close modal without core object"), !1)
    },
    bind: function (e, t, i) {
      if (void 0 === t && (t = {}), !e) return !1;
      var o = e.getAttribute("data-m-id"),
        a = e._core;
      if (!a) {
        var n = l[o] || {};
        a = new ModalCore(e, n), e._core = a, ["init", "render"].includes(i) || a.init(t)
      }
      return ["init", "render"].includes(i) ? a.init(t) : "message" === i && a._onMsg(t.msg, t.data), {
        core: a
      }
    },
    register: function (e, t) {
      void 0 === t && (t = {}), e || console.warn("Element register error: Element must have templateId"), l[e] = t
    }
  }
}();
! function () {
  var s = {};
  flexbe_cli.widget = {
    init: function () {
      var i = this;
      this.$list = $(".widget-list"), this.list = this.$list.get(0), this.$list.find(".w_widget").toArray().forEach(function (e) {
        return i.bind(e, {}, "init")
      }), this.dispathEvents()
    },
    dispathEvents: function () {
      var n = this;
      flexbe_cli.events.on("widget_render.flexbe_widget widget_change.flexbe_widget", function (e, i) {
        if (i && i.id && (/render/.test(e.type) || i.name && !i.templateRendered && !i.styleRendered)) {
          var t = $('[data-id="' + i.id + '"]', n.$list)[0];
          n.bind(t, i, "render")
        }
      }), flexbe_cli.events.on("client_msg.flexbe_widget", function (e, i) {
        if (i && i.id && "widget" === i.is) {
          var t = n.list.querySelector('[data-id="' + i.id + '"]');
          n.bind(t, i, "message")
        }
      })
    },
    bind: function (e, i, t) {
      if (void 0 === i && (i = {}), !e) return !1;
      var n = e.getAttribute("data-w-id"),
        r = e._core;
      if (!r) {
        var d = s[n] || {};
        r = new WidgetCore(e, d), e._core = r, ["init", "render"].includes(t) || r.init(i)
      }
      return ["init", "render"].includes(t) ? r.init(i) : "message" === t && r._onMsg(i.msg, i.data), {
        core: r
      }
    },
    register: function (e, i) {
      void 0 === i && (i = {}), e || console.warn("Element register error: Element must have templateId"), s[e] = i
    }
  }
}();
flexbe_cli.menu = {
  anchors: [],
  floating: !1,
  offset: 0,
  init: function () {
    this.createMobileMenu(), this.floatingMenu()
  },
  floatingMenu: function () {
    if (!flexbe_cli.is_admin && !this.floating) {
      var i = [];
      if ((i = $("[data-floating=true]").eq(0))[0]) {
        var t, o = i.parents(".b_block").last()[0]._core,
          a = i.outerHeight(),
          l = parseInt(i.attr("data-floating-type"), 10) || 1;
        this.floating = o.id, i.siblings(".fixer").height(a), flexbe_cli.run.is_screen_mobile || flexbe_cli.run.is_screen_tablet_s ? (i = $(".mobile-menu .menu-burger"), l = 1) : i = i.add(".mobile-menu .menu-burger"),
          function e() {
            var n;
            requestAnimationFrame(e), n = (o && o.tween ? o.tween.position : window.pageYOffset / (a / 2)) >= r, s !== n && (s = n, i.off("transitionend"), n ? (i.addClass("floating"), clearTimeout(t), t = setTimeout(function () {
              i.addClass("animate show")
            }, 50)) : 1 === l ? (i.removeClass("show"), i.one("transitionend", function () {
              i.removeClass("animate floating")
            })) : i.removeClass("show animate floating"))
          }();
        var s = !1,
          r = .02;
        1 === l && (r = (o && o.tween && o.tween.height) < 200 ? 2 : 1)
      }
    }
  },
  createMobileMenu: function () {
    if (!flexbe_cli.adaptive || 99 === flexbe_cli.theme_id) return !1;
    var e = $(".b_block:not(.hidden) .menu-burger");
    if (!this.$mobileMenu && (this.$mobileMenu = $('<div class="mobile-menu">\n                        <div class="menu-burger">\n                            <span class="menu"><i></i><i></i><i></i></span>\n                        </div>\n                        <div class="menu-wrapper">\n                            <div class="overlay"></div>\n                            <div class="menu-content">\n                                <div class="scroll-wrap">\n                                    <div class="logo-holder"></div>\n                                    <div class="menu-holder"></div>\n                                    <div class="text-holder"></div>\n                                    <div class="socials-holder"></div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>').appendTo("body"), e[0])) {
      var n = e.eq(0).closest(".b_block").data("bId"),
        i = e.eq(0).closest(".b_block").data("id");
      e.not(":first").remove(), this.$mobileMenu.attr("data-id", i).attr("data-b-id", n)
    }
    var a = this.$mobileMenu.find(".logo-holder"),
      l = this.$mobileMenu.find(".menu-holder"),
      s = this.$mobileMenu.find(".text-holder"),
      r = this.$mobileMenu.find(".socials-holder");

    function c(e, n) {
      var i = d(e),
        l = i.url,
        s = i.search,
        r = i.hash,
        c = 0;
      return n.find("a").each(function (e, n) {
        var i = d(n.href),
          t = i.url,
          o = i.hash,
          a = i.search;
        t === l && a === s && o === r && (c += 1)
      }), !c
    }

    function d(e) {
      var n = String(e).trim().replace(/http(?:s)?:\/\//, "//").split("?"),
        i = (n[0] || "").replace(/^\.\//, "").replace(/\/$/, ""),
        t = (n[1] || "").split("#"),
        o = t[0],
        a = t[1];
      return i && location.host + location.pathname !== i.replace(/^\/\//, "") || (i = "./"), {
        url: i,
        search: o,
        hash: a
      }
    }
    $(".b_block").not(".hidden").find('[data-role="mobile-menu"]').each(function (e, n) {
      $(n).find("[data-role]").each(function (e, n) {
        var i, t, o = $(n);
        switch (o.attr("data-role")) {
          case "logo":
            t = o, a.contents().length || a.html(t.contents());
            break;
          case "text":
            i = o, s.contents().length || s.html(i.contents());
            break;
          case "menu":
            ! function (e) {
              l.contents().length || (l.append(e.clone().contents()), l.find("li").remove());
              var o = l.find("ul");
              e.find("a[href]").each(function (e, n) {
                var i = c(n.href, o);
                if (i) {
                  var t = $(n).closest("li");
                  o.append(t)
                }
              })
            }(o);
            break;
          case "socials":
            ! function (e) {
              if (r.contents().length) {
                var o = r.find(".socials-wrap");
                e.find("a[href]").each(function (e, n) {
                  var i = $(n).attr("href"),
                    t = c(i, o);
                  t && o.append(n)
                })
              } else r.append(e.contents())
            }(o)
        }
      })
    }), l.find(".component-menu").removeAttr("data-style"), this.toggleMobileMenu()
  },
  toggleMobileMenu: function () {
    var n, i = $("body > .mobile-menu").eq(0);

    function t(e) {
      clearTimeout(n), n = setTimeout(function () {
        $("body").toggleClass("overflow fixed", e), i.toggleClass("show", e).off("click.mobile-menu-close"), e && i.on("click.mobile-menu-close", function (e) {
          var n = $(e.target);
          (2 === flexbe_cli.theme_id && n.is(".overlay") || 3 === flexbe_cli.theme_id && !n.closest(".menu-holder").length) && t(!1)
        })
      }, 100)
    }
    $(".menu-burger").off("click.mobile-menu-toggle").on("click.mobile-menu-toggle", function () {
      t(!i.hasClass("show"))
    }), i.on("close", function () {
      t(!1)
    }), i.on("open", function () {
      t(!0)
    })
  }
};
flexbe_cli.init = function () {
  flexbe_cli.run.init(), flexbe_cli.events.init(), flexbe_cli.lib.init(), flexbe_cli.lang.init(), flexbe_cli.stat.init(), flexbe_cli.scroll.init(), flexbe_cli.resize.init(), flexbe_cli.components.init(), flexbe_cli.block.init(), flexbe_cli.modal.init(), flexbe_cli.widget.init(), flexbe_cli.menu.init()
}, flexbe_cli._init();
