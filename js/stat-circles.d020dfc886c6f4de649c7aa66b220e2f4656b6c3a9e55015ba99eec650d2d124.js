(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ns-hugo-imp:C:\Users\ADMIN\Desktop\dylstatic\dylstatic\assets\front-ui\vendor\circles\circles.js
  var require_circles = __commonJS({
    "ns-hugo-imp:C:\\Users\\ADMIN\\Desktop\\dylstatic\\dylstatic\\assets\\front-ui\\vendor\\circles\\circles.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = factory();
        } else if (typeof define === "function" && define.amd) {
          define([], factory);
        } else {
          root.Circles = factory();
        }
      })(exports, function() {
        "use strict";
        var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
          setTimeout(callback, 1e3 / 60);
        }, Circles2 = function(options) {
          var elId = options.id;
          this._el = document.getElementById(elId);
          if (this._el === null) return;
          this._radius = options.radius || 10;
          this._duration = options.duration === void 0 ? 500 : options.duration;
          this._value = 0;
          this._maxValue = options.maxValue || 100;
          this._text = options.text === void 0 ? function(value) {
            return this.htmlifyNumber(value);
          } : options.text;
          this._strokeWidth = options.width || 10;
          this._colors = options.colors || ["#EEE", "#F00"];
          this._svg = null;
          this._movingPath = null;
          this._wrapContainer = null;
          this._textContainer = null;
          this._wrpClass = options.wrpClass || "circles-wrp";
          this._textClass = options.textClass || "circles-text";
          this._valClass = options.valueStrokeClass || "circles-valueStroke";
          this._maxValClass = options.maxValueStrokeClass || "circles-maxValueStroke";
          this._styleWrapper = options.styleWrapper === false ? false : true;
          this._styleText = options.styleText === false ? false : true;
          var endAngleRad = Math.PI / 180 * 270;
          this._start = -Math.PI / 180 * 90;
          this._startPrecise = this._precise(this._start);
          this._circ = endAngleRad - this._start;
          this._generate().update(options.value || 0);
        };
        Circles2.prototype = {
          VERSION: "0.0.6",
          _generate: function() {
            this._svgSize = this._radius * 2;
            this._radiusAdjusted = this._radius - this._strokeWidth / 2;
            this._generateSvg()._generateText()._generateWrapper();
            this._el.innerHTML = "";
            this._el.appendChild(this._wrapContainer);
            return this;
          },
          _setPercentage: function(percentage) {
            this._movingPath.setAttribute("d", this._calculatePath(percentage, true));
            this._textContainer.innerHTML = this._getText(this.getValueFromPercent(percentage));
          },
          _generateWrapper: function() {
            this._wrapContainer = document.createElement("div");
            this._wrapContainer.className = this._wrpClass;
            if (this._styleWrapper) {
              this._wrapContainer.style.position = "relative";
              this._wrapContainer.style.display = "inline-block";
            }
            this._wrapContainer.appendChild(this._svg);
            this._wrapContainer.appendChild(this._textContainer);
            return this;
          },
          _generateText: function() {
            this._textContainer = document.createElement("div");
            this._textContainer.className = this._textClass;
            if (this._styleText) {
              var style = {
                position: "absolute",
                top: 0,
                left: 0,
                textAlign: "center",
                width: "100%",
                fontSize: this._radius * 0.7 + "px",
                height: this._svgSize + "px",
                lineHeight: this._svgSize + "px"
              };
              for (var prop in style) {
                this._textContainer.style[prop] = style[prop];
              }
            }
            this._textContainer.innerHTML = this._getText(0);
            return this;
          },
          _getText: function(value) {
            if (!this._text) return "";
            if (value === void 0) value = this._value;
            value = parseFloat(value.toFixed(2));
            return typeof this._text === "function" ? this._text.call(this, value) : this._text;
          },
          _generateSvg: function() {
            this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this._svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            this._svg.setAttribute("width", this._svgSize);
            this._svg.setAttribute("height", this._svgSize);
            this._generatePath(100, false, this._colors[0], this._maxValClass)._generatePath(1, true, this._colors[1], this._valClass);
            this._movingPath = this._svg.getElementsByTagName("path")[1];
            return this;
          },
          _generatePath: function(percentage, open, color, pathClass) {
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill", "transparent");
            path.setAttribute("stroke", color);
            path.setAttribute("stroke-width", this._strokeWidth);
            path.setAttribute("d", this._calculatePath(percentage, open));
            path.setAttribute("class", pathClass);
            this._svg.appendChild(path);
            return this;
          },
          _calculatePath: function(percentage, open) {
            var end = this._start + percentage / 100 * this._circ, endPrecise = this._precise(end);
            return this._arc(endPrecise, open);
          },
          _arc: function(end, open) {
            var endAdjusted = end - 1e-3, longArc = end - this._startPrecise < Math.PI ? 0 : 1;
            return [
              "M",
              this._radius + this._radiusAdjusted * Math.cos(this._startPrecise),
              this._radius + this._radiusAdjusted * Math.sin(this._startPrecise),
              "A",
              // arcTo
              this._radiusAdjusted,
              // x radius
              this._radiusAdjusted,
              // y radius
              0,
              // slanting
              longArc,
              // long or short arc
              1,
              // clockwise
              this._radius + this._radiusAdjusted * Math.cos(endAdjusted),
              this._radius + this._radiusAdjusted * Math.sin(endAdjusted),
              open ? "" : "Z"
              // close
            ].join(" ");
          },
          _precise: function(value) {
            return Math.round(value * 1e3) / 1e3;
          },
          /*== Public methods ==*/
          htmlifyNumber: function(number, integerPartClass, decimalPartClass) {
            integerPartClass = integerPartClass || "circles-integer";
            decimalPartClass = decimalPartClass || "circles-decimals";
            var parts = (number + "").split("."), html = '<span class="' + integerPartClass + '">' + parts[0] + "</span>";
            if (parts.length > 1) {
              html += '.<span class="' + decimalPartClass + '">' + parts[1].substring(0, 2) + "</span>";
            }
            return html;
          },
          updateRadius: function(radius) {
            this._radius = radius;
            return this._generate().update(true);
          },
          updateWidth: function(width) {
            this._strokeWidth = width;
            return this._generate().update(true);
          },
          updateColors: function(colors) {
            this._colors = colors;
            var paths = this._svg.getElementsByTagName("path");
            paths[0].setAttribute("stroke", colors[0]);
            paths[1].setAttribute("stroke", colors[1]);
            return this;
          },
          getPercent: function() {
            return this._value * 100 / this._maxValue;
          },
          getValueFromPercent: function(percentage) {
            return this._maxValue * percentage / 100;
          },
          getValue: function() {
            return this._value;
          },
          getMaxValue: function() {
            return this._maxValue;
          },
          update: function(value, duration) {
            if (value === true) {
              this._setPercentage(this.getPercent());
              return this;
            }
            if (this._value == value || isNaN(value)) return this;
            if (duration === void 0) duration = this._duration;
            var self = this, oldPercentage = self.getPercent(), delta = 1, newPercentage, isGreater, steps, stepDuration;
            this._value = Math.min(this._maxValue, Math.max(0, value));
            if (!duration) {
              this._setPercentage(this.getPercent());
              return this;
            }
            newPercentage = self.getPercent();
            isGreater = newPercentage > oldPercentage;
            delta += newPercentage % 1;
            steps = Math.floor(Math.abs(newPercentage - oldPercentage) / delta);
            stepDuration = duration / steps;
            (function animate(lastFrame) {
              if (isGreater)
                oldPercentage += delta;
              else
                oldPercentage -= delta;
              if (isGreater && oldPercentage >= newPercentage || !isGreater && oldPercentage <= newPercentage) {
                requestAnimFrame(function() {
                  self._setPercentage(newPercentage);
                });
                return;
              }
              requestAnimFrame(function() {
                self._setPercentage(oldPercentage);
              });
              var now = Date.now(), deltaTime = now - lastFrame;
              if (deltaTime >= stepDuration) {
                animate(now);
              } else {
                setTimeout(function() {
                  animate(Date.now());
                }, stepDuration - deltaTime);
              }
            })(Date.now());
            return this;
          }
        };
        Circles2.create = function(options) {
          return new Circles2(options);
        };
        return Circles2;
      });
    }
  });

  // ns-hugo-imp:C:\Users\ADMIN\Desktop\dylstatic\dylstatic\assets\front-ui\js\hs.core.js
  $.extend({
    HSCore: {
      init: function() {
        $(document).ready(function() {
          $('[data-toggle="tooltip"]').tooltip();
          $('[data-toggle="popover"]').popover();
        });
      },
      components: {}
    }
  });
  $.HSCore.init();

  // ns-hugo-imp:C:\Users\ADMIN\Desktop\dylstatic\dylstatic\assets\front-ui\js\hs.circles.js
  var import_circles = __toESM(require_circles());
  (function($2) {
    "use strict";
    $2.HSCore.components.HSCircles = {
      defaults: {
        radius: 80,
        duration: 1e3,
        wrpClass: "circles-wrap",
        colors: ["#377dff", "#e7eaf3"],
        bounds: -100,
        debounce: 10,
        rtl: false,
        isHideValue: false,
        dividerSpace: null,
        isViewportInit: false,
        fgStrokeLinecap: null,
        fgStrokeMiterlimit: null,
        additionalTextType: null,
        additionalText: null,
        textFontSize: null,
        textFontWeight: null,
        textColor: null,
        secondaryText: null,
        secondaryTextFontWeight: null,
        secondaryTextFontSize: null,
        secondaryTextColor: null
      },
      init: function(el, options) {
        if (!el.length) return;
        var context = this, defaults = Object.assign({}, context.defaults), dataSettings = el.attr("data-hs-circles-options") ? JSON.parse(el.attr("data-hs-circles-options")) : {}, settings = {
          id: "circle-" + Math.random().toString().slice(2),
          value: 0,
          text: function(value) {
            if (dataSettings.type === "iconic") {
              return dataSettings.icon;
            } else {
              if (dataSettings.additionalTextType === "prefix") {
                if (dataSettings.secondaryText) {
                  return (dataSettings.additionalText || "") + (dataSettings.isHideValue ? "" : value) + '<div style="margin-top: ' + (dataSettings.dividerSpace / 2 + "px" || "0") + "; margin-bottom: " + (dataSettings.dividerSpace / 2 + "px" || "0") + ';"></div><div style="font-weight: ' + dataSettings.secondaryTextFontWeight + "; font-size: " + dataSettings.secondaryTextFontSize + "px; color: " + dataSettings.secondaryTextColor + ';">' + dataSettings.secondaryText + "</div>";
                } else {
                  return (dataSettings.additionalText || "") + (dataSettings.isHideValue ? "" : value);
                }
              } else {
                if (dataSettings.secondaryText) {
                  return (dataSettings.isHideValue ? "" : value) + (dataSettings.additionalText || "") + '<div style="margin-top: ' + (dataSettings.dividerSpace / 2 + "px" || "0") + "; margin-bottom: " + (dataSettings.dividerSpace / 2 + "px" || "0") + ';"></div><div style="font-weight: ' + dataSettings.secondaryTextFontWeight + "; font-size: " + dataSettings.secondaryTextFontSize + "px; color: " + dataSettings.secondaryTextColor + ';">' + dataSettings.secondaryText + "</div>";
                } else {
                  return (dataSettings.isHideValue ? "" : value) + (dataSettings.additionalText || "");
                }
              }
            }
          }
        };
        settings = $2.extend(defaults, settings, dataSettings, options);
        if (settings.isViewportInit) {
          settings.value = 0;
        }
        context.setId(el, settings.id);
        var newCircles = import_circles.default.create(settings);
        el.data("circle", newCircles);
        context.setTextStyles(el, newCircles, settings);
        if (settings.rtl) {
          context.setRtl(el);
        }
        if (settings.fgStrokeLinecap) {
          context.setStrokeLineCap(el, newCircles, settings);
        }
        if (settings.fgStrokeMiterlimit) {
          context.setStrokeMiterLimit(el, newCircles, settings);
        }
        if (settings.isViewportInit) {
          context.initAppear(newCircles, settings);
        }
        return newCircles;
      },
      // ----- Start : Preparation -----
      setId: function(el, id) {
        el.attr("id", id);
      },
      // ----- End : Preparation -----
      // ----- Start : Custom functionality -----
      setTextStyles: function(el, initEl, params) {
        var settings = params;
        el.find('[class="' + (settings.textClass || initEl._textClass) + '"]').css({
          "font-size": settings.textFontSize,
          "font-weight": settings.textFontWeight,
          "color": settings.textColor,
          "line-height": "normal",
          "height": "auto",
          "top": "",
          "left": ""
        });
      },
      setRtl: function(el) {
        el.find("svg").css("transform", "matrix(-1, 0, 0, 1, 0, 0)");
      },
      setStrokeLineCap: function(el, initEl, params) {
        var settings = params;
        el.find('[class="' + initEl._valClass + '"]').attr("stroke-linecap", settings.fgStrokeLinecap);
      },
      setStrokeMiterLimit: function(el, initEl, params) {
        var settings = params;
        el.find('[class="' + initEl._valClass + '"]').attr("stroke-miterlimit", settings.fgStrokeMiterlimit);
      },
      initAppear: function(initEl, params) {
        var settings = params;
        appear({
          bounds: settings.bounds,
          debounce: settings.debounce,
          elements: function() {
            return document.querySelectorAll("#" + settings.id);
          },
          appear: function(el) {
            initEl.update(JSON.parse($2(el).attr("data-hs-circles-options")).value);
          }
        });
      }
      // ----- End : Custom functionality -----
    };
  })(jQuery);

  // <stdin>
  $(document).on("ready", function() {
    $(".js-circle").each(function() {
      var circle = $.HSCore.components.HSCircles.init($(this));
    });
  });
})();
/*
* HSCore
* @version: 2.0.0 (Mon, 25 Nov 2019)
* @requires: jQuery v3.0 or later
* @author: HtmlStream
* @event-namespace: .HSCore
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/
/*
* Circles wrapper
* @version: 2.0.0 (Mon, 25 Nov 2019)
* @requires: jQuery v3.0 or later, circles v0.0.6, appear.js v1.0.3
* @author: HtmlStream
* @event-namespace: .HSCore.components.HSCircles
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/
