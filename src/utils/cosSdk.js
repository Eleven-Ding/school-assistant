!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.COS = t())
    : (e.COS = t());
})("undefined" != typeof self ? self : this, function () {
  return (function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = (n[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
    }
    var n = {};
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function (e, n, o) {
        t.o(e, n) ||
          Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o,
          });
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(n, "a", n), n;
      }),
      (t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = "/dist/"),
      t((t.s = 5))
    );
  })([
    function (e, t, n) {
      (function (t) {
        function o(e) {
          return encodeURIComponent(e)
            .replace(/!/g, "%21")
            .replace(/'/g, "%27")
            .replace(/\(/g, "%28")
            .replace(/\)/g, "%29")
            .replace(/\*/g, "%2A");
        }
        function r(e, t) {
          var n = [];
          for (var r in e)
            e.hasOwnProperty(r) && n.push(t ? o(r).toLowerCase() : r);
          return n.sort(function (e, t) {
            return (
              (e = e.toLowerCase()),
              (t = t.toLowerCase()),
              e === t ? 0 : e > t ? 1 : -1
            );
          });
        }
        function i(e) {
          return f(e, function (e) {
            return "object" == typeof e && null !== e ? i(e) : e;
          });
        }
        function a(e, t, n) {
          return e && t in e ? e[t] : n;
        }
        function s(e, t) {
          return (
            d(t, function (n, o) {
              e[o] = t[o];
            }),
            e
          );
        }
        function c(e) {
          return e instanceof Array;
        }
        function u(e, t) {
          for (var n = !1, o = 0; o < e.length; o++)
            if (t === e[o]) {
              n = !0;
              break;
            }
          return n;
        }
        function l(e) {
          return c(e) ? e : [e];
        }
        function d(e, t) {
          for (var n in e) e.hasOwnProperty(n) && t(e[n], n);
        }
        function f(e, t) {
          var n = c(e) ? [] : {};
          for (var o in e) e.hasOwnProperty(o) && (n[o] = t(e[o], o));
          return n;
        }
        function h(e, t) {
          var n = c(e),
            o = n ? [] : {};
          for (var r in e)
            e.hasOwnProperty(r) &&
              t(e[r], r) &&
              (n ? o.push(e[r]) : (o[r] = e[r]));
          return o;
        }
        var p = n(7),
          g = n(10),
          m = n(11),
          y = n(14),
          C = function (e, t) {
            var n,
              i,
              a,
              s = [],
              c = r(e);
            for (n = 0; n < c.length; n++)
              (i = c[n]),
                (a = void 0 === e[i] || null === e[i] ? "" : "" + e[i]),
                (i = t ? o(i).toLowerCase() : o(i)),
                (a = o(a) || ""),
                s.push(i + "=" + a);
            return s.join("&");
          },
          v = [
            "content-disposition",
            "content-encoding",
            "content-length",
            "content-md5",
            "expect",
            "host",
            "if-match",
            "if-modified-since",
            "if-none-match",
            "if-unmodified-since",
            "origin",
            "range",
            "response-cache-control",
            "response-content-disposition",
            "response-content-encoding",
            "response-content-language",
            "response-content-type",
            "response-expires",
            "transfer-encoding",
            "versionid",
          ],
          k = function (e) {
            var t = {};
            for (var n in e) {
              var o = n.toLowerCase();
              (o.indexOf("x-cos-") > -1 || v.indexOf(o) > -1) && (t[n] = e[n]);
            }
            return t;
          },
          S = function (e) {
            e = e || {};
            var t,
              n = e.SecretId,
              o = e.SecretKey,
              a = e.KeyTime,
              s = (e.method || e.Method || "get").toLowerCase(),
              c = i(e.Query || e.params || {}),
              u = k(i(e.Headers || e.headers || {})),
              l = e.Key || "";
            if (
              (e.UseRawKey
                ? (t = e.Pathname || e.pathname || "/" + l)
                : ((t = e.Pathname || e.pathname || l),
                  0 !== t.indexOf("/") && (t = "/" + t)),
              !u.Host &&
                !u.host &&
                e.Bucket &&
                e.Region &&
                (u.Host = e.Bucket + ".cos." + e.Region + ".myqcloud.com"),
              !n)
            )
              throw new Error("missing param SecretId");
            if (!o) throw new Error("missing param SecretKey");
            var d = Math.round(F(e.SystemClockOffset) / 1e3) - 1,
              f = d,
              h = e.Expires || e.expires;
            f += void 0 === h ? 900 : 1 * h || 0;
            var p = n,
              m = a || d + ";" + f,
              y = a || d + ";" + f,
              C = r(u, !0).join(";").toLowerCase(),
              v = r(c, !0).join(";").toLowerCase(),
              S = g.HmacSHA1(y, o).toString(),
              R = [s, t, q.obj2str(c, !0), q.obj2str(u, !0), ""].join("\n"),
              b = ["sha1", m, g.SHA1(R).toString(), ""].join("\n");
            return [
              "q-sign-algorithm=sha1",
              "q-ak=" + p,
              "q-sign-time=" + m,
              "q-key-time=" + y,
              "q-header-list=" + C,
              "q-url-param-list=" + v,
              "q-signature=" + g.HmacSHA1(b, S).toString(),
            ].join("&");
          },
          R = function (e, t, n) {
            var o = t / 8,
              r = e.slice(n, n + o);
            return (
              new Uint8Array(r).reverse(),
              new { 8: Uint8Array, 16: Uint16Array, 32: Uint32Array }[t](r)[0]
            );
          },
          b = function (e, t, n, o) {
            var r = e.slice(t, n),
              i = "";
            return (
              new Uint8Array(r).forEach(function (e) {
                i += String.fromCharCode(e);
              }),
              o && (i = decodeURIComponent(escape(i))),
              i
            );
          },
          B = function (e) {
            for (var t = {}, n = b(e), o = { records: [] }; e.byteLength; ) {
              var r,
                i = R(e, 32, 0),
                a = R(e, 32, 4),
                s = i - a - 16,
                c = 0;
              for (e = e.slice(12); c < a; ) {
                var u = R(e, 8, c),
                  l = b(e, c + 1, c + 1 + u),
                  d = R(e, 16, c + u + 2),
                  f = b(e, c + u + 4, c + u + 4 + d);
                (t[l] = f), (c += u + 4 + d);
              }
              if ("Records" === t[":event-type"])
                (r = b(e, c, c + s, !0)), o.records.push(r);
              else if ("Stats" === t[":event-type"])
                (r = b(e, c, c + s, !0)), (o.stats = q.xml2json(r).Stats);
              else if ("error" === t[":event-type"]) {
                var h = t[":error-code"],
                  p = t[":error-message"],
                  g = new Error(p);
                (g.message = p), (g.name = g.code = h), (o.error = g);
              } else
                ["Progress", "Continuation", "End"].includes(t[":event-type"]);
              e = e.slice(c + s + 4);
            }
            return { payload: o.records.join(""), body: n };
          },
          T = function (e) {
            var t = this.options.CopySourceParser;
            if (t) return t(e);
            var n = e.match(
              /^([^.]+-\d+)\.cos(v6|-cdc)?\.([^.]+)\.myqcloud\.com\/(.+)$/
            );
            return n ? { Bucket: n[1], Region: n[3], Key: n[4] } : null;
          },
          A = function () {},
          x = function (e) {
            var t = {};
            for (var n in e)
              e.hasOwnProperty(n) &&
                void 0 !== e[n] &&
                null !== e[n] &&
                (t[n] = e[n]);
            return t;
          },
          E = function (e, t) {
            var n,
              o = new FileReader();
            FileReader.prototype.readAsBinaryString
              ? ((n = FileReader.prototype.readAsBinaryString),
                (o.onload = function () {
                  t(this.result);
                }))
              : FileReader.prototype.readAsArrayBuffer
              ? (n = function (e) {
                  var n = "",
                    o = new FileReader();
                  (o.onload = function (e) {
                    for (
                      var r = new Uint8Array(o.result), i = r.byteLength, a = 0;
                      a < i;
                      a++
                    )
                      n += String.fromCharCode(r[a]);
                    t(n);
                  }),
                    o.readAsArrayBuffer(e);
                })
              : console.error("FileReader not support readAsBinaryString"),
              n.call(o, e);
          },
          w = (function () {
            var e = function (e, t) {
              (e = e.split(".")), (t = t.split("."));
              for (var n = 0; n < t.length; n++)
                if (e[n] !== t[n])
                  return parseInt(e[n]) > parseInt(t[n]) ? 1 : -1;
              return 0;
            };
            return (function (t) {
              if (!t) return !1;
              var n = (t.match(/Chrome\/([.\d]+)/) || [])[1],
                o = (t.match(/QBCore\/([.\d]+)/) || [])[1],
                r = (t.match(/QQBrowser\/([.\d]+)/) || [])[1];
              return (
                (n &&
                  e(n, "53.0.2785.116") < 0 &&
                  o &&
                  e(o, "3.53.991.400") < 0 &&
                  r &&
                  e(r, "9.0.2524.400") <= 0) ||
                !1
              );
            })("undefined" != typeof navigator && navigator.userAgent);
          })(),
          _ = function (e, t, n, o, r) {
            var i;
            if (
              (e.slice
                ? (i = e.slice(t, n))
                : e.mozSlice
                ? (i = e.mozSlice(t, n))
                : e.webkitSlice && (i = e.webkitSlice(t, n)),
              o && w)
            ) {
              var a = new FileReader();
              (a.onload = function (e) {
                (i = null), r(new Blob([a.result]));
              }),
                a.readAsArrayBuffer(i);
            } else r(i);
          },
          I = function (e, t, n, o) {
            (n = n || A),
              e
                ? "string" == typeof t
                  ? n(q.md5(t, !0))
                  : Blob && t instanceof Blob
                  ? q.getFileMd5(
                      t,
                      function (e, t) {
                        n(t);
                      },
                      o
                    )
                  : n()
                : n();
          },
          O = function (e, t, n) {
            var o = e.size,
              r = 0,
              i = p.getCtx(),
              a = function (s) {
                if (s >= o) {
                  var c = i.digest("hex");
                  return void t(null, c);
                }
                var u = Math.min(o, s + 1048576);
                q.fileSlice(e, s, u, !1, function (e) {
                  E(e, function (t) {
                    (e = null),
                      (i = i.update(t, !0)),
                      (r += t.length),
                      (t = null),
                      n &&
                        n({
                          loaded: r,
                          total: o,
                          percent: Math.round((r / o) * 1e4) / 1e4,
                        }),
                      a(s + 1048576);
                  });
                });
              };
            a(0);
          },
          D = function (e) {
            var t,
              n,
              o,
              r = "";
            for (t = 0, n = e.length / 2; t < n; t++)
              (o = parseInt(e[2 * t] + e[2 * t + 1], 16)),
                (r += String.fromCharCode(o));
            return btoa(r);
          },
          P = function () {
            var e = function () {
              return ((65536 * (1 + Math.random())) | 0)
                .toString(16)
                .substring(1);
            };
            return (
              e() +
              e() +
              "-" +
              e() +
              "-" +
              e() +
              "-" +
              e() +
              "-" +
              e() +
              e() +
              e()
            );
          },
          N = function (e, t) {
            var n = t.Bucket,
              o = t.Region,
              r = t.Key,
              i = this.options.Domain,
              a = !i || i.indexOf("{Bucket}") > -1,
              s = !i || i.indexOf("{Region}") > -1;
            if (
              e.indexOf("Bucket") > -1 ||
              "deleteMultipleObject" === e ||
              "multipartList" === e ||
              "listObjectVersions" === e
            ) {
              if (a && !n) return "Bucket";
              if (s && !o) return "Region";
            } else if (
              e.indexOf("Object") > -1 ||
              e.indexOf("multipart") > -1 ||
              "sliceUploadFile" === e ||
              "abortUploadTask" === e
            ) {
              if (a && !n) return "Bucket";
              if (s && !o) return "Region";
              if (!r) return "Key";
            }
            return !1;
          },
          U = function (e, t) {
            if (
              ((t = s({}, t)),
              "getAuth" !== e && "getV4Auth" !== e && "getObjectUrl" !== e)
            ) {
              var n = t.Headers || {};
              if (t && "object" == typeof t) {
                !(function () {
                  for (var e in t)
                    t.hasOwnProperty(e) &&
                      e.indexOf("x-cos-") > -1 &&
                      (n[e] = t[e]);
                })();
                var o = {
                  "x-cos-mfa": "MFA",
                  "Content-MD5": "ContentMD5",
                  "Content-Length": "ContentLength",
                  "Content-Type": "ContentType",
                  Expect: "Expect",
                  Expires: "Expires",
                  "Cache-Control": "CacheControl",
                  "Content-Disposition": "ContentDisposition",
                  "Content-Encoding": "ContentEncoding",
                  Range: "Range",
                  "If-Modified-Since": "IfModifiedSince",
                  "If-Unmodified-Since": "IfUnmodifiedSince",
                  "If-Match": "IfMatch",
                  "If-None-Match": "IfNoneMatch",
                  "x-cos-copy-source": "CopySource",
                  "x-cos-copy-source-Range": "CopySourceRange",
                  "x-cos-metadata-directive": "MetadataDirective",
                  "x-cos-copy-source-If-Modified-Since":
                    "CopySourceIfModifiedSince",
                  "x-cos-copy-source-If-Unmodified-Since":
                    "CopySourceIfUnmodifiedSince",
                  "x-cos-copy-source-If-Match": "CopySourceIfMatch",
                  "x-cos-copy-source-If-None-Match": "CopySourceIfNoneMatch",
                  "x-cos-acl": "ACL",
                  "x-cos-grant-read": "GrantRead",
                  "x-cos-grant-write": "GrantWrite",
                  "x-cos-grant-full-control": "GrantFullControl",
                  "x-cos-grant-read-acp": "GrantReadAcp",
                  "x-cos-grant-write-acp": "GrantWriteAcp",
                  "x-cos-storage-class": "StorageClass",
                  "x-cos-traffic-limit": "TrafficLimit",
                  "x-cos-mime-limit": "MimeLimit",
                  "x-cos-server-side-encryption-customer-algorithm":
                    "SSECustomerAlgorithm",
                  "x-cos-server-side-encryption-customer-key": "SSECustomerKey",
                  "x-cos-server-side-encryption-customer-key-MD5":
                    "SSECustomerKeyMD5",
                  "x-cos-server-side-encryption": "ServerSideEncryption",
                  "x-cos-server-side-encryption-cos-kms-key-id": "SSEKMSKeyId",
                  "x-cos-server-side-encryption-context": "SSEContext",
                };
                q.each(o, function (e, o) {
                  void 0 !== t[e] && (n[o] = t[e]);
                }),
                  (t.Headers = x(n));
              }
            }
            return t;
          },
          M = function (e, t) {
            return function (n, o) {
              var r = this;
              "function" == typeof n && ((o = n), (n = {})), (n = U(e, n));
              var i = function (e) {
                  return (
                    e &&
                      e.headers &&
                      (e.headers["x-cos-request-id"] &&
                        (e.RequestId = e.headers["x-cos-request-id"]),
                      e.headers["x-cos-version-id"] &&
                        (e.VersionId = e.headers["x-cos-version-id"]),
                      e.headers["x-cos-delete-marker"] &&
                        (e.DeleteMarker = e.headers["x-cos-delete-marker"])),
                    e
                  );
                },
                a = function (e, t) {
                  o && o(i(e), i(t));
                },
                s = (function () {
                  if ("getService" !== e && "abortUploadTask" !== e) {
                    var t = N.call(r, e, n);
                    if (t) return "missing param " + t;
                    if (n.Region) {
                      if (r.options.CompatibilityMode) {
                        if (!/^([a-z\d-.]+)$/.test(n.Region))
                          return "Region format error.";
                      } else {
                        if (n.Region.indexOf("cos.") > -1)
                          return 'param Region should not be start with "cos."';
                        if (!/^([a-z\d-]+)$/.test(n.Region))
                          return "Region format error.";
                      }
                      r.options.CompatibilityMode ||
                        -1 !== n.Region.indexOf("-") ||
                        "yfb" === n.Region ||
                        "default" === n.Region ||
                        "accelerate" === n.Region ||
                        console.warn(
                          "warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224"
                        );
                    }
                    if (n.Bucket) {
                      if (!/^([a-z\d-]+)-(\d+)$/.test(n.Bucket))
                        if (n.AppId) n.Bucket = n.Bucket + "-" + n.AppId;
                        else {
                          if (!r.options.AppId)
                            return 'Bucket should format as "test-1250000000".';
                          n.Bucket = n.Bucket + "-" + r.options.AppId;
                        }
                      n.AppId &&
                        (console.warn(
                          'warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).'
                        ),
                        delete n.AppId);
                    }
                    !r.options.UseRawKey &&
                      n.Key &&
                      "/" === n.Key.substr(0, 1) &&
                      (n.Key = n.Key.substr(1));
                  }
                })(),
                c = "getAuth" === e || "getObjectUrl" === e;
              if (window.Promise && !c && !o)
                return new Promise(function (e, i) {
                  if (
                    ((o = function (t, n) {
                      t ? i(t) : e(n);
                    }),
                    s)
                  )
                    return a(q.error(new Error(s)));
                  t.call(r, n, a);
                });
              if (s) return a(q.error(new Error(s)));
              var u = t.call(r, n, a);
              return c ? u : void 0;
            };
          },
          H = function (e, t) {
            function n() {
              if (((r = 0), t && "function" == typeof t)) {
                o = Date.now();
                var n,
                  i =
                    Math.max(
                      0,
                      Math.round(((s - a) / ((o - c) / 1e3)) * 100) / 100
                    ) || 0;
                (n =
                  0 === s && 0 === e
                    ? 1
                    : Math.floor((s / e) * 100) / 100 || 0),
                  (c = o),
                  (a = s);
                try {
                  t({ loaded: s, total: e, speed: i, percent: n });
                } catch (e) {}
              }
            }
            var o,
              r,
              i = this,
              a = 0,
              s = 0,
              c = Date.now();
            return function (t, o) {
              if ((t && ((s = t.loaded), (e = t.total)), o))
                clearTimeout(r), n();
              else {
                if (r) return;
                r = setTimeout(n, i.options.ProgressInterval);
              }
            };
          },
          L = function (e, t, n) {
            var o;
            if (
              ("string" == typeof t.Body
                ? (t.Body = new Blob([t.Body], { type: "text/plain" }))
                : t.Body instanceof ArrayBuffer &&
                  (t.Body = new Blob([t.Body])),
              !t.Body ||
                !(
                  t.Body instanceof Blob ||
                  "[object File]" === t.Body.toString() ||
                  "[object Blob]" === t.Body.toString()
                ))
            )
              return void n(
                q.error(
                  new Error(
                    "params body format error, Only allow File|Blob|String."
                  )
                )
              );
            (o = t.Body.size), (t.ContentLength = o), n(null, o);
          },
          F = function (e) {
            return Date.now() + (e || 0);
          },
          K = function (e, t) {
            var n = e;
            return (
              (e.message = e.message || null),
              "string" == typeof t
                ? ((e.error = t), (e.message = t))
                : "object" == typeof t &&
                  null !== t &&
                  (s(e, t),
                  (t.code || t.name) && (e.code = t.code || t.name),
                  t.message && (e.message = t.message),
                  t.stack && (e.stack = t.stack)),
              "function" == typeof Object.defineProperty &&
                (Object.defineProperty(e, "name", {
                  writable: !0,
                  enumerable: !1,
                }),
                Object.defineProperty(e, "message", { enumerable: !0 })),
              (e.name = (t && t.name) || e.name || e.code || "Error"),
              e.code || (e.code = e.name),
              e.error || (e.error = i(n)),
              e
            );
          },
          j = function () {
            return "object" != typeof window && "object" == typeof t && !0;
          },
          z = function (e) {
            return /^https?:\/\/([^/]+\.)?ci\.[^/]+/.test(e);
          },
          q = {
            noop: A,
            formatParams: U,
            apiWrapper: M,
            xml2json: m,
            json2xml: y,
            md5: p,
            clearKey: x,
            fileSlice: _,
            getBodyMd5: I,
            getFileMd5: O,
            binaryBase64: D,
            extend: s,
            isArray: c,
            isInArray: u,
            makeArray: l,
            each: d,
            map: f,
            filter: h,
            clone: i,
            attr: a,
            uuid: P,
            camSafeUrlEncode: o,
            throttleOnProgress: H,
            getFileSize: L,
            getSkewTime: F,
            error: K,
            obj2str: C,
            getAuth: S,
            parseSelectPayload: B,
            getSourceParams: T,
            isBrowser: !0,
            isNode: j,
            isCIHost: z,
          };
        e.exports = q;
      }.call(t, n(1)));
    },
    function (e, t) {
      function n() {
        throw new Error("setTimeout has not been defined");
      }
      function o() {
        throw new Error("clearTimeout has not been defined");
      }
      function r(e) {
        if (l === setTimeout) return setTimeout(e, 0);
        if ((l === n || !l) && setTimeout)
          return (l = setTimeout), setTimeout(e, 0);
        try {
          return l(e, 0);
        } catch (t) {
          try {
            return l.call(null, e, 0);
          } catch (t) {
            return l.call(this, e, 0);
          }
        }
      }
      function i(e) {
        if (d === clearTimeout) return clearTimeout(e);
        if ((d === o || !d) && clearTimeout)
          return (d = clearTimeout), clearTimeout(e);
        try {
          return d(e);
        } catch (t) {
          try {
            return d.call(null, e);
          } catch (t) {
            return d.call(this, e);
          }
        }
      }
      function a() {
        g &&
          h &&
          ((g = !1), h.length ? (p = h.concat(p)) : (m = -1), p.length && s());
      }
      function s() {
        if (!g) {
          var e = r(a);
          g = !0;
          for (var t = p.length; t; ) {
            for (h = p, p = []; ++m < t; ) h && h[m].run();
            (m = -1), (t = p.length);
          }
          (h = null), (g = !1), i(e);
        }
      }
      function c(e, t) {
        (this.fun = e), (this.array = t);
      }
      function u() {}
      var l,
        d,
        f = (e.exports = {});
      !(function () {
        try {
          l = "function" == typeof setTimeout ? setTimeout : n;
        } catch (e) {
          l = n;
        }
        try {
          d = "function" == typeof clearTimeout ? clearTimeout : o;
        } catch (e) {
          d = o;
        }
      })();
      var h,
        p = [],
        g = !1,
        m = -1;
      (f.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        p.push(new c(e, t)), 1 !== p.length || g || r(s);
      }),
        (c.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (f.title = "browser"),
        (f.browser = !0),
        (f.env = {}),
        (f.argv = []),
        (f.version = ""),
        (f.versions = {}),
        (f.on = u),
        (f.addListener = u),
        (f.once = u),
        (f.off = u),
        (f.removeListener = u),
        (f.removeAllListeners = u),
        (f.emit = u),
        (f.prependListener = u),
        (f.prependOnceListener = u),
        (f.listeners = function (e) {
          return [];
        }),
        (f.binding = function (e) {
          throw new Error("process.binding is not supported");
        }),
        (f.cwd = function () {
          return "/";
        }),
        (f.chdir = function (e) {
          throw new Error("process.chdir is not supported");
        }),
        (f.umask = function () {
          return 0;
        });
    },
    function (e, t) {
      function n(e, t) {
        for (var n in e) t[n] = e[n];
      }
      function o(e, t) {
        function o() {}
        var r = e.prototype;
        if (Object.create) {
          var i = Object.create(t.prototype);
          r.__proto__ = i;
        }
        r instanceof t ||
          ((o.prototype = t.prototype),
          (o = new o()),
          n(r, o),
          (e.prototype = r = o)),
          r.constructor != e &&
            ("function" != typeof e && console.error("unknow Class:" + e),
            (r.constructor = e));
      }
      function r(e, t) {
        if (t instanceof Error) var n = t;
        else
          (n = this),
            Error.call(this, re[e]),
            (this.message = re[e]),
            Error.captureStackTrace && Error.captureStackTrace(this, r);
        return (n.code = e), t && (this.message = this.message + ": " + t), n;
      }
      function i() {}
      function a(e, t) {
        (this._node = e), (this._refresh = t), s(this);
      }
      function s(e) {
        var t = e._node._inc || e._node.ownerDocument._inc;
        if (e._inc != t) {
          var o = e._refresh(e._node);
          K(e, "length", o.length), n(o, e), (e._inc = t);
        }
      }
      function c() {}
      function u(e, t) {
        for (var n = e.length; n--; ) if (e[n] === t) return n;
      }
      function l(e, t, n, o) {
        if ((o ? (t[u(t, o)] = n) : (t[t.length++] = n), e)) {
          n.ownerElement = e;
          var r = e.ownerDocument;
          r && (o && C(r, e, o), y(r, e, n));
        }
      }
      function d(e, t, n) {
        var o = u(t, n);
        if (!(o >= 0)) throw r(ae, new Error(e.tagName + "@" + n));
        for (var i = t.length - 1; o < i; ) t[o] = t[++o];
        if (((t.length = i), e)) {
          var a = e.ownerDocument;
          a && (C(a, e, n), (n.ownerElement = null));
        }
      }
      function f(e) {
        if (((this._features = {}), e)) for (var t in e) this._features = e[t];
      }
      function h() {}
      function p(e) {
        return (
          ("<" == e && "&lt;") ||
          (">" == e && "&gt;") ||
          ("&" == e && "&amp;") ||
          ('"' == e && "&quot;") ||
          "&#" + e.charCodeAt() + ";"
        );
      }
      function g(e, t) {
        if (t(e)) return !0;
        if ((e = e.firstChild))
          do {
            if (g(e, t)) return !0;
          } while ((e = e.nextSibling));
      }
      function m() {}
      function y(e, t, n) {
        e && e._inc++,
          "http://www.w3.org/2000/xmlns/" == n.namespaceURI &&
            (t._nsMap[n.prefix ? n.localName : ""] = n.value);
      }
      function C(e, t, n, o) {
        e && e._inc++,
          "http://www.w3.org/2000/xmlns/" == n.namespaceURI &&
            delete t._nsMap[n.prefix ? n.localName : ""];
      }
      function v(e, t, n) {
        if (e && e._inc) {
          e._inc++;
          var o = t.childNodes;
          if (n) o[o.length++] = n;
          else {
            for (var r = t.firstChild, i = 0; r; )
              (o[i++] = r), (r = r.nextSibling);
            o.length = i;
          }
        }
      }
      function k(e, t) {
        var n = t.previousSibling,
          o = t.nextSibling;
        return (
          n ? (n.nextSibling = o) : (e.firstChild = o),
          o ? (o.previousSibling = n) : (e.lastChild = n),
          v(e.ownerDocument, e),
          t
        );
      }
      function S(e, t, n) {
        var o = t.parentNode;
        if ((o && o.removeChild(t), t.nodeType === te)) {
          var r = t.firstChild;
          if (null == r) return t;
          var i = t.lastChild;
        } else r = i = t;
        var a = n ? n.previousSibling : e.lastChild;
        (r.previousSibling = a),
          (i.nextSibling = n),
          a ? (a.nextSibling = r) : (e.firstChild = r),
          null == n ? (e.lastChild = i) : (n.previousSibling = i);
        do {
          r.parentNode = e;
        } while (r !== i && (r = r.nextSibling));
        return (
          v(e.ownerDocument || e, e),
          t.nodeType == te && (t.firstChild = t.lastChild = null),
          t
        );
      }
      function R(e, t) {
        var n = t.parentNode;
        if (n) {
          var o = e.lastChild;
          n.removeChild(t);
          var o = e.lastChild;
        }
        var o = e.lastChild;
        return (
          (t.parentNode = e),
          (t.previousSibling = o),
          (t.nextSibling = null),
          o ? (o.nextSibling = t) : (e.firstChild = t),
          (e.lastChild = t),
          v(e.ownerDocument, e, t),
          t
        );
      }
      function b() {
        this._nsMap = {};
      }
      function B() {}
      function T() {}
      function A() {}
      function x() {}
      function E() {}
      function w() {}
      function _() {}
      function I() {}
      function O() {}
      function D() {}
      function P() {}
      function N() {}
      function U(e, t) {
        var n = [],
          o = 9 == this.nodeType ? this.documentElement : this,
          r = o.prefix,
          i = o.namespaceURI;
        if (i && null == r) {
          var r = o.lookupPrefix(i);
          if (null == r) var a = [{ namespace: i, prefix: null }];
        }
        return H(this, n, e, t, a), n.join("");
      }
      function M(e, t, n) {
        var o = e.prefix || "",
          r = e.namespaceURI;
        if (!o && !r) return !1;
        if (
          ("xml" === o && "http://www.w3.org/XML/1998/namespace" === r) ||
          "http://www.w3.org/2000/xmlns/" == r
        )
          return !1;
        for (var i = n.length; i--; ) {
          var a = n[i];
          if (a.prefix == o) return a.namespace != r;
        }
        return !0;
      }
      function H(e, t, n, o, r) {
        if (o) {
          if (!(e = o(e))) return;
          if ("string" == typeof e) return void t.push(e);
        }
        switch (e.nodeType) {
          case G:
            r || (r = []);
            var i = (r.length, e.attributes),
              a = i.length,
              s = e.firstChild,
              c = e.tagName;
            (n = z === e.namespaceURI || n), t.push("<", c);
            for (var u = 0; u < a; u++) {
              var l = i.item(u);
              "xmlns" == l.prefix
                ? r.push({ prefix: l.localName, namespace: l.value })
                : "xmlns" == l.nodeName &&
                  r.push({ prefix: "", namespace: l.value });
            }
            for (var u = 0; u < a; u++) {
              var l = i.item(u);
              if (M(l, n, r)) {
                var d = l.prefix || "",
                  f = l.namespaceURI,
                  h = d ? " xmlns:" + d : " xmlns";
                t.push(h, '="', f, '"'), r.push({ prefix: d, namespace: f });
              }
              H(l, t, n, o, r);
            }
            if (M(e, n, r)) {
              var d = e.prefix || "",
                f = e.namespaceURI,
                h = d ? " xmlns:" + d : " xmlns";
              t.push(h, '="', f, '"'), r.push({ prefix: d, namespace: f });
            }
            if (s || (n && !/^(?:meta|link|img|br|hr|input)$/i.test(c))) {
              if ((t.push(">"), n && /^script$/i.test(c)))
                for (; s; )
                  s.data ? t.push(s.data) : H(s, t, n, o, r),
                    (s = s.nextSibling);
              else for (; s; ) H(s, t, n, o, r), (s = s.nextSibling);
              t.push("</", c, ">");
            } else t.push("/>");
            return;
          case Z:
          case te:
            for (var s = e.firstChild; s; )
              H(s, t, n, o, r), (s = s.nextSibling);
            return;
          case V:
            return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, p), '"');
          case X:
            return t.push(e.data.replace(/[<&]/g, p));
          case W:
            return t.push("<![CDATA[", e.data, "]]>");
          case Y:
            return t.push("\x3c!--", e.data, "--\x3e");
          case ee:
            var g = e.publicId,
              m = e.systemId;
            if ((t.push("<!DOCTYPE ", e.name), g))
              t.push(' PUBLIC "', g),
                m && "." != m && t.push('" "', m),
                t.push('">');
            else if (m && "." != m) t.push(' SYSTEM "', m, '">');
            else {
              var y = e.internalSubset;
              y && t.push(" [", y, "]"), t.push(">");
            }
            return;
          case J:
            return t.push("<?", e.target, " ", e.data, "?>");
          case $:
            return t.push("&", e.nodeName, ";");
          default:
            t.push("??", e.nodeName);
        }
      }
      function L(e, t, n) {
        var o;
        switch (t.nodeType) {
          case G:
            (o = t.cloneNode(!1)), (o.ownerDocument = e);
          case te:
            break;
          case V:
            n = !0;
        }
        if (
          (o || (o = t.cloneNode(!1)),
          (o.ownerDocument = e),
          (o.parentNode = null),
          n)
        )
          for (var r = t.firstChild; r; )
            o.appendChild(L(e, r, n)), (r = r.nextSibling);
        return o;
      }
      function F(e, t, n) {
        var o = new t.constructor();
        for (var r in t) {
          var a = t[r];
          "object" != typeof a && a != o[r] && (o[r] = a);
        }
        switch (
          (t.childNodes && (o.childNodes = new i()),
          (o.ownerDocument = e),
          o.nodeType)
        ) {
          case G:
            var s = t.attributes,
              u = (o.attributes = new c()),
              l = s.length;
            u._ownerElement = o;
            for (var d = 0; d < l; d++) o.setAttributeNode(F(e, s.item(d), !0));
            break;
          case V:
            n = !0;
        }
        if (n)
          for (var f = t.firstChild; f; )
            o.appendChild(F(e, f, n)), (f = f.nextSibling);
        return o;
      }
      function K(e, t, n) {
        e[t] = n;
      }
      function j(e) {
        switch (e.nodeType) {
          case G:
          case te:
            var t = [];
            for (e = e.firstChild; e; )
              7 !== e.nodeType && 8 !== e.nodeType && t.push(j(e)),
                (e = e.nextSibling);
            return t.join("");
          default:
            return e.nodeValue;
        }
      }
      var z = "http://www.w3.org/1999/xhtml",
        q = {},
        G = (q.ELEMENT_NODE = 1),
        V = (q.ATTRIBUTE_NODE = 2),
        X = (q.TEXT_NODE = 3),
        W = (q.CDATA_SECTION_NODE = 4),
        $ = (q.ENTITY_REFERENCE_NODE = 5),
        Q = (q.ENTITY_NODE = 6),
        J = (q.PROCESSING_INSTRUCTION_NODE = 7),
        Y = (q.COMMENT_NODE = 8),
        Z = (q.DOCUMENT_NODE = 9),
        ee = (q.DOCUMENT_TYPE_NODE = 10),
        te = (q.DOCUMENT_FRAGMENT_NODE = 11),
        ne = (q.NOTATION_NODE = 12),
        oe = {},
        re = {},
        ie =
          ((oe.INDEX_SIZE_ERR = ((re[1] = "Index size error"), 1)),
          (oe.DOMSTRING_SIZE_ERR = ((re[2] = "DOMString size error"), 2)),
          (oe.HIERARCHY_REQUEST_ERR =
            ((re[3] = "Hierarchy request error"), 3))),
        ae =
          ((oe.WRONG_DOCUMENT_ERR = ((re[4] = "Wrong document"), 4)),
          (oe.INVALID_CHARACTER_ERR = ((re[5] = "Invalid character"), 5)),
          (oe.NO_DATA_ALLOWED_ERR = ((re[6] = "No data allowed"), 6)),
          (oe.NO_MODIFICATION_ALLOWED_ERR =
            ((re[7] = "No modification allowed"), 7)),
          (oe.NOT_FOUND_ERR = ((re[8] = "Not found"), 8))),
        se =
          ((oe.NOT_SUPPORTED_ERR = ((re[9] = "Not supported"), 9)),
          (oe.INUSE_ATTRIBUTE_ERR = ((re[10] = "Attribute in use"), 10)));
      (oe.INVALID_STATE_ERR = ((re[11] = "Invalid state"), 11)),
        (oe.SYNTAX_ERR = ((re[12] = "Syntax error"), 12)),
        (oe.INVALID_MODIFICATION_ERR = ((re[13] = "Invalid modification"), 13)),
        (oe.NAMESPACE_ERR = ((re[14] = "Invalid namespace"), 14)),
        (oe.INVALID_ACCESS_ERR = ((re[15] = "Invalid access"), 15));
      (r.prototype = Error.prototype),
        n(oe, r),
        (i.prototype = {
          length: 0,
          item: function (e) {
            return this[e] || null;
          },
          toString: function (e, t) {
            for (var n = [], o = 0; o < this.length; o++) H(this[o], n, e, t);
            return n.join("");
          },
        }),
        (a.prototype.item = function (e) {
          return s(this), this[e];
        }),
        o(a, i),
        (c.prototype = {
          length: 0,
          item: i.prototype.item,
          getNamedItem: function (e) {
            for (var t = this.length; t--; ) {
              var n = this[t];
              if (n.nodeName == e) return n;
            }
          },
          setNamedItem: function (e) {
            var t = e.ownerElement;
            if (t && t != this._ownerElement) throw new r(se);
            var n = this.getNamedItem(e.nodeName);
            return l(this._ownerElement, this, e, n), n;
          },
          setNamedItemNS: function (e) {
            var t,
              n = e.ownerElement;
            if (n && n != this._ownerElement) throw new r(se);
            return (
              (t = this.getNamedItemNS(e.namespaceURI, e.localName)),
              l(this._ownerElement, this, e, t),
              t
            );
          },
          removeNamedItem: function (e) {
            var t = this.getNamedItem(e);
            return d(this._ownerElement, this, t), t;
          },
          removeNamedItemNS: function (e, t) {
            var n = this.getNamedItemNS(e, t);
            return d(this._ownerElement, this, n), n;
          },
          getNamedItemNS: function (e, t) {
            for (var n = this.length; n--; ) {
              var o = this[n];
              if (o.localName == t && o.namespaceURI == e) return o;
            }
            return null;
          },
        }),
        (f.prototype = {
          hasFeature: function (e, t) {
            var n = this._features[e.toLowerCase()];
            return !(!n || (t && !(t in n)));
          },
          createDocument: function (e, t, n) {
            var o = new m();
            if (
              ((o.implementation = this),
              (o.childNodes = new i()),
              (o.doctype = n),
              n && o.appendChild(n),
              t)
            ) {
              var r = o.createElementNS(e, t);
              o.appendChild(r);
            }
            return o;
          },
          createDocumentType: function (e, t, n) {
            var o = new w();
            return (
              (o.name = e),
              (o.nodeName = e),
              (o.publicId = t),
              (o.systemId = n),
              o
            );
          },
        }),
        (h.prototype = {
          firstChild: null,
          lastChild: null,
          previousSibling: null,
          nextSibling: null,
          attributes: null,
          parentNode: null,
          childNodes: null,
          ownerDocument: null,
          nodeValue: null,
          namespaceURI: null,
          prefix: null,
          localName: null,
          insertBefore: function (e, t) {
            return S(this, e, t);
          },
          replaceChild: function (e, t) {
            this.insertBefore(e, t), t && this.removeChild(t);
          },
          removeChild: function (e) {
            return k(this, e);
          },
          appendChild: function (e) {
            return this.insertBefore(e, null);
          },
          hasChildNodes: function () {
            return null != this.firstChild;
          },
          cloneNode: function (e) {
            return F(this.ownerDocument || this, this, e);
          },
          normalize: function () {
            for (var e = this.firstChild; e; ) {
              var t = e.nextSibling;
              t && t.nodeType == X && e.nodeType == X
                ? (this.removeChild(t), e.appendData(t.data))
                : (e.normalize(), (e = t));
            }
          },
          isSupported: function (e, t) {
            return this.ownerDocument.implementation.hasFeature(e, t);
          },
          hasAttributes: function () {
            return this.attributes.length > 0;
          },
          lookupPrefix: function (e) {
            for (var t = this; t; ) {
              var n = t._nsMap;
              if (n) for (var o in n) if (n[o] == e) return o;
              t = t.nodeType == V ? t.ownerDocument : t.parentNode;
            }
            return null;
          },
          lookupNamespaceURI: function (e) {
            for (var t = this; t; ) {
              var n = t._nsMap;
              if (n && e in n) return n[e];
              t = t.nodeType == V ? t.ownerDocument : t.parentNode;
            }
            return null;
          },
          isDefaultNamespace: function (e) {
            return null == this.lookupPrefix(e);
          },
        }),
        n(q, h),
        n(q, h.prototype),
        (m.prototype = {
          nodeName: "#document",
          nodeType: Z,
          doctype: null,
          documentElement: null,
          _inc: 1,
          insertBefore: function (e, t) {
            if (e.nodeType == te) {
              for (var n = e.firstChild; n; ) {
                var o = n.nextSibling;
                this.insertBefore(n, t), (n = o);
              }
              return e;
            }
            return (
              null == this.documentElement &&
                e.nodeType == G &&
                (this.documentElement = e),
              S(this, e, t),
              (e.ownerDocument = this),
              e
            );
          },
          removeChild: function (e) {
            return (
              this.documentElement == e && (this.documentElement = null),
              k(this, e)
            );
          },
          importNode: function (e, t) {
            return L(this, e, t);
          },
          getElementById: function (e) {
            var t = null;
            return (
              g(this.documentElement, function (n) {
                if (n.nodeType == G && n.getAttribute("id") == e)
                  return (t = n), !0;
              }),
              t
            );
          },
          createElement: function (e) {
            var t = new b();
            return (
              (t.ownerDocument = this),
              (t.nodeName = e),
              (t.tagName = e),
              (t.childNodes = new i()),
              ((t.attributes = new c())._ownerElement = t),
              t
            );
          },
          createDocumentFragment: function () {
            var e = new D();
            return (e.ownerDocument = this), (e.childNodes = new i()), e;
          },
          createTextNode: function (e) {
            var t = new A();
            return (t.ownerDocument = this), t.appendData(e), t;
          },
          createComment: function (e) {
            var t = new x();
            return (t.ownerDocument = this), t.appendData(e), t;
          },
          createCDATASection: function (e) {
            var t = new E();
            return (t.ownerDocument = this), t.appendData(e), t;
          },
          createProcessingInstruction: function (e, t) {
            var n = new P();
            return (
              (n.ownerDocument = this),
              (n.tagName = n.target = e),
              (n.nodeValue = n.data = t),
              n
            );
          },
          createAttribute: function (e) {
            var t = new B();
            return (
              (t.ownerDocument = this),
              (t.name = e),
              (t.nodeName = e),
              (t.localName = e),
              (t.specified = !0),
              t
            );
          },
          createEntityReference: function (e) {
            var t = new O();
            return (t.ownerDocument = this), (t.nodeName = e), t;
          },
          createElementNS: function (e, t) {
            var n = new b(),
              o = t.split(":"),
              r = (n.attributes = new c());
            return (
              (n.childNodes = new i()),
              (n.ownerDocument = this),
              (n.nodeName = t),
              (n.tagName = t),
              (n.namespaceURI = e),
              2 == o.length
                ? ((n.prefix = o[0]), (n.localName = o[1]))
                : (n.localName = t),
              (r._ownerElement = n),
              n
            );
          },
          createAttributeNS: function (e, t) {
            var n = new B(),
              o = t.split(":");
            return (
              (n.ownerDocument = this),
              (n.nodeName = t),
              (n.name = t),
              (n.namespaceURI = e),
              (n.specified = !0),
              2 == o.length
                ? ((n.prefix = o[0]), (n.localName = o[1]))
                : (n.localName = t),
              n
            );
          },
        }),
        o(m, h),
        (b.prototype = {
          nodeType: G,
          hasAttribute: function (e) {
            return null != this.getAttributeNode(e);
          },
          getAttribute: function (e) {
            var t = this.getAttributeNode(e);
            return (t && t.value) || "";
          },
          getAttributeNode: function (e) {
            return this.attributes.getNamedItem(e);
          },
          setAttribute: function (e, t) {
            var n = this.ownerDocument.createAttribute(e);
            (n.value = n.nodeValue = "" + t), this.setAttributeNode(n);
          },
          removeAttribute: function (e) {
            var t = this.getAttributeNode(e);
            t && this.removeAttributeNode(t);
          },
          appendChild: function (e) {
            return e.nodeType === te ? this.insertBefore(e, null) : R(this, e);
          },
          setAttributeNode: function (e) {
            return this.attributes.setNamedItem(e);
          },
          setAttributeNodeNS: function (e) {
            return this.attributes.setNamedItemNS(e);
          },
          removeAttributeNode: function (e) {
            return this.attributes.removeNamedItem(e.nodeName);
          },
          removeAttributeNS: function (e, t) {
            var n = this.getAttributeNodeNS(e, t);
            n && this.removeAttributeNode(n);
          },
          hasAttributeNS: function (e, t) {
            return null != this.getAttributeNodeNS(e, t);
          },
          getAttributeNS: function (e, t) {
            var n = this.getAttributeNodeNS(e, t);
            return (n && n.value) || "";
          },
          setAttributeNS: function (e, t, n) {
            var o = this.ownerDocument.createAttributeNS(e, t);
            (o.value = o.nodeValue = "" + n), this.setAttributeNode(o);
          },
          getAttributeNodeNS: function (e, t) {
            return this.attributes.getNamedItemNS(e, t);
          },
          getElementsByTagName: function (e) {
            return new a(this, function (t) {
              var n = [];
              return (
                g(t, function (o) {
                  o === t ||
                    o.nodeType != G ||
                    ("*" !== e && o.tagName != e) ||
                    n.push(o);
                }),
                n
              );
            });
          },
          getElementsByTagNameNS: function (e, t) {
            return new a(this, function (n) {
              var o = [];
              return (
                g(n, function (r) {
                  r === n ||
                    r.nodeType !== G ||
                    ("*" !== e && r.namespaceURI !== e) ||
                    ("*" !== t && r.localName != t) ||
                    o.push(r);
                }),
                o
              );
            });
          },
        }),
        (m.prototype.getElementsByTagName = b.prototype.getElementsByTagName),
        (m.prototype.getElementsByTagNameNS =
          b.prototype.getElementsByTagNameNS),
        o(b, h),
        (B.prototype.nodeType = V),
        o(B, h),
        (T.prototype = {
          data: "",
          substringData: function (e, t) {
            return this.data.substring(e, e + t);
          },
          appendData: function (e) {
            (e = this.data + e),
              (this.nodeValue = this.data = e),
              (this.length = e.length);
          },
          insertData: function (e, t) {
            this.replaceData(e, 0, t);
          },
          appendChild: function (e) {
            throw new Error(re[ie]);
          },
          deleteData: function (e, t) {
            this.replaceData(e, t, "");
          },
          replaceData: function (e, t, n) {
            (n = this.data.substring(0, e) + n + this.data.substring(e + t)),
              (this.nodeValue = this.data = n),
              (this.length = n.length);
          },
        }),
        o(T, h),
        (A.prototype = {
          nodeName: "#text",
          nodeType: X,
          splitText: function (e) {
            var t = this.data,
              n = t.substring(e);
            (t = t.substring(0, e)),
              (this.data = this.nodeValue = t),
              (this.length = t.length);
            var o = this.ownerDocument.createTextNode(n);
            return (
              this.parentNode &&
                this.parentNode.insertBefore(o, this.nextSibling),
              o
            );
          },
        }),
        o(A, T),
        (x.prototype = { nodeName: "#comment", nodeType: Y }),
        o(x, T),
        (E.prototype = { nodeName: "#cdata-section", nodeType: W }),
        o(E, T),
        (w.prototype.nodeType = ee),
        o(w, h),
        (_.prototype.nodeType = ne),
        o(_, h),
        (I.prototype.nodeType = Q),
        o(I, h),
        (O.prototype.nodeType = $),
        o(O, h),
        (D.prototype.nodeName = "#document-fragment"),
        (D.prototype.nodeType = te),
        o(D, h),
        (P.prototype.nodeType = J),
        o(P, h),
        (N.prototype.serializeToString = function (e, t, n) {
          return U.call(e, t, n);
        }),
        (h.prototype.toString = U);
      try {
        Object.defineProperty &&
          (Object.defineProperty(a.prototype, "length", {
            get: function () {
              return s(this), this.$$length;
            },
          }),
          Object.defineProperty(h.prototype, "textContent", {
            get: function () {
              return j(this);
            },
            set: function (e) {
              switch (this.nodeType) {
                case G:
                case te:
                  for (; this.firstChild; ) this.removeChild(this.firstChild);
                  (e || String(e)) &&
                    this.appendChild(this.ownerDocument.createTextNode(e));
                  break;
                default:
                  (this.data = e), (this.value = e), (this.nodeValue = e);
              }
            },
          }),
          (K = function (e, t, n) {
            e["$$" + t] = n;
          }));
      } catch (e) {}
      (t.DOMImplementation = f), (t.XMLSerializer = N);
    },
    function (e, t) {
      var n = function (e) {
          var t = {},
            n = function (e) {
              return !t[e] && (t[e] = []), t[e];
            };
          (e.on = function (e, t) {
            "task-list-update" === e &&
              console.warn(
                'warning: Event "' +
                  e +
                  '" has been deprecated. Please use "list-update" instead.'
              ),
              n(e).push(t);
          }),
            (e.off = function (e, t) {
              for (var o = n(e), r = o.length - 1; r >= 0; r--)
                t === o[r] && o.splice(r, 1);
            }),
            (e.emit = function (e, t) {
              for (
                var o = n(e).map(function (e) {
                    return e;
                  }),
                  r = 0;
                r < o.length;
                r++
              )
                o[r](t);
            });
        },
        o = function () {
          n(this);
        };
      (e.exports.init = n), (e.exports.EventProxy = o);
    },
    function (e, t, n) {
      var o,
        r,
        i = n(0),
        a = function () {
          try {
            var e = JSON.parse(localStorage.getItem("cos_sdk_upload_cache"));
          } catch (e) {}
          e || (e = []), (o = e);
        },
        s = function () {
          try {
            localStorage.setItem("cos_sdk_upload_cache", JSON.stringify(o));
          } catch (e) {}
        },
        c = function () {
          if (!o) {
            a.call(this);
            for (
              var e = !1, t = Math.round(Date.now() / 1e3), n = o.length - 1;
              n >= 0;
              n--
            ) {
              var r = o[n][2];
              (!r || r + 2592e3 < t) && (o.splice(n, 1), (e = !0));
            }
            e && s();
          }
        },
        u = function () {
          r ||
            (r = setTimeout(function () {
              s(), (r = null);
            }, 400));
        },
        l = {
          using: {},
          setUsing: function (e) {
            l.using[e] = !0;
          },
          removeUsing: function (e) {
            delete l.using[e];
          },
          getFileId: function (e, t, n, o) {
            return e.name && e.size && e.lastModifiedDate && t
              ? i.md5([e.name, e.size, e.lastModifiedDate, t, n, o].join("::"))
              : null;
          },
          getUploadIdList: function (e) {
            if (!e) return null;
            c.call(this);
            for (var t = [], n = 0; n < o.length; n++)
              o[n][0] === e && t.push(o[n][1]);
            return t.length ? t : null;
          },
          saveUploadId: function (e, t, n) {
            if ((c.call(this), e)) {
              for (var r = o.length - 1; r >= 0; r--) {
                var i = o[r];
                i[0] === e && i[1] === t && o.splice(r, 1);
              }
              o.unshift([e, t, Math.round(Date.now() / 1e3)]),
                o.length > n && o.splice(n),
                u();
            }
          },
          removeUploadId: function (e) {
            c.call(this), delete l.using[e];
            for (var t = o.length - 1; t >= 0; t--)
              o[t][1] === e && o.splice(t, 1);
            u();
          },
        };
      e.exports = l;
    },
    function (e, t, n) {
      var o = n(6);
      e.exports = o;
    },
    function (e, t, n) {
      var o = n(0),
        r = n(3),
        i = n(15),
        a = n(16),
        s = n(18),
        c = {
          AppId: "",
          SecretId: "",
          SecretKey: "",
          SecurityToken: "",
          ChunkRetryTimes: 2,
          FileParallelLimit: 3,
          ChunkParallelLimit: 3,
          ChunkSize: 1048576,
          SliceSize: 1048576,
          CopyChunkParallelLimit: 20,
          CopyChunkSize: 10485760,
          CopySliceSize: 10485760,
          MaxPartNumber: 1e4,
          ProgressInterval: 1e3,
          Domain: "",
          ServiceDomain: "",
          Protocol: "",
          CompatibilityMode: !1,
          ForcePathStyle: !1,
          UseRawKey: !1,
          Timeout: 0,
          CorrectClockSkew: !0,
          SystemClockOffset: 0,
          UploadCheckContentMd5: !1,
          UploadQueueSize: 1e4,
          UploadAddMetaMd5: !1,
          UploadIdCacheLimit: 50,
          UseAccelerate: !1,
        },
        u = function (e) {
          (this.options = o.extend(o.clone(c), e || {})),
            (this.options.FileParallelLimit = Math.max(
              1,
              this.options.FileParallelLimit
            )),
            (this.options.ChunkParallelLimit = Math.max(
              1,
              this.options.ChunkParallelLimit
            )),
            (this.options.ChunkRetryTimes = Math.max(
              0,
              this.options.ChunkRetryTimes
            )),
            (this.options.ChunkSize = Math.max(
              1048576,
              this.options.ChunkSize
            )),
            (this.options.CopyChunkParallelLimit = Math.max(
              1,
              this.options.CopyChunkParallelLimit
            )),
            (this.options.CopyChunkSize = Math.max(
              1048576,
              this.options.CopyChunkSize
            )),
            (this.options.CopySliceSize = Math.max(
              0,
              this.options.CopySliceSize
            )),
            (this.options.MaxPartNumber = Math.max(
              1024,
              Math.min(1e4, this.options.MaxPartNumber)
            )),
            (this.options.Timeout = Math.max(0, this.options.Timeout)),
            this.options.AppId &&
              console.warn(
                'warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").'
              ),
            this.options.SecretId &&
              this.options.SecretId.indexOf(" ") > -1 &&
              (console.error(
                "error: SecretId\u683c\u5f0f\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5"
              ),
              console.error(
                "error: SecretId format is incorrect. Please check"
              )),
            this.options.SecretKey &&
              this.options.SecretKey.indexOf(" ") > -1 &&
              (console.error(
                "error: SecretKey\u683c\u5f0f\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5"
              ),
              console.error(
                "error: SecretKey format is incorrect. Please check"
              )),
            o.isNode() &&
              (console.warn(
                "warning: cos-js-sdk-v5 \u4e0d\u652f\u6301 nodejs \u73af\u5883\u4f7f\u7528\uff0c\u8bf7\u6539\u7528 cos-nodejs-sdk-v5\uff0c\u53c2\u8003\u6587\u6863\uff1a https://cloud.tencent.com/document/product/436/8629"
              ),
              console.warn(
                "warning: cos-js-sdk-v5 does not support nodejs environment. Please use cos-nodejs-sdk-v5 instead. See: https://cloud.tencent.com/document/product/436/8629"
              )),
            r.init(this),
            i.init(this);
        };
      a.init(u, i),
        s.init(u, i),
        (u.util = { md5: o.md5, xml2json: o.xml2json, json2xml: o.json2xml }),
        (u.getAuthorization = o.getAuth),
        (u.version = "1.3.4"),
        (e.exports = u);
    },
    function (module, exports, __webpack_require__) {
      (function (process, global) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        !(function () {
          function Md5(e) {
            if (e)
              (blocks[0] =
                blocks[16] =
                blocks[1] =
                blocks[2] =
                blocks[3] =
                blocks[4] =
                blocks[5] =
                blocks[6] =
                blocks[7] =
                blocks[8] =
                blocks[9] =
                blocks[10] =
                blocks[11] =
                blocks[12] =
                blocks[13] =
                blocks[14] =
                blocks[15] =
                  0),
                (this.blocks = blocks),
                (this.buffer8 = buffer8);
            else if (ARRAY_BUFFER) {
              var t = new ArrayBuffer(68);
              (this.buffer8 = new Uint8Array(t)),
                (this.blocks = new Uint32Array(t));
            } else
              this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            (this.h0 =
              this.h1 =
              this.h2 =
              this.h3 =
              this.start =
              this.bytes =
              this.hBytes =
                0),
              (this.finalized = this.hashed = !1),
              (this.first = !0);
          }
          var ERROR = "input is invalid type",
            WINDOW = "object" == typeof window,
            root = WINDOW ? window : {};
          root.JS_MD5_NO_WINDOW && (WINDOW = !1);
          var WEB_WORKER = !WINDOW && "object" == typeof self,
            NODE_JS =
              !root.JS_MD5_NO_NODE_JS &&
              "object" == typeof process &&
              process.versions &&
              process.versions.node;
          NODE_JS ? (root = global) : WEB_WORKER && (root = self);
          var COMMON_JS =
              !root.JS_MD5_NO_COMMON_JS &&
              "object" == typeof module &&
              module.exports,
            AMD = __webpack_require__(9),
            ARRAY_BUFFER =
              !root.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
            HEX_CHARS = "0123456789abcdef".split(""),
            EXTRA = [128, 32768, 8388608, -2147483648],
            SHIFT = [0, 8, 16, 24],
            OUTPUT_TYPES = [
              "hex",
              "array",
              "digest",
              "buffer",
              "arrayBuffer",
              "base64",
            ],
            BASE64_ENCODE_CHAR =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
                ""
              ),
            blocks = [],
            buffer8;
          if (ARRAY_BUFFER) {
            var buffer = new ArrayBuffer(68);
            (buffer8 = new Uint8Array(buffer)),
              (blocks = new Uint32Array(buffer));
          }
          (!root.JS_MD5_NO_NODE_JS && Array.isArray) ||
            (Array.isArray = function (e) {
              return "[object Array]" === Object.prototype.toString.call(e);
            }),
            !ARRAY_BUFFER ||
              (!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
              (ArrayBuffer.isView = function (e) {
                return (
                  "object" == typeof e &&
                  e.buffer &&
                  e.buffer.constructor === ArrayBuffer
                );
              });
          var createOutputMethod = function (e) {
              return function (t, n) {
                return new Md5(!0).update(t, n)[e]();
              };
            },
            createMethod = function () {
              var e = createOutputMethod("hex");
              NODE_JS && (e = nodeWrap(e)),
                (e.getCtx = e.create =
                  function () {
                    return new Md5();
                  }),
                (e.update = function (t) {
                  return e.create().update(t);
                });
              for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
                var n = OUTPUT_TYPES[t];
                e[n] = createOutputMethod(n);
              }
              return e;
            },
            nodeWrap = function (method) {
              var crypto = eval("require('crypto')"),
                Buffer = eval("require('buffer').Buffer"),
                nodeMethod = function (e) {
                  if ("string" == typeof e)
                    return crypto
                      .createHash("md5")
                      .update(e, "utf8")
                      .digest("hex");
                  if (null === e || void 0 === e) throw ERROR;
                  return (
                    e.constructor === ArrayBuffer && (e = new Uint8Array(e)),
                    Array.isArray(e) ||
                    ArrayBuffer.isView(e) ||
                    e.constructor === Buffer
                      ? crypto
                          .createHash("md5")
                          .update(new Buffer(e))
                          .digest("hex")
                      : method(e)
                  );
                };
              return nodeMethod;
            };
          (Md5.prototype.update = function (e, t) {
            if (!this.finalized) {
              for (
                var n,
                  o,
                  r = 0,
                  i = e.length,
                  a = this.blocks,
                  s = this.buffer8;
                r < i;

              ) {
                if (
                  (this.hashed &&
                    ((this.hashed = !1),
                    (a[0] = a[16]),
                    (a[16] =
                      a[1] =
                      a[2] =
                      a[3] =
                      a[4] =
                      a[5] =
                      a[6] =
                      a[7] =
                      a[8] =
                      a[9] =
                      a[10] =
                      a[11] =
                      a[12] =
                      a[13] =
                      a[14] =
                      a[15] =
                        0)),
                  ARRAY_BUFFER)
                )
                  for (o = this.start; r < i && o < 64; ++r)
                    (n = e.charCodeAt(r)),
                      t || n < 128
                        ? (s[o++] = n)
                        : n < 2048
                        ? ((s[o++] = 192 | (n >> 6)), (s[o++] = 128 | (63 & n)))
                        : n < 55296 || n >= 57344
                        ? ((s[o++] = 224 | (n >> 12)),
                          (s[o++] = 128 | ((n >> 6) & 63)),
                          (s[o++] = 128 | (63 & n)))
                        : ((n =
                            65536 +
                            (((1023 & n) << 10) | (1023 & e.charCodeAt(++r)))),
                          (s[o++] = 240 | (n >> 18)),
                          (s[o++] = 128 | ((n >> 12) & 63)),
                          (s[o++] = 128 | ((n >> 6) & 63)),
                          (s[o++] = 128 | (63 & n)));
                else
                  for (o = this.start; r < i && o < 64; ++r)
                    (n = e.charCodeAt(r)),
                      t || n < 128
                        ? (a[o >> 2] |= n << SHIFT[3 & o++])
                        : n < 2048
                        ? ((a[o >> 2] |= (192 | (n >> 6)) << SHIFT[3 & o++]),
                          (a[o >> 2] |= (128 | (63 & n)) << SHIFT[3 & o++]))
                        : n < 55296 || n >= 57344
                        ? ((a[o >> 2] |= (224 | (n >> 12)) << SHIFT[3 & o++]),
                          (a[o >> 2] |=
                            (128 | ((n >> 6) & 63)) << SHIFT[3 & o++]),
                          (a[o >> 2] |= (128 | (63 & n)) << SHIFT[3 & o++]))
                        : ((n =
                            65536 +
                            (((1023 & n) << 10) | (1023 & e.charCodeAt(++r)))),
                          (a[o >> 2] |= (240 | (n >> 18)) << SHIFT[3 & o++]),
                          (a[o >> 2] |=
                            (128 | ((n >> 12) & 63)) << SHIFT[3 & o++]),
                          (a[o >> 2] |=
                            (128 | ((n >> 6) & 63)) << SHIFT[3 & o++]),
                          (a[o >> 2] |= (128 | (63 & n)) << SHIFT[3 & o++]));
                (this.lastByteIndex = o),
                  (this.bytes += o - this.start),
                  o >= 64
                    ? ((this.start = o - 64), this.hash(), (this.hashed = !0))
                    : (this.start = o);
              }
              return (
                this.bytes > 4294967295 &&
                  ((this.hBytes += (this.bytes / 4294967296) << 0),
                  (this.bytes = this.bytes % 4294967296)),
                this
              );
            }
          }),
            (Md5.prototype.finalize = function () {
              if (!this.finalized) {
                this.finalized = !0;
                var e = this.blocks,
                  t = this.lastByteIndex;
                (e[t >> 2] |= EXTRA[3 & t]),
                  t >= 56 &&
                    (this.hashed || this.hash(),
                    (e[0] = e[16]),
                    (e[16] =
                      e[1] =
                      e[2] =
                      e[3] =
                      e[4] =
                      e[5] =
                      e[6] =
                      e[7] =
                      e[8] =
                      e[9] =
                      e[10] =
                      e[11] =
                      e[12] =
                      e[13] =
                      e[14] =
                      e[15] =
                        0)),
                  (e[14] = this.bytes << 3),
                  (e[15] = (this.hBytes << 3) | (this.bytes >>> 29)),
                  this.hash();
              }
            }),
            (Md5.prototype.hash = function () {
              var e,
                t,
                n,
                o,
                r,
                i,
                a = this.blocks;
              this.first
                ? ((e = a[0] - 680876937),
                  (e = (((e << 7) | (e >>> 25)) - 271733879) << 0),
                  (o = (-1732584194 ^ (2004318071 & e)) + a[1] - 117830708),
                  (o = (((o << 12) | (o >>> 20)) + e) << 0),
                  (n =
                    (-271733879 ^ (o & (-271733879 ^ e))) + a[2] - 1126478375),
                  (n = (((n << 17) | (n >>> 15)) + o) << 0),
                  (t = (e ^ (n & (o ^ e))) + a[3] - 1316259209),
                  (t = (((t << 22) | (t >>> 10)) + n) << 0))
                : ((e = this.h0),
                  (t = this.h1),
                  (n = this.h2),
                  (o = this.h3),
                  (e += (o ^ (t & (n ^ o))) + a[0] - 680876936),
                  (e = (((e << 7) | (e >>> 25)) + t) << 0),
                  (o += (n ^ (e & (t ^ n))) + a[1] - 389564586),
                  (o = (((o << 12) | (o >>> 20)) + e) << 0),
                  (n += (t ^ (o & (e ^ t))) + a[2] + 606105819),
                  (n = (((n << 17) | (n >>> 15)) + o) << 0),
                  (t += (e ^ (n & (o ^ e))) + a[3] - 1044525330),
                  (t = (((t << 22) | (t >>> 10)) + n) << 0)),
                (e += (o ^ (t & (n ^ o))) + a[4] - 176418897),
                (e = (((e << 7) | (e >>> 25)) + t) << 0),
                (o += (n ^ (e & (t ^ n))) + a[5] + 1200080426),
                (o = (((o << 12) | (o >>> 20)) + e) << 0),
                (n += (t ^ (o & (e ^ t))) + a[6] - 1473231341),
                (n = (((n << 17) | (n >>> 15)) + o) << 0),
                (t += (e ^ (n & (o ^ e))) + a[7] - 45705983),
                (t = (((t << 22) | (t >>> 10)) + n) << 0),
                (e += (o ^ (t & (n ^ o))) + a[8] + 1770035416),
                (e = (((e << 7) | (e >>> 25)) + t) << 0),
                (o += (n ^ (e & (t ^ n))) + a[9] - 1958414417),
                (o = (((o << 12) | (o >>> 20)) + e) << 0),
                (n += (t ^ (o & (e ^ t))) + a[10] - 42063),
                (n = (((n << 17) | (n >>> 15)) + o) << 0),
                (t += (e ^ (n & (o ^ e))) + a[11] - 1990404162),
                (t = (((t << 22) | (t >>> 10)) + n) << 0),
                (e += (o ^ (t & (n ^ o))) + a[12] + 1804603682),
                (e = (((e << 7) | (e >>> 25)) + t) << 0),
                (o += (n ^ (e & (t ^ n))) + a[13] - 40341101),
                (o = (((o << 12) | (o >>> 20)) + e) << 0),
                (n += (t ^ (o & (e ^ t))) + a[14] - 1502002290),
                (n = (((n << 17) | (n >>> 15)) + o) << 0),
                (t += (e ^ (n & (o ^ e))) + a[15] + 1236535329),
                (t = (((t << 22) | (t >>> 10)) + n) << 0),
                (e += (n ^ (o & (t ^ n))) + a[1] - 165796510),
                (e = (((e << 5) | (e >>> 27)) + t) << 0),
                (o += (t ^ (n & (e ^ t))) + a[6] - 1069501632),
                (o = (((o << 9) | (o >>> 23)) + e) << 0),
                (n += (e ^ (t & (o ^ e))) + a[11] + 643717713),
                (n = (((n << 14) | (n >>> 18)) + o) << 0),
                (t += (o ^ (e & (n ^ o))) + a[0] - 373897302),
                (t = (((t << 20) | (t >>> 12)) + n) << 0),
                (e += (n ^ (o & (t ^ n))) + a[5] - 701558691),
                (e = (((e << 5) | (e >>> 27)) + t) << 0),
                (o += (t ^ (n & (e ^ t))) + a[10] + 38016083),
                (o = (((o << 9) | (o >>> 23)) + e) << 0),
                (n += (e ^ (t & (o ^ e))) + a[15] - 660478335),
                (n = (((n << 14) | (n >>> 18)) + o) << 0),
                (t += (o ^ (e & (n ^ o))) + a[4] - 405537848),
                (t = (((t << 20) | (t >>> 12)) + n) << 0),
                (e += (n ^ (o & (t ^ n))) + a[9] + 568446438),
                (e = (((e << 5) | (e >>> 27)) + t) << 0),
                (o += (t ^ (n & (e ^ t))) + a[14] - 1019803690),
                (o = (((o << 9) | (o >>> 23)) + e) << 0),
                (n += (e ^ (t & (o ^ e))) + a[3] - 187363961),
                (n = (((n << 14) | (n >>> 18)) + o) << 0),
                (t += (o ^ (e & (n ^ o))) + a[8] + 1163531501),
                (t = (((t << 20) | (t >>> 12)) + n) << 0),
                (e += (n ^ (o & (t ^ n))) + a[13] - 1444681467),
                (e = (((e << 5) | (e >>> 27)) + t) << 0),
                (o += (t ^ (n & (e ^ t))) + a[2] - 51403784),
                (o = (((o << 9) | (o >>> 23)) + e) << 0),
                (n += (e ^ (t & (o ^ e))) + a[7] + 1735328473),
                (n = (((n << 14) | (n >>> 18)) + o) << 0),
                (t += (o ^ (e & (n ^ o))) + a[12] - 1926607734),
                (t = (((t << 20) | (t >>> 12)) + n) << 0),
                (r = t ^ n),
                (e += (r ^ o) + a[5] - 378558),
                (e = (((e << 4) | (e >>> 28)) + t) << 0),
                (o += (r ^ e) + a[8] - 2022574463),
                (o = (((o << 11) | (o >>> 21)) + e) << 0),
                (i = o ^ e),
                (n += (i ^ t) + a[11] + 1839030562),
                (n = (((n << 16) | (n >>> 16)) + o) << 0),
                (t += (i ^ n) + a[14] - 35309556),
                (t = (((t << 23) | (t >>> 9)) + n) << 0),
                (r = t ^ n),
                (e += (r ^ o) + a[1] - 1530992060),
                (e = (((e << 4) | (e >>> 28)) + t) << 0),
                (o += (r ^ e) + a[4] + 1272893353),
                (o = (((o << 11) | (o >>> 21)) + e) << 0),
                (i = o ^ e),
                (n += (i ^ t) + a[7] - 155497632),
                (n = (((n << 16) | (n >>> 16)) + o) << 0),
                (t += (i ^ n) + a[10] - 1094730640),
                (t = (((t << 23) | (t >>> 9)) + n) << 0),
                (r = t ^ n),
                (e += (r ^ o) + a[13] + 681279174),
                (e = (((e << 4) | (e >>> 28)) + t) << 0),
                (o += (r ^ e) + a[0] - 358537222),
                (o = (((o << 11) | (o >>> 21)) + e) << 0),
                (i = o ^ e),
                (n += (i ^ t) + a[3] - 722521979),
                (n = (((n << 16) | (n >>> 16)) + o) << 0),
                (t += (i ^ n) + a[6] + 76029189),
                (t = (((t << 23) | (t >>> 9)) + n) << 0),
                (r = t ^ n),
                (e += (r ^ o) + a[9] - 640364487),
                (e = (((e << 4) | (e >>> 28)) + t) << 0),
                (o += (r ^ e) + a[12] - 421815835),
                (o = (((o << 11) | (o >>> 21)) + e) << 0),
                (i = o ^ e),
                (n += (i ^ t) + a[15] + 530742520),
                (n = (((n << 16) | (n >>> 16)) + o) << 0),
                (t += (i ^ n) + a[2] - 995338651),
                (t = (((t << 23) | (t >>> 9)) + n) << 0),
                (e += (n ^ (t | ~o)) + a[0] - 198630844),
                (e = (((e << 6) | (e >>> 26)) + t) << 0),
                (o += (t ^ (e | ~n)) + a[7] + 1126891415),
                (o = (((o << 10) | (o >>> 22)) + e) << 0),
                (n += (e ^ (o | ~t)) + a[14] - 1416354905),
                (n = (((n << 15) | (n >>> 17)) + o) << 0),
                (t += (o ^ (n | ~e)) + a[5] - 57434055),
                (t = (((t << 21) | (t >>> 11)) + n) << 0),
                (e += (n ^ (t | ~o)) + a[12] + 1700485571),
                (e = (((e << 6) | (e >>> 26)) + t) << 0),
                (o += (t ^ (e | ~n)) + a[3] - 1894986606),
                (o = (((o << 10) | (o >>> 22)) + e) << 0),
                (n += (e ^ (o | ~t)) + a[10] - 1051523),
                (n = (((n << 15) | (n >>> 17)) + o) << 0),
                (t += (o ^ (n | ~e)) + a[1] - 2054922799),
                (t = (((t << 21) | (t >>> 11)) + n) << 0),
                (e += (n ^ (t | ~o)) + a[8] + 1873313359),
                (e = (((e << 6) | (e >>> 26)) + t) << 0),
                (o += (t ^ (e | ~n)) + a[15] - 30611744),
                (o = (((o << 10) | (o >>> 22)) + e) << 0),
                (n += (e ^ (o | ~t)) + a[6] - 1560198380),
                (n = (((n << 15) | (n >>> 17)) + o) << 0),
                (t += (o ^ (n | ~e)) + a[13] + 1309151649),
                (t = (((t << 21) | (t >>> 11)) + n) << 0),
                (e += (n ^ (t | ~o)) + a[4] - 145523070),
                (e = (((e << 6) | (e >>> 26)) + t) << 0),
                (o += (t ^ (e | ~n)) + a[11] - 1120210379),
                (o = (((o << 10) | (o >>> 22)) + e) << 0),
                (n += (e ^ (o | ~t)) + a[2] + 718787259),
                (n = (((n << 15) | (n >>> 17)) + o) << 0),
                (t += (o ^ (n | ~e)) + a[9] - 343485551),
                (t = (((t << 21) | (t >>> 11)) + n) << 0),
                this.first
                  ? ((this.h0 = (e + 1732584193) << 0),
                    (this.h1 = (t - 271733879) << 0),
                    (this.h2 = (n - 1732584194) << 0),
                    (this.h3 = (o + 271733878) << 0),
                    (this.first = !1))
                  : ((this.h0 = (this.h0 + e) << 0),
                    (this.h1 = (this.h1 + t) << 0),
                    (this.h2 = (this.h2 + n) << 0),
                    (this.h3 = (this.h3 + o) << 0));
            }),
            (Md5.prototype.hex = function () {
              this.finalize();
              var e = this.h0,
                t = this.h1,
                n = this.h2,
                o = this.h3;
              return (
                HEX_CHARS[(e >> 4) & 15] +
                HEX_CHARS[15 & e] +
                HEX_CHARS[(e >> 12) & 15] +
                HEX_CHARS[(e >> 8) & 15] +
                HEX_CHARS[(e >> 20) & 15] +
                HEX_CHARS[(e >> 16) & 15] +
                HEX_CHARS[(e >> 28) & 15] +
                HEX_CHARS[(e >> 24) & 15] +
                HEX_CHARS[(t >> 4) & 15] +
                HEX_CHARS[15 & t] +
                HEX_CHARS[(t >> 12) & 15] +
                HEX_CHARS[(t >> 8) & 15] +
                HEX_CHARS[(t >> 20) & 15] +
                HEX_CHARS[(t >> 16) & 15] +
                HEX_CHARS[(t >> 28) & 15] +
                HEX_CHARS[(t >> 24) & 15] +
                HEX_CHARS[(n >> 4) & 15] +
                HEX_CHARS[15 & n] +
                HEX_CHARS[(n >> 12) & 15] +
                HEX_CHARS[(n >> 8) & 15] +
                HEX_CHARS[(n >> 20) & 15] +
                HEX_CHARS[(n >> 16) & 15] +
                HEX_CHARS[(n >> 28) & 15] +
                HEX_CHARS[(n >> 24) & 15] +
                HEX_CHARS[(o >> 4) & 15] +
                HEX_CHARS[15 & o] +
                HEX_CHARS[(o >> 12) & 15] +
                HEX_CHARS[(o >> 8) & 15] +
                HEX_CHARS[(o >> 20) & 15] +
                HEX_CHARS[(o >> 16) & 15] +
                HEX_CHARS[(o >> 28) & 15] +
                HEX_CHARS[(o >> 24) & 15]
              );
            }),
            (Md5.prototype.toString = Md5.prototype.hex),
            (Md5.prototype.digest = function (e) {
              if ("hex" === e) return this.hex();
              this.finalize();
              var t = this.h0,
                n = this.h1,
                o = this.h2,
                r = this.h3;
              return [
                255 & t,
                (t >> 8) & 255,
                (t >> 16) & 255,
                (t >> 24) & 255,
                255 & n,
                (n >> 8) & 255,
                (n >> 16) & 255,
                (n >> 24) & 255,
                255 & o,
                (o >> 8) & 255,
                (o >> 16) & 255,
                (o >> 24) & 255,
                255 & r,
                (r >> 8) & 255,
                (r >> 16) & 255,
                (r >> 24) & 255,
              ];
            }),
            (Md5.prototype.array = Md5.prototype.digest),
            (Md5.prototype.arrayBuffer = function () {
              this.finalize();
              var e = new ArrayBuffer(16),
                t = new Uint32Array(e);
              return (
                (t[0] = this.h0),
                (t[1] = this.h1),
                (t[2] = this.h2),
                (t[3] = this.h3),
                e
              );
            }),
            (Md5.prototype.buffer = Md5.prototype.arrayBuffer),
            (Md5.prototype.base64 = function () {
              for (var e, t, n, o = "", r = this.array(), i = 0; i < 15; )
                (e = r[i++]),
                  (t = r[i++]),
                  (n = r[i++]),
                  (o +=
                    BASE64_ENCODE_CHAR[e >>> 2] +
                    BASE64_ENCODE_CHAR[63 & ((e << 4) | (t >>> 4))] +
                    BASE64_ENCODE_CHAR[63 & ((t << 2) | (n >>> 6))] +
                    BASE64_ENCODE_CHAR[63 & n]);
              return (
                (e = r[i]),
                (o +=
                  BASE64_ENCODE_CHAR[e >>> 2] +
                  BASE64_ENCODE_CHAR[(e << 4) & 63] +
                  "==")
              );
            });
          var exports = createMethod();
          COMMON_JS
            ? (module.exports = exports)
            : ((root.md5 = exports),
              AMD &&
                void 0 !==
                  (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return exports;
                  }.call(exports, __webpack_require__, exports, module)) &&
                (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        })();
      }.call(exports, __webpack_require__(1), __webpack_require__(8)));
    },
    function (e, t) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || Function("return this")() || (0, eval)("this");
      } catch (e) {
        "object" == typeof window && (n = window);
      }
      e.exports = n;
    },
    function (e, t) {
      (function (t) {
        e.exports = t;
      }.call(t, {}));
    },
    function (e, t, n) {
      var o =
        o ||
        (function (e, t) {
          var n = {},
            o = (n.lib = {}),
            r = function () {},
            i = (o.Base = {
              extend: function (e) {
                r.prototype = this;
                var t = new r();
                return (
                  e && t.mixIn(e),
                  t.hasOwnProperty("init") ||
                    (t.init = function () {
                      t.$super.init.apply(this, arguments);
                    }),
                  (t.init.prototype = t),
                  (t.$super = this),
                  t
                );
              },
              create: function () {
                var e = this.extend();
                return e.init.apply(e, arguments), e;
              },
              init: function () {},
              mixIn: function (e) {
                for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                e.hasOwnProperty("toString") && (this.toString = e.toString);
              },
              clone: function () {
                return this.init.prototype.extend(this);
              },
            }),
            a = (o.WordArray = i.extend({
              init: function (e, t) {
                (e = this.words = e || []),
                  (this.sigBytes = void 0 != t ? t : 4 * e.length);
              },
              toString: function (e) {
                return (e || c).stringify(this);
              },
              concat: function (e) {
                var t = this.words,
                  n = e.words,
                  o = this.sigBytes;
                if (((e = e.sigBytes), this.clamp(), o % 4))
                  for (var r = 0; r < e; r++)
                    t[(o + r) >>> 2] |=
                      ((n[r >>> 2] >>> (24 - (r % 4) * 8)) & 255) <<
                      (24 - ((o + r) % 4) * 8);
                else if (65535 < n.length)
                  for (r = 0; r < e; r += 4) t[(o + r) >>> 2] = n[r >>> 2];
                else t.push.apply(t, n);
                return (this.sigBytes += e), this;
              },
              clamp: function () {
                var t = this.words,
                  n = this.sigBytes;
                (t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
                  (t.length = e.ceil(n / 4));
              },
              clone: function () {
                var e = i.clone.call(this);
                return (e.words = this.words.slice(0)), e;
              },
              random: function (t) {
                for (var n = [], o = 0; o < t; o += 4)
                  n.push((4294967296 * e.random()) | 0);
                return new a.init(n, t);
              },
            })),
            s = (n.enc = {}),
            c = (s.Hex = {
              stringify: function (e) {
                var t = e.words;
                e = e.sigBytes;
                for (var n = [], o = 0; o < e; o++) {
                  var r = (t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                  n.push((r >>> 4).toString(16)), n.push((15 & r).toString(16));
                }
                return n.join("");
              },
              parse: function (e) {
                for (var t = e.length, n = [], o = 0; o < t; o += 2)
                  n[o >>> 3] |=
                    parseInt(e.substr(o, 2), 16) << (24 - (o % 8) * 4);
                return new a.init(n, t / 2);
              },
            }),
            u = (s.Latin1 = {
              stringify: function (e) {
                var t = e.words;
                e = e.sigBytes;
                for (var n = [], o = 0; o < e; o++)
                  n.push(
                    String.fromCharCode(
                      (t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255
                    )
                  );
                return n.join("");
              },
              parse: function (e) {
                for (var t = e.length, n = [], o = 0; o < t; o++)
                  n[o >>> 2] |= (255 & e.charCodeAt(o)) << (24 - (o % 4) * 8);
                return new a.init(n, t);
              },
            }),
            l = (s.Utf8 = {
              stringify: function (e) {
                try {
                  return decodeURIComponent(escape(u.stringify(e)));
                } catch (e) {
                  throw Error("Malformed UTF-8 data");
                }
              },
              parse: function (e) {
                return u.parse(unescape(encodeURIComponent(e)));
              },
            }),
            d = (o.BufferedBlockAlgorithm = i.extend({
              reset: function () {
                (this._data = new a.init()), (this._nDataBytes = 0);
              },
              _append: function (e) {
                "string" == typeof e && (e = l.parse(e)),
                  this._data.concat(e),
                  (this._nDataBytes += e.sigBytes);
              },
              _process: function (t) {
                var n = this._data,
                  o = n.words,
                  r = n.sigBytes,
                  i = this.blockSize,
                  s = r / (4 * i),
                  s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0);
                if (((t = s * i), (r = e.min(4 * t, r)), t)) {
                  for (var c = 0; c < t; c += i) this._doProcessBlock(o, c);
                  (c = o.splice(0, t)), (n.sigBytes -= r);
                }
                return new a.init(c, r);
              },
              clone: function () {
                var e = i.clone.call(this);
                return (e._data = this._data.clone()), e;
              },
              _minBufferSize: 0,
            }));
          o.Hasher = d.extend({
            cfg: i.extend(),
            init: function (e) {
              (this.cfg = this.cfg.extend(e)), this.reset();
            },
            reset: function () {
              d.reset.call(this), this._doReset();
            },
            update: function (e) {
              return this._append(e), this._process(), this;
            },
            finalize: function (e) {
              return e && this._append(e), this._doFinalize();
            },
            blockSize: 16,
            _createHelper: function (e) {
              return function (t, n) {
                return new e.init(n).finalize(t);
              };
            },
            _createHmacHelper: function (e) {
              return function (t, n) {
                return new f.HMAC.init(e, n).finalize(t);
              };
            },
          });
          var f = (n.algo = {});
          return n;
        })(Math);
      !(function () {
        var e = o,
          t = e.lib,
          n = t.WordArray,
          r = t.Hasher,
          i = [],
          t = (e.algo.SHA1 = r.extend({
            _doReset: function () {
              this._hash = new n.init([
                1732584193, 4023233417, 2562383102, 271733878, 3285377520,
              ]);
            },
            _doProcessBlock: function (e, t) {
              for (
                var n = this._hash.words,
                  o = n[0],
                  r = n[1],
                  a = n[2],
                  s = n[3],
                  c = n[4],
                  u = 0;
                80 > u;
                u++
              ) {
                if (16 > u) i[u] = 0 | e[t + u];
                else {
                  var l = i[u - 3] ^ i[u - 8] ^ i[u - 14] ^ i[u - 16];
                  i[u] = (l << 1) | (l >>> 31);
                }
                (l = ((o << 5) | (o >>> 27)) + c + i[u]),
                  (l =
                    20 > u
                      ? l + (1518500249 + ((r & a) | (~r & s)))
                      : 40 > u
                      ? l + (1859775393 + (r ^ a ^ s))
                      : 60 > u
                      ? l + (((r & a) | (r & s) | (a & s)) - 1894007588)
                      : l + ((r ^ a ^ s) - 899497514)),
                  (c = s),
                  (s = a),
                  (a = (r << 30) | (r >>> 2)),
                  (r = o),
                  (o = l);
              }
              (n[0] = (n[0] + o) | 0),
                (n[1] = (n[1] + r) | 0),
                (n[2] = (n[2] + a) | 0),
                (n[3] = (n[3] + s) | 0),
                (n[4] = (n[4] + c) | 0);
            },
            _doFinalize: function () {
              var e = this._data,
                t = e.words,
                n = 8 * this._nDataBytes,
                o = 8 * e.sigBytes;
              return (
                (t[o >>> 5] |= 128 << (24 - (o % 32))),
                (t[14 + (((o + 64) >>> 9) << 4)] = Math.floor(n / 4294967296)),
                (t[15 + (((o + 64) >>> 9) << 4)] = n),
                (e.sigBytes = 4 * t.length),
                this._process(),
                this._hash
              );
            },
            clone: function () {
              var e = r.clone.call(this);
              return (e._hash = this._hash.clone()), e;
            },
          }));
        (e.SHA1 = r._createHelper(t)), (e.HmacSHA1 = r._createHmacHelper(t));
      })(),
        (function () {
          var e = o,
            t = e.enc.Utf8;
          e.algo.HMAC = e.lib.Base.extend({
            init: function (e, n) {
              (e = this._hasher = new e.init()),
                "string" == typeof n && (n = t.parse(n));
              var o = e.blockSize,
                r = 4 * o;
              n.sigBytes > r && (n = e.finalize(n)), n.clamp();
              for (
                var i = (this._oKey = n.clone()),
                  a = (this._iKey = n.clone()),
                  s = i.words,
                  c = a.words,
                  u = 0;
                u < o;
                u++
              )
                (s[u] ^= 1549556828), (c[u] ^= 909522486);
              (i.sigBytes = a.sigBytes = r), this.reset();
            },
            reset: function () {
              var e = this._hasher;
              e.reset(), e.update(this._iKey);
            },
            update: function (e) {
              return this._hasher.update(e), this;
            },
            finalize: function (e) {
              var t = this._hasher;
              return (
                (e = t.finalize(e)),
                t.reset(),
                t.finalize(this._oKey.clone().concat(e))
              );
            },
          });
        })(),
        (function () {
          var e = o,
            t = e.lib,
            n = t.WordArray,
            r = e.enc;
          r.Base64 = {
            stringify: function (e) {
              var t = e.words,
                n = e.sigBytes,
                o = this._map;
              e.clamp();
              for (var r = [], i = 0; i < n; i += 3)
                for (
                  var a = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255,
                    s = (t[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 255,
                    c = (t[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 255,
                    u = (a << 16) | (s << 8) | c,
                    l = 0;
                  l < 4 && i + 0.75 * l < n;
                  l++
                )
                  r.push(o.charAt((u >>> (6 * (3 - l))) & 63));
              var d = o.charAt(64);
              if (d) for (; r.length % 4; ) r.push(d);
              return r.join("");
            },
            parse: function (e) {
              var t = e.length,
                o = this._map,
                r = o.charAt(64);
              if (r) {
                var i = e.indexOf(r);
                -1 != i && (t = i);
              }
              for (var a = [], s = 0, c = 0; c < t; c++)
                if (c % 4) {
                  var u = o.indexOf(e.charAt(c - 1)) << ((c % 4) * 2),
                    l = o.indexOf(e.charAt(c)) >>> (6 - (c % 4) * 2);
                  (a[s >>> 2] |= (u | l) << (24 - (s % 4) * 8)), s++;
                }
              return n.create(a, s);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          };
        })(),
        (e.exports = o);
    },
    function (e, t, n) {
      var o = n(12).DOMParser,
        r = function () {
          this.version = "1.3.5";
          var e = { mergeCDATA: !0, normalize: !0, stripElemPrefix: !0 },
            t = new RegExp(/(?!xmlns)^.*:/);
          new RegExp(/^\s+|\s+$/g);
          return (
            (this.grokType = function (e) {
              return /^\s*$/.test(e)
                ? null
                : /^(?:true|false)$/i.test(e)
                ? "true" === e.toLowerCase()
                : isFinite(e)
                ? parseFloat(e)
                : e;
            }),
            (this.parseString = function (e, t) {
              if (e) {
                var n = this.stringToXML(e);
                return n.getElementsByTagName("parsererror").length
                  ? null
                  : this.parseXML(n, t);
              }
              return null;
            }),
            (this.parseXML = function (n, o) {
              for (var i in o) e[i] = o[i];
              var a = {},
                s = 0,
                c = "";
              if (n.childNodes.length)
                for (var u, l, d, f = 0; f < n.childNodes.length; f++)
                  (u = n.childNodes.item(f)),
                    4 === u.nodeType
                      ? e.mergeCDATA && (c += u.nodeValue)
                      : 3 === u.nodeType
                      ? (c += u.nodeValue)
                      : 1 === u.nodeType &&
                        (0 === s && (a = {}),
                        (l = e.stripElemPrefix
                          ? u.nodeName.replace(t, "")
                          : u.nodeName),
                        (d = r.parseXML(u)),
                        a.hasOwnProperty(l)
                          ? (a[l].constructor !== Array && (a[l] = [a[l]]),
                            a[l].push(d))
                          : ((a[l] = d), s++));
              return Object.keys(a).length || (a = c || ""), a;
            }),
            (this.xmlToString = function (e) {
              try {
                return e.xml ? e.xml : new XMLSerializer().serializeToString(e);
              } catch (e) {
                return null;
              }
            }),
            (this.stringToXML = function (e) {
              try {
                var t = null;
                if (window.DOMParser) {
                  return (t = new o().parseFromString(e, "text/xml"));
                }
                return (
                  (t = new ActiveXObject("Microsoft.XMLDOM")),
                  (t.async = !1),
                  t.loadXML(e),
                  t
                );
              } catch (e) {
                return null;
              }
            }),
            this
          );
        }.call({}),
        i = function (e) {
          return r.parseString(e);
        };
      e.exports = i;
    },
    function (e, t, n) {
      function o(e) {
        this.options = e || { locator: {} };
      }
      function r(e, t, n) {
        function o(t) {
          var o = e[t];
          !o &&
            a &&
            (o =
              2 == e.length
                ? function (n) {
                    e(t, n);
                  }
                : e),
            (r[t] =
              (o &&
                function (e) {
                  o("[xmldom " + t + "]\t" + e + s(n));
                }) ||
              function () {});
        }
        if (!e) {
          if (t instanceof i) return t;
          e = t;
        }
        var r = {},
          a = e instanceof Function;
        return (n = n || {}), o("warning"), o("error"), o("fatalError"), r;
      }
      function i() {
        this.cdata = !1;
      }
      function a(e, t) {
        (t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber);
      }
      function s(e) {
        if (e)
          return (
            "\n@" +
            (e.systemId || "") +
            "#[line:" +
            e.lineNumber +
            ",col:" +
            e.columnNumber +
            "]"
          );
      }
      function c(e, t, n) {
        return "string" == typeof e
          ? e.substr(t, n)
          : e.length >= t + n || t
          ? new java.lang.String(e, t, n) + ""
          : e;
      }
      function u(e, t) {
        e.currentElement
          ? e.currentElement.appendChild(t)
          : e.doc.appendChild(t);
      }
      (o.prototype.parseFromString = function (e, t) {
        var n = this.options,
          o = new l(),
          a = n.domBuilder || new i(),
          s = n.errorHandler,
          c = n.locator,
          u = n.xmlns || {},
          d = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" };
        return (
          c && a.setDocumentLocator(c),
          (o.errorHandler = r(s, a, c)),
          (o.domBuilder = n.domBuilder || a),
          /\/x?html?$/.test(t) &&
            ((d.nbsp = "\xa0"),
            (d.copy = "\xa9"),
            (u[""] = "http://www.w3.org/1999/xhtml")),
          (u.xml = u.xml || "http://www.w3.org/XML/1998/namespace"),
          e ? o.parse(e, u, d) : o.errorHandler.error("invalid doc source"),
          a.doc
        );
      }),
        (i.prototype = {
          startDocument: function () {
            (this.doc = new d().createDocument(null, null, null)),
              this.locator && (this.doc.documentURI = this.locator.systemId);
          },
          startElement: function (e, t, n, o) {
            var r = this.doc,
              i = r.createElementNS(e, n || t),
              s = o.length;
            u(this, i),
              (this.currentElement = i),
              this.locator && a(this.locator, i);
            for (var c = 0; c < s; c++) {
              var e = o.getURI(c),
                l = o.getValue(c),
                n = o.getQName(c),
                d = r.createAttributeNS(e, n);
              this.locator && a(o.getLocator(c), d),
                (d.value = d.nodeValue = l),
                i.setAttributeNode(d);
            }
          },
          endElement: function (e, t, n) {
            var o = this.currentElement;
            o.tagName;
            this.currentElement = o.parentNode;
          },
          startPrefixMapping: function (e, t) {},
          endPrefixMapping: function (e) {},
          processingInstruction: function (e, t) {
            var n = this.doc.createProcessingInstruction(e, t);
            this.locator && a(this.locator, n), u(this, n);
          },
          ignorableWhitespace: function (e, t, n) {},
          characters: function (e, t, n) {
            if ((e = c.apply(this, arguments))) {
              if (this.cdata) var o = this.doc.createCDATASection(e);
              else var o = this.doc.createTextNode(e);
              this.currentElement
                ? this.currentElement.appendChild(o)
                : /^\s*$/.test(e) && this.doc.appendChild(o),
                this.locator && a(this.locator, o);
            }
          },
          skippedEntity: function (e) {},
          endDocument: function () {
            this.doc.normalize();
          },
          setDocumentLocator: function (e) {
            (this.locator = e) && (e.lineNumber = 0);
          },
          comment: function (e, t, n) {
            e = c.apply(this, arguments);
            var o = this.doc.createComment(e);
            this.locator && a(this.locator, o), u(this, o);
          },
          startCDATA: function () {
            this.cdata = !0;
          },
          endCDATA: function () {
            this.cdata = !1;
          },
          startDTD: function (e, t, n) {
            var o = this.doc.implementation;
            if (o && o.createDocumentType) {
              var r = o.createDocumentType(e, t, n);
              this.locator && a(this.locator, r), u(this, r);
            }
          },
          warning: function (e) {
            console.warn("[xmldom warning]\t" + e, s(this.locator));
          },
          error: function (e) {
            console.error("[xmldom error]\t" + e, s(this.locator));
          },
          fatalError: function (e) {
            throw (
              (console.error("[xmldom fatalError]\t" + e, s(this.locator)), e)
            );
          },
        }),
        "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
          /\w+/g,
          function (e) {
            i.prototype[e] = function () {
              return null;
            };
          }
        );
      var l = n(13).XMLReader,
        d = (t.DOMImplementation = n(2).DOMImplementation);
      (t.XMLSerializer = n(2).XMLSerializer), (t.DOMParser = o);
    },
    function (e, t) {
      function n() {}
      function o(e, t, n, o, u) {
        function h(e) {
          if (e > 65535) {
            e -= 65536;
            var t = 55296 + (e >> 10),
              n = 56320 + (1023 & e);
            return String.fromCharCode(t, n);
          }
          return String.fromCharCode(e);
        }
        function p(e) {
          var t = e.slice(1, -1);
          return t in n
            ? n[t]
            : "#" === t.charAt(0)
            ? h(parseInt(t.substr(1).replace("x", "0x")))
            : (u.error("entity not found:" + e), e);
        }
        function g(t) {
          if (t > b) {
            var n = e.substring(b, t).replace(/&#?\w+;/g, p);
            k && m(b), o.characters(n, 0, t - b), (b = t);
          }
        }
        function m(t, n) {
          for (; t >= C && (n = v.exec(e)); )
            (y = n.index), (C = y + n[0].length), k.lineNumber++;
          k.columnNumber = t - y + 1;
        }
        for (
          var y = 0,
            C = 0,
            v = /.*(?:\r\n?|\n)|.*$/g,
            k = o.locator,
            S = [{ currentNSMap: t }],
            R = {},
            b = 0;
          ;

        ) {
          try {
            var B = e.indexOf("<", b);
            if (B < 0) {
              if (!e.substr(b).match(/^\s*$/)) {
                var T = o.doc,
                  A = T.createTextNode(e.substr(b));
                T.appendChild(A), (o.currentElement = A);
              }
              return;
            }
            switch ((B > b && g(B), e.charAt(B + 1))) {
              case "/":
                var x = e.indexOf(">", B + 3),
                  E = e.substring(B + 2, x),
                  w = S.pop();
                x < 0
                  ? ((E = e.substring(B + 2).replace(/[\s<].*/, "")),
                    u.error(
                      "end tag name: " + E + " is not complete:" + w.tagName
                    ),
                    (x = B + 1 + E.length))
                  : E.match(/\s</) &&
                    ((E = E.replace(/[\s<].*/, "")),
                    u.error("end tag name: " + E + " maybe not complete"),
                    (x = B + 1 + E.length));
                var _ = w.localNSMap,
                  I = w.tagName == E;
                if (
                  I ||
                  (w.tagName && w.tagName.toLowerCase() == E.toLowerCase())
                ) {
                  if ((o.endElement(w.uri, w.localName, E), _))
                    for (var O in _) o.endPrefixMapping(O);
                  I ||
                    u.fatalError(
                      "end tag name: " +
                        E +
                        " is not match the current start tagName:" +
                        w.tagName
                    );
                } else S.push(w);
                x++;
                break;
              case "?":
                k && m(B), (x = d(e, B, o));
                break;
              case "!":
                k && m(B), (x = l(e, B, o, u));
                break;
              default:
                k && m(B);
                var D = new f(),
                  P = S[S.length - 1].currentNSMap,
                  x = i(e, B, D, P, p, u),
                  N = D.length;
                if (
                  (!D.closed &&
                    c(e, x, D.tagName, R) &&
                    ((D.closed = !0),
                    n.nbsp || u.warning("unclosed xml attribute")),
                  k && N)
                ) {
                  for (var U = r(k, {}), M = 0; M < N; M++) {
                    var H = D[M];
                    m(H.offset), (H.locator = r(k, {}));
                  }
                  (o.locator = U), a(D, o, P) && S.push(D), (o.locator = k);
                } else a(D, o, P) && S.push(D);
                "http://www.w3.org/1999/xhtml" !== D.uri || D.closed
                  ? x++
                  : (x = s(e, x, D.tagName, p, o));
            }
          } catch (e) {
            u.error("element parse error: " + e), (x = -1);
          }
          x > b ? (b = x) : g(Math.max(B, b) + 1);
        }
      }
      function r(e, t) {
        return (
          (t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber), t
        );
      }
      function i(e, t, n, o, r, i) {
        for (var a, s, c = ++t, u = C; ; ) {
          var l = e.charAt(c);
          switch (l) {
            case "=":
              if (u === v) (a = e.slice(t, c)), (u = S);
              else {
                if (u !== k)
                  throw new Error("attribute equal must after attrName");
                u = S;
              }
              break;
            case "'":
            case '"':
              if (u === S || u === v) {
                if (
                  (u === v &&
                    (i.warning('attribute value must after "="'),
                    (a = e.slice(t, c))),
                  (t = c + 1),
                  !((c = e.indexOf(l, t)) > 0))
                )
                  throw new Error("attribute value no end '" + l + "' match");
                (s = e.slice(t, c).replace(/&#?\w+;/g, r)),
                  n.add(a, s, t - 1),
                  (u = b);
              } else {
                if (u != R) throw new Error('attribute value must after "="');
                (s = e.slice(t, c).replace(/&#?\w+;/g, r)),
                  n.add(a, s, t),
                  i.warning(
                    'attribute "' + a + '" missed start quot(' + l + ")!!"
                  ),
                  (t = c + 1),
                  (u = b);
              }
              break;
            case "/":
              switch (u) {
                case C:
                  n.setTagName(e.slice(t, c));
                case b:
                case B:
                case T:
                  (u = T), (n.closed = !0);
                case R:
                case v:
                case k:
                  break;
                default:
                  throw new Error("attribute invalid close char('/')");
              }
              break;
            case "":
              return (
                i.error("unexpected end of input"),
                u == C && n.setTagName(e.slice(t, c)),
                c
              );
            case ">":
              switch (u) {
                case C:
                  n.setTagName(e.slice(t, c));
                case b:
                case B:
                case T:
                  break;
                case R:
                case v:
                  (s = e.slice(t, c)),
                    "/" === s.slice(-1) &&
                      ((n.closed = !0), (s = s.slice(0, -1)));
                case k:
                  u === k && (s = a),
                    u == R
                      ? (i.warning('attribute "' + s + '" missed quot(")!!'),
                        n.add(a, s.replace(/&#?\w+;/g, r), t))
                      : (("http://www.w3.org/1999/xhtml" === o[""] &&
                          s.match(/^(?:disabled|checked|selected)$/i)) ||
                          i.warning(
                            'attribute "' +
                              s +
                              '" missed value!! "' +
                              s +
                              '" instead!!'
                          ),
                        n.add(s, s, t));
                  break;
                case S:
                  throw new Error("attribute value missed!!");
              }
              return c;
            case "\x80":
              l = " ";
            default:
              if (l <= " ")
                switch (u) {
                  case C:
                    n.setTagName(e.slice(t, c)), (u = B);
                    break;
                  case v:
                    (a = e.slice(t, c)), (u = k);
                    break;
                  case R:
                    var s = e.slice(t, c).replace(/&#?\w+;/g, r);
                    i.warning('attribute "' + s + '" missed quot(")!!'),
                      n.add(a, s, t);
                  case b:
                    u = B;
                }
              else
                switch (u) {
                  case k:
                    n.tagName;
                    ("http://www.w3.org/1999/xhtml" === o[""] &&
                      a.match(/^(?:disabled|checked|selected)$/i)) ||
                      i.warning(
                        'attribute "' +
                          a +
                          '" missed value!! "' +
                          a +
                          '" instead2!!'
                      ),
                      n.add(a, a, t),
                      (t = c),
                      (u = v);
                    break;
                  case b:
                    i.warning('attribute space is required"' + a + '"!!');
                  case B:
                    (u = v), (t = c);
                    break;
                  case S:
                    (u = R), (t = c);
                    break;
                  case T:
                    throw new Error(
                      "elements closed character '/' and '>' must be connected to"
                    );
                }
          }
          c++;
        }
      }
      function a(e, t, n) {
        for (var o = e.tagName, r = null, i = e.length; i--; ) {
          var a = e[i],
            s = a.qName,
            c = a.value,
            l = s.indexOf(":");
          if (l > 0)
            var d = (a.prefix = s.slice(0, l)),
              f = s.slice(l + 1),
              h = "xmlns" === d && f;
          else (f = s), (d = null), (h = "xmlns" === s && "");
          (a.localName = f),
            !1 !== h &&
              (null == r && ((r = {}), u(n, (n = {}))),
              (n[h] = r[h] = c),
              (a.uri = "http://www.w3.org/2000/xmlns/"),
              t.startPrefixMapping(h, c));
        }
        for (var i = e.length; i--; ) {
          a = e[i];
          var d = a.prefix;
          d &&
            ("xml" === d && (a.uri = "http://www.w3.org/XML/1998/namespace"),
            "xmlns" !== d && (a.uri = n[d || ""]));
        }
        var l = o.indexOf(":");
        l > 0
          ? ((d = e.prefix = o.slice(0, l)), (f = e.localName = o.slice(l + 1)))
          : ((d = null), (f = e.localName = o));
        var p = (e.uri = n[d || ""]);
        if ((t.startElement(p, f, o, e), !e.closed))
          return (e.currentNSMap = n), (e.localNSMap = r), !0;
        if ((t.endElement(p, f, o), r)) for (d in r) t.endPrefixMapping(d);
      }
      function s(e, t, n, o, r) {
        if (/^(?:script|textarea)$/i.test(n)) {
          var i = e.indexOf("</" + n + ">", t),
            a = e.substring(t + 1, i);
          if (/[&<]/.test(a))
            return /^script$/i.test(n)
              ? (r.characters(a, 0, a.length), i)
              : ((a = a.replace(/&#?\w+;/g, o)),
                r.characters(a, 0, a.length),
                i);
        }
        return t + 1;
      }
      function c(e, t, n, o) {
        var r = o[n];
        return (
          null == r &&
            ((r = e.lastIndexOf("</" + n + ">")),
            r < t && (r = e.lastIndexOf("</" + n)),
            (o[n] = r)),
          r < t
        );
      }
      function u(e, t) {
        for (var n in e) t[n] = e[n];
      }
      function l(e, t, n, o) {
        switch (e.charAt(t + 2)) {
          case "-":
            if ("-" === e.charAt(t + 3)) {
              var r = e.indexOf("--\x3e", t + 4);
              return r > t
                ? (n.comment(e, t + 4, r - t - 4), r + 3)
                : (o.error("Unclosed comment"), -1);
            }
            return -1;
          default:
            if ("CDATA[" == e.substr(t + 3, 6)) {
              var r = e.indexOf("]]>", t + 9);
              return (
                n.startCDATA(),
                n.characters(e, t + 9, r - t - 9),
                n.endCDATA(),
                r + 3
              );
            }
            var i = p(e, t),
              a = i.length;
            if (a > 1 && /!doctype/i.test(i[0][0])) {
              var s = i[1][0],
                c = a > 3 && /^public$/i.test(i[2][0]) && i[3][0],
                u = a > 4 && i[4][0],
                l = i[a - 1];
              return (
                n.startDTD(
                  s,
                  c && c.replace(/^(['"])(.*?)\1$/, "$2"),
                  u && u.replace(/^(['"])(.*?)\1$/, "$2")
                ),
                n.endDTD(),
                l.index + l[0].length
              );
            }
        }
        return -1;
      }
      function d(e, t, n) {
        var o = e.indexOf("?>", t);
        if (o) {
          var r = e.substring(t, o).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
          if (r) {
            r[0].length;
            return n.processingInstruction(r[1], r[2]), o + 2;
          }
          return -1;
        }
        return -1;
      }
      function f(e) {}
      function h(e, t) {
        return (e.__proto__ = t), e;
      }
      function p(e, t) {
        var n,
          o = [],
          r = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
        for (r.lastIndex = t, r.exec(e); (n = r.exec(e)); )
          if ((o.push(n), n[1])) return o;
      }
      var g =
          /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
        m = new RegExp(
          "[\\-\\.0-9" +
            g.source.slice(1, -1) +
            "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"
        ),
        y = new RegExp(
          "^" + g.source + m.source + "*(?::" + g.source + m.source + "*)?$"
        ),
        C = 0,
        v = 1,
        k = 2,
        S = 3,
        R = 4,
        b = 5,
        B = 6,
        T = 7;
      (n.prototype = {
        parse: function (e, t, n) {
          var r = this.domBuilder;
          r.startDocument(),
            u(t, (t = {})),
            o(e, t, n, r, this.errorHandler),
            r.endDocument();
        },
      }),
        (f.prototype = {
          setTagName: function (e) {
            if (!y.test(e)) throw new Error("invalid tagName:" + e);
            this.tagName = e;
          },
          add: function (e, t, n) {
            if (!y.test(e)) throw new Error("invalid attribute:" + e);
            this[this.length++] = { qName: e, value: t, offset: n };
          },
          length: 0,
          getLocalName: function (e) {
            return this[e].localName;
          },
          getLocator: function (e) {
            return this[e].locator;
          },
          getQName: function (e) {
            return this[e].qName;
          },
          getURI: function (e) {
            return this[e].uri;
          },
          getValue: function (e) {
            return this[e].value;
          },
        }),
        h({}, h.prototype) instanceof h ||
          (h = function (e, t) {
            function n() {}
            (n.prototype = t), (n = new n());
            for (t in e) n[t] = e[t];
            return n;
          }),
        (t.XMLReader = n);
    },
    function (e, t) {
      function n(e) {
        return ("" + e)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/'/g, "&apos;")
          .replace(/"/g, "&quot;")
          .replace(r, "");
      }
      var o = new RegExp(
          "^([^a-zA-Z_\xc0-\xd6\xd8-\xf6\xf8-\xff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fff\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd])|^((x|X)(m|M)(l|L))|([^a-zA-Z_\xc0-\xd6\xd8-\xf6\xf8-\xff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fff\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd-.0-9\xb7\u0300-\u036f\u203f\u2040])",
          "g"
        ),
        r =
          /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,
        i = function (e) {
          var t = [];
          if (e instanceof Object)
            for (var n in e) e.hasOwnProperty(n) && t.push(n);
          return t;
        },
        a = function (e, t) {
          var r = function (e, n, r, i, a) {
            var s = void 0 !== t.indent ? t.indent : "\t",
              c = t.prettyPrint ? "\n" + new Array(i).join(s) : "";
            t.removeIllegalNameCharacters && (e = e.replace(o, "_"));
            var u = [c, "<", e, r || ""];
            return (
              n && n.length > 0
                ? (u.push(">"),
                  u.push(n),
                  a && u.push(c),
                  u.push("</"),
                  u.push(e),
                  u.push(">"))
                : u.push("/>"),
              u.join("")
            );
          };
          return (function e(o, a, s) {
            var c = typeof o;
            switch (
              ((Array.isArray ? Array.isArray(o) : o instanceof Array)
                ? (c = "array")
                : o instanceof Date && (c = "date"),
              c)
            ) {
              case "array":
                var u = [];
                return (
                  o.map(function (t) {
                    u.push(e(t, 1, s + 1));
                  }),
                  t.prettyPrint && u.push("\n"),
                  u.join("")
                );
              case "date":
                return o.toJSON ? o.toJSON() : o + "";
              case "object":
                var l = [];
                for (var d in o)
                  if (o.hasOwnProperty(d))
                    if (o[d] instanceof Array)
                      for (var f = 0; f < o[d].length; f++)
                        o[d].hasOwnProperty(f) &&
                          l.push(
                            r(
                              d,
                              e(o[d][f], 0, s + 1),
                              null,
                              s + 1,
                              i(o[d][f]).length
                            )
                          );
                    else l.push(r(d, e(o[d], 0, s + 1), null, s + 1));
                return (
                  t.prettyPrint && l.length > 0 && l.push("\n"), l.join("")
                );
              case "function":
                return o();
              default:
                return t.escape ? n(o) : "" + o;
            }
          })(e, 0, 0);
        },
        s = function (e) {
          var t = ['<?xml version="1.0" encoding="UTF-8"'];
          return e && t.push(' standalone="yes"'), t.push("?>"), t.join("");
        };
      e.exports = function (e, t) {
        if (
          (t ||
            (t = {
              xmlHeader: { standalone: !0 },
              prettyPrint: !0,
              indent: "  ",
              escape: !0,
            }),
          "string" == typeof e)
        )
          try {
            e = JSON.parse(e.toString());
          } catch (e) {
            return !1;
          }
        var n = "",
          o = "";
        return (
          t &&
            ("object" == typeof t
              ? (t.xmlHeader && (n = s(!!t.xmlHeader.standalone)),
                void 0 !== t.docType && (o = "<!DOCTYPE " + t.docType + ">"))
              : (n = s())),
          (t = t || {}),
          [n, t.prettyPrint && o ? "\n" : "", o, a(e, t)]
            .join("")
            .replace(/\n{2,}/g, "\n")
            .replace(/\s+$/g, "")
        );
      };
    },
    function (e, t, n) {
      var o = n(4),
        r = n(0),
        i = {},
        a = function (e, t) {
          (i[t] = e[t]),
            (e[t] = function (e, n) {
              e.SkipTask ? i[t].call(this, e, n) : this._addTask(t, e, n);
            });
        },
        s = function (e) {
          var t = [],
            n = {},
            a = 0,
            s = 0,
            c = function (e) {
              var t = {
                id: e.id,
                Bucket: e.Bucket,
                Region: e.Region,
                Key: e.Key,
                FilePath: e.FilePath,
                state: e.state,
                loaded: e.loaded,
                size: e.size,
                speed: e.speed,
                percent: e.percent,
                hashPercent: e.hashPercent,
                error: e.error,
              };
              return (
                e.FilePath && (t.FilePath = e.FilePath),
                e._custom && (t._custom = e._custom),
                t
              );
            },
            u = (function () {
              var n,
                o = function () {
                  (n = 0),
                    e.emit("task-list-update", { list: r.map(t, c) }),
                    e.emit("list-update", { list: r.map(t, c) });
                };
              return function () {
                n || (n = setTimeout(o));
              };
            })(),
            l = function () {
              if (!(t.length <= e.options.UploadQueueSize)) {
                for (
                  var o = 0;
                  o < s && o < t.length && t.length > e.options.UploadQueueSize;

                ) {
                  var r =
                    "waiting" === t[o].state ||
                    "checking" === t[o].state ||
                    "uploading" === t[o].state;
                  t[o] && r
                    ? o++
                    : (n[t[o].id] && delete n[t[o].id], t.splice(o, 1), s--);
                }
                u();
              }
            },
            d = function () {
              if (!(a >= e.options.FileParallelLimit)) {
                for (; t[s] && "waiting" !== t[s].state; ) s++;
                if (!(s >= t.length)) {
                  var n = t[s];
                  s++,
                    a++,
                    (n.state = "checking"),
                    n.params.onTaskStart && n.params.onTaskStart(c(n)),
                    !n.params.UploadData && (n.params.UploadData = {});
                  var o = r.formatParams(n.api, n.params);
                  i[n.api].call(e, o, function (t, o) {
                    e._isRunningTask(n.id) &&
                      (("checking" !== n.state && "uploading" !== n.state) ||
                        ((n.state = t ? "error" : "success"),
                        t && (n.error = t),
                        a--,
                        u(),
                        d(),
                        n.callback && n.callback(t, o),
                        "success" === n.state &&
                          (n.params &&
                            (delete n.params.UploadData,
                            delete n.params.Body,
                            delete n.params),
                          delete n.callback)),
                      l());
                  }),
                    u(),
                    setTimeout(d);
                }
              }
            },
            f = function (t, r) {
              var i = n[t];
              if (i) {
                var s = i && "waiting" === i.state,
                  c = i && ("checking" === i.state || "uploading" === i.state);
                if (
                  ("canceled" === r && "canceled" !== i.state) ||
                  ("paused" === r && s) ||
                  ("paused" === r && c)
                ) {
                  if (
                    "paused" === r &&
                    i.params.Body &&
                    "function" == typeof i.params.Body.pipe
                  )
                    return void console.error("stream not support pause");
                  (i.state = r),
                    e.emit("inner-kill-task", { TaskId: t, toState: r });
                  try {
                    var f = i && i.params && i.params.UploadData.UploadId;
                  } catch (e) {}
                  "canceled" === r && f && o.removeUsing(f),
                    u(),
                    c && (a--, d()),
                    "canceled" === r &&
                      (i.params &&
                        (delete i.params.UploadData,
                        delete i.params.Body,
                        delete i.params),
                      delete i.callback);
                }
                l();
              }
            };
          e._addTasks = function (t) {
            r.each(t, function (t) {
              e._addTask(t.api, t.params, t.callback, !0);
            }),
              u();
          };
          var h = !0;
          (e._addTask = function (o, i, a, s) {
            i = r.formatParams(o, i);
            var c = r.uuid();
            (i.TaskId = c),
              i.onTaskReady && i.onTaskReady(c),
              i.TaskReady &&
                (i.TaskReady(c),
                h &&
                  console.warn(
                    'warning: Param "TaskReady" has been deprecated. Please use "onTaskReady" instead.'
                  ),
                (h = !1));
            var f = {
                params: i,
                callback: a,
                api: o,
                index: t.length,
                id: c,
                Bucket: i.Bucket,
                Region: i.Region,
                Key: i.Key,
                FilePath: i.FilePath || "",
                state: "waiting",
                loaded: 0,
                size: 0,
                speed: 0,
                percent: 0,
                hashPercent: 0,
                error: null,
                _custom: i._custom,
              },
              p = i.onHashProgress;
            i.onHashProgress = function (t) {
              e._isRunningTask(f.id) &&
                ((f.hashPercent = t.percent), p && p(t), u());
            };
            var g = i.onProgress;
            return (
              (i.onProgress = function (t) {
                e._isRunningTask(f.id) &&
                  ("checking" === f.state && (f.state = "uploading"),
                  (f.loaded = t.loaded),
                  (f.speed = t.speed),
                  (f.percent = t.percent),
                  g && g(t),
                  u());
              }),
              r.getFileSize(o, i, function (e, o) {
                if (e) return a(r.error(e));
                (n[c] = f), t.push(f), (f.size = o), !s && u(), d(), l();
              }),
              c
            );
          }),
            (e._isRunningTask = function (e) {
              var t = n[e];
              return !(
                !t ||
                ("checking" !== t.state && "uploading" !== t.state)
              );
            }),
            (e.getTaskList = function () {
              return r.map(t, c);
            }),
            (e.cancelTask = function (e) {
              f(e, "canceled");
            }),
            (e.pauseTask = function (e) {
              f(e, "paused");
            }),
            (e.restartTask = function (e) {
              var t = n[e];
              !t ||
                ("paused" !== t.state && "error" !== t.state) ||
                ((t.state = "waiting"), u(), (s = Math.min(s, t.index)), d());
            }),
            (e.isUploadRunning = function () {
              return a || s < t.length;
            });
        };
      (e.exports.transferToTaskMethod = a), (e.exports.init = s);
    },
    function (e, t, n) {
      function o(e, t) {
        "function" == typeof e && ((t = e), (e = {}));
        var n =
            this.options.Protocol ||
            (Ie.isBrowser && "http:" === location.protocol
              ? "http:"
              : "https:"),
          o = this.options.ServiceDomain,
          r = e.AppId || this.options.appId,
          i = e.Region;
        o
          ? ((o = o
              .replace(/\{\{AppId\}\}/gi, r || "")
              .replace(/\{\{Region\}\}/gi, i || "")
              .replace(/\{\{.*?\}\}/gi, "")),
            /^[a-zA-Z]+:\/\//.test(o) || (o = n + "//" + o),
            "/" === o.slice(-1) && (o = o.slice(0, -1)))
          : (o = i
              ? n + "//cos." + i + ".myqcloud.com"
              : n + "//service.cos.myqcloud.com");
        var a = "",
          s = i ? "cos." + i + ".myqcloud.com" : "service.cos.myqcloud.com";
        s === o.replace(/^https?:\/\/([^/]+)(\/.*)?$/, "$1") && (a = s),
          xe.call(
            this,
            {
              Action: "name/cos:GetService",
              url: o,
              method: "GET",
              headers: e.Headers,
              SignHost: a,
            },
            function (e, n) {
              if (e) return t(e);
              var o =
                (n &&
                  n.ListAllMyBucketsResult &&
                  n.ListAllMyBucketsResult.Buckets &&
                  n.ListAllMyBucketsResult.Buckets.Bucket) ||
                [];
              o = Ie.isArray(o) ? o : [o];
              var r =
                (n &&
                  n.ListAllMyBucketsResult &&
                  n.ListAllMyBucketsResult.Owner) ||
                {};
              t(null, {
                Buckets: o,
                Owner: r,
                statusCode: n.statusCode,
                headers: n.headers,
              });
            }
          );
      }
      function r(e, t) {
        var n = this,
          o = "";
        if (e.BucketAZConfig) {
          var r = { BucketAZConfig: e.BucketAZConfig };
          o = Ie.json2xml({ CreateBucketConfiguration: r });
        }
        xe.call(
          this,
          {
            Action: "name/cos:PutBucket",
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            body: o,
          },
          function (o, r) {
            if (o) return t(o);
            var i = Be({
              protocol: n.options.Protocol,
              domain: n.options.Domain,
              bucket: e.Bucket,
              region: e.Region,
              isLocation: !0,
            });
            t(null, {
              Location: i,
              statusCode: r.statusCode,
              headers: r.headers,
            });
          }
        );
      }
      function i(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:HeadBucket",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            method: "HEAD",
          },
          t
        );
      }
      function a(e, t) {
        var n = {};
        (n.prefix = e.Prefix || ""),
          (n.delimiter = e.Delimiter),
          (n.marker = e.Marker),
          (n["max-keys"] = e.MaxKeys),
          (n["encoding-type"] = e.EncodingType),
          xe.call(
            this,
            {
              Action: "name/cos:GetBucket",
              ResourceKey: n.prefix,
              method: "GET",
              Bucket: e.Bucket,
              Region: e.Region,
              headers: e.Headers,
              qs: n,
            },
            function (e, n) {
              if (e) return t(e);
              var o = n.ListBucketResult || {},
                r = o.Contents || [],
                i = o.CommonPrefixes || [];
              (r = Ie.isArray(r) ? r : [r]), (i = Ie.isArray(i) ? i : [i]);
              var a = Ie.clone(o);
              Ie.extend(a, {
                Contents: r,
                CommonPrefixes: i,
                statusCode: n.statusCode,
                headers: n.headers,
              }),
                t(null, a);
            }
          );
      }
      function s(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucket",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            method: "DELETE",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function c(e, t) {
        var n = e.Headers,
          o = "";
        if (e.AccessControlPolicy) {
          var r = Ie.clone(e.AccessControlPolicy || {}),
            i = r.Grants || r.Grant;
          (i = Ie.isArray(i) ? i : [i]),
            delete r.Grant,
            delete r.Grants,
            (r.AccessControlList = { Grant: i }),
            (o = Ie.json2xml({ AccessControlPolicy: r })),
            (n["Content-Type"] = "application/xml"),
            (n["Content-MD5"] = Ie.binaryBase64(Ie.md5(o)));
        }
        Ie.each(n, function (e, t) {
          0 === t.indexOf("x-cos-grant-") && (n[t] = be(n[t]));
        }),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketACL",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              headers: n,
              action: "acl",
              body: o,
            },
            function (e, n) {
              if (e) return t(e);
              t(null, { statusCode: n.statusCode, headers: n.headers });
            }
          );
      }
      function u(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketACL",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "acl",
          },
          function (e, n) {
            if (e) return t(e);
            var o = n.AccessControlPolicy || {},
              r = o.Owner || {},
              i = o.AccessControlList.Grant || [];
            i = Ie.isArray(i) ? i : [i];
            var a = Re(o);
            n.headers &&
              n.headers["x-cos-acl"] &&
              (a.ACL = n.headers["x-cos-acl"]),
              (a = Ie.extend(a, {
                Owner: r,
                Grants: i,
                statusCode: n.statusCode,
                headers: n.headers,
              })),
              t(null, a);
          }
        );
      }
      function l(e, t) {
        var n = e.CORSConfiguration || {},
          o = n.CORSRules || e.CORSRules || [];
        (o = Ie.clone(Ie.isArray(o) ? o : [o])),
          Ie.each(o, function (e) {
            Ie.each(
              [
                "AllowedOrigin",
                "AllowedHeader",
                "AllowedMethod",
                "ExposeHeader",
              ],
              function (t) {
                var n = t + "s",
                  o = e[n] || e[t] || [];
                delete e[n], (e[t] = Ie.isArray(o) ? o : [o]);
              }
            );
          });
        var r = Ie.json2xml({ CORSConfiguration: { CORSRule: o } }),
          i = e.Headers;
        (i["Content-Type"] = "application/xml"),
          (i["Content-MD5"] = Ie.binaryBase64(Ie.md5(r))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketCORS",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: r,
              action: "cors",
              headers: i,
            },
            function (e, n) {
              if (e) return t(e);
              t(null, { statusCode: n.statusCode, headers: n.headers });
            }
          );
      }
      function d(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketCORS",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "cors",
          },
          function (e, n) {
            if (e)
              if (
                404 === e.statusCode &&
                e.error &&
                "NoSuchCORSConfiguration" === e.error.Code
              ) {
                var o = { CORSRules: [], statusCode: e.statusCode };
                e.headers && (o.headers = e.headers), t(null, o);
              } else t(e);
            else {
              var r = n.CORSConfiguration || {},
                i = r.CORSRules || r.CORSRule || [];
              (i = Ie.clone(Ie.isArray(i) ? i : [i])),
                Ie.each(i, function (e) {
                  Ie.each(
                    [
                      "AllowedOrigin",
                      "AllowedHeader",
                      "AllowedMethod",
                      "ExposeHeader",
                    ],
                    function (t) {
                      var n = t + "s",
                        o = e[n] || e[t] || [];
                      delete e[t], (e[n] = Ie.isArray(o) ? o : [o]);
                    }
                  );
                }),
                t(null, {
                  CORSRules: i,
                  statusCode: n.statusCode,
                  headers: n.headers,
                });
            }
          }
        );
      }
      function f(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketCORS",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "cors",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, {
                  statusCode: n.statusCode || e.statusCode,
                  headers: n.headers,
                });
          }
        );
      }
      function h(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketLocation",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "location",
          },
          t
        );
      }
      function p(e, t) {
        var n = e.Policy;
        try {
          "string" == typeof n && (n = JSON.parse(n));
        } catch (e) {}
        if (!n || "string" == typeof n)
          return t(Ie.error(new Error("Policy format error")));
        var o = JSON.stringify(n);
        n.version || (n.version = "2.0");
        var r = e.Headers;
        (r["Content-Type"] = "application/json"),
          (r["Content-MD5"] = Ie.binaryBase64(Ie.md5(o))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketPolicy",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              action: "policy",
              body: o,
              headers: r,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function g(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketPolicy",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "policy",
            rawBody: !0,
          },
          function (e, n) {
            if (e)
              return t(
                e.statusCode && 403 === e.statusCode
                  ? Ie.error(e, { ErrorStatus: "Access Denied" })
                  : e.statusCode && 405 === e.statusCode
                  ? Ie.error(e, { ErrorStatus: "Method Not Allowed" })
                  : e.statusCode && 404 === e.statusCode
                  ? Ie.error(e, { ErrorStatus: "Policy Not Found" })
                  : e
              );
            var o = {};
            try {
              o = JSON.parse(n.body);
            } catch (e) {}
            t(null, {
              Policy: o,
              statusCode: n.statusCode,
              headers: n.headers,
            });
          }
        );
      }
      function m(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketPolicy",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "policy",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, {
                  statusCode: n.statusCode || e.statusCode,
                  headers: n.headers,
                });
          }
        );
      }
      function y(e, t) {
        var n = e.Tagging || {},
          o = n.TagSet || n.Tags || e.Tags || [];
        o = Ie.clone(Ie.isArray(o) ? o : [o]);
        var r = Ie.json2xml({ Tagging: { TagSet: { Tag: o } } }),
          i = e.Headers;
        (i["Content-Type"] = "application/xml"),
          (i["Content-MD5"] = Ie.binaryBase64(Ie.md5(r))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketTagging",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: r,
              action: "tagging",
              headers: i,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function C(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketTagging",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "tagging",
          },
          function (e, n) {
            if (e)
              if (
                404 !== e.statusCode ||
                !e.error ||
                ("Not Found" !== e.error && "NoSuchTagSet" !== e.error.Code)
              )
                t(e);
              else {
                var o = { Tags: [], statusCode: e.statusCode };
                e.headers && (o.headers = e.headers), t(null, o);
              }
            else {
              var r = [];
              try {
                r = n.Tagging.TagSet.Tag || [];
              } catch (e) {}
              (r = Ie.clone(Ie.isArray(r) ? r : [r])),
                t(null, {
                  Tags: r,
                  statusCode: n.statusCode,
                  headers: n.headers,
                });
            }
          }
        );
      }
      function v(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketTagging",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "tagging",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function k(e, t) {
        var n = e.LifecycleConfiguration || {},
          o = n.Rules || e.Rules || [];
        o = Ie.clone(o);
        var r = Ie.json2xml({ LifecycleConfiguration: { Rule: o } }),
          i = e.Headers;
        (i["Content-Type"] = "application/xml"),
          (i["Content-MD5"] = Ie.binaryBase64(Ie.md5(r))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketLifecycle",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: r,
              action: "lifecycle",
              headers: i,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function S(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketLifecycle",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "lifecycle",
          },
          function (e, n) {
            if (e)
              if (
                404 === e.statusCode &&
                e.error &&
                "NoSuchLifecycleConfiguration" === e.error.Code
              ) {
                var o = { Rules: [], statusCode: e.statusCode };
                e.headers && (o.headers = e.headers), t(null, o);
              } else t(e);
            else {
              var r = [];
              try {
                r = n.LifecycleConfiguration.Rule || [];
              } catch (e) {}
              (r = Ie.clone(Ie.isArray(r) ? r : [r])),
                t(null, {
                  Rules: r,
                  statusCode: n.statusCode,
                  headers: n.headers,
                });
            }
          }
        );
      }
      function R(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketLifecycle",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "lifecycle",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function b(e, t) {
        if (!e.VersioningConfiguration)
          return void t(
            Ie.error(new Error("missing param VersioningConfiguration"))
          );
        var n = e.VersioningConfiguration || {},
          o = Ie.json2xml({ VersioningConfiguration: n }),
          r = e.Headers;
        (r["Content-Type"] = "application/xml"),
          (r["Content-MD5"] = Ie.binaryBase64(Ie.md5(o))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketVersioning",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: o,
              action: "versioning",
              headers: r,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function B(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketVersioning",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "versioning",
          },
          function (e, n) {
            e ||
              (!n.VersioningConfiguration && (n.VersioningConfiguration = {})),
              t(e, n);
          }
        );
      }
      function T(e, t) {
        var n = Ie.clone(e.ReplicationConfiguration),
          o = Ie.json2xml({ ReplicationConfiguration: n });
        (o = o.replace(/<(\/?)Rules>/gi, "<$1Rule>")),
          (o = o.replace(/<(\/?)Tags>/gi, "<$1Tag>"));
        var r = e.Headers;
        (r["Content-Type"] = "application/xml"),
          (r["Content-MD5"] = Ie.binaryBase64(Ie.md5(o))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketReplication",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: o,
              action: "replication",
              headers: r,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function A(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketReplication",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "replication",
          },
          function (e, n) {
            if (e)
              if (
                404 !== e.statusCode ||
                !e.error ||
                ("Not Found" !== e.error &&
                  "ReplicationConfigurationnotFoundError" !== e.error.Code)
              )
                t(e);
              else {
                var o = {
                  ReplicationConfiguration: { Rules: [] },
                  statusCode: e.statusCode,
                };
                e.headers && (o.headers = e.headers), t(null, o);
              }
            else
              !n.ReplicationConfiguration && (n.ReplicationConfiguration = {}),
                n.ReplicationConfiguration.Rule &&
                  ((n.ReplicationConfiguration.Rules = Ie.makeArray(
                    n.ReplicationConfiguration.Rule
                  )),
                  delete n.ReplicationConfiguration.Rule),
                t(e, n);
          }
        );
      }
      function x(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketReplication",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "replication",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function E(e, t) {
        if (!e.WebsiteConfiguration)
          return void t(
            Ie.error(new Error("missing param WebsiteConfiguration"))
          );
        var n = Ie.clone(e.WebsiteConfiguration || {}),
          o = n.RoutingRules || n.RoutingRule || [];
        (o = Ie.isArray(o) ? o : [o]),
          delete n.RoutingRule,
          delete n.RoutingRules,
          o.length && (n.RoutingRules = { RoutingRule: o });
        var r = Ie.json2xml({ WebsiteConfiguration: n }),
          i = e.Headers;
        (i["Content-Type"] = "application/xml"),
          (i["Content-MD5"] = Ie.binaryBase64(Ie.md5(r))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketWebsite",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: r,
              action: "website",
              headers: i,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function w(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketWebsite",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: e.Headers,
            action: "website",
          },
          function (e, n) {
            if (e)
              if (
                404 === e.statusCode &&
                "NoSuchWebsiteConfiguration" === e.error.Code
              ) {
                var o = { WebsiteConfiguration: {}, statusCode: e.statusCode };
                e.headers && (o.headers = e.headers), t(null, o);
              } else t(e);
            else {
              var r = n.WebsiteConfiguration || {};
              if (r.RoutingRules) {
                var i = Ie.clone(r.RoutingRules.RoutingRule || []);
                (i = Ie.makeArray(i)), (r.RoutingRules = i);
              }
              t(null, {
                WebsiteConfiguration: r,
                statusCode: n.statusCode,
                headers: n.headers,
              });
            }
          }
        );
      }
      function _(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketWebsite",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "website",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function I(e, t) {
        if (!e.RefererConfiguration)
          return void t(
            Ie.error(new Error("missing param RefererConfiguration"))
          );
        var n = Ie.clone(e.RefererConfiguration || {}),
          o = n.DomainList || {},
          r = o.Domains || o.Domain || [];
        (r = Ie.isArray(r) ? r : [r]),
          r.length && (n.DomainList = { Domain: r });
        var i = Ie.json2xml({ RefererConfiguration: n }),
          a = e.Headers;
        (a["Content-Type"] = "application/xml"),
          (a["Content-MD5"] = Ie.binaryBase64(Ie.md5(i))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketReferer",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: i,
              action: "referer",
              headers: a,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function O(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketReferer",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: e.Headers,
            action: "referer",
          },
          function (e, n) {
            if (e)
              if (
                404 === e.statusCode &&
                "NoSuchRefererConfiguration" === e.error.Code
              ) {
                var o = { WebsiteConfiguration: {}, statusCode: e.statusCode };
                e.headers && (o.headers = e.headers), t(null, o);
              } else t(e);
            else {
              var r = n.RefererConfiguration || {};
              if (r.DomainList) {
                var i = Ie.makeArray(r.DomainList.Domain || []);
                r.DomainList = { Domains: i };
              }
              t(null, {
                RefererConfiguration: r,
                statusCode: n.statusCode,
                headers: n.headers,
              });
            }
          }
        );
      }
      function D(e, t) {
        var n = e.DomainConfiguration || {},
          o = n.DomainRule || e.DomainRule || [];
        o = Ie.clone(o);
        var r = Ie.json2xml({ DomainConfiguration: { DomainRule: o } }),
          i = e.Headers;
        (i["Content-Type"] = "application/xml"),
          (i["Content-MD5"] = Ie.binaryBase64(Ie.md5(r))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketDomain",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: r,
              action: "domain",
              headers: i,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function P(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketDomain",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "domain",
          },
          function (e, n) {
            if (e) return t(e);
            var o = [];
            try {
              o = n.DomainConfiguration.DomainRule || [];
            } catch (e) {}
            (o = Ie.clone(Ie.isArray(o) ? o : [o])),
              t(null, {
                DomainRule: o,
                statusCode: n.statusCode,
                headers: n.headers,
              });
          }
        );
      }
      function N(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketDomain",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "domain",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function U(e, t) {
        var n = e.OriginConfiguration || {},
          o = n.OriginRule || e.OriginRule || [];
        o = Ie.clone(o);
        var r = Ie.json2xml({ OriginConfiguration: { OriginRule: o } }),
          i = e.Headers;
        (i["Content-Type"] = "application/xml"),
          (i["Content-MD5"] = Ie.binaryBase64(Ie.md5(r))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketOrigin",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: r,
              action: "origin",
              headers: i,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function M(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketOrigin",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "origin",
          },
          function (e, n) {
            if (e) return t(e);
            var o = [];
            try {
              o = n.OriginConfiguration.OriginRule || [];
            } catch (e) {}
            (o = Ie.clone(Ie.isArray(o) ? o : [o])),
              t(null, {
                OriginRule: o,
                statusCode: n.statusCode,
                headers: n.headers,
              });
          }
        );
      }
      function H(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketOrigin",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "origin",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function L(e, t) {
        var n = Ie.json2xml({
            BucketLoggingStatus: e.BucketLoggingStatus || "",
          }),
          o = e.Headers;
        (o["Content-Type"] = "application/xml"),
          (o["Content-MD5"] = Ie.binaryBase64(Ie.md5(n))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketLogging",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: n,
              action: "logging",
              headers: o,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function F(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketLogging",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "logging",
          },
          function (e, n) {
            if (e) return t(e);
            t(null, {
              BucketLoggingStatus: n.BucketLoggingStatus,
              statusCode: n.statusCode,
              headers: n.headers,
            });
          }
        );
      }
      function K(e, t) {
        var n = Ie.clone(e.InventoryConfiguration);
        if (n.OptionalFields) {
          var o = n.OptionalFields || [];
          n.OptionalFields = { Field: o };
        }
        if (
          n.Destination &&
          n.Destination.COSBucketDestination &&
          n.Destination.COSBucketDestination.Encryption
        ) {
          var r = n.Destination.COSBucketDestination.Encryption;
          Object.keys(r).indexOf("SSECOS") > -1 &&
            ((r["SSE-COS"] = r.SSECOS), delete r.SSECOS);
        }
        var i = Ie.json2xml({ InventoryConfiguration: n }),
          a = e.Headers;
        (a["Content-Type"] = "application/xml"),
          (a["Content-MD5"] = Ie.binaryBase64(Ie.md5(i))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketInventory",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: i,
              action: "inventory",
              qs: { id: e.Id },
              headers: a,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function j(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketInventory",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "inventory",
            qs: { id: e.Id },
          },
          function (e, n) {
            if (e) return t(e);
            var o = n.InventoryConfiguration;
            if (o && o.OptionalFields && o.OptionalFields.Field) {
              var r = o.OptionalFields.Field;
              Ie.isArray(r) || (r = [r]), (o.OptionalFields = r);
            }
            if (
              o.Destination &&
              o.Destination.COSBucketDestination &&
              o.Destination.COSBucketDestination.Encryption
            ) {
              var i = o.Destination.COSBucketDestination.Encryption;
              Object.keys(i).indexOf("SSE-COS") > -1 &&
                ((i.SSECOS = i["SSE-COS"]), delete i["SSE-COS"]);
            }
            t(null, {
              InventoryConfiguration: o,
              statusCode: n.statusCode,
              headers: n.headers,
            });
          }
        );
      }
      function z(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:ListBucketInventory",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "inventory",
            qs: { "continuation-token": e.ContinuationToken },
          },
          function (e, n) {
            if (e) return t(e);
            var o = n.ListInventoryConfigurationResult,
              r = o.InventoryConfiguration || [];
            (r = Ie.isArray(r) ? r : [r]),
              delete o.InventoryConfiguration,
              Ie.each(r, function (e) {
                if (e && e.OptionalFields && e.OptionalFields.Field) {
                  var t = e.OptionalFields.Field;
                  Ie.isArray(t) || (t = [t]), (e.OptionalFields = t);
                }
                if (
                  e.Destination &&
                  e.Destination.COSBucketDestination &&
                  e.Destination.COSBucketDestination.Encryption
                ) {
                  var n = e.Destination.COSBucketDestination.Encryption;
                  Object.keys(n).indexOf("SSE-COS") > -1 &&
                    ((n.SSECOS = n["SSE-COS"]), delete n["SSE-COS"]);
                }
              }),
              (o.InventoryConfigurations = r),
              Ie.extend(o, { statusCode: n.statusCode, headers: n.headers }),
              t(null, o);
          }
        );
      }
      function q(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketInventory",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "inventory",
            qs: { id: e.Id },
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function G(e, t) {
        if (!e.AccelerateConfiguration)
          return void t(
            Ie.error(new Error("missing param AccelerateConfiguration"))
          );
        var n = { AccelerateConfiguration: e.AccelerateConfiguration || {} },
          o = Ie.json2xml(n),
          r = {};
        (r["Content-Type"] = "application/xml"),
          (r["Content-MD5"] = Ie.binaryBase64(Ie.md5(o))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketAccelerate",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: o,
              action: "accelerate",
              headers: r,
            },
            function (e, n) {
              if (e) return t(e);
              t(null, { statusCode: n.statusCode, headers: n.headers });
            }
          );
      }
      function V(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketAccelerate",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            action: "accelerate",
          },
          function (e, n) {
            e ||
              (!n.AccelerateConfiguration && (n.AccelerateConfiguration = {})),
              t(e, n);
          }
        );
      }
      function X(e, t) {
        var n = e.ServerSideEncryptionConfiguration || {},
          o = n.Rule || n.Rules || [],
          r = Ie.json2xml({ ServerSideEncryptionConfiguration: { Rule: o } }),
          i = e.Headers;
        (i["Content-Type"] = "application/xml"),
          (i["Content-MD5"] = Ie.binaryBase64(Ie.md5(r))),
          xe.call(
            this,
            {
              Action: "name/cos:PutBucketEncryption",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: r,
              action: "encryption",
              headers: i,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function W(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetBucketEncryption",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "encryption",
          },
          function (e, n) {
            if (e)
              if (
                404 === e.statusCode &&
                "NoSuchEncryptionConfiguration" === e.code
              ) {
                var o = {
                  EncryptionConfiguration: { Rules: [] },
                  statusCode: e.statusCode,
                };
                e.headers && (o.headers = e.headers), t(null, o);
              } else t(e);
            else {
              var r = Ie.makeArray(
                (n.EncryptionConfiguration && n.EncryptionConfiguration.Rule) ||
                  []
              );
              (n.EncryptionConfiguration = { Rules: r }), t(e, n);
            }
          }
        );
      }
      function $(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteBucketReplication",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "encryption",
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function Q(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:HeadObject",
            method: "HEAD",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            VersionId: e.VersionId,
            headers: e.Headers,
          },
          function (n, o) {
            if (n) {
              var r = n.statusCode;
              return e.Headers["If-Modified-Since"] && r && 304 === r
                ? t(null, { NotModified: !0, statusCode: r })
                : t(n);
            }
            (o.ETag = Ie.attr(o.headers, "etag", "")), t(null, o);
          }
        );
      }
      function J(e, t) {
        var n = {};
        (n.prefix = e.Prefix || ""),
          (n.delimiter = e.Delimiter),
          (n["key-marker"] = e.KeyMarker),
          (n["version-id-marker"] = e.VersionIdMarker),
          (n["max-keys"] = e.MaxKeys),
          (n["encoding-type"] = e.EncodingType),
          xe.call(
            this,
            {
              Action: "name/cos:GetBucketObjectVersions",
              ResourceKey: n.prefix,
              method: "GET",
              Bucket: e.Bucket,
              Region: e.Region,
              headers: e.Headers,
              qs: n,
              action: "versions",
            },
            function (e, n) {
              if (e) return t(e);
              var o = n.ListVersionsResult || {},
                r = o.DeleteMarker || [];
              r = Ie.isArray(r) ? r : [r];
              var i = o.Version || [];
              i = Ie.isArray(i) ? i : [i];
              var a = Ie.clone(o);
              delete a.DeleteMarker,
                delete a.Version,
                Ie.extend(a, {
                  DeleteMarkers: r,
                  Versions: i,
                  statusCode: n.statusCode,
                  headers: n.headers,
                }),
                t(null, a);
            }
          );
      }
      function Y(e, t) {
        var n = e.Query || {},
          o = e.QueryString || "",
          r = Ie.throttleOnProgress.call(this, 0, e.onProgress);
        (n["response-content-type"] = e.ResponseContentType),
          (n["response-content-language"] = e.ResponseContentLanguage),
          (n["response-expires"] = e.ResponseExpires),
          (n["response-cache-control"] = e.ResponseCacheControl),
          (n["response-content-disposition"] = e.ResponseContentDisposition),
          (n["response-content-encoding"] = e.ResponseContentEncoding),
          xe.call(
            this,
            {
              Action: "name/cos:GetObject",
              method: "GET",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              VersionId: e.VersionId,
              DataType: e.DataType,
              headers: e.Headers,
              qs: n,
              qsStr: o,
              rawBody: !0,
              onDownloadProgress: r,
            },
            function (n, o) {
              if ((r(null, !0), n)) {
                var i = n.statusCode;
                return e.Headers["If-Modified-Since"] && i && 304 === i
                  ? t(null, { NotModified: !0 })
                  : t(n);
              }
              t(null, {
                Body: o.body,
                ETag: Ie.attr(o.headers, "etag", ""),
                statusCode: o.statusCode,
                headers: o.headers,
              });
            }
          );
      }
      function Z(e, t) {
        var n = this,
          o = e.ContentLength,
          r = Ie.throttleOnProgress.call(n, o, e.onProgress),
          i = e.Headers;
        i["Cache-Control"] || i["cache-control"] || (i["Cache-Control"] = ""),
          i["Content-Type"] ||
            i["content-type"] ||
            (i["Content-Type"] = (e.Body && e.Body.type) || "");
        var a =
          e.UploadAddMetaMd5 ||
          n.options.UploadAddMetaMd5 ||
          n.options.UploadCheckContentMd5;
        Ie.getBodyMd5(
          a,
          e.Body,
          function (a) {
            a &&
              (n.options.UploadCheckContentMd5 &&
                (i["Content-MD5"] = Ie.binaryBase64(a)),
              (e.UploadAddMetaMd5 || n.options.UploadAddMetaMd5) &&
                (i["x-cos-meta-md5"] = a)),
              void 0 !== e.ContentLength &&
                (i["Content-Length"] = e.ContentLength),
              r(null, !0),
              xe.call(
                n,
                {
                  Action: "name/cos:PutObject",
                  TaskId: e.TaskId,
                  method: "PUT",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Key: e.Key,
                  headers: e.Headers,
                  qs: e.Query,
                  body: e.Body,
                  onProgress: r,
                },
                function (i, a) {
                  if (i) return r(null, !0), t(i);
                  r({ loaded: o, total: o }, !0);
                  var s = Be({
                    ForcePathStyle: n.options.ForcePathStyle,
                    protocol: n.options.Protocol,
                    domain: n.options.Domain,
                    bucket: e.Bucket,
                    region: n.options.UseAccelerate ? "accelerate" : e.Region,
                    object: e.Key,
                  });
                  (s = s.substr(s.indexOf("://") + 3)),
                    (a.Location = s),
                    (a.ETag = Ie.attr(a.headers, "etag", "")),
                    t(null, a);
                }
              );
          },
          e.onHashProgress
        );
      }
      function ee(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteObject",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: e.Headers,
            VersionId: e.VersionId,
            action: e.Recursive ? "recursive" : "",
          },
          function (e, n) {
            if (e) {
              var o = e.statusCode;
              return o && 404 === o
                ? t(null, { BucketNotFound: !0, statusCode: o })
                : t(e);
            }
            t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function te(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetObjectACL",
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: e.Headers,
            action: "acl",
          },
          function (e, n) {
            if (e) return t(e);
            var o = n.AccessControlPolicy || {},
              r = o.Owner || {},
              i = (o.AccessControlList && o.AccessControlList.Grant) || [];
            i = Ie.isArray(i) ? i : [i];
            var a = Re(o);
            delete a.GrantWrite,
              n.headers &&
                n.headers["x-cos-acl"] &&
                (a.ACL = n.headers["x-cos-acl"]),
              (a = Ie.extend(a, {
                Owner: r,
                Grants: i,
                statusCode: n.statusCode,
                headers: n.headers,
              })),
              t(null, a);
          }
        );
      }
      function ne(e, t) {
        var n = e.Headers,
          o = "";
        if (e.AccessControlPolicy) {
          var r = Ie.clone(e.AccessControlPolicy || {}),
            i = r.Grants || r.Grant;
          (i = Ie.isArray(i) ? i : [i]),
            delete r.Grant,
            delete r.Grants,
            (r.AccessControlList = { Grant: i }),
            (o = Ie.json2xml({ AccessControlPolicy: r })),
            (n["Content-Type"] = "application/xml"),
            (n["Content-MD5"] = Ie.binaryBase64(Ie.md5(o)));
        }
        Ie.each(n, function (e, t) {
          0 === t.indexOf("x-cos-grant-") && (n[t] = be(n[t]));
        }),
          xe.call(
            this,
            {
              Action: "name/cos:PutObjectACL",
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              action: "acl",
              headers: n,
              body: o,
            },
            function (e, n) {
              if (e) return t(e);
              t(null, { statusCode: n.statusCode, headers: n.headers });
            }
          );
      }
      function oe(e, t) {
        var n = e.Headers;
        (n.Origin = e.Origin),
          (n["Access-Control-Request-Method"] = e.AccessControlRequestMethod),
          (n["Access-Control-Request-Headers"] = e.AccessControlRequestHeaders),
          xe.call(
            this,
            {
              Action: "name/cos:OptionsObject",
              method: "OPTIONS",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              headers: n,
            },
            function (e, n) {
              if (e)
                return e.statusCode && 403 === e.statusCode
                  ? t(null, { OptionsForbidden: !0, statusCode: e.statusCode })
                  : t(e);
              var o = n.headers || {};
              t(null, {
                AccessControlAllowOrigin: o["access-control-allow-origin"],
                AccessControlAllowMethods: o["access-control-allow-methods"],
                AccessControlAllowHeaders: o["access-control-allow-headers"],
                AccessControlExposeHeaders: o["access-control-expose-headers"],
                AccessControlMaxAge: o["access-control-max-age"],
                statusCode: n.statusCode,
                headers: n.headers,
              });
            }
          );
      }
      function re(e, t) {
        var n = this,
          o = e.Headers;
        o["Cache-Control"] || o["cache-control"] || (o["Cache-Control"] = "");
        var r = e.CopySource || "",
          i = Ie.getSourceParams.call(this, r);
        if (!i) return void t(Ie.error(new Error("CopySource format error")));
        var a = i[1],
          s = i[3],
          c = decodeURIComponent(i[4]);
        xe.call(
          this,
          {
            Scope: [
              { action: "name/cos:GetObject", bucket: a, region: s, prefix: c },
              {
                action: "name/cos:PutObject",
                bucket: e.Bucket,
                region: e.Region,
                prefix: e.Key,
              },
            ],
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            VersionId: e.VersionId,
            headers: e.Headers,
          },
          function (o, r) {
            if (o) return t(o);
            var i = Ie.clone(r.CopyObjectResult || {}),
              a = Be({
                ForcePathStyle: n.options.ForcePathStyle,
                protocol: n.options.Protocol,
                domain: n.options.Domain,
                bucket: e.Bucket,
                region: e.Region,
                object: e.Key,
                isLocation: !0,
              });
            Ie.extend(i, {
              Location: a,
              statusCode: r.statusCode,
              headers: r.headers,
            }),
              t(null, i);
          }
        );
      }
      function ie(e, t) {
        var n = e.CopySource || "",
          o = Ie.getSourceParams.call(this, n);
        if (!o) return void t(Ie.error(new Error("CopySource format error")));
        var r = o[1],
          i = o[3],
          a = decodeURIComponent(o[4]);
        xe.call(
          this,
          {
            Scope: [
              { action: "name/cos:GetObject", bucket: r, region: i, prefix: a },
              {
                action: "name/cos:PutObject",
                bucket: e.Bucket,
                region: e.Region,
                prefix: e.Key,
              },
            ],
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            VersionId: e.VersionId,
            qs: { partNumber: e.PartNumber, uploadId: e.UploadId },
            headers: e.Headers,
          },
          function (e, n) {
            if (e) return t(e);
            var o = Ie.clone(n.CopyPartResult || {});
            Ie.extend(o, { statusCode: n.statusCode, headers: n.headers }),
              t(null, o);
          }
        );
      }
      function ae(e, t) {
        var n = e.Objects || [],
          o = e.Quiet;
        n = Ie.isArray(n) ? n : [n];
        var r = Ie.json2xml({ Delete: { Object: n, Quiet: o || !1 } }),
          i = e.Headers;
        (i["Content-Type"] = "application/xml"),
          (i["Content-MD5"] = Ie.binaryBase64(Ie.md5(r)));
        var a = Ie.map(n, function (t) {
          return {
            action: "name/cos:DeleteObject",
            bucket: e.Bucket,
            region: e.Region,
            prefix: t.Key,
          };
        });
        xe.call(
          this,
          {
            Scope: a,
            method: "POST",
            Bucket: e.Bucket,
            Region: e.Region,
            body: r,
            action: "delete",
            headers: i,
          },
          function (e, n) {
            if (e) return t(e);
            var o = n.DeleteResult || {},
              r = o.Deleted || [],
              i = o.Error || [];
            (r = Ie.isArray(r) ? r : [r]), (i = Ie.isArray(i) ? i : [i]);
            var a = Ie.clone(o);
            Ie.extend(a, {
              Error: i,
              Deleted: r,
              statusCode: n.statusCode,
              headers: n.headers,
            }),
              t(null, a);
          }
        );
      }
      function se(e, t) {
        var n = e.Headers;
        if (!e.RestoreRequest)
          return void t(Ie.error(new Error("missing param RestoreRequest")));
        var o = e.RestoreRequest || {},
          r = Ie.json2xml({ RestoreRequest: o });
        (n["Content-Type"] = "application/xml"),
          (n["Content-MD5"] = Ie.binaryBase64(Ie.md5(r))),
          xe.call(
            this,
            {
              Action: "name/cos:RestoreObject",
              method: "POST",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              VersionId: e.VersionId,
              body: r,
              action: "restore",
              headers: n,
            },
            t
          );
      }
      function ce(e, t) {
        var n = e.Tagging || {},
          o = n.TagSet || n.Tags || e.Tags || [];
        o = Ie.clone(Ie.isArray(o) ? o : [o]);
        var r = Ie.json2xml({ Tagging: { TagSet: { Tag: o } } }),
          i = e.Headers;
        (i["Content-Type"] = "application/xml"),
          (i["Content-MD5"] = Ie.binaryBase64(Ie.md5(r))),
          xe.call(
            this,
            {
              Action: "name/cos:PutObjectTagging",
              method: "PUT",
              Bucket: e.Bucket,
              Key: e.Key,
              Region: e.Region,
              body: r,
              action: "tagging",
              headers: i,
              VersionId: e.VersionId,
            },
            function (e, n) {
              return e && 204 === e.statusCode
                ? t(null, { statusCode: e.statusCode })
                : e
                ? t(e)
                : void t(null, {
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
            }
          );
      }
      function ue(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:GetObjectTagging",
            method: "GET",
            Key: e.Key,
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "tagging",
            VersionId: e.VersionId,
          },
          function (e, n) {
            if (e)
              if (
                404 !== e.statusCode ||
                !e.error ||
                ("Not Found" !== e.error && "NoSuchTagSet" !== e.error.Code)
              )
                t(e);
              else {
                var o = { Tags: [], statusCode: e.statusCode };
                e.headers && (o.headers = e.headers), t(null, o);
              }
            else {
              var r = [];
              try {
                r = n.Tagging.TagSet.Tag || [];
              } catch (e) {}
              (r = Ie.clone(Ie.isArray(r) ? r : [r])),
                t(null, {
                  Tags: r,
                  statusCode: n.statusCode,
                  headers: n.headers,
                });
            }
          }
        );
      }
      function le(e, t) {
        xe.call(
          this,
          {
            Action: "name/cos:DeleteObjectTagging",
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: e.Headers,
            action: "tagging",
            VersionId: e.VersionId,
          },
          function (e, n) {
            return e && 204 === e.statusCode
              ? t(null, { statusCode: e.statusCode })
              : e
              ? t(e)
              : void t(null, { statusCode: n.statusCode, headers: n.headers });
          }
        );
      }
      function de(e, t) {
        if (!e.SelectType)
          return t(Ie.error(new Error("missing param SelectType")));
        var n = e.SelectRequest || {},
          o = Ie.json2xml({ SelectRequest: n }),
          r = e.Headers;
        (r["Content-Type"] = "application/xml"),
          (r["Content-MD5"] = Ie.binaryBase64(Ie.md5(o))),
          xe.call(
            this,
            {
              Action: "name/cos:GetObject",
              method: "POST",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              headers: e.Headers,
              action: "select",
              qs: { "select-type": e.SelectType },
              VersionId: e.VersionId,
              body: o,
              DataType: "arraybuffer",
              rawBody: !0,
            },
            function (e, n) {
              if (e && 204 === e.statusCode)
                return t(null, { statusCode: e.statusCode });
              if (e) return t(e);
              var o = Ie.parseSelectPayload(n.body);
              t(null, {
                statusCode: n.statusCode,
                headers: n.headers,
                Body: o.body,
                Payload: o.payload,
              });
            }
          );
      }
      function fe(e, t) {
        var n = this,
          o = e.Headers;
        o["Cache-Control"] || o["cache-control"] || (o["Cache-Control"] = ""),
          o["Content-Type"] ||
            o["content-type"] ||
            (o["Content-Type"] = (e.Body && e.Body.type) || ""),
          Ie.getBodyMd5(
            e.Body && (e.UploadAddMetaMd5 || n.options.UploadAddMetaMd5),
            e.Body,
            function (o) {
              o && (e.Headers["x-cos-meta-md5"] = o),
                xe.call(
                  n,
                  {
                    Action: "name/cos:InitiateMultipartUpload",
                    method: "POST",
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    action: "uploads",
                    headers: e.Headers,
                    qs: e.Query,
                  },
                  function (e, n) {
                    return e
                      ? t(e)
                      : (n = Ie.clone(n || {})) &&
                        n.InitiateMultipartUploadResult
                      ? t(
                          null,
                          Ie.extend(n.InitiateMultipartUploadResult, {
                            statusCode: n.statusCode,
                            headers: n.headers,
                          })
                        )
                      : void t(null, n);
                  }
                );
            },
            e.onHashProgress
          );
      }
      function he(e, t) {
        var n = this;
        Ie.getFileSize("multipartUpload", e, function () {
          Ie.getBodyMd5(n.options.UploadCheckContentMd5, e.Body, function (o) {
            o && (e.Headers["Content-MD5"] = Ie.binaryBase64(o)),
              xe.call(
                n,
                {
                  Action: "name/cos:UploadPart",
                  TaskId: e.TaskId,
                  method: "PUT",
                  Bucket: e.Bucket,
                  Region: e.Region,
                  Key: e.Key,
                  qs: { partNumber: e.PartNumber, uploadId: e.UploadId },
                  headers: e.Headers,
                  onProgress: e.onProgress,
                  body: e.Body || null,
                },
                function (e, n) {
                  if (e) return t(e);
                  t(null, {
                    ETag: Ie.attr(n.headers, "etag", ""),
                    statusCode: n.statusCode,
                    headers: n.headers,
                  });
                }
              );
          });
        });
      }
      function pe(e, t) {
        for (
          var n = this, o = e.UploadId, r = e.Parts, i = 0, a = r.length;
          i < a;
          i++
        )
          (r[i].ETag && 0 === r[i].ETag.indexOf('"')) ||
            (r[i].ETag = '"' + r[i].ETag + '"');
        var s = Ie.json2xml({ CompleteMultipartUpload: { Part: r } });
        s = s.replace(/\n\s*/g, "");
        var c = e.Headers;
        (c["Content-Type"] = "application/xml"),
          (c["Content-MD5"] = Ie.binaryBase64(Ie.md5(s))),
          xe.call(
            this,
            {
              Action: "name/cos:CompleteMultipartUpload",
              method: "POST",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              qs: { uploadId: o },
              body: s,
              headers: c,
            },
            function (o, r) {
              if (o) return t(o);
              var i = Be({
                  ForcePathStyle: n.options.ForcePathStyle,
                  protocol: n.options.Protocol,
                  domain: n.options.Domain,
                  bucket: e.Bucket,
                  region: e.Region,
                  object: e.Key,
                  isLocation: !0,
                }),
                a = r.CompleteMultipartUploadResult || {};
              a.ProcessResults &&
                a &&
                a.ProcessResults &&
                ((a.UploadResult = {
                  OriginalInfo: {
                    Key: a.Key,
                    Location: i,
                    ETag: a.ETag,
                    ImageInfo: a.ImageInfo,
                  },
                  ProcessResults: a.ProcessResults,
                }),
                delete a.ImageInfo,
                delete a.ProcessResults);
              var s = Ie.extend(a, {
                Location: i,
                statusCode: r.statusCode,
                headers: r.headers,
              });
              t(null, s);
            }
          );
      }
      function ge(e, t) {
        var n = {};
        (n.delimiter = e.Delimiter),
          (n["encoding-type"] = e.EncodingType),
          (n.prefix = e.Prefix || ""),
          (n["max-uploads"] = e.MaxUploads),
          (n["key-marker"] = e.KeyMarker),
          (n["upload-id-marker"] = e.UploadIdMarker),
          (n = Ie.clearKey(n)),
          xe.call(
            this,
            {
              Action: "name/cos:ListMultipartUploads",
              ResourceKey: n.prefix,
              method: "GET",
              Bucket: e.Bucket,
              Region: e.Region,
              headers: e.Headers,
              qs: n,
              action: "uploads",
            },
            function (e, n) {
              if (e) return t(e);
              if (n && n.ListMultipartUploadsResult) {
                var o = n.ListMultipartUploadsResult.Upload || [];
                (o = Ie.isArray(o) ? o : [o]),
                  (n.ListMultipartUploadsResult.Upload = o);
              }
              var r = Ie.clone(n.ListMultipartUploadsResult || {});
              Ie.extend(r, { statusCode: n.statusCode, headers: n.headers }),
                t(null, r);
            }
          );
      }
      function me(e, t) {
        var n = {};
        (n.uploadId = e.UploadId),
          (n["encoding-type"] = e.EncodingType),
          (n["max-parts"] = e.MaxParts),
          (n["part-number-marker"] = e.PartNumberMarker),
          xe.call(
            this,
            {
              Action: "name/cos:ListParts",
              method: "GET",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              headers: e.Headers,
              qs: n,
            },
            function (e, n) {
              if (e) return t(e);
              var o = n.ListPartsResult || {},
                r = o.Part || [];
              (r = Ie.isArray(r) ? r : [r]), (o.Part = r);
              var i = Ie.clone(o);
              Ie.extend(i, { statusCode: n.statusCode, headers: n.headers }),
                t(null, i);
            }
          );
      }
      function ye(e, t) {
        var n = {};
        (n.uploadId = e.UploadId),
          xe.call(
            this,
            {
              Action: "name/cos:AbortMultipartUpload",
              method: "DELETE",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              headers: e.Headers,
              qs: n,
            },
            function (e, n) {
              if (e) return t(e);
              t(null, { statusCode: n.statusCode, headers: n.headers });
            }
          );
      }
      function Ce(e, t) {
        xe.call(
          this,
          {
            method: e.Method,
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            action: e.Action,
            headers: e.Headers,
            qs: e.Query,
            body: e.Body,
            Url: e.Url,
            rawBody: e.RawBody,
            DataType: e.DataType,
          },
          function (e, n) {
            if (e) return t(e);
            n && n.body && ((n.Body = n.body), delete n.body), t(e, n);
          }
        );
      }
      function ve(e, t) {
        var n = e.Headers;
        n["Cache-Control"] || n["cache-control"] || (n["Cache-Control"] = ""),
          n["Content-Type"] ||
            n["content-type"] ||
            (n["Content-Type"] = (e.Body && e.Body.type) || ""),
          xe.call(
            this,
            {
              Action: "name/cos:AppendObject",
              method: "POST",
              Bucket: e.Bucket,
              Region: e.Region,
              action: "append",
              Key: e.Key,
              body: e.Body,
              qs: { position: e.Position },
              headers: e.Headers,
            },
            function (e, n) {
              if (e) return t(e);
              t(null, n);
            }
          );
      }
      function ke(e) {
        var t = this;
        return Ie.getAuth({
          SecretId: e.SecretId || this.options.SecretId || "",
          SecretKey: e.SecretKey || this.options.SecretKey || "",
          Bucket: e.Bucket,
          Region: e.Region,
          Method: e.Method,
          Key: e.Key,
          Query: e.Query,
          Headers: e.Headers,
          Expires: e.Expires,
          UseRawKey: t.options.UseRawKey,
          SystemClockOffset: t.options.SystemClockOffset,
        });
      }
      function Se(e, t) {
        var n = this,
          o = Be({
            ForcePathStyle: n.options.ForcePathStyle,
            protocol: e.Protocol || n.options.Protocol,
            domain: e.Domain || n.options.Domain,
            bucket: e.Bucket,
            region: e.Region,
            object: e.Key,
          }),
          r = "";
        e.Query && (r += Ie.obj2str(e.Query)),
          e.QueryString && (r += (r ? "&" : "") + e.QueryString);
        var i = o;
        if (void 0 !== e.Sign && !e.Sign)
          return r && (i += "?" + r), t(null, { Url: i }), i;
        var a = Oe.call(this, { Bucket: e.Bucket, Region: e.Region, Url: o }),
          s = Te.call(
            this,
            {
              Action:
                "PUT" === (e.Method || "").toUpperCase()
                  ? "name/cos:PutObject"
                  : "name/cos:GetObject",
              Bucket: e.Bucket || "",
              Region: e.Region || "",
              Method: e.Method || "get",
              Key: e.Key,
              Expires: e.Expires,
              Headers: e.Headers,
              Query: e.Query,
              SignHost: a,
            },
            function (e, n) {
              if (t) {
                if (e) return void t(e);
                var i = o;
                (i +=
                  "?" +
                  (n.Authorization.indexOf("q-signature") > -1
                    ? (function (e) {
                        var t = e.match(/q-url-param-list.*?(?=&)/g)[0],
                          n =
                            "q-url-param-list=" +
                            encodeURIComponent(
                              t.replace(/q-url-param-list=/, "")
                            ).toLowerCase(),
                          o = new RegExp(t, "g");
                        return e.replace(o, n);
                      })(n.Authorization)
                    : "sign=" + encodeURIComponent(n.Authorization))),
                  n.SecurityToken &&
                    (i += "&x-cos-security-token=" + n.SecurityToken),
                  n.ClientIP && (i += "&clientIP=" + n.ClientIP),
                  n.ClientUA && (i += "&clientUA=" + n.ClientUA),
                  n.Token && (i += "&token=" + n.Token),
                  r && (i += "&" + r),
                  setTimeout(function () {
                    t(null, { Url: i });
                  });
              }
            }
          );
        return (
          s
            ? ((i +=
                "?" +
                s.Authorization +
                (s.SecurityToken
                  ? "&x-cos-security-token=" + s.SecurityToken
                  : "")),
              r && (i += "&" + r))
            : r && (i += "?" + r),
          i
        );
      }
      function Re(e) {
        var t = {
            GrantFullControl: [],
            GrantWrite: [],
            GrantRead: [],
            GrantReadAcp: [],
            GrantWriteAcp: [],
            ACL: "",
          },
          n = {
            FULL_CONTROL: "GrantFullControl",
            WRITE: "GrantWrite",
            READ: "GrantRead",
            READ_ACP: "GrantReadAcp",
            WRITE_ACP: "GrantWriteAcp",
          },
          o = (e && e.AccessControlList) || {},
          r = o.Grant;
        r && (r = Ie.isArray(r) ? r : [r]);
        var i = { READ: 0, WRITE: 0, FULL_CONTROL: 0 };
        return (
          r &&
            r.length &&
            Ie.each(r, function (o) {
              "qcs::cam::anyone:anyone" === o.Grantee.ID ||
              "http://cam.qcloud.com/groups/global/AllUsers" === o.Grantee.URI
                ? (i[o.Permission] = 1)
                : o.Grantee.ID !== e.Owner.ID &&
                  t[n[o.Permission]].push('id="' + o.Grantee.ID + '"');
            }),
          i.FULL_CONTROL || (i.WRITE && i.READ)
            ? (t.ACL = "public-read-write")
            : i.READ
            ? (t.ACL = "public-read")
            : (t.ACL = "private"),
          Ie.each(n, function (e) {
            t[e] = be(t[e].join(","));
          }),
          t
        );
      }
      function be(e) {
        var t,
          n,
          o = e.split(","),
          r = {};
        for (t = 0; t < o.length; )
          (n = o[t].trim()),
            r[n] ? o.splice(t, 1) : ((r[n] = !0), (o[t] = n), t++);
        return o.join(",");
      }
      function Be(e) {
        var t = e.region || "",
          n = e.bucket || "",
          o = n.substr(0, n.lastIndexOf("-")),
          r = n.substr(n.lastIndexOf("-") + 1),
          i = e.domain,
          a = e.object;
        "function" == typeof i && (i = i({ Bucket: n, Region: t }));
        var s =
          e.protocol ||
          (Ie.isBrowser && "http:" === location.protocol ? "http:" : "https:");
        i ||
          ((i =
            [
              "cn-south",
              "cn-south-2",
              "cn-north",
              "cn-east",
              "cn-southwest",
              "sg",
            ].indexOf(t) > -1
              ? "{Region}.myqcloud.com"
              : "cos.{Region}.myqcloud.com"),
          e.ForcePathStyle || (i = "{Bucket}." + i)),
          (i = i
            .replace(/\{\{AppId\}\}/gi, r)
            .replace(/\{\{Bucket\}\}/gi, o)
            .replace(/\{\{Region\}\}/gi, t)
            .replace(/\{\{.*?\}\}/gi, "")),
          (i = i
            .replace(/\{AppId\}/gi, r)
            .replace(/\{BucketName\}/gi, o)
            .replace(/\{Bucket\}/gi, n)
            .replace(/\{Region\}/gi, t)
            .replace(/\{.*?\}/gi, "")),
          /^[a-zA-Z]+:\/\//.test(i) || (i = s + "//" + i),
          "/" === i.slice(-1) && (i = i.slice(0, -1));
        var c = i;
        return (
          e.ForcePathStyle && (c += "/" + n),
          (c += "/"),
          a && (c += Ie.camSafeUrlEncode(a).replace(/%2F/g, "/")),
          e.isLocation && (c = c.replace(/^https?:\/\//, "")),
          c
        );
      }
      function Te(e, t) {
        var n = Ie.clone(e.Headers),
          o = "";
        Ie.each(n, function (e, t) {
          ("" === e ||
            ["content-type", "cache-control", "expires"].indexOf(
              t.toLowerCase()
            ) > -1) &&
            delete n[t],
            "host" === t.toLowerCase() && (o = e);
        }),
          !o && e.SignHost && (n.Host = e.SignHost);
        var r = !1,
          i = function (e, n) {
            r ||
              ((r = !0),
              n &&
                n.XCosSecurityToken &&
                !n.SecurityToken &&
                ((n = Ie.clone(n)),
                (n.SecurityToken = n.XCosSecurityToken),
                delete n.XCosSecurityToken),
              t && t(e, n));
          },
          a = this,
          s = e.Bucket || "",
          c = e.Region || "",
          u = e.Key || "";
        a.options.ForcePathStyle && s && (u = s + "/" + u);
        var l = "/" + u,
          d = {},
          f = e.Scope;
        if (!f) {
          var h = e.Action || "",
            p = e.ResourceKey || e.Key || "";
          f = e.Scope || [{ action: h, bucket: s, region: c, prefix: p }];
        }
        var g = Ie.md5(JSON.stringify(f));
        (a._StsCache = a._StsCache || []),
          (function () {
            var e, t;
            for (e = a._StsCache.length - 1; e >= 0; e--) {
              t = a._StsCache[e];
              var n =
                Math.round(Ie.getSkewTime(a.options.SystemClockOffset) / 1e3) +
                30;
              if ((t.StartTime && n < t.StartTime) || n >= t.ExpiredTime)
                a._StsCache.splice(e, 1);
              else if (!t.ScopeLimit || (t.ScopeLimit && t.ScopeKey === g)) {
                d = t;
                break;
              }
            }
          })();
        var m = function () {
            var t =
                d.StartTime && d.ExpiredTime
                  ? d.StartTime + ";" + d.ExpiredTime
                  : "",
              o = Ie.getAuth({
                SecretId: d.TmpSecretId,
                SecretKey: d.TmpSecretKey,
                Method: e.Method,
                Pathname: l,
                Query: e.Query,
                Headers: n,
                Expires: e.Expires,
                UseRawKey: a.options.UseRawKey,
                SystemClockOffset: a.options.SystemClockOffset,
                KeyTime: t,
              }),
              r = {
                Authorization: o,
                SecurityToken: d.SecurityToken || d.XCosSecurityToken || "",
                Token: d.Token || "",
                ClientIP: d.ClientIP || "",
                ClientUA: d.ClientUA || "",
              };
            i(null, r);
          },
          y = function (e) {
            if (e.Authorization) {
              var t = !1,
                n = e.Authorization;
              if (n)
                if (n.indexOf(" ") > -1) t = !1;
                else if (
                  n.indexOf("q-sign-algorithm=") > -1 &&
                  n.indexOf("q-ak=") > -1 &&
                  n.indexOf("q-sign-time=") > -1 &&
                  n.indexOf("q-key-time=") > -1 &&
                  n.indexOf("q-url-param-list=") > -1
                )
                  t = !0;
                else
                  try {
                    (n = atob(n)),
                      n.indexOf("a=") > -1 &&
                        n.indexOf("k=") > -1 &&
                        n.indexOf("t=") > -1 &&
                        n.indexOf("r=") > -1 &&
                        n.indexOf("b=") > -1 &&
                        (t = !0);
                  } catch (e) {}
              if (!t)
                return Ie.error(
                  new Error("getAuthorization callback params format error")
                );
            } else {
              if (!e.TmpSecretId)
                return Ie.error(
                  new Error(
                    'getAuthorization callback params missing "TmpSecretId"'
                  )
                );
              if (!e.TmpSecretKey)
                return Ie.error(
                  new Error(
                    'getAuthorization callback params missing "TmpSecretKey"'
                  )
                );
              if (!e.SecurityToken && !e.XCosSecurityToken)
                return Ie.error(
                  new Error(
                    'getAuthorization callback params missing "SecurityToken"'
                  )
                );
              if (!e.ExpiredTime)
                return Ie.error(
                  new Error(
                    'getAuthorization callback params missing "ExpiredTime"'
                  )
                );
              if (e.ExpiredTime && 10 !== e.ExpiredTime.toString().length)
                return Ie.error(
                  new Error(
                    'getAuthorization callback params "ExpiredTime" should be 10 digits'
                  )
                );
              if (e.StartTime && 10 !== e.StartTime.toString().length)
                return Ie.error(
                  new Error(
                    'getAuthorization callback params "StartTime" should be 10 StartTime'
                  )
                );
            }
            return !1;
          };
        if (
          d.ExpiredTime &&
          d.ExpiredTime - Ie.getSkewTime(a.options.SystemClockOffset) / 1e3 > 60
        )
          m();
        else if (a.options.getAuthorization)
          a.options.getAuthorization.call(
            a,
            {
              Bucket: s,
              Region: c,
              Method: e.Method,
              Key: u,
              Pathname: l,
              Query: e.Query,
              Headers: n,
              Scope: f,
              SystemClockOffset: a.options.SystemClockOffset,
            },
            function (e) {
              "string" == typeof e && (e = { Authorization: e });
              var t = y(e);
              if (t) return i(t);
              e.Authorization
                ? i(null, e)
                : ((d = e || {}),
                  (d.Scope = f),
                  (d.ScopeKey = g),
                  a._StsCache.push(d),
                  m());
            }
          );
        else {
          if (!a.options.getSTS)
            return (function () {
              var t = Ie.getAuth({
                  SecretId: e.SecretId || a.options.SecretId,
                  SecretKey: e.SecretKey || a.options.SecretKey,
                  Method: e.Method,
                  Pathname: l,
                  Query: e.Query,
                  Headers: n,
                  Expires: e.Expires,
                  UseRawKey: a.options.UseRawKey,
                  SystemClockOffset: a.options.SystemClockOffset,
                }),
                o = {
                  Authorization: t,
                  SecurityToken:
                    a.options.SecurityToken || a.options.XCosSecurityToken,
                };
              return i(null, o), o;
            })();
          a.options.getSTS.call(a, { Bucket: s, Region: c }, function (e) {
            (d = e || {}),
              (d.Scope = f),
              (d.ScopeKey = g),
              d.TmpSecretId || (d.TmpSecretId = d.SecretId),
              d.TmpSecretKey || (d.TmpSecretKey = d.SecretKey);
            var t = y(d);
            if (t) return i(t);
            a._StsCache.push(d), m();
          });
        }
        return "";
      }
      function Ae(e) {
        var t = !1,
          n = !1,
          o =
            (e.headers && (e.headers.date || e.headers.Date)) ||
            (e.error && e.error.ServerTime);
        try {
          var r = e.error.Code,
            i = e.error.Message;
          ("RequestTimeTooSkewed" === r ||
            ("AccessDenied" === r && "Request has expired" === i)) &&
            (n = !0);
        } catch (e) {}
        if (e)
          if (n && o) {
            var a = Date.parse(o);
            this.options.CorrectClockSkew &&
              Math.abs(Ie.getSkewTime(this.options.SystemClockOffset) - a) >=
                3e4 &&
              (console.error("error: Local time is too skewed."),
              (this.options.SystemClockOffset = a - Date.now()),
              (t = !0));
          } else 5 === Math.floor(e.statusCode / 100) && (t = !0);
        return t;
      }
      function xe(e, t) {
        var n = this;
        !e.headers && (e.headers = {}),
          !e.qs && (e.qs = {}),
          e.VersionId && (e.qs.versionId = e.VersionId),
          (e.qs = Ie.clearKey(e.qs)),
          e.headers && (e.headers = Ie.clearKey(e.headers)),
          e.qs && (e.qs = Ie.clearKey(e.qs));
        var o = Ie.clone(e.qs);
        e.action && (o[e.action] = "");
        var r = e.url || e.Url,
          i =
            e.SignHost ||
            Oe.call(this, { Bucket: e.Bucket, Region: e.Region, Url: r }),
          a = function (r) {
            var s = n.options.SystemClockOffset;
            Te.call(
              n,
              {
                Bucket: e.Bucket || "",
                Region: e.Region || "",
                Method: e.method,
                Key: e.Key,
                Query: o,
                Headers: e.headers,
                SignHost: i,
                Action: e.Action,
                ResourceKey: e.ResourceKey,
                Scope: e.Scope,
              },
              function (o, i) {
                if (o) return void t(o);
                (e.AuthData = i),
                  Ee.call(n, e, function (o, i) {
                    o &&
                    r < 2 &&
                    (s !== n.options.SystemClockOffset || Ae.call(n, o))
                      ? (e.headers &&
                          (delete e.headers.Authorization,
                          delete e.headers.token,
                          delete e.headers.clientIP,
                          delete e.headers.clientUA,
                          e.headers["x-cos-security-token"] &&
                            delete e.headers["x-cos-security-token"],
                          e.headers["x-ci-security-token"] &&
                            delete e.headers["x-ci-security-token"]),
                        a(r + 1))
                      : t(o, i);
                  });
              }
            );
          };
        a(1);
      }
      function Ee(e, t) {
        var n = this,
          o = e.TaskId;
        if (!o || n._isRunningTask(o)) {
          var r = e.Bucket,
            i = e.Region,
            a = e.Key,
            s = e.method || "GET",
            c = e.Url || e.url,
            u = e.body,
            l = e.rawBody;
          n.options.UseAccelerate && (i = "accelerate"),
            (c =
              c ||
              Be({
                ForcePathStyle: n.options.ForcePathStyle,
                protocol: n.options.Protocol,
                domain: n.options.Domain,
                bucket: r,
                region: i,
                object: a,
              })),
            e.action && (c = c + "?" + e.action),
            e.qsStr &&
              (c = c.indexOf("?") > -1 ? c + "&" + e.qsStr : c + "?" + e.qsStr);
          var d = { method: s, url: c, headers: e.headers, qs: e.qs, body: u },
            f = "x-cos-security-token";
          if (
            (Ie.isCIHost(c) && (f = "x-ci-security-token"),
            (d.headers.Authorization = e.AuthData.Authorization),
            e.AuthData.Token && (d.headers.token = e.AuthData.Token),
            e.AuthData.ClientIP && (d.headers.clientIP = e.AuthData.ClientIP),
            e.AuthData.ClientUA && (d.headers.clientUA = e.AuthData.ClientUA),
            e.AuthData.SecurityToken &&
              (d.headers[f] = e.AuthData.SecurityToken),
            d.headers && (d.headers = Ie.clearKey(d.headers)),
            (d = Ie.clearKey(d)),
            e.onProgress && "function" == typeof e.onProgress)
          ) {
            var h = (u && (u.size || u.length)) || 0;
            d.onProgress = function (t) {
              if (!o || n._isRunningTask(o)) {
                var r = t ? t.loaded : 0;
                e.onProgress({ loaded: r, total: h });
              }
            };
          }
          e.onDownloadProgress && (d.onDownloadProgress = e.onDownloadProgress),
            e.DataType && (d.dataType = e.DataType),
            this.options.Timeout && (d.timeout = this.options.Timeout),
            n.options.ForcePathStyle &&
              (d.pathStyle = n.options.ForcePathStyle),
            n.emit("before-send", d);
          var p = (n.options.Request || _e)(d, function (e) {
              if ("abort" !== e.error) {
                var r = {
                  options: d,
                  error: s,
                  statusCode: (a && a.statusCode) || 0,
                  headers: (a && a.headers) || {},
                  body: c,
                };
                n.emit("after-receive", r),
                  (s = r.error),
                  (c = r.body),
                  (a = { statusCode: r.statusCode, headers: r.headers }),
                  n.emit("after-receive", e);
                var i,
                  a = {
                    statusCode: e.statusCode,
                    statusMessage: e.statusMessage,
                    headers: e.headers,
                  },
                  s = e.error,
                  c = e.body,
                  u = function (e, r) {
                    if ((o && n.off("inner-kill-task", g), !i)) {
                      i = !0;
                      var s = {};
                      a && a.statusCode && (s.statusCode = a.statusCode),
                        a && a.headers && (s.headers = a.headers),
                        e
                          ? ((e = Ie.extend(e || {}, s)), t(e, null))
                          : ((r = Ie.extend(r || {}, s)), t(null, r)),
                        (p = null);
                    }
                  };
                if (s) return u(Ie.error(s));
                var f = a.statusCode,
                  h = 2 === Math.floor(f / 100);
                if (l && h) return u(null, { body: c });
                var m;
                try {
                  m =
                    (c &&
                      c.indexOf("<") > -1 &&
                      c.indexOf(">") > -1 &&
                      Ie.xml2json(c)) ||
                    {};
                } catch (e) {
                  m = {};
                }
                var y = m && m.Error;
                h
                  ? u(null, m)
                  : y
                  ? u(
                      Ie.error(new Error(y.Message), { code: y.Code, error: y })
                    )
                  : f
                  ? u(Ie.error(new Error(a.statusMessage), { code: "" + f }))
                  : f && u(Ie.error(new Error("statusCode error")));
              }
            }),
            g = function (e) {
              e.TaskId === o &&
                (p && p.abort && p.abort(), n.off("inner-kill-task", g));
            };
          o && n.on("inner-kill-task", g);
        }
      }
      function we(e, t, n) {
        Ie.each(["Cors", "Acl"], function (o) {
          if (e.slice(-o.length) === o) {
            var r = e.slice(0, -o.length) + o.toUpperCase(),
              i = Ie.apiWrapper(e, t),
              a = !1;
            n[r] = function () {
              !a &&
                console.warn(
                  "warning: cos." +
                    r +
                    " has been deprecated. Please Use cos." +
                    e +
                    " instead."
                ),
                (a = !0),
                i.apply(this, arguments);
            };
          }
        });
      }
      var _e = n(17),
        Ie = n(0),
        Oe = function (e) {
          if (!e.Bucket || !e.Region) return "";
          var t =
              e.Url ||
              Be({
                ForcePathStyle: this.options.ForcePathStyle,
                protocol: this.options.Protocol,
                domain: this.options.Domain,
                bucket: e.Bucket,
                region: this.options.UseAccelerate ? "accelerate" : e.Region,
              }),
            n = t.replace(/^https?:\/\/([^/]+)(\/.*)?$/, "$1");
          return new RegExp(
            "^([a-z\\d-]+-\\d+\\.)?(cos|cosv6|ci|pic)\\.([a-z\\d-]+)\\.myqcloud\\.com$"
          ).test(n)
            ? n
            : "";
        },
        De = {
          getService: o,
          putBucket: r,
          headBucket: i,
          getBucket: a,
          deleteBucket: s,
          putBucketAcl: c,
          getBucketAcl: u,
          putBucketCors: l,
          getBucketCors: d,
          deleteBucketCors: f,
          getBucketLocation: h,
          getBucketPolicy: g,
          putBucketPolicy: p,
          deleteBucketPolicy: m,
          putBucketTagging: y,
          getBucketTagging: C,
          deleteBucketTagging: v,
          putBucketLifecycle: k,
          getBucketLifecycle: S,
          deleteBucketLifecycle: R,
          putBucketVersioning: b,
          getBucketVersioning: B,
          putBucketReplication: T,
          getBucketReplication: A,
          deleteBucketReplication: x,
          putBucketWebsite: E,
          getBucketWebsite: w,
          deleteBucketWebsite: _,
          putBucketReferer: I,
          getBucketReferer: O,
          putBucketDomain: D,
          getBucketDomain: P,
          deleteBucketDomain: N,
          putBucketOrigin: U,
          getBucketOrigin: M,
          deleteBucketOrigin: H,
          putBucketLogging: L,
          getBucketLogging: F,
          putBucketInventory: K,
          getBucketInventory: j,
          listBucketInventory: z,
          deleteBucketInventory: q,
          putBucketAccelerate: G,
          getBucketAccelerate: V,
          putBucketEncryption: X,
          getBucketEncryption: W,
          deleteBucketEncryption: $,
          getObject: Y,
          headObject: Q,
          listObjectVersions: J,
          putObject: Z,
          deleteObject: ee,
          getObjectAcl: te,
          putObjectAcl: ne,
          optionsObject: oe,
          putObjectCopy: re,
          deleteMultipleObject: ae,
          restoreObject: se,
          putObjectTagging: ce,
          getObjectTagging: ue,
          deleteObjectTagging: le,
          selectObjectContent: de,
          appendObject: ve,
          uploadPartCopy: ie,
          multipartInit: fe,
          multipartUpload: he,
          multipartComplete: pe,
          multipartList: ge,
          multipartListPart: me,
          multipartAbort: ye,
          request: Ce,
          getObjectUrl: Se,
          getAuth: ke,
        };
      e.exports.init = function (e, t) {
        t.transferToTaskMethod(De, "putObject"),
          Ie.each(De, function (t, n) {
            (e.prototype[n] = Ie.apiWrapper(n, t)), we(n, t, e.prototype);
          });
      };
    },
    function (e, t) {
      var n = function (e) {
          switch (typeof e) {
            case "string":
              return e;
            case "boolean":
              return e ? "true" : "false";
            case "number":
              return isFinite(e) ? e : "";
            default:
              return "";
          }
        },
        o = function (e, t, o, r) {
          return (
            (t = t || "&"),
            (o = o || "="),
            null === e && (e = void 0),
            "object" == typeof e
              ? Object.keys(e)
                  .map(function (r) {
                    var i = encodeURIComponent(n(r)) + o;
                    return Array.isArray(e[r])
                      ? e[r]
                          .map(function (e) {
                            return i + encodeURIComponent(n(e));
                          })
                          .join(t)
                      : i + encodeURIComponent(n(e[r]));
                  })
                  .filter(Boolean)
                  .join(t)
              : r
              ? encodeURIComponent(n(r)) + o + encodeURIComponent(n(e))
              : ""
          );
        },
        r = function (e, t, n) {
          var o = {};
          return (
            t
              .getAllResponseHeaders()
              .trim()
              .split("\n")
              .forEach(function (e) {
                if (e) {
                  var t = e.indexOf(":"),
                    n = e.substr(0, t).trim().toLowerCase(),
                    r = e.substr(t + 1).trim();
                  o[n] = r;
                }
              }),
            {
              error: e,
              statusCode: t.status,
              statusMessage: t.statusText,
              headers: o,
              body: n,
            }
          );
        },
        i = function (e, t) {
          return t || "text" !== t ? e.response : e.responseText;
        },
        a = function (e, t) {
          var n = (e.method || "GET").toUpperCase(),
            a = e.url;
          if (e.qs) {
            var s = o(e.qs);
            s && (a += (-1 === a.indexOf("?") ? "?" : "&") + s);
          }
          var c = new XMLHttpRequest();
          if (
            (c.open(n, a, !0),
            (c.responseType = e.dataType || "text"),
            e.xhrFields)
          )
            for (var u in e.xhrFields) c[u] = e.xhrFields[u];
          var l = e.headers;
          if (l)
            for (var d in l)
              l.hasOwnProperty(d) &&
                "content-length" !== d.toLowerCase() &&
                "user-agent" !== d.toLowerCase() &&
                "origin" !== d.toLowerCase() &&
                "host" !== d.toLowerCase() &&
                c.setRequestHeader(d, l[d]);
          return (
            e.onProgress && c.upload && (c.upload.onprogress = e.onProgress),
            e.onDownloadProgress && (c.onprogress = e.onDownloadProgress),
            e.timeout && (c.timeout = e.timeout),
            (c.ontimeout = function (e) {
              var n = new Error("timeout");
              t(r(n, c));
            }),
            (c.onload = function () {
              t(r(null, c, i(c, e.dataType)));
            }),
            (c.onerror = function (n) {
              var o = i(c, e.dataType);
              if (o) t(r(null, c, o));
              else {
                var a = c.statusText;
                a ||
                  0 !== c.status ||
                  (a = new Error("CORS blocked or network error")),
                  t(r(a, c, o));
              }
            }),
            c.send(e.body || ""),
            c
          );
        };
      e.exports = a;
    },
    function (e, t, n) {
      function o(e, t) {
        var n,
          o,
          i = this,
          a = new C(),
          c = e.TaskId,
          l = e.Bucket,
          d = e.Region,
          f = e.Key,
          h = e.Body,
          p = e.ChunkSize || e.SliceSize || i.options.ChunkSize,
          g = e.AsyncLimit,
          y = e.StorageClass,
          k = e.ServerSideEncryption,
          S = e.onHashProgress;
        a.on("error", function (n) {
          if (i._isRunningTask(c))
            return (n.UploadId = e.UploadData.UploadId || ""), t(n);
        }),
          a.on("upload_complete", function (n) {
            var o = v.extend({ UploadId: e.UploadData.UploadId || "" }, n);
            t(null, o);
          }),
          a.on("upload_slice_complete", function (t) {
            var r = {};
            v.each(e.Headers, function (e, t) {
              var n = t.toLowerCase();
              (0 !== n.indexOf("x-cos-meta-") && "pic-operations" !== n) ||
                (r[t] = e);
            }),
              u.call(
                i,
                {
                  Bucket: l,
                  Region: d,
                  Key: f,
                  UploadId: t.UploadId,
                  SliceList: t.SliceList,
                  Headers: r,
                },
                function (e, r) {
                  if (i._isRunningTask(c)) {
                    if ((m.removeUsing(t.UploadId), e))
                      return o(null, !0), a.emit("error", e);
                    m.removeUploadId.call(i, t.UploadId),
                      o({ loaded: n, total: n }, !0),
                      a.emit("upload_complete", r);
                  }
                }
              );
          }),
          a.on("get_upload_data_finish", function (t) {
            var r = m.getFileId(h, e.ChunkSize, l, f);
            r &&
              m.saveUploadId.call(
                i,
                r,
                t.UploadId,
                i.options.UploadIdCacheLimit
              ),
              m.setUsing(t.UploadId),
              o(null, !0),
              s.call(
                i,
                {
                  TaskId: c,
                  Bucket: l,
                  Region: d,
                  Key: f,
                  Body: h,
                  FileSize: n,
                  SliceSize: p,
                  AsyncLimit: g,
                  ServerSideEncryption: k,
                  UploadData: t,
                  Headers: e.Headers,
                  onProgress: o,
                },
                function (e, t) {
                  if (i._isRunningTask(c))
                    return e
                      ? (o(null, !0), a.emit("error", e))
                      : void a.emit("upload_slice_complete", t);
                }
              );
          }),
          a.on("get_file_size_finish", function () {
            if (
              ((o = v.throttleOnProgress.call(i, n, e.onProgress)),
              e.UploadData.UploadId)
            )
              a.emit("get_upload_data_finish", e.UploadData);
            else {
              var t = v.extend(
                {
                  TaskId: c,
                  Bucket: l,
                  Region: d,
                  Key: f,
                  Headers: e.Headers,
                  StorageClass: y,
                  Body: h,
                  FileSize: n,
                  SliceSize: p,
                  onHashProgress: S,
                },
                e
              );
              r.call(i, t, function (t, n) {
                if (i._isRunningTask(c)) {
                  if (t) return a.emit("error", t);
                  (e.UploadData.UploadId = n.UploadId),
                    (e.UploadData.PartList = n.PartList),
                    a.emit("get_upload_data_finish", e.UploadData);
                }
              });
            }
          }),
          (n = e.ContentLength),
          delete e.ContentLength,
          !e.Headers && (e.Headers = {}),
          v.each(e.Headers, function (t, n) {
            "content-length" === n.toLowerCase() && delete e.Headers[n];
          }),
          (function () {
            for (
              var t = [
                  1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120,
                ],
                o = 1048576,
                r = 0;
              r < t.length &&
              ((o = 1024 * t[r] * 1024), !(n / o <= i.options.MaxPartNumber));
              r++
            );
            e.ChunkSize = e.SliceSize = p = Math.max(p, o);
          })(),
          0 === n
            ? ((e.Body = ""),
              (e.ContentLength = 0),
              (e.SkipTask = !0),
              i.putObject(e, t))
            : a.emit("get_file_size_finish");
      }
      function r(e, t) {
        var n = e.TaskId,
          o = e.Bucket,
          r = e.Region,
          s = e.Key,
          c = e.StorageClass,
          u = this,
          l = {},
          d = e.FileSize,
          f = e.SliceSize,
          h = Math.ceil(d / f),
          p = 0,
          g = 0,
          k = v.throttleOnProgress.call(u, d, e.onHashProgress),
          S = function (t, n) {
            var o = f * (t - 1),
              r = Math.min(o + f, d),
              i = r - o;
            l[t]
              ? n(null, { PartNumber: t, ETag: l[t], Size: i })
              : v.fileSlice(e.Body, o, r, !1, function (e) {
                  v.getFileMd5(e, function (e, o) {
                    if (e) return n(v.error(e));
                    var r = '"' + o + '"';
                    (l[t] = r),
                      (p += 1),
                      (g += i),
                      k({ loaded: g, total: d }),
                      n(null, { PartNumber: t, ETag: r, Size: i });
                  });
                });
          },
          R = function (e, t) {
            var n = e.length;
            if (0 === n) return t(null, !0);
            if (n > h) return t(null, !1);
            if (n > 1) {
              if (Math.max(e[0].Size, e[1].Size) !== f) return t(null, !1);
            }
            var o = function (r) {
              if (r < n) {
                var i = e[r];
                S(i.PartNumber, function (e, n) {
                  n && n.ETag === i.ETag && n.Size === i.Size
                    ? o(r + 1)
                    : t(null, !1);
                });
              } else t(null, !0);
            };
            o(0);
          },
          b = new C();
        b.on("error", function (e) {
          if (u._isRunningTask(n)) return t(e);
        }),
          b.on("upload_id_available", function (e) {
            var n = {},
              o = [];
            v.each(e.PartList, function (e) {
              n[e.PartNumber] = e;
            });
            for (var r = 1; r <= h; r++) {
              var i = n[r];
              i
                ? ((i.PartNumber = r), (i.Uploaded = !0))
                : (i = { PartNumber: r, ETag: null, Uploaded: !1 }),
                o.push(i);
            }
            (e.PartList = o), t(null, e);
          }),
          b.on("no_available_upload_id", function () {
            if (u._isRunningTask(n)) {
              var i = v.extend(
                  {
                    Bucket: o,
                    Region: r,
                    Key: s,
                    Query: v.clone(e.Query),
                    StorageClass: c,
                    Body: e.Body,
                  },
                  e
                ),
                a = v.clone(e.Headers);
              delete a["x-cos-mime-limit"],
                (i.Headers = a),
                u.multipartInit(i, function (e, o) {
                  if (u._isRunningTask(n)) {
                    if (e) return b.emit("error", e);
                    var r = o.UploadId;
                    if (!r) return t(v.error(new Error("no such upload id")));
                    b.emit("upload_id_available", {
                      UploadId: r,
                      PartList: [],
                    });
                  }
                });
            }
          }),
          b.on("has_and_check_upload_id", function (e) {
            (e = e.reverse()),
              y.eachLimit(
                e,
                1,
                function (e, t) {
                  if (u._isRunningTask(n))
                    return m.using[e]
                      ? void t()
                      : void a.call(
                          u,
                          { Bucket: o, Region: r, Key: s, UploadId: e },
                          function (o, r) {
                            if (u._isRunningTask(n)) {
                              if (o)
                                return m.removeUsing(e), b.emit("error", o);
                              var i = r.PartList;
                              i.forEach(function (e) {
                                (e.PartNumber *= 1),
                                  (e.Size *= 1),
                                  (e.ETag = e.ETag || "");
                              }),
                                R(i, function (o, r) {
                                  if (u._isRunningTask(n))
                                    return o
                                      ? b.emit("error", o)
                                      : void (r
                                          ? t({ UploadId: e, PartList: i })
                                          : t());
                                });
                            }
                          }
                        );
                },
                function (e) {
                  u._isRunningTask(n) &&
                    (k(null, !0),
                    e && e.UploadId
                      ? b.emit("upload_id_available", e)
                      : b.emit("no_available_upload_id"));
                }
              );
          }),
          b.on("seek_local_avail_upload_id", function (t) {
            var i = m.getFileId(e.Body, e.ChunkSize, o, s),
              c = m.getUploadIdList.call(u, i);
            if (!i || !c) return void b.emit("has_and_check_upload_id", t);
            var l = function (e) {
              if (e >= c.length)
                return void b.emit("has_and_check_upload_id", t);
              var i = c[e];
              return v.isInArray(t, i)
                ? m.using[i]
                  ? void l(e + 1)
                  : void a.call(
                      u,
                      { Bucket: o, Region: r, Key: s, UploadId: i },
                      function (t, o) {
                        u._isRunningTask(n) &&
                          (t
                            ? (m.removeUploadId.call(u, i), l(e + 1))
                            : b.emit("upload_id_available", {
                                UploadId: i,
                                PartList: o.PartList,
                              }));
                      }
                    )
                : (m.removeUploadId.call(u, i), void l(e + 1));
            };
            l(0);
          }),
          b.on("get_remote_upload_id_list", function () {
            i.call(u, { Bucket: o, Region: r, Key: s }, function (t, r) {
              if (u._isRunningTask(n)) {
                if (t) return b.emit("error", t);
                var i = v
                  .filter(r.UploadList, function (e) {
                    return (
                      e.Key === s &&
                      (!c || e.StorageClass.toUpperCase() === c.toUpperCase())
                    );
                  })
                  .reverse()
                  .map(function (e) {
                    return e.UploadId || e.UploadID;
                  });
                if (i.length) b.emit("seek_local_avail_upload_id", i);
                else {
                  var a,
                    l = m.getFileId(e.Body, e.ChunkSize, o, s);
                  l &&
                    (a = m.getUploadIdList.call(u, l)) &&
                    v.each(a, function (e) {
                      m.removeUploadId.call(u, e);
                    }),
                    b.emit("no_available_upload_id");
                }
              }
            });
          }),
          b.emit("get_remote_upload_id_list");
      }
      function i(e, t) {
        var n = this,
          o = [],
          r = { Bucket: e.Bucket, Region: e.Region, Prefix: e.Key },
          i = function () {
            n.multipartList(r, function (e, n) {
              if (e) return t(e);
              o.push.apply(o, n.Upload || []),
                "true" === n.IsTruncated
                  ? ((r.KeyMarker = n.NextKeyMarker),
                    (r.UploadIdMarker = n.NextUploadIdMarker),
                    i())
                  : t(null, { UploadList: o });
            });
          };
        i();
      }
      function a(e, t) {
        var n = this,
          o = [],
          r = {
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            UploadId: e.UploadId,
          },
          i = function () {
            n.multipartListPart(r, function (e, n) {
              if (e) return t(e);
              o.push.apply(o, n.Part || []),
                "true" === n.IsTruncated
                  ? ((r.PartNumberMarker = n.NextPartNumberMarker), i())
                  : t(null, { PartList: o });
            });
          };
        i();
      }
      function s(e, t) {
        var n = this,
          o = e.TaskId,
          r = e.Bucket,
          i = e.Region,
          a = e.Key,
          s = e.UploadData,
          u = e.FileSize,
          l = e.SliceSize,
          d = Math.min(e.AsyncLimit || n.options.ChunkParallelLimit || 1, 256),
          f = e.Body,
          h = Math.ceil(u / l),
          p = 0,
          g = e.ServerSideEncryption,
          m = e.Headers,
          C = v.filter(s.PartList, function (e) {
            return (
              e.Uploaded && (p += e.PartNumber >= h ? u % l || l : l),
              !e.Uploaded
            );
          }),
          k = e.onProgress;
        y.eachLimit(
          C,
          d,
          function (e, t) {
            if (n._isRunningTask(o)) {
              var d = e.PartNumber,
                h = Math.min(u, e.PartNumber * l) - (e.PartNumber - 1) * l,
                y = 0;
              c.call(
                n,
                {
                  TaskId: o,
                  Bucket: r,
                  Region: i,
                  Key: a,
                  SliceSize: l,
                  FileSize: u,
                  PartNumber: d,
                  ServerSideEncryption: g,
                  Body: f,
                  UploadData: s,
                  Headers: m,
                  onProgress: function (e) {
                    (p += e.loaded - y),
                      (y = e.loaded),
                      k({ loaded: p, total: u });
                  },
                },
                function (r, i) {
                  n._isRunningTask(o) &&
                    (r ||
                      i.ETag ||
                      (r =
                        'get ETag error, please add "ETag" to CORS ExposeHeader setting.( \u83b7\u53d6ETag\u5931\u8d25\uff0c\u8bf7\u5728CORS ExposeHeader\u8bbe\u7f6e\u4e2d\u6dfb\u52a0ETag\uff0c\u8bf7\u53c2\u8003\u6587\u6863\uff1ahttps://cloud.tencent.com/document/product/436/13318 )'),
                    r ? (p -= y) : ((p += h - y), (e.ETag = i.ETag)),
                    k({ loaded: p, total: u }),
                    t(r || null, i));
                }
              );
            }
          },
          function (e) {
            if (n._isRunningTask(o))
              return e
                ? t(e)
                : void t(null, { UploadId: s.UploadId, SliceList: s.PartList });
          }
        );
      }
      function c(e, t) {
        var n = this,
          o = e.TaskId,
          r = e.Bucket,
          i = e.Region,
          a = e.Key,
          s = e.FileSize,
          c = e.Body,
          u = 1 * e.PartNumber,
          l = e.SliceSize,
          d = e.ServerSideEncryption,
          f = e.UploadData,
          h = e.Headers || {},
          p = n.options.ChunkRetryTimes + 1,
          g = l * (u - 1),
          m = l,
          C = g + l;
        C > s && ((C = s), (m = C - g));
        var k = ["x-cos-traffic-limit", "x-cos-mime-limit"],
          S = {};
        v.each(h, function (e, t) {
          k.indexOf(t) > -1 && (S[t] = e);
        });
        var R = f.PartList[u - 1];
        y.retry(
          p,
          function (t) {
            n._isRunningTask(o) &&
              v.fileSlice(c, g, C, !0, function (s) {
                n.multipartUpload(
                  {
                    TaskId: o,
                    Bucket: r,
                    Region: i,
                    Key: a,
                    ContentLength: m,
                    PartNumber: u,
                    UploadId: f.UploadId,
                    ServerSideEncryption: d,
                    Body: s,
                    Headers: S,
                    onProgress: e.onProgress,
                  },
                  function (e, r) {
                    if (n._isRunningTask(o))
                      return e ? t(e) : ((R.Uploaded = !0), t(null, r));
                  }
                );
              });
          },
          function (e, r) {
            if (n._isRunningTask(o)) return t(e, r);
          }
        );
      }
      function u(e, t) {
        var n = e.Bucket,
          o = e.Region,
          r = e.Key,
          i = e.UploadId,
          a = e.SliceList,
          s = this,
          c = this.options.ChunkRetryTimes + 1,
          u = e.Headers,
          l = a.map(function (e) {
            return { PartNumber: e.PartNumber, ETag: e.ETag };
          });
        y.retry(
          c,
          function (e) {
            s.multipartComplete(
              {
                Bucket: n,
                Region: o,
                Key: r,
                UploadId: i,
                Parts: l,
                Headers: u,
              },
              e
            );
          },
          function (e, n) {
            t(e, n);
          }
        );
      }
      function l(e, t) {
        var n = e.Bucket,
          o = e.Region,
          r = e.Key,
          a = e.UploadId,
          s = e.Level || "task",
          c = e.AsyncLimit,
          u = this,
          l = new C();
        if (
          (l.on("error", function (e) {
            return t(e);
          }),
          l.on("get_abort_array", function (i) {
            d.call(
              u,
              {
                Bucket: n,
                Region: o,
                Key: r,
                Headers: e.Headers,
                AsyncLimit: c,
                AbortArray: i,
              },
              t
            );
          }),
          "bucket" === s)
        )
          i.call(u, { Bucket: n, Region: o }, function (e, n) {
            if (e) return t(e);
            l.emit("get_abort_array", n.UploadList || []);
          });
        else if ("file" === s) {
          if (!r) return t(v.error(new Error("abort_upload_task_no_key")));
          i.call(u, { Bucket: n, Region: o, Key: r }, function (e, n) {
            if (e) return t(e);
            l.emit("get_abort_array", n.UploadList || []);
          });
        } else {
          if ("task" !== s) return t(v.error(new Error("abort_unknown_level")));
          if (!a) return t(v.error(new Error("abort_upload_task_no_id")));
          if (!r) return t(v.error(new Error("abort_upload_task_no_key")));
          l.emit("get_abort_array", [{ Key: r, UploadId: a }]);
        }
      }
      function d(e, t) {
        var n = e.Bucket,
          o = e.Region,
          r = e.Key,
          i = e.AbortArray,
          a = e.AsyncLimit || 1,
          s = this,
          c = 0,
          u = new Array(i.length);
        y.eachLimit(
          i,
          a,
          function (t, i) {
            var a = c;
            if (r && r !== t.Key)
              return (u[a] = { error: { KeyNotMatch: !0 } }), void i(null);
            var l = t.UploadId || t.UploadID;
            s.multipartAbort(
              {
                Bucket: n,
                Region: o,
                Key: t.Key,
                Headers: e.Headers,
                UploadId: l,
              },
              function (e) {
                var r = { Bucket: n, Region: o, Key: t.Key, UploadId: l };
                (u[a] = { error: e, task: r }), i(null);
              }
            ),
              c++;
          },
          function (e) {
            if (e) return t(e);
            for (var n = [], o = [], r = 0, i = u.length; r < i; r++) {
              var a = u[r];
              a.task && (a.error ? o.push(a.task) : n.push(a.task));
            }
            return t(null, { successList: n, errorList: o });
          }
        );
      }
      function f(e, t) {
        var n = this,
          o = void 0 === e.SliceSize ? n.options.SliceSize : e.SliceSize,
          r = [],
          i = e.Body,
          a = i.size || i.length || 0,
          s = { TaskId: "" };
        v.each(e, function (e, t) {
          "object" != typeof e && "function" != typeof e && (s[t] = e);
        });
        var c = e.onTaskReady,
          u = function (e) {
            (s.TaskId = e), c && c(e);
          };
        e.onTaskReady = u;
        var l = e.onFileFinish,
          d = function (e, n) {
            l && l(e, n, s), t && t(e, n);
          },
          f = a > o ? "sliceUploadFile" : "putObject";
        r.push({ api: f, params: e, callback: d }), n._addTasks(r);
      }
      function h(e, t) {
        var n = this,
          o = void 0 === e.SliceSize ? n.options.SliceSize : e.SliceSize,
          r = 0,
          i = 0,
          a = v.throttleOnProgress.call(n, i, e.onProgress),
          s = e.files.length,
          c = e.onFileFinish,
          u = Array(s),
          l = function (e, n, o) {
            a(null, !0),
              c && c(e, n, o),
              (u[o.Index] = { options: o, error: e, data: n }),
              --s <= 0 && t && t(null, { files: u });
          },
          d = [];
        v.each(e.files, function (e, t) {
          !(function () {
            var n = e.Body,
              s = n.size || n.length || 0,
              c = { Index: t, TaskId: "" };
            (r += s),
              v.each(e, function (e, t) {
                "object" != typeof e && "function" != typeof e && (c[t] = e);
              });
            var u = e.onTaskReady,
              f = function (e) {
                (c.TaskId = e), u && u(e);
              };
            e.onTaskReady = f;
            var h = 0,
              p = e.onProgress,
              g = function (e) {
                (i = i - h + e.loaded),
                  (h = e.loaded),
                  p && p(e),
                  a({ loaded: i, total: r });
              };
            e.onProgress = g;
            var m = e.onFileFinish,
              y = function (e, t) {
                m && m(e, t), l && l(e, t, c);
              },
              C = s > o ? "sliceUploadFile" : "putObject";
            d.push({ api: C, params: e, callback: y });
          })();
        }),
          n._addTasks(d);
      }
      function p(e, t) {
        var n = new C(),
          o = this,
          r = e.Bucket,
          i = e.Region,
          a = e.Key,
          s = e.CopySource,
          c = v.getSourceParams.call(this, s);
        if (!c) return void t(v.error(new Error("CopySource format error")));
        var u = c.Bucket,
          l = c.Region,
          d = decodeURIComponent(c.Key),
          f =
            void 0 === e.CopySliceSize
              ? o.options.CopySliceSize
              : e.CopySliceSize;
        f = Math.max(0, f);
        var h,
          p,
          m = e.CopyChunkSize || this.options.CopyChunkSize,
          k = this.options.CopyChunkParallelLimit,
          S = 0;
        n.on("copy_slice_complete", function (n) {
          var s = {};
          v.each(e.Headers, function (e, t) {
            0 === t.toLowerCase().indexOf("x-cos-meta-") && (s[t] = e);
          });
          var c = v.map(n.PartList, function (e) {
            return { PartNumber: e.PartNumber, ETag: e.ETag };
          });
          o.multipartComplete(
            { Bucket: r, Region: i, Key: a, UploadId: n.UploadId, Parts: c },
            function (e, n) {
              if (e) return p(null, !0), t(e);
              p({ loaded: h, total: h }, !0), t(null, n);
            }
          );
        }),
          n.on("get_copy_data_finish", function (e) {
            y.eachLimit(
              e.PartList,
              k,
              function (t, n) {
                var c = t.PartNumber,
                  u = t.CopySourceRange,
                  l = t.end - t.start;
                g.call(
                  o,
                  {
                    Bucket: r,
                    Region: i,
                    Key: a,
                    CopySource: s,
                    UploadId: e.UploadId,
                    PartNumber: c,
                    CopySourceRange: u,
                  },
                  function (e, o) {
                    if (e) return n(e);
                    (S += l),
                      p({ loaded: S, total: h }),
                      (t.ETag = o.ETag),
                      n(e || null, o);
                  }
                );
              },
              function (o) {
                if (o) return p(null, !0), t(o);
                n.emit("copy_slice_complete", e);
              }
            );
          }),
          n.on("get_file_size_finish", function (s) {
            !(function () {
              for (
                var t = [
                    1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096,
                    5120,
                  ],
                  n = 1048576,
                  r = 0;
                r < t.length &&
                ((n = 1024 * t[r] * 1024), !(h / n <= o.options.MaxPartNumber));
                r++
              );
              e.ChunkSize = m = Math.max(m, n);
              for (var i = Math.ceil(h / m), a = [], s = 1; s <= i; s++) {
                var c = (s - 1) * m,
                  u = s * m < h ? s * m - 1 : h - 1,
                  l = {
                    PartNumber: s,
                    start: c,
                    end: u,
                    CopySourceRange: "bytes=" + c + "-" + u,
                  };
                a.push(l);
              }
              e.PartList = a;
            })();
            var c;
            if (
              ((c =
                "Replaced" === e.Headers["x-cos-metadata-directive"]
                  ? e.Headers
                  : s),
              (c["x-cos-storage-class"] =
                e.Headers["x-cos-storage-class"] || s["x-cos-storage-class"]),
              (c = v.clearKey(c)),
              "ARCHIVE" === s["x-cos-storage-class"] ||
                "DEEP_ARCHIVE" === s["x-cos-storage-class"])
            ) {
              var u = s["x-cos-restore"];
              if (!u || 'ongoing-request="true"' === u)
                return void t(
                  v.error(
                    new Error(
                      "Unrestored archive object is not allowed to be copied"
                    )
                  )
                );
            }
            delete c["x-cos-copy-source"],
              delete c["x-cos-metadata-directive"],
              delete c["x-cos-copy-source-If-Modified-Since"],
              delete c["x-cos-copy-source-If-Unmodified-Since"],
              delete c["x-cos-copy-source-If-Match"],
              delete c["x-cos-copy-source-If-None-Match"],
              o.multipartInit(
                { Bucket: r, Region: i, Key: a, Headers: c },
                function (o, r) {
                  if (o) return t(o);
                  (e.UploadId = r.UploadId), n.emit("get_copy_data_finish", e);
                }
              );
          }),
          o.headObject({ Bucket: u, Region: l, Key: d }, function (r, i) {
            if (r)
              return void t(
                r.statusCode && 404 === r.statusCode
                  ? v.error(r, { ErrorStatus: d + " Not Exist" })
                  : r
              );
            if (void 0 === (h = e.FileSize = i.headers["content-length"]) || !h)
              return void t(
                v.error(
                  new Error(
                    'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.\uff08 \u83b7\u53d6Content-Length\u5931\u8d25\uff0c\u8bf7\u5728CORS ExposeHeader\u8bbe\u7f6e\u4e2d\u6dfb\u52a0Content-Length\uff0c\u8bf7\u53c2\u8003\u6587\u6863\uff1ahttps://cloud.tencent.com/document/product/436/13318 \uff09'
                  )
                )
              );
            if (((p = v.throttleOnProgress.call(o, h, e.onProgress)), h <= f))
              e.Headers["x-cos-metadata-directive"] ||
                (e.Headers["x-cos-metadata-directive"] = "Copy"),
                o.putObjectCopy(e, function (e, n) {
                  if (e) return p(null, !0), t(e);
                  p({ loaded: h, total: h }, !0), t(e, n);
                });
            else {
              var a = i.headers,
                s = {
                  "Cache-Control": a["cache-control"],
                  "Content-Disposition": a["content-disposition"],
                  "Content-Encoding": a["content-encoding"],
                  "Content-Type": a["content-type"],
                  Expires: a.expires,
                  "x-cos-storage-class": a["x-cos-storage-class"],
                };
              v.each(a, function (e, t) {
                0 === t.indexOf("x-cos-meta-") &&
                  t.length > "x-cos-meta-".length &&
                  (s[t] = e);
              }),
                n.emit("get_file_size_finish", s);
            }
          });
      }
      function g(e, t) {
        var n = e.TaskId,
          o = e.Bucket,
          r = e.Region,
          i = e.Key,
          a = e.CopySource,
          s = e.UploadId,
          c = 1 * e.PartNumber,
          u = e.CopySourceRange,
          l = this.options.ChunkRetryTimes + 1,
          d = this;
        y.retry(
          l,
          function (e) {
            d.uploadPartCopy(
              {
                TaskId: n,
                Bucket: o,
                Region: r,
                Key: i,
                CopySource: a,
                UploadId: s,
                PartNumber: c,
                CopySourceRange: u,
              },
              function (t, n) {
                e(t || null, n);
              }
            );
          },
          function (e, n) {
            return t(e, n);
          }
        );
      }
      var m = n(4),
        y = n(19),
        C = n(3).EventProxy,
        v = n(0),
        k = {
          sliceUploadFile: o,
          abortUploadTask: l,
          uploadFile: f,
          uploadFiles: h,
          sliceCopyFile: p,
        };
      e.exports.init = function (e, t) {
        t.transferToTaskMethod(k, "sliceUploadFile"),
          v.each(k, function (t, n) {
            e.prototype[n] = v.apiWrapper(n, t);
          });
      };
    },
    function (e, t) {
      var n = function (e, t, n, o) {
          if (((o = o || function () {}), !e.length || t <= 0)) return o();
          var r = 0,
            i = 0,
            a = 0;
          !(function s() {
            if (r >= e.length) return o();
            for (; a < t && i < e.length; )
              (i += 1),
                (a += 1),
                n(e[i - 1], function (t) {
                  t
                    ? (o(t), (o = function () {}))
                    : ((r += 1), (a -= 1), r >= e.length ? o() : s());
                });
          })();
        },
        o = function (e, t, n) {
          var o = function (r) {
            t(function (t, i) {
              t && r < e ? o(r + 1) : n(t, i);
            });
          };
          e < 1 ? n() : o(1);
        },
        r = { eachLimit: n, retry: o };
      e.exports = r;
    },
  ]);
});
