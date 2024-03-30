import { c as commonjsGlobal, g as getDefaultExportFromCjs } from "./_commonjsHelpers-DaMA6jEr.js";
var htmx$1 = { exports: {} };
(function(module) {
  (function(e, t) {
    module.exports ? module.exports = t() : e.htmx = e.htmx || t();
  })(typeof self < "u" ? self : commonjsGlobal, function() {
    return function() {
      var htmx = {
        onLoad: onLoadHelper,
        process: processNode,
        on: addEventListenerImpl,
        off: removeEventListenerImpl,
        trigger: triggerEvent,
        ajax: ajaxHelper,
        find,
        findAll,
        closest,
        values: function(e, t) {
          var r = getInputValues(e, t || "post");
          return r.values;
        },
        remove: removeElement,
        addClass: addClassToElement,
        removeClass: removeClassFromElement,
        toggleClass: toggleClassOnElement,
        takeClass: takeClassForElement,
        defineExtension,
        removeExtension,
        logAll,
        logNone,
        logger: null,
        config: {
          historyEnabled: !0,
          historyCacheSize: 10,
          refreshOnHistoryMiss: !1,
          defaultSwapStyle: "innerHTML",
          defaultSwapDelay: 0,
          defaultSettleDelay: 20,
          includeIndicatorStyles: !0,
          indicatorClass: "htmx-indicator",
          requestClass: "htmx-request",
          addedClass: "htmx-added",
          settlingClass: "htmx-settling",
          swappingClass: "htmx-swapping",
          allowEval: !0,
          allowScriptTags: !0,
          inlineScriptNonce: "",
          attributesToSettle: ["class", "style", "width", "height"],
          withCredentials: !1,
          timeout: 0,
          wsReconnectDelay: "full-jitter",
          wsBinaryType: "blob",
          disableSelector: "[hx-disable], [data-hx-disable]",
          useTemplateFragments: !1,
          scrollBehavior: "smooth",
          defaultFocusScroll: !1,
          getCacheBusterParam: !1,
          globalViewTransitions: !1,
          methodsThatUseUrlParams: ["get"],
          selfRequestsOnly: !1,
          ignoreTitle: !1,
          scrollIntoViewOnBoost: !0,
          triggerSpecsCache: null
        },
        parseInterval,
        _: internalEval,
        createEventSource: function(e) {
          return new EventSource(e, { withCredentials: !0 });
        },
        createWebSocket: function(e) {
          var t = new WebSocket(e, []);
          return t.binaryType = htmx.config.wsBinaryType, t;
        },
        version: "1.9.10"
      }, internalAPI = {
        addTriggerHandler,
        bodyContains,
        canAccessLocalStorage,
        findThisElement,
        filterValues,
        hasAttribute,
        getAttributeValue,
        getClosestAttributeValue,
        getClosestMatch,
        getExpressionVars,
        getHeaders,
        getInputValues,
        getInternalData,
        getSwapSpecification,
        getTriggerSpecs,
        getTarget,
        makeFragment,
        mergeObjects,
        makeSettleInfo,
        oobSwap,
        querySelectorExt,
        selectAndSwap,
        settleImmediately,
        shouldCancel,
        triggerEvent,
        triggerErrorEvent,
        withExtensions
      }, VERBS = ["get", "post", "put", "delete", "patch"], VERB_SELECTOR = VERBS.map(function(e) {
        return "[hx-" + e + "], [data-hx-" + e + "]";
      }).join(", "), HEAD_TAG_REGEX = makeTagRegEx("head"), TITLE_TAG_REGEX = makeTagRegEx("title"), SVG_TAGS_REGEX = makeTagRegEx("svg", !0);
      function makeTagRegEx(e, t = !1) {
        return new RegExp(
          `<${e}(\\s[^>]*>|>)([\\s\\S]*?)<\\/${e}>`,
          t ? "gim" : "im"
        );
      }
      function parseInterval(e) {
        if (e == null)
          return;
        let t = NaN;
        return e.slice(-2) == "ms" ? t = parseFloat(e.slice(0, -2)) : e.slice(-1) == "s" ? t = parseFloat(e.slice(0, -1)) * 1e3 : e.slice(-1) == "m" ? t = parseFloat(e.slice(0, -1)) * 1e3 * 60 : t = parseFloat(e), isNaN(t) ? void 0 : t;
      }
      function getRawAttribute(e, t) {
        return e.getAttribute && e.getAttribute(t);
      }
      function hasAttribute(e, t) {
        return e.hasAttribute && (e.hasAttribute(t) || e.hasAttribute("data-" + t));
      }
      function getAttributeValue(e, t) {
        return getRawAttribute(e, t) || getRawAttribute(e, "data-" + t);
      }
      function parentElt(e) {
        return e.parentElement;
      }
      function getDocument() {
        return document;
      }
      function getClosestMatch(e, t) {
        for (; e && !t(e); )
          e = parentElt(e);
        return e || null;
      }
      function getAttributeValueWithDisinheritance(e, t, r) {
        var n = getAttributeValue(t, r), a = getAttributeValue(t, "hx-disinherit");
        return e !== t && a && (a === "*" || a.split(" ").indexOf(r) >= 0) ? "unset" : n;
      }
      function getClosestAttributeValue(e, t) {
        var r = null;
        if (getClosestMatch(e, function(n) {
          return r = getAttributeValueWithDisinheritance(e, n, t);
        }), r !== "unset")
          return r;
      }
      function matches(e, t) {
        var r = e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector;
        return r && r.call(e, t);
      }
      function getStartTag(e) {
        var t = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, r = t.exec(e);
        return r ? r[1].toLowerCase() : "";
      }
      function parseHTML(e, t) {
        for (var r = new DOMParser(), n = r.parseFromString(e, "text/html"), a = n.body; t > 0; )
          t--, a = a.firstChild;
        return a == null && (a = getDocument().createDocumentFragment()), a;
      }
      function aFullPageResponse(e) {
        return /<body/.test(e);
      }
      function makeFragment(e) {
        var t = !aFullPageResponse(e), r = getStartTag(e), n = e;
        if (r === "head" && (n = n.replace(HEAD_TAG_REGEX, "")), htmx.config.useTemplateFragments && t) {
          var a = parseHTML("<body><template>" + n + "</template></body>", 0);
          return a.querySelector("template").content;
        }
        switch (r) {
          case "thead":
          case "tbody":
          case "tfoot":
          case "colgroup":
          case "caption":
            return parseHTML("<table>" + n + "</table>", 1);
          case "col":
            return parseHTML("<table><colgroup>" + n + "</colgroup></table>", 2);
          case "tr":
            return parseHTML("<table><tbody>" + n + "</tbody></table>", 2);
          case "td":
          case "th":
            return parseHTML("<table><tbody><tr>" + n + "</tr></tbody></table>", 3);
          case "script":
          case "style":
            return parseHTML("<div>" + n + "</div>", 1);
          default:
            return parseHTML(n, 0);
        }
      }
      function maybeCall(e) {
        e && e();
      }
      function isType(e, t) {
        return Object.prototype.toString.call(e) === "[object " + t + "]";
      }
      function isFunction(e) {
        return isType(e, "Function");
      }
      function isRawObject(e) {
        return isType(e, "Object");
      }
      function getInternalData(e) {
        var t = "htmx-internal-data", r = e[t];
        return r || (r = e[t] = {}), r;
      }
      function toArray(e) {
        var t = [];
        if (e)
          for (var r = 0; r < e.length; r++)
            t.push(e[r]);
        return t;
      }
      function forEach(e, t) {
        if (e)
          for (var r = 0; r < e.length; r++)
            t(e[r]);
      }
      function isScrolledIntoView(e) {
        var t = e.getBoundingClientRect(), r = t.top, n = t.bottom;
        return r < window.innerHeight && n >= 0;
      }
      function bodyContains(e) {
        return e.getRootNode && e.getRootNode() instanceof window.ShadowRoot ? getDocument().body.contains(e.getRootNode().host) : getDocument().body.contains(e);
      }
      function splitOnWhitespace(e) {
        return e.trim().split(/\s+/);
      }
      function mergeObjects(e, t) {
        for (var r in t)
          t.hasOwnProperty(r) && (e[r] = t[r]);
        return e;
      }
      function parseJSON(e) {
        try {
          return JSON.parse(e);
        } catch (t) {
          return logError(t), null;
        }
      }
      function canAccessLocalStorage() {
        var e = "htmx:localStorageTest";
        try {
          return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
        } catch {
          return !1;
        }
      }
      function normalizePath(e) {
        try {
          var t = new URL(e);
          return t && (e = t.pathname + t.search), /^\/$/.test(e) || (e = e.replace(/\/+$/, "")), e;
        } catch {
          return e;
        }
      }
      function internalEval(str) {
        return maybeEval(getDocument().body, function() {
          return eval(str);
        });
      }
      function onLoadHelper(e) {
        var t = htmx.on("htmx:load", function(r) {
          e(r.detail.elt);
        });
        return t;
      }
      function logAll() {
        htmx.logger = function(e, t, r) {
          console && console.log(t, e, r);
        };
      }
      function logNone() {
        htmx.logger = null;
      }
      function find(e, t) {
        return t ? e.querySelector(t) : find(getDocument(), e);
      }
      function findAll(e, t) {
        return t ? e.querySelectorAll(t) : findAll(getDocument(), e);
      }
      function removeElement(e, t) {
        e = resolveTarget(e), t ? setTimeout(function() {
          removeElement(e), e = null;
        }, t) : e.parentElement.removeChild(e);
      }
      function addClassToElement(e, t, r) {
        e = resolveTarget(e), r ? setTimeout(function() {
          addClassToElement(e, t), e = null;
        }, r) : e.classList && e.classList.add(t);
      }
      function removeClassFromElement(e, t, r) {
        e = resolveTarget(e), r ? setTimeout(function() {
          removeClassFromElement(e, t), e = null;
        }, r) : e.classList && (e.classList.remove(t), e.classList.length === 0 && e.removeAttribute("class"));
      }
      function toggleClassOnElement(e, t) {
        e = resolveTarget(e), e.classList.toggle(t);
      }
      function takeClassForElement(e, t) {
        e = resolveTarget(e), forEach(e.parentElement.children, function(r) {
          removeClassFromElement(r, t);
        }), addClassToElement(e, t);
      }
      function closest(e, t) {
        if (e = resolveTarget(e), e.closest)
          return e.closest(t);
        do
          if (e == null || matches(e, t))
            return e;
        while (e = e && parentElt(e));
        return null;
      }
      function startsWith(e, t) {
        return e.substring(0, t.length) === t;
      }
      function endsWith(e, t) {
        return e.substring(e.length - t.length) === t;
      }
      function normalizeSelector(e) {
        var t = e.trim();
        return startsWith(t, "<") && endsWith(t, "/>") ? t.substring(1, t.length - 2) : t;
      }
      function querySelectorAllExt(e, t) {
        return t.indexOf("closest ") === 0 ? [closest(e, normalizeSelector(t.substr(8)))] : t.indexOf("find ") === 0 ? [find(e, normalizeSelector(t.substr(5)))] : t === "next" ? [e.nextElementSibling] : t.indexOf("next ") === 0 ? [scanForwardQuery(e, normalizeSelector(t.substr(5)))] : t === "previous" ? [e.previousElementSibling] : t.indexOf("previous ") === 0 ? [scanBackwardsQuery(e, normalizeSelector(t.substr(9)))] : t === "document" ? [document] : t === "window" ? [window] : t === "body" ? [document.body] : getDocument().querySelectorAll(normalizeSelector(t));
      }
      var scanForwardQuery = function(e, t) {
        for (var r = getDocument().querySelectorAll(t), n = 0; n < r.length; n++) {
          var a = r[n];
          if (a.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_PRECEDING)
            return a;
        }
      }, scanBackwardsQuery = function(e, t) {
        for (var r = getDocument().querySelectorAll(t), n = r.length - 1; n >= 0; n--) {
          var a = r[n];
          if (a.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_FOLLOWING)
            return a;
        }
      };
      function querySelectorExt(e, t) {
        return t ? querySelectorAllExt(e, t)[0] : querySelectorAllExt(getDocument().body, e)[0];
      }
      function resolveTarget(e) {
        return isType(e, "String") ? find(e) : e;
      }
      function processEventArgs(e, t, r) {
        return isFunction(t) ? {
          target: getDocument().body,
          event: e,
          listener: t
        } : {
          target: resolveTarget(e),
          event: t,
          listener: r
        };
      }
      function addEventListenerImpl(e, t, r) {
        ready(function() {
          var a = processEventArgs(e, t, r);
          a.target.addEventListener(a.event, a.listener);
        });
        var n = isFunction(t);
        return n ? t : r;
      }
      function removeEventListenerImpl(e, t, r) {
        return ready(function() {
          var n = processEventArgs(e, t, r);
          n.target.removeEventListener(n.event, n.listener);
        }), isFunction(t) ? t : r;
      }
      var DUMMY_ELT = getDocument().createElement("output");
      function findAttributeTargets(e, t) {
        var r = getClosestAttributeValue(e, t);
        if (r) {
          if (r === "this")
            return [findThisElement(e, t)];
          var n = querySelectorAllExt(e, r);
          return n.length === 0 ? (logError('The selector "' + r + '" on ' + t + " returned no matches!"), [DUMMY_ELT]) : n;
        }
      }
      function findThisElement(e, t) {
        return getClosestMatch(e, function(r) {
          return getAttributeValue(r, t) != null;
        });
      }
      function getTarget(e) {
        var t = getClosestAttributeValue(e, "hx-target");
        if (t)
          return t === "this" ? findThisElement(e, "hx-target") : querySelectorExt(e, t);
        var r = getInternalData(e);
        return r.boosted ? getDocument().body : e;
      }
      function shouldSettleAttribute(e) {
        for (var t = htmx.config.attributesToSettle, r = 0; r < t.length; r++)
          if (e === t[r])
            return !0;
        return !1;
      }
      function cloneAttributes(e, t) {
        forEach(e.attributes, function(r) {
          !t.hasAttribute(r.name) && shouldSettleAttribute(r.name) && e.removeAttribute(r.name);
        }), forEach(t.attributes, function(r) {
          shouldSettleAttribute(r.name) && e.setAttribute(r.name, r.value);
        });
      }
      function isInlineSwap(e, t) {
        for (var r = getExtensions(t), n = 0; n < r.length; n++) {
          var a = r[n];
          try {
            if (a.isInlineSwap(e))
              return !0;
          } catch (i) {
            logError(i);
          }
        }
        return e === "outerHTML";
      }
      function oobSwap(e, t, r) {
        var n = "#" + getRawAttribute(t, "id"), a = "outerHTML";
        e === "true" || (e.indexOf(":") > 0 ? (a = e.substr(0, e.indexOf(":")), n = e.substr(e.indexOf(":") + 1, e.length)) : a = e);
        var i = getDocument().querySelectorAll(n);
        return i ? (forEach(
          i,
          function(o) {
            var s, u = t.cloneNode(!0);
            s = getDocument().createDocumentFragment(), s.appendChild(u), isInlineSwap(a, o) || (s = u);
            var l = { shouldSwap: !0, target: o, fragment: s };
            triggerEvent(o, "htmx:oobBeforeSwap", l) && (o = l.target, l.shouldSwap && swap(a, o, o, s, r), forEach(r.elts, function(f) {
              triggerEvent(f, "htmx:oobAfterSwap", l);
            }));
          }
        ), t.parentNode.removeChild(t)) : (t.parentNode.removeChild(t), triggerErrorEvent(getDocument().body, "htmx:oobErrorNoTarget", { content: t })), e;
      }
      function handleOutOfBandSwaps(e, t, r) {
        var n = getClosestAttributeValue(e, "hx-select-oob");
        if (n)
          for (var a = n.split(","), i = 0; i < a.length; i++) {
            var o = a[i].split(":", 2), s = o[0].trim();
            s.indexOf("#") === 0 && (s = s.substring(1));
            var u = o[1] || "true", l = t.querySelector("#" + s);
            l && oobSwap(u, l, r);
          }
        forEach(findAll(t, "[hx-swap-oob], [data-hx-swap-oob]"), function(f) {
          var c = getAttributeValue(f, "hx-swap-oob");
          c != null && oobSwap(c, f, r);
        });
      }
      function handlePreservedElements(e) {
        forEach(findAll(e, "[hx-preserve], [data-hx-preserve]"), function(t) {
          var r = getAttributeValue(t, "id"), n = getDocument().getElementById(r);
          n != null && t.parentNode.replaceChild(n, t);
        });
      }
      function handleAttributes(e, t, r) {
        forEach(t.querySelectorAll("[id]"), function(n) {
          var a = getRawAttribute(n, "id");
          if (a && a.length > 0) {
            var i = a.replace("'", "\\'"), o = n.tagName.replace(":", "\\:"), s = e.querySelector(o + "[id='" + i + "']");
            if (s && s !== e) {
              var u = n.cloneNode();
              cloneAttributes(n, s), r.tasks.push(function() {
                cloneAttributes(n, u);
              });
            }
          }
        });
      }
      function makeAjaxLoadTask(e) {
        return function() {
          removeClassFromElement(e, htmx.config.addedClass), processNode(e), processScripts(e), processFocus(e), triggerEvent(e, "htmx:load");
        };
      }
      function processFocus(e) {
        var t = "[autofocus]", r = matches(e, t) ? e : e.querySelector(t);
        r != null && r.focus();
      }
      function insertNodesBefore(e, t, r, n) {
        for (handleAttributes(e, r, n); r.childNodes.length > 0; ) {
          var a = r.firstChild;
          addClassToElement(a, htmx.config.addedClass), e.insertBefore(a, t), a.nodeType !== Node.TEXT_NODE && a.nodeType !== Node.COMMENT_NODE && n.tasks.push(makeAjaxLoadTask(a));
        }
      }
      function stringHash(e, t) {
        for (var r = 0; r < e.length; )
          t = (t << 5) - t + e.charCodeAt(r++) | 0;
        return t;
      }
      function attributeHash(e) {
        var t = 0;
        if (e.attributes)
          for (var r = 0; r < e.attributes.length; r++) {
            var n = e.attributes[r];
            n.value && (t = stringHash(n.name, t), t = stringHash(n.value, t));
          }
        return t;
      }
      function deInitOnHandlers(e) {
        var t = getInternalData(e);
        if (t.onHandlers) {
          for (var r = 0; r < t.onHandlers.length; r++) {
            const n = t.onHandlers[r];
            e.removeEventListener(n.event, n.listener);
          }
          delete t.onHandlers;
        }
      }
      function deInitNode(e) {
        var t = getInternalData(e);
        t.timeout && clearTimeout(t.timeout), t.webSocket && t.webSocket.close(), t.sseEventSource && t.sseEventSource.close(), t.listenerInfos && forEach(t.listenerInfos, function(r) {
          r.on && r.on.removeEventListener(r.trigger, r.listener);
        }), deInitOnHandlers(e), forEach(Object.keys(t), function(r) {
          delete t[r];
        });
      }
      function cleanUpElement(e) {
        triggerEvent(e, "htmx:beforeCleanupElement"), deInitNode(e), e.children && forEach(e.children, function(t) {
          cleanUpElement(t);
        });
      }
      function swapOuterHTML(e, t, r) {
        if (e.tagName === "BODY")
          return swapInnerHTML(e, t, r);
        var n, a = e.previousSibling;
        for (insertNodesBefore(parentElt(e), e, t, r), a == null ? n = parentElt(e).firstChild : n = a.nextSibling, r.elts = r.elts.filter(function(i) {
          return i != e;
        }); n && n !== e; )
          n.nodeType === Node.ELEMENT_NODE && r.elts.push(n), n = n.nextElementSibling;
        cleanUpElement(e), parentElt(e).removeChild(e);
      }
      function swapAfterBegin(e, t, r) {
        return insertNodesBefore(e, e.firstChild, t, r);
      }
      function swapBeforeBegin(e, t, r) {
        return insertNodesBefore(parentElt(e), e, t, r);
      }
      function swapBeforeEnd(e, t, r) {
        return insertNodesBefore(e, null, t, r);
      }
      function swapAfterEnd(e, t, r) {
        return insertNodesBefore(parentElt(e), e.nextSibling, t, r);
      }
      function swapDelete(e, t, r) {
        return cleanUpElement(e), parentElt(e).removeChild(e);
      }
      function swapInnerHTML(e, t, r) {
        var n = e.firstChild;
        if (insertNodesBefore(e, n, t, r), n) {
          for (; n.nextSibling; )
            cleanUpElement(n.nextSibling), e.removeChild(n.nextSibling);
          cleanUpElement(n), e.removeChild(n);
        }
      }
      function maybeSelectFromResponse(e, t, r) {
        var n = r || getClosestAttributeValue(e, "hx-select");
        if (n) {
          var a = getDocument().createDocumentFragment();
          forEach(t.querySelectorAll(n), function(i) {
            a.appendChild(i);
          }), t = a;
        }
        return t;
      }
      function swap(e, t, r, n, a) {
        switch (e) {
          case "none":
            return;
          case "outerHTML":
            swapOuterHTML(r, n, a);
            return;
          case "afterbegin":
            swapAfterBegin(r, n, a);
            return;
          case "beforebegin":
            swapBeforeBegin(r, n, a);
            return;
          case "beforeend":
            swapBeforeEnd(r, n, a);
            return;
          case "afterend":
            swapAfterEnd(r, n, a);
            return;
          case "delete":
            swapDelete(r);
            return;
          default:
            for (var i = getExtensions(t), o = 0; o < i.length; o++) {
              var s = i[o];
              try {
                var u = s.handleSwap(e, r, n, a);
                if (u) {
                  if (typeof u.length < "u")
                    for (var l = 0; l < u.length; l++) {
                      var f = u[l];
                      f.nodeType !== Node.TEXT_NODE && f.nodeType !== Node.COMMENT_NODE && a.tasks.push(makeAjaxLoadTask(f));
                    }
                  return;
                }
              } catch (c) {
                logError(c);
              }
            }
            e === "innerHTML" ? swapInnerHTML(r, n, a) : swap(htmx.config.defaultSwapStyle, t, r, n, a);
        }
      }
      function findTitle(e) {
        if (e.indexOf("<title") > -1) {
          var t = e.replace(SVG_TAGS_REGEX, ""), r = t.match(TITLE_TAG_REGEX);
          if (r)
            return r[2];
        }
      }
      function selectAndSwap(e, t, r, n, a, i) {
        a.title = findTitle(n);
        var o = makeFragment(n);
        if (o)
          return handleOutOfBandSwaps(r, o, a), o = maybeSelectFromResponse(r, o, i), handlePreservedElements(o), swap(e, r, t, o, a);
      }
      function handleTrigger(e, t, r) {
        var n = e.getResponseHeader(t);
        if (n.indexOf("{") === 0) {
          var a = parseJSON(n);
          for (var i in a)
            if (a.hasOwnProperty(i)) {
              var o = a[i];
              isRawObject(o) || (o = { value: o }), triggerEvent(r, i, o);
            }
        } else
          for (var s = n.split(","), u = 0; u < s.length; u++)
            triggerEvent(r, s[u].trim(), []);
      }
      var WHITESPACE_OR_COMMA = /[\s,]/, SYMBOL_START = /[_$a-zA-Z]/, SYMBOL_CONT = /[_$a-zA-Z0-9]/, STRINGISH_START = ['"', "'", "/"], NOT_WHITESPACE = /[^\s]/, COMBINED_SELECTOR_START = /[{(]/, COMBINED_SELECTOR_END = /[})]/;
      function tokenizeString(e) {
        for (var t = [], r = 0; r < e.length; ) {
          if (SYMBOL_START.exec(e.charAt(r))) {
            for (var n = r; SYMBOL_CONT.exec(e.charAt(r + 1)); )
              r++;
            t.push(e.substr(n, r - n + 1));
          } else if (STRINGISH_START.indexOf(e.charAt(r)) !== -1) {
            var a = e.charAt(r), n = r;
            for (r++; r < e.length && e.charAt(r) !== a; )
              e.charAt(r) === "\\" && r++, r++;
            t.push(e.substr(n, r - n + 1));
          } else {
            var i = e.charAt(r);
            t.push(i);
          }
          r++;
        }
        return t;
      }
      function isPossibleRelativeReference(e, t, r) {
        return SYMBOL_START.exec(e.charAt(0)) && e !== "true" && e !== "false" && e !== "this" && e !== r && t !== ".";
      }
      function maybeGenerateConditional(e, t, r) {
        if (t[0] === "[") {
          t.shift();
          for (var n = 1, a = " return (function(" + r + "){ return (", i = null; t.length > 0; ) {
            var o = t[0];
            if (o === "]") {
              if (n--, n === 0) {
                i === null && (a = a + "true"), t.shift(), a += ")})";
                try {
                  var s = maybeEval(
                    e,
                    function() {
                      return Function(a)();
                    },
                    function() {
                      return !0;
                    }
                  );
                  return s.source = a, s;
                } catch (u) {
                  return triggerErrorEvent(getDocument().body, "htmx:syntax:error", { error: u, source: a }), null;
                }
              }
            } else
              o === "[" && n++;
            isPossibleRelativeReference(o, i, r) ? a += "((" + r + "." + o + ") ? (" + r + "." + o + ") : (window." + o + "))" : a = a + o, i = t.shift();
          }
        }
      }
      function consumeUntil(e, t) {
        for (var r = ""; e.length > 0 && !t.test(e[0]); )
          r += e.shift();
        return r;
      }
      function consumeCSSSelector(e) {
        var t;
        return e.length > 0 && COMBINED_SELECTOR_START.test(e[0]) ? (e.shift(), t = consumeUntil(e, COMBINED_SELECTOR_END).trim(), e.shift()) : t = consumeUntil(e, WHITESPACE_OR_COMMA), t;
      }
      var INPUT_SELECTOR = "input, textarea, select";
      function parseAndCacheTrigger(e, t, r) {
        var n = [], a = tokenizeString(t);
        do {
          consumeUntil(a, NOT_WHITESPACE);
          var i = a.length, o = consumeUntil(a, /[,\[\s]/);
          if (o !== "")
            if (o === "every") {
              var s = { trigger: "every" };
              consumeUntil(a, NOT_WHITESPACE), s.pollInterval = parseInterval(consumeUntil(a, /[,\[\s]/)), consumeUntil(a, NOT_WHITESPACE);
              var u = maybeGenerateConditional(e, a, "event");
              u && (s.eventFilter = u), n.push(s);
            } else if (o.indexOf("sse:") === 0)
              n.push({ trigger: "sse", sseEvent: o.substr(4) });
            else {
              var l = { trigger: o }, u = maybeGenerateConditional(e, a, "event");
              for (u && (l.eventFilter = u); a.length > 0 && a[0] !== ","; ) {
                consumeUntil(a, NOT_WHITESPACE);
                var f = a.shift();
                if (f === "changed")
                  l.changed = !0;
                else if (f === "once")
                  l.once = !0;
                else if (f === "consume")
                  l.consume = !0;
                else if (f === "delay" && a[0] === ":")
                  a.shift(), l.delay = parseInterval(consumeUntil(a, WHITESPACE_OR_COMMA));
                else if (f === "from" && a[0] === ":") {
                  if (a.shift(), COMBINED_SELECTOR_START.test(a[0]))
                    var c = consumeCSSSelector(a);
                  else {
                    var c = consumeUntil(a, WHITESPACE_OR_COMMA);
                    if (c === "closest" || c === "find" || c === "next" || c === "previous") {
                      a.shift();
                      var h = consumeCSSSelector(a);
                      h.length > 0 && (c += " " + h);
                    }
                  }
                  l.from = c;
                } else
                  f === "target" && a[0] === ":" ? (a.shift(), l.target = consumeCSSSelector(a)) : f === "throttle" && a[0] === ":" ? (a.shift(), l.throttle = parseInterval(consumeUntil(a, WHITESPACE_OR_COMMA))) : f === "queue" && a[0] === ":" ? (a.shift(), l.queue = consumeUntil(a, WHITESPACE_OR_COMMA)) : f === "root" && a[0] === ":" ? (a.shift(), l[f] = consumeCSSSelector(a)) : f === "threshold" && a[0] === ":" ? (a.shift(), l[f] = consumeUntil(a, WHITESPACE_OR_COMMA)) : triggerErrorEvent(e, "htmx:syntax:error", { token: a.shift() });
              }
              n.push(l);
            }
          a.length === i && triggerErrorEvent(e, "htmx:syntax:error", { token: a.shift() }), consumeUntil(a, NOT_WHITESPACE);
        } while (a[0] === "," && a.shift());
        return r && (r[t] = n), n;
      }
      function getTriggerSpecs(e) {
        var t = getAttributeValue(e, "hx-trigger"), r = [];
        if (t) {
          var n = htmx.config.triggerSpecsCache;
          r = n && n[t] || parseAndCacheTrigger(e, t, n);
        }
        return r.length > 0 ? r : matches(e, "form") ? [{ trigger: "submit" }] : matches(e, 'input[type="button"], input[type="submit"]') ? [{ trigger: "click" }] : matches(e, INPUT_SELECTOR) ? [{ trigger: "change" }] : [{ trigger: "click" }];
      }
      function cancelPolling(e) {
        getInternalData(e).cancelled = !0;
      }
      function processPolling(e, t, r) {
        var n = getInternalData(e);
        n.timeout = setTimeout(function() {
          bodyContains(e) && n.cancelled !== !0 && (maybeFilterEvent(r, e, makeEvent("hx:poll:trigger", {
            triggerSpec: r,
            target: e
          })) || t(e), processPolling(e, t, r));
        }, r.pollInterval);
      }
      function isLocalLink(e) {
        return location.hostname === e.hostname && getRawAttribute(e, "href") && getRawAttribute(e, "href").indexOf("#") !== 0;
      }
      function boostElement(e, t, r) {
        if (e.tagName === "A" && isLocalLink(e) && (e.target === "" || e.target === "_self") || e.tagName === "FORM") {
          t.boosted = !0;
          var n, a;
          if (e.tagName === "A")
            n = "get", a = getRawAttribute(e, "href");
          else {
            var i = getRawAttribute(e, "method");
            n = i ? i.toLowerCase() : "get", a = getRawAttribute(e, "action");
          }
          r.forEach(function(o) {
            addEventListener(e, function(s, u) {
              if (closest(s, htmx.config.disableSelector)) {
                cleanUpElement(s);
                return;
              }
              issueAjaxRequest(n, a, s, u);
            }, t, o, !0);
          });
        }
      }
      function shouldCancel(e, t) {
        return !!((e.type === "submit" || e.type === "click") && (t.tagName === "FORM" || matches(t, 'input[type="submit"], button') && closest(t, "form") !== null || t.tagName === "A" && t.href && (t.getAttribute("href") === "#" || t.getAttribute("href").indexOf("#") !== 0)));
      }
      function ignoreBoostedAnchorCtrlClick(e, t) {
        return getInternalData(e).boosted && e.tagName === "A" && t.type === "click" && (t.ctrlKey || t.metaKey);
      }
      function maybeFilterEvent(e, t, r) {
        var n = e.eventFilter;
        if (n)
          try {
            return n.call(t, r) !== !0;
          } catch (a) {
            return triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", { error: a, source: n.source }), !0;
          }
        return !1;
      }
      function addEventListener(e, t, r, n, a) {
        var i = getInternalData(e), o;
        n.from ? o = querySelectorAllExt(e, n.from) : o = [e], n.changed && o.forEach(function(s) {
          var u = getInternalData(s);
          u.lastValue = s.value;
        }), forEach(o, function(s) {
          var u = function(l) {
            if (!bodyContains(e)) {
              s.removeEventListener(n.trigger, u);
              return;
            }
            if (!ignoreBoostedAnchorCtrlClick(e, l) && ((a || shouldCancel(l, e)) && l.preventDefault(), !maybeFilterEvent(n, e, l))) {
              var f = getInternalData(l);
              if (f.triggerSpec = n, f.handledFor == null && (f.handledFor = []), f.handledFor.indexOf(e) < 0) {
                if (f.handledFor.push(e), n.consume && l.stopPropagation(), n.target && l.target && !matches(l.target, n.target))
                  return;
                if (n.once) {
                  if (i.triggeredOnce)
                    return;
                  i.triggeredOnce = !0;
                }
                if (n.changed) {
                  var c = getInternalData(s);
                  if (c.lastValue === s.value)
                    return;
                  c.lastValue = s.value;
                }
                if (i.delayed && clearTimeout(i.delayed), i.throttle)
                  return;
                n.throttle > 0 ? i.throttle || (t(e, l), i.throttle = setTimeout(function() {
                  i.throttle = null;
                }, n.throttle)) : n.delay > 0 ? i.delayed = setTimeout(function() {
                  t(e, l);
                }, n.delay) : (triggerEvent(e, "htmx:trigger"), t(e, l));
              }
            }
          };
          r.listenerInfos == null && (r.listenerInfos = []), r.listenerInfos.push({
            trigger: n.trigger,
            listener: u,
            on: s
          }), s.addEventListener(n.trigger, u);
        });
      }
      var windowIsScrolling = !1, scrollHandler = null;
      function initScrollHandler() {
        scrollHandler || (scrollHandler = function() {
          windowIsScrolling = !0;
        }, window.addEventListener("scroll", scrollHandler), setInterval(function() {
          windowIsScrolling && (windowIsScrolling = !1, forEach(getDocument().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(e) {
            maybeReveal(e);
          }));
        }, 200));
      }
      function maybeReveal(e) {
        if (!hasAttribute(e, "data-hx-revealed") && isScrolledIntoView(e)) {
          e.setAttribute("data-hx-revealed", "true");
          var t = getInternalData(e);
          t.initHash ? triggerEvent(e, "revealed") : e.addEventListener("htmx:afterProcessNode", function(r) {
            triggerEvent(e, "revealed");
          }, { once: !0 });
        }
      }
      function processWebSocketInfo(e, t, r) {
        for (var n = splitOnWhitespace(r), a = 0; a < n.length; a++) {
          var i = n[a].split(/:(.+)/);
          i[0] === "connect" && ensureWebSocket(e, i[1], 0), i[0] === "send" && processWebSocketSend(e);
        }
      }
      function ensureWebSocket(e, t, r) {
        if (bodyContains(e)) {
          if (t.indexOf("/") == 0) {
            var n = location.hostname + (location.port ? ":" + location.port : "");
            location.protocol == "https:" ? t = "wss://" + n + t : location.protocol == "http:" && (t = "ws://" + n + t);
          }
          var a = htmx.createWebSocket(t);
          a.onerror = function(i) {
            triggerErrorEvent(e, "htmx:wsError", { error: i, socket: a }), maybeCloseWebSocketSource(e);
          }, a.onclose = function(i) {
            if ([1006, 1012, 1013].indexOf(i.code) >= 0) {
              var o = getWebSocketReconnectDelay(r);
              setTimeout(function() {
                ensureWebSocket(e, t, r + 1);
              }, o);
            }
          }, a.onopen = function(i) {
            r = 0;
          }, getInternalData(e).webSocket = a, a.addEventListener("message", function(i) {
            if (!maybeCloseWebSocketSource(e)) {
              var o = i.data;
              withExtensions(e, function(h) {
                o = h.transformResponse(o, null, e);
              });
              for (var s = makeSettleInfo(e), u = makeFragment(o), l = toArray(u.children), f = 0; f < l.length; f++) {
                var c = l[f];
                oobSwap(getAttributeValue(c, "hx-swap-oob") || "true", c, s);
              }
              settleImmediately(s.tasks);
            }
          });
        }
      }
      function maybeCloseWebSocketSource(e) {
        if (!bodyContains(e))
          return getInternalData(e).webSocket.close(), !0;
      }
      function processWebSocketSend(e) {
        var t = getClosestMatch(e, function(r) {
          return getInternalData(r).webSocket != null;
        });
        t ? e.addEventListener(getTriggerSpecs(e)[0].trigger, function(r) {
          var n = getInternalData(t).webSocket, a = getHeaders(e, t), i = getInputValues(e, "post"), o = i.errors, s = i.values, u = getExpressionVars(e), l = mergeObjects(s, u), f = filterValues(l, e);
          if (f.HEADERS = a, o && o.length > 0) {
            triggerEvent(e, "htmx:validation:halted", o);
            return;
          }
          n.send(JSON.stringify(f)), shouldCancel(r, e) && r.preventDefault();
        }) : triggerErrorEvent(e, "htmx:noWebSocketSourceError");
      }
      function getWebSocketReconnectDelay(e) {
        var t = htmx.config.wsReconnectDelay;
        if (typeof t == "function")
          return t(e);
        if (t === "full-jitter") {
          var r = Math.min(e, 6), n = 1e3 * Math.pow(2, r);
          return n * Math.random();
        }
        logError('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
      }
      function processSSEInfo(e, t, r) {
        for (var n = splitOnWhitespace(r), a = 0; a < n.length; a++) {
          var i = n[a].split(/:(.+)/);
          i[0] === "connect" && processSSESource(e, i[1]), i[0] === "swap" && processSSESwap(e, i[1]);
        }
      }
      function processSSESource(e, t) {
        var r = htmx.createEventSource(t);
        r.onerror = function(n) {
          triggerErrorEvent(e, "htmx:sseError", { error: n, source: r }), maybeCloseSSESource(e);
        }, getInternalData(e).sseEventSource = r;
      }
      function processSSESwap(e, t) {
        var r = getClosestMatch(e, hasEventSource);
        if (r) {
          var n = getInternalData(r).sseEventSource, a = function(i) {
            if (!maybeCloseSSESource(r)) {
              if (!bodyContains(e)) {
                n.removeEventListener(t, a);
                return;
              }
              var o = i.data;
              withExtensions(e, function(f) {
                o = f.transformResponse(o, null, e);
              });
              var s = getSwapSpecification(e), u = getTarget(e), l = makeSettleInfo(e);
              selectAndSwap(s.swapStyle, u, e, o, l), settleImmediately(l.tasks), triggerEvent(e, "htmx:sseMessage", i);
            }
          };
          getInternalData(e).sseListener = a, n.addEventListener(t, a);
        } else
          triggerErrorEvent(e, "htmx:noSSESourceError");
      }
      function processSSETrigger(e, t, r) {
        var n = getClosestMatch(e, hasEventSource);
        if (n) {
          var a = getInternalData(n).sseEventSource, i = function() {
            maybeCloseSSESource(n) || (bodyContains(e) ? t(e) : a.removeEventListener(r, i));
          };
          getInternalData(e).sseListener = i, a.addEventListener(r, i);
        } else
          triggerErrorEvent(e, "htmx:noSSESourceError");
      }
      function maybeCloseSSESource(e) {
        if (!bodyContains(e))
          return getInternalData(e).sseEventSource.close(), !0;
      }
      function hasEventSource(e) {
        return getInternalData(e).sseEventSource != null;
      }
      function loadImmediately(e, t, r, n) {
        var a = function() {
          r.loaded || (r.loaded = !0, t(e));
        };
        n > 0 ? setTimeout(a, n) : a();
      }
      function processVerbs(e, t, r) {
        var n = !1;
        return forEach(VERBS, function(a) {
          if (hasAttribute(e, "hx-" + a)) {
            var i = getAttributeValue(e, "hx-" + a);
            n = !0, t.path = i, t.verb = a, r.forEach(function(o) {
              addTriggerHandler(e, o, t, function(s, u) {
                if (closest(s, htmx.config.disableSelector)) {
                  cleanUpElement(s);
                  return;
                }
                issueAjaxRequest(a, i, s, u);
              });
            });
          }
        }), n;
      }
      function addTriggerHandler(e, t, r, n) {
        if (t.sseEvent)
          processSSETrigger(e, n, t.sseEvent);
        else if (t.trigger === "revealed")
          initScrollHandler(), addEventListener(e, n, r, t), maybeReveal(e);
        else if (t.trigger === "intersect") {
          var a = {};
          t.root && (a.root = querySelectorExt(e, t.root)), t.threshold && (a.threshold = parseFloat(t.threshold));
          var i = new IntersectionObserver(function(o) {
            for (var s = 0; s < o.length; s++) {
              var u = o[s];
              if (u.isIntersecting) {
                triggerEvent(e, "intersect");
                break;
              }
            }
          }, a);
          i.observe(e), addEventListener(e, n, r, t);
        } else
          t.trigger === "load" ? maybeFilterEvent(t, e, makeEvent("load", { elt: e })) || loadImmediately(e, n, r, t.delay) : t.pollInterval > 0 ? (r.polling = !0, processPolling(e, n, t)) : addEventListener(e, n, r, t);
      }
      function evalScript(e) {
        if (htmx.config.allowScriptTags && (e.type === "text/javascript" || e.type === "module" || e.type === "")) {
          var t = getDocument().createElement("script");
          forEach(e.attributes, function(n) {
            t.setAttribute(n.name, n.value);
          }), t.textContent = e.textContent, t.async = !1, htmx.config.inlineScriptNonce && (t.nonce = htmx.config.inlineScriptNonce);
          var r = e.parentElement;
          try {
            r.insertBefore(t, e);
          } catch (n) {
            logError(n);
          } finally {
            e.parentElement && e.parentElement.removeChild(e);
          }
        }
      }
      function processScripts(e) {
        matches(e, "script") && evalScript(e), forEach(findAll(e, "script"), function(t) {
          evalScript(t);
        });
      }
      function shouldProcessHxOn(e) {
        for (var t = e.attributes, r = 0; r < t.length; r++) {
          var n = t[r].name;
          if (startsWith(n, "hx-on:") || startsWith(n, "data-hx-on:") || startsWith(n, "hx-on-") || startsWith(n, "data-hx-on-"))
            return !0;
        }
        return !1;
      }
      function findHxOnWildcardElements(e) {
        var t = null, r = [];
        if (shouldProcessHxOn(e) && r.push(e), document.evaluate)
          for (var n = document.evaluate('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]', e); t = n.iterateNext(); )
            r.push(t);
        else
          for (var a = e.getElementsByTagName("*"), i = 0; i < a.length; i++)
            shouldProcessHxOn(a[i]) && r.push(a[i]);
        return r;
      }
      function findElementsToProcess(e) {
        if (e.querySelectorAll) {
          var t = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]", r = e.querySelectorAll(VERB_SELECTOR + t + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws], [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
          return r;
        } else
          return [];
      }
      function maybeSetLastButtonClicked(e) {
        var t = closest(e.target, "button, input[type='submit']"), r = getRelatedFormData(e);
        r && (r.lastButtonClicked = t);
      }
      function maybeUnsetLastButtonClicked(e) {
        var t = getRelatedFormData(e);
        t && (t.lastButtonClicked = null);
      }
      function getRelatedFormData(e) {
        var t = closest(e.target, "button, input[type='submit']");
        if (t) {
          var r = resolveTarget("#" + getRawAttribute(t, "form")) || closest(t, "form");
          if (r)
            return getInternalData(r);
        }
      }
      function initButtonTracking(e) {
        e.addEventListener("click", maybeSetLastButtonClicked), e.addEventListener("focusin", maybeSetLastButtonClicked), e.addEventListener("focusout", maybeUnsetLastButtonClicked);
      }
      function countCurlies(e) {
        for (var t = tokenizeString(e), r = 0, n = 0; n < t.length; n++) {
          const a = t[n];
          a === "{" ? r++ : a === "}" && r--;
        }
        return r;
      }
      function addHxOnEventHandler(e, t, r) {
        var n = getInternalData(e);
        Array.isArray(n.onHandlers) || (n.onHandlers = []);
        var a, i = function(o) {
          return maybeEval(e, function() {
            a || (a = new Function("event", r)), a.call(e, o);
          });
        };
        e.addEventListener(t, i), n.onHandlers.push({ event: t, listener: i });
      }
      function processHxOn(e) {
        var t = getAttributeValue(e, "hx-on");
        if (t) {
          for (var r = {}, n = t.split(`
`), a = null, i = 0; n.length > 0; ) {
            var o = n.shift(), s = o.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
            i === 0 && s ? (o.split(":"), a = s[1].slice(0, -1), r[a] = s[2]) : r[a] += o, i += countCurlies(o);
          }
          for (var u in r)
            addHxOnEventHandler(e, u, r[u]);
        }
      }
      function processHxOnWildcard(e) {
        deInitOnHandlers(e);
        for (var t = 0; t < e.attributes.length; t++) {
          var r = e.attributes[t].name, n = e.attributes[t].value;
          if (startsWith(r, "hx-on") || startsWith(r, "data-hx-on")) {
            var a = r.indexOf("-on") + 3, i = r.slice(a, a + 1);
            if (i === "-" || i === ":") {
              var o = r.slice(a + 1);
              startsWith(o, ":") ? o = "htmx" + o : startsWith(o, "-") ? o = "htmx:" + o.slice(1) : startsWith(o, "htmx-") && (o = "htmx:" + o.slice(5)), addHxOnEventHandler(e, o, n);
            }
          }
        }
      }
      function initNode(e) {
        if (closest(e, htmx.config.disableSelector)) {
          cleanUpElement(e);
          return;
        }
        var t = getInternalData(e);
        if (t.initHash !== attributeHash(e)) {
          deInitNode(e), t.initHash = attributeHash(e), processHxOn(e), triggerEvent(e, "htmx:beforeProcessNode"), e.value && (t.lastValue = e.value);
          var r = getTriggerSpecs(e), n = processVerbs(e, t, r);
          n || (getClosestAttributeValue(e, "hx-boost") === "true" ? boostElement(e, t, r) : hasAttribute(e, "hx-trigger") && r.forEach(function(o) {
            addTriggerHandler(e, o, t, function() {
            });
          })), (e.tagName === "FORM" || getRawAttribute(e, "type") === "submit" && hasAttribute(e, "form")) && initButtonTracking(e);
          var a = getAttributeValue(e, "hx-sse");
          a && processSSEInfo(e, t, a);
          var i = getAttributeValue(e, "hx-ws");
          i && processWebSocketInfo(e, t, i), triggerEvent(e, "htmx:afterProcessNode");
        }
      }
      function processNode(e) {
        if (e = resolveTarget(e), closest(e, htmx.config.disableSelector)) {
          cleanUpElement(e);
          return;
        }
        initNode(e), forEach(findElementsToProcess(e), function(t) {
          initNode(t);
        }), forEach(findHxOnWildcardElements(e), processHxOnWildcard);
      }
      function kebabEventName(e) {
        return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function makeEvent(e, t) {
        var r;
        return window.CustomEvent && typeof window.CustomEvent == "function" ? r = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: t }) : (r = getDocument().createEvent("CustomEvent"), r.initCustomEvent(e, !0, !0, t)), r;
      }
      function triggerErrorEvent(e, t, r) {
        triggerEvent(e, t, mergeObjects({ error: t }, r));
      }
      function ignoreEventForLogging(e) {
        return e === "htmx:afterProcessNode";
      }
      function withExtensions(e, t) {
        forEach(getExtensions(e), function(r) {
          try {
            t(r);
          } catch (n) {
            logError(n);
          }
        });
      }
      function logError(e) {
        console.error ? console.error(e) : console.log && console.log("ERROR: ", e);
      }
      function triggerEvent(e, t, r) {
        e = resolveTarget(e), r == null && (r = {}), r.elt = e;
        var n = makeEvent(t, r);
        htmx.logger && !ignoreEventForLogging(t) && htmx.logger(e, t, r), r.error && (logError(r.error), triggerEvent(e, "htmx:error", { errorInfo: r }));
        var a = e.dispatchEvent(n), i = kebabEventName(t);
        if (a && i !== t) {
          var o = makeEvent(i, n.detail);
          a = a && e.dispatchEvent(o);
        }
        return withExtensions(e, function(s) {
          a = a && s.onEvent(t, n) !== !1 && !n.defaultPrevented;
        }), a;
      }
      var currentPathForHistory = location.pathname + location.search;
      function getHistoryElement() {
        var e = getDocument().querySelector("[hx-history-elt],[data-hx-history-elt]");
        return e || getDocument().body;
      }
      function saveToHistoryCache(e, t, r, n) {
        if (canAccessLocalStorage()) {
          if (htmx.config.historyCacheSize <= 0) {
            localStorage.removeItem("htmx-history-cache");
            return;
          }
          e = normalizePath(e);
          for (var a = parseJSON(localStorage.getItem("htmx-history-cache")) || [], i = 0; i < a.length; i++)
            if (a[i].url === e) {
              a.splice(i, 1);
              break;
            }
          var o = { url: e, content: t, title: r, scroll: n };
          for (triggerEvent(getDocument().body, "htmx:historyItemCreated", { item: o, cache: a }), a.push(o); a.length > htmx.config.historyCacheSize; )
            a.shift();
          for (; a.length > 0; )
            try {
              localStorage.setItem("htmx-history-cache", JSON.stringify(a));
              break;
            } catch (s) {
              triggerErrorEvent(getDocument().body, "htmx:historyCacheError", { cause: s, cache: a }), a.shift();
            }
        }
      }
      function getCachedHistory(e) {
        if (!canAccessLocalStorage())
          return null;
        e = normalizePath(e);
        for (var t = parseJSON(localStorage.getItem("htmx-history-cache")) || [], r = 0; r < t.length; r++)
          if (t[r].url === e)
            return t[r];
        return null;
      }
      function cleanInnerHtmlForHistory(e) {
        var t = htmx.config.requestClass, r = e.cloneNode(!0);
        return forEach(findAll(r, "." + t), function(n) {
          removeClassFromElement(n, t);
        }), r.innerHTML;
      }
      function saveCurrentPageToHistory() {
        var e = getHistoryElement(), t = currentPathForHistory || location.pathname + location.search, r;
        try {
          r = getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        } catch {
          r = getDocument().querySelector('[hx-history="false"],[data-hx-history="false"]');
        }
        r || (triggerEvent(getDocument().body, "htmx:beforeHistorySave", { path: t, historyElt: e }), saveToHistoryCache(t, cleanInnerHtmlForHistory(e), getDocument().title, window.scrollY)), htmx.config.historyEnabled && history.replaceState({ htmx: !0 }, getDocument().title, window.location.href);
      }
      function pushUrlIntoHistory(e) {
        htmx.config.getCacheBusterParam && (e = e.replace(/org\.htmx\.cache-buster=[^&]*&?/, ""), (endsWith(e, "&") || endsWith(e, "?")) && (e = e.slice(0, -1))), htmx.config.historyEnabled && history.pushState({ htmx: !0 }, "", e), currentPathForHistory = e;
      }
      function replaceUrlInHistory(e) {
        htmx.config.historyEnabled && history.replaceState({ htmx: !0 }, "", e), currentPathForHistory = e;
      }
      function settleImmediately(e) {
        forEach(e, function(t) {
          t.call();
        });
      }
      function loadHistoryFromServer(e) {
        var t = new XMLHttpRequest(), r = { path: e, xhr: t };
        triggerEvent(getDocument().body, "htmx:historyCacheMiss", r), t.open("GET", e, !0), t.setRequestHeader("HX-Request", "true"), t.setRequestHeader("HX-History-Restore-Request", "true"), t.setRequestHeader("HX-Current-URL", getDocument().location.href), t.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            triggerEvent(getDocument().body, "htmx:historyCacheMissLoad", r);
            var n = makeFragment(this.response);
            n = n.querySelector("[hx-history-elt],[data-hx-history-elt]") || n;
            var a = getHistoryElement(), i = makeSettleInfo(a), o = findTitle(this.response);
            if (o) {
              var s = find("title");
              s ? s.innerHTML = o : window.document.title = o;
            }
            swapInnerHTML(a, n, i), settleImmediately(i.tasks), currentPathForHistory = e, triggerEvent(getDocument().body, "htmx:historyRestore", { path: e, cacheMiss: !0, serverResponse: this.response });
          } else
            triggerErrorEvent(getDocument().body, "htmx:historyCacheMissLoadError", r);
        }, t.send();
      }
      function restoreHistory(e) {
        saveCurrentPageToHistory(), e = e || location.pathname + location.search;
        var t = getCachedHistory(e);
        if (t) {
          var r = makeFragment(t.content), n = getHistoryElement(), a = makeSettleInfo(n);
          swapInnerHTML(n, r, a), settleImmediately(a.tasks), document.title = t.title, setTimeout(function() {
            window.scrollTo(0, t.scroll);
          }, 0), currentPathForHistory = e, triggerEvent(getDocument().body, "htmx:historyRestore", { path: e, item: t });
        } else
          htmx.config.refreshOnHistoryMiss ? window.location.reload(!0) : loadHistoryFromServer(e);
      }
      function addRequestIndicatorClasses(e) {
        var t = findAttributeTargets(e, "hx-indicator");
        return t == null && (t = [e]), forEach(t, function(r) {
          var n = getInternalData(r);
          n.requestCount = (n.requestCount || 0) + 1, r.classList.add.call(r.classList, htmx.config.requestClass);
        }), t;
      }
      function disableElements(e) {
        var t = findAttributeTargets(e, "hx-disabled-elt");
        return t == null && (t = []), forEach(t, function(r) {
          var n = getInternalData(r);
          n.requestCount = (n.requestCount || 0) + 1, r.setAttribute("disabled", "");
        }), t;
      }
      function removeRequestIndicators(e, t) {
        forEach(e, function(r) {
          var n = getInternalData(r);
          n.requestCount = (n.requestCount || 0) - 1, n.requestCount === 0 && r.classList.remove.call(r.classList, htmx.config.requestClass);
        }), forEach(t, function(r) {
          var n = getInternalData(r);
          n.requestCount = (n.requestCount || 0) - 1, n.requestCount === 0 && r.removeAttribute("disabled");
        });
      }
      function haveSeenNode(e, t) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          if (n.isSameNode(t))
            return !0;
        }
        return !1;
      }
      function shouldInclude(e) {
        return e.name === "" || e.name == null || e.disabled || closest(e, "fieldset[disabled]") || e.type === "button" || e.type === "submit" || e.tagName === "image" || e.tagName === "reset" || e.tagName === "file" ? !1 : e.type === "checkbox" || e.type === "radio" ? e.checked : !0;
      }
      function addValueToValues(e, t, r) {
        if (e != null && t != null) {
          var n = r[e];
          n === void 0 ? r[e] = t : Array.isArray(n) ? Array.isArray(t) ? r[e] = n.concat(t) : n.push(t) : Array.isArray(t) ? r[e] = [n].concat(t) : r[e] = [n, t];
        }
      }
      function processInputValue(e, t, r, n, a) {
        if (!(n == null || haveSeenNode(e, n))) {
          if (e.push(n), shouldInclude(n)) {
            var i = getRawAttribute(n, "name"), o = n.value;
            n.multiple && n.tagName === "SELECT" && (o = toArray(n.querySelectorAll("option:checked")).map(function(u) {
              return u.value;
            })), n.files && (o = toArray(n.files)), addValueToValues(i, o, t), a && validateElement(n, r);
          }
          if (matches(n, "form")) {
            var s = n.elements;
            forEach(s, function(u) {
              processInputValue(e, t, r, u, a);
            });
          }
        }
      }
      function validateElement(e, t) {
        e.willValidate && (triggerEvent(e, "htmx:validation:validate"), e.checkValidity() || (t.push({ elt: e, message: e.validationMessage, validity: e.validity }), triggerEvent(e, "htmx:validation:failed", { message: e.validationMessage, validity: e.validity })));
      }
      function getInputValues(e, t) {
        var r = [], n = {}, a = {}, i = [], o = getInternalData(e);
        o.lastButtonClicked && !bodyContains(o.lastButtonClicked) && (o.lastButtonClicked = null);
        var s = matches(e, "form") && e.noValidate !== !0 || getAttributeValue(e, "hx-validate") === "true";
        if (o.lastButtonClicked && (s = s && o.lastButtonClicked.formNoValidate !== !0), t !== "get" && processInputValue(r, a, i, closest(e, "form"), s), processInputValue(r, n, i, e, s), o.lastButtonClicked || e.tagName === "BUTTON" || e.tagName === "INPUT" && getRawAttribute(e, "type") === "submit") {
          var u = o.lastButtonClicked || e, l = getRawAttribute(u, "name");
          addValueToValues(l, u.value, a);
        }
        var f = findAttributeTargets(e, "hx-include");
        return forEach(f, function(c) {
          processInputValue(r, n, i, c, s), matches(c, "form") || forEach(c.querySelectorAll(INPUT_SELECTOR), function(h) {
            processInputValue(r, n, i, h, s);
          });
        }), n = mergeObjects(n, a), { errors: i, values: n };
      }
      function appendParam(e, t, r) {
        e !== "" && (e += "&"), String(r) === "[object Object]" && (r = JSON.stringify(r));
        var n = encodeURIComponent(r);
        return e += encodeURIComponent(t) + "=" + n, e;
      }
      function urlEncode(e) {
        var t = "";
        for (var r in e)
          if (e.hasOwnProperty(r)) {
            var n = e[r];
            Array.isArray(n) ? forEach(n, function(a) {
              t = appendParam(t, r, a);
            }) : t = appendParam(t, r, n);
          }
        return t;
      }
      function makeFormData(e) {
        var t = new FormData();
        for (var r in e)
          if (e.hasOwnProperty(r)) {
            var n = e[r];
            Array.isArray(n) ? forEach(n, function(a) {
              t.append(r, a);
            }) : t.append(r, n);
          }
        return t;
      }
      function getHeaders(e, t, r) {
        var n = {
          "HX-Request": "true",
          "HX-Trigger": getRawAttribute(e, "id"),
          "HX-Trigger-Name": getRawAttribute(e, "name"),
          "HX-Target": getAttributeValue(t, "id"),
          "HX-Current-URL": getDocument().location.href
        };
        return getValuesForElement(e, "hx-headers", !1, n), r !== void 0 && (n["HX-Prompt"] = r), getInternalData(e).boosted && (n["HX-Boosted"] = "true"), n;
      }
      function filterValues(e, t) {
        var r = getClosestAttributeValue(t, "hx-params");
        if (r) {
          if (r === "none")
            return {};
          if (r === "*")
            return e;
          if (r.indexOf("not ") === 0)
            return forEach(r.substr(4).split(","), function(a) {
              a = a.trim(), delete e[a];
            }), e;
          var n = {};
          return forEach(r.split(","), function(a) {
            a = a.trim(), n[a] = e[a];
          }), n;
        } else
          return e;
      }
      function isAnchorLink(e) {
        return getRawAttribute(e, "href") && getRawAttribute(e, "href").indexOf("#") >= 0;
      }
      function getSwapSpecification(e, t) {
        var r = t || getClosestAttributeValue(e, "hx-swap"), n = {
          swapStyle: getInternalData(e).boosted ? "innerHTML" : htmx.config.defaultSwapStyle,
          swapDelay: htmx.config.defaultSwapDelay,
          settleDelay: htmx.config.defaultSettleDelay
        };
        if (htmx.config.scrollIntoViewOnBoost && getInternalData(e).boosted && !isAnchorLink(e) && (n.show = "top"), r) {
          var a = splitOnWhitespace(r);
          if (a.length > 0)
            for (var i = 0; i < a.length; i++) {
              var o = a[i];
              if (o.indexOf("swap:") === 0)
                n.swapDelay = parseInterval(o.substr(5));
              else if (o.indexOf("settle:") === 0)
                n.settleDelay = parseInterval(o.substr(7));
              else if (o.indexOf("transition:") === 0)
                n.transition = o.substr(11) === "true";
              else if (o.indexOf("ignoreTitle:") === 0)
                n.ignoreTitle = o.substr(12) === "true";
              else if (o.indexOf("scroll:") === 0) {
                var s = o.substr(7), u = s.split(":"), l = u.pop(), f = u.length > 0 ? u.join(":") : null;
                n.scroll = l, n.scrollTarget = f;
              } else if (o.indexOf("show:") === 0) {
                var c = o.substr(5), u = c.split(":"), h = u.pop(), f = u.length > 0 ? u.join(":") : null;
                n.show = h, n.showTarget = f;
              } else if (o.indexOf("focus-scroll:") === 0) {
                var S = o.substr(13);
                n.focusScroll = S == "true";
              } else
                i == 0 ? n.swapStyle = o : logError("Unknown modifier in hx-swap: " + o);
            }
        }
        return n;
      }
      function usesFormData(e) {
        return getClosestAttributeValue(e, "hx-encoding") === "multipart/form-data" || matches(e, "form") && getRawAttribute(e, "enctype") === "multipart/form-data";
      }
      function encodeParamsForBody(e, t, r) {
        var n = null;
        return withExtensions(t, function(a) {
          n == null && (n = a.encodeParameters(e, r, t));
        }), n ?? (usesFormData(t) ? makeFormData(r) : urlEncode(r));
      }
      function makeSettleInfo(e) {
        return { tasks: [], elts: [e] };
      }
      function updateScrollState(e, t) {
        var r = e[0], n = e[e.length - 1];
        if (t.scroll) {
          var a = null;
          t.scrollTarget && (a = querySelectorExt(r, t.scrollTarget)), t.scroll === "top" && (r || a) && (a = a || r, a.scrollTop = 0), t.scroll === "bottom" && (n || a) && (a = a || n, a.scrollTop = a.scrollHeight);
        }
        if (t.show) {
          var a = null;
          if (t.showTarget) {
            var i = t.showTarget;
            t.showTarget === "window" && (i = "body"), a = querySelectorExt(r, i);
          }
          t.show === "top" && (r || a) && (a = a || r, a.scrollIntoView({ block: "start", behavior: htmx.config.scrollBehavior })), t.show === "bottom" && (n || a) && (a = a || n, a.scrollIntoView({ block: "end", behavior: htmx.config.scrollBehavior }));
        }
      }
      function getValuesForElement(e, t, r, n) {
        if (n == null && (n = {}), e == null)
          return n;
        var a = getAttributeValue(e, t);
        if (a) {
          var i = a.trim(), o = r;
          if (i === "unset")
            return null;
          i.indexOf("javascript:") === 0 ? (i = i.substr(11), o = !0) : i.indexOf("js:") === 0 && (i = i.substr(3), o = !0), i.indexOf("{") !== 0 && (i = "{" + i + "}");
          var s;
          o ? s = maybeEval(e, function() {
            return Function("return (" + i + ")")();
          }, {}) : s = parseJSON(i);
          for (var u in s)
            s.hasOwnProperty(u) && n[u] == null && (n[u] = s[u]);
        }
        return getValuesForElement(parentElt(e), t, r, n);
      }
      function maybeEval(e, t, r) {
        return htmx.config.allowEval ? t() : (triggerErrorEvent(e, "htmx:evalDisallowedError"), r);
      }
      function getHXVarsForElement(e, t) {
        return getValuesForElement(e, "hx-vars", !0, t);
      }
      function getHXValsForElement(e, t) {
        return getValuesForElement(e, "hx-vals", !1, t);
      }
      function getExpressionVars(e) {
        return mergeObjects(getHXVarsForElement(e), getHXValsForElement(e));
      }
      function safelySetHeaderValue(e, t, r) {
        if (r !== null)
          try {
            e.setRequestHeader(t, r);
          } catch {
            e.setRequestHeader(t, encodeURIComponent(r)), e.setRequestHeader(t + "-URI-AutoEncoded", "true");
          }
      }
      function getPathFromResponse(e) {
        if (e.responseURL && typeof URL < "u")
          try {
            var t = new URL(e.responseURL);
            return t.pathname + t.search;
          } catch {
            triggerErrorEvent(getDocument().body, "htmx:badResponseUrl", { url: e.responseURL });
          }
      }
      function hasHeader(e, t) {
        return t.test(e.getAllResponseHeaders());
      }
      function ajaxHelper(e, t, r) {
        return e = e.toLowerCase(), r ? r instanceof Element || isType(r, "String") ? issueAjaxRequest(e, t, null, null, {
          targetOverride: resolveTarget(r),
          returnPromise: !0
        }) : issueAjaxRequest(
          e,
          t,
          resolveTarget(r.source),
          r.event,
          {
            handler: r.handler,
            headers: r.headers,
            values: r.values,
            targetOverride: resolveTarget(r.target),
            swapOverride: r.swap,
            select: r.select,
            returnPromise: !0
          }
        ) : issueAjaxRequest(e, t, null, null, {
          returnPromise: !0
        });
      }
      function hierarchyForElt(e) {
        for (var t = []; e; )
          t.push(e), e = e.parentElement;
        return t;
      }
      function verifyPath(e, t, r) {
        var n, a;
        if (typeof URL == "function") {
          a = new URL(t, document.location.href);
          var i = document.location.origin;
          n = i === a.origin;
        } else
          a = t, n = startsWith(t, document.location.origin);
        return htmx.config.selfRequestsOnly && !n ? !1 : triggerEvent(e, "htmx:validateUrl", mergeObjects({ url: a, sameHost: n }, r));
      }
      function issueAjaxRequest(e, t, r, n, a, i) {
        var o = null, s = null;
        if (a = a ?? {}, a.returnPromise && typeof Promise < "u")
          var u = new Promise(function(x, R) {
            o = x, s = R;
          });
        r == null && (r = getDocument().body);
        var l = a.handler || handleAjaxResponse, f = a.select || null;
        if (!bodyContains(r))
          return maybeCall(o), u;
        var c = a.targetOverride || getTarget(r);
        if (c == null || c == DUMMY_ELT)
          return triggerErrorEvent(r, "htmx:targetError", { target: getAttributeValue(r, "hx-target") }), maybeCall(s), u;
        var h = getInternalData(r), S = h.lastButtonClicked;
        if (S) {
          var A = getRawAttribute(S, "formaction");
          A != null && (t = A);
          var I = getRawAttribute(S, "formmethod");
          I != null && I.toLowerCase() !== "dialog" && (e = I);
        }
        var L = getClosestAttributeValue(r, "hx-confirm");
        if (i === void 0) {
          var U = function(x) {
            return issueAjaxRequest(e, t, r, n, a, !!x);
          }, q = { target: c, elt: r, path: t, verb: e, triggeringEvent: n, etc: a, issueRequest: U, question: L };
          if (triggerEvent(r, "htmx:confirm", q) === !1)
            return maybeCall(o), u;
        }
        var O = r, C = getClosestAttributeValue(r, "hx-sync"), w = null, z = !1;
        if (C) {
          var b = C.split(":"), v = b[0].trim();
          if (v === "this" ? O = findThisElement(r, "hx-sync") : O = querySelectorExt(r, v), C = (b[1] || "drop").trim(), h = getInternalData(O), C === "drop" && h.xhr && h.abortable !== !0)
            return maybeCall(o), u;
          if (C === "abort") {
            if (h.xhr)
              return maybeCall(o), u;
            z = !0;
          } else if (C === "replace")
            triggerEvent(O, "htmx:abort");
          else if (C.indexOf("queue") === 0) {
            var k = C.split(" ");
            w = (k[1] || "last").trim();
          }
        }
        if (h.xhr)
          if (h.abortable)
            triggerEvent(O, "htmx:abort");
          else {
            if (w == null) {
              if (n) {
                var E = getInternalData(n);
                E && E.triggerSpec && E.triggerSpec.queue && (w = E.triggerSpec.queue);
              }
              w == null && (w = "last");
            }
            return h.queuedRequests == null && (h.queuedRequests = []), w === "first" && h.queuedRequests.length === 0 ? h.queuedRequests.push(function() {
              issueAjaxRequest(e, t, r, n, a);
            }) : w === "all" ? h.queuedRequests.push(function() {
              issueAjaxRequest(e, t, r, n, a);
            }) : w === "last" && (h.queuedRequests = [], h.queuedRequests.push(function() {
              issueAjaxRequest(e, t, r, n, a);
            })), maybeCall(o), u;
          }
        var d = new XMLHttpRequest();
        h.xhr = d, h.abortable = z;
        var y = function() {
          if (h.xhr = null, h.abortable = !1, h.queuedRequests != null && h.queuedRequests.length > 0) {
            var x = h.queuedRequests.shift();
            x();
          }
        }, V = getClosestAttributeValue(r, "hx-prompt");
        if (V) {
          var P = prompt(V);
          if (P === null || !triggerEvent(r, "htmx:prompt", { prompt: P, target: c }))
            return maybeCall(o), y(), u;
        }
        if (L && !i && !confirm(L))
          return maybeCall(o), y(), u;
        var g = getHeaders(r, c, P);
        e !== "get" && !usesFormData(r) && (g["Content-Type"] = "application/x-www-form-urlencoded"), a.headers && (g = mergeObjects(g, a.headers));
        var B = getInputValues(r, e), D = B.errors, T = B.values;
        a.values && (T = mergeObjects(T, a.values));
        var Z = getExpressionVars(r), J = mergeObjects(T, Z), F = filterValues(J, r);
        htmx.config.getCacheBusterParam && e === "get" && (F["org.htmx.cache-buster"] = getRawAttribute(c, "id") || "true"), (t == null || t === "") && (t = getDocument().location.href);
        var j = getValuesForElement(r, "hx-request"), $ = getInternalData(r).boosted, N = htmx.config.methodsThatUseUrlParams.indexOf(e) >= 0, p = {
          boosted: $,
          useUrlParams: N,
          parameters: F,
          unfilteredParameters: J,
          headers: g,
          target: c,
          verb: e,
          errors: D,
          withCredentials: a.credentials || j.credentials || htmx.config.withCredentials,
          timeout: a.timeout || j.timeout || htmx.config.timeout,
          path: t,
          triggeringEvent: n
        };
        if (!triggerEvent(r, "htmx:configRequest", p))
          return maybeCall(o), y(), u;
        if (t = p.path, e = p.verb, g = p.headers, F = p.parameters, D = p.errors, N = p.useUrlParams, D && D.length > 0)
          return triggerEvent(r, "htmx:validation:halted", p), maybeCall(o), y(), u;
        var Y = t.split("#"), K = Y[0], X = Y[1], H = t;
        if (N) {
          H = K;
          var ee = Object.keys(F).length !== 0;
          ee && (H.indexOf("?") < 0 ? H += "?" : H += "&", H += urlEncode(F), X && (H += "#" + X));
        }
        if (!verifyPath(r, H, p))
          return triggerErrorEvent(r, "htmx:invalidPath", p), maybeCall(s), u;
        if (d.open(e.toUpperCase(), H, !0), d.overrideMimeType("text/html"), d.withCredentials = p.withCredentials, d.timeout = p.timeout, !j.noHeaders) {
          for (var G in g)
            if (g.hasOwnProperty(G)) {
              var te = g[G];
              safelySetHeaderValue(d, G, te);
            }
        }
        var m = {
          xhr: d,
          target: c,
          requestConfig: p,
          etc: a,
          boosted: $,
          select: f,
          pathInfo: {
            requestPath: t,
            finalRequestPath: H,
            anchor: X
          }
        };
        if (d.onload = function() {
          try {
            var x = hierarchyForElt(r);
            if (m.pathInfo.responsePath = getPathFromResponse(d), l(r, m), removeRequestIndicators(_, W), triggerEvent(r, "htmx:afterRequest", m), triggerEvent(r, "htmx:afterOnLoad", m), !bodyContains(r)) {
              for (var R = null; x.length > 0 && R == null; ) {
                var M = x.shift();
                bodyContains(M) && (R = M);
              }
              R && (triggerEvent(R, "htmx:afterRequest", m), triggerEvent(R, "htmx:afterOnLoad", m));
            }
            maybeCall(o), y();
          } catch (Q) {
            throw triggerErrorEvent(r, "htmx:onLoadError", mergeObjects({ error: Q }, m)), Q;
          }
        }, d.onerror = function() {
          removeRequestIndicators(_, W), triggerErrorEvent(r, "htmx:afterRequest", m), triggerErrorEvent(r, "htmx:sendError", m), maybeCall(s), y();
        }, d.onabort = function() {
          removeRequestIndicators(_, W), triggerErrorEvent(r, "htmx:afterRequest", m), triggerErrorEvent(r, "htmx:sendAbort", m), maybeCall(s), y();
        }, d.ontimeout = function() {
          removeRequestIndicators(_, W), triggerErrorEvent(r, "htmx:afterRequest", m), triggerErrorEvent(r, "htmx:timeout", m), maybeCall(s), y();
        }, !triggerEvent(r, "htmx:beforeRequest", m))
          return maybeCall(o), y(), u;
        var _ = addRequestIndicatorClasses(r), W = disableElements(r);
        forEach(["loadstart", "loadend", "progress", "abort"], function(x) {
          forEach([d, d.upload], function(R) {
            R.addEventListener(x, function(M) {
              triggerEvent(r, "htmx:xhr:" + x, {
                lengthComputable: M.lengthComputable,
                loaded: M.loaded,
                total: M.total
              });
            });
          });
        }), triggerEvent(r, "htmx:beforeSend", m);
        var re = N ? null : encodeParamsForBody(d, r, F);
        return d.send(re), u;
      }
      function determineHistoryUpdates(e, t) {
        var r = t.xhr, n = null, a = null;
        if (hasHeader(r, /HX-Push:/i) ? (n = r.getResponseHeader("HX-Push"), a = "push") : hasHeader(r, /HX-Push-Url:/i) ? (n = r.getResponseHeader("HX-Push-Url"), a = "push") : hasHeader(r, /HX-Replace-Url:/i) && (n = r.getResponseHeader("HX-Replace-Url"), a = "replace"), n)
          return n === "false" ? {} : {
            type: a,
            path: n
          };
        var i = t.pathInfo.finalRequestPath, o = t.pathInfo.responsePath, s = getClosestAttributeValue(e, "hx-push-url"), u = getClosestAttributeValue(e, "hx-replace-url"), l = getInternalData(e).boosted, f = null, c = null;
        return s ? (f = "push", c = s) : u ? (f = "replace", c = u) : l && (f = "push", c = o || i), c ? c === "false" ? {} : (c === "true" && (c = o || i), t.pathInfo.anchor && c.indexOf("#") === -1 && (c = c + "#" + t.pathInfo.anchor), {
          type: f,
          path: c
        }) : {};
      }
      function handleAjaxResponse(e, t) {
        var r = t.xhr, n = t.target, a = t.etc;
        t.requestConfig;
        var i = t.select;
        if (triggerEvent(e, "htmx:beforeOnLoad", t)) {
          if (hasHeader(r, /HX-Trigger:/i) && handleTrigger(r, "HX-Trigger", e), hasHeader(r, /HX-Location:/i)) {
            saveCurrentPageToHistory();
            var o = r.getResponseHeader("HX-Location"), s;
            o.indexOf("{") === 0 && (s = parseJSON(o), o = s.path, delete s.path), ajaxHelper("GET", o, s).then(function() {
              pushUrlIntoHistory(o);
            });
            return;
          }
          var u = hasHeader(r, /HX-Refresh:/i) && r.getResponseHeader("HX-Refresh") === "true";
          if (hasHeader(r, /HX-Redirect:/i)) {
            location.href = r.getResponseHeader("HX-Redirect"), u && location.reload();
            return;
          }
          if (u) {
            location.reload();
            return;
          }
          hasHeader(r, /HX-Retarget:/i) && (r.getResponseHeader("HX-Retarget") === "this" ? t.target = e : t.target = querySelectorExt(e, r.getResponseHeader("HX-Retarget")));
          var l = determineHistoryUpdates(e, t), f = r.status >= 200 && r.status < 400 && r.status !== 204, c = r.response, h = r.status >= 400, S = htmx.config.ignoreTitle, A = mergeObjects({ shouldSwap: f, serverResponse: c, isError: h, ignoreTitle: S }, t);
          if (triggerEvent(n, "htmx:beforeSwap", A)) {
            if (n = A.target, c = A.serverResponse, h = A.isError, S = A.ignoreTitle, t.target = n, t.failed = h, t.successful = !h, A.shouldSwap) {
              r.status === 286 && cancelPolling(e), withExtensions(e, function(b) {
                c = b.transformResponse(c, r, e);
              }), l.type && saveCurrentPageToHistory();
              var I = a.swapOverride;
              hasHeader(r, /HX-Reswap:/i) && (I = r.getResponseHeader("HX-Reswap"));
              var s = getSwapSpecification(e, I);
              s.hasOwnProperty("ignoreTitle") && (S = s.ignoreTitle), n.classList.add(htmx.config.swappingClass);
              var L = null, U = null, q = function() {
                try {
                  var b = document.activeElement, v = {};
                  try {
                    v = {
                      elt: b,
                      // @ts-ignore
                      start: b ? b.selectionStart : null,
                      // @ts-ignore
                      end: b ? b.selectionEnd : null
                    };
                  } catch {
                  }
                  var k;
                  i && (k = i), hasHeader(r, /HX-Reselect:/i) && (k = r.getResponseHeader("HX-Reselect")), l.type && (triggerEvent(getDocument().body, "htmx:beforeHistoryUpdate", mergeObjects({ history: l }, t)), l.type === "push" ? (pushUrlIntoHistory(l.path), triggerEvent(getDocument().body, "htmx:pushedIntoHistory", { path: l.path })) : (replaceUrlInHistory(l.path), triggerEvent(getDocument().body, "htmx:replacedInHistory", { path: l.path })));
                  var E = makeSettleInfo(n);
                  if (selectAndSwap(s.swapStyle, n, e, c, E, k), v.elt && !bodyContains(v.elt) && getRawAttribute(v.elt, "id")) {
                    var d = document.getElementById(getRawAttribute(v.elt, "id")), y = { preventScroll: s.focusScroll !== void 0 ? !s.focusScroll : !htmx.config.defaultFocusScroll };
                    if (d) {
                      if (v.start && d.setSelectionRange)
                        try {
                          d.setSelectionRange(v.start, v.end);
                        } catch {
                        }
                      d.focus(y);
                    }
                  }
                  if (n.classList.remove(htmx.config.swappingClass), forEach(E.elts, function(g) {
                    g.classList && g.classList.add(htmx.config.settlingClass), triggerEvent(g, "htmx:afterSwap", t);
                  }), hasHeader(r, /HX-Trigger-After-Swap:/i)) {
                    var V = e;
                    bodyContains(e) || (V = getDocument().body), handleTrigger(r, "HX-Trigger-After-Swap", V);
                  }
                  var P = function() {
                    if (forEach(E.tasks, function(T) {
                      T.call();
                    }), forEach(E.elts, function(T) {
                      T.classList && T.classList.remove(htmx.config.settlingClass), triggerEvent(T, "htmx:afterSettle", t);
                    }), t.pathInfo.anchor) {
                      var g = getDocument().getElementById(t.pathInfo.anchor);
                      g && g.scrollIntoView({ block: "start", behavior: "auto" });
                    }
                    if (E.title && !S) {
                      var B = find("title");
                      B ? B.innerHTML = E.title : window.document.title = E.title;
                    }
                    if (updateScrollState(E.elts, s), hasHeader(r, /HX-Trigger-After-Settle:/i)) {
                      var D = e;
                      bodyContains(e) || (D = getDocument().body), handleTrigger(r, "HX-Trigger-After-Settle", D);
                    }
                    maybeCall(L);
                  };
                  s.settleDelay > 0 ? setTimeout(P, s.settleDelay) : P();
                } catch (g) {
                  throw triggerErrorEvent(e, "htmx:swapError", t), maybeCall(U), g;
                }
              }, O = htmx.config.globalViewTransitions;
              if (s.hasOwnProperty("transition") && (O = s.transition), O && triggerEvent(e, "htmx:beforeTransition", t) && typeof Promise < "u" && document.startViewTransition) {
                var C = new Promise(function(b, v) {
                  L = b, U = v;
                }), w = q;
                q = function() {
                  document.startViewTransition(function() {
                    return w(), C;
                  });
                };
              }
              s.swapDelay > 0 ? setTimeout(q, s.swapDelay) : q();
            }
            h && triggerErrorEvent(e, "htmx:responseError", mergeObjects({ error: "Response Status Error Code " + r.status + " from " + t.pathInfo.requestPath }, t));
          }
        }
      }
      var extensions = {};
      function extensionBase() {
        return {
          init: function(e) {
            return null;
          },
          onEvent: function(e, t) {
            return !0;
          },
          transformResponse: function(e, t, r) {
            return e;
          },
          isInlineSwap: function(e) {
            return !1;
          },
          handleSwap: function(e, t, r, n) {
            return !1;
          },
          encodeParameters: function(e, t, r) {
            return null;
          }
        };
      }
      function defineExtension(e, t) {
        t.init && t.init(internalAPI), extensions[e] = mergeObjects(extensionBase(), t);
      }
      function removeExtension(e) {
        delete extensions[e];
      }
      function getExtensions(e, t, r) {
        if (e == null)
          return t;
        t == null && (t = []), r == null && (r = []);
        var n = getAttributeValue(e, "hx-ext");
        return n && forEach(n.split(","), function(a) {
          if (a = a.replace(/ /g, ""), a.slice(0, 7) == "ignore:") {
            r.push(a.slice(7));
            return;
          }
          if (r.indexOf(a) < 0) {
            var i = extensions[a];
            i && t.indexOf(i) < 0 && t.push(i);
          }
        }), getExtensions(parentElt(e), t, r);
      }
      var isReady = !1;
      getDocument().addEventListener("DOMContentLoaded", function() {
        isReady = !0;
      });
      function ready(e) {
        isReady || getDocument().readyState === "complete" ? e() : getDocument().addEventListener("DOMContentLoaded", e);
      }
      function insertIndicatorStyles() {
        htmx.config.includeIndicatorStyles !== !1 && getDocument().head.insertAdjacentHTML(
          "beforeend",
          "<style>	                      ." + htmx.config.indicatorClass + "{opacity:0}	                      ." + htmx.config.requestClass + " ." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}	                      ." + htmx.config.requestClass + "." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}	                    </style>"
        );
      }
      function getMetaConfig() {
        var e = getDocument().querySelector('meta[name="htmx-config"]');
        return e ? parseJSON(e.content) : null;
      }
      function mergeMetaConfig() {
        var e = getMetaConfig();
        e && (htmx.config = mergeObjects(htmx.config, e));
      }
      return ready(function() {
        mergeMetaConfig(), insertIndicatorStyles();
        var e = getDocument().body;
        processNode(e);
        var t = getDocument().querySelectorAll(
          "[hx-trigger='restored'],[data-hx-trigger='restored']"
        );
        e.addEventListener("htmx:abort", function(n) {
          var a = n.target, i = getInternalData(a);
          i && i.xhr && i.xhr.abort();
        });
        const r = window.onpopstate ? window.onpopstate.bind(window) : null;
        window.onpopstate = function(n) {
          n.state && n.state.htmx ? (restoreHistory(), forEach(t, function(a) {
            triggerEvent(a, "htmx:restored", {
              document: getDocument(),
              triggerEvent
            });
          })) : r && r(n);
        }, setTimeout(function() {
          triggerEvent(e, "htmx:load", {}), e = null;
        }, 0);
      }), htmx;
    }();
  });
})(htmx$1);
var htmxExports = htmx$1.exports;
const htmx = /* @__PURE__ */ getDefaultExportFromCjs(htmxExports);
export {
  htmx as default
};
