flexbe_cli.block.register(10, {
  onLoad: function () {
    var i = this;
    if (flexbe_cli.is_admin) {
      this.$map = $(".component-map", this.$block), this.data = this.$map.data("data");
      var a = this.$map[0].offsetHeight;
      clearInterval(this.timer), this.timer = setInterval(function () {
        var t = i.$map[0].offsetHeight;
        t != a && (a = t, i.$map.trigger("resizeMap"))
      }, 100)
    }
  }
});
flexbe_cli.block.register(102, {
  onLoad: function () {
    this.fixHeight()
  },
  onUpdate: function (i) {
    i.templateRendered && this.fixHeight()
  },
  fixHeight: function () {
    if (!(window.innerWidth <= 768)) {
      var e = 0,
        i = this.$block.find(".item-title");
      i.css("min-height", ""), i.each(function (i, t) {
        e = Math.max($(t).outerHeight(), e)
      }), i.css("min-height", e + "px")
    }
  }
});
flexbe_cli.block.register(103, {
  onLoad: function () {
    var i = this;
    this.fixWidth();
    var t = 0;
    $(window).off("resize." + this.id).on("resize." + this.id, function () {
      clearTimeout(t), t = setTimeout(i.fixWidth.bind(i), 250)
    })
  },
  fixWidth: function () {
    if (!(window.innerWidth <= 768)) {
      var i = this.$block.find(".table"),
        t = i.data("size") + 1,
        n = i.innerWidth();
      i.find(".td").css("width", n / t + "px")
    }
  }
});
flexbe_cli.block.register(104, {
  onLoad: function () {
    var i = this;
    this.fixWidth();
    var t = 0;
    $(window).off("resize." + this.id).on("resize." + this.id, function () {
      clearTimeout(t), t = setTimeout(i.fixWidth.bind(i), 250)
    })
  },
  onScreen: function (i) {
    i && this.fixWidth()
  },
  fixWidth: function () {
    if (!(window.innerWidth <= 768)) {
      var i = this.$block.find(".table"),
        t = i.find(".row"),
        o = [];
      i.find(".td").css("width", ""), t.each(function (i, t) {
        var n = $(t).find("> .td");
        0 === i && n.each(function (i, t) {
          void 0 === o[i] && (o[i] = $(t).outerWidth().toString() + "px")
        }), n.each(function (i, t) {
          $(t).css("width", o[i])
        })
      })
    }
  }
});
flexbe_cli.block.register(106, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (e) {
    var i = this,
      t = i.$block.find(".slider-main"),
      r = i.$block.find(".slider-preview"),
      s = i.$block.find(".slider-button"),
      n = t.data("count");
    1 != n && (i.current = Math.floor(i.$block.data("slide-move")) || 0, i.current >= n && (i.current = n - 1), i.current < 0 && (i.current = 0), i.swiper = new Swiper(t[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "redactor-box",
      navigation: {
        prevEl: s[0],
        nextEl: s[1]
      },
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      preventClicks: !0,
      spaceBetween: 15,
      autoHeight: !0,
      initialSlide: i.current,
      on: {
        init: function () {
          var e = this;
          flexbe_cli.is_admin && (this.update(), setTimeout(function () {
            return e.update()
          }, 200), setTimeout(function () {
            return e.update()
          }, 1e3), setTimeout(function () {
            return e.update()
          }, 3e3))
        },
        slideChange: function () {
          i.current = this.activeIndex, i.setCurrent()
        }
      }
    }), this.preview = new Swiper(r[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      preventClicks: !0,
      slidesPerView: "auto",
      spaceBetween: 0,
      slideToClickedSlide: !0,
      initialSlide: this.current,
      on: {
        tap: function () {
          void 0 !== this.clickedIndex && (i.current = this.clickedIndex, i.setCurrent())
        }
      }
    }), e && "items_add" === e.reason && (this.swiper.slideTo(e.reasonData.to), this.preview.slideTo(e.reasonData.to)), i.setCurrent())
  },
  setCurrent: function () {
    this.swiper && this.swiper.slideTo(this.current || 0), this.preview && this.preview.slideTo(Math.max(this.current - 1, 0)), this.$block.data("slide-move", this.current), this.$block.find(".slide").removeClass("active").closest('[data-item-id="' + (this.current + 1) + '"]').addClass("active")
  },
  onUpdate: function (e) {
    e.styleRendered && this.swiper && this.swiper.update(!1)
  }
});
flexbe_cli.block.register(107, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (i) {
    var e = this,
      t = this.$block.find(".slider-main"),
      s = this.$block.find(".slider-button"),
      n = this.$block.find(".slider-pagination"),
      r = t.data("count"),
      a = t.data("slider");
    r <= 4 || !a || (this.current = Math.floor(this.$block.data("slide-move")) || 0, this.current >= r && (this.current = r - 1), this.current < 0 && (this.current = 0), this.swiper = new Swiper(t[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "redactor-box",
      navigation: {
        prevEl: s[0],
        nextEl: s[1]
      },
      pagination: {
        el: n[0],
        type: "bullets",
        clickable: !0
      },
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      preventClicks: !0,
      spaceBetween: 0,
      initialSlide: this.current,
      simulateTouch: !flexbe_cli.is_admin,
      on: {
        slideChange: function () {
          e.current = this.activeIndex, e.$block.data("slide-move", this.activeIndex)
        }
      }
    }), i && "items_add" === i.reason && this.swiper.slideTo(i.reasonData.to))
  }
});


flexbe_cli.block.register(111, {
  mapInit: !1,
  index: !1,
  onLoad: function () {
    var t = this;
    this.$map = $(".component-map", this.$block), this.$map.length ? this.initMap() : setTimeout(function () {
      t.onLoad()
    }, 50)
  },
  initMap: function () {
    var a = this;
    if (this.data = this.$map.data("data"), this.$map.on("mapInit", function () {
        a.mapInit = !0, a.selectMark(a.index || 0, !0)
      }), this.$block.find(".tab-list").on("click", "a", function (t) {
        var i = parseInt($(t.currentTarget).closest(".tab").attr("data-item-id"), 10) - 1;
        a.selectMark(i)
      }), this.$map.on("balloonOpen", function (t, i) {
        a.selectMark(i)
      }), flexbe_cli.is_admin) {
      var i = this.$map[0].offsetHeight;
      clearInterval(this.timer), this.timer = setInterval(function () {
        var t = a.$map[0].offsetHeight;
        t != i && (i = t, a.$map.trigger("resizeMap"))
      }, 100)
    }
  },
  selectMark: function (t, i) {
    void 0 === i && (i = !1);
    var a = this.data.places[t];
    if (a && (this.index != t || i)) {
      this.index = t;
      var e = this.$block.find(".tab-list"),
        s = this.$block.find(".item-list");
      e.find(".active").removeClass("active"), s.find(".active").removeClass("active"), e.find('[data-item-id="' + (this.index + 1) + '"]').addClass("active"), s.find('[data-item-id="' + (this.index + 1) + '"]').addClass("active"), this.data.center = a.coords, this.$map.trigger("selectMark", this.index)
    }
  }
});
flexbe_cli.block.register(112, {
  onLoad: function () {
    if ($(".grid.expanded", this.$block).length) {
      var n = $(".item", this.$block),
        e = flexbe_cli.is_admin ? ".expand-button" : ".item-title";
      $(e, n).on("click", function (e) {
        var t = $(e.currentTarget).parents(".item"),
          i = t.find(".item-desc").get(0),
          l = t.find(".desc").outerHeight(!0);
        flexbe_cli.is_admin || (n.not(t).addClass("collapsed"), i.style.cssText = l ? "max-height: " + l + "px" : "max-height: none"), t.toggleClass("collapsed")
      })
    }
  }
});
flexbe_cli.block.register(117, {
  onLoad: function () {
    var i = this;
    if (this.$map = $(".component-map", this.$block), this.data = this.$map.data("data"), flexbe_cli.is_admin) {
      var a = this.$map[0].offsetHeight;
      clearInterval(this.timer), this.timer = setInterval(function () {
        var t = i.$map[0].offsetHeight;
        t != a && (a = t, i.$map.trigger("resizeMap"))
      }, 100)
    }
  }
});
flexbe_cli.block.register(118, {
  onLoad: function () {}
});


flexbe_cli.block.register(46, {
  onLoad: function () {
    this.$block.find(".overlayed")[0] && this.$block.on("mouseover mouseout", ".item", function (e) {
      var t = $(e.currentTarget),
        o = t.find(".overlay");
      if (t.toggleClass("hover", "mouseover" === e.type), "mouseover" === e.type) {
        var i = parseInt(o.find(".img-title").outerHeight(!0) || 0, 10),
          r = parseInt(o.find(".img-desc").outerHeight(!0) || 0, 10),
          s = parseInt(o.find(".img-text").outerHeight(!0) || 0, 10);
        o.css("minHeight", 40 + i + r + s + "px")
      } else o.attr("style", "")
    })
  }
});
flexbe_cli.block.register(48, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (e) {
    var i = this,
      s = this.$block.find(".slider-main"),
      t = this.$block.find(".slider-button"),
      r = this.$block.find(".slider-pagination"),
      a = s.data("count");
    a <= 1 || !s[0] || (this.slideshow = !flexbe_cli.is_admin && Math.floor(1e3 * s.data("slideshow")) || 0, this.current = Math.floor(this.$block.data("slide-move")) || 0, this.current = Math.max(0, Math.min(a - 1, this.current)), this.swiper = new Swiper(s[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "redactor-box",
      navigation: {
        prevEl: t[0],
        nextEl: t[1]
      },
      pagination: {
        el: r[0],
        type: "bullets",
        clickable: !0
      },
      touchMoveStopPropagation: !1,
      preventClicksPropagation: !0,
      preventClicks: !0,
      simulateTouch: !flexbe_cli.is_admin,
      speed: 650,
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 0,
      autoHeight: !1,
      threshold: 10,
      initialSlide: this.current,
      autoplay: this.slideshow && {
        delay: this.slideshow
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          speed: 350
        }
      },
      on: {
        slideChange: function () {
          i.current = this.activeIndex, i.setCurrent()
        }
      }
    }), e && "items_add" === e.reason && this.swiper.slideTo(e.reasonData.to))
  },
  setCurrent: function () {
    this.$block.data("slide-move", this.current)
  },
  onFocus: function (e) {
    this.swiper && this.swiper.autoplay && this.slideshow && (e ? this.swiper.autoplay.run() : this.swiper.autoplay.pause())
  },
  onUpdate: function (e) {
    e.styleRendered && this.swiper && this.swiper.update(!1)
  }
});
flexbe_cli.block.register(49, {
  onLoad: function () {
    var t = this;
    this.$fluid = this.$block.find(".container-fluid"), this.$list = this.$block.find(".item-list"), this.$items = this.$block.find(".item");
    var i = {
      cols: 3,
      margin: this.$list.data("margin")
    };
    this.loadImages(function () {
      return t.render(i)
    }), $(window).off("resize.b" + this.id).on("resize.b" + this.id, function () {
      return t.render(i, 200)
    })
  },
  tmt: 0,
  render: function (n, t, h) {
    var u = this;
    void 0 === t && (t = 0), void 0 === h && (h = !1), clearTimeout(this.tmt), this.tmt = setTimeout(function () {
      if ($(window).width() < 767) return u.$list.removeAttr("style"), u.$fluid.removeAttr("style"), u.$items.removeAttr("style"), !1;
      var t, r, s, i, o, a = 0,
        l = [];
      i = parseInt(n.cols || 3), t = u.$list.outerWidth(), r = parseInt(n.margin || 0, 10), s = parseInt(t / i, 10) - r, o = 1 == i ? -r / 2 : t % (s + r) / 2;
      for (var e = 0; e < i; e++) l.push(-r / 2);
      u.$items.each(function (t, i) {
        var e = $(i),
          n = u.getColumn(l);
        e.css({
          position: "absolute",
          width: s,
          margin: r / 2,
          top: l[n] + r / 2,
          left: (s + r) * n + o
        }), l[n] += e.outerHeight() + r, a < l[n] && (a = l[n])
      }), a && u.$list.css("min-height", a + parseInt(r / 2, 10) + "px"), h || u.render(n, 1e3, !0)
    }, t)
  },
  loadImages: function (n) {
    void 0 === n && (n = function () {});
    var t = this.$items.find("img"),
      r = t.length - 1;
    0 === r && n(), t.each(function (t, i) {
      var e = new Image;
      e.onload = e.onerror = function () {
        return 0 < r ? r-- : n()
      }, e.src = i.src
    })
  },
  getColumn: function (t) {
    var i;
    return 0 < (i = $.inArray(Math.min.apply(Math, t), t)) && t[i - 1] - t[i] < 20 ? i-- : 0 < i && t[0] - t[i] < 20 && (i = 0), i
  }
});

flexbe_cli.block.register(69, {
  onLoad: function () {
    flexbe_cli.run.is_mobile && this.$block.find(".parallax").removeClass("parallax")
  }
});
flexbe_cli.block.register(70, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (e) {
    var i = this,
      r = i.$block.find(".slider-main"),
      s = i.$block.find(".slider-button"),
      t = i.$block.find(".slider-pagination"),
      n = r.data("count"),
      l = r.data("slider");
    n <= 2 || !l || (i.current = Math.floor(i.$block.data("slide-move")) || 0, e && "items_add" === e.reason && (i.current = e.reasonData.to), i.current >= n && (i.current = n - 1), i.current < 0 && (i.current = 0), i.swiper = new Swiper(r.find(".slider-wrapper")[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "fr-element",
      navigation: {
        prevEl: s[0],
        nextEl: s[1]
      },
      pagination: {
        el: t[0],
        type: "bullets",
        clickable: !0
      },
      simulateTouch: !flexbe_cli.is_admin,
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      preventClicks: !0,
      speed: 450,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
      autoHeight: !flexbe_cli.is_admin,
      initialSlide: i.current,
      breakpoints: {
        768: {
          speed: 350,
          slidesPerView: 1,
          slidesPerGroup: 1
        }
      },
      on: {
        slideChange: function () {
          i.current = this.activeIndex, i.$block.data("slide-move", this.activeIndex)
        }
      }
    }))
  },
  onUpdate: function (e) {
    e.styleRendered && this.swiper && this.swiper.update(!1)
  }
});
flexbe_cli.block.register(71, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (e) {
    var i = this,
      t = i.$block.find(".slider-main"),
      s = i.$block.find(".slider-button"),
      r = i.$block.find(".slider-pagination"),
      a = t.data("count");
    1 != a && (i.slideshow = !flexbe_cli.is_admin && Math.floor(1e3 * t.data("slideshow")) || 0, i.current = Math.floor(i.$block.data("slide-move")) || 0, i.current >= a && (i.current = a - 1), i.current < 0 && (i.current = 0), i.swiper = new Swiper(t[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "redactor-box",
      navigation: {
        prevEl: s[0],
        nextEl: s[1]
      },
      pagination: {
        el: r[0],
        type: "bullets",
        clickable: !0
      },
      simulateTouch: !flexbe_cli.is_admin,
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      preventClicks: !0,
      paginationClickable: !0,
      speed: 450,
      spaceBetween: 0,
      autoHeight: !1,
      initialSlide: i.current,
      loop: !1,
      autoplay: i.slideshow && {
        delay: i.slideshow
      },
      on: {
        init: function () {
          $(".swiper-slide-duplicate .img-popup", this.$wrapperEl).on("click", function (e) {
            var i = $(e.currentTarget).parents(".swiper-slide-duplicate");
            $(".img-popup", i.siblings(".slide[data-swiper-slide-index=" + i.attr("data-swiper-slide-index") + "]")).trigger("click"), e.preventDefault()
          })
        },
        slideChange: function () {
          i.current = this.activeIndex, i.setCurrent()
        }
      }
    }), e && "items_add" === e.reason && this.swiper.slideTo(e.reasonData.to))
  },
  setCurrent: function () {
    this.$block.data("slide-move", this.current)
  },
  onFocus: function (e) {
    this.swiper && this.swiper.autoplay && this.slideshow && (e ? this.swiper.autoplay.run() : this.swiper.autoplay.pause())
  },
  onUpdate: function (e) {
    e.styleRendered && this.swiper && this.swiper.update(!1)
  }
});
flexbe_cli.block.register(72, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (e) {
    var i = this,
      t = i.$block.find(".slider-main"),
      s = i.$block.find(".slider-button"),
      r = i.$block.find(".slider-pagination"),
      a = t.data("count");
    1 != a && (i.slideshow = !flexbe_cli.is_admin && Math.floor(1e3 * t.data("slideshow")) || 0, i.current = Math.floor(i.$block.data("slide-move")) || 0, i.current >= a && (i.current = a - 1), i.current < 0 && (i.current = 0), i.swiper = new Swiper(t[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "redactor-box",
      navigation: {
        prevEl: s[0],
        nextEl: s[1]
      },
      pagination: {
        el: r[0],
        type: "bullets",
        clickable: !0
      },
      simulateTouch: !flexbe_cli.is_admin,
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      paginationClickable: !0,
      preventClicks: !0,
      speed: 450,
      spaceBetween: 0,
      autoHeight: !1,
      initialSlide: i.current,
      loop: !1,
      autoplay: i.slideshow && {
        delay: i.slideshow
      },
      on: {
        init: function () {
          $(".swiper-slide-duplicate .img-popup", this.$wrapperEl).on("click", function (e) {
            var i = $(e.currentTarget).parents(".swiper-slide-duplicate");
            $(".img-popup", i.siblings(".slide[data-swiper-slide-index=" + i.attr("data-swiper-slide-index") + "]")).trigger("click"), e.preventDefault()
          })
        },
        slideChange: function () {
          i.current = this.activeIndex, i.setCurrent()
        }
      }
    }), e && "items_add" === e.reason && this.swiper.slideTo(e.reasonData.to))
  },
  setCurrent: function () {
    this.$block.data("slide-move", this.current)
  },
  onFocus: function (e) {
    this.swiper && this.swiper.autoplay && this.slideshow && this.swiper.autoplay[e ? "start" : "stop"]()
  },
  onUpdate: function (e) {
    e.styleRendered && this.swiper && this.swiper.update(!1)
  }
});
flexbe_cli.block.register(74, {
  onLoad: function () {
    this.form = flexbe_cli.form.create({
      id: this.id,
      block: this.$block,
      form: ".component-form"
    }), this.form.customize()
  }
});
flexbe_cli.block.register(75, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (e) {
    var i = this,
      s = this.$block.find(".slider-main"),
      t = this.$block.find(".slider-button"),
      r = s.data("count"),
      l = !flexbe_cli.is_admin && s.data("slider");
    1 != r && l && (this.slideshow = flexbe_cli.run.is_mobile || flexbe_cli.is_admin ? 0 : 1e3 * Math.floor(s.data("slideshow")), this.current = Math.floor(this.$block.data("slide-move")) || 0, this.current >= r && (this.current = r - 1), this.current < 0 && (this.current = 0), this.swiper = new Swiper(s[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "fr-element",
      slideActiveClass: "active",
      navigation: {
        prevEl: t.closest(".slider-prev").toArray(),
        nextEl: t.closest(".slider-next").toArray()
      },
      effect: "fade",
      fadeEffect: {
        crossFade: !0
      },
      paginationClickable: !0,
      simulateTouch: !1,
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      preventClicks: !0,
      speed: 650,
      autoHeight: !flexbe_cli.is_admin,
      initialSlide: i.current,
      autoplay: !!i.slideshow && {
        delay: i.slideshow
      },
      on: {
        slideChange: function () {
          i.current = this.activeIndex, i.setCurrent()
        }
      }
    }), this.swiper.autoplay.pause())
  },
  setCurrent: function () {
    this.$block.data("slide-move", this.current)
  },
  onScreen: function (e) {
    this.swiper && this.swiper.autoplay && this.swiper.autoplay.running && this.slideshow && !flexbe_cli.run.is_mobile && (e ? this.swiper.autoplay.run() : this.swiper.autoplay.pause())
  },
  onUpdate: function (e) {
    e.styleRendered && this.swiper && this.swiper.update(!1)
  }
});
flexbe_cli.block.register(76, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (e) {
    var t = this,
      i = t.$block.find(".slider-main"),
      r = t.$block.find(".slider-button"),
      s = i.data("count"),
      n = i.data("slider");
    1 != s && n && (t.current = Math.floor(t.$block.data("slide-move")) || 0, t.current >= s && (t.current = s - 1), t.current < 0 && (t.current = 0), t.$block.find(".slider-pager .item").on("click", function (e) {
      var i = +$(e.currentTarget).data("itemId");
      "number" == typeof i && (t.current = i - 1, t.setCurrent())
    }), t.swiper = new Swiper(i.find(".slider-wrapper")[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "fr-element",
      slideActiveClass: "active",
      navigation: {
        prevEl: r[0],
        nextEl: r[1]
      },
      simulateTouch: !flexbe_cli.is_admin,
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      preventClicks: !0,
      speed: 350,
      spaceBetween: 30,
      autoHeight: !flexbe_cli.is_admin,
      initialSlide: t.current,
      loop: !1,
      on: {
        slideChange: function () {
          t.current = this.activeIndex, t.setCurrent()
        }
      }
    }), e && "items_add" === e.reason && (t.current = e.reasonData.to), t.setCurrent())
  },
  setCurrent: function () {
    this.swiper && this.swiper.slideTo(this.current || 0), this.$block.data("slide-move", this.current), this.$block.find(".slider-pager .item").removeClass("active").closest('[data-item-id="' + (this.current + 1) + '"]').addClass("active")
  },
  onUpdate: function (e) {
    e.styleRendered && this.swiper && this.swiper.update(!1)
  }
});
flexbe_cli.block.register(78, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (e) {
    var t = this,
      i = t.$block.find(".slider-main"),
      r = t.$block.find(".slider-button"),
      n = t.$block.find(".slider-pagination"),
      s = i.data("count"),
      a = i.data("slider");
    1 != s && a && (t.current = Math.floor(t.$block.data("slide-move")) || 0, t.current >= s && (t.current = s - 1), t.current < 0 && (t.current = 0), t.swiper = new Swiper(i.find(".slider-wrapper")[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "fr-element",
      slideActiveClass: "active",
      navigation: {
        prevEl: r[0],
        nextEl: r[1]
      },
      pagination: {
        el: n[0],
        type: "bullets",
        clickable: !0
      },
      paginationClickable: !0,
      simulateTouch: !1,
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      preventClicks: !0,
      speed: 350,
      spaceBetween: 30,
      autoHeight: !flexbe_cli.is_admin,
      initialSlide: t.current,
      on: {
        slideChange: function () {
          t.current = this.activeIndex, t.setCurrent()
        }
      }
    }), t.$block.find(".slider-pager .item").on("click", function (e) {
      var i = +$(e.currentTarget).data("itemId");
      "number" == typeof i && (t.current = i - 1, t.setCurrent())
    }), e && "items_add" === e.reason && (t.current = e.reasonData.to), t.setCurrent())
  },
  setCurrent: function () {
    this.swiper && this.swiper.slideTo(this.current || 0), this.$block.data("slide-move", this.current), this.$block.find(".slider-pager .item").removeClass("active").closest('[data-item-id="' + (this.current + 1) + '"]').addClass("active")
  },
  onUpdate: function (e) {
    e.styleRendered && this.swiper && this.swiper.update(!1)
  }
});

flexbe_cli.block.register(9, {
  require: ["/js//swiper.v4.js"],
  onLoad: function (e) {
    var i = this,
      r = i.$block.find(".slider-main"),
      s = i.$block.find(".slider-button"),
      t = i.$block.find(".slider-pagination"),
      n = r.data("count"),
      l = r.data("slider");
    flexbe_cli.run.is_desctop && n <= 3 || !l || (i.current = Math.floor(i.$block.data("slide-move")) || 0, e && "items_add" === e.reason && (i.current = e.reasonData.to), i.current >= n && (i.current = n - 1), i.current < 0 && (i.current = 0), i.swiper = new Swiper(r.find(".slider-wrapper")[0], {
      wrapperClass: "slider",
      slideClass: "slide",
      noSwipingClass: "fr-element",
      navigation: {
        prevEl: s[0],
        nextEl: s[1]
      },
      pagination: {
        el: t[0],
        type: "bullets",
        clickable: !0
      },
      simulateTouch: !flexbe_cli.is_admin,
      touchMoveStopPropagation: !0,
      preventClicksPropagation: !0,
      preventClicks: !0,
      speed: 650,
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
      autoHeight: !flexbe_cli.is_admin,
      initialSlide: i.current,
      breakpoints: {
        768: {
          speed: 350,
          slidesPerView: 1,
          slidesPerGroup: 1
        }
      },
      on: {
        slideChange: function () {
          i.current = this.activeIndex, i.$block.data("slide-move", i.current)
        }
      }
    }))
  },
  onUpdate: function (e) {
    e.styleRendered && this.swiper && this.swiper.update(!1)
  }
});
flexbe_cli.modal.register(100, {
  types: {},
  pay_id: "",
  hash: "",
  selectors: {},
  onLoad: function () {
    var s = this;
    this.start(), flexbe_cli.events.on("pay", function (t, a) {
      a && "init" == a.action && s.start()
    })
  },
  start: function () {
    this.loadSelectors();
    var t = this.getQueryParams();
    if (t) {
      switch (t) {
        case "success":
          this.showSuccessAlert();
          break;
        case "fail":
          this.showFailAlert();
          break;
        case "pay":
          this.getBill()
      }
      setTimeout(function () {
        flexbe_cli.modal.open("pay")
      }, 300)
    }
  },
  loadSelectors: function () {
    this.selectors.$container = this.$modal.find(".container"), this.selectors.$bill = this.$modal.find(".action-bill"), this.selectors.$cash = this.$modal.find(".action-cash"), this.selectors.$already = this.$modal.find(".action-already"), this.selectors.$success = this.$modal.find(".action-success"), this.selectors.$fail = this.$modal.find(".action-fail")
  },
  getQueryParams: function () {
    var t = !1;
    try {
      t = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    } catch (t) {}
    if (!t.pay_id) return !1;
    if (this.pay_id = t.pay_id, this.hash = t.h, t.pay_status) {
      try {
        history.pushState(null, null, window.location.pathname)
      } catch (t) {}
      return t.pay_status
    }
    return "pay"
  },
  getBill: function () {
    var a = this;
    this.pay_id && !1 !== this.pay_id && $.ajax({
      url: "/mod/pay/ajax",
      type: "GET",
      dataType: "json",
      data: {
        act: "payData",
        pay_id: this.pay_id,
        hash: this.hash
      }
    }).done(function (t) {
      if (0 === t.status) return !1;
      a.types = t.pay.support_types, 2 == t.pay.pay_status ? a.showAlreadyPayed(t.pay) : a.cashonly() ? a.showCashInstruction(t.pay) : a.showBillForm(t.pay)
    })
  },
  showBillForm: function (t) {
    var e = this;
    this.selectors.$container.attr("data-type", "bill");
    var i = this.selectors.$bill.find(".pay-methods-list").empty(),
      a = this.selectors.$bill.find(".pay-action"),
      s = this.selectors.$bill.find(".component-button");
    for (var n in this.types) {
      var c = this.types[n];
      if (c.name) {
        var r = '<label class="item" data-type="' + n + '" title="' + c.name + '" for="' + n + '">\n                                <input type="radio" name="form[pay_method]" value="' + n + '" id="' + n + '">\n                                <div class="preview"><i></i></div>\n                                <span class="text-style-tiny">' + c.name + "</span>\n                            </label>";
        i.append(r)
      }
    }
    a.find(".title > span").text(t.pay_id), a.find(".price > span").text(t.pay_sum), i.on("click", ".item", function (t) {
      return t.preventDefault(), $(t.currentTarget).find("input").prop("checked", !0), s.removeClass("disabled"), !1
    }), s.on("click", function (t) {
      var a = i.find("input:checked").val();
      if (!a) return alert("Выберите способ оплаты"), !1;
      if ("cash" == a) return e.showCashInstruction(), !1;
      var s = "/mod/pay/?pay_type=" + a + "&pay_id=" + e.pay_id + "&h=" + e.hash;
      $(t.currentTarget).attr("href", s), flexbe_cli.run.is_mobile && flexbe_cli.run.is_OSX || $(t.currentTarget).addClass("busy")
    })
  },
  showCashInstruction: function () {
    this.selectors.$container.attr("data-type", "cash"), this.types.cash && this.types.cash.instruction && this.selectors.$cash.find(".text").html(this.types.cash.instruction), $.ajax({
      url: "/mod/pay/ajax",
      type: "GET",
      dataType: "json",
      data: {
        act: "selectCash",
        pay_id: this.pay_id,
        hash: this.hash
      }
    })
  },
  showAlreadyPayed: function (t) {
    this.selectors.$container.attr("data-type", "already");
    var a = this.selectors.$already.find(".pay-action"),
      s = "";
    "0" != t.pay_time_done && (s = t.pay_time_done), this.selectors.$already.find(".text > span.num").text(t.pay_id), a.find(".title > span.num").text(t.pay_id), a.find(".sub > span").text(s), a.find(".price > span").text(t.pay_sum)
  },
  showSuccessAlert: function () {
    this.selectors.$container.attr("data-type", "success"), flexbe_cli.stat.reach_goal("pay_done")
  },
  showFailAlert: function () {
    var t = this;
    this.selectors.$container.attr("data-type", "fail"), this.selectors.$fail.find(".component-button").off("click").on("click", function () {
      t.getBill()
    })
  },
  cashonly: function () {
    return !(!this.types.cash || 1 != Object.keys(this.types).length)
  }
});
flexbe_cli.modal.register(2, {
  onInit: function () {
    this.video = this.$modal.find("iframe")[0], this.videoOrigin = this.video ? this.video.src || this.video.getAttribute("data-src") : ""
  },
  onOpen: function () {
    this.bindVideo(!0)
  },
  onClose: function () {
    this.bindVideo(!1)
  },
  bindVideo: function (i) {
    if (void 0 === i && (i = !1), !this.video) return !1;
    this.video.src && i || (this.video.src = "", this.video.src = this.videoOrigin)
  }
});
flexbe_cli.modal.register(20, {
  onInit: function () {
    this.video = this.$modal.find("iframe")[0], this.videoOrigin = this.video ? this.video.src || this.video.getAttribute("data-src") : ""
  },
  onOpen: function () {
    this.bindVideo(!0)
  },
  onClose: function () {
    this.bindVideo(!1)
  },
  bindVideo: function (i) {
    if (void 0 === i && (i = !1), !this.video) return !1;
    this.video.src && i || (this.video.src = "", this.video.src = this.videoOrigin)
  }
});
flexbe_cli.modal.register(3, {
  onInit: function () {
    this.video = this.$modal.find("iframe")[0], this.videoOrigin = this.video ? this.video.src || this.video.getAttribute("data-src") : ""
  },
  onOpen: function () {
    this.bindVideo(!0)
  },
  onClose: function () {
    this.bindVideo(!1)
  },
  bindVideo: function (i) {
    if (void 0 === i && (i = !1), !this.video) return !1;
    this.video.src && i || (this.video.src = "", this.video.src = this.videoOrigin)
  }
});
flexbe_cli.widget.register(1, {
  list: [],
  $list: null,
  $sum: null,
  $button: null,
  is_open: !1,
  onInit: function () {
    this.$container = this.$widget.find(".widget-data"), this.$list = this.$widget.find(".order-list > ul"), this.$sum = this.$widget.find(".checkout .price"), this.$button = this.$widget.find(".cart-button"), this.events(), flexbe_cli.is_admin ? this.list = [{
      id: "7832324_1",
      count: 1,
      img: "/img/1000000945_200.jpg",
      title: "Тестовый товар 1",
      price: 750
    }, {
      id: "7832464_2",
      count: 2,
      img: "/img/1000000948_200.jpg",
      title: "Тестовый товар 2",
      price: 2550
    }] : this.loadFromStorage(), this.renderList()
  },
  onLoad: function () {
    this.formInit()
  },
  onUpdate: function () {
    this.onInit(), this.is_open && (this.$container.addClass("fade-in noanimate"), this.open())
  },
  formInit: function () {
    var i = this;
    flexbe_cli.components.instances[this.id].forEach(function (t) {
      "form" === t.is && ((i.form = t).onBeforeSend(function () {
        if (!i.list.length) return i.$container.removeClass("shake"), setTimeout(function () {
          return i.$container.addClass("shake")
        }, 50), !1;
        t && t.addItems(i.list)
      }), t.onAfterSent(function () {
        i.close(), flexbe_cli.stat.ecommerce.purchase(i.list), i.list = [], i.renderList()
      }))
    })
  },
  events: function () {
    var s = this;
    flexbe_cli.events.off("cart_command.w3").on("cart_command.w3", function (t, i) {
      if (i) switch (i.command) {
        case "toggle":
          s.is_open ? s.close() : s.open();
          break;
        case "open":
          s.open(i);
          break;
        case "close":
          s.close(i);
          break;
        case "add":
          s.add(i.item);
          break;
        case "remove":
          s.remove(i.id)
      }
    }), this.$widget.off("click.cart-button").on("click.cart-button", ".cart-button", function () {
      s.$container.hasClass("show") ? s.close() : s.open()
    }), this.$list.off("click").on("click", "[data-action]", function (t) {
      var i = $(t.currentTarget).closest("li"),
        e = $(t.currentTarget).data("action"),
        n = i.data("id");
      n && ("remove" == e ? s.remove(n) : s.updateCount(n, e))
    }), this.$list.off("input").on("input", ".count", function (t) {
      var i = $(t.currentTarget).closest("li").attr("data-id"),
        e = +t.target.value;
      e || (e = 1, $(t.currentTarget).val(1)), s.updateCount(i, e)
    }), this.$container.off("click.close").on("click.close", "a.close, .scroller, .widget-content-wrapper", function (t) {
      t.target === t.currentTarget && s.close()
    }), $(document).off("keyup.cart_esc_close").on("keyup.cart_esc_close", function (t) {
      27 == t.which && s.close()
    })
  },
  open: function () {
    var t = this;
    this.is_open = !0, this._onScreen({
      state: !0
    }), this._onView({
      state: !0
    }), flexbe_cli.is_admin ? (this.$container.addClass("is-editor"), $(".container-list").addClass("editor-stop")) : (this.$button.addClass("hide"), this.loadFromStorage()), this.renderList(), $("body").addClass("overflow"), this.$container.hasClass("noanimate") ? (this.$container.addClass("show fade-in"), this.$container.removeClass("noanimate")) : (this.$container.addClass("show"), setTimeout(function () {
      t.$container.addClass("fade-in"), t.$container.removeClass("noanimate")
    }, 50)), flexbe_cli.run.is_OSX && flexbe_cli.run.is_mobile && (this.lastScroll = flexbe_cli.scroll.latest, $(".container-list, .modal-list, .mobile-menu, header, footer").css({
      display: "none"
    }), this.$container.css({
      position: "relative"
    }), $("body, html").scrollTop(0))
  },
  close: function () {
    var t = this;
    $(window).off("keyup.cart_esc_close"), this.is_open && (this.is_open = !1, $("body").removeClass("overflow"), $(".container-list").removeClass("editor-stop"), this.$button.removeClass("hide"), this.$container.removeClass("fade-in"), this.$container.addClass("fade-out"), setTimeout(function () {
      t.$container.removeClass("fade-out show noanimate")
    }, 350), flexbe_cli.run.is_OSX && flexbe_cli.run.is_mobile && (this.$container.css({
      position: ""
    }), $(".container-list, .modal-list, .mobile-menu, header, footer").css({
      display: ""
    }), $("body, html").scrollTop(this.lastScroll)))
  },
  add: function (i, t) {
    var e = this;
    if (void 0 === t && (t = !1), (!this.is_open || t) && i) {
      i.count = parseInt(i.count, 10) || 1, i.price = parseFloat(i.price) || 0;
      var n = !1;
      this.list && this.list.length && (this.list = this.list.map(function (t) {
        return t.id == i.id && (t.count += i.count, n = !0), t
      })), n || this.list.push(i), flexbe_cli.stat.ecommerce.add(i.id, i.title, i.count, i.price), flexbe_cli.stat.reach_goal("add_to_cart", i), this.renderList(), this.$button.removeClass("blink"), setTimeout(function () {
        e.$button.addClass("blink")
      }, 50)
    }
  },
  remove: function (i) {
    if (void 0 === i && (i = !1), !1 !== i) {
      var t = this.list.filter(function (t) {
        return t.id == i
      })[0];
      flexbe_cli.stat.ecommerce.remove(t.id, t.title), this.list = this.list.filter(function (t) {
        return t.id != i
      }), this.renderList()
    }
  },
  updateCount: function (e, n) {
    var s = this;
    void 0 === e && (e = !1), void 0 === n && (n = "+"), !1 !== e && (this.list && this.list.length && (this.list = this.list.map(function (t) {
      if (t.id == e) {
        "+" == n ? t.count += 1 : "-" == n && 1 < t.count ? t.count -= 1 : (n = parseInt(n, 10), t.count = n || 1), t.count = parseInt(t.count, 10) || 1;
        var i = s.$list.find('[data-id="' + e + '"]');
        i.find(".price").text(s.formatPrice(t.count * t.price)), "-" !== n && "+" !== n || i.find(".count").val(t.count), flexbe_cli.stat.ecommerce.add(t.id, t.title, t.count, t.price)
      }
      return t
    })), this.saveToStorage(), this.renderCount())
  },
  renderList: function () {
    var e = this;
    this.saveToStorage(), this.renderCount();
    var n = "";
    this.list.length && this.list.forEach(function (t) {
      var i;
      n += '<li data-id="' + (i = t).id + '">\n                <div class="img-holder">\n                    <div class="img" ' + (i.img && 'style="background-image: url(' + i.img + ')"') + '></div>\n                </div>\n\n                <div class="content-holder">\n                    <div class="flex-line">\n                        <div class="item-title">' + (i.title || "-") + '</div>\n                        <a class="times" data-action="remove"></a>\n                    </div>\n                    <div class="flex-line">\n                        <div class="item-count">\n                            <a data-action="-"></a>\n                            <input type="number" class="count" min="1" value="' + i.count + '"/>\n                            <a data-action="+"></a>\n                        </div>\n\n                        <div class="item-price">\n                            <span class="price">' + e.formatPrice(i.price * i.count) + '</span>\n                            <span class="curr">' + flexbe_cli.lang.currency + "</span>\n                        </div>\n                    </div>\n                </div>\n            </li>"
    }), this.$list.html(n), this.$container.find(".cart-container").toggleClass("empty", 0 === this.list.length), this.form && this.form.addItems(this.list)
  },
  renderCount: function () {
    var i = 0,
      e = 0;
    this.list.length && this.list.forEach(function (t) {
      t.count && (i += parseInt(t.count, 10), t.price && (e += parseInt(t.count, 10) * parseFloat(t.price)))
    }), this.$sum.text(this.formatPrice(e)), this.$button.attr("data-count", i), this.$container.find(".product-count .count").text(i)
  },
  formatPrice: function (t) {
    return (t = (t = String(t).replace(",", ".").replace(/[^0-9.]/g, "")).split("."))[0] = chunkSplit(t[0]), t[1] && (t[1] = t[1].length < 2 ? t[1] += "0" : t[1].substr(0, 2)), 2 < t.length && (t = t.splice(0, 2)), t.join(".")
  },
  loadFromStorage: function () {
    if (!flexbe_cli.is_admin && localStorage) try {
      var t = JSON.parse(localStorage.getItem("f_cart"));
      t && t instanceof Array && (this.list = t)
    } catch (t) {}
  },
  saveToStorage: function () {
    if (!flexbe_cli.is_admin && localStorage)
      if (this.list && this.list instanceof Array) try {
        localStorage.setItem("f_cart", JSON.stringify(this.list))
      } catch (t) {} else this.list = []
  }
});

function _typeof(t) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  })(t)
}
flexbe_cli.widget.register(2, {
  require: ["/js/anime.min.js"],
  $list: null,
  onLoad: function () {
    var e = this;
    this.$list = this.$widget.find(".anchors-list"), this.list = "object" == _typeof(this.$list.data("anchors")) && this.$list.data("anchors").list || [], this.style = this.$list.data("anchors").style || 1, this.show_title = this.$list.data("anchors").show_title, this.$list.removeAttr("data-anchors"), flexbe_cli.run.is_mobile || (this.drawList(), this.setActive(), flexbe_cli.is_admin && flexbe_cli.events.off("layout_change.anchors").on("layout_change.anchors", function (t, i) {
      "block" === i.is && e.drawList()
    }))
  },
  check: function () {
    var i = $(".b_block").not('[data-b-type*="overflow"]');
    this.list = this.list.filter(function (t) {
      if (t.enabled && i.closest('[data-id="' + t.id + '"]')[0]) return !0
    })
  },
  drawList: function () {
    var i = this;
    if (0 === flexbe_cli.block.$blocks.length) return this.$list.hide(), !1;
    this.$list.show(), this.check();
    var e = "";
    flexbe_cli.is_admin && 0 === this.list.length ? e = '<svg style="color: #adadad" width="18" height="98" viewBox="0 0 18 98" xmlns="http://www.w3.org/2000/svg">\n                <g fill="none" fill-rule="evenodd">\n                    <circle opacity=".05" cx="9" cy="5" r="5"/>\n                    <circle opacity=".2" cx="9" cy="25" r="5"/>\n                    <circle opacity=".2" cx="9" cy="73" r="5"/>\n                    <circle opacity=".05" cx="9" cy="93" r="5"/>\n                    <path d="M9 40a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm5.126 9.626h-4.5v4.5H8.34v-4.5h-4.5V48.34h4.5v-4.5h1.286v4.5h4.5v1.286z" opacity=".45"/>\n                </g>\n            </svg>' : 0 < this.list.length && (this.list.forEach(function (t) {
      e += "<li" + (i.show_title && t.title ? ' data-title="' + t.title + '"' : "") + '><a href="#' + t.id + '"></a></li>'
    }), e += '<li class="helper"><a></a></li>'), this.$list.find("ul").html(e), this.$helper = this.$list.find(".helper"), this.animateList()
  },
  animateList: function () {
    var t = this;
    if (0 !== this.list.length) {
      if (flexbe_cli.is_admin) this.$helper.css({
        opacity: 1,
        transform: "translateY(" + 24 * this.index + "px)"
      });
      else {
        var i = anime({
          targets: this.$list.find("li").not(this.$helper).get(),
          duration: 200,
          opacity: [0, 1],
          scale: [.4, 1],
          easing: "easeOutBack",
          autoplay: !1,
          delay: function (t, i) {
            return 200 * i
          },
          complete: function () {
            anime({
              targets: t.$helper.get(),
              duration: 400,
              translateY: 24 * t.index,
              scale: [2.5, 1],
              opacity: [0, 1],
              easing: "easeInExpo"
            })
          }
        });
        this.$list.addClass("hide"), setTimeout(function () {
          t.$list.removeClass("hide"), i.play()
        }, 1500)
      }
      this.$list.find("li").removeClass("active").eq(this.index).addClass("active")
    }
  },
  index: 0,
  setActive: function () {
    var l = this;
    if (0 !== this.list.length) {
      var s = function (e) {
        l.$list.css("color", e.tween.color);
        var s = l.index;
        l.list.some(function (t, i) {
          if (t.id == e.id) return s = i, !0
        }), (s = Math.max(0, Math.min(l.list.length - 1, s))) != l.index && (! function (t) {
          if (l.$list.find("li").removeClass("active"), l.$list.find("li").eq(t).addClass("active"), 1 == l.style) {
            var i = 24 * t,
              e = 0 < t - l.index ? 12 : -12;
            anime.remove(l.$helper[0]), anime({
              targets: l.$helper[0],
              translateY: i - e,
              scaleY: 2.5,
              scaleX: .6,
              duration: 100,
              easing: "easeInQuad",
              complete: function () {
                anime({
                  targets: l.$helper[0],
                  translateY: i,
                  scaleY: 1,
                  scaleX: 1,
                  duration: 100,
                  easing: "easeOutQuad"
                })
              }
            })
          }
        }(s), l.index = s)
      };
      flexbe_cli.block.$list.find(".b_block").each(function (t, i) {
        var e = i._core;
        e && e.isFocused && s(e)
      }), flexbe_cli.events.off("entity_event.anchors").on("entity_event.anchors", function (t, i) {
        i && i.type && "focus" == i.type && i.state && i.core && "block" === i.core.is && s(i.core)
      }), this.$list.on("click", "li", function (t) {
        if (!$(t.target).is("a")) return $(t.currentTarget).find("[href]").trigger("click"), t.preventDefault(), !1
      })
    }
  }
});
