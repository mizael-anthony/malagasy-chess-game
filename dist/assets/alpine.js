(() => {
  var Ee = !1, Se = !1, R = [], Ae = -1;
  function Dn(e) {
    Kn(e);
  }
  function Kn(e) {
    R.includes(e) || R.push(e), kn();
  }
  function dt(e) {
    let t = R.indexOf(e);
    t !== -1 && t > Ae && R.splice(t, 1);
  }
  function kn() {
    !Se && !Ee && (Ee = !0, queueMicrotask(zn));
  }
  function zn() {
    Ee = !1, Se = !0;
    for (let e = 0; e < R.length; e++)
      R[e](), Ae = e;
    R.length = 0, Ae = -1, Se = !1;
  }
  var k, j, z, _t, Oe = !0;
  function Hn(e) {
    Oe = !1, e(), Oe = !0;
  }
  function qn(e) {
    k = e.reactive, z = e.release, j = (t) => e.effect(t, { scheduler: (n) => {
      Oe ? Dn(n) : n();
    } }), _t = e.raw;
  }
  function pt(e) {
    j = e;
  }
  function Wn(e) {
    let t = () => {
    };
    return [(r) => {
      let i = j(r);
      return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
        e._x_effects.forEach((o) => o());
      }), e._x_effects.add(i), t = () => {
        i !== void 0 && (e._x_effects.delete(i), z(i));
      }, i;
    }, () => {
      t();
    }];
  }
  function ht(e, t) {
    let n = !0, r, i = j(() => {
      let o = e();
      JSON.stringify(o), n ? r = o : queueMicrotask(() => {
        t(o, r), r = o;
      }), n = !1;
    });
    return () => z(i);
  }
  function J(e, t, n = {}) {
    e.dispatchEvent(
      new CustomEvent(t, {
        detail: n,
        bubbles: !0,
        // Allows events to pass the shadow DOM barrier.
        composed: !0,
        cancelable: !0
      })
    );
  }
  function M(e, t) {
    if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
      Array.from(e.children).forEach((i) => M(i, t));
      return;
    }
    let n = !1;
    if (t(e, () => n = !0), n)
      return;
    let r = e.firstElementChild;
    for (; r; )
      M(r, t), r = r.nextElementSibling;
  }
  function E(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t);
  }
  var gt = !1;
  function Un() {
    gt && E("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), gt = !0, document.body || E("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), J(document, "alpine:init"), J(document, "alpine:initializing"), Pe(), Yn((t) => C(t, M)), Te((t) => Me(t)), Ot((t, n) => {
      Ke(t, n).forEach((r) => r());
    });
    let e = (t) => !oe(t.parentElement, !0);
    Array.from(document.querySelectorAll(vt().join(","))).filter(e).forEach((t) => {
      C(t);
    }), J(document, "alpine:initialized");
  }
  var Ce = [], xt = [];
  function yt() {
    return Ce.map((e) => e());
  }
  function vt() {
    return Ce.concat(xt).map((e) => e());
  }
  function bt(e) {
    Ce.push(e);
  }
  function mt(e) {
    xt.push(e);
  }
  function oe(e, t = !1) {
    return V(e, (n) => {
      if ((t ? vt() : yt()).some((i) => n.matches(i)))
        return !0;
    });
  }
  function V(e, t) {
    if (e) {
      if (t(e))
        return e;
      if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
        return V(e.parentElement, t);
    }
  }
  function Jn(e) {
    return yt().some((t) => e.matches(t));
  }
  var wt = [];
  function Vn(e) {
    wt.push(e);
  }
  function C(e, t = M, n = () => {
  }) {
    cr(() => {
      t(e, (r, i) => {
        n(r, i), wt.forEach((o) => o(r, i)), Ke(r, r.attributes).forEach((o) => o()), r._x_ignore && i();
      });
    });
  }
  function Me(e, t = M) {
    t(e, (n) => {
      Mt(n), Gn(n);
    });
  }
  var Et = [], St = [], At = [];
  function Yn(e) {
    At.push(e);
  }
  function Te(e, t) {
    typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, St.push(t));
  }
  function Ot(e) {
    Et.push(e);
  }
  function Ct(e, t, n) {
    e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
  }
  function Mt(e, t) {
    e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
      (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
    });
  }
  function Gn(e) {
    if (e._x_cleanups)
      for (; e._x_cleanups.length; )
        e._x_cleanups.pop()();
  }
  var Ie = new MutationObserver(je), $e = !1;
  function Pe() {
    Ie.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), $e = !0;
  }
  function Tt() {
    Xn(), Ie.disconnect(), $e = !1;
  }
  var Y = [];
  function Xn() {
    let e = Ie.takeRecords();
    Y.push(() => e.length > 0 && je(e));
    let t = Y.length;
    queueMicrotask(() => {
      if (Y.length === t)
        for (; Y.length > 0; )
          Y.shift()();
    });
  }
  function y(e) {
    if (!$e)
      return e();
    Tt();
    let t = e();
    return Pe(), t;
  }
  var Re = !1, se = [];
  function Zn() {
    Re = !0;
  }
  function Qn() {
    Re = !1, je(se), se = [];
  }
  function je(e) {
    if (Re) {
      se = se.concat(e);
      return;
    }
    let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    for (let o = 0; o < e.length; o++)
      if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].addedNodes.forEach((s) => s.nodeType === 1 && t.add(s)), e[o].removedNodes.forEach((s) => s.nodeType === 1 && n.add(s))), e[o].type === "attributes")) {
        let s = e[o].target, a = e[o].attributeName, u = e[o].oldValue, c = () => {
          r.has(s) || r.set(s, []), r.get(s).push({ name: a, value: s.getAttribute(a) });
        }, l = () => {
          i.has(s) || i.set(s, []), i.get(s).push(a);
        };
        s.hasAttribute(a) && u === null ? c() : s.hasAttribute(a) ? (l(), c()) : l();
      }
    i.forEach((o, s) => {
      Mt(s, o);
    }), r.forEach((o, s) => {
      Et.forEach((a) => a(s, o));
    });
    for (let o of n)
      t.has(o) || (St.forEach((s) => s(o)), Me(o));
    t.forEach((o) => {
      o._x_ignoreSelf = !0, o._x_ignore = !0;
    });
    for (let o of t)
      n.has(o) || o.isConnected && (delete o._x_ignoreSelf, delete o._x_ignore, At.forEach((s) => s(o)), o._x_ignore = !0, o._x_ignoreSelf = !0);
    t.forEach((o) => {
      delete o._x_ignoreSelf, delete o._x_ignore;
    }), t = null, n = null, r = null, i = null;
  }
  function It(e) {
    return X(H(e));
  }
  function G(e, t, n) {
    return e._x_dataStack = [t, ...H(n || e)], () => {
      e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
    };
  }
  function H(e) {
    return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? H(e.host) : e.parentNode ? H(e.parentNode) : [];
  }
  function X(e) {
    return new Proxy({ objects: e }, er);
  }
  var er = {
    ownKeys({ objects: e }) {
      return Array.from(
        new Set(e.flatMap((t) => Object.keys(t)))
      );
    },
    has({ objects: e }, t) {
      return t == Symbol.unscopables ? !1 : e.some(
        (n) => Object.prototype.hasOwnProperty.call(n, t) || Reflect.has(n, t)
      );
    },
    get({ objects: e }, t, n) {
      return t == "toJSON" ? tr : Reflect.get(
        e.find(
          (r) => Reflect.has(r, t)
        ) || {},
        t,
        n
      );
    },
    set({ objects: e }, t, n, r) {
      const i = e.find(
        (s) => Object.prototype.hasOwnProperty.call(s, t)
      ) || e[e.length - 1], o = Object.getOwnPropertyDescriptor(i, t);
      return o != null && o.set && (o != null && o.get) ? Reflect.set(i, t, n, r) : Reflect.set(i, t, n);
    }
  };
  function tr() {
    return Reflect.ownKeys(this).reduce((t, n) => (t[n] = Reflect.get(this, n), t), {});
  }
  function $t(e) {
    let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, i = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([o, { value: s, enumerable: a }]) => {
        if (a === !1 || s === void 0 || typeof s == "object" && s !== null && s.__v_skip)
          return;
        let u = i === "" ? o : `${i}.${o}`;
        typeof s == "object" && s !== null && s._x_interceptor ? r[o] = s.initialize(e, u, o) : t(s) && s !== r && !(s instanceof Element) && n(s, u);
      });
    };
    return n(e);
  }
  function Pt(e, t = () => {
  }) {
    let n = {
      initialValue: void 0,
      _x_interceptor: !0,
      initialize(r, i, o) {
        return e(this.initialValue, () => nr(r, i), (s) => Le(r, i, s), i, o);
      }
    };
    return t(n), (r) => {
      if (typeof r == "object" && r !== null && r._x_interceptor) {
        let i = n.initialize.bind(n);
        n.initialize = (o, s, a) => {
          let u = r.initialize(o, s, a);
          return n.initialValue = u, i(o, s, a);
        };
      } else
        n.initialValue = r;
      return n;
    };
  }
  function nr(e, t) {
    return t.split(".").reduce((n, r) => n[r], e);
  }
  function Le(e, t, n) {
    if (typeof t == "string" && (t = t.split(".")), t.length === 1)
      e[t[0]] = n;
    else {
      if (t.length === 0)
        throw error;
      return e[t[0]] || (e[t[0]] = {}), Le(e[t[0]], t.slice(1), n);
    }
  }
  var Rt = {};
  function S(e, t) {
    Rt[e] = t;
  }
  function Ne(e, t) {
    return Object.entries(Rt).forEach(([n, r]) => {
      let i = null;
      function o() {
        if (i)
          return i;
        {
          let [s, a] = Dt(t);
          return i = { interceptor: Pt, ...s }, Te(t, a), i;
        }
      }
      Object.defineProperty(e, `$${n}`, {
        get() {
          return r(t, o());
        },
        enumerable: !1
      });
    }), e;
  }
  function rr(e, t, n, ...r) {
    try {
      return n(...r);
    } catch (i) {
      Z(i, e, t);
    }
  }
  function Z(e, t, n = void 0) {
    e = Object.assign(
      e ?? { message: "No error message given." },
      { el: t, expression: n }
    ), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
      throw e;
    }, 0);
  }
  var ae = !0;
  function jt(e) {
    let t = ae;
    ae = !1;
    let n = e();
    return ae = t, n;
  }
  function L(e, t, n = {}) {
    let r;
    return m(e, t)((i) => r = i, n), r;
  }
  function m(...e) {
    return Lt(...e);
  }
  var Lt = Nt;
  function ir(e) {
    Lt = e;
  }
  function Nt(e, t) {
    let n = {};
    Ne(n, e);
    let r = [n, ...H(e)], i = typeof t == "function" ? or(r, t) : ar(r, t, e);
    return rr.bind(null, e, t, i);
  }
  function or(e, t) {
    return (n = () => {
    }, { scope: r = {}, params: i = [] } = {}) => {
      let o = t.apply(X([r, ...e]), i);
      ue(n, o);
    };
  }
  var Fe = {};
  function sr(e, t) {
    if (Fe[e])
      return Fe[e];
    let n = Object.getPrototypeOf(async function() {
    }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e, o = (() => {
      try {
        let s = new n(
          ["__self", "scope"],
          `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
        );
        return Object.defineProperty(s, "name", {
          value: `[Alpine] ${e}`
        }), s;
      } catch (s) {
        return Z(s, t, e), Promise.resolve();
      }
    })();
    return Fe[e] = o, o;
  }
  function ar(e, t, n) {
    let r = sr(t, n);
    return (i = () => {
    }, { scope: o = {}, params: s = [] } = {}) => {
      r.result = void 0, r.finished = !1;
      let a = X([o, ...e]);
      if (typeof r == "function") {
        let u = r(r, a).catch((c) => Z(c, n, t));
        r.finished ? (ue(i, r.result, a, s, n), r.result = void 0) : u.then((c) => {
          ue(i, c, a, s, n);
        }).catch((c) => Z(c, n, t)).finally(() => r.result = void 0);
      }
    };
  }
  function ue(e, t, n, r, i) {
    if (ae && typeof t == "function") {
      let o = t.apply(n, r);
      o instanceof Promise ? o.then((s) => ue(e, s, n, r)).catch((s) => Z(s, i, t)) : e(o);
    } else
      typeof t == "object" && t instanceof Promise ? t.then((o) => e(o)) : e(t);
  }
  var Be = "x-";
  function q(e = "") {
    return Be + e;
  }
  function ur(e) {
    Be = e;
  }
  var De = {};
  function x(e, t) {
    return De[e] = t, {
      before(n) {
        if (!De[n]) {
          console.warn(String.raw`Cannot find directive \`${n}\`. \`${e}\` will use the default order of execution`);
          return;
        }
        const r = N.indexOf(n);
        N.splice(r >= 0 ? r : N.indexOf("DEFAULT"), 0, e);
      }
    };
  }
  function Ke(e, t, n) {
    if (t = Array.from(t), e._x_virtualDirectives) {
      let o = Object.entries(e._x_virtualDirectives).map(([a, u]) => ({ name: a, value: u })), s = Ft(o);
      o = o.map((a) => s.find((u) => u.name === a.name) ? {
        name: `x-bind:${a.name}`,
        value: `"${a.value}"`
      } : a), t = t.concat(o);
    }
    let r = {};
    return t.map(zt((o, s) => r[o] = s)).filter(qt).map(fr(r, n)).sort(dr).map((o) => lr(e, o));
  }
  function Ft(e) {
    return Array.from(e).map(zt()).filter((t) => !qt(t));
  }
  var ke = !1, Q = /* @__PURE__ */ new Map(), Bt = Symbol();
  function cr(e) {
    ke = !0;
    let t = Symbol();
    Bt = t, Q.set(t, []);
    let n = () => {
      for (; Q.get(t).length; )
        Q.get(t).shift()();
      Q.delete(t);
    }, r = () => {
      ke = !1, n();
    };
    e(n), r();
  }
  function Dt(e) {
    let t = [], n = (a) => t.push(a), [r, i] = Wn(e);
    return t.push(i), [{
      Alpine: te,
      effect: r,
      cleanup: n,
      evaluateLater: m.bind(m, e),
      evaluate: L.bind(L, e)
    }, () => t.forEach((a) => a())];
  }
  function lr(e, t) {
    let n = () => {
    }, r = De[t.type] || n, [i, o] = Dt(e);
    Ct(e, t.original, o);
    let s = () => {
      e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), r = r.bind(r, e, t, i), ke ? Q.get(Bt).push(r) : r());
    };
    return s.runCleanups = o, s;
  }
  var Kt = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }), kt = (e) => e;
  function zt(e = () => {
  }) {
    return ({ name: t, value: n }) => {
      let { name: r, value: i } = Ht.reduce((o, s) => s(o), { name: t, value: n });
      return r !== t && e(r, t), { name: r, value: i };
    };
  }
  var Ht = [];
  function ze(e) {
    Ht.push(e);
  }
  function qt({ name: e }) {
    return Wt().test(e);
  }
  var Wt = () => new RegExp(`^${Be}([^:^.]+)\\b`);
  function fr(e, t) {
    return ({ name: n, value: r }) => {
      let i = n.match(Wt()), o = n.match(/:([a-zA-Z0-9\-_:]+)/), s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], a = t || e[n] || n;
      return {
        type: i ? i[1] : null,
        value: o ? o[1] : null,
        modifiers: s.map((u) => u.replace(".", "")),
        expression: r,
        original: a
      };
    };
  }
  var He = "DEFAULT", N = [
    "ignore",
    "ref",
    "data",
    "id",
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    He,
    "teleport"
  ];
  function dr(e, t) {
    let n = N.indexOf(e.type) === -1 ? He : e.type, r = N.indexOf(t.type) === -1 ? He : t.type;
    return N.indexOf(n) - N.indexOf(r);
  }
  var qe = [], We = !1;
  function Ue(e = () => {
  }) {
    return queueMicrotask(() => {
      We || setTimeout(() => {
        Je();
      });
    }), new Promise((t) => {
      qe.push(() => {
        e(), t();
      });
    });
  }
  function Je() {
    for (We = !1; qe.length; )
      qe.shift()();
  }
  function _r() {
    We = !0;
  }
  function Ve(e, t) {
    return Array.isArray(t) ? Ut(e, t.join(" ")) : typeof t == "object" && t !== null ? pr(e, t) : typeof t == "function" ? Ve(e, t()) : Ut(e, t);
  }
  function Ut(e, t) {
    let n = (i) => i.split(" ").filter((o) => !e.classList.contains(o)).filter(Boolean), r = (i) => (e.classList.add(...i), () => {
      e.classList.remove(...i);
    });
    return t = t === !0 ? t = "" : t || "", r(n(t));
  }
  function pr(e, t) {
    let n = (a) => a.split(" ").filter(Boolean), r = Object.entries(t).flatMap(([a, u]) => u ? n(a) : !1).filter(Boolean), i = Object.entries(t).flatMap(([a, u]) => u ? !1 : n(a)).filter(Boolean), o = [], s = [];
    return i.forEach((a) => {
      e.classList.contains(a) && (e.classList.remove(a), s.push(a));
    }), r.forEach((a) => {
      e.classList.contains(a) || (e.classList.add(a), o.push(a));
    }), () => {
      s.forEach((a) => e.classList.add(a)), o.forEach((a) => e.classList.remove(a));
    };
  }
  function ce(e, t) {
    return typeof t == "object" && t !== null ? hr(e, t) : gr(e, t);
  }
  function hr(e, t) {
    let n = {};
    return Object.entries(t).forEach(([r, i]) => {
      n[r] = e.style[r], r.startsWith("--") || (r = xr(r)), e.style.setProperty(r, i);
    }), setTimeout(() => {
      e.style.length === 0 && e.removeAttribute("style");
    }), () => {
      ce(e, n);
    };
  }
  function gr(e, t) {
    let n = e.getAttribute("style", t);
    return e.setAttribute("style", t), () => {
      e.setAttribute("style", n || "");
    };
  }
  function xr(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function Ye(e, t = () => {
  }) {
    let n = !1;
    return function() {
      n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments));
    };
  }
  x("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
    typeof r == "function" && (r = i(r)), r !== !1 && (!r || typeof r == "boolean" ? vr(e, n, t) : yr(e, r, t));
  });
  function yr(e, t, n) {
    Jt(e, Ve, ""), {
      enter: (i) => {
        e._x_transition.enter.during = i;
      },
      "enter-start": (i) => {
        e._x_transition.enter.start = i;
      },
      "enter-end": (i) => {
        e._x_transition.enter.end = i;
      },
      leave: (i) => {
        e._x_transition.leave.during = i;
      },
      "leave-start": (i) => {
        e._x_transition.leave.start = i;
      },
      "leave-end": (i) => {
        e._x_transition.leave.end = i;
      }
    }[n](t);
  }
  function vr(e, t, n) {
    Jt(e, ce);
    let r = !t.includes("in") && !t.includes("out") && !n, i = r || t.includes("in") || ["enter"].includes(n), o = r || t.includes("out") || ["leave"].includes(n);
    t.includes("in") && !r && (t = t.filter((h, g) => g < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((h, g) => g > t.indexOf("out")));
    let s = !t.includes("opacity") && !t.includes("scale"), a = s || t.includes("opacity"), u = s || t.includes("scale"), c = a ? 0 : 1, l = u ? ee(t, "scale", 95) / 100 : 1, d = ee(t, "delay", 0) / 1e3, _ = ee(t, "origin", "center"), v = "opacity, transform", P = ee(t, "duration", 150) / 1e3, we = ee(t, "duration", 75) / 1e3, f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    i && (e._x_transition.enter.during = {
      transformOrigin: _,
      transitionDelay: `${d}s`,
      transitionProperty: v,
      transitionDuration: `${P}s`,
      transitionTimingFunction: f
    }, e._x_transition.enter.start = {
      opacity: c,
      transform: `scale(${l})`
    }, e._x_transition.enter.end = {
      opacity: 1,
      transform: "scale(1)"
    }), o && (e._x_transition.leave.during = {
      transformOrigin: _,
      transitionDelay: `${d}s`,
      transitionProperty: v,
      transitionDuration: `${we}s`,
      transitionTimingFunction: f
    }, e._x_transition.leave.start = {
      opacity: 1,
      transform: "scale(1)"
    }, e._x_transition.leave.end = {
      opacity: c,
      transform: `scale(${l})`
    });
  }
  function Jt(e, t, n = {}) {
    e._x_transition || (e._x_transition = {
      enter: { during: n, start: n, end: n },
      leave: { during: n, start: n, end: n },
      in(r = () => {
      }, i = () => {
      }) {
        Ge(e, t, {
          during: this.enter.during,
          start: this.enter.start,
          end: this.enter.end
        }, r, i);
      },
      out(r = () => {
      }, i = () => {
      }) {
        Ge(e, t, {
          during: this.leave.during,
          start: this.leave.start,
          end: this.leave.end
        }, r, i);
      }
    });
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, n, r) {
    const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let o = () => i(n);
    if (t) {
      e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(n) : o() : e._x_transition ? e._x_transition.in(n) : o();
      return;
    }
    e._x_hidePromise = e._x_transition ? new Promise((s, a) => {
      e._x_transition.out(() => {
      }, () => s(r)), e._x_transitioning && e._x_transitioning.beforeCancel(() => a({ isFromCancelledTransition: !0 }));
    }) : Promise.resolve(r), queueMicrotask(() => {
      let s = Vt(e);
      s ? (s._x_hideChildren || (s._x_hideChildren = []), s._x_hideChildren.push(e)) : i(() => {
        let a = (u) => {
          let c = Promise.all([
            u._x_hidePromise,
            ...(u._x_hideChildren || []).map(a)
          ]).then(([l]) => l());
          return delete u._x_hidePromise, delete u._x_hideChildren, c;
        };
        a(e).catch((u) => {
          if (!u.isFromCancelledTransition)
            throw u;
        });
      });
    });
  };
  function Vt(e) {
    let t = e.parentNode;
    if (t)
      return t._x_hidePromise ? t : Vt(t);
  }
  function Ge(e, t, { during: n, start: r, end: i } = {}, o = () => {
  }, s = () => {
  }) {
    if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
      o(), s();
      return;
    }
    let a, u, c;
    br(e, {
      start() {
        a = t(e, r);
      },
      during() {
        u = t(e, n);
      },
      before: o,
      end() {
        a(), c = t(e, i);
      },
      after: s,
      cleanup() {
        u(), c();
      }
    });
  }
  function br(e, t) {
    let n, r, i, o = Ye(() => {
      y(() => {
        n = !0, r || t.before(), i || (t.end(), Je()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
      });
    });
    e._x_transitioning = {
      beforeCancels: [],
      beforeCancel(s) {
        this.beforeCancels.push(s);
      },
      cancel: Ye(function() {
        for (; this.beforeCancels.length; )
          this.beforeCancels.shift()();
        o();
      }),
      finish: o
    }, y(() => {
      t.start(), t.during();
    }), _r(), requestAnimationFrame(() => {
      if (n)
        return;
      let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), y(() => {
        t.before();
      }), r = !0, requestAnimationFrame(() => {
        n || (y(() => {
          t.end();
        }), Je(), setTimeout(e._x_transitioning.finish, s + a), i = !0);
      });
    });
  }
  function ee(e, t, n) {
    if (e.indexOf(t) === -1)
      return n;
    const r = e[e.indexOf(t) + 1];
    if (!r || t === "scale" && isNaN(r))
      return n;
    if (t === "duration" || t === "delay") {
      let i = r.match(/([0-9]+)ms/);
      if (i)
        return i[1];
    }
    return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [r, e[e.indexOf(t) + 2]].join(" ") : r;
  }
  var T = !1;
  function F(e, t = () => {
  }) {
    return (...n) => T ? t(...n) : e(...n);
  }
  function mr(e) {
    return (...t) => T && e(...t);
  }
  var Yt = [];
  function le(e) {
    Yt.push(e);
  }
  function wr(e, t) {
    Yt.forEach((n) => n(e, t)), T = !0, Gt(() => {
      C(t, (n, r) => {
        r(n, () => {
        });
      });
    }), T = !1;
  }
  var Xe = !1;
  function Er(e, t) {
    t._x_dataStack || (t._x_dataStack = e._x_dataStack), T = !0, Xe = !0, Gt(() => {
      Sr(t);
    }), T = !1, Xe = !1;
  }
  function Sr(e) {
    let t = !1;
    C(e, (r, i) => {
      M(r, (o, s) => {
        if (t && Jn(o))
          return s();
        t = !0, i(o, s);
      });
    });
  }
  function Gt(e) {
    let t = j;
    pt((n, r) => {
      let i = t(n);
      return z(i), () => {
      };
    }), e(), pt(t);
  }
  function Xt(e, t, n, r = []) {
    switch (e._x_bindings || (e._x_bindings = k({})), e._x_bindings[t] = n, t = r.includes("camel") ? Pr(t) : t, t) {
      case "value":
        Ar(e, n);
        break;
      case "style":
        Cr(e, n);
        break;
      case "class":
        Or(e, n);
        break;
      case "selected":
      case "checked":
        Mr(e, t, n);
        break;
      default:
        Zt(e, t, n);
        break;
    }
  }
  function Ar(e, t) {
    if (e.type === "radio")
      e.attributes.value === void 0 && (e.value = t), window.fromModel && (typeof t == "boolean" ? e.checked = fe(e.value) === t : e.checked = Qt(e.value, t));
    else if (e.type === "checkbox")
      Number.isInteger(t) ? e.value = t : !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => Qt(n, e.value)) : e.checked = !!t;
    else if (e.tagName === "SELECT")
      $r(e, t);
    else {
      if (e.value === t)
        return;
      e.value = t === void 0 ? "" : t;
    }
  }
  function Or(e, t) {
    e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = Ve(e, t);
  }
  function Cr(e, t) {
    e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = ce(e, t);
  }
  function Mr(e, t, n) {
    Zt(e, t, n), Ir(e, t, n);
  }
  function Zt(e, t, n) {
    [null, void 0, !1].includes(n) && Rr(t) ? e.removeAttribute(t) : (en(t) && (n = t), Tr(e, t, n));
  }
  function Tr(e, t, n) {
    e.getAttribute(t) != n && e.setAttribute(t, n);
  }
  function Ir(e, t, n) {
    e[t] !== n && (e[t] = n);
  }
  function $r(e, t) {
    const n = [].concat(t).map((r) => r + "");
    Array.from(e.options).forEach((r) => {
      r.selected = n.includes(r.value);
    });
  }
  function Pr(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
  }
  function Qt(e, t) {
    return e == t;
  }
  function fe(e) {
    return [1, "1", "true", "on", "yes", !0].includes(e) ? !0 : [0, "0", "false", "off", "no", !1].includes(e) ? !1 : e ? !!e : null;
  }
  function en(e) {
    return [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule"
    ].includes(e);
  }
  function Rr(e) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
  }
  function jr(e, t, n) {
    return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : tn(e, t, n);
  }
  function Lr(e, t, n, r = !0) {
    if (e._x_bindings && e._x_bindings[t] !== void 0)
      return e._x_bindings[t];
    if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
      let i = e._x_inlineBindings[t];
      return i.extract = r, jt(() => L(e, i.expression));
    }
    return tn(e, t, n);
  }
  function tn(e, t, n) {
    let r = e.getAttribute(t);
    return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : en(t) ? !![t, "true"].includes(r) : r;
  }
  function nn(e, t) {
    var n;
    return function() {
      var r = this, i = arguments, o = function() {
        n = null, e.apply(r, i);
      };
      clearTimeout(n), n = setTimeout(o, t);
    };
  }
  function rn(e, t) {
    let n;
    return function() {
      let r = this, i = arguments;
      n || (e.apply(r, i), n = !0, setTimeout(() => n = !1, t));
    };
  }
  function on({ get: e, set: t }, { get: n, set: r }) {
    let i = !0, o, s = j(() => {
      let a = e(), u = n();
      if (i)
        r(Ze(a)), i = !1;
      else {
        let c = JSON.stringify(a), l = JSON.stringify(u);
        c !== o ? r(Ze(a)) : c !== l && t(Ze(u));
      }
      o = JSON.stringify(e()), JSON.stringify(n());
    });
    return () => {
      z(s);
    };
  }
  function Ze(e) {
    return typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e;
  }
  function Nr(e) {
    (Array.isArray(e) ? e : [e]).forEach((n) => n(te));
  }
  var B = {}, sn = !1;
  function Fr(e, t) {
    if (sn || (B = k(B), sn = !0), t === void 0)
      return B[e];
    B[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && B[e].init(), $t(B[e]);
  }
  function Br() {
    return B;
  }
  var an = {};
  function Dr(e, t) {
    let n = typeof t != "function" ? () => t : t;
    return e instanceof Element ? un(e, n()) : (an[e] = n, () => {
    });
  }
  function Kr(e) {
    return Object.entries(an).forEach(([t, n]) => {
      Object.defineProperty(e, t, {
        get() {
          return (...r) => n(...r);
        }
      });
    }), e;
  }
  function un(e, t, n) {
    let r = [];
    for (; r.length; )
      r.pop()();
    let i = Object.entries(t).map(([s, a]) => ({ name: s, value: a })), o = Ft(i);
    return i = i.map((s) => o.find((a) => a.name === s.name) ? {
      name: `x-bind:${s.name}`,
      value: `"${s.value}"`
    } : s), Ke(e, i, n).map((s) => {
      r.push(s.runCleanups), s();
    }), () => {
      for (; r.length; )
        r.pop()();
    };
  }
  var cn = {};
  function kr(e, t) {
    cn[e] = t;
  }
  function zr(e, t) {
    return Object.entries(cn).forEach(([n, r]) => {
      Object.defineProperty(e, n, {
        get() {
          return (...i) => r.bind(t)(...i);
        },
        enumerable: !1
      });
    }), e;
  }
  var Hr = {
    get reactive() {
      return k;
    },
    get release() {
      return z;
    },
    get effect() {
      return j;
    },
    get raw() {
      return _t;
    },
    version: "3.13.7",
    flushAndStopDeferringMutations: Qn,
    dontAutoEvaluateFunctions: jt,
    disableEffectScheduling: Hn,
    startObservingMutations: Pe,
    stopObservingMutations: Tt,
    setReactivityEngine: qn,
    onAttributeRemoved: Ct,
    onAttributesAdded: Ot,
    closestDataStack: H,
    skipDuringClone: F,
    onlyDuringClone: mr,
    addRootSelector: bt,
    addInitSelector: mt,
    interceptClone: le,
    addScopeToNode: G,
    deferMutations: Zn,
    mapAttributes: ze,
    evaluateLater: m,
    interceptInit: Vn,
    setEvaluator: ir,
    mergeProxies: X,
    extractProp: Lr,
    findClosest: V,
    onElRemoved: Te,
    closestRoot: oe,
    destroyTree: Me,
    interceptor: Pt,
    // INTERNAL: not public API and is subject to change without major release.
    transition: Ge,
    // INTERNAL
    setStyles: ce,
    // INTERNAL
    mutateDom: y,
    directive: x,
    entangle: on,
    throttle: rn,
    debounce: nn,
    evaluate: L,
    initTree: C,
    nextTick: Ue,
    prefixed: q,
    prefix: ur,
    plugin: Nr,
    magic: S,
    store: Fr,
    start: Un,
    clone: Er,
    // INTERNAL
    cloneNode: wr,
    // INTERNAL
    bound: jr,
    $data: It,
    watch: ht,
    walk: M,
    data: kr,
    bind: Dr
  }, te = Hr;
  function qr(e, t) {
    const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
    for (let i = 0; i < r.length; i++)
      n[r[i]] = !0;
    return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
  }
  var Wr = Object.freeze({}), Ur = Object.prototype.hasOwnProperty, de = (e, t) => Ur.call(e, t), D = Array.isArray, ne = (e) => ln(e) === "[object Map]", Jr = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", _e = (e) => e !== null && typeof e == "object", Vr = Object.prototype.toString, ln = (e) => Vr.call(e), fn = (e) => ln(e).slice(8, -1), et = (e) => Jr(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Yr = (e) => {
    const t = /* @__PURE__ */ Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  }, Gr = Yr((e) => e.charAt(0).toUpperCase() + e.slice(1)), dn = (e, t) => e !== t && (e === e || t === t), tt = /* @__PURE__ */ new WeakMap(), re = [], O, K = Symbol("iterate"), nt = Symbol("Map key iterate");
  function Xr(e) {
    return e && e._isEffect === !0;
  }
  function Zr(e, t = Wr) {
    Xr(e) && (e = e.raw);
    const n = ti(e, t);
    return t.lazy || n(), n;
  }
  function Qr(e) {
    e.active && (_n(e), e.options.onStop && e.options.onStop(), e.active = !1);
  }
  var ei = 0;
  function ti(e, t) {
    const n = function() {
      if (!n.active)
        return e();
      if (!re.includes(n)) {
        _n(n);
        try {
          return ri(), re.push(n), O = n, e();
        } finally {
          re.pop(), pn(), O = re[re.length - 1];
        }
      }
    };
    return n.id = ei++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n;
  }
  function _n(e) {
    const { deps: t } = e;
    if (t.length) {
      for (let n = 0; n < t.length; n++)
        t[n].delete(e);
      t.length = 0;
    }
  }
  var W = !0, rt = [];
  function ni() {
    rt.push(W), W = !1;
  }
  function ri() {
    rt.push(W), W = !0;
  }
  function pn() {
    const e = rt.pop();
    W = e === void 0 ? !0 : e;
  }
  function A(e, t, n) {
    if (!W || O === void 0)
      return;
    let r = tt.get(e);
    r || tt.set(e, r = /* @__PURE__ */ new Map());
    let i = r.get(n);
    i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(O) || (i.add(O), O.deps.push(i), O.options.onTrack && O.options.onTrack({
      effect: O,
      target: e,
      type: t,
      key: n
    }));
  }
  function I(e, t, n, r, i, o) {
    const s = tt.get(e);
    if (!s)
      return;
    const a = /* @__PURE__ */ new Set(), u = (l) => {
      l && l.forEach((d) => {
        (d !== O || d.allowRecurse) && a.add(d);
      });
    };
    if (t === "clear")
      s.forEach(u);
    else if (n === "length" && D(e))
      s.forEach((l, d) => {
        (d === "length" || d >= r) && u(l);
      });
    else
      switch (n !== void 0 && u(s.get(n)), t) {
        case "add":
          D(e) ? et(n) && u(s.get("length")) : (u(s.get(K)), ne(e) && u(s.get(nt)));
          break;
        case "delete":
          D(e) || (u(s.get(K)), ne(e) && u(s.get(nt)));
          break;
        case "set":
          ne(e) && u(s.get(K));
          break;
      }
    const c = (l) => {
      l.options.onTrigger && l.options.onTrigger({
        effect: l,
        target: e,
        key: n,
        type: t,
        newValue: r,
        oldValue: i,
        oldTarget: o
      }), l.options.scheduler ? l.options.scheduler(l) : l();
    };
    a.forEach(c);
  }
  var ii = /* @__PURE__ */ qr("__proto__,__v_isRef,__isVue"), hn = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(Qe)), oi = /* @__PURE__ */ xn(), si = /* @__PURE__ */ xn(!0), gn = /* @__PURE__ */ ai();
  function ai() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function(...n) {
        const r = p(this);
        for (let o = 0, s = this.length; o < s; o++)
          A(r, "get", o + "");
        const i = r[t](...n);
        return i === -1 || i === !1 ? r[t](...n.map(p)) : i;
      };
    }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function(...n) {
        ni();
        const r = p(this)[t].apply(this, n);
        return pn(), r;
      };
    }), e;
  }
  function xn(e = !1, t = !1) {
    return function(r, i, o) {
      if (i === "__v_isReactive")
        return !e;
      if (i === "__v_isReadonly")
        return e;
      if (i === "__v_raw" && o === (e ? t ? Ei : An : t ? wi : Sn).get(r))
        return r;
      const s = D(r);
      if (!e && s && de(gn, i))
        return Reflect.get(gn, i, o);
      const a = Reflect.get(r, i, o);
      return (Qe(i) ? hn.has(i) : ii(i)) || (e || A(r, "get", i), t) ? a : ut(a) ? !s || !et(i) ? a.value : a : _e(a) ? e ? On(a) : at(a) : a;
    };
  }
  var ui = /* @__PURE__ */ ci();
  function ci(e = !1) {
    return function(n, r, i, o) {
      let s = n[r];
      if (!e && (i = p(i), s = p(s), !D(n) && ut(s) && !ut(i)))
        return s.value = i, !0;
      const a = D(n) && et(r) ? Number(r) < n.length : de(n, r), u = Reflect.set(n, r, i, o);
      return n === p(o) && (a ? dn(i, s) && I(n, "set", r, i, s) : I(n, "add", r, i)), u;
    };
  }
  function li(e, t) {
    const n = de(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
    return i && n && I(e, "delete", t, void 0, r), i;
  }
  function fi(e, t) {
    const n = Reflect.has(e, t);
    return (!Qe(t) || !hn.has(t)) && A(e, "has", t), n;
  }
  function di(e) {
    return A(e, "iterate", D(e) ? "length" : K), Reflect.ownKeys(e);
  }
  var _i = {
    get: oi,
    set: ui,
    deleteProperty: li,
    has: fi,
    ownKeys: di
  }, pi = {
    get: si,
    set(e, t) {
      return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
    },
    deleteProperty(e, t) {
      return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
    }
  }, it = (e) => _e(e) ? at(e) : e, ot = (e) => _e(e) ? On(e) : e, st = (e) => e, pe = (e) => Reflect.getPrototypeOf(e);
  function he(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const i = p(e), o = p(t);
    t !== o && !n && A(i, "get", t), !n && A(i, "get", o);
    const { has: s } = pe(i), a = r ? st : n ? ot : it;
    if (s.call(i, t))
      return a(e.get(t));
    if (s.call(i, o))
      return a(e.get(o));
    e !== i && e.get(t);
  }
  function ge(e, t = !1) {
    const n = this.__v_raw, r = p(n), i = p(e);
    return e !== i && !t && A(r, "has", e), !t && A(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
  }
  function xe(e, t = !1) {
    return e = e.__v_raw, !t && A(p(e), "iterate", K), Reflect.get(e, "size", e);
  }
  function yn(e) {
    e = p(e);
    const t = p(this);
    return pe(t).has.call(t, e) || (t.add(e), I(t, "add", e, e)), this;
  }
  function vn(e, t) {
    t = p(t);
    const n = p(this), { has: r, get: i } = pe(n);
    let o = r.call(n, e);
    o ? En(n, r, e) : (e = p(e), o = r.call(n, e));
    const s = i.call(n, e);
    return n.set(e, t), o ? dn(t, s) && I(n, "set", e, t, s) : I(n, "add", e, t), this;
  }
  function bn(e) {
    const t = p(this), { has: n, get: r } = pe(t);
    let i = n.call(t, e);
    i ? En(t, n, e) : (e = p(e), i = n.call(t, e));
    const o = r ? r.call(t, e) : void 0, s = t.delete(e);
    return i && I(t, "delete", e, void 0, o), s;
  }
  function mn() {
    const e = p(this), t = e.size !== 0, n = ne(e) ? new Map(e) : new Set(e), r = e.clear();
    return t && I(e, "clear", void 0, void 0, n), r;
  }
  function ye(e, t) {
    return function(r, i) {
      const o = this, s = o.__v_raw, a = p(s), u = t ? st : e ? ot : it;
      return !e && A(a, "iterate", K), s.forEach((c, l) => r.call(i, u(c), u(l), o));
    };
  }
  function ve(e, t, n) {
    return function(...r) {
      const i = this.__v_raw, o = p(i), s = ne(o), a = e === "entries" || e === Symbol.iterator && s, u = e === "keys" && s, c = i[e](...r), l = n ? st : t ? ot : it;
      return !t && A(o, "iterate", u ? nt : K), {
        // iterator protocol
        next() {
          const { value: d, done: _ } = c.next();
          return _ ? { value: d, done: _ } : {
            value: a ? [l(d[0]), l(d[1])] : l(d),
            done: _
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function $(e) {
    return function(...t) {
      {
        const n = t[0] ? `on key "${t[0]}" ` : "";
        console.warn(`${Gr(e)} operation ${n}failed: target is readonly.`, p(this));
      }
      return e === "delete" ? !1 : this;
    };
  }
  function hi() {
    const e = {
      get(o) {
        return he(this, o);
      },
      get size() {
        return xe(this);
      },
      has: ge,
      add: yn,
      set: vn,
      delete: bn,
      clear: mn,
      forEach: ye(!1, !1)
    }, t = {
      get(o) {
        return he(this, o, !1, !0);
      },
      get size() {
        return xe(this);
      },
      has: ge,
      add: yn,
      set: vn,
      delete: bn,
      clear: mn,
      forEach: ye(!1, !0)
    }, n = {
      get(o) {
        return he(this, o, !0);
      },
      get size() {
        return xe(this, !0);
      },
      has(o) {
        return ge.call(this, o, !0);
      },
      add: $(
        "add"
        /* ADD */
      ),
      set: $(
        "set"
        /* SET */
      ),
      delete: $(
        "delete"
        /* DELETE */
      ),
      clear: $(
        "clear"
        /* CLEAR */
      ),
      forEach: ye(!0, !1)
    }, r = {
      get(o) {
        return he(this, o, !0, !0);
      },
      get size() {
        return xe(this, !0);
      },
      has(o) {
        return ge.call(this, o, !0);
      },
      add: $(
        "add"
        /* ADD */
      ),
      set: $(
        "set"
        /* SET */
      ),
      delete: $(
        "delete"
        /* DELETE */
      ),
      clear: $(
        "clear"
        /* CLEAR */
      ),
      forEach: ye(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      e[o] = ve(o, !1, !1), n[o] = ve(o, !0, !1), t[o] = ve(o, !1, !0), r[o] = ve(o, !0, !0);
    }), [
      e,
      n,
      t,
      r
    ];
  }
  var [gi, xi, yi, vi] = /* @__PURE__ */ hi();
  function wn(e, t) {
    const n = t ? e ? vi : yi : e ? xi : gi;
    return (r, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(de(n, i) && i in r ? n : r, i, o);
  }
  var bi = {
    get: /* @__PURE__ */ wn(!1, !1)
  }, mi = {
    get: /* @__PURE__ */ wn(!0, !1)
  };
  function En(e, t, n) {
    const r = p(n);
    if (r !== n && t.call(e, r)) {
      const i = fn(e);
      console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var Sn = /* @__PURE__ */ new WeakMap(), wi = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), Ei = /* @__PURE__ */ new WeakMap();
  function Si(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function Ai(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Si(fn(e));
  }
  function at(e) {
    return e && e.__v_isReadonly ? e : Cn(e, !1, _i, bi, Sn);
  }
  function On(e) {
    return Cn(e, !0, pi, mi, An);
  }
  function Cn(e, t, n, r, i) {
    if (!_e(e))
      return console.warn(`value cannot be made reactive: ${String(e)}`), e;
    if (e.__v_raw && !(t && e.__v_isReactive))
      return e;
    const o = i.get(e);
    if (o)
      return o;
    const s = Ai(e);
    if (s === 0)
      return e;
    const a = new Proxy(e, s === 2 ? r : n);
    return i.set(e, a), a;
  }
  function p(e) {
    return e && p(e.__v_raw) || e;
  }
  function ut(e) {
    return !!(e && e.__v_isRef === !0);
  }
  S("nextTick", () => Ue), S("dispatch", (e) => J.bind(J, e)), S("watch", (e, { evaluateLater: t, cleanup: n }) => (r, i) => {
    let o = t(r), a = ht(() => {
      let u;
      return o((c) => u = c), u;
    }, i);
    n(a);
  }), S("store", Br), S("data", (e) => It(e)), S("root", (e) => oe(e)), S("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = X(Oi(e))), e._x_refs_proxy));
  function Oi(e) {
    let t = [];
    return V(e, (n) => {
      n._x_refs && t.push(n._x_refs);
    }), t;
  }
  var ct = {};
  function Mn(e) {
    return ct[e] || (ct[e] = 0), ++ct[e];
  }
  function Ci(e, t) {
    return V(e, (n) => {
      if (n._x_ids && n._x_ids[t])
        return !0;
    });
  }
  function Mi(e, t) {
    e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Mn(t));
  }
  S("id", (e, { cleanup: t }) => (n, r = null) => {
    let i = `${n}${r ? `-${r}` : ""}`;
    return Ti(e, i, t, () => {
      let o = Ci(e, n), s = o ? o._x_ids[n] : Mn(n);
      return r ? `${n}-${s}-${r}` : `${n}-${s}`;
    });
  }), le((e, t) => {
    e._x_id && (t._x_id = e._x_id);
  });
  function Ti(e, t, n, r) {
    if (e._x_id || (e._x_id = {}), e._x_id[t])
      return e._x_id[t];
    let i = r();
    return e._x_id[t] = i, n(() => {
      delete e._x_id[t];
    }), i;
  }
  S("el", (e) => e), Tn("Focus", "focus", "focus"), Tn("Persist", "persist", "persist");
  function Tn(e, t, n) {
    S(t, (r) => E(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
  }
  x("modelable", (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
    let o = r(t), s = () => {
      let l;
      return o((d) => l = d), l;
    }, a = r(`${t} = __placeholder`), u = (l) => a(() => {
    }, { scope: { __placeholder: l } }), c = s();
    u(c), queueMicrotask(() => {
      if (!e._x_model)
        return;
      e._x_removeModelListeners.default();
      let l = e._x_model.get, d = e._x_model.set, _ = on(
        {
          get() {
            return l();
          },
          set(v) {
            d(v);
          }
        },
        {
          get() {
            return s();
          },
          set(v) {
            u(v);
          }
        }
      );
      i(_);
    });
  }), x("teleport", (e, { modifiers: t, expression: n }, { cleanup: r }) => {
    e.tagName.toLowerCase() !== "template" && E("x-teleport can only be used on a <template> tag", e);
    let i = In(n), o = e.content.cloneNode(!0).firstElementChild;
    e._x_teleport = o, o._x_teleportBack = e, e.setAttribute("data-teleport-template", !0), o.setAttribute("data-teleport-target", !0), e._x_forwardEvents && e._x_forwardEvents.forEach((a) => {
      o.addEventListener(a, (u) => {
        u.stopPropagation(), e.dispatchEvent(new u.constructor(u.type, u));
      });
    }), G(o, {}, e);
    let s = (a, u, c) => {
      c.includes("prepend") ? u.parentNode.insertBefore(a, u) : c.includes("append") ? u.parentNode.insertBefore(a, u.nextSibling) : u.appendChild(a);
    };
    y(() => {
      s(o, i, t), C(o), o._x_ignore = !0;
    }), e._x_teleportPutBack = () => {
      let a = In(n);
      y(() => {
        s(e._x_teleport, a, t);
      });
    }, r(() => o.remove());
  });
  var Ii = document.createElement("div");
  function In(e) {
    let t = F(() => document.querySelector(e), () => Ii)();
    return t || E(`Cannot find x-teleport element for selector: "${e}"`), t;
  }
  var $n = () => {
  };
  $n.inline = (e, { modifiers: t }, { cleanup: n }) => {
    t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n(() => {
      t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
    });
  }, x("ignore", $n), x("effect", F((e, { expression: t }, { effect: n }) => {
    n(m(e, t));
  }));
  function lt(e, t, n, r) {
    let i = e, o = (u) => r(u), s = {}, a = (u, c) => (l) => c(u, l);
    if (n.includes("dot") && (t = $i(t)), n.includes("camel") && (t = Pi(t)), n.includes("passive") && (s.passive = !0), n.includes("capture") && (s.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("debounce")) {
      let u = n[n.indexOf("debounce") + 1] || "invalid-wait", c = be(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
      o = nn(o, c);
    }
    if (n.includes("throttle")) {
      let u = n[n.indexOf("throttle") + 1] || "invalid-wait", c = be(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
      o = rn(o, c);
    }
    return n.includes("prevent") && (o = a(o, (u, c) => {
      c.preventDefault(), u(c);
    })), n.includes("stop") && (o = a(o, (u, c) => {
      c.stopPropagation(), u(c);
    })), n.includes("self") && (o = a(o, (u, c) => {
      c.target === e && u(c);
    })), (n.includes("away") || n.includes("outside")) && (i = document, o = a(o, (u, c) => {
      e.contains(c.target) || c.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && u(c));
    })), n.includes("once") && (o = a(o, (u, c) => {
      u(c), i.removeEventListener(t, o, s);
    })), o = a(o, (u, c) => {
      ji(t) && Li(c, n) || u(c);
    }), i.addEventListener(t, o, s), () => {
      i.removeEventListener(t, o, s);
    };
  }
  function $i(e) {
    return e.replace(/-/g, ".");
  }
  function Pi(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
  }
  function be(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  function Ri(e) {
    return [" ", "_"].includes(
      e
    ) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function ji(e) {
    return ["keydown", "keyup"].includes(e);
  }
  function Li(e, t) {
    let n = t.filter((o) => !["window", "document", "prevent", "stop", "once", "capture"].includes(o));
    if (n.includes("debounce")) {
      let o = n.indexOf("debounce");
      n.splice(o, be((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (n.includes("throttle")) {
      let o = n.indexOf("throttle");
      n.splice(o, be((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (n.length === 0 || n.length === 1 && Pn(e.key).includes(n[0]))
      return !1;
    const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) => n.includes(o));
    return n = n.filter((o) => !i.includes(o)), !(i.length > 0 && i.filter((s) => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])).length === i.length && Pn(e.key).includes(n[0]));
  }
  function Pn(e) {
    if (!e)
      return [];
    e = Ri(e);
    let t = {
      ctrl: "control",
      slash: "/",
      space: " ",
      spacebar: " ",
      cmd: "meta",
      esc: "escape",
      up: "arrow-up",
      down: "arrow-down",
      left: "arrow-left",
      right: "arrow-right",
      period: ".",
      equal: "=",
      minus: "-",
      underscore: "_"
    };
    return t[e] = e, Object.keys(t).map((n) => {
      if (t[n] === e)
        return n;
    }).filter((n) => n);
  }
  x("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
    let o = e;
    t.includes("parent") && (o = e.parentNode);
    let s = m(o, n), a;
    typeof n == "string" ? a = m(o, `${n} = __placeholder`) : typeof n == "function" && typeof n() == "string" ? a = m(o, `${n()} = __placeholder`) : a = () => {
    };
    let u = () => {
      let _;
      return s((v) => _ = v), Rn(_) ? _.get() : _;
    }, c = (_) => {
      let v;
      s((P) => v = P), Rn(v) ? v.set(_) : a(() => {
      }, {
        scope: { __placeholder: _ }
      });
    };
    typeof n == "string" && e.type === "radio" && y(() => {
      e.hasAttribute("name") || e.setAttribute("name", n);
    });
    var l = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
    let d = T ? () => {
    } : lt(e, l, t, (_) => {
      c(Ni(e, t, _, u()));
    });
    if (t.includes("fill") && ([void 0, null, ""].includes(u()) || e.type === "checkbox" && Array.isArray(u())) && e.dispatchEvent(new Event(l, {})), e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = d, i(() => e._x_removeModelListeners.default()), e.form) {
      let _ = lt(e.form, "reset", [], (v) => {
        Ue(() => e._x_model && e._x_model.set(e.value));
      });
      i(() => _());
    }
    e._x_model = {
      get() {
        return u();
      },
      set(_) {
        c(_);
      }
    }, e._x_forceModelUpdate = (_) => {
      _ === void 0 && typeof n == "string" && n.match(/\./) && (_ = ""), window.fromModel = !0, y(() => Xt(e, "value", _)), delete window.fromModel;
    }, r(() => {
      let _ = u();
      t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(_);
    });
  });
  function Ni(e, t, n, r) {
    return y(() => {
      if (n instanceof CustomEvent && n.detail !== void 0)
        return n.detail !== null && n.detail !== void 0 ? n.detail : n.target.value;
      if (e.type === "checkbox")
        if (Array.isArray(r)) {
          let i = null;
          return t.includes("number") ? i = ft(n.target.value) : t.includes("boolean") ? i = fe(n.target.value) : i = n.target.value, n.target.checked ? r.concat([i]) : r.filter((o) => !Fi(o, i));
        } else
          return n.target.checked;
      else
        return e.tagName.toLowerCase() === "select" && e.multiple ? t.includes("number") ? Array.from(n.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return ft(o);
        }) : t.includes("boolean") ? Array.from(n.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return fe(o);
        }) : Array.from(n.target.selectedOptions).map((i) => i.value || i.text) : t.includes("number") ? ft(n.target.value) : t.includes("boolean") ? fe(n.target.value) : t.includes("trim") ? n.target.value.trim() : n.target.value;
    });
  }
  function ft(e) {
    let t = e ? parseFloat(e) : null;
    return Bi(t) ? t : e;
  }
  function Fi(e, t) {
    return e == t;
  }
  function Bi(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  function Rn(e) {
    return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function";
  }
  x("cloak", (e) => queueMicrotask(() => y(() => e.removeAttribute(q("cloak"))))), mt(() => `[${q("init")}]`), x("init", F((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1))), x("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
    let i = r(t);
    n(() => {
      i((o) => {
        y(() => {
          e.textContent = o;
        });
      });
    });
  }), x("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
    let i = r(t);
    n(() => {
      i((o) => {
        y(() => {
          e.innerHTML = o, e._x_ignoreSelf = !0, C(e), delete e._x_ignoreSelf;
        });
      });
    });
  }), ze(Kt(":", kt(q("bind:"))));
  var jn = (e, { value: t, modifiers: n, expression: r, original: i }, { effect: o }) => {
    if (!t) {
      let a = {};
      Kr(a), m(e, r)((c) => {
        un(e, c, i);
      }, { scope: a });
      return;
    }
    if (t === "key")
      return Di(e, r);
    if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract)
      return;
    let s = m(e, r);
    o(() => s((a) => {
      a === void 0 && typeof r == "string" && r.match(/\./) && (a = ""), y(() => Xt(e, t, a, n));
    }));
  };
  jn.inline = (e, { value: t, modifiers: n, expression: r }) => {
    t && (e._x_inlineBindings || (e._x_inlineBindings = {}), e._x_inlineBindings[t] = { expression: r, extract: !1 });
  }, x("bind", jn);
  function Di(e, t) {
    e._x_keyExpression = t;
  }
  bt(() => `[${q("data")}]`), x("data", (e, { expression: t }, { cleanup: n }) => {
    if (Ki(e))
      return;
    t = t === "" ? "{}" : t;
    let r = {};
    Ne(r, e);
    let i = {};
    zr(i, r);
    let o = L(e, t, { scope: i });
    (o === void 0 || o === !0) && (o = {}), Ne(o, e);
    let s = k(o);
    $t(s);
    let a = G(e, s);
    s.init && L(e, s.init), n(() => {
      s.destroy && L(e, s.destroy), a();
    });
  }), le((e, t) => {
    e._x_dataStack && (t._x_dataStack = e._x_dataStack, t.setAttribute("data-has-alpine-state", !0));
  });
  function Ki(e) {
    return T ? Xe ? !0 : e.hasAttribute("data-has-alpine-state") : !1;
  }
  x("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
    let i = m(e, n);
    e._x_doHide || (e._x_doHide = () => {
      y(() => {
        e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
      });
    }), e._x_doShow || (e._x_doShow = () => {
      y(() => {
        e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
      });
    });
    let o = () => {
      e._x_doHide(), e._x_isShown = !1;
    }, s = () => {
      e._x_doShow(), e._x_isShown = !0;
    }, a = () => setTimeout(s), u = Ye(
      (d) => d ? s() : o(),
      (d) => {
        typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, d, s, o) : d ? a() : o();
      }
    ), c, l = !0;
    r(() => i((d) => {
      !l && d === c || (t.includes("immediate") && (d ? a() : o()), u(d), c = d, l = !1);
    }));
  }), x("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
    let i = zi(t), o = m(e, i.items), s = m(
      e,
      // the x-bind:key expression is stored for our use instead of evaluated.
      e._x_keyExpression || "index"
    );
    e._x_prevKeys = [], e._x_lookup = {}, n(() => ki(e, i, o, s)), r(() => {
      Object.values(e._x_lookup).forEach((a) => a.remove()), delete e._x_prevKeys, delete e._x_lookup;
    });
  });
  function ki(e, t, n, r) {
    let i = (s) => typeof s == "object" && !Array.isArray(s), o = e;
    n((s) => {
      Hi(s) && s >= 0 && (s = Array.from(Array(s).keys(), (f) => f + 1)), s === void 0 && (s = []);
      let a = e._x_lookup, u = e._x_prevKeys, c = [], l = [];
      if (i(s))
        s = Object.entries(s).map(([f, h]) => {
          let g = Ln(t, h, f, s);
          r((b) => {
            l.includes(b) && E("Duplicate key on x-for", e), l.push(b);
          }, { scope: { index: f, ...g } }), c.push(g);
        });
      else
        for (let f = 0; f < s.length; f++) {
          let h = Ln(t, s[f], f, s);
          r((g) => {
            l.includes(g) && E("Duplicate key on x-for", e), l.push(g);
          }, { scope: { index: f, ...h } }), c.push(h);
        }
      let d = [], _ = [], v = [], P = [];
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        l.indexOf(h) === -1 && v.push(h);
      }
      u = u.filter((f) => !v.includes(f));
      let we = "template";
      for (let f = 0; f < l.length; f++) {
        let h = l[f], g = u.indexOf(h);
        if (g === -1)
          u.splice(f, 0, h), d.push([we, f]);
        else if (g !== f) {
          let b = u.splice(f, 1)[0], w = u.splice(g - 1, 1)[0];
          u.splice(f, 0, w), u.splice(g, 0, b), _.push([b, w]);
        } else
          P.push(h);
        we = h;
      }
      for (let f = 0; f < v.length; f++) {
        let h = v[f];
        a[h]._x_effects && a[h]._x_effects.forEach(dt), a[h].remove(), a[h] = null, delete a[h];
      }
      for (let f = 0; f < _.length; f++) {
        let [h, g] = _[f], b = a[h], w = a[g], U = document.createElement("div");
        y(() => {
          w || E('x-for ":key" is undefined or invalid', o, g, a), w.after(U), b.after(w), w._x_currentIfEl && w.after(w._x_currentIfEl), U.before(b), b._x_currentIfEl && b.after(b._x_currentIfEl), U.remove();
        }), w._x_refreshXForScope(c[l.indexOf(g)]);
      }
      for (let f = 0; f < d.length; f++) {
        let [h, g] = d[f], b = h === "template" ? o : a[h];
        b._x_currentIfEl && (b = b._x_currentIfEl);
        let w = c[g], U = l[g], ie = document.importNode(o.content, !0).firstElementChild, Bn = k(w);
        G(ie, Bn, o), ie._x_refreshXForScope = (qi) => {
          Object.entries(qi).forEach(([Wi, Ui]) => {
            Bn[Wi] = Ui;
          });
        }, y(() => {
          b.after(ie), F(() => C(ie))();
        }), typeof U == "object" && E("x-for key cannot be an object, it must be a string or an integer", o), a[U] = ie;
      }
      for (let f = 0; f < P.length; f++)
        a[P[f]]._x_refreshXForScope(c[l.indexOf(P[f])]);
      o._x_prevKeys = l;
    });
  }
  function zi(e) {
    let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(r);
    if (!i)
      return;
    let o = {};
    o.items = i[2].trim();
    let s = i[1].replace(n, "").trim(), a = s.match(t);
    return a ? (o.item = s.replace(t, "").trim(), o.index = a[1].trim(), a[2] && (o.collection = a[2].trim())) : o.item = s, o;
  }
  function Ln(e, t, n, r) {
    let i = {};
    return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((s) => s.trim()).forEach((s, a) => {
      i[s] = t[a];
    }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((s) => s.trim()).forEach((s) => {
      i[s] = t[s];
    }) : i[e.item] = t, e.index && (i[e.index] = n), e.collection && (i[e.collection] = r), i;
  }
  function Hi(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  function Nn() {
  }
  Nn.inline = (e, { expression: t }, { cleanup: n }) => {
    let r = oe(e);
    r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
  }, x("ref", Nn), x("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
    e.tagName.toLowerCase() !== "template" && E("x-if can only be used on a <template> tag", e);
    let i = m(e, t), o = () => {
      if (e._x_currentIfEl)
        return e._x_currentIfEl;
      let a = e.content.cloneNode(!0).firstElementChild;
      return G(a, {}, e), y(() => {
        e.after(a), F(() => C(a))();
      }), e._x_currentIfEl = a, e._x_undoIf = () => {
        M(a, (u) => {
          u._x_effects && u._x_effects.forEach(dt);
        }), a.remove(), delete e._x_currentIfEl;
      }, a;
    }, s = () => {
      e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
    };
    n(() => i((a) => {
      a ? o() : s();
    })), r(() => e._x_undoIf && e._x_undoIf());
  }), x("id", (e, { expression: t }, { evaluate: n }) => {
    n(t).forEach((i) => Mi(e, i));
  }), le((e, t) => {
    e._x_ids && (t._x_ids = e._x_ids);
  }), ze(Kt("@", kt(q("on:")))), x("on", F((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
    let o = r ? m(e, r) : () => {
    };
    e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
    let s = lt(e, t, n, (a) => {
      o(() => {
      }, { scope: { $event: a }, params: [a] });
    });
    i(() => s());
  })), me("Collapse", "collapse", "collapse"), me("Intersect", "intersect", "intersect"), me("Focus", "trap", "focus"), me("Mask", "mask", "mask");
  function me(e, t, n) {
    x(t, (r) => E(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
  }
  te.setEvaluator(Nt), te.setReactivityEngine({ reactive: at, effect: Zr, release: Qr, raw: p });
  var Fn = te;
  window.Alpine = Fn, queueMicrotask(() => {
    Fn.start();
  });
})();
