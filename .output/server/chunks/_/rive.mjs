function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
      if (k !== 'default' && !(k in n)) {
        const d = Object.getOwnPropertyDescriptor(e, k);
        if (d) {
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      }
    } }
  }
  return Object.freeze(n);
}

var rive$2 = {exports: {}};

var rive = rive$2.exports;

(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory();
	})(rive, () => {
	return /******/ (() => { // webpackBootstrap
	/******/ 	var __webpack_modules__ = ([
	/* 0 */,
	/* 1 */
	/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

	__webpack_require__.r(__webpack_exports__);
	/* harmony export */ __webpack_require__.d(__webpack_exports__, {
	/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
	/* harmony export */ });

	var Rive = (() => {
	  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
	  
	  return (
	function(moduleArg = {}) {

	var l = moduleArg, aa, ba;
	l.ready = new Promise((a, b) => {
	  aa = a;
	  ba = b;
	});
	function ca() {
	  function a(g) {
	    const k = d;
	    c = b = 0;
	    d = new Map();
	    k.forEach(p => {
	      try {
	        p(g);
	      } catch (n) {
	        console.error(n);
	      }
	    });
	    this.kb();
	    e && e.Mb();
	  }
	  let b = 0, c = 0, d = new Map(), e = null, f = null;
	  this.requestAnimationFrame = function(g) {
	    b || (b = requestAnimationFrame(a.bind(this)));
	    const k = ++c;
	    d.set(k, g);
	    return k;
	  };
	  this.cancelAnimationFrame = function(g) {
	    d.delete(g);
	    b && 0 == d.size && (cancelAnimationFrame(b), b = 0);
	  };
	  this.Kb = function(g) {
	    f && (document.body.remove(f), f = null);
	    g || (f = document.createElement("div"), f.style.backgroundColor = "black", f.style.position = "fixed", f.style.right = 0, f.style.top = 0, f.style.color = "white", f.style.padding = "4px", f.innerHTML = "RIVE FPS", g = function(k) {
	      f.innerHTML = "RIVE FPS " + k.toFixed(1);
	    }, document.body.appendChild(f));
	    e = new function() {
	      let k = 0, p = 0;
	      this.Mb = function() {
	        var n = performance.now();
	        p ? (++k, n -= p, 1000 < n && (g(1000 * k / n), k = p = 0)) : (p = n, k = 0);
	      };
	    }();
	  };
	  this.kb = function() {
	  };
	}
	function da() {
	  console.assert(true);
	  const a = new Map();
	  let b = -Infinity;
	  this.push = function(c) {
	    c = c + 255 >> 8;
	    a.has(c) && clearTimeout(a.get(c));
	    a.set(c, setTimeout(function() {
	      a.delete(c);
	      0 == a.length ? b = -Infinity : c == b && (b = Math.max(...a.keys()), console.assert(b < c));
	    }, 1000));
	    b = Math.max(c, b);
	    return b << 8;
	  };
	}
	const ea = l.onRuntimeInitialized;
	l.onRuntimeInitialized = function() {
	  ea && ea();
	  let a = l.decodeAudio;
	  l.decodeAudio = function(e, f) {
	    e = a(e);
	    f(e);
	  };
	  let b = l.decodeFont;
	  l.decodeFont = function(e, f) {
	    e = b(e);
	    f(e);
	  };
	  const c = l.FileAssetLoader;
	  l.ptrToAsset = e => {
	    let f = l.ptrToFileAsset(e);
	    return f.isImage ? l.ptrToImageAsset(e) : f.isFont ? l.ptrToFontAsset(e) : f.isAudio ? l.ptrToAudioAsset(e) : f;
	  };
	  l.CustomFileAssetLoader = c.extend("CustomFileAssetLoader", {__construct:function({loadContents:e}) {
	    this.__parent.__construct.call(this);
	    this.Bb = e;
	  }, loadContents:function(e, f) {
	    e = l.ptrToAsset(e);
	    return this.Bb(e, f);
	  },});
	  l.CDNFileAssetLoader = c.extend("CDNFileAssetLoader", {__construct:function() {
	    this.__parent.__construct.call(this);
	  }, loadContents:function(e) {
	    let f = l.ptrToAsset(e);
	    e = f.cdnUuid;
	    if ("" === e) {
	      return false;
	    }
	    (function(g, k) {
	      var p = new XMLHttpRequest();
	      p.responseType = "arraybuffer";
	      p.onreadystatechange = function() {
	        4 == p.readyState && 200 == p.status && k(p);
	      };
	      p.open("GET", g, true);
	      p.send(null);
	    })(f.cdnBaseUrl + "/" + e, g => {
	      f.decode(new Uint8Array(g.response));
	    });
	    return true;
	  },});
	  l.FallbackFileAssetLoader = c.extend("FallbackFileAssetLoader", {__construct:function() {
	    this.__parent.__construct.call(this);
	    this.fb = [];
	  }, addLoader:function(e) {
	    this.fb.push(e);
	  }, loadContents:function(e, f) {
	    for (let g of this.fb) {
	      if (g.loadContents(e, f)) {
	        return true;
	      }
	    }
	    return false;
	  },});
	  let d = l.computeAlignment;
	  l.computeAlignment = function(e, f, g, k, p = 1.0) {
	    return d.call(this, e, f, g, k, p);
	  };
	};
	const fa = l.onRuntimeInitialized;
	l.onRuntimeInitialized = function() {
	  function a(r) {
	    this.F = r;
	    this.yb = r.getContext("2d");
	    this.Db = e;
	    this.R = [];
	    this.ja = 0;
	    this.clear = function() {
	      console.assert(0 == this.ja);
	      this.R = [];
	      f.delete(this);
	    };
	    this.save = function() {
	      ++this.ja;
	      this.R.push(e.save.bind(e));
	    };
	    this.restore = function() {
	      0 < this.ja && (this.R.push(e.restore.bind(e)), --this.ja);
	    };
	    this.transform = function(u) {
	      this.R.push(e.transform.bind(e, u));
	    };
	    this.align = function(u, z, B, C, O = 1.0) {
	      this.R.push(e.align.bind(e, u, z, B, C, O));
	    };
	    this.flush = function() {
	      console.assert(0 == this.ja);
	      f.add(this);
	      d && c();
	    };
	  }
	  function b(r) {
	    var u = {alpha:1, depth:0, stencil:8, antialias:0, premultipliedAlpha:1, preserveDrawingBuffer:0, powerPreference:"high-performance", failIfMajorPerformanceCaveat:0, enableExtensionsByDefault:1, explicitSwapControl:0, renderViaOffscreenBackBuffer:0,}, z = r.getContext("webgl2", u);
	    z || (z = r.getContext("webgl", u));
	    var B = z, C = ha(ja), O = {handle:C, attributes:u, version:u.Dc, Ta:B};
	    B.canvas && (B.canvas.pc = O);
	    ja[C] = O;
	    ("undefined" == typeof u.Jb || u.Jb) && ka(O);
	    la(C);
	    u = g(r.width, r.height);
	    u.Ab = C;
	    u.F = r;
	    u.Va = r.width;
	    u.Ua = r.height;
	    u.zb = z;
	    return u;
	  }
	  function c() {
	    if (e) {
	      var r = e.Cb, u = 0, z = 0, B = 0, C = Array(f.size), O = 0;
	      for (var M of f) {
	        M.da = Math.min(M.F.width, r), M.ca = Math.min(M.F.height, r), M.Ja = M.ca * M.da, u = Math.max(u, M.da), z = Math.max(z, M.ca), B += M.Ja, C[O++] = M;
	      }
	      f.clear();
	      if (!(0 >= B)) {
	        u = 1 << (0 >= u ? 0 : 32 - Math.clz32(u - 1));
	        for (z = 1 << (0 >= z ? 0 : 32 - Math.clz32(z - 1)); z * u < B;) {
	          u <= z ? u *= 2 : z *= 2;
	        }
	        u = Math.min(u, r);
	        u = Math.min(z, r);
	        C.sort((ia, Gb) => Gb.Ja - ia.Ja);
	        B = new l.DynamicRectanizer(r);
	        for (M = 0; M < C.length;) {
	          B.reset(u, z);
	          for (O = M; O < C.length; ++O) {
	            var P = C[O], J = B.addRect(P.da, P.ca);
	            if (0 > J) {
	              console.assert(O > M);
	              break;
	            }
	            P.pa = J & 65535;
	            P.qa = J >> 16;
	          }
	          P = p.push(B.drawWidth());
	          J = n.push(B.drawHeight());
	          console.assert(P >= B.drawWidth());
	          console.assert(J >= B.drawHeight());
	          console.assert(P <= r);
	          console.assert(J <= r);
	          e.F.width != P && (e.F.width = P);
	          e.F.height != J && (e.F.height = J);
	          e.clear();
	          for (P = M; P < O; ++P) {
	            J = C[P];
	            e.saveClipRect(J.pa, J.qa, J.pa + J.da, J.qa + J.ca);
	            let ia = new l.Mat2D();
	            ia.xx = J.da / J.F.width;
	            ia.yy = J.ca / J.F.height;
	            ia.xy = ia.yx = 0;
	            ia.tx = J.pa;
	            ia.ty = J.qa;
	            e.transform(ia);
	            for (const Gb of J.R) {
	              Gb();
	            }
	            e.restoreClipRect();
	            J.R = [];
	          }
	          for (e.flush(); M < O; ++M) {
	            P = C[M], J = P.yb, J.globalCompositeOperation = "copy", J.drawImage(e.F, P.pa, P.qa, P.da, P.ca, 0, 0, P.F.width, P.F.height);
	          }
	          M = O;
	        }
	      }
	    }
	  }
	  fa && fa();
	  const d = navigator.userAgent.match(/firefox|fxios/i);
	  let e = null;
	  const f = new Set(), g = l.makeRenderer;
	  l.makeRenderer = function(r, u) {
	    return u ? (e || (e = b(document.createElement("canvas")), u = e.zb, e.Cb = Math.min(u.getParameter(u.MAX_RENDERBUFFER_SIZE), u.getParameter(u.MAX_TEXTURE_SIZE))), new a(r)) : b(r);
	  };
	  const k = l.Artboard.prototype.draw;
	  l.Artboard.prototype.draw = function(r) {
	    r.R ? r.R.push(k.bind(this, r.Db)) : k.call(this, r);
	  };
	  const p = new da(), n = new da(), t = new ca();
	  l.requestAnimationFrame = t.requestAnimationFrame.bind(t);
	  l.cancelAnimationFrame = t.cancelAnimationFrame.bind(t);
	  l.enableFPSCounter = t.Kb.bind(t);
	  t.kb = c;
	  l.resolveAnimationFrame = c;
	  let w = l.load;
	  l.load = function(r, u, z = true) {
	    const B = new l.FallbackFileAssetLoader();
	    void 0 !== u && B.addLoader(u);
	    z && (u = new l.CDNFileAssetLoader(), B.addLoader(u));
	    return Promise.resolve(w(r, B));
	  };
	  const y = l.WebGLRenderer.prototype.clear;
	  l.WebGLRenderer.prototype.clear = function() {
	    la(this.Ab);
	    const r = this.F;
	    if (this.Va != r.width || this.Ua != r.height) {
	      this.resize(r.width, r.height), this.Va = r.width, this.Ua = r.height;
	    }
	    y.call(this);
	  };
	  l.decodeImage = function(r, u) {
	    r = l.decodeImageSkia(r);
	    u(r);
	  };
	  let q = l.Renderer.prototype.align;
	  l.Renderer.prototype.align = function(r, u, z, B, C = 1.0) {
	    q.call(this, r, u, z, B, C);
	  };
	};
	var ma = Object.assign({}, l), na = "./this.program", pa = "function" == typeof importScripts, qa = "", ra, sa;
	if (pa) {
	  pa ? qa = self.location.href : "undefined" != typeof document && document.currentScript && (qa = document.currentScript.src), _scriptDir && (qa = _scriptDir), 0 !== qa.indexOf("blob:") ? qa = qa.substr(0, qa.replace(/[?#].*/, "").lastIndexOf("/") + 1) : qa = "", pa && (sa = a => {
	    var b = new XMLHttpRequest();
	    b.open("GET", a, false);
	    b.responseType = "arraybuffer";
	    b.send(null);
	    return new Uint8Array(b.response);
	  }), ra = (a, b, c) => {
	    var d = new XMLHttpRequest();
	    d.open("GET", a, true);
	    d.responseType = "arraybuffer";
	    d.onload = () => {
	      200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
	    };
	    d.onerror = c;
	    d.send(null);
	  };
	}
	var ta = l.print || console.log.bind(console), ua = l.printErr || console.error.bind(console);
	Object.assign(l, ma);
	ma = null;
	l.thisProgram && (na = l.thisProgram);
	var va;
	l.wasmBinary && (va = l.wasmBinary);
	l.noExitRuntime || true;
	"object" != typeof WebAssembly && wa("no native wasm support detected");
	var xa, m, ya = false, v, x, A, za, D, E, F, Aa;
	function Ba() {
	  var a = xa.buffer;
	  l.HEAP8 = v = new Int8Array(a);
	  l.HEAP16 = A = new Int16Array(a);
	  l.HEAP32 = D = new Int32Array(a);
	  l.HEAPU8 = x = new Uint8Array(a);
	  l.HEAPU16 = za = new Uint16Array(a);
	  l.HEAPU32 = E = new Uint32Array(a);
	  l.HEAPF32 = F = new Float32Array(a);
	  l.HEAPF64 = Aa = new Float64Array(a);
	}
	var Ca, Da = [], Ea = [], Fa = [];
	function Ga() {
	  var a = l.preRun.shift();
	  Da.unshift(a);
	}
	var Ha = 0, Ja = null;
	function wa(a) {
	  if (l.onAbort) {
	    l.onAbort(a);
	  }
	  a = "Aborted(" + a + ")";
	  ua(a);
	  ya = true;
	  a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
	  ba(a);
	  throw a;
	}
	function Ka(a) {
	  return a.startsWith("data:application/octet-stream;base64,");
	}
	var La;
	La = "webgl_advanced.wasm";
	if (!Ka(La)) {
	  var Ma = La;
	  La = l.locateFile ? l.locateFile(Ma, qa) : qa + Ma;
	}
	function Na(a) {
	  if (a == La && va) {
	    return new Uint8Array(va);
	  }
	  if (sa) {
	    return sa(a);
	  }
	  throw "both async and sync fetching of the wasm failed";
	}
	function Oa(a) {
	  if (!va && (pa)) {
	    if ("function" == typeof fetch && !a.startsWith("file://")) {
	      return fetch(a, {credentials:"same-origin"}).then(b => {
	        if (!b.ok) {
	          throw "failed to load wasm binary file at '" + a + "'";
	        }
	        return b.arrayBuffer();
	      }).catch(() => Na(a));
	    }
	    if (ra) {
	      return new Promise((b, c) => {
	        ra(a, d => b(new Uint8Array(d)), c);
	      });
	    }
	  }
	  return Promise.resolve().then(() => Na(a));
	}
	function Pa(a, b, c) {
	  return Oa(a).then(d => WebAssembly.instantiate(d, b)).then(d => d).then(c, d => {
	    ua("failed to asynchronously prepare wasm: " + d);
	    wa(d);
	  });
	}
	function Qa(a, b) {
	  var c = La;
	  return va || "function" != typeof WebAssembly.instantiateStreaming || Ka(c) || c.startsWith("file://") || "function" != typeof fetch ? Pa(c, a, b) : fetch(c, {credentials:"same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
	    ua("wasm streaming compile failed: " + e);
	    ua("falling back to ArrayBuffer instantiation");
	    return Pa(c, a, b);
	  }));
	}
	var Ra, Sa, Wa = {703404:(a, b, c, d, e) => {
	  {
	    return 0;
	  }
	}, 705582:() => {
	  "undefined" !== typeof window.h && (--window.h.Ea, 0 === window.h.Ea && delete window.h);
	}, 705746:() => void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia, 705850:() => {
	  try {
	    var a = new (window.AudioContext || window.webkitAudioContext)(), b = a.sampleRate;
	    a.close();
	    return b;
	  } catch (c) {
	    return 0;
	  }
	}, 706021:(a, b, c, d, e, f) => {
	  if ("undefined" === typeof window.h) {
	    return -1;
	  }
	  var g = {}, k = {};
	  a == window.h.H.Ca && 0 != c && (k.sampleRate = c);
	  g.I = new (window.AudioContext || window.webkitAudioContext)(k);
	  g.I.suspend();
	  g.state = window.h.ha.stopped;
	  c = 0;
	  a != window.h.H.Ca && (c = b);
	  g.X = g.I.createScriptProcessor(d, c, b);
	  g.X.onaudioprocess = function(p) {
	    if (null == g.ua || 0 == g.ua.length) {
	      g.ua = new Float32Array(F.buffer, e, d * b);
	    }
	    if (a == window.h.H.capture || a == window.h.H.La) {
	      for (var n = 0; n < b; n += 1) {
	        for (var t = p.inputBuffer.getChannelData(n), w = g.ua, y = 0; y < d; y += 1) {
	          w[y * b + n] = t[y];
	        }
	      }
	      Ua(f, d, e);
	    }
	    if (a == window.h.H.Ca || a == window.h.H.La) {
	      for (Va(f, d, e), n = 0; n < p.outputBuffer.numberOfChannels; ++n) {
	        for (t = p.outputBuffer.getChannelData(n), w = g.ua, y = 0; y < d; y += 1) {
	          t[y] = w[y * b + n];
	        }
	      }
	    } else {
	      for (n = 0; n < p.outputBuffer.numberOfChannels; ++n) {
	        p.outputBuffer.getChannelData(n).fill(0.0);
	      }
	    }
	  };
	  a != window.h.H.capture && a != window.h.H.La || navigator.mediaDevices.getUserMedia({audio:true, video:false}).then(function(p) {
	    g.Fa = g.I.createMediaStreamSource(p);
	    g.Fa.connect(g.X);
	    g.X.connect(g.I.destination);
	  }).catch(function(p) {
	    console.log("Failed to get user media: " + p);
	  });
	  a == window.h.H.Ca && g.X.connect(g.I.destination);
	  g.lb = f;
	  return window.h.nc(g);
	}, 708898:a => window.h.ta(a).I.sampleRate, 708971:a => {
	  a = window.h.ta(a);
	  void 0 !== a.X && (a.X.onaudioprocess = function() {
	  }, a.X.disconnect(), a.X = void 0);
	  void 0 !== a.Fa && (a.Fa.disconnect(), a.Fa = void 0);
	  a.I.close();
	  a.I = void 0;
	  a.lb = void 0;
	}, 709371:a => {
	  window.h.xb(a);
	}, 709421:a => {
	  a = window.h.ta(a);
	  a.I.resume();
	  a.state = window.h.ha.sb;
	}, 709560:a => {
	  a = window.h.ta(a);
	  a.I.suspend();
	  a.state = window.h.ha.stopped;
	}}, Xa = a => {
	  for (; 0 < a.length;) {
	    a.shift()(l);
	  }
	}, Ya = (a, b) => {
	  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
	    var e = a[d];
	    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
	  }
	  if (b) {
	    for (; c; c--) {
	      a.unshift("..");
	    }
	  }
	  return a;
	}, Za = a => {
	  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
	  (a = Ya(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
	  a && c && (a += "/");
	  return (b ? "/" : "") + a;
	}, $a = a => {
	  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
	  a = b[0];
	  b = b[1];
	  if (!a && !b) {
	    return ".";
	  }
	  b && (b = b.substr(0, b.length - 1));
	  return a + b;
	}, ab = a => {
	  if ("/" === a) {
	    return "/";
	  }
	  a = Za(a);
	  a = a.replace(/\/$/, "");
	  var b = a.lastIndexOf("/");
	  return -1 === b ? a : a.substr(b + 1);
	}, bb = () => {
	  if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
	    return a => crypto.getRandomValues(a);
	  }
	  wa("initRandomDevice");
	}, cb = a => (cb = bb())(a);
	function db() {
	  for (var a = "", b = false, c = arguments.length - 1; -1 <= c && !b; c--) {
	    b = 0 <= c ? arguments[c] : "/";
	    if ("string" != typeof b) {
	      throw new TypeError("Arguments to path.resolve must be strings");
	    }
	    if (!b) {
	      return "";
	    }
	    a = b + "/" + a;
	    b = "/" === b.charAt(0);
	  }
	  a = Ya(a.split("/").filter(d => !!d), !b).join("/");
	  return (b ? "/" : "") + a || ".";
	}
	var eb = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, fb = (a, b, c) => {
	  var d = b + c;
	  for (c = b; a[c] && !(c >= d);) {
	    ++c;
	  }
	  if (16 < c - b && a.buffer && eb) {
	    return eb.decode(a.subarray(b, c));
	  }
	  for (d = ""; b < c;) {
	    var e = a[b++];
	    if (e & 128) {
	      var f = a[b++] & 63;
	      if (192 == (e & 224)) {
	        d += String.fromCharCode((e & 31) << 6 | f);
	      } else {
	        var g = a[b++] & 63;
	        e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
	        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
	      }
	    } else {
	      d += String.fromCharCode(e);
	    }
	  }
	  return d;
	}, gb = [], hb = a => {
	  for (var b = 0, c = 0; c < a.length; ++c) {
	    var d = a.charCodeAt(c);
	    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
	  }
	  return b;
	}, ib = (a, b, c, d) => {
	  if (!(0 < d)) {
	    return 0;
	  }
	  var e = c;
	  d = c + d - 1;
	  for (var f = 0; f < a.length; ++f) {
	    var g = a.charCodeAt(f);
	    if (55296 <= g && 57343 >= g) {
	      var k = a.charCodeAt(++f);
	      g = 65536 + ((g & 1023) << 10) | k & 1023;
	    }
	    if (127 >= g) {
	      if (c >= d) {
	        break;
	      }
	      b[c++] = g;
	    } else {
	      if (2047 >= g) {
	        if (c + 1 >= d) {
	          break;
	        }
	        b[c++] = 192 | g >> 6;
	      } else {
	        if (65535 >= g) {
	          if (c + 2 >= d) {
	            break;
	          }
	          b[c++] = 224 | g >> 12;
	        } else {
	          if (c + 3 >= d) {
	            break;
	          }
	          b[c++] = 240 | g >> 18;
	          b[c++] = 128 | g >> 12 & 63;
	        }
	        b[c++] = 128 | g >> 6 & 63;
	      }
	      b[c++] = 128 | g & 63;
	    }
	  }
	  b[c] = 0;
	  return c - e;
	};
	function jb(a, b) {
	  var c = Array(hb(a) + 1);
	  a = ib(a, c, 0, c.length);
	  b && (c.length = a);
	  return c;
	}
	var kb = [];
	function lb(a, b) {
	  kb[a] = {input:[], D:[], T:b};
	  mb(a, nb);
	}
	var nb = {open:function(a) {
	  var b = kb[a.node.Da];
	  if (!b) {
	    throw new G(43);
	  }
	  a.s = b;
	  a.seekable = false;
	}, close:function(a) {
	  a.s.T.sa(a.s);
	}, sa:function(a) {
	  a.s.T.sa(a.s);
	}, read:function(a, b, c, d) {
	  if (!a.s || !a.s.T.eb) {
	    throw new G(60);
	  }
	  for (var e = 0, f = 0; f < d; f++) {
	    try {
	      var g = a.s.T.eb(a.s);
	    } catch (k) {
	      throw new G(29);
	    }
	    if (void 0 === g && 0 === e) {
	      throw new G(6);
	    }
	    if (null === g || void 0 === g) {
	      break;
	    }
	    e++;
	    b[c + f] = g;
	  }
	  e && (a.node.timestamp = Date.now());
	  return e;
	}, write:function(a, b, c, d) {
	  if (!a.s || !a.s.T.Oa) {
	    throw new G(60);
	  }
	  try {
	    for (var e = 0; e < d; e++) {
	      a.s.T.Oa(a.s, b[c + e]);
	    }
	  } catch (f) {
	    throw new G(29);
	  }
	  d && (a.node.timestamp = Date.now());
	  return e;
	},}, ob = {eb:function() {
	  a: {
	    if (!gb.length) {
	      var a = null;
	      "function" == typeof readline && (a = readline(), null !== a && (a += "\n"));
	      if (!a) {
	        a = null;
	        break a;
	      }
	      gb = jb(a, true);
	    }
	    a = gb.shift();
	  }
	  return a;
	}, Oa:function(a, b) {
	  null === b || 10 === b ? (ta(fb(a.D, 0)), a.D = []) : 0 != b && a.D.push(b);
	}, sa:function(a) {
	  a.D && 0 < a.D.length && (ta(fb(a.D, 0)), a.D = []);
	}, Wb:function() {
	  return {uc:25856, wc:5, tc:191, vc:35387, sc:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]};
	}, Xb:function() {
	  return 0;
	}, Yb:function() {
	  return [24, 80];
	},}, pb = {Oa:function(a, b) {
	  null === b || 10 === b ? (ua(fb(a.D, 0)), a.D = []) : 0 != b && a.D.push(b);
	}, sa:function(a) {
	  a.D && 0 < a.D.length && (ua(fb(a.D, 0)), a.D = []);
	},};
	function qb(a, b) {
	  var c = a.j ? a.j.length : 0;
	  c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.j, a.j = new Uint8Array(b), 0 < a.v && a.j.set(c.subarray(0, a.v), 0));
	}
	var H = {N:null, S() {
	  return H.createNode(null, "/", 16895, 0);
	}, createNode(a, b, c, d) {
	  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
	    throw new G(63);
	  }
	  H.N || (H.N = {dir:{node:{W:H.l.W, O:H.l.O, ka:H.l.ka, Aa:H.l.Aa, qb:H.l.qb, vb:H.l.vb, rb:H.l.rb, ob:H.l.ob, Ga:H.l.Ga}, stream:{$:H.m.$}}, file:{node:{W:H.l.W, O:H.l.O}, stream:{$:H.m.$, read:H.m.read, write:H.m.write, ra:H.m.ra, hb:H.m.hb, jb:H.m.jb}}, link:{node:{W:H.l.W, O:H.l.O, la:H.l.la}, stream:{}}, Wa:{node:{W:H.l.W, O:H.l.O}, stream:rb}});
	  c = sb(a, b, c, d);
	  16384 === (c.mode & 61440) ? (c.l = H.N.dir.node, c.m = H.N.dir.stream, c.j = {}) : 32768 === (c.mode & 61440) ? (c.l = H.N.file.node, c.m = H.N.file.stream, c.v = 0, c.j = null) : 40960 === (c.mode & 61440) ? (c.l = H.N.link.node, c.m = H.N.link.stream) : 8192 === (c.mode & 61440) && (c.l = H.N.Wa.node, c.m = H.N.Wa.stream);
	  c.timestamp = Date.now();
	  a && (a.j[b] = c, a.timestamp = c.timestamp);
	  return c;
	}, Ac(a) {
	  return a.j ? a.j.subarray ? a.j.subarray(0, a.v) : new Uint8Array(a.j) : new Uint8Array(0);
	}, l:{W(a) {
	  var b = {};
	  b.zc = 8192 === (a.mode & 61440) ? a.id : 1;
	  b.Cc = a.id;
	  b.mode = a.mode;
	  b.Gc = 1;
	  b.uid = 0;
	  b.Bc = 0;
	  b.Da = a.Da;
	  16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.v : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
	  b.qc = new Date(a.timestamp);
	  b.Ec = new Date(a.timestamp);
	  b.xc = new Date(a.timestamp);
	  b.Eb = 4096;
	  b.rc = Math.ceil(b.size / b.Eb);
	  return b;
	}, O(a, b) {
	  void 0 !== b.mode && (a.mode = b.mode);
	  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
	  if (void 0 !== b.size && (b = b.size, a.v != b)) {
	    if (0 == b) {
	      a.j = null, a.v = 0;
	    } else {
	      var c = a.j;
	      a.j = new Uint8Array(b);
	      c && a.j.set(c.subarray(0, Math.min(b, a.v)));
	      a.v = b;
	    }
	  }
	}, ka() {
	  throw tb[44];
	}, Aa(a, b, c, d) {
	  return H.createNode(a, b, c, d);
	}, qb(a, b, c) {
	  if (16384 === (a.mode & 61440)) {
	    try {
	      var d = ub(b, c);
	    } catch (f) {
	    }
	    if (d) {
	      for (var e in d.j) {
	        throw new G(55);
	      }
	    }
	  }
	  delete a.parent.j[a.name];
	  a.parent.timestamp = Date.now();
	  a.name = c;
	  b.j[c] = a;
	  b.timestamp = a.parent.timestamp;
	  a.parent = b;
	}, vb(a, b) {
	  delete a.j[b];
	  a.timestamp = Date.now();
	}, rb(a, b) {
	  var c = ub(a, b), d;
	  for (d in c.j) {
	    throw new G(55);
	  }
	  delete a.j[b];
	  a.timestamp = Date.now();
	}, ob(a) {
	  var b = [".", ".."], c;
	  for (c in a.j) {
	    a.j.hasOwnProperty(c) && b.push(c);
	  }
	  return b;
	}, Ga(a, b, c) {
	  a = H.createNode(a, b, 41471, 0);
	  a.link = c;
	  return a;
	}, la(a) {
	  if (40960 !== (a.mode & 61440)) {
	    throw new G(28);
	  }
	  return a.link;
	},}, m:{read(a, b, c, d, e) {
	  var f = a.node.j;
	  if (e >= a.node.v) {
	    return 0;
	  }
	  a = Math.min(a.node.v - e, d);
	  if (8 < a && f.subarray) {
	    b.set(f.subarray(e, e + a), c);
	  } else {
	    for (d = 0; d < a; d++) {
	      b[c + d] = f[e + d];
	    }
	  }
	  return a;
	}, write(a, b, c, d, e, f) {
	  b.buffer === v.buffer && (f = false);
	  if (!d) {
	    return 0;
	  }
	  a = a.node;
	  a.timestamp = Date.now();
	  if (b.subarray && (!a.j || a.j.subarray)) {
	    if (f) {
	      return a.j = b.subarray(c, c + d), a.v = d;
	    }
	    if (0 === a.v && 0 === e) {
	      return a.j = b.slice(c, c + d), a.v = d;
	    }
	    if (e + d <= a.v) {
	      return a.j.set(b.subarray(c, c + d), e), d;
	    }
	  }
	  qb(a, e + d);
	  if (a.j.subarray && b.subarray) {
	    a.j.set(b.subarray(c, c + d), e);
	  } else {
	    for (f = 0; f < d; f++) {
	      a.j[e + f] = b[c + f];
	    }
	  }
	  a.v = Math.max(a.v, e + d);
	  return d;
	}, $(a, b, c) {
	  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.v);
	  if (0 > b) {
	    throw new G(28);
	  }
	  return b;
	}, ra(a, b, c) {
	  qb(a.node, b + c);
	  a.node.v = Math.max(a.node.v, b + c);
	}, hb(a, b, c, d, e) {
	  if (32768 !== (a.node.mode & 61440)) {
	    throw new G(43);
	  }
	  a = a.node.j;
	  if (e & 2 || a.buffer !== v.buffer) {
	    if (0 < c || c + b < a.length) {
	      a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
	    }
	    c = true;
	    b = 65536 * Math.ceil(b / 65536);
	    (e = vb(65536, b)) ? (x.fill(0, e, e + b), b = e) : b = 0;
	    if (!b) {
	      throw new G(48);
	    }
	    v.set(a, b);
	  } else {
	    c = false, b = a.byteOffset;
	  }
	  return {o:b, L:c};
	}, jb(a, b, c, d) {
	  H.m.write(a, b, 0, d, c, false);
	  return 0;
	},},};
	function wb(a, b) {
	  var c = 0;
	  a && (c |= 365);
	  b && (c |= 146);
	  return c;
	}
	var xb = null, yb = {}, zb = [], Ab = 1, Bb = null, Cb = true, G = null, tb = {}, Eb = (a, b = {}) => {
	  a = db(a);
	  if (!a) {
	    return {path:"", node:null};
	  }
	  b = Object.assign({bb:true, Qa:0}, b);
	  if (8 < b.Qa) {
	    throw new G(32);
	  }
	  a = a.split("/").filter(g => !!g);
	  for (var c = xb, d = "/", e = 0; e < a.length; e++) {
	    var f = e === a.length - 1;
	    if (f && b.parent) {
	      break;
	    }
	    c = ub(c, a[e]);
	    d = Za(d + "/" + a[e]);
	    c.Ba && (!f || f && b.bb) && (c = c.Ba.root);
	    if (!f || b.ab) {
	      for (f = 0; 40960 === (c.mode & 61440);) {
	        if (c = Db(d), d = db($a(d), c), c = Eb(d, {Qa:b.Qa + 1}).node, 40 < f++) {
	          throw new G(32);
	        }
	      }
	    }
	  }
	  return {path:d, node:c};
	}, Fb = a => {
	  for (var b;;) {
	    if (a === a.parent) {
	      return a = a.S.ib, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
	    }
	    b = b ? `${a.name}/${b}` : a.name;
	    a = a.parent;
	  }
	}, Hb = (a, b) => {
	  for (var c = 0, d = 0; d < b.length; d++) {
	    c = (c << 5) - c + b.charCodeAt(d) | 0;
	  }
	  return (a + c >>> 0) % Bb.length;
	}, ub = (a, b) => {
	  var c;
	  if (c = (c = Ib(a, "x")) ? c : a.l.ka ? 0 : 2) {
	    throw new G(c, a);
	  }
	  for (c = Bb[Hb(a.id, b)]; c; c = c.ac) {
	    var d = c.name;
	    if (c.parent.id === a.id && d === b) {
	      return c;
	    }
	  }
	  return a.l.ka(a, b);
	}, sb = (a, b, c, d) => {
	  a = new Jb(a, b, c, d);
	  b = Hb(a.parent.id, a.name);
	  a.ac = Bb[b];
	  return Bb[b] = a;
	}, Kb = a => {
	  var b = ["r", "w", "rw"][a & 3];
	  a & 512 && (b += "w");
	  return b;
	}, Ib = (a, b) => {
	  if (Cb) {
	    return 0;
	  }
	  if (!b.includes("r") || a.mode & 292) {
	    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
	      return 2;
	    }
	  } else {
	    return 2;
	  }
	  return 0;
	}, Lb = (a, b) => {
	  try {
	    return ub(a, b), 20;
	  } catch (c) {
	  }
	  return Ib(a, "wx");
	}, Mb = () => {
	  for (var a = 0; 4096 >= a; a++) {
	    if (!zb[a]) {
	      return a;
	    }
	  }
	  throw new G(33);
	}, Nb = a => {
	  a = zb[a];
	  if (!a) {
	    throw new G(8);
	  }
	  return a;
	}, Pb = (a, b = -1) => {
	  Ob || (Ob = function() {
	    this.h = {};
	  }, Ob.prototype = {}, Object.defineProperties(Ob.prototype, {object:{get() {
	    return this.node;
	  }, set(c) {
	    this.node = c;
	  }}, flags:{get() {
	    return this.h.flags;
	  }, set(c) {
	    this.h.flags = c;
	  },}, position:{get() {
	    return this.h.position;
	  }, set(c) {
	    this.h.position = c;
	  },},}));
	  a = Object.assign(new Ob(), a);
	  -1 == b && (b = Mb());
	  a.V = b;
	  return zb[b] = a;
	}, rb = {open:a => {
	  a.m = yb[a.node.Da].m;
	  a.m.open && a.m.open(a);
	}, $:() => {
	  throw new G(70);
	},}, mb = (a, b) => {
	  yb[a] = {m:b};
	}, Qb = (a, b) => {
	  var c = "/" === b, d = !b;
	  if (c && xb) {
	    throw new G(10);
	  }
	  if (!c && !d) {
	    var e = Eb(b, {bb:false});
	    b = e.path;
	    e = e.node;
	    if (e.Ba) {
	      throw new G(10);
	    }
	    if (16384 !== (e.mode & 61440)) {
	      throw new G(54);
	    }
	  }
	  b = {type:a, Ic:{}, ib:b, $b:[]};
	  a = a.S(b);
	  a.S = b;
	  b.root = a;
	  c ? xb = a : e && (e.Ba = b, e.S && e.S.$b.push(b));
	}, Rb = (a, b, c) => {
	  var d = Eb(a, {parent:true}).node;
	  a = ab(a);
	  if (!a || "." === a || ".." === a) {
	    throw new G(28);
	  }
	  var e = Lb(d, a);
	  if (e) {
	    throw new G(e);
	  }
	  if (!d.l.Aa) {
	    throw new G(63);
	  }
	  return d.l.Aa(d, a, b, c);
	}, Sb = (a, b, c) => {
	  "undefined" == typeof c && (c = b, b = 438);
	  Rb(a, b | 8192, c);
	}, Tb = (a, b) => {
	  if (!db(a)) {
	    throw new G(44);
	  }
	  var c = Eb(b, {parent:true}).node;
	  if (!c) {
	    throw new G(44);
	  }
	  b = ab(b);
	  var d = Lb(c, b);
	  if (d) {
	    throw new G(d);
	  }
	  if (!c.l.Ga) {
	    throw new G(63);
	  }
	  c.l.Ga(c, b, a);
	}, Db = a => {
	  a = Eb(a).node;
	  if (!a) {
	    throw new G(44);
	  }
	  if (!a.l.la) {
	    throw new G(28);
	  }
	  return db(Fb(a.parent), a.l.la(a));
	}, Vb = (a, b, c) => {
	  if ("" === a) {
	    throw new G(44);
	  }
	  if ("string" == typeof b) {
	    var d = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090,}[b];
	    if ("undefined" == typeof d) {
	      throw Error(`Unknown file open mode: ${b}`);
	    }
	    b = d;
	  }
	  c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
	  if ("object" == typeof a) {
	    var e = a;
	  } else {
	    a = Za(a);
	    try {
	      e = Eb(a, {ab:!(b & 131072)}).node;
	    } catch (f) {
	    }
	  }
	  d = false;
	  if (b & 64) {
	    if (e) {
	      if (b & 128) {
	        throw new G(20);
	      }
	    } else {
	      e = Rb(a, c, 0), d = true;
	    }
	  }
	  if (!e) {
	    throw new G(44);
	  }
	  8192 === (e.mode & 61440) && (b &= -513);
	  if (b & 65536 && 16384 !== (e.mode & 61440)) {
	    throw new G(54);
	  }
	  if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 === (e.mode & 61440) && ("r" !== Kb(b) || b & 512) ? 31 : Ib(e, Kb(b)) : 44)) {
	    throw new G(c);
	  }
	  if (b & 512 && !d) {
	    c = e;
	    c = "string" == typeof c ? Eb(c, {ab:true}).node : c;
	    if (!c.l.O) {
	      throw new G(63);
	    }
	    if (16384 === (c.mode & 61440)) {
	      throw new G(31);
	    }
	    if (32768 !== (c.mode & 61440)) {
	      throw new G(28);
	    }
	    if (d = Ib(c, "w")) {
	      throw new G(d);
	    }
	    c.l.O(c, {size:0, timestamp:Date.now()});
	  }
	  b &= -131713;
	  e = Pb({node:e, path:Fb(e), flags:b, seekable:true, position:0, m:e.m, oc:[], error:false});
	  e.m.open && e.m.open(e);
	  !l.logReadFiles || b & 1 || (Ub || (Ub = {}), a in Ub || (Ub[a] = 1));
	  return e;
	}, Wb = (a, b, c) => {
	  if (null === a.V) {
	    throw new G(8);
	  }
	  if (!a.seekable || !a.m.$) {
	    throw new G(70);
	  }
	  if (0 != c && 1 != c && 2 != c) {
	    throw new G(28);
	  }
	  a.position = a.m.$(a, b, c);
	  a.oc = [];
	}, Xb = () => {
	  G || (G = function(a, b) {
	    this.name = "ErrnoError";
	    this.node = b;
	    this.dc = function(c) {
	      this.Z = c;
	    };
	    this.dc(a);
	    this.message = "FS error";
	  }, G.prototype = Error(), G.prototype.constructor = G, [44].forEach(a => {
	    tb[a] = new G(a);
	    tb[a].stack = "<generic error, no stack>";
	  }));
	}, Yb, $b = (a, b, c) => {
	  a = Za("/dev/" + a);
	  var d = wb(!!b, !!c);
	  Zb || (Zb = 64);
	  var e = Zb++ << 8 | 0;
	  mb(e, {open:f => {
	    f.seekable = false;
	  }, close:() => {
	    c && c.buffer && c.buffer.length && c(10);
	  }, read:(f, g, k, p) => {
	    for (var n = 0, t = 0; t < p; t++) {
	      try {
	        var w = b();
	      } catch (y) {
	        throw new G(29);
	      }
	      if (void 0 === w && 0 === n) {
	        throw new G(6);
	      }
	      if (null === w || void 0 === w) {
	        break;
	      }
	      n++;
	      g[k + t] = w;
	    }
	    n && (f.node.timestamp = Date.now());
	    return n;
	  }, write:(f, g, k, p) => {
	    for (var n = 0; n < p; n++) {
	      try {
	        c(g[k + n]);
	      } catch (t) {
	        throw new G(29);
	      }
	    }
	    p && (f.node.timestamp = Date.now());
	    return n;
	  }});
	  Sb(a, d, e);
	}, Zb, ac = {}, Ob, Ub, bc = void 0;
	function cc() {
	  bc += 4;
	  return D[bc - 4 >> 2];
	}
	function dc(a) {
	  if (void 0 === a) {
	    return "_unknown";
	  }
	  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
	  var b = a.charCodeAt(0);
	  return 48 <= b && 57 >= b ? `_${a}` : a;
	}
	function ec(a, b) {
	  a = dc(a);
	  return {[a]:function() {
	    return b.apply(this, arguments);
	  }}[a];
	}
	function fc() {
	  this.L = [void 0];
	  this.cb = [];
	}
	var I = new fc(), gc = void 0;
	function K(a) {
	  throw new gc(a);
	}
	var hc = a => {
	  a || K("Cannot use deleted val. handle = " + a);
	  return I.get(a).value;
	}, ic = a => {
	  switch(a) {
	    case void 0:
	      return 1;
	    case null:
	      return 2;
	    case true:
	      return 3;
	    case false:
	      return 4;
	    default:
	      return I.ra({pb:1, value:a});
	  }
	};
	function jc(a) {
	  var b = Error, c = ec(a, function(d) {
	    this.name = a;
	    this.message = d;
	    d = Error(d).stack;
	    void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
	  });
	  c.prototype = Object.create(b.prototype);
	  c.prototype.constructor = c;
	  c.prototype.toString = function() {
	    return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
	  };
	  return c;
	}
	var kc = void 0, lc = void 0;
	function L(a) {
	  for (var b = ""; x[a];) {
	    b += lc[x[a++]];
	  }
	  return b;
	}
	var mc = [];
	function nc() {
	  for (; mc.length;) {
	    var a = mc.pop();
	    a.g.ga = false;
	    a["delete"]();
	  }
	}
	var oc = void 0, pc = {};
	function qc(a, b) {
	  for (void 0 === b && K("ptr should not be undefined"); a.A;) {
	    b = a.na(b), a = a.A;
	  }
	  return b;
	}
	var rc = {};
	function sc(a) {
	  a = tc(a);
	  var b = L(a);
	  uc(a);
	  return b;
	}
	function vc(a, b) {
	  var c = rc[a];
	  void 0 === c && K(b + " has unknown type " + sc(a));
	  return c;
	}
	function wc() {
	}
	var xc = false;
	function yc(a) {
	  --a.count.value;
	  0 === a.count.value && (a.G ? a.K.U(a.G) : a.u.i.U(a.o));
	}
	function zc(a, b, c) {
	  if (b === c) {
	    return a;
	  }
	  if (void 0 === c.A) {
	    return null;
	  }
	  a = zc(a, b, c.A);
	  return null === a ? null : c.Ib(a);
	}
	var Ac = {};
	function Bc(a, b) {
	  b = qc(a, b);
	  return pc[b];
	}
	var Cc = void 0;
	function Dc(a) {
	  throw new Cc(a);
	}
	function Ec(a, b) {
	  b.u && b.o || Dc("makeClassHandle requires ptr and ptrType");
	  !!b.K !== !!b.G && Dc("Both smartPtrType and smartPtr must be specified");
	  b.count = {value:1};
	  return Fc(Object.create(a, {g:{value:b,},}));
	}
	function Fc(a) {
	  if ("undefined" === typeof FinalizationRegistry) {
	    return Fc = b => b, a;
	  }
	  xc = new FinalizationRegistry(b => {
	    yc(b.g);
	  });
	  Fc = b => {
	    var c = b.g;
	    c.G && xc.register(b, {g:c}, b);
	    return b;
	  };
	  wc = b => {
	    xc.unregister(b);
	  };
	  return Fc(a);
	}
	var Gc = {};
	function Hc(a) {
	  for (; a.length;) {
	    var b = a.pop();
	    a.pop()(b);
	  }
	}
	function Ic(a) {
	  return this.fromWireType(D[a >> 2]);
	}
	var Jc = {}, Kc = {};
	function N(a, b, c) {
	  function d(k) {
	    k = c(k);
	    k.length !== a.length && Dc("Mismatched type converter count");
	    for (var p = 0; p < a.length; ++p) {
	      Lc(a[p], k[p]);
	    }
	  }
	  a.forEach(function(k) {
	    Kc[k] = b;
	  });
	  var e = Array(b.length), f = [], g = 0;
	  b.forEach((k, p) => {
	    rc.hasOwnProperty(k) ? e[p] = rc[k] : (f.push(k), Jc.hasOwnProperty(k) || (Jc[k] = []), Jc[k].push(() => {
	      e[p] = rc[k];
	      ++g;
	      g === f.length && d(e);
	    }));
	  });
	  0 === f.length && d(e);
	}
	function Mc(a) {
	  switch(a) {
	    case 1:
	      return 0;
	    case 2:
	      return 1;
	    case 4:
	      return 2;
	    case 8:
	      return 3;
	    default:
	      throw new TypeError(`Unknown type size: ${a}`);
	  }
	}
	function Nc(a, b, c = {}) {
	  var d = b.name;
	  a || K(`type "${d}" must have a positive integer typeid pointer`);
	  if (rc.hasOwnProperty(a)) {
	    if (c.Tb) {
	      return;
	    }
	    K(`Cannot register type '${d}' twice`);
	  }
	  rc[a] = b;
	  delete Kc[a];
	  Jc.hasOwnProperty(a) && (b = Jc[a], delete Jc[a], b.forEach(e => e()));
	}
	function Lc(a, b, c = {}) {
	  if (!("argPackAdvance" in b)) {
	    throw new TypeError("registerType registeredInstance requires argPackAdvance");
	  }
	  Nc(a, b, c);
	}
	function Oc(a) {
	  K(a.g.u.i.name + " instance already deleted");
	}
	function Pc() {
	}
	function Qc(a, b, c) {
	  if (void 0 === a[b].B) {
	    var d = a[b];
	    a[b] = function() {
	      a[b].B.hasOwnProperty(arguments.length) || K(`Function '${c}' called with an invalid number of arguments (${arguments.length}) - expects one of (${a[b].B})!`);
	      return a[b].B[arguments.length].apply(this, arguments);
	    };
	    a[b].B = [];
	    a[b].B[d.ea] = d;
	  }
	}
	function Rc(a, b, c) {
	  l.hasOwnProperty(a) ? ((void 0 === c || void 0 !== l[a].B && void 0 !== l[a].B[c]) && K(`Cannot register public name '${a}' twice`), Qc(l, a, a), l.hasOwnProperty(c) && K(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`), l[a].B[c] = b) : (l[a] = b, void 0 !== c && (l[a].Hc = c));
	}
	function Sc(a, b, c, d, e, f, g, k) {
	  this.name = a;
	  this.constructor = b;
	  this.M = c;
	  this.U = d;
	  this.A = e;
	  this.Nb = f;
	  this.na = g;
	  this.Ib = k;
	  this.mb = [];
	}
	function Tc(a, b, c) {
	  for (; b !== c;) {
	    b.na || K(`Expected null or instance of ${c.name}, got an instance of ${b.name}`), a = b.na(a), b = b.A;
	  }
	  return a;
	}
	function Uc(a, b) {
	  if (null === b) {
	    return this.Na && K(`null is not a valid ${this.name}`), 0;
	  }
	  b.g || K(`Cannot pass "${Vc(b)}" as a ${this.name}`);
	  b.g.o || K(`Cannot pass deleted object as a pointer of type ${this.name}`);
	  return Tc(b.g.o, b.g.u.i, this.i);
	}
	function Wc(a, b) {
	  if (null === b) {
	    this.Na && K(`null is not a valid ${this.name}`);
	    if (this.wa) {
	      var c = this.Pa();
	      null !== a && a.push(this.U, c);
	      return c;
	    }
	    return 0;
	  }
	  b.g || K(`Cannot pass "${Vc(b)}" as a ${this.name}`);
	  b.g.o || K(`Cannot pass deleted object as a pointer of type ${this.name}`);
	  !this.va && b.g.u.va && K(`Cannot convert argument of type ${b.g.K ? b.g.K.name : b.g.u.name} to parameter type ${this.name}`);
	  c = Tc(b.g.o, b.g.u.i, this.i);
	  if (this.wa) {
	    switch(void 0 === b.g.G && K("Passing raw pointer to smart pointer is illegal"), this.ic) {
	      case 0:
	        b.g.K === this ? c = b.g.G : K(`Cannot convert argument of type ${b.g.K ? b.g.K.name : b.g.u.name} to parameter type ${this.name}`);
	        break;
	      case 1:
	        c = b.g.G;
	        break;
	      case 2:
	        if (b.g.K === this) {
	          c = b.g.G;
	        } else {
	          var d = b.clone();
	          c = this.cc(c, ic(function() {
	            d["delete"]();
	          }));
	          null !== a && a.push(this.U, c);
	        }
	        break;
	      default:
	        K("Unsupporting sharing policy");
	    }
	  }
	  return c;
	}
	function Xc(a, b) {
	  if (null === b) {
	    return this.Na && K(`null is not a valid ${this.name}`), 0;
	  }
	  b.g || K(`Cannot pass "${Vc(b)}" as a ${this.name}`);
	  b.g.o || K(`Cannot pass deleted object as a pointer of type ${this.name}`);
	  b.g.u.va && K(`Cannot convert argument of type ${b.g.u.name} to parameter type ${this.name}`);
	  return Tc(b.g.o, b.g.u.i, this.i);
	}
	function Yc(a, b, c, d) {
	  this.name = a;
	  this.i = b;
	  this.Na = c;
	  this.va = d;
	  this.wa = false;
	  this.U = this.cc = this.Pa = this.nb = this.ic = this.bc = void 0;
	  void 0 !== b.A ? this.toWireType = Wc : (this.toWireType = d ? Uc : Xc, this.J = null);
	}
	function Zc(a, b, c) {
	  l.hasOwnProperty(a) || Dc("Replacing nonexistant public symbol");
	  void 0 !== l[a].B && void 0 !== c ? l[a].B[c] = b : (l[a] = b, l[a].ea = c);
	}
	var $c = [], Q = a => {
	  var b = $c[a];
	  b || (a >= $c.length && ($c.length = a + 1), $c[a] = b = Ca.get(a));
	  return b;
	}, ad = (a, b) => {
	  var c = [];
	  return function() {
	    c.length = 0;
	    Object.assign(c, arguments);
	    if (a.includes("j")) {
	      var d = l["dynCall_" + a];
	      d = c && c.length ? d.apply(null, [b].concat(c)) : d.call(null, b);
	    } else {
	      d = Q(b).apply(null, c);
	    }
	    return d;
	  };
	};
	function R(a, b) {
	  a = L(a);
	  var c = a.includes("j") ? ad(a, b) : Q(b);
	  "function" != typeof c && K(`unknown function pointer with signature ${a}: ${b}`);
	  return c;
	}
	var bd = void 0;
	function cd(a, b) {
	  function c(f) {
	    e[f] || rc[f] || (Kc[f] ? Kc[f].forEach(c) : (d.push(f), e[f] = true));
	  }
	  var d = [], e = {};
	  b.forEach(c);
	  throw new bd(`${a}: ` + d.map(sc).join([", "]));
	}
	function dd(a, b, c, d, e) {
	  var f = b.length;
	  2 > f && K("argTypes array size mismatch! Must at least get return value and 'this' types!");
	  var g = null !== b[1] && null !== c, k = false;
	  for (c = 1; c < b.length; ++c) {
	    if (null !== b[c] && void 0 === b[c].J) {
	      k = true;
	      break;
	    }
	  }
	  var p = "void" !== b[0].name, n = f - 2, t = Array(n), w = [], y = [];
	  return function() {
	    arguments.length !== n && K(`function ${a} called with ${arguments.length} arguments, expected ${n} args!`);
	    y.length = 0;
	    w.length = g ? 2 : 1;
	    w[0] = e;
	    if (g) {
	      var q = b[1].toWireType(y, this);
	      w[1] = q;
	    }
	    for (var r = 0; r < n; ++r) {
	      t[r] = b[r + 2].toWireType(y, arguments[r]), w.push(t[r]);
	    }
	    r = d.apply(null, w);
	    if (k) {
	      Hc(y);
	    } else {
	      for (var u = g ? 1 : 2; u < b.length; u++) {
	        var z = 1 === u ? q : t[u - 2];
	        null !== b[u].J && b[u].J(z);
	      }
	    }
	    q = p ? b[0].fromWireType(r) : void 0;
	    return q;
	  };
	}
	function ed(a, b) {
	  for (var c = [], d = 0; d < a; d++) {
	    c.push(E[b + 4 * d >> 2]);
	  }
	  return c;
	}
	function fd(a, b, c) {
	  a instanceof Object || K(`${c} with invalid "this": ${a}`);
	  a instanceof b.i.constructor || K(`${c} incompatible with "this" of type ${a.constructor.name}`);
	  a.g.o || K(`cannot call emscripten binding method ${c} on deleted object`);
	  return Tc(a.g.o, a.g.u.i, b.i);
	}
	function gd(a) {
	  a >= I.h && 0 === --I.get(a).pb && I.Sb(a);
	}
	function hd(a, b, c) {
	  switch(b) {
	    case 0:
	      return function(d) {
	        return this.fromWireType((c ? v : x)[d]);
	      };
	    case 1:
	      return function(d) {
	        return this.fromWireType((c ? A : za)[d >> 1]);
	      };
	    case 2:
	      return function(d) {
	        return this.fromWireType((c ? D : E)[d >> 2]);
	      };
	    default:
	      throw new TypeError("Unknown integer type: " + a);
	  }
	}
	function Vc(a) {
	  if (null === a) {
	    return "null";
	  }
	  var b = typeof a;
	  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
	}
	function jd(a, b) {
	  switch(b) {
	    case 2:
	      return function(c) {
	        return this.fromWireType(F[c >> 2]);
	      };
	    case 3:
	      return function(c) {
	        return this.fromWireType(Aa[c >> 3]);
	      };
	    default:
	      throw new TypeError("Unknown float type: " + a);
	  }
	}
	function kd(a, b, c) {
	  switch(b) {
	    case 0:
	      return c ? function(d) {
	        return v[d];
	      } : function(d) {
	        return x[d];
	      };
	    case 1:
	      return c ? function(d) {
	        return A[d >> 1];
	      } : function(d) {
	        return za[d >> 1];
	      };
	    case 2:
	      return c ? function(d) {
	        return D[d >> 2];
	      } : function(d) {
	        return E[d >> 2];
	      };
	    default:
	      throw new TypeError("Unknown integer type: " + a);
	  }
	}
	var ld = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, md = (a, b) => {
	  var c = a >> 1;
	  for (var d = c + b / 2; !(c >= d) && za[c];) {
	    ++c;
	  }
	  c <<= 1;
	  if (32 < c - a && ld) {
	    return ld.decode(x.subarray(a, c));
	  }
	  c = "";
	  for (d = 0; !(d >= b / 2); ++d) {
	    var e = A[a + 2 * d >> 1];
	    if (0 == e) {
	      break;
	    }
	    c += String.fromCharCode(e);
	  }
	  return c;
	}, nd = (a, b, c) => {
	  void 0 === c && (c = 2147483647);
	  if (2 > c) {
	    return 0;
	  }
	  c -= 2;
	  var d = b;
	  c = c < 2 * a.length ? c / 2 : a.length;
	  for (var e = 0; e < c; ++e) {
	    A[b >> 1] = a.charCodeAt(e), b += 2;
	  }
	  A[b >> 1] = 0;
	  return b - d;
	}, od = a => 2 * a.length, pd = (a, b) => {
	  for (var c = 0, d = ""; !(c >= b / 4);) {
	    var e = D[a + 4 * c >> 2];
	    if (0 == e) {
	      break;
	    }
	    ++c;
	    65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
	  }
	  return d;
	}, qd = (a, b, c) => {
	  void 0 === c && (c = 2147483647);
	  if (4 > c) {
	    return 0;
	  }
	  var d = b;
	  c = d + c - 4;
	  for (var e = 0; e < a.length; ++e) {
	    var f = a.charCodeAt(e);
	    if (55296 <= f && 57343 >= f) {
	      var g = a.charCodeAt(++e);
	      f = 65536 + ((f & 1023) << 10) | g & 1023;
	    }
	    D[b >> 2] = f;
	    b += 4;
	    if (b + 4 > c) {
	      break;
	    }
	  }
	  D[b >> 2] = 0;
	  return b - d;
	}, rd = a => {
	  for (var b = 0, c = 0; c < a.length; ++c) {
	    var d = a.charCodeAt(c);
	    55296 <= d && 57343 >= d && ++c;
	    b += 4;
	  }
	  return b;
	}, sd = {};
	function td(a) {
	  var b = sd[a];
	  return void 0 === b ? L(a) : b;
	}
	var ud = [];
	function vd(a) {
	  var b = ud.length;
	  ud.push(a);
	  return b;
	}
	function wd(a, b) {
	  for (var c = Array(a), d = 0; d < a; ++d) {
	    c[d] = vc(E[b + 4 * d >> 2], "parameter " + d);
	  }
	  return c;
	}
	var xd = [], yd = [];
	function zd(a) {
	  var b = a.getExtension("ANGLE_instanced_arrays");
	  b && (a.vertexAttribDivisor = function(c, d) {
	    b.vertexAttribDivisorANGLE(c, d);
	  }, a.drawArraysInstanced = function(c, d, e, f) {
	    b.drawArraysInstancedANGLE(c, d, e, f);
	  }, a.drawElementsInstanced = function(c, d, e, f, g) {
	    b.drawElementsInstancedANGLE(c, d, e, f, g);
	  });
	}
	function Ad(a) {
	  var b = a.getExtension("OES_vertex_array_object");
	  b && (a.createVertexArray = function() {
	    return b.createVertexArrayOES();
	  }, a.deleteVertexArray = function(c) {
	    b.deleteVertexArrayOES(c);
	  }, a.bindVertexArray = function(c) {
	    b.bindVertexArrayOES(c);
	  }, a.isVertexArray = function(c) {
	    return b.isVertexArrayOES(c);
	  });
	}
	function Bd(a) {
	  var b = a.getExtension("WEBGL_draw_buffers");
	  b && (a.drawBuffers = function(c, d) {
	    b.drawBuffersWEBGL(c, d);
	  });
	}
	var Cd = 1, Dd = [], Ed = [], Fd = [], Gd = [], Hd = [], Id = [], Jd = [], ja = [], Kd = [], Ld = [], Md = {}, Nd = {}, Od = 4;
	function S(a) {
	  Pd || (Pd = a);
	}
	function ha(a) {
	  for (var b = Cd++, c = a.length; c < b; c++) {
	    a[c] = null;
	  }
	  return b;
	}
	function la(a) {
	  T = ja[a];
	  l.yc = U = T && T.Ta;
	  return !(a && !U);
	}
	function ka(a) {
	  a || (a = T);
	  if (!a.Ub) {
	    a.Ub = true;
	    var b = a.Ta;
	    zd(b);
	    Ad(b);
	    Bd(b);
	    b.Ya = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
	    b.gb = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
	    2 <= a.version && (b.Za = b.getExtension("EXT_disjoint_timer_query_webgl2"));
	    if (2 > a.version || !b.Za) {
	      b.Za = b.getExtension("EXT_disjoint_timer_query");
	    }
	    b.Fc = b.getExtension("WEBGL_multi_draw");
	    (b.getSupportedExtensions() || []).forEach(function(c) {
	      c.includes("lose_context") || c.includes("debug") || b.getExtension(c);
	    });
	  }
	}
	var Pd, T;
	function Qd(a, b) {
	  U.bindFramebuffer(a, Fd[b]);
	}
	function Rd(a) {
	  U.bindVertexArray(Jd[a]);
	}
	function Sd(a, b) {
	  for (var c = 0; c < a; c++) {
	    var d = D[b + 4 * c >> 2];
	    U.deleteVertexArray(Jd[d]);
	    Jd[d] = null;
	  }
	}
	var Td = [];
	function Ud(a, b, c, d) {
	  U.drawElements(a, b, c, d);
	}
	function Vd(a, b, c, d) {
	  for (var e = 0; e < a; e++) {
	    var f = U[c](), g = f && ha(d);
	    f ? (f.name = g, d[g] = f) : S(1282);
	    D[b + 4 * e >> 2] = g;
	  }
	}
	function Wd(a, b) {
	  Vd(a, b, "createVertexArray", Jd);
	}
	function Xd(a, b) {
	  if (b) {
	    var c = void 0;
	    switch(a) {
	      case 36346:
	        c = 1;
	        break;
	      case 36344:
	        return;
	      case 34814:
	      case 36345:
	        c = 0;
	        break;
	      case 34466:
	        var d = U.getParameter(34467);
	        c = d ? d.length : 0;
	        break;
	      case 33309:
	        if (2 > T.version) {
	          S(1282);
	          return;
	        }
	        c = 2 * (U.getSupportedExtensions() || []).length;
	        break;
	      case 33307:
	      case 33308:
	        if (2 > T.version) {
	          S(1280);
	          return;
	        }
	        c = 33307 == a ? 3 : 0;
	    }
	    if (void 0 === c) {
	      switch(d = U.getParameter(a), typeof d) {
	        case "number":
	          c = d;
	          break;
	        case "boolean":
	          c = d ? 1 : 0;
	          break;
	        case "string":
	          S(1280);
	          return;
	        case "object":
	          if (null === d) {
	            switch(a) {
	              case 34964:
	              case 35725:
	              case 34965:
	              case 36006:
	              case 36007:
	              case 32873:
	              case 34229:
	              case 36662:
	              case 36663:
	              case 35053:
	              case 35055:
	              case 36010:
	              case 35097:
	              case 35869:
	              case 32874:
	              case 36389:
	              case 35983:
	              case 35368:
	              case 34068:
	                c = 0;
	                break;
	              default:
	                S(1280);
	                return;
	            }
	          } else {
	            if (d instanceof Float32Array || d instanceof Uint32Array || d instanceof Int32Array || d instanceof Array) {
	              for (a = 0; a < d.length; ++a) {
	                D[b + 4 * a >> 2] = d[a];
	              }
	              return;
	            }
	            try {
	              c = d.name | 0;
	            } catch (e) {
	              S(1280);
	              ua("GL_INVALID_ENUM in glGet0v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + e + ")");
	              return;
	            }
	          }
	          break;
	        default:
	          S(1280);
	          ua("GL_INVALID_ENUM in glGet0v: Native code calling glGet0v(" + a + ") and it returns " + d + " of type " + typeof d + "!");
	          return;
	      }
	    }
	    D[b >> 2] = c;
	  } else {
	    S(1281);
	  }
	}
	function Yd(a, b) {
	  Xd(a, b);
	}
	var $d = a => {
	  var b = hb(a) + 1, c = Zd(b);
	  c && ib(a, x, c, b);
	  return c;
	};
	function ae(a) {
	  return "]" == a.slice(-1) && a.lastIndexOf("[");
	}
	function be(a) {
	  a -= 5120;
	  return 0 == a ? v : 1 == a ? x : 2 == a ? A : 4 == a ? D : 6 == a ? F : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? E : za;
	}
	function ce(a, b, c, d, e) {
	  a = be(a);
	  var f = 31 - Math.clz32(a.BYTES_PER_ELEMENT), g = Od;
	  return a.subarray(e >> f, e + d * (c * ({5:3, 6:4, 8:2, 29502:3, 29504:4, 26917:2, 26918:2, 29846:3, 29847:4}[b - 6402] || 1) * (1 << f) + g - 1 & -g) >> f);
	}
	function V(a) {
	  var b = U.Gb;
	  if (b) {
	    var c = b.ma[a];
	    "number" == typeof c && (b.ma[a] = c = U.getUniformLocation(b, b.tb[a] + (0 < c ? "[" + c + "]" : "")));
	    return c;
	  }
	  S(1282);
	}
	var de = [], ee = [], fe = {}, he = () => {
	  if (!ge) {
	    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:na || "./this.program"}, b;
	    for (b in fe) {
	      void 0 === fe[b] ? delete a[b] : a[b] = fe[b];
	    }
	    var c = [];
	    for (b in a) {
	      c.push(`${b}=${a[b]}`);
	    }
	    ge = c;
	  }
	  return ge;
	}, ge, ie = a => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), je = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ke = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], le = (a, b, c, d) => {
	  function e(q, r, u) {
	    for (q = "number" == typeof q ? q.toString() : q || ""; q.length < r;) {
	      q = u[0] + q;
	    }
	    return q;
	  }
	  function f(q, r) {
	    return e(q, r, "0");
	  }
	  function g(q, r) {
	    function u(B) {
	      return 0 > B ? -1 : 0 < B ? 1 : 0;
	    }
	    var z;
	    0 === (z = u(q.getFullYear() - r.getFullYear())) && 0 === (z = u(q.getMonth() - r.getMonth())) && (z = u(q.getDate() - r.getDate()));
	    return z;
	  }
	  function k(q) {
	    switch(q.getDay()) {
	      case 0:
	        return new Date(q.getFullYear() - 1, 11, 29);
	      case 1:
	        return q;
	      case 2:
	        return new Date(q.getFullYear(), 0, 3);
	      case 3:
	        return new Date(q.getFullYear(), 0, 2);
	      case 4:
	        return new Date(q.getFullYear(), 0, 1);
	      case 5:
	        return new Date(q.getFullYear() - 1, 11, 31);
	      case 6:
	        return new Date(q.getFullYear() - 1, 11, 30);
	    }
	  }
	  function p(q) {
	    var r = q.aa;
	    for (q = new Date((new Date(q.ba + 1900, 0, 1)).getTime()); 0 < r;) {
	      var u = q.getMonth(), z = (ie(q.getFullYear()) ? je : ke)[u];
	      if (r > z - q.getDate()) {
	        r -= z - q.getDate() + 1, q.setDate(1), 11 > u ? q.setMonth(u + 1) : (q.setMonth(0), q.setFullYear(q.getFullYear() + 1));
	      } else {
	        q.setDate(q.getDate() + r);
	        break;
	      }
	    }
	    u = new Date(q.getFullYear() + 1, 0, 4);
	    r = k(new Date(q.getFullYear(), 0, 4));
	    u = k(u);
	    return 0 >= g(r, q) ? 0 >= g(u, q) ? q.getFullYear() + 1 : q.getFullYear() : q.getFullYear() - 1;
	  }
	  var n = D[d + 40 >> 2];
	  d = {lc:D[d >> 2], kc:D[d + 4 >> 2], Ha:D[d + 8 >> 2], Ra:D[d + 12 >> 2], Ia:D[d + 16 >> 2], ba:D[d + 20 >> 2], P:D[d + 24 >> 2], aa:D[d + 28 >> 2], Jc:D[d + 32 >> 2], jc:D[d + 36 >> 2], mc:n ? n ? fb(x, n) : "" : ""};
	  c = c ? fb(x, c) : "";
	  n = {"%c":"%a %b %d %H:%M:%S %Y", "%D":"%m/%d/%y", "%F":"%Y-%m-%d", "%h":"%b", "%r":"%I:%M:%S %p", "%R":"%H:%M", "%T":"%H:%M:%S", "%x":"%m/%d/%y", "%X":"%H:%M:%S", "%Ec":"%c", "%EC":"%C", "%Ex":"%m/%d/%y", "%EX":"%H:%M:%S", "%Ey":"%y", "%EY":"%Y", "%Od":"%d", "%Oe":"%e", "%OH":"%H", "%OI":"%I", "%Om":"%m", "%OM":"%M", "%OS":"%S", "%Ou":"%u", "%OU":"%U", "%OV":"%V", "%Ow":"%w", "%OW":"%W", "%Oy":"%y",};
	  for (var t in n) {
	    c = c.replace(new RegExp(t, "g"), n[t]);
	  }
	  var w = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), y = "January February March April May June July August September October November December".split(" ");
	  n = {"%a":q => w[q.P].substring(0, 3), "%A":q => w[q.P], "%b":q => y[q.Ia].substring(0, 3), "%B":q => y[q.Ia], "%C":q => f((q.ba + 1900) / 100 | 0, 2), "%d":q => f(q.Ra, 2), "%e":q => e(q.Ra, 2, " "), "%g":q => p(q).toString().substring(2), "%G":q => p(q), "%H":q => f(q.Ha, 2), "%I":q => {
	    q = q.Ha;
	    0 == q ? q = 12 : 12 < q && (q -= 12);
	    return f(q, 2);
	  }, "%j":q => {
	    for (var r = 0, u = 0; u <= q.Ia - 1; r += (ie(q.ba + 1900) ? je : ke)[u++]) {
	    }
	    return f(q.Ra + r, 3);
	  }, "%m":q => f(q.Ia + 1, 2), "%M":q => f(q.kc, 2), "%n":() => "\n", "%p":q => 0 <= q.Ha && 12 > q.Ha ? "AM" : "PM", "%S":q => f(q.lc, 2), "%t":() => "\t", "%u":q => q.P || 7, "%U":q => f(Math.floor((q.aa + 7 - q.P) / 7), 2), "%V":q => {
	    var r = Math.floor((q.aa + 7 - (q.P + 6) % 7) / 7);
	    2 >= (q.P + 371 - q.aa - 2) % 7 && r++;
	    if (r) {
	      53 == r && (u = (q.P + 371 - q.aa) % 7, 4 == u || 3 == u && ie(q.ba) || (r = 1));
	    } else {
	      r = 52;
	      var u = (q.P + 7 - q.aa - 1) % 7;
	      (4 == u || 5 == u && ie(q.ba % 400 - 1)) && r++;
	    }
	    return f(r, 2);
	  }, "%w":q => q.P, "%W":q => f(Math.floor((q.aa + 7 - (q.P + 6) % 7) / 7), 2), "%y":q => (q.ba + 1900).toString().substring(2), "%Y":q => q.ba + 1900, "%z":q => {
	    q = q.jc;
	    var r = 0 <= q;
	    q = Math.abs(q) / 60;
	    return (r ? "+" : "-") + String("0000" + (q / 60 * 100 + q % 60)).slice(-4);
	  }, "%Z":q => q.mc, "%%":() => "%"};
	  c = c.replace(/%%/g, "\x00\x00");
	  for (t in n) {
	    c.includes(t) && (c = c.replace(new RegExp(t, "g"), n[t](d)));
	  }
	  c = c.replace(/\0\0/g, "%");
	  t = jb(c, false);
	  if (t.length > b) {
	    return 0;
	  }
	  v.set(t, a);
	  return t.length - 1;
	};
	function Jb(a, b, c, d) {
	  a || (a = this);
	  this.parent = a;
	  this.S = a.S;
	  this.Ba = null;
	  this.id = Ab++;
	  this.name = b;
	  this.mode = c;
	  this.l = {};
	  this.m = {};
	  this.Da = d;
	}
	Object.defineProperties(Jb.prototype, {read:{get:function() {
	  return 365 === (this.mode & 365);
	}, set:function(a) {
	  a ? this.mode |= 365 : this.mode &= -366;
	}}, write:{get:function() {
	  return 146 === (this.mode & 146);
	}, set:function(a) {
	  a ? this.mode |= 146 : this.mode &= -147;
	}}});
	Xb();
	Bb = Array(4096);
	Qb(H, "/");
	Rb("/tmp", 16895, 0);
	Rb("/home", 16895, 0);
	Rb("/home/web_user", 16895, 0);
	(() => {
	  Rb("/dev", 16895, 0);
	  mb(259, {read:() => 0, write:(d, e, f, g) => g,});
	  Sb("/dev/null", 259);
	  lb(1280, ob);
	  lb(1536, pb);
	  Sb("/dev/tty", 1280);
	  Sb("/dev/tty1", 1536);
	  var a = new Uint8Array(1024), b = 0, c = () => {
	    0 === b && (b = cb(a).byteLength);
	    return a[--b];
	  };
	  $b("random", c);
	  $b("urandom", c);
	  Rb("/dev/shm", 16895, 0);
	  Rb("/dev/shm/tmp", 16895, 0);
	})();
	(() => {
	  Rb("/proc", 16895, 0);
	  var a = Rb("/proc/self", 16895, 0);
	  Rb("/proc/self/fd", 16895, 0);
	  Qb({S:() => {
	    var b = sb(a, "fd", 16895, 73);
	    b.l = {ka:(c, d) => {
	      var e = Nb(+d);
	      c = {parent:null, S:{ib:"fake"}, l:{la:() => e.path},};
	      return c.parent = c;
	    }};
	    return b;
	  }}, "/proc/self/fd");
	})();
	Object.assign(fc.prototype, {get(a) {
	  return this.L[a];
	}, has(a) {
	  return void 0 !== this.L[a];
	}, ra(a) {
	  var b = this.cb.pop() || this.L.length;
	  this.L[b] = a;
	  return b;
	}, Sb(a) {
	  this.L[a] = void 0;
	  this.cb.push(a);
	}});
	gc = l.BindingError = class extends Error {
	  constructor(a) {
	    super(a);
	    this.name = "BindingError";
	  }
	};
	I.L.push({value:void 0}, {value:null}, {value:true}, {value:false},);
	I.h = I.L.length;
	l.count_emval_handles = function() {
	  for (var a = 0, b = I.h; b < I.L.length; ++b) {
	    void 0 !== I.L[b] && ++a;
	  }
	  return a;
	};
	kc = l.PureVirtualError = jc("PureVirtualError");
	for (var me = Array(256), ne = 0; 256 > ne; ++ne) {
	  me[ne] = String.fromCharCode(ne);
	}
	lc = me;
	l.getInheritedInstanceCount = function() {
	  return Object.keys(pc).length;
	};
	l.getLiveInheritedInstances = function() {
	  var a = [], b;
	  for (b in pc) {
	    pc.hasOwnProperty(b) && a.push(pc[b]);
	  }
	  return a;
	};
	l.flushPendingDeletes = nc;
	l.setDelayFunction = function(a) {
	  oc = a;
	  mc.length && oc && oc(nc);
	};
	Cc = l.InternalError = class extends Error {
	  constructor(a) {
	    super(a);
	    this.name = "InternalError";
	  }
	};
	Pc.prototype.isAliasOf = function(a) {
	  if (!(this instanceof Pc && a instanceof Pc)) {
	    return false;
	  }
	  var b = this.g.u.i, c = this.g.o, d = a.g.u.i;
	  for (a = a.g.o; b.A;) {
	    c = b.na(c), b = b.A;
	  }
	  for (; d.A;) {
	    a = d.na(a), d = d.A;
	  }
	  return b === d && c === a;
	};
	Pc.prototype.clone = function() {
	  this.g.o || Oc(this);
	  if (this.g.ia) {
	    return this.g.count.value += 1, this;
	  }
	  var a = Fc, b = Object, c = b.create, d = Object.getPrototypeOf(this), e = this.g;
	  a = a(c.call(b, d, {g:{value:{count:e.count, ga:e.ga, ia:e.ia, o:e.o, u:e.u, G:e.G, K:e.K,},}}));
	  a.g.count.value += 1;
	  a.g.ga = false;
	  return a;
	};
	Pc.prototype["delete"] = function() {
	  this.g.o || Oc(this);
	  this.g.ga && !this.g.ia && K("Object already scheduled for deletion");
	  wc(this);
	  yc(this.g);
	  this.g.ia || (this.g.G = void 0, this.g.o = void 0);
	};
	Pc.prototype.isDeleted = function() {
	  return !this.g.o;
	};
	Pc.prototype.deleteLater = function() {
	  this.g.o || Oc(this);
	  this.g.ga && !this.g.ia && K("Object already scheduled for deletion");
	  mc.push(this);
	  1 === mc.length && oc && oc(nc);
	  this.g.ga = true;
	  return this;
	};
	Yc.prototype.Ob = function(a) {
	  this.nb && (a = this.nb(a));
	  return a;
	};
	Yc.prototype.Xa = function(a) {
	  this.U && this.U(a);
	};
	Yc.prototype.argPackAdvance = 8;
	Yc.prototype.readValueFromPointer = Ic;
	Yc.prototype.deleteObject = function(a) {
	  if (null !== a) {
	    a["delete"]();
	  }
	};
	Yc.prototype.fromWireType = function(a) {
	  function b() {
	    return this.wa ? Ec(this.i.M, {u:this.bc, o:c, K:this, G:a,}) : Ec(this.i.M, {u:this, o:a,});
	  }
	  var c = this.Ob(a);
	  if (!c) {
	    return this.Xa(a), null;
	  }
	  var d = Bc(this.i, c);
	  if (void 0 !== d) {
	    if (0 === d.g.count.value) {
	      return d.g.o = c, d.g.G = a, d.clone();
	    }
	    d = d.clone();
	    this.Xa(a);
	    return d;
	  }
	  d = this.i.Nb(c);
	  d = Ac[d];
	  if (!d) {
	    return b.call(this);
	  }
	  d = this.va ? d.Fb : d.pointerType;
	  var e = zc(c, this.i, d.i);
	  return null === e ? b.call(this) : this.wa ? Ec(d.i.M, {u:d, o:e, K:this, G:a,}) : Ec(d.i.M, {u:d, o:e,});
	};
	bd = l.UnboundTypeError = jc("UnboundTypeError");
	for (var U, W = 0; 32 > W; ++W) {
	  Td.push(Array(W));
	}
	var oe = new Float32Array(288);
	for (W = 0; 288 > W; ++W) {
	  de[W] = oe.subarray(0, W + 1);
	}
	var pe = new Int32Array(288);
	for (W = 0; 288 > W; ++W) {
	  ee[W] = pe.subarray(0, W + 1);
	}
	var Ge = {__syscall_fcntl64:function(a, b, c) {
	  bc = c;
	  try {
	    var d = Nb(a);
	    switch(b) {
	      case 0:
	        var e = cc();
	        return 0 > e ? -28 : Pb(d, e).V;
	      case 1:
	      case 2:
	        return 0;
	      case 3:
	        return d.flags;
	      case 4:
	        return e = cc(), d.flags |= e, 0;
	      case 5:
	        return e = cc(), A[e + 0 >> 1] = 2, 0;
	      case 6:
	      case 7:
	        return 0;
	      case 16:
	      case 8:
	        return -28;
	      case 9:
	        return D[qe() >> 2] = 28, -1;
	      default:
	        return -28;
	    }
	  } catch (f) {
	    if ("undefined" == typeof ac || "ErrnoError" !== f.name) {
	      throw f;
	    }
	    return -f.Z;
	  }
	}, __syscall_ioctl:function(a, b, c) {
	  bc = c;
	  try {
	    var d = Nb(a);
	    switch(b) {
	      case 21509:
	        return d.s ? 0 : -59;
	      case 21505:
	        if (!d.s) {
	          return -59;
	        }
	        if (d.s.T.Wb) {
	          b = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
	          var e = cc();
	          D[e >> 2] = 25856;
	          D[e + 4 >> 2] = 5;
	          D[e + 8 >> 2] = 191;
	          D[e + 12 >> 2] = 35387;
	          for (var f = 0; 32 > f; f++) {
	            v[e + f + 17 >> 0] = b[f] || 0;
	          }
	        }
	        return 0;
	      case 21510:
	      case 21511:
	      case 21512:
	        return d.s ? 0 : -59;
	      case 21506:
	      case 21507:
	      case 21508:
	        if (!d.s) {
	          return -59;
	        }
	        if (d.s.T.Xb) {
	          for (e = cc(), b = [], f = 0; 32 > f; f++) {
	            b.push(v[e + f + 17 >> 0]);
	          }
	        }
	        return 0;
	      case 21519:
	        if (!d.s) {
	          return -59;
	        }
	        e = cc();
	        return D[e >> 2] = 0;
	      case 21520:
	        return d.s ? -28 : -59;
	      case 21531:
	        e = cc();
	        if (!d.m.Vb) {
	          throw new G(59);
	        }
	        return d.m.Vb(d, b, e);
	      case 21523:
	        if (!d.s) {
	          return -59;
	        }
	        d.s.T.Yb && (f = [24, 80], e = cc(), A[e >> 1] = f[0], A[e + 2 >> 1] = f[1]);
	        return 0;
	      case 21524:
	        return d.s ? 0 : -59;
	      case 21515:
	        return d.s ? 0 : -59;
	      default:
	        return -28;
	    }
	  } catch (g) {
	    if ("undefined" == typeof ac || "ErrnoError" !== g.name) {
	      throw g;
	    }
	    return -g.Z;
	  }
	}, __syscall_openat:function(a, b, c, d) {
	  bc = d;
	  try {
	    b = b ? fb(x, b) : "";
	    var e = b;
	    if ("/" === e.charAt(0)) {
	      b = e;
	    } else {
	      var f = -100 === a ? "/" : Nb(a).path;
	      if (0 == e.length) {
	        throw new G(44);
	      }
	      b = Za(f + "/" + e);
	    }
	    var g = d ? cc() : 0;
	    return Vb(b, c, g).V;
	  } catch (k) {
	    if ("undefined" == typeof ac || "ErrnoError" !== k.name) {
	      throw k;
	    }
	    return -k.Z;
	  }
	}, _embind_create_inheriting_constructor:function(a, b, c) {
	  a = L(a);
	  b = vc(b, "wrapper");
	  c = hc(c);
	  var d = [].slice, e = b.i, f = e.M, g = e.A.M, k = e.A.constructor;
	  a = ec(a, function() {
	    e.A.mb.forEach(function(n) {
	      if (this[n] === g[n]) {
	        throw new kc(`Pure virtual function ${n} must be implemented in JavaScript`);
	      }
	    }.bind(this));
	    Object.defineProperty(this, "__parent", {value:f});
	    this.__construct.apply(this, d.call(arguments));
	  });
	  f.__construct = function() {
	    this === f && K("Pass correct 'this' to __construct");
	    var n = k.implement.apply(void 0, [this].concat(d.call(arguments)));
	    wc(n);
	    var t = n.g;
	    n.notifyOnDestruction();
	    t.ia = true;
	    Object.defineProperties(this, {g:{value:t}});
	    Fc(this);
	    n = t.o;
	    n = qc(e, n);
	    pc.hasOwnProperty(n) ? K(`Tried to register registered instance: ${n}`) : pc[n] = this;
	  };
	  f.__destruct = function() {
	    this === f && K("Pass correct 'this' to __destruct");
	    wc(this);
	    var n = this.g.o;
	    n = qc(e, n);
	    pc.hasOwnProperty(n) ? delete pc[n] : K(`Tried to unregister unregistered instance: ${n}`);
	  };
	  a.prototype = Object.create(f);
	  for (var p in c) {
	    a.prototype[p] = c[p];
	  }
	  return ic(a);
	}, _embind_finalize_value_object:function(a) {
	  var b = Gc[a];
	  delete Gc[a];
	  var c = b.Pa, d = b.U, e = b.$a, f = e.map(g => g.Rb).concat(e.map(g => g.fc));
	  N([a], f, g => {
	    var k = {};
	    e.forEach((p, n) => {
	      var t = g[n], w = p.Pb, y = p.Qb, q = g[n + e.length], r = p.ec, u = p.hc;
	      k[p.Lb] = {read:z => t.fromWireType(w(y, z)), write:(z, B) => {
	        var C = [];
	        r(u, z, q.toWireType(C, B));
	        Hc(C);
	      }};
	    });
	    return [{name:b.name, fromWireType:function(p) {
	      var n = {}, t;
	      for (t in k) {
	        n[t] = k[t].read(p);
	      }
	      d(p);
	      return n;
	    }, toWireType:function(p, n) {
	      for (var t in k) {
	        if (!(t in n)) {
	          throw new TypeError(`Missing field: "${t}"`);
	        }
	      }
	      var w = c();
	      for (t in k) {
	        k[t].write(w, n[t]);
	      }
	      null !== p && p.push(d, w);
	      return w;
	    }, argPackAdvance:8, readValueFromPointer:Ic, J:d,}];
	  });
	}, _embind_register_bigint:function() {
	}, _embind_register_bool:function(a, b, c, d, e) {
	  var f = Mc(c);
	  b = L(b);
	  Lc(a, {name:b, fromWireType:function(g) {
	    return !!g;
	  }, toWireType:function(g, k) {
	    return k ? d : e;
	  }, argPackAdvance:8, readValueFromPointer:function(g) {
	    if (1 === c) {
	      var k = v;
	    } else if (2 === c) {
	      k = A;
	    } else if (4 === c) {
	      k = D;
	    } else {
	      throw new TypeError("Unknown boolean type size: " + b);
	    }
	    return this.fromWireType(k[g >> f]);
	  }, J:null,});
	}, _embind_register_class:function(a, b, c, d, e, f, g, k, p, n, t, w, y) {
	  t = L(t);
	  f = R(e, f);
	  k && (k = R(g, k));
	  n && (n = R(p, n));
	  y = R(w, y);
	  var q = dc(t);
	  Rc(q, function() {
	    cd(`Cannot construct ${t} due to unbound types`, [d]);
	  });
	  N([a, b, c], d ? [d] : [], function(r) {
	    r = r[0];
	    if (d) {
	      var u = r.i;
	      var z = u.M;
	    } else {
	      z = Pc.prototype;
	    }
	    r = ec(q, function() {
	      if (Object.getPrototypeOf(this) !== B) {
	        throw new gc("Use 'new' to construct " + t);
	      }
	      if (void 0 === C.Y) {
	        throw new gc(t + " has no accessible constructor");
	      }
	      var M = C.Y[arguments.length];
	      if (void 0 === M) {
	        throw new gc(`Tried to invoke ctor of ${t} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(C.Y).toString()}) parameters instead!`);
	      }
	      return M.apply(this, arguments);
	    });
	    var B = Object.create(z, {constructor:{value:r},});
	    r.prototype = B;
	    var C = new Sc(t, r, B, y, u, f, k, n);
	    C.A && (void 0 === C.A.oa && (C.A.oa = []), C.A.oa.push(C));
	    u = new Yc(t, C, true, false);
	    z = new Yc(t + "*", C, false, false);
	    var O = new Yc(t + " const*", C, false, true);
	    Ac[a] = {pointerType:z, Fb:O};
	    Zc(q, r);
	    return [u, z, O];
	  });
	}, _embind_register_class_class_function:function(a, b, c, d, e, f, g) {
	  var k = ed(c, d);
	  b = L(b);
	  f = R(e, f);
	  N([], [a], function(p) {
	    function n() {
	      cd(`Cannot call ${t} due to unbound types`, k);
	    }
	    p = p[0];
	    var t = `${p.name}.${b}`;
	    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
	    var w = p.i.constructor;
	    void 0 === w[b] ? (n.ea = c - 1, w[b] = n) : (Qc(w, b, t), w[b].B[c - 1] = n);
	    N([], k, function(y) {
	      y = dd(t, [y[0], null].concat(y.slice(1)), null, f, g);
	      void 0 === w[b].B ? (y.ea = c - 1, w[b] = y) : w[b].B[c - 1] = y;
	      if (p.i.oa) {
	        for (const q of p.i.oa) {
	          q.constructor.hasOwnProperty(b) || (q.constructor[b] = y);
	        }
	      }
	      return [];
	    });
	    return [];
	  });
	}, _embind_register_class_class_property:function(a, b, c, d, e, f, g, k) {
	  b = L(b);
	  f = R(e, f);
	  N([], [a], function(p) {
	    p = p[0];
	    var n = `${p.name}.${b}`, t = {get() {
	      cd(`Cannot access ${n} due to unbound types`, [c]);
	    }, enumerable:true, configurable:true};
	    t.set = k ? () => {
	      cd(`Cannot access ${n} due to unbound types`, [c]);
	    } : () => {
	      K(`${n} is a read-only property`);
	    };
	    Object.defineProperty(p.i.constructor, b, t);
	    N([], [c], function(w) {
	      w = w[0];
	      var y = {get() {
	        return w.fromWireType(f(d));
	      }, enumerable:true};
	      k && (k = R(g, k), y.set = q => {
	        var r = [];
	        k(d, w.toWireType(r, q));
	        Hc(r);
	      });
	      Object.defineProperty(p.i.constructor, b, y);
	      return [];
	    });
	    return [];
	  });
	}, _embind_register_class_constructor:function(a, b, c, d, e, f) {
	  var g = ed(b, c);
	  e = R(d, e);
	  N([], [a], function(k) {
	    k = k[0];
	    var p = `constructor ${k.name}`;
	    void 0 === k.i.Y && (k.i.Y = []);
	    if (void 0 !== k.i.Y[b - 1]) {
	      throw new gc(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${k.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
	    }
	    k.i.Y[b - 1] = () => {
	      cd(`Cannot construct ${k.name} due to unbound types`, g);
	    };
	    N([], g, function(n) {
	      n.splice(1, 0, null);
	      k.i.Y[b - 1] = dd(p, n, null, e, f);
	      return [];
	    });
	    return [];
	  });
	}, _embind_register_class_function:function(a, b, c, d, e, f, g, k) {
	  var p = ed(c, d);
	  b = L(b);
	  f = R(e, f);
	  N([], [a], function(n) {
	    function t() {
	      cd(`Cannot call ${w} due to unbound types`, p);
	    }
	    n = n[0];
	    var w = `${n.name}.${b}`;
	    b.startsWith("@@") && (b = Symbol[b.substring(2)]);
	    k && n.i.mb.push(b);
	    var y = n.i.M, q = y[b];
	    void 0 === q || void 0 === q.B && q.className !== n.name && q.ea === c - 2 ? (t.ea = c - 2, t.className = n.name, y[b] = t) : (Qc(y, b, w), y[b].B[c - 2] = t);
	    N([], p, function(r) {
	      r = dd(w, r, n, f, g);
	      void 0 === y[b].B ? (r.ea = c - 2, y[b] = r) : y[b].B[c - 2] = r;
	      return [];
	    });
	    return [];
	  });
	}, _embind_register_class_property:function(a, b, c, d, e, f, g, k, p, n) {
	  b = L(b);
	  e = R(d, e);
	  N([], [a], function(t) {
	    t = t[0];
	    var w = `${t.name}.${b}`, y = {get() {
	      cd(`Cannot access ${w} due to unbound types`, [c, g]);
	    }, enumerable:true, configurable:true};
	    y.set = p ? () => {
	      cd(`Cannot access ${w} due to unbound types`, [c, g]);
	    } : () => {
	      K(w + " is a read-only property");
	    };
	    Object.defineProperty(t.i.M, b, y);
	    N([], p ? [c, g] : [c], function(q) {
	      var r = q[0], u = {get() {
	        var B = fd(this, t, w + " getter");
	        return r.fromWireType(e(f, B));
	      }, enumerable:true};
	      if (p) {
	        p = R(k, p);
	        var z = q[1];
	        u.set = function(B) {
	          var C = fd(this, t, w + " setter"), O = [];
	          p(n, C, z.toWireType(O, B));
	          Hc(O);
	        };
	      }
	      Object.defineProperty(t.i.M, b, u);
	      return [];
	    });
	    return [];
	  });
	}, _embind_register_emval:function(a, b) {
	  b = L(b);
	  Lc(a, {name:b, fromWireType:function(c) {
	    var d = hc(c);
	    gd(c);
	    return d;
	  }, toWireType:function(c, d) {
	    return ic(d);
	  }, argPackAdvance:8, readValueFromPointer:Ic, J:null,});
	}, _embind_register_enum:function(a, b, c, d) {
	  function e() {
	  }
	  c = Mc(c);
	  b = L(b);
	  e.values = {};
	  Lc(a, {name:b, constructor:e, fromWireType:function(f) {
	    return this.constructor.values[f];
	  }, toWireType:function(f, g) {
	    return g.value;
	  }, argPackAdvance:8, readValueFromPointer:hd(b, c, d), J:null,});
	  Rc(b, e);
	}, _embind_register_enum_value:function(a, b, c) {
	  var d = vc(a, "enum");
	  b = L(b);
	  a = d.constructor;
	  d = Object.create(d.constructor.prototype, {value:{value:c}, constructor:{value:ec(`${d.name}_${b}`, function() {
	  })},});
	  a.values[c] = d;
	  a[b] = d;
	}, _embind_register_float:function(a, b, c) {
	  c = Mc(c);
	  b = L(b);
	  Lc(a, {name:b, fromWireType:function(d) {
	    return d;
	  }, toWireType:function(d, e) {
	    return e;
	  }, argPackAdvance:8, readValueFromPointer:jd(b, c), J:null,});
	}, _embind_register_function:function(a, b, c, d, e, f) {
	  var g = ed(b, c);
	  a = L(a);
	  e = R(d, e);
	  Rc(a, function() {
	    cd(`Cannot call ${a} due to unbound types`, g);
	  }, b - 1);
	  N([], g, function(k) {
	    Zc(a, dd(a, [k[0], null].concat(k.slice(1)), null, e, f), b - 1);
	    return [];
	  });
	}, _embind_register_integer:function(a, b, c, d, e) {
	  b = L(b);
	  -1 === e && (e = 4294967295);
	  e = Mc(c);
	  var f = k => k;
	  if (0 === d) {
	    var g = 32 - 8 * c;
	    f = k => k << g >>> g;
	  }
	  c = b.includes("unsigned") ? function(k, p) {
	    return p >>> 0;
	  } : function(k, p) {
	    return p;
	  };
	  Lc(a, {name:b, fromWireType:f, toWireType:c, argPackAdvance:8, readValueFromPointer:kd(b, e, 0 !== d), J:null,});
	}, _embind_register_memory_view:function(a, b, c) {
	  function d(f) {
	    f >>= 2;
	    var g = E;
	    return new e(g.buffer, g[f + 1], g[f]);
	  }
	  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,][b];
	  c = L(c);
	  Lc(a, {name:c, fromWireType:d, argPackAdvance:8, readValueFromPointer:d,}, {Tb:true,});
	}, _embind_register_std_string:function(a, b) {
	  b = L(b);
	  var c = "std::string" === b;
	  Lc(a, {name:b, fromWireType:function(d) {
	    var e = E[d >> 2], f = d + 4;
	    if (c) {
	      for (var g = f, k = 0; k <= e; ++k) {
	        var p = f + k;
	        if (k == e || 0 == x[p]) {
	          g = g ? fb(x, g, p - g) : "";
	          if (void 0 === n) {
	            var n = g;
	          } else {
	            n += String.fromCharCode(0), n += g;
	          }
	          g = p + 1;
	        }
	      }
	    } else {
	      n = Array(e);
	      for (k = 0; k < e; ++k) {
	        n[k] = String.fromCharCode(x[f + k]);
	      }
	      n = n.join("");
	    }
	    uc(d);
	    return n;
	  }, toWireType:function(d, e) {
	    e instanceof ArrayBuffer && (e = new Uint8Array(e));
	    var f = "string" == typeof e;
	    f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || K("Cannot pass non-string to std::string");
	    var g = c && f ? hb(e) : e.length;
	    var k = Zd(4 + g + 1), p = k + 4;
	    E[k >> 2] = g;
	    if (c && f) {
	      ib(e, x, p, g + 1);
	    } else {
	      if (f) {
	        for (f = 0; f < g; ++f) {
	          var n = e.charCodeAt(f);
	          255 < n && (uc(p), K("String has UTF-16 code units that do not fit in 8 bits"));
	          x[p + f] = n;
	        }
	      } else {
	        for (f = 0; f < g; ++f) {
	          x[p + f] = e[f];
	        }
	      }
	    }
	    null !== d && d.push(uc, k);
	    return k;
	  }, argPackAdvance:8, readValueFromPointer:Ic, J:function(d) {
	    uc(d);
	  },});
	}, _embind_register_std_wstring:function(a, b, c) {
	  c = L(c);
	  if (2 === b) {
	    var d = md;
	    var e = nd;
	    var f = od;
	    var g = () => za;
	    var k = 1;
	  } else {
	    4 === b && (d = pd, e = qd, f = rd, g = () => E, k = 2);
	  }
	  Lc(a, {name:c, fromWireType:function(p) {
	    for (var n = E[p >> 2], t = g(), w, y = p + 4, q = 0; q <= n; ++q) {
	      var r = p + 4 + q * b;
	      if (q == n || 0 == t[r >> k]) {
	        y = d(y, r - y), void 0 === w ? w = y : (w += String.fromCharCode(0), w += y), y = r + b;
	      }
	    }
	    uc(p);
	    return w;
	  }, toWireType:function(p, n) {
	    "string" != typeof n && K(`Cannot pass non-string to C++ string type ${c}`);
	    var t = f(n), w = Zd(4 + t + b);
	    E[w >> 2] = t >> k;
	    e(n, w + 4, t + b);
	    null !== p && p.push(uc, w);
	    return w;
	  }, argPackAdvance:8, readValueFromPointer:Ic, J:function(p) {
	    uc(p);
	  },});
	}, _embind_register_value_object:function(a, b, c, d, e, f) {
	  Gc[a] = {name:L(b), Pa:R(c, d), U:R(e, f), $a:[],};
	}, _embind_register_value_object_field:function(a, b, c, d, e, f, g, k, p, n) {
	  Gc[a].$a.push({Lb:L(b), Rb:c, Pb:R(d, e), Qb:f, fc:g, ec:R(k, p), hc:n,});
	}, _embind_register_void:function(a, b) {
	  b = L(b);
	  Lc(a, {Zb:true, name:b, argPackAdvance:0, fromWireType:function() {
	  }, toWireType:function() {
	  },});
	}, _emscripten_get_now_is_monotonic:() => true, _emscripten_throw_longjmp:() => {
	  throw Infinity;
	}, _emval_as:function(a, b, c) {
	  a = hc(a);
	  b = vc(b, "emval::as");
	  var d = [], e = ic(d);
	  E[c >> 2] = e;
	  return b.toWireType(d, a);
	}, _emval_call_method:function(a, b, c, d, e) {
	  a = ud[a];
	  b = hc(b);
	  c = td(c);
	  var f = [];
	  E[d >> 2] = ic(f);
	  return a(b, c, f, e);
	}, _emval_call_void_method:function(a, b, c, d) {
	  a = ud[a];
	  b = hc(b);
	  c = td(c);
	  a(b, c, null, d);
	}, _emval_decref:gd, _emval_get_method_caller:function(a, b) {
	  var c = wd(a, b), d = c[0];
	  b = d.name + "_$" + c.slice(1).map(function(g) {
	    return g.name;
	  }).join("_") + "$";
	  var e = xd[b];
	  if (void 0 !== e) {
	    return e;
	  }
	  var f = Array(a - 1);
	  e = vd((g, k, p, n) => {
	    for (var t = 0, w = 0; w < a - 1; ++w) {
	      f[w] = c[w + 1].readValueFromPointer(n + t), t += c[w + 1].argPackAdvance;
	    }
	    g = g[k].apply(g, f);
	    for (w = 0; w < a - 1; ++w) {
	      c[w + 1].Hb && c[w + 1].Hb(f[w]);
	    }
	    if (!d.Zb) {
	      return d.toWireType(p, g);
	    }
	  });
	  return xd[b] = e;
	}, _emval_get_property:function(a, b) {
	  a = hc(a);
	  b = hc(b);
	  return ic(a[b]);
	}, _emval_incref:function(a) {
	  4 < a && (I.get(a).pb += 1);
	}, _emval_new_cstring:function(a) {
	  return ic(td(a));
	}, _emval_new_object:function() {
	  return ic({});
	}, _emval_run_destructors:function(a) {
	  var b = hc(a);
	  Hc(b);
	  gd(a);
	}, _emval_set_property:function(a, b, c) {
	  a = hc(a);
	  b = hc(b);
	  c = hc(c);
	  a[b] = c;
	}, _emval_take_value:function(a, b) {
	  a = vc(a, "_emval_take_value");
	  a = a.readValueFromPointer(b);
	  return ic(a);
	}, abort:() => {
	  wa("");
	}, emscripten_asm_const_int:(a, b, c) => {
	  yd.length = 0;
	  var d;
	  for (c >>= 2; d = x[b++];) {
	    c += 105 != d & c, yd.push(105 == d ? D[c] : Aa[c++ >> 1]), ++c;
	  }
	  return Wa[a].apply(null, yd);
	}, emscripten_date_now:function() {
	  return Date.now();
	}, emscripten_get_now:() => performance.now(), emscripten_glActiveTexture:function(a) {
	  U.activeTexture(a);
	}, emscripten_glAttachShader:function(a, b) {
	  U.attachShader(Ed[a], Id[b]);
	}, emscripten_glBindAttribLocation:function(a, b, c) {
	  U.bindAttribLocation(Ed[a], b, c ? fb(x, c) : "");
	}, emscripten_glBindBuffer:function(a, b) {
	  35051 == a ? U.Ka = b : 35052 == a && (U.fa = b);
	  U.bindBuffer(a, Dd[b]);
	}, emscripten_glBindFramebuffer:Qd, emscripten_glBindRenderbuffer:function(a, b) {
	  U.bindRenderbuffer(a, Gd[b]);
	}, emscripten_glBindSampler:function(a, b) {
	  U.bindSampler(a, Kd[b]);
	}, emscripten_glBindTexture:function(a, b) {
	  U.bindTexture(a, Hd[b]);
	}, emscripten_glBindVertexArray:Rd, emscripten_glBindVertexArrayOES:Rd, emscripten_glBlendColor:function(a, b, c, d) {
	  U.blendColor(a, b, c, d);
	}, emscripten_glBlendEquation:function(a) {
	  U.blendEquation(a);
	}, emscripten_glBlendFunc:function(a, b) {
	  U.blendFunc(a, b);
	}, emscripten_glBlitFramebuffer:function(a, b, c, d, e, f, g, k, p, n) {
	  U.blitFramebuffer(a, b, c, d, e, f, g, k, p, n);
	}, emscripten_glBufferData:function(a, b, c, d) {
	  2 <= T.version ? c && b ? U.bufferData(a, x, d, c, b) : U.bufferData(a, b, d) : U.bufferData(a, c ? x.subarray(c, c + b) : b, d);
	}, emscripten_glBufferSubData:function(a, b, c, d) {
	  2 <= T.version ? c && U.bufferSubData(a, b, x, d, c) : U.bufferSubData(a, b, x.subarray(d, d + c));
	}, emscripten_glCheckFramebufferStatus:function(a) {
	  return U.checkFramebufferStatus(a);
	}, emscripten_glClear:function(a) {
	  U.clear(a);
	}, emscripten_glClearColor:function(a, b, c, d) {
	  U.clearColor(a, b, c, d);
	}, emscripten_glClearStencil:function(a) {
	  U.clearStencil(a);
	}, emscripten_glClientWaitSync:function(a, b, c, d) {
	  return U.clientWaitSync(Ld[a], b, (c >>> 0) + 4294967296 * d);
	}, emscripten_glColorMask:function(a, b, c, d) {
	  U.colorMask(!!a, !!b, !!c, !!d);
	}, emscripten_glCompileShader:function(a) {
	  U.compileShader(Id[a]);
	}, emscripten_glCompressedTexImage2D:function(a, b, c, d, e, f, g, k) {
	  2 <= T.version ? U.fa || !g ? U.compressedTexImage2D(a, b, c, d, e, f, g, k) : U.compressedTexImage2D(a, b, c, d, e, f, x, k, g) : U.compressedTexImage2D(a, b, c, d, e, f, k ? x.subarray(k, k + g) : null);
	}, emscripten_glCompressedTexSubImage2D:function(a, b, c, d, e, f, g, k, p) {
	  2 <= T.version ? U.fa || !k ? U.compressedTexSubImage2D(a, b, c, d, e, f, g, k, p) : U.compressedTexSubImage2D(a, b, c, d, e, f, g, x, p, k) : U.compressedTexSubImage2D(a, b, c, d, e, f, g, p ? x.subarray(p, p + k) : null);
	}, emscripten_glCopyTexSubImage2D:function(a, b, c, d, e, f, g, k) {
	  U.copyTexSubImage2D(a, b, c, d, e, f, g, k);
	}, emscripten_glCreateProgram:function() {
	  var a = ha(Ed), b = U.createProgram();
	  b.name = a;
	  b.za = b.xa = b.ya = 0;
	  b.Sa = 1;
	  Ed[a] = b;
	  return a;
	}, emscripten_glCreateShader:function(a) {
	  var b = ha(Id);
	  Id[b] = U.createShader(a);
	  return b;
	}, emscripten_glCullFace:function(a) {
	  U.cullFace(a);
	}, emscripten_glDeleteBuffers:function(a, b) {
	  for (var c = 0; c < a; c++) {
	    var d = D[b + 4 * c >> 2], e = Dd[d];
	    e && (U.deleteBuffer(e), e.name = 0, Dd[d] = null, d == U.Ka && (U.Ka = 0), d == U.fa && (U.fa = 0));
	  }
	}, emscripten_glDeleteFramebuffers:function(a, b) {
	  for (var c = 0; c < a; ++c) {
	    var d = D[b + 4 * c >> 2], e = Fd[d];
	    e && (U.deleteFramebuffer(e), e.name = 0, Fd[d] = null);
	  }
	}, emscripten_glDeleteProgram:function(a) {
	  if (a) {
	    var b = Ed[a];
	    b ? (U.deleteProgram(b), b.name = 0, Ed[a] = null) : S(1281);
	  }
	}, emscripten_glDeleteRenderbuffers:function(a, b) {
	  for (var c = 0; c < a; c++) {
	    var d = D[b + 4 * c >> 2], e = Gd[d];
	    e && (U.deleteRenderbuffer(e), e.name = 0, Gd[d] = null);
	  }
	}, emscripten_glDeleteSamplers:function(a, b) {
	  for (var c = 0; c < a; c++) {
	    var d = D[b + 4 * c >> 2], e = Kd[d];
	    e && (U.deleteSampler(e), e.name = 0, Kd[d] = null);
	  }
	}, emscripten_glDeleteShader:function(a) {
	  if (a) {
	    var b = Id[a];
	    b ? (U.deleteShader(b), Id[a] = null) : S(1281);
	  }
	}, emscripten_glDeleteSync:function(a) {
	  if (a) {
	    var b = Ld[a];
	    b ? (U.deleteSync(b), b.name = 0, Ld[a] = null) : S(1281);
	  }
	}, emscripten_glDeleteTextures:function(a, b) {
	  for (var c = 0; c < a; c++) {
	    var d = D[b + 4 * c >> 2], e = Hd[d];
	    e && (U.deleteTexture(e), e.name = 0, Hd[d] = null);
	  }
	}, emscripten_glDeleteVertexArrays:Sd, emscripten_glDeleteVertexArraysOES:Sd, emscripten_glDepthMask:function(a) {
	  U.depthMask(!!a);
	}, emscripten_glDisable:function(a) {
	  U.disable(a);
	}, emscripten_glDisableVertexAttribArray:function(a) {
	  U.disableVertexAttribArray(a);
	}, emscripten_glDrawArrays:function(a, b, c) {
	  U.drawArrays(a, b, c);
	}, emscripten_glDrawArraysInstanced:function(a, b, c, d) {
	  U.drawArraysInstanced(a, b, c, d);
	}, emscripten_glDrawArraysInstancedBaseInstanceWEBGL:function(a, b, c, d, e) {
	  U.Ya.drawArraysInstancedBaseInstanceWEBGL(a, b, c, d, e);
	}, emscripten_glDrawBuffers:function(a, b) {
	  for (var c = Td[a], d = 0; d < a; d++) {
	    c[d] = D[b + 4 * d >> 2];
	  }
	  U.drawBuffers(c);
	}, emscripten_glDrawElements:Ud, emscripten_glDrawElementsInstanced:function(a, b, c, d, e) {
	  U.drawElementsInstanced(a, b, c, d, e);
	}, emscripten_glDrawElementsInstancedBaseVertexBaseInstanceWEBGL:function(a, b, c, d, e, f, g) {
	  U.Ya.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, d, e, f, g);
	}, emscripten_glDrawRangeElements:function(a, b, c, d, e, f) {
	  Ud(a, d, e, f);
	}, emscripten_glEnable:function(a) {
	  U.enable(a);
	}, emscripten_glEnableVertexAttribArray:function(a) {
	  U.enableVertexAttribArray(a);
	}, emscripten_glFenceSync:function(a, b) {
	  return (a = U.fenceSync(a, b)) ? (b = ha(Ld), a.name = b, Ld[b] = a, b) : 0;
	}, emscripten_glFinish:function() {
	  U.finish();
	}, emscripten_glFlush:function() {
	  U.flush();
	}, emscripten_glFramebufferRenderbuffer:function(a, b, c, d) {
	  U.framebufferRenderbuffer(a, b, c, Gd[d]);
	}, emscripten_glFramebufferTexture2D:function(a, b, c, d, e) {
	  U.framebufferTexture2D(a, b, c, Hd[d], e);
	}, emscripten_glFrontFace:function(a) {
	  U.frontFace(a);
	}, emscripten_glGenBuffers:function(a, b) {
	  Vd(a, b, "createBuffer", Dd);
	}, emscripten_glGenFramebuffers:function(a, b) {
	  Vd(a, b, "createFramebuffer", Fd);
	}, emscripten_glGenRenderbuffers:function(a, b) {
	  Vd(a, b, "createRenderbuffer", Gd);
	}, emscripten_glGenSamplers:function(a, b) {
	  Vd(a, b, "createSampler", Kd);
	}, emscripten_glGenTextures:function(a, b) {
	  Vd(a, b, "createTexture", Hd);
	}, emscripten_glGenVertexArrays:Wd, emscripten_glGenVertexArraysOES:Wd, emscripten_glGenerateMipmap:function(a) {
	  U.generateMipmap(a);
	}, emscripten_glGetBufferParameteriv:function(a, b, c) {
	  c ? D[c >> 2] = U.getBufferParameter(a, b) : S(1281);
	}, emscripten_glGetError:function() {
	  var a = U.getError() || Pd;
	  Pd = 0;
	  return a;
	}, emscripten_glGetFramebufferAttachmentParameteriv:function(a, b, c, d) {
	  a = U.getFramebufferAttachmentParameter(a, b, c);
	  if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) {
	    a = a.name | 0;
	  }
	  D[d >> 2] = a;
	}, emscripten_glGetIntegerv:Yd, emscripten_glGetProgramInfoLog:function(a, b, c, d) {
	  a = U.getProgramInfoLog(Ed[a]);
	  null === a && (a = "(unknown error)");
	  b = 0 < b && d ? ib(a, x, d, b) : 0;
	  c && (D[c >> 2] = b);
	}, emscripten_glGetProgramiv:function(a, b, c) {
	  if (c) {
	    if (a >= Cd) {
	      S(1281);
	    } else {
	      if (a = Ed[a], 35716 == b) {
	        a = U.getProgramInfoLog(a), null === a && (a = "(unknown error)"), D[c >> 2] = a.length + 1;
	      } else if (35719 == b) {
	        if (!a.za) {
	          for (b = 0; b < U.getProgramParameter(a, 35718); ++b) {
	            a.za = Math.max(a.za, U.getActiveUniform(a, b).name.length + 1);
	          }
	        }
	        D[c >> 2] = a.za;
	      } else if (35722 == b) {
	        if (!a.xa) {
	          for (b = 0; b < U.getProgramParameter(a, 35721); ++b) {
	            a.xa = Math.max(a.xa, U.getActiveAttrib(a, b).name.length + 1);
	          }
	        }
	        D[c >> 2] = a.xa;
	      } else if (35381 == b) {
	        if (!a.ya) {
	          for (b = 0; b < U.getProgramParameter(a, 35382); ++b) {
	            a.ya = Math.max(a.ya, U.getActiveUniformBlockName(a, b).length + 1);
	          }
	        }
	        D[c >> 2] = a.ya;
	      } else {
	        D[c >> 2] = U.getProgramParameter(a, b);
	      }
	    }
	  } else {
	    S(1281);
	  }
	}, emscripten_glGetRenderbufferParameteriv:function(a, b, c) {
	  c ? D[c >> 2] = U.getRenderbufferParameter(a, b) : S(1281);
	}, emscripten_glGetShaderInfoLog:function(a, b, c, d) {
	  a = U.getShaderInfoLog(Id[a]);
	  null === a && (a = "(unknown error)");
	  b = 0 < b && d ? ib(a, x, d, b) : 0;
	  c && (D[c >> 2] = b);
	}, emscripten_glGetShaderPrecisionFormat:function(a, b, c, d) {
	  a = U.getShaderPrecisionFormat(a, b);
	  D[c >> 2] = a.rangeMin;
	  D[c + 4 >> 2] = a.rangeMax;
	  D[d >> 2] = a.precision;
	}, emscripten_glGetShaderiv:function(a, b, c) {
	  c ? 35716 == b ? (a = U.getShaderInfoLog(Id[a]), null === a && (a = "(unknown error)"), D[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = U.getShaderSource(Id[a]), D[c >> 2] = a ? a.length + 1 : 0) : D[c >> 2] = U.getShaderParameter(Id[a], b) : S(1281);
	}, emscripten_glGetString:function(a) {
	  var b = Md[a];
	  if (!b) {
	    switch(a) {
	      case 7939:
	        b = U.getSupportedExtensions() || [];
	        b = b.concat(b.map(function(d) {
	          return "GL_" + d;
	        }));
	        b = $d(b.join(" "));
	        break;
	      case 7936:
	      case 7937:
	      case 37445:
	      case 37446:
	        (b = U.getParameter(a)) || S(1280);
	        b = b && $d(b);
	        break;
	      case 7938:
	        b = U.getParameter(7938);
	        b = 2 <= T.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";
	        b = $d(b);
	        break;
	      case 35724:
	        b = U.getParameter(35724);
	        var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
	        null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
	        b = $d(b);
	        break;
	      default:
	        S(1280);
	    }
	    Md[a] = b;
	  }
	  return b;
	}, emscripten_glGetStringi:function(a, b) {
	  if (2 > T.version) {
	    return S(1282), 0;
	  }
	  var c = Nd[a];
	  if (c) {
	    return 0 > b || b >= c.length ? (S(1281), 0) : c[b];
	  }
	  switch(a) {
	    case 7939:
	      return c = U.getSupportedExtensions() || [], c = c.concat(c.map(function(d) {
	        return "GL_" + d;
	      })), c = c.map(function(d) {
	        return $d(d);
	      }), c = Nd[a] = c, 0 > b || b >= c.length ? (S(1281), 0) : c[b];
	    default:
	      return S(1280), 0;
	  }
	}, emscripten_glGetUniformLocation:function(a, b) {
	  b = b ? fb(x, b) : "";
	  if (a = Ed[a]) {
	    var c = a, d = c.ma, e = c.ub, f;
	    if (!d) {
	      for (c.ma = d = {}, c.tb = {}, f = 0; f < U.getProgramParameter(c, 35718); ++f) {
	        var g = U.getActiveUniform(c, f);
	        var k = g.name;
	        g = g.size;
	        var p = ae(k);
	        p = 0 < p ? k.slice(0, p) : k;
	        var n = c.Sa;
	        c.Sa += g;
	        e[p] = [g, n];
	        for (k = 0; k < g; ++k) {
	          d[n] = k, c.tb[n++] = p;
	        }
	      }
	    }
	    c = a.ma;
	    d = 0;
	    e = b;
	    f = ae(b);
	    0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
	    if ((e = a.ub[e]) && d < e[0] && (d += e[1], c[d] = c[d] || U.getUniformLocation(a, b))) {
	      return d;
	    }
	  } else {
	    S(1281);
	  }
	  return -1;
	}, emscripten_glInvalidateFramebuffer:function(a, b, c) {
	  for (var d = Td[b], e = 0; e < b; e++) {
	    d[e] = D[c + 4 * e >> 2];
	  }
	  U.invalidateFramebuffer(a, d);
	}, emscripten_glInvalidateSubFramebuffer:function(a, b, c, d, e, f, g) {
	  for (var k = Td[b], p = 0; p < b; p++) {
	    k[p] = D[c + 4 * p >> 2];
	  }
	  U.invalidateSubFramebuffer(a, k, d, e, f, g);
	}, emscripten_glIsSync:function(a) {
	  return U.isSync(Ld[a]);
	}, emscripten_glIsTexture:function(a) {
	  return (a = Hd[a]) ? U.isTexture(a) : 0;
	}, emscripten_glLineWidth:function(a) {
	  U.lineWidth(a);
	}, emscripten_glLinkProgram:function(a) {
	  a = Ed[a];
	  U.linkProgram(a);
	  a.ma = 0;
	  a.ub = {};
	}, emscripten_glMultiDrawArraysInstancedBaseInstanceWEBGL:function(a, b, c, d, e, f) {
	  U.gb.multiDrawArraysInstancedBaseInstanceWEBGL(a, D, b >> 2, D, c >> 2, D, d >> 2, E, e >> 2, f);
	}, emscripten_glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL:function(a, b, c, d, e, f, g, k) {
	  U.gb.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, D, b >> 2, c, D, d >> 2, D, e >> 2, D, f >> 2, E, g >> 2, k);
	}, emscripten_glPixelStorei:function(a, b) {
	  3317 == a && (Od = b);
	  U.pixelStorei(a, b);
	}, emscripten_glReadBuffer:function(a) {
	  U.readBuffer(a);
	}, emscripten_glReadPixels:function(a, b, c, d, e, f, g) {
	  if (2 <= T.version) {
	    if (U.Ka) {
	      U.readPixels(a, b, c, d, e, f, g);
	    } else {
	      var k = be(f);
	      U.readPixels(a, b, c, d, e, f, k, g >> 31 - Math.clz32(k.BYTES_PER_ELEMENT));
	    }
	  } else {
	    (g = ce(f, e, c, d, g)) ? U.readPixels(a, b, c, d, e, f, g) : S(1280);
	  }
	}, emscripten_glRenderbufferStorage:function(a, b, c, d) {
	  U.renderbufferStorage(a, b, c, d);
	}, emscripten_glRenderbufferStorageMultisample:function(a, b, c, d, e) {
	  U.renderbufferStorageMultisample(a, b, c, d, e);
	}, emscripten_glSamplerParameteri:function(a, b, c) {
	  U.samplerParameteri(Kd[a], b, c);
	}, emscripten_glSamplerParameteriv:function(a, b, c) {
	  U.samplerParameteri(Kd[a], b, D[c >> 2]);
	}, emscripten_glScissor:function(a, b, c, d) {
	  U.scissor(a, b, c, d);
	}, emscripten_glShaderSource:function(a, b, c, d) {
	  for (var e = "", f = 0; f < b; ++f) {
	    var g = d ? D[d + 4 * f >> 2] : -1, k = D[c + 4 * f >> 2];
	    g = k ? fb(x, k, 0 > g ? void 0 : g) : "";
	    e += g;
	  }
	  U.shaderSource(Id[a], e);
	}, emscripten_glStencilFunc:function(a, b, c) {
	  U.stencilFunc(a, b, c);
	}, emscripten_glStencilFuncSeparate:function(a, b, c, d) {
	  U.stencilFuncSeparate(a, b, c, d);
	}, emscripten_glStencilMask:function(a) {
	  U.stencilMask(a);
	}, emscripten_glStencilMaskSeparate:function(a, b) {
	  U.stencilMaskSeparate(a, b);
	}, emscripten_glStencilOp:function(a, b, c) {
	  U.stencilOp(a, b, c);
	}, emscripten_glStencilOpSeparate:function(a, b, c, d) {
	  U.stencilOpSeparate(a, b, c, d);
	}, emscripten_glTexImage2D:function(a, b, c, d, e, f, g, k, p) {
	  if (2 <= T.version) {
	    if (U.fa) {
	      U.texImage2D(a, b, c, d, e, f, g, k, p);
	    } else if (p) {
	      var n = be(k);
	      U.texImage2D(a, b, c, d, e, f, g, k, n, p >> 31 - Math.clz32(n.BYTES_PER_ELEMENT));
	    } else {
	      U.texImage2D(a, b, c, d, e, f, g, k, null);
	    }
	  } else {
	    U.texImage2D(a, b, c, d, e, f, g, k, p ? ce(k, g, d, e, p) : null);
	  }
	}, emscripten_glTexParameterf:function(a, b, c) {
	  U.texParameterf(a, b, c);
	}, emscripten_glTexParameterfv:function(a, b, c) {
	  U.texParameterf(a, b, F[c >> 2]);
	}, emscripten_glTexParameteri:function(a, b, c) {
	  U.texParameteri(a, b, c);
	}, emscripten_glTexParameteriv:function(a, b, c) {
	  U.texParameteri(a, b, D[c >> 2]);
	}, emscripten_glTexStorage2D:function(a, b, c, d, e) {
	  U.texStorage2D(a, b, c, d, e);
	}, emscripten_glTexSubImage2D:function(a, b, c, d, e, f, g, k, p) {
	  if (2 <= T.version) {
	    if (U.fa) {
	      U.texSubImage2D(a, b, c, d, e, f, g, k, p);
	    } else if (p) {
	      var n = be(k);
	      U.texSubImage2D(a, b, c, d, e, f, g, k, n, p >> 31 - Math.clz32(n.BYTES_PER_ELEMENT));
	    } else {
	      U.texSubImage2D(a, b, c, d, e, f, g, k, null);
	    }
	  } else {
	    n = null, p && (n = ce(k, g, e, f, p)), U.texSubImage2D(a, b, c, d, e, f, g, k, n);
	  }
	}, emscripten_glUniform1f:function(a, b) {
	  U.uniform1f(V(a), b);
	}, emscripten_glUniform1fv:function(a, b, c) {
	  if (2 <= T.version) {
	    b && U.uniform1fv(V(a), F, c >> 2, b);
	  } else {
	    if (288 >= b) {
	      for (var d = de[b - 1], e = 0; e < b; ++e) {
	        d[e] = F[c + 4 * e >> 2];
	      }
	    } else {
	      d = F.subarray(c >> 2, c + 4 * b >> 2);
	    }
	    U.uniform1fv(V(a), d);
	  }
	}, emscripten_glUniform1i:function(a, b) {
	  U.uniform1i(V(a), b);
	}, emscripten_glUniform1iv:function(a, b, c) {
	  if (2 <= T.version) {
	    b && U.uniform1iv(V(a), D, c >> 2, b);
	  } else {
	    if (288 >= b) {
	      for (var d = ee[b - 1], e = 0; e < b; ++e) {
	        d[e] = D[c + 4 * e >> 2];
	      }
	    } else {
	      d = D.subarray(c >> 2, c + 4 * b >> 2);
	    }
	    U.uniform1iv(V(a), d);
	  }
	}, emscripten_glUniform2f:function(a, b, c) {
	  U.uniform2f(V(a), b, c);
	}, emscripten_glUniform2fv:function(a, b, c) {
	  if (2 <= T.version) {
	    b && U.uniform2fv(V(a), F, c >> 2, 2 * b);
	  } else {
	    if (144 >= b) {
	      for (var d = de[2 * b - 1], e = 0; e < 2 * b; e += 2) {
	        d[e] = F[c + 4 * e >> 2], d[e + 1] = F[c + (4 * e + 4) >> 2];
	      }
	    } else {
	      d = F.subarray(c >> 2, c + 8 * b >> 2);
	    }
	    U.uniform2fv(V(a), d);
	  }
	}, emscripten_glUniform2i:function(a, b, c) {
	  U.uniform2i(V(a), b, c);
	}, emscripten_glUniform2iv:function(a, b, c) {
	  if (2 <= T.version) {
	    b && U.uniform2iv(V(a), D, c >> 2, 2 * b);
	  } else {
	    if (144 >= b) {
	      for (var d = ee[2 * b - 1], e = 0; e < 2 * b; e += 2) {
	        d[e] = D[c + 4 * e >> 2], d[e + 1] = D[c + (4 * e + 4) >> 2];
	      }
	    } else {
	      d = D.subarray(c >> 2, c + 8 * b >> 2);
	    }
	    U.uniform2iv(V(a), d);
	  }
	}, emscripten_glUniform3f:function(a, b, c, d) {
	  U.uniform3f(V(a), b, c, d);
	}, emscripten_glUniform3fv:function(a, b, c) {
	  if (2 <= T.version) {
	    b && U.uniform3fv(V(a), F, c >> 2, 3 * b);
	  } else {
	    if (96 >= b) {
	      for (var d = de[3 * b - 1], e = 0; e < 3 * b; e += 3) {
	        d[e] = F[c + 4 * e >> 2], d[e + 1] = F[c + (4 * e + 4) >> 2], d[e + 2] = F[c + (4 * e + 8) >> 2];
	      }
	    } else {
	      d = F.subarray(c >> 2, c + 12 * b >> 2);
	    }
	    U.uniform3fv(V(a), d);
	  }
	}, emscripten_glUniform3i:function(a, b, c, d) {
	  U.uniform3i(V(a), b, c, d);
	}, emscripten_glUniform3iv:function(a, b, c) {
	  if (2 <= T.version) {
	    b && U.uniform3iv(V(a), D, c >> 2, 3 * b);
	  } else {
	    if (96 >= b) {
	      for (var d = ee[3 * b - 1], e = 0; e < 3 * b; e += 3) {
	        d[e] = D[c + 4 * e >> 2], d[e + 1] = D[c + (4 * e + 4) >> 2], d[e + 2] = D[c + (4 * e + 8) >> 2];
	      }
	    } else {
	      d = D.subarray(c >> 2, c + 12 * b >> 2);
	    }
	    U.uniform3iv(V(a), d);
	  }
	}, emscripten_glUniform4f:function(a, b, c, d, e) {
	  U.uniform4f(V(a), b, c, d, e);
	}, emscripten_glUniform4fv:function(a, b, c) {
	  if (2 <= T.version) {
	    b && U.uniform4fv(V(a), F, c >> 2, 4 * b);
	  } else {
	    if (72 >= b) {
	      var d = de[4 * b - 1], e = F;
	      c >>= 2;
	      for (var f = 0; f < 4 * b; f += 4) {
	        var g = c + f;
	        d[f] = e[g];
	        d[f + 1] = e[g + 1];
	        d[f + 2] = e[g + 2];
	        d[f + 3] = e[g + 3];
	      }
	    } else {
	      d = F.subarray(c >> 2, c + 16 * b >> 2);
	    }
	    U.uniform4fv(V(a), d);
	  }
	}, emscripten_glUniform4i:function(a, b, c, d, e) {
	  U.uniform4i(V(a), b, c, d, e);
	}, emscripten_glUniform4iv:function(a, b, c) {
	  if (2 <= T.version) {
	    b && U.uniform4iv(V(a), D, c >> 2, 4 * b);
	  } else {
	    if (72 >= b) {
	      for (var d = ee[4 * b - 1], e = 0; e < 4 * b; e += 4) {
	        d[e] = D[c + 4 * e >> 2], d[e + 1] = D[c + (4 * e + 4) >> 2], d[e + 2] = D[c + (4 * e + 8) >> 2], d[e + 3] = D[c + (4 * e + 12) >> 2];
	      }
	    } else {
	      d = D.subarray(c >> 2, c + 16 * b >> 2);
	    }
	    U.uniform4iv(V(a), d);
	  }
	}, emscripten_glUniformMatrix2fv:function(a, b, c, d) {
	  if (2 <= T.version) {
	    b && U.uniformMatrix2fv(V(a), !!c, F, d >> 2, 4 * b);
	  } else {
	    if (72 >= b) {
	      for (var e = de[4 * b - 1], f = 0; f < 4 * b; f += 4) {
	        e[f] = F[d + 4 * f >> 2], e[f + 1] = F[d + (4 * f + 4) >> 2], e[f + 2] = F[d + (4 * f + 8) >> 2], e[f + 3] = F[d + (4 * f + 12) >> 2];
	      }
	    } else {
	      e = F.subarray(d >> 2, d + 16 * b >> 2);
	    }
	    U.uniformMatrix2fv(V(a), !!c, e);
	  }
	}, emscripten_glUniformMatrix3fv:function(a, b, c, d) {
	  if (2 <= T.version) {
	    b && U.uniformMatrix3fv(V(a), !!c, F, d >> 2, 9 * b);
	  } else {
	    if (32 >= b) {
	      for (var e = de[9 * b - 1], f = 0; f < 9 * b; f += 9) {
	        e[f] = F[d + 4 * f >> 2], e[f + 1] = F[d + (4 * f + 4) >> 2], e[f + 2] = F[d + (4 * f + 8) >> 2], e[f + 3] = F[d + (4 * f + 12) >> 2], e[f + 4] = F[d + (4 * f + 16) >> 2], e[f + 5] = F[d + (4 * f + 20) >> 2], e[f + 6] = F[d + (4 * f + 24) >> 2], e[f + 7] = F[d + (4 * f + 28) >> 2], e[f + 8] = F[d + (4 * f + 32) >> 2];
	      }
	    } else {
	      e = F.subarray(d >> 2, d + 36 * b >> 2);
	    }
	    U.uniformMatrix3fv(V(a), !!c, e);
	  }
	}, emscripten_glUniformMatrix4fv:function(a, b, c, d) {
	  if (2 <= T.version) {
	    b && U.uniformMatrix4fv(V(a), !!c, F, d >> 2, 16 * b);
	  } else {
	    if (18 >= b) {
	      var e = de[16 * b - 1], f = F;
	      d >>= 2;
	      for (var g = 0; g < 16 * b; g += 16) {
	        var k = d + g;
	        e[g] = f[k];
	        e[g + 1] = f[k + 1];
	        e[g + 2] = f[k + 2];
	        e[g + 3] = f[k + 3];
	        e[g + 4] = f[k + 4];
	        e[g + 5] = f[k + 5];
	        e[g + 6] = f[k + 6];
	        e[g + 7] = f[k + 7];
	        e[g + 8] = f[k + 8];
	        e[g + 9] = f[k + 9];
	        e[g + 10] = f[k + 10];
	        e[g + 11] = f[k + 11];
	        e[g + 12] = f[k + 12];
	        e[g + 13] = f[k + 13];
	        e[g + 14] = f[k + 14];
	        e[g + 15] = f[k + 15];
	      }
	    } else {
	      e = F.subarray(d >> 2, d + 64 * b >> 2);
	    }
	    U.uniformMatrix4fv(V(a), !!c, e);
	  }
	}, emscripten_glUseProgram:function(a) {
	  a = Ed[a];
	  U.useProgram(a);
	  U.Gb = a;
	}, emscripten_glVertexAttrib1f:function(a, b) {
	  U.vertexAttrib1f(a, b);
	}, emscripten_glVertexAttrib2fv:function(a, b) {
	  U.vertexAttrib2f(a, F[b >> 2], F[b + 4 >> 2]);
	}, emscripten_glVertexAttrib3fv:function(a, b) {
	  U.vertexAttrib3f(a, F[b >> 2], F[b + 4 >> 2], F[b + 8 >> 2]);
	}, emscripten_glVertexAttrib4fv:function(a, b) {
	  U.vertexAttrib4f(a, F[b >> 2], F[b + 4 >> 2], F[b + 8 >> 2], F[b + 12 >> 2]);
	}, emscripten_glVertexAttribDivisor:function(a, b) {
	  U.vertexAttribDivisor(a, b);
	}, emscripten_glVertexAttribIPointer:function(a, b, c, d, e) {
	  U.vertexAttribIPointer(a, b, c, d, e);
	}, emscripten_glVertexAttribPointer:function(a, b, c, d, e, f) {
	  U.vertexAttribPointer(a, b, c, !!d, e, f);
	}, emscripten_glViewport:function(a, b, c, d) {
	  U.viewport(a, b, c, d);
	}, emscripten_glWaitSync:function(a, b, c, d) {
	  U.waitSync(Ld[a], b, (c >>> 0) + 4294967296 * d);
	}, emscripten_memcpy_big:(a, b, c) => x.copyWithin(a, b, b + c), emscripten_resize_heap:a => {
	  var b = x.length;
	  a >>>= 0;
	  if (2147483648 < a) {
	    return false;
	  }
	  for (var c = 1; 4 >= c; c *= 2) {
	    var d = b * (1 + 0.2 / c);
	    d = Math.min(d, a + 100663296);
	    var e = Math;
	    d = Math.max(a, d);
	    a: {
	      e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536) - xa.buffer.byteLength + 65535 >>> 16;
	      try {
	        xa.grow(e);
	        Ba();
	        var f = 1;
	        break a;
	      } catch (g) {
	      }
	      f = void 0;
	    }
	    if (f) {
	      return true;
	    }
	  }
	  return false;
	}, emscripten_webgl_get_current_context:function() {
	  return T ? T.handle : 0;
	}, emscripten_webgl_make_context_current:function(a) {
	  return la(a) ? 0 : -5;
	}, environ_get:(a, b) => {
	  var c = 0;
	  he().forEach(function(d, e) {
	    var f = b + c;
	    e = E[a + 4 * e >> 2] = f;
	    for (f = 0; f < d.length; ++f) {
	      v[e++ >> 0] = d.charCodeAt(f);
	    }
	    v[e >> 0] = 0;
	    c += d.length + 1;
	  });
	  return 0;
	}, environ_sizes_get:(a, b) => {
	  var c = he();
	  E[a >> 2] = c.length;
	  var d = 0;
	  c.forEach(function(e) {
	    d += e.length + 1;
	  });
	  E[b >> 2] = d;
	  return 0;
	}, fd_close:function(a) {
	  try {
	    var b = Nb(a);
	    if (null === b.V) {
	      throw new G(8);
	    }
	    b.Ma && (b.Ma = null);
	    try {
	      b.m.close && b.m.close(b);
	    } catch (c) {
	      throw c;
	    } finally {
	      zb[b.V] = null;
	    }
	    b.V = null;
	    return 0;
	  } catch (c) {
	    if ("undefined" == typeof ac || "ErrnoError" !== c.name) {
	      throw c;
	    }
	    return c.Z;
	  }
	}, fd_read:function(a, b, c, d) {
	  try {
	    a: {
	      var e = Nb(a);
	      a = b;
	      for (var f, g = b = 0; g < c; g++) {
	        var k = E[a >> 2], p = E[a + 4 >> 2];
	        a += 8;
	        var n = e, t = k, w = p, y = f, q = v;
	        if (0 > w || 0 > y) {
	          throw new G(28);
	        }
	        if (null === n.V) {
	          throw new G(8);
	        }
	        if (1 === (n.flags & 2097155)) {
	          throw new G(8);
	        }
	        if (16384 === (n.node.mode & 61440)) {
	          throw new G(31);
	        }
	        if (!n.m.read) {
	          throw new G(28);
	        }
	        var r = "undefined" != typeof y;
	        if (!r) {
	          y = n.position;
	        } else if (!n.seekable) {
	          throw new G(70);
	        }
	        var u = n.m.read(n, q, t, w, y);
	        r || (n.position += u);
	        var z = u;
	        if (0 > z) {
	          var B = -1;
	          break a;
	        }
	        b += z;
	        if (z < p) {
	          break;
	        }
	        "undefined" !== typeof f && (f += z);
	      }
	      B = b;
	    }
	    E[d >> 2] = B;
	    return 0;
	  } catch (C) {
	    if ("undefined" == typeof ac || "ErrnoError" !== C.name) {
	      throw C;
	    }
	    return C.Z;
	  }
	}, fd_seek:function(a, b, c, d, e) {
	  b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
	  try {
	    if (isNaN(b)) {
	      return 61;
	    }
	    var f = Nb(a);
	    Wb(f, b, d);
	    Sa = [f.position >>> 0, (Ra = f.position, 1.0 <= +Math.abs(Ra) ? 0.0 < Ra ? +Math.floor(Ra / 4294967296.0) >>> 0 : ~~+Math.ceil((Ra - +(~~Ra >>> 0)) / 4294967296.0) >>> 0 : 0)];
	    D[e >> 2] = Sa[0];
	    D[e + 4 >> 2] = Sa[1];
	    f.Ma && 0 === b && 0 === d && (f.Ma = null);
	    return 0;
	  } catch (g) {
	    if ("undefined" == typeof ac || "ErrnoError" !== g.name) {
	      throw g;
	    }
	    return g.Z;
	  }
	}, fd_write:function(a, b, c, d) {
	  try {
	    a: {
	      var e = Nb(a);
	      a = b;
	      for (var f, g = b = 0; g < c; g++) {
	        var k = E[a >> 2], p = E[a + 4 >> 2];
	        a += 8;
	        var n = e, t = k, w = p, y = f, q = v;
	        if (0 > w || 0 > y) {
	          throw new G(28);
	        }
	        if (null === n.V) {
	          throw new G(8);
	        }
	        if (0 === (n.flags & 2097155)) {
	          throw new G(8);
	        }
	        if (16384 === (n.node.mode & 61440)) {
	          throw new G(31);
	        }
	        if (!n.m.write) {
	          throw new G(28);
	        }
	        n.seekable && n.flags & 1024 && Wb(n, 0, 2);
	        var r = "undefined" != typeof y;
	        if (!r) {
	          y = n.position;
	        } else if (!n.seekable) {
	          throw new G(70);
	        }
	        var u = n.m.write(n, q, t, w, y, void 0);
	        r || (n.position += u);
	        var z = u;
	        if (0 > z) {
	          var B = -1;
	          break a;
	        }
	        b += z;
	        "undefined" !== typeof f && (f += z);
	      }
	      B = b;
	    }
	    E[d >> 2] = B;
	    return 0;
	  } catch (C) {
	    if ("undefined" == typeof ac || "ErrnoError" !== C.name) {
	      throw C;
	    }
	    return C.Z;
	  }
	}, glBindFramebuffer:Qd, glGetIntegerv:Yd, invoke_ii:re, invoke_iii:se, invoke_iiii:te, invoke_iiiii:ue, invoke_iiiiii:ve, invoke_iiiiiii:we, invoke_iiiiiiiiii:xe, invoke_v:ye, invoke_vi:ze, invoke_vii:Ae, invoke_viii:Be, invoke_viiii:Ce, invoke_viiiiii:De, invoke_viiiiiii:Ee, invoke_viiiiiiii:Fe, strftime_l:(a, b, c, d) => le(a, b, c, d)};
	(function() {
	  function a(c) {
	    m = c = c.exports;
	    xa = m.memory;
	    Ba();
	    Ca = m.__indirect_function_table;
	    Ea.unshift(m.__wasm_call_ctors);
	    Ha--;
	    l.monitorRunDependencies && l.monitorRunDependencies(Ha);
	    if (0 == Ha && (Ja)) {
	      var d = Ja;
	      Ja = null;
	      d();
	    }
	    return c;
	  }
	  var b = {env:Ge, wasi_snapshot_preview1:Ge,};
	  Ha++;
	  l.monitorRunDependencies && l.monitorRunDependencies(Ha);
	  if (l.instantiateWasm) {
	    try {
	      return l.instantiateWasm(b, a);
	    } catch (c) {
	      ua("Module.instantiateWasm callback failed with error: " + c), ba(c);
	    }
	  }
	  Qa(b, function(c) {
	    a(c.instance);
	  }).catch(ba);
	  return {};
	})();
	var uc = a => (uc = m.free)(a), Zd = a => (Zd = m.malloc)(a); l._ma_device__on_notification_unlocked = a => (l._ma_device__on_notification_unlocked = m.ma_device__on_notification_unlocked)(a);
	l._ma_malloc_emscripten = (a, b) => (l._ma_malloc_emscripten = m.ma_malloc_emscripten)(a, b);
	l._ma_free_emscripten = (a, b) => (l._ma_free_emscripten = m.ma_free_emscripten)(a, b);
	var Ua = l._ma_device_process_pcm_frames_capture__webaudio = (a, b, c) => (Ua = l._ma_device_process_pcm_frames_capture__webaudio = m.ma_device_process_pcm_frames_capture__webaudio)(a, b, c), Va = l._ma_device_process_pcm_frames_playback__webaudio = (a, b, c) => (Va = l._ma_device_process_pcm_frames_playback__webaudio = m.ma_device_process_pcm_frames_playback__webaudio)(a, b, c), qe = () => (qe = m.__errno_location)(), tc = a => (tc = m.__getTypeName)(a);
	l.__embind_initialize_bindings = () => (l.__embind_initialize_bindings = m._embind_initialize_bindings)();
	var vb = (a, b) => (vb = m.emscripten_builtin_memalign)(a, b), X = (a, b) => (X = m.setThrew)(a, b), Y = () => (Y = m.stackSave)(), Z = a => (Z = m.stackRestore)(a);
	l.dynCall_iiiij = (a, b, c, d, e, f) => (l.dynCall_iiiij = m.dynCall_iiiij)(a, b, c, d, e, f);
	l.dynCall_viiij = (a, b, c, d, e, f) => (l.dynCall_viiij = m.dynCall_viiij)(a, b, c, d, e, f);
	l.dynCall_iiij = (a, b, c, d, e) => (l.dynCall_iiij = m.dynCall_iiij)(a, b, c, d, e);
	l.dynCall_viij = (a, b, c, d, e) => (l.dynCall_viij = m.dynCall_viij)(a, b, c, d, e);
	l.dynCall_iiji = (a, b, c, d, e) => (l.dynCall_iiji = m.dynCall_iiji)(a, b, c, d, e);
	l.dynCall_jiji = (a, b, c, d, e) => (l.dynCall_jiji = m.dynCall_jiji)(a, b, c, d, e);
	l.dynCall_iiiji = (a, b, c, d, e, f) => (l.dynCall_iiiji = m.dynCall_iiiji)(a, b, c, d, e, f);
	l.dynCall_iij = (a, b, c, d) => (l.dynCall_iij = m.dynCall_iij)(a, b, c, d);
	l.dynCall_jii = (a, b, c) => (l.dynCall_jii = m.dynCall_jii)(a, b, c);
	l.dynCall_viiiiij = (a, b, c, d, e, f, g, k) => (l.dynCall_viiiiij = m.dynCall_viiiiij)(a, b, c, d, e, f, g, k);
	l.dynCall_viji = (a, b, c, d, e) => (l.dynCall_viji = m.dynCall_viji)(a, b, c, d, e);
	l.dynCall_ji = (a, b) => (l.dynCall_ji = m.dynCall_ji)(a, b);
	l.dynCall_vij = (a, b, c, d) => (l.dynCall_vij = m.dynCall_vij)(a, b, c, d);
	l.dynCall_viijii = (a, b, c, d, e, f, g) => (l.dynCall_viijii = m.dynCall_viijii)(a, b, c, d, e, f, g);
	l.dynCall_iiiiij = (a, b, c, d, e, f, g) => (l.dynCall_iiiiij = m.dynCall_iiiiij)(a, b, c, d, e, f, g);
	l.dynCall_iiiiijj = (a, b, c, d, e, f, g, k, p) => (l.dynCall_iiiiijj = m.dynCall_iiiiijj)(a, b, c, d, e, f, g, k, p);
	l.dynCall_iiiiiijj = (a, b, c, d, e, f, g, k, p, n) => (l.dynCall_iiiiiijj = m.dynCall_iiiiiijj)(a, b, c, d, e, f, g, k, p, n);
	function re(a, b) {
	  var c = Y();
	  try {
	    return Q(a)(b);
	  } catch (d) {
	    Z(c);
	    if (d !== d + 0) {
	      throw d;
	    }
	    X(1, 0);
	  }
	}
	function Ae(a, b, c) {
	  var d = Y();
	  try {
	    Q(a)(b, c);
	  } catch (e) {
	    Z(d);
	    if (e !== e + 0) {
	      throw e;
	    }
	    X(1, 0);
	  }
	}
	function ze(a, b) {
	  var c = Y();
	  try {
	    Q(a)(b);
	  } catch (d) {
	    Z(c);
	    if (d !== d + 0) {
	      throw d;
	    }
	    X(1, 0);
	  }
	}
	function te(a, b, c, d) {
	  var e = Y();
	  try {
	    return Q(a)(b, c, d);
	  } catch (f) {
	    Z(e);
	    if (f !== f + 0) {
	      throw f;
	    }
	    X(1, 0);
	  }
	}
	function Be(a, b, c, d) {
	  var e = Y();
	  try {
	    Q(a)(b, c, d);
	  } catch (f) {
	    Z(e);
	    if (f !== f + 0) {
	      throw f;
	    }
	    X(1, 0);
	  }
	}
	function Ce(a, b, c, d, e) {
	  var f = Y();
	  try {
	    Q(a)(b, c, d, e);
	  } catch (g) {
	    Z(f);
	    if (g !== g + 0) {
	      throw g;
	    }
	    X(1, 0);
	  }
	}
	function ye(a) {
	  var b = Y();
	  try {
	    Q(a)();
	  } catch (c) {
	    Z(b);
	    if (c !== c + 0) {
	      throw c;
	    }
	    X(1, 0);
	  }
	}
	function we(a, b, c, d, e, f, g) {
	  var k = Y();
	  try {
	    return Q(a)(b, c, d, e, f, g);
	  } catch (p) {
	    Z(k);
	    if (p !== p + 0) {
	      throw p;
	    }
	    X(1, 0);
	  }
	}
	function se(a, b, c) {
	  var d = Y();
	  try {
	    return Q(a)(b, c);
	  } catch (e) {
	    Z(d);
	    if (e !== e + 0) {
	      throw e;
	    }
	    X(1, 0);
	  }
	}
	function Ee(a, b, c, d, e, f, g, k) {
	  var p = Y();
	  try {
	    Q(a)(b, c, d, e, f, g, k);
	  } catch (n) {
	    Z(p);
	    if (n !== n + 0) {
	      throw n;
	    }
	    X(1, 0);
	  }
	}
	function xe(a, b, c, d, e, f, g, k, p, n) {
	  var t = Y();
	  try {
	    return Q(a)(b, c, d, e, f, g, k, p, n);
	  } catch (w) {
	    Z(t);
	    if (w !== w + 0) {
	      throw w;
	    }
	    X(1, 0);
	  }
	}
	function ue(a, b, c, d, e) {
	  var f = Y();
	  try {
	    return Q(a)(b, c, d, e);
	  } catch (g) {
	    Z(f);
	    if (g !== g + 0) {
	      throw g;
	    }
	    X(1, 0);
	  }
	}
	function Fe(a, b, c, d, e, f, g, k, p) {
	  var n = Y();
	  try {
	    Q(a)(b, c, d, e, f, g, k, p);
	  } catch (t) {
	    Z(n);
	    if (t !== t + 0) {
	      throw t;
	    }
	    X(1, 0);
	  }
	}
	function ve(a, b, c, d, e, f) {
	  var g = Y();
	  try {
	    return Q(a)(b, c, d, e, f);
	  } catch (k) {
	    Z(g);
	    if (k !== k + 0) {
	      throw k;
	    }
	    X(1, 0);
	  }
	}
	function De(a, b, c, d, e, f, g) {
	  var k = Y();
	  try {
	    Q(a)(b, c, d, e, f, g);
	  } catch (p) {
	    Z(k);
	    if (p !== p + 0) {
	      throw p;
	    }
	    X(1, 0);
	  }
	}
	var He;
	Ja = function Ie() {
	  He || Je();
	  He || (Ja = Ie);
	};
	function Je() {
	  function a() {
	    if (!He && (He = true, l.calledRun = true, !ya)) {
	      l.noFSInit || Yb || (Yb = true, Xb(), l.stdin = l.stdin, l.stdout = l.stdout, l.stderr = l.stderr, l.stdin ? $b("stdin", l.stdin) : Tb("/dev/tty", "/dev/stdin"), l.stdout ? $b("stdout", null, l.stdout) : Tb("/dev/tty", "/dev/stdout"), l.stderr ? $b("stderr", null, l.stderr) : Tb("/dev/tty1", "/dev/stderr"), Vb("/dev/stdin", 0), Vb("/dev/stdout", 1), Vb("/dev/stderr", 1));
	      Cb = false;
	      Xa(Ea);
	      aa(l);
	      if (l.onRuntimeInitialized) {
	        l.onRuntimeInitialized();
	      }
	      if (l.postRun) {
	        for ("function" == typeof l.postRun && (l.postRun = [l.postRun]); l.postRun.length;) {
	          var b = l.postRun.shift();
	          Fa.unshift(b);
	        }
	      }
	      Xa(Fa);
	    }
	  }
	  if (!(0 < Ha)) {
	    if (l.preRun) {
	      for ("function" == typeof l.preRun && (l.preRun = [l.preRun]); l.preRun.length;) {
	        Ga();
	      }
	    }
	    Xa(Da);
	    0 < Ha || (l.setStatus ? (l.setStatus("Running..."), setTimeout(function() {
	      setTimeout(function() {
	        l.setStatus("");
	      }, 1);
	      a();
	    }, 1)) : a());
	  }
	}
	if (l.preInit) {
	  for ("function" == typeof l.preInit && (l.preInit = [l.preInit]); 0 < l.preInit.length;) {
	    l.preInit.pop()();
	  }
	}
	Je();



	  return moduleArg.ready
	}

	);
	})();
	/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rive);

	/***/ }),
	/* 2 */
	/***/ ((module) => {

	module.exports = /*#__PURE__*/JSON.parse('{"name":"@rive-app/webgl","version":"2.26.4","description":"Rive\'s webgl based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.wasm","rive_fallback.wasm","rive.js.map","rive.d.ts","rive_advanced.mjs.d.ts"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}');

	/***/ }),
	/* 3 */
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

	__webpack_require__.r(__webpack_exports__);
	/* harmony export */ __webpack_require__.d(__webpack_exports__, {
	/* harmony export */   Animation: () => (/* reexport safe */ _Animation__WEBPACK_IMPORTED_MODULE_0__.Animation)
	/* harmony export */ });
	/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);



	/***/ }),
	/* 4 */
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

	__webpack_require__.r(__webpack_exports__);
	/* harmony export */ __webpack_require__.d(__webpack_exports__, {
	/* harmony export */   Animation: () => (/* binding */ Animation)
	/* harmony export */ });
	/**
	 * Represents an animation that can be played on an Artboard.
	 * Wraps animations and instances from the runtime and keeps track of playback state.
	 *
	 * The `Animation` class manages the state and behavior of a single animation instance,
	 * including its current time, loop count, and ability to scrub to a specific time.
	 *
	 * The class provides methods to advance the animation, apply its interpolated keyframe
	 * values to the Artboard, and clean up the underlying animation instance when the
	 * animation is no longer needed.
	 */
	var Animation = /** @class */ (function () {
	    /**
	     * Constructs a new animation
	     * @constructor
	     * @param {any} animation: runtime animation object
	     * @param {any} instance: runtime animation instance object
	     */
	    function Animation(animation, artboard, runtime, playing) {
	        this.animation = animation;
	        this.artboard = artboard;
	        this.playing = playing;
	        this.loopCount = 0;
	        /**
	         * The time to which the animation should move to on the next render.
	         * If not null, the animation will scrub to this time instead of advancing by the given time.
	         */
	        this.scrubTo = null;
	        this.instance = new runtime.LinearAnimationInstance(animation, artboard);
	    }
	    Object.defineProperty(Animation.prototype, "name", {
	        /**
	         * Returns the animation's name
	         */
	        get: function () {
	            return this.animation.name;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Animation.prototype, "time", {
	        /**
	         * Returns the animation's name
	         */
	        get: function () {
	            return this.instance.time;
	        },
	        /**
	         * Sets the animation's current time
	         */
	        set: function (value) {
	            this.instance.time = value;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Animation.prototype, "loopValue", {
	        /**
	         * Returns the animation's loop type
	         */
	        get: function () {
	            return this.animation.loopValue;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Animation.prototype, "needsScrub", {
	        /**
	         * Indicates whether the animation needs to be scrubbed.
	         * @returns `true` if the animation needs to be scrubbed, `false` otherwise.
	         */
	        get: function () {
	            return this.scrubTo !== null;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Advances the animation by the give time. If the animation needs scrubbing,
	     * time is ignored and the stored scrub value is used.
	     * @param time the time to advance the animation by if no scrubbing required
	     */
	    Animation.prototype.advance = function (time) {
	        if (this.scrubTo === null) {
	            this.instance.advance(time);
	        }
	        else {
	            this.instance.time = 0;
	            this.instance.advance(this.scrubTo);
	            this.scrubTo = null;
	        }
	    };
	    /**
	     * Apply interpolated keyframe values to the artboard. This should be called after calling
	     * .advance() on an animation instance so that new values are applied to properties.
	     *
	     * Note: This does not advance the artboard, which updates all objects on the artboard
	     * @param mix - Mix value for the animation from 0 to 1
	     */
	    Animation.prototype.apply = function (mix) {
	        this.instance.apply(mix);
	    };
	    /**
	     * Deletes the backing Wasm animation instance; once this is called, this
	     * animation is no more.
	     */
	    Animation.prototype.cleanup = function () {
	        this.instance.delete();
	    };
	    return Animation;
	}());



	/***/ }),
	/* 5 */
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

	__webpack_require__.r(__webpack_exports__);
	/* harmony export */ __webpack_require__.d(__webpack_exports__, {
	/* harmony export */   BLANK_URL: () => (/* reexport safe */ _sanitizeUrl__WEBPACK_IMPORTED_MODULE_1__.BLANK_URL),
	/* harmony export */   registerTouchInteractions: () => (/* reexport safe */ _registerTouchInteractions__WEBPACK_IMPORTED_MODULE_0__.registerTouchInteractions),
	/* harmony export */   sanitizeUrl: () => (/* reexport safe */ _sanitizeUrl__WEBPACK_IMPORTED_MODULE_1__.sanitizeUrl)
	/* harmony export */ });
	/* harmony import */ var _registerTouchInteractions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
	/* harmony import */ var _sanitizeUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);




	/***/ }),
	/* 6 */
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

	__webpack_require__.r(__webpack_exports__);
	/* harmony export */ __webpack_require__.d(__webpack_exports__, {
	/* harmony export */   registerTouchInteractions: () => (/* binding */ registerTouchInteractions)
	/* harmony export */ });
	/**
	 * Registers mouse move/up/down callback handlers on the canvas to send meaningful coordinates to
	 * the state machine pointer move/up/down functions based on cursor interaction
	 */
	var registerTouchInteractions = function (_a) {
	    var canvas = _a.canvas, artboard = _a.artboard, _b = _a.stateMachines, stateMachines = _b === void 0 ? [] : _b, renderer = _a.renderer, rive = _a.rive; _a.fit; _a.alignment; _a.isTouchScrollEnabled; _a.layoutScaleFactor;
	    if (!canvas ||
	        !stateMachines.length ||
	        !renderer ||
	        !rive ||
	        !artboard ||
	        "undefined" === "undefined") {
	        return null;
	    }
	};


	/***/ }),
	/* 7 */
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

	__webpack_require__.r(__webpack_exports__);
	/* harmony export */ __webpack_require__.d(__webpack_exports__, {
	/* harmony export */   BLANK_URL: () => (/* binding */ BLANK_URL),
	/* harmony export */   sanitizeUrl: () => (/* binding */ sanitizeUrl)
	/* harmony export */ });
	// Reference: https://github.com/braintree/sanitize-url/tree/main
	var invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
	var htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
	var htmlCtrlEntityRegex = /&(newline|tab);/gi;
	var ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
	var urlSchemeRegex = /^.+(:|&colon;)/gim;
	var relativeFirstCharacters = [".", "/"];
	var BLANK_URL = "about:blank";
	function isRelativeUrlWithoutProtocol(url) {
	    return relativeFirstCharacters.indexOf(url[0]) > -1;
	}
	// adapted from https://stackoverflow.com/a/29824550/2601552
	function decodeHtmlCharacters(str) {
	    var removedNullByte = str.replace(ctrlCharactersRegex, "");
	    return removedNullByte.replace(htmlEntitiesRegex, function (match, dec) {
	        return String.fromCharCode(dec);
	    });
	}
	function sanitizeUrl(url) {
	    if (!url) {
	        return BLANK_URL;
	    }
	    var sanitizedUrl = decodeHtmlCharacters(url)
	        .replace(htmlCtrlEntityRegex, "")
	        .replace(ctrlCharactersRegex, "")
	        .trim();
	    if (!sanitizedUrl) {
	        return BLANK_URL;
	    }
	    if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
	        return sanitizedUrl;
	    }
	    var urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);
	    if (!urlSchemeParseResults) {
	        return sanitizedUrl;
	    }
	    var urlScheme = urlSchemeParseResults[0];
	    if (invalidProtocolRegex.test(urlScheme)) {
	        return BLANK_URL;
	    }
	    return sanitizedUrl;
	}


	/***/ })
	/******/ 	]);
	/************************************************************************/
	/******/ 	// The module cache
	/******/ 	var __webpack_module_cache__ = {};
	/******/ 	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/ 		// Check if module is in cache
	/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
	/******/ 		if (cachedModule !== undefined) {
	/******/ 			return cachedModule.exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = __webpack_module_cache__[moduleId] = {
	/******/ 			// no module.id needed
	/******/ 			// no module.loaded needed
	/******/ 			exports: {}
	/******/ 		};
	/******/ 	
	/******/ 		// Execute the module function
	/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
	/******/ 	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/ 	
	/************************************************************************/
	/******/ 	/* webpack/runtime/define property getters */
	/******/ 	(() => {
	/******/ 		// define getter functions for harmony exports
	/******/ 		__webpack_require__.d = (exports, definition) => {
	/******/ 			for(var key in definition) {
	/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
	/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
	/******/ 				}
	/******/ 			}
	/******/ 		};
	/******/ 	})();
	/******/ 	
	/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
	/******/ 	(() => {
	/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
	/******/ 	})();
	/******/ 	
	/******/ 	/* webpack/runtime/make namespace object */
	/******/ 	(() => {
	/******/ 		// define __esModule on exports
	/******/ 		__webpack_require__.r = (exports) => {
	/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	/******/ 			}
	/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
	/******/ 		};
	/******/ 	})();
	/******/ 	
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
	(() => {
	__webpack_require__.r(__webpack_exports__);
	/* harmony export */ __webpack_require__.d(__webpack_exports__, {
	/* harmony export */   Alignment: () => (/* binding */ Alignment),
	/* harmony export */   EventType: () => (/* binding */ EventType),
	/* harmony export */   Fit: () => (/* binding */ Fit),
	/* harmony export */   Layout: () => (/* binding */ Layout),
	/* harmony export */   LoopType: () => (/* binding */ LoopType),
	/* harmony export */   Rive: () => (/* binding */ Rive),
	/* harmony export */   RiveEventType: () => (/* binding */ RiveEventType),
	/* harmony export */   RiveFile: () => (/* binding */ RiveFile),
	/* harmony export */   RuntimeLoader: () => (/* binding */ RuntimeLoader),
	/* harmony export */   StateMachineInput: () => (/* binding */ StateMachineInput),
	/* harmony export */   StateMachineInputType: () => (/* binding */ StateMachineInputType),
	/* harmony export */   Testing: () => (/* binding */ Testing),
	/* harmony export */   decodeAudio: () => (/* binding */ decodeAudio),
	/* harmony export */   decodeFont: () => (/* binding */ decodeFont),
	/* harmony export */   decodeImage: () => (/* binding */ decodeImage)
	/* harmony export */ });
	/* harmony import */ var _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
	/* harmony import */ var package_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
	/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
	/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
	var __extends = (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __awaiter = function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
	    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (g && (g = 0, op[0] && (_ = 0)), _) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};




	var RiveError = /** @class */ (function (_super) {
	    __extends(RiveError, _super);
	    function RiveError() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.isHandledError = true;
	        return _this;
	    }
	    return RiveError;
	}(Error));
	// #regions helpers
	var resolveErrorMessage = function (error) {
	    return error && error.isHandledError
	        ? error.message
	        : "Problem loading file; may be corrupt!";
	};
	// #region layout
	// Fit options for the canvas
	var Fit;
	(function (Fit) {
	    Fit["Cover"] = "cover";
	    Fit["Contain"] = "contain";
	    Fit["Fill"] = "fill";
	    Fit["FitWidth"] = "fitWidth";
	    Fit["FitHeight"] = "fitHeight";
	    Fit["None"] = "none";
	    Fit["ScaleDown"] = "scaleDown";
	    Fit["Layout"] = "layout";
	})(Fit || (Fit = {}));
	// Alignment options for the canvas
	var Alignment;
	(function (Alignment) {
	    Alignment["Center"] = "center";
	    Alignment["TopLeft"] = "topLeft";
	    Alignment["TopCenter"] = "topCenter";
	    Alignment["TopRight"] = "topRight";
	    Alignment["CenterLeft"] = "centerLeft";
	    Alignment["CenterRight"] = "centerRight";
	    Alignment["BottomLeft"] = "bottomLeft";
	    Alignment["BottomCenter"] = "bottomCenter";
	    Alignment["BottomRight"] = "bottomRight";
	})(Alignment || (Alignment = {}));
	// Alignment options for Rive animations in a HTML canvas
	var Layout = /** @class */ (function () {
	    function Layout(params) {
	        var _a, _b, _c, _d, _e, _f, _g;
	        this.fit = (_a = params === null || params === void 0 ? void 0 : params.fit) !== null && _a !== void 0 ? _a : Fit.Contain;
	        this.alignment = (_b = params === null || params === void 0 ? void 0 : params.alignment) !== null && _b !== void 0 ? _b : Alignment.Center;
	        this.layoutScaleFactor = (_c = params === null || params === void 0 ? void 0 : params.layoutScaleFactor) !== null && _c !== void 0 ? _c : 1;
	        this.minX = (_d = params === null || params === void 0 ? void 0 : params.minX) !== null && _d !== void 0 ? _d : 0;
	        this.minY = (_e = params === null || params === void 0 ? void 0 : params.minY) !== null && _e !== void 0 ? _e : 0;
	        this.maxX = (_f = params === null || params === void 0 ? void 0 : params.maxX) !== null && _f !== void 0 ? _f : 0;
	        this.maxY = (_g = params === null || params === void 0 ? void 0 : params.maxY) !== null && _g !== void 0 ? _g : 0;
	    }
	    // Alternative constructor to build a Layout from an interface/object
	    Layout.new = function (_a) {
	        var fit = _a.fit, alignment = _a.alignment, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
	        console.warn("This function is deprecated: please use `new Layout({})` instead");
	        return new Layout({ fit: fit, alignment: alignment, minX: minX, minY: minY, maxX: maxX, maxY: maxY });
	    };
	    /**
	     * Makes a copy of the layout, replacing any specified parameters
	     */
	    Layout.prototype.copyWith = function (_a) {
	        var fit = _a.fit, alignment = _a.alignment, layoutScaleFactor = _a.layoutScaleFactor, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
	        return new Layout({
	            fit: fit !== null && fit !== void 0 ? fit : this.fit,
	            alignment: alignment !== null && alignment !== void 0 ? alignment : this.alignment,
	            layoutScaleFactor: layoutScaleFactor !== null && layoutScaleFactor !== void 0 ? layoutScaleFactor : this.layoutScaleFactor,
	            minX: minX !== null && minX !== void 0 ? minX : this.minX,
	            minY: minY !== null && minY !== void 0 ? minY : this.minY,
	            maxX: maxX !== null && maxX !== void 0 ? maxX : this.maxX,
	            maxY: maxY !== null && maxY !== void 0 ? maxY : this.maxY,
	        });
	    };
	    // Returns fit for the Wasm runtime format
	    Layout.prototype.runtimeFit = function (rive) {
	        if (this.cachedRuntimeFit)
	            return this.cachedRuntimeFit;
	        var fit;
	        if (this.fit === Fit.Cover)
	            fit = rive.Fit.cover;
	        else if (this.fit === Fit.Contain)
	            fit = rive.Fit.contain;
	        else if (this.fit === Fit.Fill)
	            fit = rive.Fit.fill;
	        else if (this.fit === Fit.FitWidth)
	            fit = rive.Fit.fitWidth;
	        else if (this.fit === Fit.FitHeight)
	            fit = rive.Fit.fitHeight;
	        else if (this.fit === Fit.ScaleDown)
	            fit = rive.Fit.scaleDown;
	        else if (this.fit === Fit.Layout)
	            fit = rive.Fit.layout;
	        else
	            fit = rive.Fit.none;
	        this.cachedRuntimeFit = fit;
	        return fit;
	    };
	    // Returns alignment for the Wasm runtime format
	    Layout.prototype.runtimeAlignment = function (rive) {
	        if (this.cachedRuntimeAlignment)
	            return this.cachedRuntimeAlignment;
	        var alignment;
	        if (this.alignment === Alignment.TopLeft)
	            alignment = rive.Alignment.topLeft;
	        else if (this.alignment === Alignment.TopCenter)
	            alignment = rive.Alignment.topCenter;
	        else if (this.alignment === Alignment.TopRight)
	            alignment = rive.Alignment.topRight;
	        else if (this.alignment === Alignment.CenterLeft)
	            alignment = rive.Alignment.centerLeft;
	        else if (this.alignment === Alignment.CenterRight)
	            alignment = rive.Alignment.centerRight;
	        else if (this.alignment === Alignment.BottomLeft)
	            alignment = rive.Alignment.bottomLeft;
	        else if (this.alignment === Alignment.BottomCenter)
	            alignment = rive.Alignment.bottomCenter;
	        else if (this.alignment === Alignment.BottomRight)
	            alignment = rive.Alignment.bottomRight;
	        else
	            alignment = rive.Alignment.center;
	        this.cachedRuntimeAlignment = alignment;
	        return alignment;
	    };
	    return Layout;
	}());

	// Runtime singleton; use getInstance to provide a callback that returns the
	// Rive runtime
	var RuntimeLoader = /** @class */ (function () {
	    // Class is never instantiated
	    function RuntimeLoader() {
	    }
	    // Loads the runtime
	    RuntimeLoader.loadRuntime = function () {
	        _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]({
	            // Loads Wasm bundle
	            locateFile: function () { return RuntimeLoader.wasmURL; },
	        })
	            .then(function (rive) {
	            var _a;
	            RuntimeLoader.runtime = rive;
	            // Fire all the callbacks
	            while (RuntimeLoader.callBackQueue.length > 0) {
	                (_a = RuntimeLoader.callBackQueue.shift()) === null || _a === void 0 ? void 0 : _a(RuntimeLoader.runtime);
	            }
	        })
	            .catch(function (error) {
	            // Capture specific error details
	            var errorDetails = {
	                message: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error",
	                type: (error === null || error === void 0 ? void 0 : error.name) || "Error",
	                // Some browsers may provide additional WebAssembly-specific details
	                wasmError: error instanceof WebAssembly.CompileError ||
	                    error instanceof WebAssembly.RuntimeError,
	                originalError: error,
	            };
	            // Log detailed error for debugging
	            console.debug("Rive WASM load error details:", errorDetails);
	            // In case unpkg fails, or the wasm was not supported, we try to load the fallback module from jsdelivr.
	            // This `rive_fallback.wasm` is compiled to support older architecture.
	            // TODO: (Gordon): preemptively test browser support and load the correct wasm file. Then use jsdelvr only if unpkg fails.
	            var backupJsdelivrUrl = "https://cdn.jsdelivr.net/npm/".concat(package_json__WEBPACK_IMPORTED_MODULE_1__.name, "@").concat(package_json__WEBPACK_IMPORTED_MODULE_1__.version, "/rive_fallback.wasm");
	            if (RuntimeLoader.wasmURL.toLowerCase() !== backupJsdelivrUrl) {
	                console.warn("Failed to load WASM from ".concat(RuntimeLoader.wasmURL, " (").concat(errorDetails.message, "), trying jsdelivr as a backup"));
	                RuntimeLoader.setWasmUrl(backupJsdelivrUrl);
	                RuntimeLoader.loadRuntime();
	            }
	            else {
	                var errorMessage = [
	                    "Could not load Rive WASM file from ".concat(RuntimeLoader.wasmURL, " or ").concat(backupJsdelivrUrl, "."),
	                    "Possible reasons:",
	                    "- Network connection is down",
	                    "- WebAssembly is not supported in this environment",
	                    "- The WASM file is corrupted or incompatible",
	                    "\nError details:",
	                    "- Type: ".concat(errorDetails.type),
	                    "- Message: ".concat(errorDetails.message),
	                    "- WebAssembly-specific error: ".concat(errorDetails.wasmError),
	                    "\nTo resolve, you may need to:",
	                    "1. Check your network connection",
	                    "2. Set a new WASM source via RuntimeLoader.setWasmUrl()",
	                    "3. Call RuntimeLoader.loadRuntime() again",
	                ].join("\n");
	                console.error(errorMessage);
	            }
	        });
	    };
	    // Provides a runtime instance via a callback
	    RuntimeLoader.getInstance = function (callback) {
	        // If it's not loading, start loading runtime
	        if (!RuntimeLoader.isLoading) {
	            RuntimeLoader.isLoading = true;
	            RuntimeLoader.loadRuntime();
	        }
	        if (!RuntimeLoader.runtime) {
	            RuntimeLoader.callBackQueue.push(callback);
	        }
	        else {
	            callback(RuntimeLoader.runtime);
	        }
	    };
	    // Provides a runtime instance via a promise
	    RuntimeLoader.awaitInstance = function () {
	        return new Promise(function (resolve) {
	            return RuntimeLoader.getInstance(function (rive) { return resolve(rive); });
	        });
	    };
	    // Manually sets the wasm url
	    RuntimeLoader.setWasmUrl = function (url) {
	        RuntimeLoader.wasmURL = url;
	    };
	    // Gets the current wasm url
	    RuntimeLoader.getWasmUrl = function () {
	        return RuntimeLoader.wasmURL;
	    };
	    // Flag to indicate that loading has started/completed
	    RuntimeLoader.isLoading = false;
	    // List of callbacks for the runtime that come in while loading
	    RuntimeLoader.callBackQueue = [];
	    // Path to the Wasm file; default path works for testing only;
	    // if embedded wasm is used then this is never used.
	    RuntimeLoader.wasmURL = "https://unpkg.com/".concat(package_json__WEBPACK_IMPORTED_MODULE_1__.name, "@").concat(package_json__WEBPACK_IMPORTED_MODULE_1__.version, "/rive.wasm");
	    return RuntimeLoader;
	}());

	// #endregion
	// #region state machines
	var StateMachineInputType;
	(function (StateMachineInputType) {
	    StateMachineInputType[StateMachineInputType["Number"] = 56] = "Number";
	    StateMachineInputType[StateMachineInputType["Trigger"] = 58] = "Trigger";
	    StateMachineInputType[StateMachineInputType["Boolean"] = 59] = "Boolean";
	})(StateMachineInputType || (StateMachineInputType = {}));
	/**
	 * An input for a state machine
	 */
	var StateMachineInput = /** @class */ (function () {
	    function StateMachineInput(type, runtimeInput) {
	        this.type = type;
	        this.runtimeInput = runtimeInput;
	    }
	    Object.defineProperty(StateMachineInput.prototype, "name", {
	        /**
	         * Returns the name of the input
	         */
	        get: function () {
	            return this.runtimeInput.name;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(StateMachineInput.prototype, "value", {
	        /**
	         * Returns the current value of the input
	         */
	        get: function () {
	            return this.runtimeInput.value;
	        },
	        /**
	         * Sets the value of the input
	         */
	        set: function (value) {
	            this.runtimeInput.value = value;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Fires a trigger; does nothing on Number or Boolean input types
	     */
	    StateMachineInput.prototype.fire = function () {
	        if (this.type === StateMachineInputType.Trigger) {
	            this.runtimeInput.fire();
	        }
	    };
	    /**
	     * Deletes the input
	     */
	    StateMachineInput.prototype.delete = function () {
	        this.runtimeInput = null;
	    };
	    return StateMachineInput;
	}());

	var RiveEventType;
	(function (RiveEventType) {
	    RiveEventType[RiveEventType["General"] = 128] = "General";
	    RiveEventType[RiveEventType["OpenUrl"] = 131] = "OpenUrl";
	})(RiveEventType || (RiveEventType = {}));
	var StateMachine = /** @class */ (function () {
	    /**
	     * @constructor
	     * @param stateMachine runtime state machine object
	     * @param instance runtime state machine instance object
	     */
	    function StateMachine(stateMachine, runtime, playing, artboard) {
	        this.stateMachine = stateMachine;
	        this.playing = playing;
	        this.artboard = artboard;
	        /**
	         * Caches the inputs from the runtime
	         */
	        this.inputs = [];
	        this.instance = new runtime.StateMachineInstance(stateMachine, artboard);
	        this.initInputs(runtime);
	    }
	    Object.defineProperty(StateMachine.prototype, "name", {
	        get: function () {
	            return this.stateMachine.name;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(StateMachine.prototype, "statesChanged", {
	        /**
	         * Returns a list of state names that have changed on this frame
	         */
	        get: function () {
	            var names = [];
	            for (var i = 0; i < this.instance.stateChangedCount(); i++) {
	                names.push(this.instance.stateChangedNameByIndex(i));
	            }
	            return names;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Advances the state machine instance by a given time.
	     * @param time - the time to advance the animation by in seconds
	     */
	    StateMachine.prototype.advance = function (time) {
	        this.instance.advance(time);
	    };
	    /**
	     * Advances the state machine instance by a given time and apply changes to artboard.
	     * @param time - the time to advance the animation by in seconds
	     */
	    StateMachine.prototype.advanceAndApply = function (time) {
	        this.instance.advanceAndApply(time);
	    };
	    /**
	     * Returns the number of events reported from the last advance call
	     * @returns Number of events reported
	     */
	    StateMachine.prototype.reportedEventCount = function () {
	        return this.instance.reportedEventCount();
	    };
	    /**
	     * Returns a RiveEvent object emitted from the last advance call at the given index
	     * of a list of potentially multiple events. If an event at the index is not found,
	     * undefined is returned.
	     * @param i index of the event reported in a list of potentially multiple events
	     * @returns RiveEvent or extended RiveEvent object returned, or undefined
	     */
	    StateMachine.prototype.reportedEventAt = function (i) {
	        return this.instance.reportedEventAt(i);
	    };
	    /**
	     * Fetches references to the state machine's inputs and caches them
	     * @param runtime an instance of the runtime; needed for the SMIInput types
	     */
	    StateMachine.prototype.initInputs = function (runtime) {
	        // Fetch the inputs from the runtime if we don't have them
	        for (var i = 0; i < this.instance.inputCount(); i++) {
	            var input = this.instance.input(i);
	            this.inputs.push(this.mapRuntimeInput(input, runtime));
	        }
	    };
	    /**
	     * Maps a runtime input to it's appropriate type
	     * @param input
	     */
	    StateMachine.prototype.mapRuntimeInput = function (input, runtime) {
	        if (input.type === runtime.SMIInput.bool) {
	            return new StateMachineInput(StateMachineInputType.Boolean, input.asBool());
	        }
	        else if (input.type === runtime.SMIInput.number) {
	            return new StateMachineInput(StateMachineInputType.Number, input.asNumber());
	        }
	        else if (input.type === runtime.SMIInput.trigger) {
	            return new StateMachineInput(StateMachineInputType.Trigger, input.asTrigger());
	        }
	    };
	    /**
	     * Deletes the backing Wasm state machine instance; once this is called, this
	     * state machine is no more.
	     */
	    StateMachine.prototype.cleanup = function () {
	        this.inputs.forEach(function (input) {
	            input.delete();
	        });
	        this.inputs.length = 0;
	        this.instance.delete();
	    };
	    return StateMachine;
	}());
	// #endregion
	// #region animator
	/**
	 * Manages animation
	 */
	var Animator = /** @class */ (function () {
	    /**
	     * Constructs a new animator
	     * @constructor
	     * @param runtime Rive runtime; needed to instance animations & state machines
	     * @param artboard the artboard that holds all animations and state machines
	     * @param animations optional list of animations
	     * @param stateMachines optional list of state machines
	     */
	    function Animator(runtime, artboard, eventManager, animations, stateMachines) {
	        if (animations === void 0) { animations = []; }
	        if (stateMachines === void 0) { stateMachines = []; }
	        this.runtime = runtime;
	        this.artboard = artboard;
	        this.eventManager = eventManager;
	        this.animations = animations;
	        this.stateMachines = stateMachines;
	    }
	    /**
	     * Adds animations and state machines by their names. If names are shared
	     * between animations & state machines, then the first one found will be
	     * created. Best not to use the same names for these in your Rive file.
	     * @param animatable the name(s) of animations and state machines to add
	     * @returns a list of names of the playing animations and state machines
	     */
	    Animator.prototype.add = function (animatables, playing, fireEvent) {
	        if (fireEvent === void 0) { fireEvent = true; }
	        animatables = mapToStringArray(animatables);
	        // If animatables is empty, play or pause everything
	        if (animatables.length === 0) {
	            this.animations.forEach(function (a) { return (a.playing = playing); });
	            this.stateMachines.forEach(function (m) { return (m.playing = playing); });
	        }
	        else {
	            // Play/pause already instanced items, or create new instances
	            var instancedAnimationNames = this.animations.map(function (a) { return a.name; });
	            var instancedMachineNames = this.stateMachines.map(function (m) { return m.name; });
	            for (var i = 0; i < animatables.length; i++) {
	                var aIndex = instancedAnimationNames.indexOf(animatables[i]);
	                var mIndex = instancedMachineNames.indexOf(animatables[i]);
	                if (aIndex >= 0 || mIndex >= 0) {
	                    if (aIndex >= 0) {
	                        // Animation is instanced, play/pause it
	                        this.animations[aIndex].playing = playing;
	                    }
	                    else {
	                        // State machine is instanced, play/pause it
	                        this.stateMachines[mIndex].playing = playing;
	                    }
	                }
	                else {
	                    // Try to create a new animation instance
	                    var anim = this.artboard.animationByName(animatables[i]);
	                    if (anim) {
	                        var newAnimation = new _animation__WEBPACK_IMPORTED_MODULE_2__.Animation(anim, this.artboard, this.runtime, playing);
	                        // Display the first frame of the specified animation
	                        newAnimation.advance(0);
	                        newAnimation.apply(1.0);
	                        this.animations.push(newAnimation);
	                    }
	                    else {
	                        // Try to create a new state machine instance
	                        var sm = this.artboard.stateMachineByName(animatables[i]);
	                        if (sm) {
	                            var newStateMachine = new StateMachine(sm, this.runtime, playing, this.artboard);
	                            this.stateMachines.push(newStateMachine);
	                        }
	                    }
	                }
	            }
	        }
	        // Fire play/paused events for animations
	        if (fireEvent) {
	            if (playing) {
	                this.eventManager.fire({
	                    type: EventType.Play,
	                    data: this.playing,
	                });
	            }
	            else {
	                this.eventManager.fire({
	                    type: EventType.Pause,
	                    data: this.paused,
	                });
	            }
	        }
	        return playing ? this.playing : this.paused;
	    };
	    /**
	     * Adds linear animations by their names.
	     * @param animatables the name(s) of animations to add
	     * @param playing whether animations should play on instantiation
	     */
	    Animator.prototype.initLinearAnimations = function (animatables, playing) {
	        // Play/pause already instanced items, or create new instances
	        // This validation is kept to maintain compatibility with current behavior.
	        // But given that it this is called during artboard initialization
	        // it should probably be safe to remove.
	        var instancedAnimationNames = this.animations.map(function (a) { return a.name; });
	        for (var i = 0; i < animatables.length; i++) {
	            var aIndex = instancedAnimationNames.indexOf(animatables[i]);
	            if (aIndex >= 0) {
	                this.animations[aIndex].playing = playing;
	            }
	            else {
	                // Try to create a new animation instance
	                var anim = this.artboard.animationByName(animatables[i]);
	                if (anim) {
	                    var newAnimation = new _animation__WEBPACK_IMPORTED_MODULE_2__.Animation(anim, this.artboard, this.runtime, playing);
	                    // Display the first frame of the specified animation
	                    newAnimation.advance(0);
	                    newAnimation.apply(1.0);
	                    this.animations.push(newAnimation);
	                }
	            }
	        }
	    };
	    /**
	     * Adds state machines by their names.
	     * @param animatables the name(s) of state machines to add
	     * @param playing whether state machines should play on instantiation
	     */
	    Animator.prototype.initStateMachines = function (animatables, playing) {
	        // Play/pause already instanced items, or create new instances
	        // This validation is kept to maintain compatibility with current behavior.
	        // But given that it this is called during artboard initialization
	        // it should probably be safe to remove.
	        var instancedStateMachineNames = this.stateMachines.map(function (a) { return a.name; });
	        for (var i = 0; i < animatables.length; i++) {
	            var aIndex = instancedStateMachineNames.indexOf(animatables[i]);
	            if (aIndex >= 0) {
	                this.stateMachines[aIndex].playing = playing;
	            }
	            else {
	                // Try to create a new state machine instance
	                var sm = this.artboard.stateMachineByName(animatables[i]);
	                if (sm) {
	                    var newStateMachine = new StateMachine(sm, this.runtime, playing, this.artboard);
	                    this.stateMachines.push(newStateMachine);
	                }
	                else {
	                    // In order to maintain compatibility with current behavior, if a state machine is not found
	                    // we look for an animation with the same name
	                    this.initLinearAnimations([animatables[i]], playing);
	                }
	            }
	        }
	    };
	    /**
	     * Play the named animations/state machines
	     * @param animatables the names of the animations/machines to play; plays all if empty
	     * @returns a list of the playing items
	     */
	    Animator.prototype.play = function (animatables) {
	        return this.add(animatables, true);
	    };
	    /**
	     * Pauses named animations and state machines, or everything if nothing is
	     * specified
	     * @param animatables names of the animations and state machines to pause
	     * @returns a list of names of the animations and state machines paused
	     */
	    Animator.prototype.pause = function (animatables) {
	        return this.add(animatables, false);
	    };
	    /**
	     * Set time of named animations
	     * @param animations names of the animations to scrub
	     * @param value time scrub value, a floating point number to which the playhead is jumped
	     * @returns a list of names of the animations that were scrubbed
	     */
	    Animator.prototype.scrub = function (animatables, value) {
	        var forScrubbing = this.animations.filter(function (a) {
	            return animatables.includes(a.name);
	        });
	        forScrubbing.forEach(function (a) { return (a.scrubTo = value); });
	        return forScrubbing.map(function (a) { return a.name; });
	    };
	    Object.defineProperty(Animator.prototype, "playing", {
	        /**
	         * Returns a list of names of all animations and state machines currently
	         * playing
	         */
	        get: function () {
	            return this.animations
	                .filter(function (a) { return a.playing; })
	                .map(function (a) { return a.name; })
	                .concat(this.stateMachines.filter(function (m) { return m.playing; }).map(function (m) { return m.name; }));
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Animator.prototype, "paused", {
	        /**
	         * Returns a list of names of all animations and state machines currently
	         * paused
	         */
	        get: function () {
	            return this.animations
	                .filter(function (a) { return !a.playing; })
	                .map(function (a) { return a.name; })
	                .concat(this.stateMachines.filter(function (m) { return !m.playing; }).map(function (m) { return m.name; }));
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Stops and removes all named animations and state machines
	     * @param animatables animations and state machines to remove
	     * @returns a list of names of removed items
	     */
	    Animator.prototype.stop = function (animatables) {
	        var _this = this;
	        animatables = mapToStringArray(animatables);
	        // If nothing's specified, wipe them out, all of them
	        var removedNames = [];
	        // Stop everything
	        if (animatables.length === 0) {
	            removedNames = this.animations
	                .map(function (a) { return a.name; })
	                .concat(this.stateMachines.map(function (m) { return m.name; }));
	            // Clean up before emptying the arrays
	            this.animations.forEach(function (a) { return a.cleanup(); });
	            this.stateMachines.forEach(function (m) { return m.cleanup(); });
	            // Empty out the arrays
	            this.animations.splice(0, this.animations.length);
	            this.stateMachines.splice(0, this.stateMachines.length);
	        }
	        else {
	            // Remove only the named animations/state machines
	            var animationsToRemove = this.animations.filter(function (a) {
	                return animatables.includes(a.name);
	            });
	            animationsToRemove.forEach(function (a) {
	                a.cleanup();
	                _this.animations.splice(_this.animations.indexOf(a), 1);
	            });
	            var machinesToRemove = this.stateMachines.filter(function (m) {
	                return animatables.includes(m.name);
	            });
	            machinesToRemove.forEach(function (m) {
	                m.cleanup();
	                _this.stateMachines.splice(_this.stateMachines.indexOf(m), 1);
	            });
	            removedNames = animationsToRemove
	                .map(function (a) { return a.name; })
	                .concat(machinesToRemove.map(function (m) { return m.name; }));
	        }
	        this.eventManager.fire({
	            type: EventType.Stop,
	            data: removedNames,
	        });
	        // Return the list of animations removed
	        return removedNames;
	    };
	    Object.defineProperty(Animator.prototype, "isPlaying", {
	        /**
	         * Returns true if at least one animation is active
	         */
	        get: function () {
	            return (this.animations.reduce(function (acc, curr) { return acc || curr.playing; }, false) ||
	                this.stateMachines.reduce(function (acc, curr) { return acc || curr.playing; }, false));
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Animator.prototype, "isPaused", {
	        /**
	         * Returns true if all animations are paused and there's at least one animation
	         */
	        get: function () {
	            return (!this.isPlaying &&
	                (this.animations.length > 0 || this.stateMachines.length > 0));
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Animator.prototype, "isStopped", {
	        /**
	         * Returns true if there are no playing or paused animations/state machines
	         */
	        get: function () {
	            return this.animations.length === 0 && this.stateMachines.length === 0;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * If there are no animations or state machines, add the first one found
	     * @returns the name of the animation or state machine instanced
	     */
	    Animator.prototype.atLeastOne = function (playing, fireEvent) {
	        if (fireEvent === void 0) { fireEvent = true; }
	        var instancedName;
	        if (this.animations.length === 0 && this.stateMachines.length === 0) {
	            if (this.artboard.animationCount() > 0) {
	                // Add the first animation
	                this.add([(instancedName = this.artboard.animationByIndex(0).name)], playing, fireEvent);
	            }
	            else if (this.artboard.stateMachineCount() > 0) {
	                // Add the first state machine
	                this.add([(instancedName = this.artboard.stateMachineByIndex(0).name)], playing, fireEvent);
	            }
	        }
	        return instancedName;
	    };
	    /**
	     * Checks if any animations have looped and if so, fire the appropriate event
	     */
	    Animator.prototype.handleLooping = function () {
	        for (var _i = 0, _a = this.animations.filter(function (a) { return a.playing; }); _i < _a.length; _i++) {
	            var animation = _a[_i];
	            // Emit if the animation looped
	            if (animation.loopValue === 0 && animation.loopCount) {
	                animation.loopCount = 0;
	                // This is a one-shot; if it has ended, delete the instance
	                this.stop(animation.name);
	            }
	            else if (animation.loopValue === 1 && animation.loopCount) {
	                this.eventManager.fire({
	                    type: EventType.Loop,
	                    data: { animation: animation.name, type: LoopType.Loop },
	                });
	                animation.loopCount = 0;
	            }
	            // Wasm indicates a loop at each time the animation
	            // changes direction, so a full loop/lap occurs every
	            // two loop counts
	            else if (animation.loopValue === 2 && animation.loopCount > 1) {
	                this.eventManager.fire({
	                    type: EventType.Loop,
	                    data: { animation: animation.name, type: LoopType.PingPong },
	                });
	                animation.loopCount = 0;
	            }
	        }
	    };
	    /**
	     * Checks if states have changed in state machines and fires a statechange
	     * event
	     */
	    Animator.prototype.handleStateChanges = function () {
	        var statesChanged = [];
	        for (var _i = 0, _a = this.stateMachines.filter(function (sm) { return sm.playing; }); _i < _a.length; _i++) {
	            var stateMachine = _a[_i];
	            statesChanged.push.apply(statesChanged, stateMachine.statesChanged);
	        }
	        if (statesChanged.length > 0) {
	            this.eventManager.fire({
	                type: EventType.StateChange,
	                data: statesChanged,
	            });
	        }
	    };
	    Animator.prototype.handleAdvancing = function (time) {
	        this.eventManager.fire({
	            type: EventType.Advance,
	            data: time,
	        });
	    };
	    return Animator;
	}());
	// #endregion
	// #region events
	/**
	 * Supported event types triggered in Rive
	 */
	var EventType;
	(function (EventType) {
	    EventType["Load"] = "load";
	    EventType["LoadError"] = "loaderror";
	    EventType["Play"] = "play";
	    EventType["Pause"] = "pause";
	    EventType["Stop"] = "stop";
	    EventType["Loop"] = "loop";
	    EventType["Draw"] = "draw";
	    EventType["Advance"] = "advance";
	    EventType["StateChange"] = "statechange";
	    EventType["RiveEvent"] = "riveevent";
	    EventType["AudioStatusChange"] = "audiostatuschange";
	})(EventType || (EventType = {}));
	/**
	 * Looping types: one-shot, loop, and ping-pong
	 */
	var LoopType;
	(function (LoopType) {
	    LoopType["OneShot"] = "oneshot";
	    LoopType["Loop"] = "loop";
	    LoopType["PingPong"] = "pingpong";
	})(LoopType || (LoopType = {}));
	// Manages Rive events and listeners
	var EventManager = /** @class */ (function () {
	    function EventManager(listeners) {
	        if (listeners === void 0) { listeners = []; }
	        this.listeners = listeners;
	    }
	    // Gets listeners of specified type
	    EventManager.prototype.getListeners = function (type) {
	        return this.listeners.filter(function (e) { return e.type === type; });
	    };
	    // Adds a listener
	    EventManager.prototype.add = function (listener) {
	        if (!this.listeners.includes(listener)) {
	            this.listeners.push(listener);
	        }
	    };
	    /**
	     * Removes a listener
	     * @param listener the listener with the callback to be removed
	     */
	    EventManager.prototype.remove = function (listener) {
	        // We can't simply look for the listener as it'll be a different instance to
	        // one originally subscribed. Find all the listeners of the right type and
	        // then check their callbacks which should match.
	        for (var i = 0; i < this.listeners.length; i++) {
	            var currentListener = this.listeners[i];
	            if (currentListener.type === listener.type) {
	                if (currentListener.callback === listener.callback) {
	                    this.listeners.splice(i, 1);
	                    break;
	                }
	            }
	        }
	    };
	    /**
	     * Clears all listeners of specified type, or every listener if no type is
	     * specified
	     * @param type the type of listeners to clear, or all listeners if not
	     * specified
	     */
	    EventManager.prototype.removeAll = function (type) {
	        var _this = this;
	        if (!type) {
	            this.listeners.splice(0, this.listeners.length);
	        }
	        else {
	            this.listeners
	                .filter(function (l) { return l.type === type; })
	                .forEach(function (l) { return _this.remove(l); });
	        }
	    };
	    // Fires an event
	    EventManager.prototype.fire = function (event) {
	        var eventListeners = this.getListeners(event.type);
	        eventListeners.forEach(function (listener) { return listener.callback(event); });
	    };
	    return EventManager;
	}());
	// Manages a queue of tasks
	var TaskQueueManager = /** @class */ (function () {
	    function TaskQueueManager(eventManager) {
	        this.eventManager = eventManager;
	        this.queue = [];
	    }
	    // Adds a task top the queue
	    TaskQueueManager.prototype.add = function (task) {
	        this.queue.push(task);
	    };
	    // Processes all tasks in the queue
	    TaskQueueManager.prototype.process = function () {
	        while (this.queue.length > 0) {
	            var task = this.queue.shift();
	            if (task === null || task === void 0 ? void 0 : task.action) {
	                task.action();
	            }
	            if (task === null || task === void 0 ? void 0 : task.event) {
	                this.eventManager.fire(task.event);
	            }
	        }
	    };
	    return TaskQueueManager;
	}());
	// #endregion
	// #region Audio
	var SystemAudioStatus;
	(function (SystemAudioStatus) {
	    SystemAudioStatus[SystemAudioStatus["AVAILABLE"] = 0] = "AVAILABLE";
	    SystemAudioStatus[SystemAudioStatus["UNAVAILABLE"] = 1] = "UNAVAILABLE";
	})(SystemAudioStatus || (SystemAudioStatus = {}));
	// Class to handle audio context availability and status changes
	var AudioManager = /** @class */ (function (_super) {
	    __extends(AudioManager, _super);
	    function AudioManager() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this._started = false;
	        _this._enabled = false;
	        _this._status = SystemAudioStatus.UNAVAILABLE;
	        return _this;
	    }
	    AudioManager.prototype.delay = function (time) {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, time); })];
	            });
	        });
	    };
	    AudioManager.prototype.timeout = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, new Promise(function (_, reject) { return setTimeout(reject, 50); })];
	            });
	        });
	    };
	    // Alerts animations on status changes and removes the listeners to avoid alerting twice.
	    AudioManager.prototype.reportToListeners = function () {
	        this.fire({ type: EventType.AudioStatusChange });
	        this.removeAll();
	    };
	    /**
	     * The audio context has been resolved.
	     * Alert any listeners that we can now play audio.
	     * Rive will now play audio at the configured volume.
	     */
	    AudioManager.prototype.enableAudio = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                if (!this._enabled) {
	                    this._enabled = true;
	                    this._status = SystemAudioStatus.AVAILABLE;
	                    this.reportToListeners();
	                }
	                return [2 /*return*/];
	            });
	        });
	    };
	    /**
	     * Check if we are able to play audio.
	     *
	     * We currently check the audio context, when resume() returns before a timeout we know that the
	     * audio context is running and we can enable audio.
	     */
	    AudioManager.prototype.testAudio = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        if (!(this._status === SystemAudioStatus.UNAVAILABLE &&
	                            this._audioContext !== null)) return [3 /*break*/, 4];
	                        _b.label = 1;
	                    case 1:
	                        _b.trys.push([1, 3, , 4]);
	                        return [4 /*yield*/, Promise.race([this._audioContext.resume(), this.timeout()])];
	                    case 2:
	                        _b.sent();
	                        this.enableAudio();
	                        return [3 /*break*/, 4];
	                    case 3:
	                        _b.sent();
	                        return [3 /*break*/, 4];
	                    case 4: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * Establish audio for use with rive.
	     * We both test if we can use audio intermittently and listen for user interaction.
	     * The aim is to enable audio playback as soon as the browser allows this.
	     */
	    AudioManager.prototype._establishAudio = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        if (!!this._started) return [3 /*break*/, 5];
	                        this._started = true;
	                        this.enableAudio();
	                        return [3 /*break*/, 5];
	                    case 1:
	                        this._audioContext = new AudioContext();
	                        this.listenForUserAction();
	                        _a.label = 2;
	                    case 2:
	                        if (!(this._status === SystemAudioStatus.UNAVAILABLE)) return [3 /*break*/, 5];
	                        return [4 /*yield*/, this.testAudio()];
	                    case 3:
	                        _a.sent();
	                        return [4 /*yield*/, this.delay(1000)];
	                    case 4:
	                        _a.sent();
	                        return [3 /*break*/, 2];
	                    case 5: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    AudioManager.prototype.listenForUserAction = function () {
	        var _this = this;
	        // NOTE: AudioContexts are ready immediately if requested in a ui callback
	        // we *could* re request one in this listener.
	        var _clickListener = function () { return __awaiter(_this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                // note this has "better" results than calling `await this.testAudio()`
	                // as we force audio to be enabled in the current thread, rather than chancing
	                // the thread to be passed over for some other async context
	                this.enableAudio();
	                return [2 /*return*/];
	            });
	        }); };
	        // NOTE: we should test this on mobile/pads
	        document.addEventListener("pointerdown", _clickListener, {
	            once: true,
	        });
	    };
	    /**
	     * Establish the audio context for rive, this lets rive know that we can play audio.
	     */
	    AudioManager.prototype.establishAudio = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                this._establishAudio();
	                return [2 /*return*/];
	            });
	        });
	    };
	    Object.defineProperty(AudioManager.prototype, "systemVolume", {
	        get: function () {
	            if (this._status === SystemAudioStatus.UNAVAILABLE) {
	                // We do an immediate test to avoid depending on the delay of the running test
	                this.testAudio();
	                return 0;
	            }
	            return 1;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(AudioManager.prototype, "status", {
	        get: function () {
	            return this._status;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return AudioManager;
	}(EventManager));
	var audioManager = new AudioManager();
	var FakeResizeObserver = /** @class */ (function () {
	    function FakeResizeObserver() {
	    }
	    FakeResizeObserver.prototype.observe = function () { };
	    FakeResizeObserver.prototype.unobserve = function () { };
	    FakeResizeObserver.prototype.disconnect = function () { };
	    return FakeResizeObserver;
	}());
	var MyResizeObserver = globalThis.ResizeObserver || FakeResizeObserver;
	/**
	 * This class takes care of any observers that will be attached to an animation.
	 * It should be treated as a singleton because observers are much more performant
	 * when used for observing multiple elements by a single instance.
	 */
	var ObjectObservers = /** @class */ (function () {
	    function ObjectObservers() {
	        var _this = this;
	        this._elementsMap = new Map();
	        /**
	         * Resize observers trigger both when the element changes its size and also when the
	         * element is added or removed from the document.
	         */
	        this._onObservedEntry = function (entry) {
	            var observed = _this._elementsMap.get(entry.target);
	            if (observed !== null) {
	                observed.onResize(entry.target.clientWidth == 0 || entry.target.clientHeight == 0);
	            }
	            else {
	                _this._resizeObserver.unobserve(entry.target);
	            }
	        };
	        this._onObserved = function (entries) {
	            entries.forEach(_this._onObservedEntry);
	        };
	        this._resizeObserver = new MyResizeObserver(this._onObserved);
	    }
	    // Adds an observable element
	    ObjectObservers.prototype.add = function (element, onResize) {
	        var observed = {
	            onResize: onResize,
	            element: element,
	        };
	        this._elementsMap.set(element, observed);
	        this._resizeObserver.observe(element);
	        return observed;
	    };
	    // Removes an observable element
	    ObjectObservers.prototype.remove = function (observed) {
	        this._resizeObserver.unobserve(observed.element);
	        this._elementsMap.delete(observed.element);
	    };
	    return ObjectObservers;
	}());
	var observers = new ObjectObservers();
	var RiveFile = /** @class */ (function () {
	    function RiveFile(params) {
	        // Allow the runtime to automatically load assets hosted in Rive's runtime.
	        this.enableRiveAssetCDN = true;
	        this.referenceCount = 0;
	        this.destroyed = false;
	        this.src = params.src;
	        this.buffer = params.buffer;
	        if (params.assetLoader)
	            this.assetLoader = params.assetLoader;
	        this.enableRiveAssetCDN =
	            typeof params.enableRiveAssetCDN == "boolean"
	                ? params.enableRiveAssetCDN
	                : true;
	        // New event management system
	        this.eventManager = new EventManager();
	        if (params.onLoad)
	            this.on(EventType.Load, params.onLoad);
	        if (params.onLoadError)
	            this.on(EventType.LoadError, params.onLoadError);
	    }
	    RiveFile.prototype.initData = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var _a, loader, _b;
	            var _c;
	            return __generator(this, function (_d) {
	                switch (_d.label) {
	                    case 0:
	                        if (!this.src) return [3 /*break*/, 2];
	                        _a = this;
	                        return [4 /*yield*/, loadRiveFile(this.src)];
	                    case 1:
	                        _a.buffer = _d.sent();
	                        _d.label = 2;
	                    case 2:
	                        if (this.destroyed) {
	                            return [2 /*return*/];
	                        }
	                        if (this.assetLoader) {
	                            loader = new this.runtime.CustomFileAssetLoader({
	                                loadContents: this.assetLoader,
	                            });
	                        }
	                        // Load the Rive file
	                        _b = this;
	                        return [4 /*yield*/, this.runtime.load(new Uint8Array(this.buffer), loader, this.enableRiveAssetCDN)];
	                    case 3:
	                        // Load the Rive file
	                        _b.file = _d.sent();
	                        if (this.destroyed) {
	                            (_c = this.file) === null || _c === void 0 ? void 0 : _c.delete();
	                            this.file = null;
	                            return [2 /*return*/];
	                        }
	                        if (this.file !== null) {
	                            this.eventManager.fire({
	                                type: EventType.Load,
	                                data: this,
	                            });
	                        }
	                        else {
	                            this.eventManager.fire({
	                                type: EventType.LoadError,
	                                data: null,
	                            });
	                            throw new Error(RiveFile.fileLoadErrorMessage);
	                        }
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    RiveFile.prototype.init = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var _a;
	            return __generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        // If no source file url specified, it's a bust
	                        if (!this.src && !this.buffer) {
	                            throw new Error(RiveFile.missingErrorMessage);
	                        }
	                        _a = this;
	                        return [4 /*yield*/, RuntimeLoader.awaitInstance()];
	                    case 1:
	                        _a.runtime = _b.sent();
	                        if (this.destroyed) {
	                            return [2 /*return*/];
	                        }
	                        return [4 /*yield*/, this.initData()];
	                    case 2:
	                        _b.sent();
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * Subscribe to Rive-generated events
	     * @param type the type of event to subscribe to
	     * @param callback callback to fire when the event occurs
	     */
	    RiveFile.prototype.on = function (type, callback) {
	        this.eventManager.add({
	            type: type,
	            callback: callback,
	        });
	    };
	    /**
	     * Unsubscribes from a Rive-generated event
	     * @param type the type of event to unsubscribe from
	     * @param callback the callback to unsubscribe
	     */
	    RiveFile.prototype.off = function (type, callback) {
	        this.eventManager.remove({
	            type: type,
	            callback: callback,
	        });
	    };
	    RiveFile.prototype.cleanup = function () {
	        var _a;
	        this.referenceCount -= 1;
	        if (this.referenceCount <= 0) {
	            this.removeAllRiveEventListeners();
	            (_a = this.file) === null || _a === void 0 ? void 0 : _a.delete();
	            this.file = null;
	            this.destroyed = true;
	        }
	    };
	    /**
	     * Unsubscribes all Rive listeners from an event type, or everything if no type is
	     * given
	     * @param type the type of event to unsubscribe from, or all types if
	     * undefined
	     */
	    RiveFile.prototype.removeAllRiveEventListeners = function (type) {
	        this.eventManager.removeAll(type);
	    };
	    RiveFile.prototype.getInstance = function () {
	        if (this.file !== null) {
	            this.referenceCount += 1;
	            return this.file;
	        }
	    };
	    // Error message for missing source or buffer
	    RiveFile.missingErrorMessage = "Rive source file or data buffer required";
	    // Error message for file load error
	    RiveFile.fileLoadErrorMessage = "The file failed to load";
	    return RiveFile;
	}());

	var Rive = /** @class */ (function () {
	    function Rive(params) {
	        var _this = this;
	        var _a;
	        // Tracks if a Rive file is loaded
	        this.loaded = false;
	        // Tracks if a Rive file is destroyed
	        this.destroyed = false;
	        // Reference of an object that handles any observers for the animation
	        this._observed = null;
	        /**
	         * Tracks if a Rive file is loaded; we need this in addition to loaded as some
	         * commands (e.g. contents) can be called as soon as the file is loaded.
	         * However, playback commands need to be queued and run in order once initial
	         * animations and autoplay has been sorted out. This applies to play, pause,
	         * and start.
	         */
	        this.readyForPlaying = false;
	        // Runtime artboard
	        this.artboard = null;
	        // place to clear up event listeners
	        this.eventCleanup = null;
	        this.shouldDisableRiveListeners = false;
	        this.automaticallyHandleEvents = false;
	        // Allow the runtime to automatically load assets hosted in Rive's runtime.
	        this.enableRiveAssetCDN = true;
	        // Keep a local value of the set volume to update it asynchronously
	        this._volume = 1;
	        // Keep a local value of the set width to update it asynchronously
	        this._artboardWidth = undefined;
	        // Keep a local value of the set height to update it asynchronously
	        this._artboardHeight = undefined;
	        // Keep a local value of the device pixel ratio used in rendering and canvas/artboard resizing
	        this._devicePixelRatioUsed = 1;
	        // Whether the canvas element's size is 0
	        this._hasZeroSize = false;
	        // Audio event listener
	        this._audioEventListener = null;
	        // draw method bound to the class
	        this._boundDraw = null;
	        // Durations to generate a frame for the last second. Used for performance profiling.
	        this.durations = [];
	        this.frameTimes = [];
	        this.frameCount = 0;
	        this.isTouchScrollEnabled = false;
	        this.onCanvasResize = function (hasZeroSize) {
	            var toggledDisplay = _this._hasZeroSize !== hasZeroSize;
	            _this._hasZeroSize = hasZeroSize;
	            if (!hasZeroSize) {
	                if (toggledDisplay) {
	                    _this.resizeDrawingSurfaceToCanvas();
	                }
	            }
	            else if (!_this._layout.maxX || !_this._layout.maxY) {
	                _this.resizeToCanvas();
	            }
	        };
	        /**
	         * Used be draw to track when a second of active rendering time has passed.
	         * Used for debugging purposes
	         */
	        this.renderSecondTimer = 0;
	        this._boundDraw = this.draw.bind(this);
	        this.canvas = params.canvas;
	        if (params.canvas.constructor === HTMLCanvasElement) {
	            this._observed = observers.add(this.canvas, this.onCanvasResize);
	        }
	        this.src = params.src;
	        this.buffer = params.buffer;
	        this.riveFile = params.riveFile;
	        this.layout = (_a = params.layout) !== null && _a !== void 0 ? _a : new Layout();
	        this.shouldDisableRiveListeners = !!params.shouldDisableRiveListeners;
	        this.isTouchScrollEnabled = !!params.isTouchScrollEnabled;
	        this.automaticallyHandleEvents = !!params.automaticallyHandleEvents;
	        this.enableRiveAssetCDN =
	            params.enableRiveAssetCDN === undefined
	                ? true
	                : params.enableRiveAssetCDN;
	        // New event management system
	        this.eventManager = new EventManager();
	        if (params.onLoad)
	            this.on(EventType.Load, params.onLoad);
	        if (params.onLoadError)
	            this.on(EventType.LoadError, params.onLoadError);
	        if (params.onPlay)
	            this.on(EventType.Play, params.onPlay);
	        if (params.onPause)
	            this.on(EventType.Pause, params.onPause);
	        if (params.onStop)
	            this.on(EventType.Stop, params.onStop);
	        if (params.onLoop)
	            this.on(EventType.Loop, params.onLoop);
	        if (params.onStateChange)
	            this.on(EventType.StateChange, params.onStateChange);
	        if (params.onAdvance)
	            this.on(EventType.Advance, params.onAdvance);
	        /**
	         * @deprecated Use camelCase'd versions instead.
	         */
	        if (params.onload && !params.onLoad)
	            this.on(EventType.Load, params.onload);
	        if (params.onloaderror && !params.onLoadError)
	            this.on(EventType.LoadError, params.onloaderror);
	        if (params.onplay && !params.onPlay)
	            this.on(EventType.Play, params.onplay);
	        if (params.onpause && !params.onPause)
	            this.on(EventType.Pause, params.onpause);
	        if (params.onstop && !params.onStop)
	            this.on(EventType.Stop, params.onstop);
	        if (params.onloop && !params.onLoop)
	            this.on(EventType.Loop, params.onloop);
	        if (params.onstatechange && !params.onStateChange)
	            this.on(EventType.StateChange, params.onstatechange);
	        /**
	         * Asset loading
	         */
	        if (params.assetLoader)
	            this.assetLoader = params.assetLoader;
	        // Hook up the task queue
	        this.taskQueue = new TaskQueueManager(this.eventManager);
	        this.init({
	            src: this.src,
	            buffer: this.buffer,
	            riveFile: this.riveFile,
	            autoplay: params.autoplay,
	            animations: params.animations,
	            stateMachines: params.stateMachines,
	            artboard: params.artboard,
	            useOffscreenRenderer: params.useOffscreenRenderer,
	        });
	    }
	    // Alternative constructor to build a Rive instance from an interface/object
	    Rive.new = function (params) {
	        console.warn("This function is deprecated: please use `new Rive({})` instead");
	        return new Rive(params);
	    };
	    // Event handler for when audio context becomes available
	    Rive.prototype.onSystemAudioChanged = function () {
	        this.volume = this._volume;
	    };
	    // Initializes the Rive object either from constructor or load()
	    Rive.prototype.init = function (_a) {
	        var _this = this;
	        var src = _a.src, buffer = _a.buffer, riveFile = _a.riveFile, animations = _a.animations, stateMachines = _a.stateMachines, artboard = _a.artboard, _b = _a.autoplay, autoplay = _b === void 0 ? false : _b, _c = _a.useOffscreenRenderer, useOffscreenRenderer = _c === void 0 ? false : _c;
	        if (this.destroyed) {
	            return;
	        }
	        this.src = src;
	        this.buffer = buffer;
	        this.riveFile = riveFile;
	        // If no source file url specified, it's a bust
	        if (!this.src && !this.buffer && !this.riveFile) {
	            throw new RiveError(Rive.missingErrorMessage);
	        }
	        // List of animations that should be initialized.
	        var startingAnimationNames = mapToStringArray(animations);
	        // List of state machines that should be initialized
	        var startingStateMachineNames = mapToStringArray(stateMachines);
	        // Ensure loaded is marked as false if loading new file
	        this.loaded = false;
	        this.readyForPlaying = false;
	        // Ensure the runtime is loaded
	        RuntimeLoader.awaitInstance()
	            .then(function (runtime) {
	            if (_this.destroyed) {
	                return;
	            }
	            _this.runtime = runtime;
	            _this.removeRiveListeners();
	            _this.deleteRiveRenderer();
	            // Get the canvas where you want to render the animation and create a renderer
	            _this.renderer = _this.runtime.makeRenderer(_this.canvas, useOffscreenRenderer);
	            // Initial size adjustment based on devicePixelRatio if no width/height are
	            // specified explicitly
	            if (!(_this.canvas.width || _this.canvas.height)) {
	                _this.resizeDrawingSurfaceToCanvas();
	            }
	            // Load Rive data from a source uri or a data buffer
	            _this.initData(artboard, startingAnimationNames, startingStateMachineNames, autoplay)
	                .then(function () { return _this.setupRiveListeners(); })
	                .catch(function (e) {
	                console.error(e);
	            });
	        })
	            .catch(function (e) {
	            console.error(e);
	        });
	    };
	    /**
	     * Setup Rive Listeners on the canvas
	     * @param riveListenerOptions - Enables TouchEvent events on the canvas. Set to true to allow
	     * touch scrolling on the canvas element on touch-enabled devices
	     * i.e. { isTouchScrollEnabled: true }
	     */
	    Rive.prototype.setupRiveListeners = function (riveListenerOptions) {
	        var _this = this;
	        if (this.eventCleanup) {
	            this.eventCleanup();
	        }
	        if (!this.shouldDisableRiveListeners) {
	            var activeStateMachines = (this.animator.stateMachines || [])
	                .filter(function (sm) { return sm.playing && _this.runtime.hasListeners(sm.instance); })
	                .map(function (sm) { return sm.instance; });
	            var touchScrollEnabledOption = this.isTouchScrollEnabled;
	            if (riveListenerOptions &&
	                "isTouchScrollEnabled" in riveListenerOptions) {
	                touchScrollEnabledOption = riveListenerOptions.isTouchScrollEnabled;
	            }
	            this.eventCleanup = (0, _utils__WEBPACK_IMPORTED_MODULE_3__.registerTouchInteractions)({
	                canvas: this.canvas,
	                artboard: this.artboard,
	                stateMachines: activeStateMachines,
	                renderer: this.renderer,
	                rive: this.runtime,
	                fit: this._layout.runtimeFit(this.runtime),
	                alignment: this._layout.runtimeAlignment(this.runtime),
	                isTouchScrollEnabled: touchScrollEnabledOption,
	                layoutScaleFactor: this._layout.layoutScaleFactor,
	            });
	        }
	    };
	    /**
	     * Remove Rive Listeners setup on the canvas
	     */
	    Rive.prototype.removeRiveListeners = function () {
	        if (this.eventCleanup) {
	            this.eventCleanup();
	            this.eventCleanup = null;
	        }
	    };
	    /**
	     * If the instance has audio and the system audio is not ready
	     * we hook the instance to the audio manager
	     */
	    Rive.prototype.initializeAudio = function () {
	        var _this = this;
	        var _a;
	        // Initialize audio if needed
	        if (audioManager.status == SystemAudioStatus.UNAVAILABLE) {
	            if (((_a = this.artboard) === null || _a === void 0 ? void 0 : _a.hasAudio) && this._audioEventListener === null) {
	                this._audioEventListener = {
	                    type: EventType.AudioStatusChange,
	                    callback: function () { return _this.onSystemAudioChanged(); },
	                };
	                audioManager.add(this._audioEventListener);
	                audioManager.establishAudio();
	            }
	        }
	    };
	    Rive.prototype.initArtboardSize = function () {
	        if (!this.artboard)
	            return;
	        // Use preset values if they are not undefined
	        this._artboardWidth = this.artboard.width =
	            this._artboardWidth || this.artboard.width;
	        this._artboardHeight = this.artboard.height =
	            this._artboardHeight || this.artboard.height;
	    };
	    // Initializes runtime with Rive data and preps for playing
	    Rive.prototype.initData = function (artboardName, animationNames, stateMachineNames, autoplay) {
	        return __awaiter(this, void 0, void 0, function () {
	            var error_1, msg;
	            var _a;
	            return __generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        _b.trys.push([0, 3, , 4]);
	                        if (!(this.riveFile == null)) return [3 /*break*/, 2];
	                        this.riveFile = new RiveFile({
	                            src: this.src,
	                            buffer: this.buffer,
	                            enableRiveAssetCDN: this.enableRiveAssetCDN,
	                            assetLoader: this.assetLoader,
	                        });
	                        return [4 /*yield*/, this.riveFile.init()];
	                    case 1:
	                        _b.sent();
	                        _b.label = 2;
	                    case 2:
	                        // Check for riveFile in case it has been cleaned up while initializing;
	                        if (!this.riveFile) {
	                            throw new RiveError(Rive.cleanupErrorMessage);
	                        }
	                        this.file = this.riveFile.getInstance();
	                        // Initialize and draw frame
	                        this.initArtboard(artboardName, animationNames, stateMachineNames, autoplay);
	                        // Initialize the artboard size
	                        this.initArtboardSize();
	                        // Check for audio
	                        this.initializeAudio();
	                        // Everything's set up, emit a load event
	                        this.loaded = true;
	                        this.eventManager.fire({
	                            type: EventType.Load,
	                            data: (_a = this.src) !== null && _a !== void 0 ? _a : "buffer",
	                        });
	                        // Flag ready for playback commands and clear the task queue; this order
	                        // is important or it may infinitely recurse
	                        this.readyForPlaying = true;
	                        this.taskQueue.process();
	                        this.drawFrame();
	                        return [2 /*return*/, Promise.resolve()];
	                    case 3:
	                        error_1 = _b.sent();
	                        msg = resolveErrorMessage(error_1);
	                        console.warn(msg);
	                        this.eventManager.fire({ type: EventType.LoadError, data: msg });
	                        return [2 /*return*/, Promise.reject(msg)];
	                    case 4: return [2 /*return*/];
	                }
	            });
	        });
	    };
	    // Initialize for playback
	    Rive.prototype.initArtboard = function (artboardName, animationNames, stateMachineNames, autoplay) {
	        if (!this.file) {
	            return;
	        }
	        // Fetch the artboard
	        var rootArtboard = artboardName
	            ? this.file.artboardByName(artboardName)
	            : this.file.defaultArtboard();
	        // Check we have a working artboard
	        if (!rootArtboard) {
	            var msg = "Invalid artboard name or no default artboard";
	            console.warn(msg);
	            this.eventManager.fire({ type: EventType.LoadError, data: msg });
	            return;
	        }
	        this.artboard = rootArtboard;
	        rootArtboard.volume = this._volume * audioManager.systemVolume;
	        // Check that the artboard has at least 1 animation
	        if (this.artboard.animationCount() < 1) {
	            var msg = "Artboard has no animations";
	            this.eventManager.fire({ type: EventType.LoadError, data: msg });
	            throw msg;
	        }
	        // Initialize the animator
	        this.animator = new Animator(this.runtime, this.artboard, this.eventManager);
	        // Initialize the animations; as loaded hasn't happened yet, we need to
	        // suppress firing the play/pause events until the load event has fired. To
	        // do this we tell the animator to suppress firing events, and add event
	        // firing to the task queue.
	        var instanceNames;
	        if (animationNames.length > 0 || stateMachineNames.length > 0) {
	            instanceNames = animationNames.concat(stateMachineNames);
	            this.animator.initLinearAnimations(animationNames, autoplay);
	            this.animator.initStateMachines(stateMachineNames, autoplay);
	        }
	        else {
	            instanceNames = [this.animator.atLeastOne(autoplay, false)];
	        }
	        // Queue up firing the playback events
	        this.taskQueue.add({
	            event: {
	                type: autoplay ? EventType.Play : EventType.Pause,
	                data: instanceNames,
	            },
	        });
	    };
	    // Draws the current artboard frame
	    Rive.prototype.drawFrame = function () {
	        var _a;
	        if ((_a = document === null || document === void 0 ? void 0 : document.timeline) === null || _a === void 0 ? void 0 : _a.currentTime) {
	            if (this.loaded && this.artboard && !this.frameRequestId) {
	                this._boundDraw(document.timeline.currentTime);
	            }
	        }
	        else {
	            this.startRendering();
	        }
	    };
	    /**
	     * Draw rendering loop; renders animation frames at the correct time interval.
	     * @param time the time at which to render a frame
	     */
	    Rive.prototype.draw = function (time, onSecond) {
	        // Clear the frameRequestId, as we're now rendering a fresh frame
	        this.frameRequestId = null;
	        var before = performance.now();
	        // On the first pass, make sure lastTime has a valid value
	        if (!this.lastRenderTime) {
	            this.lastRenderTime = time;
	        }
	        // Handle the onSecond callback
	        this.renderSecondTimer += time - this.lastRenderTime;
	        if (this.renderSecondTimer > 5000) {
	            this.renderSecondTimer = 0;
	            onSecond === null || onSecond === void 0 ? void 0 : onSecond();
	        }
	        // Calculate the elapsed time between frames in seconds
	        var elapsedTime = (time - this.lastRenderTime) / 1000;
	        this.lastRenderTime = time;
	        // - Advance non-paused animations by the elapsed number of seconds
	        // - Advance any animations that require scrubbing
	        // - Advance to the first frame even when autoplay is false
	        var activeAnimations = this.animator.animations
	            .filter(function (a) { return a.playing || a.needsScrub; })
	            // The scrubbed animations must be applied first to prevent weird artifacts
	            // if the playing animations conflict with the scrubbed animating attribuates.
	            .sort(function (first) { return (first.needsScrub ? -1 : 1); });
	        for (var _i = 0, activeAnimations_1 = activeAnimations; _i < activeAnimations_1.length; _i++) {
	            var animation = activeAnimations_1[_i];
	            animation.advance(elapsedTime);
	            if (animation.instance.didLoop) {
	                animation.loopCount += 1;
	            }
	            animation.apply(1.0);
	        }
	        // - Advance non-paused state machines by the elapsed number of seconds
	        // - Advance to the first frame even when autoplay is false
	        var activeStateMachines = this.animator.stateMachines.filter(function (a) { return a.playing; });
	        for (var _a = 0, activeStateMachines_1 = activeStateMachines; _a < activeStateMachines_1.length; _a++) {
	            var stateMachine = activeStateMachines_1[_a];
	            // Check for events before the current frame's state machine advance
	            var numEventsReported = stateMachine.reportedEventCount();
	            if (numEventsReported) {
	                for (var i = 0; i < numEventsReported; i++) {
	                    var event_1 = stateMachine.reportedEventAt(i);
	                    if (event_1) {
	                        if (event_1.type === RiveEventType.OpenUrl) {
	                            this.eventManager.fire({
	                                type: EventType.RiveEvent,
	                                data: event_1,
	                            });
	                            // Handle the event side effect if explicitly enabled
	                            if (this.automaticallyHandleEvents) {
	                                var newAnchorTag = document.createElement("a");
	                                var _b = event_1, url = _b.url, target = _b.target;
	                                var sanitizedUrl = (0, _utils__WEBPACK_IMPORTED_MODULE_3__.sanitizeUrl)(url);
	                                url && newAnchorTag.setAttribute("href", sanitizedUrl);
	                                target && newAnchorTag.setAttribute("target", target);
	                                if (sanitizedUrl && sanitizedUrl !== _utils__WEBPACK_IMPORTED_MODULE_3__.BLANK_URL) {
	                                    newAnchorTag.click();
	                                }
	                            }
	                        }
	                        else {
	                            this.eventManager.fire({
	                                type: EventType.RiveEvent,
	                                data: event_1,
	                            });
	                        }
	                    }
	                }
	            }
	            stateMachine.advanceAndApply(elapsedTime);
	            // stateMachine.instance.apply(this.artboard);
	        }
	        // Once the animations have been applied to the artboard, advance it
	        // by the elapsed time.
	        if (this.animator.stateMachines.length == 0) {
	            this.artboard.advance(elapsedTime);
	        }
	        var renderer = this.renderer;
	        // Canvas must be wiped to prevent artifacts
	        renderer.clear();
	        renderer.save();
	        // Update the renderer alignment if necessary
	        this.alignRenderer();
	        // Do not draw on 0 canvas size
	        if (!this._hasZeroSize) {
	            this.artboard.draw(renderer);
	        }
	        renderer.restore();
	        renderer.flush();
	        // Check for any animations that looped
	        this.animator.handleLooping();
	        // Check for any state machines that had a state change
	        this.animator.handleStateChanges();
	        // Report advanced time
	        this.animator.handleAdvancing(elapsedTime);
	        // Add duration to create frame to durations array
	        this.frameCount++;
	        var after = performance.now();
	        this.frameTimes.push(after);
	        this.durations.push(after - before);
	        while (this.frameTimes[0] <= after - 1000) {
	            this.frameTimes.shift();
	            this.durations.shift();
	        }
	        // Calling requestAnimationFrame will rerun draw() at the correct rate:
	        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
	        if (this.animator.isPlaying) {
	            // Request a new rendering frame
	            this.startRendering();
	        }
	        else if (this.animator.isPaused) {
	            // Reset the end time so on playback it starts at the correct frame
	            this.lastRenderTime = 0;
	        }
	        else if (this.animator.isStopped) {
	            // Reset animation instances, artboard and time
	            // TODO: implement this properly when we have instancing
	            // this.initArtboard();
	            // this.drawFrame();
	            this.lastRenderTime = 0;
	        }
	    };
	    /**
	     * Align the renderer
	     */
	    Rive.prototype.alignRenderer = function () {
	        var _a = this, renderer = _a.renderer, runtime = _a.runtime, _layout = _a._layout, artboard = _a.artboard;
	        // Align things up safe in the knowledge we can restore if changed
	        renderer.align(_layout.runtimeFit(runtime), _layout.runtimeAlignment(runtime), {
	            minX: _layout.minX,
	            minY: _layout.minY,
	            maxX: _layout.maxX,
	            maxY: _layout.maxY,
	        }, artboard.bounds, this._devicePixelRatioUsed * _layout.layoutScaleFactor);
	    };
	    Object.defineProperty(Rive.prototype, "fps", {
	        get: function () {
	            return this.durations.length;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "frameTime", {
	        get: function () {
	            if (this.durations.length === 0) {
	                return 0;
	            }
	            return (this.durations.reduce(function (a, b) { return a + b; }, 0) / this.durations.length).toFixed(4);
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Cleans up all Wasm-generated objects that need to be manually destroyed:
	     * artboard instances, animation instances, state machine instances,
	     * renderer instance, file and runtime.
	     *
	     * Once this is called, you will need to initialise a new instance of the
	     * Rive class
	     */
	    Rive.prototype.cleanup = function () {
	        var _a;
	        this.destroyed = true;
	        // Stop the renderer if it hasn't already been stopped.
	        this.stopRendering();
	        // Clean up any artboard, animation or state machine instances.
	        this.cleanupInstances();
	        // Remove from observer
	        if (this._observed !== null) {
	            observers.remove(this._observed);
	        }
	        this.removeRiveListeners();
	        if (this.file) {
	            (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.cleanup();
	            this.file = null;
	        }
	        this.riveFile = null;
	        this.deleteRiveRenderer();
	        if (this._audioEventListener !== null) {
	            audioManager.remove(this._audioEventListener);
	            this._audioEventListener = null;
	        }
	    };
	    /**
	     * Cleans up the Renderer object. Only call this API if you no longer
	     * need to render Rive content in your session.
	     */
	    Rive.prototype.deleteRiveRenderer = function () {
	        var _a;
	        (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.delete();
	        this.renderer = null;
	    };
	    /**
	     * Cleans up any Wasm-generated objects that need to be manually destroyed:
	     * artboard instances, animation instances, state machine instances.
	     *
	     * Once this is called, things will need to be reinitialized or bad things
	     * might happen.
	     */
	    Rive.prototype.cleanupInstances = function () {
	        if (this.eventCleanup !== null) {
	            this.eventCleanup();
	        }
	        // Delete all animation and state machine instances
	        this.stop();
	        if (this.artboard) {
	            this.artboard.delete();
	            this.artboard = null;
	        }
	    };
	    /**
	     * Tries to query the setup Artboard for a text run node with the given name.
	     *
	     * @param textRunName - Name of the text run node associated with a text object
	     * @returns - TextValueRun node or undefined if the text run cannot be queried
	     */
	    Rive.prototype.retrieveTextRun = function (textRunName) {
	        var _a;
	        if (!textRunName) {
	            console.warn("No text run name provided");
	            return;
	        }
	        if (!this.artboard) {
	            console.warn("Tried to access text run, but the Artboard is null");
	            return;
	        }
	        var textRun = this.artboard.textRun(textRunName);
	        if (!textRun) {
	            console.warn("Could not access a text run with name '".concat(textRunName, "' in the '").concat((_a = this.artboard) === null || _a === void 0 ? void 0 : _a.name, "' Artboard. Note that you must rename a text run node in the Rive editor to make it queryable at runtime."));
	            return;
	        }
	        return textRun;
	    };
	    /**
	     * Returns a string from a given text run node name, or undefined if the text run
	     * cannot be queried.
	     *
	     * @param textRunName - Name of the text run node associated with a text object
	     * @returns - String value of the text run node or undefined
	     */
	    Rive.prototype.getTextRunValue = function (textRunName) {
	        var textRun = this.retrieveTextRun(textRunName);
	        return textRun ? textRun.text : undefined;
	    };
	    /**
	     * Sets a text value for a given text run node name if possible
	     *
	     * @param textRunName - Name of the text run node associated with a text object
	     * @param textRunValue - String value to set on the text run node
	     */
	    Rive.prototype.setTextRunValue = function (textRunName, textRunValue) {
	        var textRun = this.retrieveTextRun(textRunName);
	        if (textRun) {
	            textRun.text = textRunValue;
	        }
	    };
	    // Plays specified animations; if none specified, it unpauses everything.
	    Rive.prototype.play = function (animationNames, autoplay) {
	        var _this = this;
	        animationNames = mapToStringArray(animationNames);
	        // If the file's not loaded, queue up the play
	        if (!this.readyForPlaying) {
	            this.taskQueue.add({
	                action: function () { return _this.play(animationNames, autoplay); },
	            });
	            return;
	        }
	        this.animator.play(animationNames);
	        if (this.eventCleanup) {
	            this.eventCleanup();
	        }
	        this.setupRiveListeners();
	        this.startRendering();
	    };
	    // Pauses specified animations; if none specified, pauses all.
	    Rive.prototype.pause = function (animationNames) {
	        var _this = this;
	        animationNames = mapToStringArray(animationNames);
	        // If the file's not loaded, early out, nothing to pause
	        if (!this.readyForPlaying) {
	            this.taskQueue.add({
	                action: function () { return _this.pause(animationNames); },
	            });
	            return;
	        }
	        if (this.eventCleanup) {
	            this.eventCleanup();
	        }
	        this.animator.pause(animationNames);
	    };
	    Rive.prototype.scrub = function (animationNames, value) {
	        var _this = this;
	        animationNames = mapToStringArray(animationNames);
	        // If the file's not loaded, early out, nothing to pause
	        if (!this.readyForPlaying) {
	            this.taskQueue.add({
	                action: function () { return _this.scrub(animationNames, value); },
	            });
	            return;
	        }
	        // Scrub the animation time; we draw a single frame here so that if
	        // nothing's currently playing, the scrubbed animation is still rendered/
	        this.animator.scrub(animationNames, value || 0);
	        this.drawFrame();
	    };
	    // Stops specified animations; if none specifies, stops them all.
	    Rive.prototype.stop = function (animationNames) {
	        var _this = this;
	        animationNames = mapToStringArray(animationNames);
	        // If the file's not loaded, early out, nothing to pause
	        if (!this.readyForPlaying) {
	            this.taskQueue.add({
	                action: function () { return _this.stop(animationNames); },
	            });
	            return;
	        }
	        // If there is no artboard, this.animator will be undefined
	        if (this.animator) {
	            this.animator.stop(animationNames);
	        }
	        if (this.eventCleanup) {
	            this.eventCleanup();
	        }
	    };
	    /**
	     * Resets the animation
	     * @param artboard the name of the artboard, or default if none given
	     * @param animations the names of animations for playback
	     * @param stateMachines the names of state machines for playback
	     * @param autoplay whether to autoplay when reset, defaults to false
	     *
	     */
	    Rive.prototype.reset = function (params) {
	        var _a;
	        // Get the current artboard, animations, state machines, and playback states
	        var artBoardName = params === null || params === void 0 ? void 0 : params.artboard;
	        var animationNames = mapToStringArray(params === null || params === void 0 ? void 0 : params.animations);
	        var stateMachineNames = mapToStringArray(params === null || params === void 0 ? void 0 : params.stateMachines);
	        var autoplay = (_a = params === null || params === void 0 ? void 0 : params.autoplay) !== null && _a !== void 0 ? _a : false;
	        // Stop everything and clean up
	        this.cleanupInstances();
	        // Reinitialize an artboard instance with the state
	        this.initArtboard(artBoardName, animationNames, stateMachineNames, autoplay);
	        this.taskQueue.process();
	    };
	    // Loads a new Rive file, keeping listeners in place
	    Rive.prototype.load = function (params) {
	        this.file = null;
	        // Stop all animations
	        this.stop();
	        // Reinitialize
	        this.init(params);
	    };
	    Object.defineProperty(Rive.prototype, "layout", {
	        /**
	         * Returns the current layout. Note that layout should be treated as
	         * immutable. If you want to change the layout, create a new one use the
	         * layout setter
	         */
	        get: function () {
	            return this._layout;
	        },
	        // Sets a new layout
	        set: function (layout) {
	            this._layout = layout;
	            // If the maxX or maxY are 0, then set them to the canvas width and height
	            if (!layout.maxX || !layout.maxY) {
	                this.resizeToCanvas();
	            }
	            if (this.loaded && !this.animator.isPlaying) {
	                this.drawFrame();
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Sets the layout bounds to the current canvas size; this is typically called
	     * when the canvas is resized
	     */
	    Rive.prototype.resizeToCanvas = function () {
	        this._layout = this.layout.copyWith({
	            minX: 0,
	            minY: 0,
	            maxX: this.canvas.width,
	            maxY: this.canvas.height,
	        });
	    };
	    /**
	     * Accounts for devicePixelRatio as a multiplier to render the size of the canvas drawing surface.
	     * Uses the size of the backing canvas to set new width/height attributes. Need to re-render
	     * and resize the layout to match the new drawing surface afterwards.
	     * Useful function for consumers to include in a window resize listener.
	     *
	     * This method will set the {@link devicePixelRatioUsed} property.
	     *
	     * Optionally, you can provide a {@link customDevicePixelRatio} to provide a
	     * custom value.
	     */
	    Rive.prototype.resizeDrawingSurfaceToCanvas = function (customDevicePixelRatio) {
	        if (this.canvas instanceof HTMLCanvasElement && !!window) {
	            var _a = this.canvas.getBoundingClientRect(), width = _a.width, height = _a.height;
	            var dpr = customDevicePixelRatio || window.devicePixelRatio || 1;
	            this.devicePixelRatioUsed = dpr;
	            this.canvas.width = dpr * width;
	            this.canvas.height = dpr * height;
	            this.resizeToCanvas();
	            this.drawFrame();
	            if (this.layout.fit === Fit.Layout) {
	                var scaleFactor = this._layout.layoutScaleFactor;
	                this.artboard.width = width / scaleFactor;
	                this.artboard.height = height / scaleFactor;
	            }
	        }
	    };
	    Object.defineProperty(Rive.prototype, "source", {
	        // Returns the animation source, which may be undefined
	        get: function () {
	            return this.src;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "activeArtboard", {
	        /**
	         * Returns the name of the active artboard
	         */
	        get: function () {
	            return this.artboard ? this.artboard.name : "";
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "animationNames", {
	        // Returns a list of animation names on the chosen artboard
	        get: function () {
	            // If the file's not loaded, we got nothing to return
	            if (!this.loaded || !this.artboard) {
	                return [];
	            }
	            var animationNames = [];
	            for (var i = 0; i < this.artboard.animationCount(); i++) {
	                animationNames.push(this.artboard.animationByIndex(i).name);
	            }
	            return animationNames;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "stateMachineNames", {
	        /**
	         * Returns a list of state machine names from the current artboard
	         */
	        get: function () {
	            // If the file's not loaded, we got nothing to return
	            if (!this.loaded || !this.artboard) {
	                return [];
	            }
	            var stateMachineNames = [];
	            for (var i = 0; i < this.artboard.stateMachineCount(); i++) {
	                stateMachineNames.push(this.artboard.stateMachineByIndex(i).name);
	            }
	            return stateMachineNames;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Returns the inputs for the specified instanced state machine, or an empty
	     * list if the name is invalid or the state machine is not instanced
	     * @param name the state machine name
	     * @returns the inputs for the named state machine
	     */
	    Rive.prototype.stateMachineInputs = function (name) {
	        // If the file's not loaded, early out, nothing to pause
	        if (!this.loaded) {
	            return;
	        }
	        var stateMachine = this.animator.stateMachines.find(function (m) { return m.name === name; });
	        return stateMachine === null || stateMachine === void 0 ? void 0 : stateMachine.inputs;
	    };
	    // Returns the input with the provided name at the given path
	    Rive.prototype.retrieveInputAtPath = function (name, path) {
	        if (!name) {
	            console.warn("No input name provided for path '".concat(path, "'"));
	            return;
	        }
	        if (!this.artboard) {
	            console.warn("Tried to access input: '".concat(name, "', at path: '").concat(path, "', but the Artboard is null"));
	            return;
	        }
	        var input = this.artboard.inputByPath(name, path);
	        if (!input) {
	            console.warn("Could not access an input with name: '".concat(name, "', at path:'").concat(path, "'"));
	            return;
	        }
	        return input;
	    };
	    /**
	     * Set the boolean input with the provided name at the given path with value
	     * @param input the state machine input name
	     * @param value the value to set the input to
	     * @param path the path the input is located at an artboard level
	     */
	    Rive.prototype.setBooleanStateAtPath = function (inputName, value, path) {
	        var input = this.retrieveInputAtPath(inputName, path);
	        if (!input)
	            return;
	        if (input.type === StateMachineInputType.Boolean) {
	            input.asBool().value = value;
	        }
	        else {
	            console.warn("Input with name: '".concat(inputName, "', at path:'").concat(path, "' is not a boolean"));
	        }
	    };
	    /**
	     * Set the number input with the provided name at the given path with value
	     * @param input the state machine input name
	     * @param value the value to set the input to
	     * @param path the path the input is located at an artboard level
	     */
	    Rive.prototype.setNumberStateAtPath = function (inputName, value, path) {
	        var input = this.retrieveInputAtPath(inputName, path);
	        if (!input)
	            return;
	        if (input.type === StateMachineInputType.Number) {
	            input.asNumber().value = value;
	        }
	        else {
	            console.warn("Input with name: '".concat(inputName, "', at path:'").concat(path, "' is not a number"));
	        }
	    };
	    /**
	     * Fire the trigger with the provided name at the given path
	     * @param input the state machine input name
	     * @param path the path the input is located at an artboard level
	     */
	    Rive.prototype.fireStateAtPath = function (inputName, path) {
	        var input = this.retrieveInputAtPath(inputName, path);
	        if (!input)
	            return;
	        if (input.type === StateMachineInputType.Trigger) {
	            input.asTrigger().fire();
	        }
	        else {
	            console.warn("Input with name: '".concat(inputName, "', at path:'").concat(path, "' is not a trigger"));
	        }
	    };
	    // Returns the TextValueRun object for the provided name at the given path
	    Rive.prototype.retrieveTextAtPath = function (name, path) {
	        if (!name) {
	            console.warn("No text name provided for path '".concat(path, "'"));
	            return;
	        }
	        if (!path) {
	            console.warn("No path provided for text '".concat(name, "'"));
	            return;
	        }
	        if (!this.artboard) {
	            console.warn("Tried to access text: '".concat(name, "', at path: '").concat(path, "', but the Artboard is null"));
	            return;
	        }
	        var text = this.artboard.textByPath(name, path);
	        if (!text) {
	            console.warn("Could not access text with name: '".concat(name, "', at path:'").concat(path, "'"));
	            return;
	        }
	        return text;
	    };
	    /**
	     * Retrieves the text value for a specified text run at a given path
	     * @param textName The name of the text run
	     * @param path The path to the text run within the artboard
	     * @returns The text value of the text run, or undefined if not found
	     *
	     * @example
	     * // Get the text value for a text run named "title" at one nested artboard deep
	     * const titleText = riveInstance.getTextRunValueAtPath("title", "artboard1");
	     *
	     * @example
	     * // Get the text value for a text run named "subtitle" within a nested group two artboards deep
	     * const subtitleText = riveInstance.getTextRunValueAtPath("subtitle", "group/nestedGroup");
	     *
	     * @remarks
	     * If the text run cannot be found at the specified path, a warning will be logged to the console.
	     */
	    Rive.prototype.getTextRunValueAtPath = function (textName, path) {
	        var run = this.retrieveTextAtPath(textName, path);
	        if (!run) {
	            console.warn("Could not get text with name: '".concat(textName, "', at path:'").concat(path, "'"));
	            return;
	        }
	        return run.text;
	    };
	    /**
	     * Sets the text value for a specified text run at a given path
	     * @param textName The name of the text run
	     * @param value The new text value to set
	     * @param path The path to the text run within the artboard
	     * @returns void
	     *
	     * @example
	     * // Set the text value for a text run named "title" at one nested artboard deep
	     * riveInstance.setTextRunValueAtPath("title", "New Title", "artboard1");
	     *
	     * @example
	     * // Set the text value for a text run named "subtitle" within a nested group two artboards deep
	     * riveInstance.setTextRunValueAtPath("subtitle", "New Subtitle", "group/nestedGroup");
	     *
	     * @remarks
	     * If the text run cannot be found at the specified path, a warning will be logged to the console.
	     */
	    Rive.prototype.setTextRunValueAtPath = function (textName, value, path) {
	        var run = this.retrieveTextAtPath(textName, path);
	        if (!run) {
	            console.warn("Could not set text with name: '".concat(textName, "', at path:'").concat(path, "'"));
	            return;
	        }
	        run.text = value;
	    };
	    Object.defineProperty(Rive.prototype, "playingStateMachineNames", {
	        // Returns a list of playing machine names
	        get: function () {
	            // If the file's not loaded, we got nothing to return
	            if (!this.loaded) {
	                return [];
	            }
	            return this.animator.stateMachines
	                .filter(function (m) { return m.playing; })
	                .map(function (m) { return m.name; });
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "playingAnimationNames", {
	        // Returns a list of playing animation names
	        get: function () {
	            // If the file's not loaded, we got nothing to return
	            if (!this.loaded) {
	                return [];
	            }
	            return this.animator.animations.filter(function (a) { return a.playing; }).map(function (a) { return a.name; });
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "pausedAnimationNames", {
	        // Returns a list of paused animation names
	        get: function () {
	            // If the file's not loaded, we got nothing to return
	            if (!this.loaded) {
	                return [];
	            }
	            return this.animator.animations
	                .filter(function (a) { return !a.playing; })
	                .map(function (a) { return a.name; });
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "pausedStateMachineNames", {
	        /**
	         *  Returns a list of paused machine names
	         * @returns a list of state machine names that are paused
	         */
	        get: function () {
	            // If the file's not loaded, we got nothing to return
	            if (!this.loaded) {
	                return [];
	            }
	            return this.animator.stateMachines
	                .filter(function (m) { return !m.playing; })
	                .map(function (m) { return m.name; });
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "isPlaying", {
	        /**
	         * @returns true if any animation is playing
	         */
	        get: function () {
	            return this.animator.isPlaying;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "isPaused", {
	        /**
	         * @returns true if all instanced animations are paused
	         */
	        get: function () {
	            return this.animator.isPaused;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "isStopped", {
	        /**
	         * @returns true if no animations are playing or paused
	         */
	        get: function () {
	            return this.animator.isStopped;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "bounds", {
	        /**
	         * @returns the bounds of the current artboard, or undefined if the artboard
	         * isn't loaded yet.
	         */
	        get: function () {
	            return this.artboard ? this.artboard.bounds : undefined;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Subscribe to Rive-generated events
	     * @param type the type of event to subscribe to
	     * @param callback callback to fire when the event occurs
	     */
	    Rive.prototype.on = function (type, callback) {
	        this.eventManager.add({
	            type: type,
	            callback: callback,
	        });
	    };
	    /**
	     * Unsubscribes from a Rive-generated event
	     * @param type the type of event to unsubscribe from
	     * @param callback the callback to unsubscribe
	     */
	    Rive.prototype.off = function (type, callback) {
	        this.eventManager.remove({
	            type: type,
	            callback: callback,
	        });
	    };
	    /**
	     * Unsubscribes from a Rive-generated event
	     * @deprecated
	     * @param callback the callback to unsubscribe from
	     */
	    Rive.prototype.unsubscribe = function (type, callback) {
	        console.warn("This function is deprecated: please use `off()` instead.");
	        this.off(type, callback);
	    };
	    /**
	     * Unsubscribes all Rive listeners from an event type, or everything if no type is
	     * given
	     * @param type the type of event to unsubscribe from, or all types if
	     * undefined
	     */
	    Rive.prototype.removeAllRiveEventListeners = function (type) {
	        this.eventManager.removeAll(type);
	    };
	    /**
	     * Unsubscribes all listeners from an event type, or everything if no type is
	     * given
	     * @deprecated
	     * @param type the type of event to unsubscribe from, or all types if
	     * undefined
	     */
	    Rive.prototype.unsubscribeAll = function (type) {
	        console.warn("This function is deprecated: please use `removeAllRiveEventListeners()` instead.");
	        this.removeAllRiveEventListeners(type);
	    };
	    /**
	     * Stops the rendering loop; this is different from pausing in that it doesn't
	     * change the state of any animation. It stops rendering from occurring. This
	     * is designed for situations such as when Rive isn't visible.
	     *
	     * The only way to start rendering again is to call `startRendering`.
	     * Animations that are marked as playing will start from the position that
	     * they would have been at if rendering had not been stopped.
	     */
	    Rive.prototype.stopRendering = function () {
	        if (this.loaded && this.frameRequestId) {
	            if (this.runtime.cancelAnimationFrame) {
	                this.runtime.cancelAnimationFrame(this.frameRequestId);
	            }
	            else {
	                cancelAnimationFrame(this.frameRequestId);
	            }
	            this.frameRequestId = null;
	        }
	    };
	    /**
	     * Starts the rendering loop if it has been previously stopped. If the
	     * renderer is already active, then this will have zero effect.
	     */
	    Rive.prototype.startRendering = function () {
	        if (this.loaded && this.artboard && !this.frameRequestId) {
	            if (this.runtime.requestAnimationFrame) {
	                this.frameRequestId = this.runtime.requestAnimationFrame(this._boundDraw);
	            }
	            else {
	                this.frameRequestId = requestAnimationFrame(this._boundDraw);
	            }
	        }
	    };
	    /**
	     * Enables frames-per-second (FPS) reporting for the runtime
	     * If no callback is provided, Rive will append a fixed-position div at the top-right corner of
	     * the page with the FPS reading
	     * @param fpsCallback - Callback from the runtime during the RAF loop that supplies the FPS value
	     */
	    Rive.prototype.enableFPSCounter = function (fpsCallback) {
	        this.runtime.enableFPSCounter(fpsCallback);
	    };
	    /**
	     * Disables frames-per-second (FPS) reporting for the runtime
	     */
	    Rive.prototype.disableFPSCounter = function () {
	        this.runtime.disableFPSCounter();
	    };
	    Object.defineProperty(Rive.prototype, "contents", {
	        /**
	         * Returns the contents of a Rive file: the artboards, animations, and state machines
	         */
	        get: function () {
	            if (!this.loaded) {
	                return undefined;
	            }
	            var riveContents = {
	                artboards: [],
	            };
	            for (var i = 0; i < this.file.artboardCount(); i++) {
	                var artboard = this.file.artboardByIndex(i);
	                var artboardContents = {
	                    name: artboard.name,
	                    animations: [],
	                    stateMachines: [],
	                };
	                for (var j = 0; j < artboard.animationCount(); j++) {
	                    var animation = artboard.animationByIndex(j);
	                    artboardContents.animations.push(animation.name);
	                }
	                for (var k = 0; k < artboard.stateMachineCount(); k++) {
	                    var stateMachine = artboard.stateMachineByIndex(k);
	                    var name_1 = stateMachine.name;
	                    var instance = new this.runtime.StateMachineInstance(stateMachine, artboard);
	                    var inputContents = [];
	                    for (var l = 0; l < instance.inputCount(); l++) {
	                        var input = instance.input(l);
	                        inputContents.push({ name: input.name, type: input.type });
	                    }
	                    artboardContents.stateMachines.push({
	                        name: name_1,
	                        inputs: inputContents,
	                    });
	                }
	                riveContents.artboards.push(artboardContents);
	            }
	            return riveContents;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "volume", {
	        /**
	         * Getter / Setter for the volume of the artboard
	         */
	        get: function () {
	            if (this.artboard && this.artboard.volume !== this._volume) {
	                this._volume = this.artboard.volume;
	            }
	            return this._volume;
	        },
	        set: function (value) {
	            this._volume = value;
	            if (this.artboard) {
	                this.artboard.volume = value * audioManager.systemVolume;
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "artboardWidth", {
	        /**
	         * The width of the artboard.
	         *
	         * This will return 0 if the artboard is not loaded yet and a custom
	         * width has not been set.
	         *
	         * Do not set this value manually when using {@link resizeDrawingSurfaceToCanvas}
	         * with a {@link Layout.fit} of {@link Fit.Layout}, as the artboard width is
	         * automatically set.
	         */
	        get: function () {
	            var _a;
	            if (this.artboard) {
	                return this.artboard.width;
	            }
	            return (_a = this._artboardWidth) !== null && _a !== void 0 ? _a : 0;
	        },
	        set: function (value) {
	            this._artboardWidth = value;
	            if (this.artboard) {
	                this.artboard.width = value;
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Rive.prototype, "artboardHeight", {
	        /**
	         * The height of the artboard.
	         *
	         * This will return 0 if the artboard is not loaded yet and a custom
	         * height has not been set.
	         *
	         * Do not set this value manually when using {@link resizeDrawingSurfaceToCanvas}
	         * with a {@link Layout.fit} of {@link Fit.Layout}, as the artboard height is
	         * automatically set.
	         */
	        get: function () {
	            var _a;
	            if (this.artboard) {
	                return this.artboard.height;
	            }
	            return (_a = this._artboardHeight) !== null && _a !== void 0 ? _a : 0;
	        },
	        set: function (value) {
	            this._artboardHeight = value;
	            if (this.artboard) {
	                this.artboard.height = value;
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Reset the artboard size to its original values.
	     */
	    Rive.prototype.resetArtboardSize = function () {
	        if (this.artboard) {
	            this.artboard.resetArtboardSize();
	            this._artboardWidth = this.artboard.width;
	            this._artboardHeight = this.artboard.height;
	        }
	        else {
	            // If the artboard isn't loaded, we need to reset the custom width and height
	            this._artboardWidth = undefined;
	            this._artboardHeight = undefined;
	        }
	    };
	    Object.defineProperty(Rive.prototype, "devicePixelRatioUsed", {
	        /**
	         * The device pixel ratio used in rendering and canvas/artboard resizing.
	         *
	         * This value will be overidden by the device pixel ratio used in
	         * {@link resizeDrawingSurfaceToCanvas}. If you use that method, do not set this value.
	         */
	        get: function () {
	            return this._devicePixelRatioUsed;
	        },
	        set: function (value) {
	            this._devicePixelRatioUsed = value;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    // Error message for missing source or buffer
	    Rive.missingErrorMessage = "Rive source file or data buffer required";
	    // Error message for removed rive file
	    Rive.cleanupErrorMessage = "Attempt to use file after calling cleanup.";
	    return Rive;
	}());

	// Loads Rive data from a URI via fetch.
	var loadRiveFile = function (src) { return __awaiter(void 0, void 0, void 0, function () {
	    var req, res, buffer;
	    return __generator(this, function (_a) {
	        switch (_a.label) {
	            case 0:
	                req = new Request(src);
	                return [4 /*yield*/, fetch(req)];
	            case 1:
	                res = _a.sent();
	                return [4 /*yield*/, res.arrayBuffer()];
	            case 2:
	                buffer = _a.sent();
	                return [2 /*return*/, buffer];
	        }
	    });
	}); };
	// #endregion
	// #region utility functions
	/*
	 * Utility function to ensure an object is a string array
	 */
	var mapToStringArray = function (obj) {
	    if (typeof obj === "string") {
	        return [obj];
	    }
	    else if (obj instanceof Array) {
	        return obj;
	    }
	    // If obj is undefined, return empty array
	    return [];
	};
	// #endregion
	// #region testing utilities
	// Exports to only be used for tests
	var Testing = {
	    EventManager: EventManager,
	    TaskQueueManager: TaskQueueManager,
	};
	// #endregion
	// #region asset loaders
	/**
	 * Decodes bytes into an audio asset.
	 *
	 * Be sure to call `.unref()` on the audio once it is no longer needed. This
	 * allows the engine to clean it up when it is not used by any more animations.
	 */
	var decodeAudio = function (bytes) {
	    return new Promise(function (resolve) {
	        return RuntimeLoader.getInstance(function (rive) {
	            rive.decodeAudio(bytes, resolve);
	        });
	    });
	};
	/**
	 * Decodes bytes into an image.
	 *
	 * Be sure to call `.unref()` on the image once it is no longer needed. This
	 * allows the engine to clean it up when it is not used by any more animations.
	 */
	var decodeImage = function (bytes) {
	    return new Promise(function (resolve) {
	        return RuntimeLoader.getInstance(function (rive) {
	            rive.decodeImage(bytes, resolve);
	        });
	    });
	};
	/**
	 * Decodes bytes into a font.
	 *
	 * Be sure to call `.unref()` on the font once it is no longer needed. This
	 * allows the engine to clean it up when it is not used by any more animations.
	 */
	var decodeFont = function (bytes) {
	    return new Promise(function (resolve) {
	        return RuntimeLoader.getInstance(function (rive) {
	            rive.decodeFont(bytes, resolve);
	        });
	    });
	};
	// #endregion

	})();

	/******/ 	return __webpack_exports__;
	/******/ })()
	;
	});
	
} (rive$2));

var riveExports = rive$2.exports;

const rive$1 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null
}, [riveExports]);

export { rive$1 as r };
//# sourceMappingURL=rive.mjs.map
