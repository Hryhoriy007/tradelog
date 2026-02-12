(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/app/components/ui/styles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ui",
    ()=>ui
]);
const ui = {
    page: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: 24
    },
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 16
    },
    card: {
        border: "1px solid #222",
        borderRadius: 16,
        padding: 18,
        background: "rgba(0,0,0,0.2)"
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 900,
        marginBottom: 12
    },
    subtle: {
        opacity: 0.7
    },
    row: {
        display: "flex",
        gap: 12,
        flexWrap: "wrap"
    },
    grid2: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14
    },
    grid3: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14
    },
    grid5: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 12
    },
    control: {
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        height: 44,
        padding: "0 12px",
        borderRadius: 12,
        border: "1px solid #222",
        background: "transparent",
        color: "inherit",
        outline: "none"
    },
    textarea: (minHeight = 110)=>({
            width: "100%",
            padding: "10px 0px",
            borderRadius: 12,
            border: "1px solid #222",
            background: "transparent",
            color: "inherit",
            outline: "none",
            minHeight,
            resize: "vertical"
        }),
    btn: {
        height: 42,
        padding: "10px 14px",
        borderRadius: 12,
        border: "1px solid #333",
        background: "transparent",
        fontWeight: 900,
        cursor: "pointer",
        color: "inherit"
    },
    btnPrimary: {
        height: 42,
        padding: "10px 14px",
        borderRadius: 12,
        border: "1px solid #333",
        background: "#fff",
        color: "#111",
        fontWeight: 900,
        cursor: "pointer"
    },
    btnDanger: {
        height: 42,
        padding: "10px 14px",
        borderRadius: 12,
        border: "1px solid #333",
        background: "#ff4d4d",
        color: "#111",
        fontWeight: 900,
        cursor: "pointer"
    },
    tableWrap: {
        border: "1px solid #222",
        borderRadius: 16,
        overflow: "hidden"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse"
    },
    th: {
        textAlign: "left",
        padding: "12px 14px",
        fontSize: 13,
        fontWeight: 900,
        opacity: 0.8,
        borderBottom: "1px solid #222"
    },
    td: {
        padding: "12px 14px",
        borderBottom: "1px solid #161616",
        verticalAlign: "middle"
    },
    grid4Fit: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 14
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/app/components/ui/Layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Grid2",
    ()=>Grid2,
    "Grid3",
    ()=>Grid3,
    "Grid5",
    ()=>Grid5,
    "HeaderRow",
    ()=>HeaderRow,
    "Page",
    ()=>Page,
    "Row",
    ()=>Row
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/ui/styles.ts [app-client] (ecmascript)");
;
;
function Page({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].page,
        children: children
    }, void 0, false, {
        fileName: "[project]/web/app/components/ui/Layout.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
_c = Page;
function HeaderRow(props) {
    const { title, subtitle, right, children } = props ?? {};
    // If children are passed explicitly (old style), render them as-is.
    // Otherwise render the title/subtitle/right layout (new style).
    const useChildren = children != null && typeof title === "undefined" && typeof subtitle === "undefined" && typeof right === "undefined";
    if (useChildren) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 14,
                flexWrap: "wrap"
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/web/app/components/ui/Layout.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 14,
            flexWrap: "wrap"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minWidth: 260
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 34,
                            fontWeight: 900,
                            lineHeight: 1.1
                        },
                        children: title ?? ""
                    }, void 0, false, {
                        fileName: "[project]/web/app/components/ui/Layout.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            opacity: 0.7,
                            fontSize: 13,
                            marginTop: 6
                        },
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/web/app/components/ui/Layout.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/web/app/components/ui/Layout.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            right ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 8
                },
                children: right
            }, void 0, false, {
                fileName: "[project]/web/app/components/ui/Layout.tsx",
                lineNumber: 66,
                columnNumber: 16
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/web/app/components/ui/Layout.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c1 = HeaderRow;
function Row({ children, style }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].row,
            ...style
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/web/app/components/ui/Layout.tsx",
        lineNumber: 72,
        columnNumber: 10
    }, this);
}
_c2 = Row;
function Grid2({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].grid2,
        children: children
    }, void 0, false, {
        fileName: "[project]/web/app/components/ui/Layout.tsx",
        lineNumber: 76,
        columnNumber: 10
    }, this);
}
_c3 = Grid2;
function Grid3({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].grid3,
        children: children
    }, void 0, false, {
        fileName: "[project]/web/app/components/ui/Layout.tsx",
        lineNumber: 80,
        columnNumber: 10
    }, this);
}
_c4 = Grid3;
function Grid5({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].grid5,
        children: children
    }, void 0, false, {
        fileName: "[project]/web/app/components/ui/Layout.tsx",
        lineNumber: 84,
        columnNumber: 10
    }, this);
}
_c5 = Grid5;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Page");
__turbopack_context__.k.register(_c1, "HeaderRow");
__turbopack_context__.k.register(_c2, "Row");
__turbopack_context__.k.register(_c3, "Grid2");
__turbopack_context__.k.register(_c4, "Grid3");
__turbopack_context__.k.register(_c5, "Grid5");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/app/components/ui/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/ui/styles.ts [app-client] (ecmascript)");
;
;
function Card({ title, children, style }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].card,
            ...style
        },
        children: [
            title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].cardTitle,
                children: title
            }, void 0, false, {
                fileName: "[project]/web/app/components/ui/Card.tsx",
                lineNumber: 15,
                columnNumber: 16
            }, this) : null,
            children
        ]
    }, void 0, true, {
        fileName: "[project]/web/app/components/ui/Card.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/app/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/ui/styles.ts [app-client] (ecmascript)");
"use client";
;
;
function Button({ variant = "ghost", style, ...props }) {
    const base = variant === "primary" ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].btnPrimary : variant === "danger" ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].btnDanger : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].btn;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ...props,
        style: {
            ...base,
            ...style
        }
    }, void 0, false, {
        fileName: "[project]/web/app/components/ui/Button.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/app/components/marketing/MockDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MockDashboard",
    ()=>MockDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
"use client";
;
;
function MockDashboard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            borderRadius: 22,
            padding: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "grid",
                gap: 12
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniCard, {
                            label: "Total R",
                            value: "+12.4R"
                        }, void 0, false, {
                            fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniCard, {
                            label: "Win rate",
                            value: "48%"
                        }, void 0, false, {
                            fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                            lineNumber: 10,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniCard, {
                            label: "Avg R",
                            value: "+0.42R"
                        }, void 0, false, {
                            fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                            lineNumber: 11,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniCard, {
                            label: "Streak",
                            value: "WIN × 4"
                        }, void 0, false, {
                            fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MockCard, {
                    title: "Equity curve (R)",
                    subtitle: "Last 30 trades",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative"
                        },
                        className: "jsx-1e28a73c67e5971",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "100%",
                                height: "120",
                                viewBox: "0 0 400 120",
                                className: "jsx-1e28a73c67e5971",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "0",
                                        y1: "100",
                                        x2: "400",
                                        y2: "100",
                                        stroke: "rgba(255,255,255,0.10)",
                                        strokeWidth: "1",
                                        className: "jsx-1e28a73c67e5971"
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                                        lineNumber: 19,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "0,80 40,90 80,70 120,75 160,55 200,60 240,40 280,45 320,30 360,20",
                                        fill: "none",
                                        stroke: "rgba(140,80,255,0.35)",
                                        strokeWidth: "6",
                                        strokeLinejoin: "round",
                                        strokeLinecap: "round",
                                        opacity: "0.35",
                                        className: "jsx-1e28a73c67e5971" + " " + "eqGlow"
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                                        lineNumber: 22,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "0,80 40,90 80,70 120,75 160,55 200,60 240,40 280,45 320,30 360,20",
                                        fill: "none",
                                        stroke: "rgba(255,255,255,0.92)",
                                        strokeWidth: "2.6",
                                        strokeLinejoin: "round",
                                        strokeLinecap: "round",
                                        className: "jsx-1e28a73c67e5971" + " " + "eqLine"
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                                lineNumber: 18,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                id: "1e28a73c67e5971",
                                children: ".eqLine.jsx-1e28a73c67e5971{stroke-dasharray:520;stroke-dashoffset:520px;animation:1.15s forwards draw}.eqGlow.jsx-1e28a73c67e5971{stroke-dasharray:520;stroke-dashoffset:520px;filter:blur(6px);animation:1.15s forwards draw}@keyframes draw{to{stroke-dashoffset:0}}"
                            }, void 0, false, void 0, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MockCard, {
                    title: "Last trades",
                    subtitle: "Preview",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TradeRow, {
                                pair: "ETHUSDT",
                                side: "SHORT",
                                r: "+2.1R",
                                tone: "win"
                            }, void 0, false, {
                                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TradeRow, {
                                pair: "BTCUSDT",
                                side: "LONG",
                                r: "-1.0R",
                                tone: "loss"
                            }, void 0, false, {
                                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TradeRow, {
                                pair: "ETHUSDT",
                                side: "LONG",
                                r: "+1.4R",
                                tone: "win"
                            }, void 0, false, {
                                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = MockDashboard;
function MockCard({ title, subtitle, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.02)",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "12px 14px 0 14px",
                    display: "grid",
                    gap: 4
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 900
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 12,
                            opacity: 0.7
                        },
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                        lineNumber: 106,
                        columnNumber: 21
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: 14
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_c1 = MockCard;
function MiniCard({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 10,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.02)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 11,
                    opacity: 0.65
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontWeight: 900,
                    marginTop: 4
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_c2 = MiniCard;
function toneStyle(tone) {
    if (tone === "win") return {
        bg: "rgba(80,200,120,0.14)",
        br: "rgba(80,200,120,0.22)"
    };
    if (tone === "loss") return {
        bg: "rgba(255,100,100,0.14)",
        br: "rgba(255,100,100,0.22)"
    };
    return {
        bg: "rgba(180,180,180,0.12)",
        br: "rgba(180,180,180,0.18)"
    };
}
function TradeRow({ pair, side, r, tone }) {
    const t = toneStyle(tone);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            padding: "6px 8px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            fontSize: 12,
            alignItems: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: pair
                            }, void 0, false, {
                                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    opacity: 0.7
                                },
                                children: side
                            }, void 0, false, {
                                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                                lineNumber: 176,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            padding: "3px 8px",
                            borderRadius: 999,
                            border: `1px solid ${t.br}`,
                            background: t.bg,
                            opacity: 0.92,
                            fontSize: 11,
                            fontWeight: 800
                        },
                        children: tone.toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontWeight: 800
                },
                children: r
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/app/components/marketing/MockDashboard.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_c3 = TradeRow;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "MockDashboard");
__turbopack_context__.k.register(_c1, "MockCard");
__turbopack_context__.k.register(_c2, "MiniCard");
__turbopack_context__.k.register(_c3, "TradeRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/app/components/marketing/DashboardWindow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardWindow",
    ()=>DashboardWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
function Dot({ color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color,
            opacity: 0.85
        }
    }, void 0, false, {
        fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Dot;
function Pill({ children, tone }) {
    const map = {
        win: "rgba(80,200,120,0.18)",
        loss: "rgba(255,100,100,0.18)",
        be: "rgba(180,180,180,0.18)"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            padding: "4px 8px",
            borderRadius: 999,
            fontSize: 12,
            border: `1px solid ${map[tone]}`,
            background: map[tone],
            opacity: 0.92,
            whiteSpace: "nowrap"
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c1 = Pill;
const THEME_KEY = "tradelog_theme_v1";
function ThemeToggleMini() {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dark");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggleMini.useEffect": ()=>{
            try {
                const stored = (localStorage.getItem(THEME_KEY) || "").toLowerCase();
                const t = stored === "light" ? "light" : "dark";
                setTheme(t);
                document.documentElement.dataset.theme = t;
            } catch  {
            // ignore
            }
        }
    }["ThemeToggleMini.useEffect"], []);
    const onToggle = ()=>{
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        try {
            document.documentElement.dataset.theme = next;
            localStorage.setItem(THEME_KEY, next);
        } catch  {
        // ignore
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "button",
        tabIndex: 0,
        onClick: onToggle,
        onKeyDown: (e)=>{
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle();
            }
        },
        title: "Toggle theme",
        style: {
            height: 26,
            padding: "0 10px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            fontSize: 12,
            fontWeight: 800,
            opacity: 0.92,
            cursor: "pointer",
            userSelect: "none",
            display: "flex",
            alignItems: "center"
        },
        children: theme === "dark" ? "Dark" : "Light"
    }, void 0, false, {
        fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(ThemeToggleMini, "HKZhbbE1NL5O9VXEQueUHrvooII=");
_c2 = ThemeToggleMini;
function DashboardWindow({ children, watermark = "" }) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [tilt, setTilt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        rx: 0,
        ry: 0,
        s: 1
    });
    const [glow, setGlow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 70,
        y: 12
    });
    // ✅ SSR-safe: default false
    const [finePointer, setFinePointer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardWindow.useEffect": ()=>{
            try {
                const mq = window.matchMedia?.("(pointer: fine)");
                setFinePointer(mq?.matches ?? false);
                if (!mq) return;
                const onChange = {
                    "DashboardWindow.useEffect.onChange": ()=>setFinePointer(mq.matches)
                }["DashboardWindow.useEffect.onChange"];
                if ("addEventListener" in mq) mq.addEventListener("change", onChange);
                else mq.addListener?.(onChange);
                return ({
                    "DashboardWindow.useEffect": ()=>{
                        if ("removeEventListener" in mq) mq.removeEventListener("change", onChange);
                        else mq.removeListener?.(onChange);
                    }
                })["DashboardWindow.useEffect"];
            } catch  {
                setFinePointer(false);
            }
        }
    }["DashboardWindow.useEffect"], []);
    const onMove = (e)=>{
        if (!finePointer) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const ry = (px - 0.5) * 10;
        const rx = -(py - 0.5) * 10;
        setTilt({
            rx,
            ry,
            s: 1.01
        });
        setGlow({
            x: Math.max(0, Math.min(100, px * 100)),
            y: Math.max(0, Math.min(100, py * 100))
        });
    };
    const onLeave = ()=>{
        setTilt({
            rx: 0,
            ry: 0,
            s: 1
        });
        setGlow({
            x: 70,
            y: 12
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            perspective: 900
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            onMouseMove: onMove,
            onMouseLeave: onLeave,
            style: {
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})`,
                transformStyle: "preserve-3d",
                transition: finePointer ? "transform 140ms ease" : "none",
                willChange: "transform",
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.12)",
                overflow: "hidden",
                boxShadow: "0 40px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
                position: "relative",
                background: `
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.15)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E")
          `
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        inset: -80,
                        pointerEvents: "none",
                        background: `radial-gradient(650px 240px at ${glow.x}% ${glow.y}%, rgba(140,80,255,0.26), transparent 60%)`
                    }
                }, void 0, false, {
                    fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                    lineNumber: 198,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        inset: -120,
                        pointerEvents: "none",
                        background: `radial-gradient(520px 200px at ${Math.min(100, glow.x + 10)}% ${Math.max(0, glow.y - 10)}%, rgba(255,255,255,0.10), transparent 65%)`,
                        mixBlendMode: "screen",
                        opacity: 0.7
                    }
                }, void 0, false, {
                    fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        right: 14,
                        bottom: 12,
                        fontSize: 12,
                        fontWeight: 900,
                        letterSpacing: 0.6,
                        opacity: 0.16,
                        transform: "rotate(-8deg)",
                        pointerEvents: "none",
                        userSelect: "none"
                    },
                    children: watermark
                }, void 0, false, {
                    fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "relative",
                        height: 38,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "0 14px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(0,0,0,0.25)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dot, {
                            color: "#ff5f56"
                        }, void 0, false, {
                            fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dot, {
                            color: "#ffbd2e"
                        }, void 0, false, {
                            fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dot, {
                            color: "#27c93f"
                        }, void 0, false, {
                            fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                            lineNumber: 255,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginLeft: 10,
                                display: "flex",
                                gap: 8,
                                alignItems: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                    tone: "win",
                                    children: "Win"
                                }, void 0, false, {
                                    fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                    tone: "loss",
                                    children: "Loss"
                                }, void 0, false, {
                                    fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                    tone: "be",
                                    children: "BE"
                                }, void 0, false, {
                                    fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                            lineNumber: 257,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginLeft: "auto"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeToggleMini, {}, void 0, false, {
                                fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "relative",
                        padding: 14
                    },
                    children: children
                }, void 0, false, {
                    fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
                    lineNumber: 269,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
            lineNumber: 176,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/app/components/marketing/DashboardWindow.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s1(DashboardWindow, "IvUipoytGyFf941sUqFxUa68kpM=");
_c3 = DashboardWindow;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Dot");
__turbopack_context__.k.register(_c1, "Pill");
__turbopack_context__.k.register(_c2, "ThemeToggleMini");
__turbopack_context__.k.register(_c3, "DashboardWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/app/components/marketing/Background3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Background3D",
    ()=>Background3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
function usePrefersReducedMotion() {
    _s();
    const [reduced, setReduced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePrefersReducedMotion.useEffect": ()=>{
            const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
            const onChange = {
                "usePrefersReducedMotion.useEffect.onChange": ()=>setReduced(mq.matches)
            }["usePrefersReducedMotion.useEffect.onChange"];
            onChange();
            mq.addEventListener?.("change", onChange);
            return ({
                "usePrefersReducedMotion.useEffect": ()=>mq.removeEventListener?.("change", onChange)
            })["usePrefersReducedMotion.useEffect"];
        }
    }["usePrefersReducedMotion.useEffect"], []);
    return reduced;
}
_s(usePrefersReducedMotion, "PAG4zvF6+IsK2eHB7xTPE8NJ12w=");
/**
 * Theme detection:
 * - html/body class "dark"
 * - data-theme="dark" / data-mode="dark" / data-color-scheme="dark"
 * - fallback: prefers-color-scheme
 */ function useIsDarkTheme() {
    _s1();
    const [isDark, setIsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIsDarkTheme.useEffect": ()=>{
            const read = {
                "useIsDarkTheme.useEffect.read": ()=>{
                    const html = document.documentElement;
                    const body = document.body;
                    const hasDarkClass = html.classList.contains("dark") || body?.classList?.contains("dark");
                    const attr = {
                        "useIsDarkTheme.useEffect.read.attr": (name)=>html.getAttribute(name) || body?.getAttribute?.(name)
                    }["useIsDarkTheme.useEffect.read.attr"];
                    const themeAttr = attr("data-theme") || attr("data-mode") || attr("data-color-scheme");
                    const isDarkAttr = themeAttr?.toLowerCase() === "dark";
                    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
                    setIsDark(hasDarkClass || isDarkAttr || prefersDark);
                }
            }["useIsDarkTheme.useEffect.read"];
            read();
            const obs = new MutationObserver(read);
            obs.observe(document.documentElement, {
                attributes: true,
                attributeFilter: [
                    "class",
                    "data-theme",
                    "data-mode",
                    "data-color-scheme"
                ]
            });
            if (document.body) {
                obs.observe(document.body, {
                    attributes: true,
                    attributeFilter: [
                        "class",
                        "data-theme",
                        "data-mode",
                        "data-color-scheme"
                    ]
                });
            }
            const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
            const onMq = {
                "useIsDarkTheme.useEffect.onMq": ()=>read()
            }["useIsDarkTheme.useEffect.onMq"];
            mq?.addEventListener?.("change", onMq);
            return ({
                "useIsDarkTheme.useEffect": ()=>{
                    obs.disconnect();
                    mq?.removeEventListener?.("change", onMq);
                }
            })["useIsDarkTheme.useEffect"];
        }
    }["useIsDarkTheme.useEffect"], []);
    return isDark;
}
_s1(useIsDarkTheme, "q9ovQTvwIdpxeVii6kJLTuTYpwE=");
function MarketDust({ count = 900, isDark }) {
    _s2();
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { positions, base, speeds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MarketDust.useMemo": ()=>{
            const positions = new Float32Array(count * 3);
            const base = new Float32Array(count * 3);
            const speeds = new Float32Array(count);
            for(let i = 0; i < count; i++){
                // spread across viewport, slightly in front of content
                const x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloatSpread(22); // -11..11
                const y = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0.5, 10.5);
                const z = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(-14, 4); // behind/in-front mix
                positions[i * 3 + 0] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
                base[i * 3 + 0] = x;
                base[i * 3 + 1] = y;
                base[i * 3 + 2] = z;
                speeds[i] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0.6, 1.35);
            }
            return {
                positions,
                base,
                speeds
            };
        }
    }["MarketDust.useMemo"], [
        count
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "MarketDust.useFrame": (state)=>{
            const pts = pointsRef.current;
            if (!pts) return;
            const t = state.clock.getElapsedTime();
            const arr = pts.geometry.attributes.position.array;
            for(let i = 0; i < count; i++){
                const bx = base[i * 3 + 0];
                const by = base[i * 3 + 1];
                const bz = base[i * 3 + 2];
                const s = speeds[i];
                // subtle "market dust" drift (not falling)
                arr[i * 3 + 0] = bx + Math.sin(t * 0.22 * s + i * 0.7) * 0.10;
                arr[i * 3 + 1] = by + Math.cos(t * 0.18 * s + i * 0.9) * 0.08;
                arr[i * 3 + 2] = bz + Math.sin(t * 0.16 * s + i * 0.5) * 0.12;
            }
            pts.geometry.attributes.position.needsUpdate = true;
        }
    }["MarketDust.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferGeometry", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                    attach: "attributes-position",
                    array: positions,
                    itemSize: 3,
                    count: count
                }, void 0, false, {
                    fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
                size: isDark ? 0.03 : 0.028,
                transparent: true,
                opacity: isDark ? 0.42 : 0.28,
                depthWrite: false,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                color: isDark ? "#d7ccff" : "#8d74ff"
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/app/components/marketing/Background3D.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s2(MarketDust, "AkmgRQMgv/m6pQ9+STzsXQlDGWw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = MarketDust;
function Scene({ isDark }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.35
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    6,
                    10,
                    6
                ],
                intensity: 0.55
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketDust, {
                count: 900,
                isDark: isDark
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c1 = Scene;
function Background3D() {
    _s3();
    const reducedMotion = usePrefersReducedMotion();
    const isDark = useIsDarkTheme();
    // lighter overlays so particles remain visible
    const overlayLinear = isDark ? "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.18), rgba(0,0,0,0.40))" : "linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0.14), rgba(255,255,255,0.22))";
    const overlayRadials = isDark ? "radial-gradient(1200px 500px at 15% 10%, rgba(140,80,255,0.16), transparent 62%), radial-gradient(900px 380px at 85% 80%, rgba(140,80,255,0.10), transparent 62%)" : "radial-gradient(1200px 500px at 15% 10%, rgba(140,80,255,0.10), transparent 62%), radial-gradient(900px 380px at 85% 80%, rgba(140,80,255,0.06), transparent 62%)";
    if (reducedMotion) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-hidden": true,
            style: {
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                background: isDark ? "radial-gradient(900px 380px at 20% 15%, rgba(140,80,255,0.16), transparent 60%), radial-gradient(900px 380px at 80% 85%, rgba(140,80,255,0.10), transparent 62%), rgba(0,0,0,0.45)" : "radial-gradient(900px 380px at 20% 15%, rgba(140,80,255,0.12), transparent 60%), radial-gradient(900px 380px at 80% 85%, rgba(140,80,255,0.08), transparent 62%), rgba(255,255,255,0.40)"
            }
        }, void 0, false, {
            fileName: "[project]/web/app/components/marketing/Background3D.tsx",
            lineNumber: 192,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": true,
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                dpr: [
                    1,
                    1.5
                ],
                camera: {
                    position: [
                        0,
                        6.2,
                        10
                    ],
                    fov: 45,
                    near: 0.1,
                    far: 60
                },
                gl: {
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Scene, {
                    isDark: isDark
                }, void 0, false, {
                    fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    backgroundImage: overlayRadials,
                    opacity: 0.95
                }
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    background: overlayLinear
                }
            }, void 0, false, {
                fileName: "[project]/web/app/components/marketing/Background3D.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/app/components/marketing/Background3D.tsx",
        lineNumber: 208,
        columnNumber: 5
    }, this);
}
_s3(Background3D, "QF2RGj7sEKtoSePWovmdAWXa78Y=", false, function() {
    return [
        usePrefersReducedMotion,
        useIsDarkTheme
    ];
});
_c2 = Background3D;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MarketDust");
__turbopack_context__.k.register(_c1, "Scene");
__turbopack_context__.k.register(_c2, "Background3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/ui/Layout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/ui/styles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$marketing$2f$MockDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/marketing/MockDashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$marketing$2f$DashboardWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/marketing/DashboardWindow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$marketing$2f$Background3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/app/components/marketing/Background3D.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
// web/app/page.tsx
"use client";
;
;
;
;
;
;
;
;
;
;
const copy = {
    heroTitle: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            "Trade with data,",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                fileName: "[project]/web/app/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            "not emotions.",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                fileName: "[project]/web/app/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            "Stay consistent."
        ]
    }, void 0, true),
    heroSub: "Log entries, exits, risk, emotions, and rules — so your results stop lying to you.",
    how1: "Log what you executed",
    how1Text: "Pair, side, entry, stop, target — done in seconds.",
    how2: "Capture the real context",
    how2Text: "Setup, bias, emotions before & after. Why you entered. Why you exited.",
    how3: "Review your behavior",
    how3Text: "Equity in R, mistakes, overtrading, best setups.",
    featuresTitle: "Features",
    features: [
        {
            title: "Log trades without breaking focus",
            subtitle: "Fast, no clutter",
            points: [
                "Add a trade in ~30 seconds",
                "Presets for repeatable setups",
                "Tags for mistakes, psychology, FOMO"
            ]
        },
        {
            title: "Stats that expose your discipline",
            subtitle: "See what you repeat",
            points: [
                "Equity curve in R (not fake PnL)",
                "Win / Loss / BE distribution",
                "Best & worst setups by Avg R"
            ]
        },
        {
            title: "Your data. No lock-in. Ever.",
            subtitle: "Export & restore anytime",
            points: [
                "One-click JSON backup",
                "CSV export for Excel / Sheets",
                "Import with merge or replace modes"
            ]
        }
    ],
    bottomTitle: "Ready to stop repeating the same mistakes?",
    bottomSub: "Create an account and start logging trades in minutes."
};
function Badge({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.03)",
            fontSize: 12,
            opacity: 0.9,
            whiteSpace: "nowrap"
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/web/app/page.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_c = Badge;
function Feature({ title, subtitle, points }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            title: title,
            subtitle: subtitle,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gap: 10
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    style: {
                        margin: 0,
                        paddingLeft: 18,
                        display: "grid",
                        gap: 8,
                        opacity: 0.9
                    },
                    children: points.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: p
                        }, p, false, {
                            fileName: "[project]/web/app/page.tsx",
                            lineNumber: 106,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/web/app/page.tsx",
                    lineNumber: 104,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/app/page.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/app/page.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/app/page.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_c1 = Feature;
function Step({ n, title, text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 16,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.02)",
            display: "grid",
            gap: 8,
            height: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 30,
                            height: 30,
                            borderRadius: 10,
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 900,
                            border: "1px solid rgba(255,255,255,0.14)",
                            background: "rgba(255,255,255,0.03)",
                            flex: "0 0 auto"
                        },
                        children: n
                    }, void 0, false, {
                        fileName: "[project]/web/app/page.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 900
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/web/app/page.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/app/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    opacity: 0.75,
                    fontSize: 13,
                    lineHeight: 1.5
                },
                children: text
            }, void 0, false, {
                fileName: "[project]/web/app/page.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/app/page.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
_c2 = Step;
/* =========================
   Trader Panel (Binance-like)
   ========================= */ function clamp01(x) {
    return Math.max(0, Math.min(1, x));
}
function fmtMoney(v) {
    if (v === undefined || v === null) return "—";
    const sign = v > 0 ? "+" : "";
    return `${sign}${v.toFixed(2)} USD`;
}
// deterministic pseudo-random (stable per month/day)
function hashSeed(s) {
    let h = 2166136261;
    for(let i = 0; i < s.length; i++){
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
function rand01(seed) {
    let x = seed || 123456789;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) % 1_000_000 / 1_000_000;
}
/** Binance-like tone with intensity by abs(v) / maxAbs */ function pnlTone(v, maxAbs) {
    if (v === undefined || v === null) {
        return {
            bg: "rgba(255,255,255,0.04)",
            br: "rgba(255,255,255,0.08)",
            text: "rgba(255,255,255,0.70)"
        };
    }
    if (v === 0) {
        return {
            bg: "rgba(180,180,180,0.10)",
            br: "rgba(180,180,180,0.16)",
            text: "rgba(255,255,255,0.88)"
        };
    }
    const t = maxAbs > 0 ? clamp01(Math.abs(v) / maxAbs) : 0;
    const bgA = 0.08 + t * 0.30; // 0.08..0.38
    const brA = 0.16 + t * 0.26; // 0.16..0.42
    if (v > 0) {
        return {
            bg: `rgba(0, 180, 120, ${bgA})`,
            br: `rgba(0, 180, 120, ${brA})`,
            text: "rgba(235,255,245,0.95)"
        };
    }
    return {
        bg: `rgba(240, 70, 70, ${bgA})`,
        br: `rgba(240, 70, 70, ${brA})`,
        text: "rgba(255,235,235,0.95)"
    };
}
// ✅ no file needed — embedded SVG placeholder image
const TRADER_PLACEHOLDER = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="675" viewBox="0 0 900 675">
  <defs>
    <radialGradient id="g" cx="30%" cy="0%" r="90%">
      <stop offset="0%" stop-color="rgba(140,80,255,0.55)"/>
      <stop offset="55%" stop-color="rgba(140,80,255,0.12)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.15)"/>
    </radialGradient>
    <linearGradient id="b" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0b12"/>
      <stop offset="100%" stop-color="#11131b"/>
    </linearGradient>
  </defs>
  <rect width="900" height="675" fill="url(#b)"/>
  <rect width="900" height="675" fill="url(#g)"/>
  <circle cx="450" cy="310" r="150" fill="rgba(255,255,255,0.06)"/>
  <circle cx="450" cy="270" r="70" fill="rgba(255,255,255,0.10)"/>
  <path d="M290,530c35-90,115-135,160-135s125,45,160,135" fill="rgba(255,255,255,0.10)"/>
  <text x="50%" y="92%" text-anchor="middle" fill="rgba(255,255,255,0.60)" font-family="Inter, Arial" font-size="28">
    Trader profile (placeholder)
  </text>
</svg>
`);
function TraderCalendarPanel() {
    _s();
    const trader = {
        name: "Dmytro_515",
        age: 28,
        yearsTrading: 4,
        style: "Futures • Intraday",
        note: "Tracks risk in R, avoids revenge trading",
        photoUrl: TRADER_PLACEHOLDER
    };
    const [range, setRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1m");
    const [monthDate, setMonthDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TraderCalendarPanel.useState": ()=>{
            const n = new Date();
            return new Date(n.getFullYear(), n.getMonth(), 1);
        }
    }["TraderCalendarPanel.useState"]);
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[now]": ()=>new Date()
    }["TraderCalendarPanel.useMemo[now]"], []);
    const currentMonthStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[currentMonthStart]": ()=>new Date(now.getFullYear(), now.getMonth(), 1)
    }["TraderCalendarPanel.useMemo[currentMonthStart]"], [
        now
    ]);
    const historyStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[historyStart]": ()=>new Date(2026, 0, 1)
    }["TraderCalendarPanel.useMemo[historyStart]"], []);
    const monthStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[monthStart]": ()=>new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
    }["TraderCalendarPanel.useMemo[monthStart]"], [
        monthDate
    ]);
    const isMonthBeforeHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[isMonthBeforeHistory]": ()=>monthStart < historyStart
    }["TraderCalendarPanel.useMemo[isMonthBeforeHistory]"], [
        monthStart,
        historyStart
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TraderCalendarPanel.useEffect": ()=>{
            if (monthDate > currentMonthStart) {
                setMonthDate(currentMonthStart);
                return;
            }
            if (monthStart < historyStart) {
                setMonthDate(historyStart);
                return;
            }
        }
    }["TraderCalendarPanel.useEffect"], [
        monthDate,
        currentMonthStart,
        monthStart,
        historyStart
    ]);
    const year = monthDate.getFullYear();
    const monthIndex = monthDate.getMonth();
    const monthLabel = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
    const daysInMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[daysInMonth]": ()=>new Date(year, monthIndex + 1, 0).getDate()
    }["TraderCalendarPanel.useMemo[daysInMonth]"], [
        year,
        monthIndex
    ]);
    const leadingEmpty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[leadingEmpty]": ()=>new Date(year, monthIndex, 1).getDay()
    }["TraderCalendarPanel.useMemo[leadingEmpty]"], [
        year,
        monthIndex
    ]);
    const isThisMonth = now.getFullYear() === year && now.getMonth() === monthIndex;
    const todayDay = now.getDate();
    const isCurrentMonth = isThisMonth;
    const isHistoryStartMonth = year === historyStart.getFullYear() && monthIndex === historyStart.getMonth();
    const goPrevMonth = ()=>{
        setMonthDate((d)=>{
            const prev = new Date(d.getFullYear(), d.getMonth() - 1, 1);
            if (prev < historyStart) return d;
            return prev;
        });
    };
    const goNextMonth = ()=>{
        setMonthDate((d)=>{
            const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
            if (next > currentMonthStart) return d;
            return next;
        });
    };
    const [tip, setTip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        x: 0,
        y: 0,
        title: "",
        value: ""
    });
    const sum = (xs)=>xs.reduce((a, b)=>a + b, 0);
    const asNum = (v)=>typeof v === "number" ? v : 0;
    const sumDays = (arr, fromDay, toDay)=>{
        const from = Math.max(1, fromDay);
        const to = Math.min(arr.length, toDay);
        let s = 0;
        for(let d = from; d <= to; d++)s += asNum(arr[d - 1]);
        return s;
    };
    const dailyPnl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[dailyPnl]": ()=>{
            if (isMonthBeforeHistory) {
                return Array.from({
                    length: daysInMonth
                }, {
                    "TraderCalendarPanel.useMemo[dailyPnl]": ()=>undefined
                }["TraderCalendarPanel.useMemo[dailyPnl]"]);
            }
            const seedBase = hashSeed(`${year}-${monthIndex}`);
            const arr = [];
            for(let d = 1; d <= daysInMonth; d++){
                const r = rand01(seedBase + d * 101);
                const r2 = rand01(seedBase + d * 911);
                if (r < 0.22) {
                    arr.push(undefined);
                    continue;
                }
                let v = (r2 - 0.52) * 6;
                const spike = rand01(seedBase + d * 333);
                if (spike > 0.92) v += (spike - 0.9) * 1500;
                if (spike < 0.06) v -= (0.08 - spike) * 900;
                arr.push(Number(v.toFixed(2)));
            }
            return arr;
        }
    }["TraderCalendarPanel.useMemo[dailyPnl]"], [
        year,
        monthIndex,
        daysInMonth,
        isMonthBeforeHistory
    ]);
    const dailyPnlVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[dailyPnlVisible]": ()=>{
            if (!isThisMonth) return dailyPnl;
            return dailyPnl.map({
                "TraderCalendarPanel.useMemo[dailyPnlVisible]": (v, idx)=>idx + 1 > todayDay ? undefined : v
            }["TraderCalendarPanel.useMemo[dailyPnlVisible]"]);
        }
    }["TraderCalendarPanel.useMemo[dailyPnlVisible]"], [
        dailyPnl,
        isThisMonth,
        todayDay
    ]);
    const maxAbs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[maxAbs]": ()=>{
            return dailyPnlVisible.reduce({
                "TraderCalendarPanel.useMemo[maxAbs]": (mx, v)=>v === undefined ? mx : Math.max(mx, Math.abs(v))
            }["TraderCalendarPanel.useMemo[maxAbs]"], 0);
        }
    }["TraderCalendarPanel.useMemo[maxAbs]"], [
        dailyPnlVisible
    ]);
    const monthsAvailableUpToSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[monthsAvailableUpToSelected]": ()=>{
            const n = (year - historyStart.getFullYear()) * 12 + (monthIndex - historyStart.getMonth()) + 1;
            return Math.max(0, n);
        }
    }["TraderCalendarPanel.useMemo[monthsAvailableUpToSelected]"], [
        year,
        monthIndex,
        historyStart
    ]);
    const rangeMonthsRequested = range === "1m" ? 1 : range === "3m" ? 3 : 12;
    const rangeMonths = Math.max(1, Math.min(rangeMonthsRequested, monthsAvailableUpToSelected || 1));
    const rangeSeries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[rangeSeries]": ()=>{
            const series = [];
            for(let mOffset = rangeMonths - 1; mOffset >= 0; mOffset--){
                const d = new Date(year, monthIndex - mOffset, 1);
                const histMonthStart = new Date(historyStart.getFullYear(), historyStart.getMonth(), 1);
                if (d < histMonthStart) continue;
                const y = d.getFullYear();
                const mi = d.getMonth();
                const dim = new Date(y, mi + 1, 0).getDate();
                const seedBase = hashSeed(`${y}-${mi}`);
                const isCur = y === now.getFullYear() && mi === now.getMonth();
                for(let day = 1; day <= dim; day++){
                    if (isCur && day > now.getDate()) break;
                    const r = rand01(seedBase + day * 101);
                    const r2 = rand01(seedBase + day * 911);
                    if (r < 0.22) continue;
                    let v = (r2 - 0.52) * 6;
                    const spike = rand01(seedBase + day * 333);
                    if (spike > 0.92) v += (spike - 0.9) * 1500;
                    if (spike < 0.06) v -= (0.08 - spike) * 900;
                    series.push(Number(v.toFixed(2)));
                }
            }
            return series;
        }
    }["TraderCalendarPanel.useMemo[rangeSeries]"], [
        rangeMonths,
        year,
        monthIndex,
        now,
        historyStart
    ]);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TraderCalendarPanel.useMemo[stats]": ()=>{
            const endDay = isThisMonth ? todayDay : daysInMonth;
            const today = isThisMonth ? asNum(dailyPnlVisible[todayDay - 1]) : 0;
            const pnl7d = sumDays(dailyPnlVisible, endDay - 6, endDay);
            const pnl30d = sumDays(dailyPnlVisible, endDay - 29, endDay);
            const pnlRange = sum(rangeSeries);
            return {
                today: Number(today.toFixed(2)),
                pnl7d: Number(pnl7d.toFixed(2)),
                pnl30d: Number(pnl30d.toFixed(2)),
                pnlRange: Number(pnlRange.toFixed(2))
            };
        }
    }["TraderCalendarPanel.useMemo[stats]"], [
        dailyPnlVisible,
        todayDay,
        isThisMonth,
        daysInMonth,
        rangeSeries
    ]);
    const rangeLabel = range === "1m" ? "1m" : range === "3m" ? "3m" : monthsAvailableUpToSelected < 12 ? "YTD" : "1y";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        title: "Trader snapshot",
        subtitle: "Binance-style calendar (real month + intensity + tooltip).",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "traderPanelGrid",
            style: {
                display: "grid",
                gridTemplateColumns: "0.9fr 1.1fr",
                gap: 14,
                alignItems: "stretch"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        borderRadius: 18,
                        border: "1px solid rgba(255,255,255,0.10)",
                        background: "rgba(255,255,255,0.02)",
                        overflow: "hidden",
                        display: "grid"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                aspectRatio: "4 / 3",
                                background: "radial-gradient(900px 320px at 30% 0%, rgba(140,80,255,0.18), transparent 55%), rgba(255,255,255,0.02)",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                position: "relative"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: trader.photoUrl,
                                    alt: trader.name,
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        opacity: 0.95
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 463,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        left: 12,
                                        top: 12,
                                        display: "flex",
                                        gap: 8,
                                        flexWrap: "wrap"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                padding: "5px 10px",
                                                borderRadius: 999,
                                                border: "1px solid rgba(255,255,255,0.10)",
                                                background: "rgba(255,255,255,0.04)",
                                                fontSize: 12,
                                                opacity: 0.9,
                                                whiteSpace: "nowrap"
                                            },
                                            children: trader.style
                                        }, void 0, false, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 470,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                padding: "5px 10px",
                                                borderRadius: 999,
                                                border: "1px solid rgba(140,80,255,0.22)",
                                                background: "rgba(140,80,255,0.08)",
                                                fontSize: 12,
                                                opacity: 0.92,
                                                whiteSpace: "nowrap"
                                            },
                                            children: "Risk-first"
                                        }, void 0, false, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 483,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 469,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/app/page.tsx",
                            lineNumber: 453,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: 14,
                                display: "grid",
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 16,
                                        fontWeight: 950
                                    },
                                    children: trader.name
                                }, void 0, false, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 500,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        opacity: 0.75
                                    },
                                    children: [
                                        trader.age,
                                        " y.o. • ",
                                        trader.yearsTrading,
                                        " years trading"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 501,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 4,
                                        display: "grid",
                                        gap: 8,
                                        fontSize: 13,
                                        opacity: 0.85,
                                        lineHeight: 1.55
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "✅ Logs every trade (entry/stop/target)"
                                        }, void 0, false, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 506,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "✅ Reviews mistakes weekly"
                                        }, void 0, false, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 507,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: "✅ Measures performance in R, not vibes"
                                        }, void 0, false, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 508,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 505,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 6,
                                        padding: 12,
                                        borderRadius: 14,
                                        border: "1px solid rgba(255,255,255,0.10)",
                                        background: "rgba(255,255,255,0.02)",
                                        fontSize: 13,
                                        opacity: 0.8,
                                        lineHeight: 1.55
                                    },
                                    children: [
                                        "🧠 ",
                                        trader.note
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 511,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/app/page.tsx",
                            lineNumber: 499,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/app/page.tsx",
                    lineNumber: 444,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        borderRadius: 18,
                        border: "1px solid rgba(255,255,255,0.10)",
                        background: "rgba(255,255,255,0.02)",
                        padding: 14,
                        display: "grid",
                        gap: 12,
                        position: "relative"
                    },
                    onMouseLeave: ()=>setTip((t)=>({
                                ...t,
                                open: false
                            })),
                    children: [
                        tip.open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "fixed",
                                left: tip.x,
                                top: tip.y,
                                transform: "translate(12px, 12px)",
                                zIndex: 9999,
                                pointerEvents: "none",
                                padding: "10px 12px",
                                borderRadius: 12,
                                border: "1px solid rgba(255,255,255,0.12)",
                                background: "rgba(10,10,14,0.92)",
                                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                                minWidth: 180
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        opacity: 0.85,
                                        marginBottom: 4
                                    },
                                    children: tip.title
                                }, void 0, false, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 558,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 900
                                    },
                                    children: tip.value
                                }, void 0, false, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 559,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/app/page.tsx",
                            lineNumber: 542,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 10,
                                        alignItems: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: 950,
                                                fontSize: 14
                                            },
                                            children: "Futures PnL"
                                        }, void 0, false, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 566,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 8,
                                                alignItems: "center"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 6,
                                                        alignItems: "center"
                                                    },
                                                    children: [
                                                        "1m",
                                                        "3m",
                                                        "1y"
                                                    ].map((k)=>{
                                                        const active = k === range;
                                                        const effectiveLabel = k === "1y" && monthsAvailableUpToSelected < 12 ? "YTD" : k;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setRange(k),
                                                            style: {
                                                                height: 30,
                                                                padding: "0 10px",
                                                                borderRadius: 999,
                                                                border: active ? "1px solid rgba(255,205,80,0.35)" : "1px solid rgba(255,255,255,0.10)",
                                                                background: active ? "rgba(255,205,80,0.12)" : "rgba(255,255,255,0.03)",
                                                                color: "rgba(255,255,255,0.92)",
                                                                fontSize: 12,
                                                                cursor: "pointer",
                                                                fontWeight: active ? 900 : 700,
                                                                opacity: active ? 1 : 0.85
                                                            },
                                                            title: k === "1y" && monthsAvailableUpToSelected < 12 ? "Year-to-date (history is less than 12 months)" : undefined,
                                                            children: effectiveLabel
                                                        }, k, false, {
                                                            fileName: "[project]/web/app/page.tsx",
                                                            lineNumber: 576,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/web/app/page.tsx",
                                                    lineNumber: 570,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: goPrevMonth,
                                                    disabled: isHistoryStartMonth,
                                                    style: {
                                                        width: 34,
                                                        height: 34,
                                                        borderRadius: 10,
                                                        border: "1px solid rgba(255,255,255,0.10)",
                                                        background: "rgba(255,255,255,0.03)",
                                                        color: "rgba(255,255,255,0.9)",
                                                        cursor: isHistoryStartMonth ? "not-allowed" : "pointer",
                                                        opacity: isHistoryStartMonth ? 0.45 : 1
                                                    },
                                                    "aria-label": "Previous month",
                                                    title: isHistoryStartMonth ? "No earlier data" : "Previous month",
                                                    children: "←"
                                                }, void 0, false, {
                                                    fileName: "[project]/web/app/page.tsx",
                                                    lineNumber: 604,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        padding: "6px 10px",
                                                        borderRadius: 999,
                                                        border: "1px solid rgba(255,255,255,0.10)",
                                                        background: "rgba(255,255,255,0.03)",
                                                        fontSize: 12,
                                                        opacity: 0.92,
                                                        minWidth: 84,
                                                        textAlign: "center"
                                                    },
                                                    children: monthLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/web/app/page.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: goNextMonth,
                                                    disabled: isCurrentMonth,
                                                    style: {
                                                        width: 34,
                                                        height: 34,
                                                        borderRadius: 10,
                                                        border: "1px solid rgba(255,255,255,0.10)",
                                                        background: "rgba(255,255,255,0.03)",
                                                        color: "rgba(255,255,255,0.9)",
                                                        cursor: isCurrentMonth ? "not-allowed" : "pointer",
                                                        opacity: isCurrentMonth ? 0.45 : 1
                                                    },
                                                    "aria-label": "Next month",
                                                    title: isCurrentMonth ? "You can’t view future months" : "Next month",
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/web/app/page.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 568,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 565,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, 1fr)",
                                        gap: 10
                                    },
                                    children: [
                                        {
                                            k: "Today",
                                            v: stats.today
                                        },
                                        {
                                            k: "7d",
                                            v: stats.pnl7d
                                        },
                                        {
                                            k: "30d",
                                            v: stats.pnl30d
                                        },
                                        {
                                            k: rangeLabel,
                                            v: stats.pnlRange
                                        }
                                    ].map((it)=>{
                                        const tone = pnlTone(it.v, Math.max(1, Math.abs(stats.pnlRange)));
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: 10,
                                                borderRadius: 14,
                                                border: `1px solid ${tone.br}`,
                                                background: tone.bg,
                                                display: "grid",
                                                gap: 4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 11,
                                                        opacity: 0.75
                                                    },
                                                    children: it.k
                                                }, void 0, false, {
                                                    fileName: "[project]/web/app/page.tsx",
                                                    lineNumber: 682,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: 900,
                                                        fontSize: 13,
                                                        color: tone.text
                                                    },
                                                    children: fmtMoney(it.v)
                                                }, void 0, false, {
                                                    fileName: "[project]/web/app/page.tsx",
                                                    lineNumber: 683,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, it.k, true, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 671,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 662,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/app/page.tsx",
                            lineNumber: 564,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: 950,
                                                fontSize: 13,
                                                opacity: 0.9
                                            },
                                            children: "Daily PnL"
                                        }, void 0, false, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 693,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 12,
                                                opacity: 0.65
                                            },
                                            children: "S M T W T F S"
                                        }, void 0, false, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 694,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 692,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pnlCalendarGrid",
                                    style: {
                                        marginTop: 10,
                                        display: "grid",
                                        gridTemplateColumns: "repeat(7, 1fr)",
                                        gap: 8
                                    },
                                    children: [
                                        Array.from({
                                            length: leadingEmpty
                                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 44,
                                                    borderRadius: 10,
                                                    border: "1px solid rgba(255,255,255,0.06)",
                                                    background: "rgba(255,255,255,0.02)",
                                                    opacity: 0.35
                                                }
                                            }, `e-${i}`, false, {
                                                fileName: "[project]/web/app/page.tsx",
                                                lineNumber: 707,
                                                columnNumber: 17
                                            }, this)),
                                        dailyPnlVisible.map((v, idx)=>{
                                            const day = idx + 1;
                                            const tone = pnlTone(v, maxAbs);
                                            const isToday = isThisMonth && day === todayDay;
                                            const labelDate = `${monthLabel}-${String(day).padStart(2, "0")}`;
                                            const cellValue = v === undefined ? "No trades" : fmtMoney(v);
                                            const displaySmall = v === undefined ? "" : (v > 0 ? "+" : "") + (Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(2));
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 44,
                                                    borderRadius: 10,
                                                    border: isToday ? "1px solid rgba(255,205,80,0.45)" : `1px solid ${tone.br}`,
                                                    boxShadow: isToday ? "0 0 0 2px rgba(255,205,80,0.10) inset" : undefined,
                                                    background: tone.bg,
                                                    padding: "6px 8px",
                                                    display: "grid",
                                                    alignContent: "space-between",
                                                    cursor: "default"
                                                },
                                                onMouseEnter: (e)=>{
                                                    setTip({
                                                        open: true,
                                                        x: e.clientX,
                                                        y: e.clientY,
                                                        title: labelDate,
                                                        value: cellValue
                                                    });
                                                },
                                                onMouseMove: (e)=>setTip((t)=>t.open ? {
                                                            ...t,
                                                            x: e.clientX,
                                                            y: e.clientY
                                                        } : t),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 11,
                                                            opacity: 0.75
                                                        },
                                                        children: [
                                                            day,
                                                            isToday ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    marginLeft: 6,
                                                                    opacity: 0.85
                                                                },
                                                                children: "• today"
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/app/page.tsx",
                                                                lineNumber: 750,
                                                                columnNumber: 34
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web/app/page.tsx",
                                                        lineNumber: 748,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 800,
                                                            color: tone.text
                                                        },
                                                        children: displaySmall
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/app/page.tsx",
                                                        lineNumber: 752,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, day, true, {
                                                fileName: "[project]/web/app/page.tsx",
                                                lineNumber: 730,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 697,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 10,
                                        fontSize: 12,
                                        opacity: 0.72,
                                        lineHeight: 1.5
                                    },
                                    children: "The calendar reveals streaks, revenge days, and risk spikes — the stuff you actually need to fix."
                                }, void 0, false, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 758,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/app/page.tsx",
                            lineNumber: 691,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/app/page.tsx",
                    lineNumber: 529,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/app/page.tsx",
            lineNumber: 434,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/app/page.tsx",
        lineNumber: 433,
        columnNumber: 5
    }, this);
}
_s(TraderCalendarPanel, "6LK1/C/2ing8EqS0TYNITwJs9CE=");
_c3 = TraderCalendarPanel;
function HomePage() {
    _s1();
    const year = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[year]": ()=>new Date().getFullYear()
    }["HomePage.useMemo[year]"], []);
    const t = copy;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Page"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$marketing$2f$Background3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Background3D"], {}, void 0, false, {
                fileName: "[project]/web/app/page.tsx",
                lineNumber: 774,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    zIndex: 1
                },
                className: "jsx-6fd383b431260eb2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderRow"], {
                        title: "TradeLog",
                        subtitle: "Journal your crypto trades. Trade with data, not emotions.",
                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 8,
                                flexWrap: "wrap"
                            },
                            className: "jsx-6fd383b431260eb2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    style: {
                                        textDecoration: "none"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "secondary",
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 783,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 782,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/register",
                                    style: {
                                        textDecoration: "none"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "primary",
                                        children: "Registration"
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 786,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 785,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/app/page.tsx",
                            lineNumber: 781,
                            columnNumber: 13
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/web/app/page.tsx",
                        lineNumber: 777,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1.2fr 1fr",
                            gap: 16,
                            alignItems: "stretch",
                            marginTop: 10
                        },
                        className: "jsx-6fd383b431260eb2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: 22,
                                    borderRadius: 22,
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    background: "radial-gradient(1200px 400px at 10% 10%, rgba(140,80,255,0.16), transparent 50%), rgba(255,255,255,0.02)"
                                },
                                className: "jsx-6fd383b431260eb2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 8,
                                            flexWrap: "wrap",
                                            marginBottom: 12,
                                            alignItems: "center"
                                        },
                                        className: "jsx-6fd383b431260eb2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                children: "Crypto only"
                                            }, void 0, false, {
                                                fileName: "[project]/web/app/page.tsx",
                                                lineNumber: 812,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                children: "No exchange API"
                                            }, void 0, false, {
                                                fileName: "[project]/web/app/page.tsx",
                                                lineNumber: 813,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                children: "📈 R-based stats"
                                            }, void 0, false, {
                                                fileName: "[project]/web/app/page.tsx",
                                                lineNumber: 814,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                children: "Win / Loss / BE"
                                            }, void 0, false, {
                                                fileName: "[project]/web/app/page.tsx",
                                                lineNumber: 815,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                children: "🧠 Psychology notes"
                                            }, void 0, false, {
                                                fileName: "[project]/web/app/page.tsx",
                                                lineNumber: 816,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 811,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 44,
                                            fontWeight: 950,
                                            letterSpacing: -0.8,
                                            lineHeight: 1.05
                                        },
                                        className: "jsx-6fd383b431260eb2",
                                        children: t.heroTitle
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 819,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 12,
                                            ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ui"].subtle,
                                            fontSize: 14,
                                            lineHeight: 1.6
                                        },
                                        className: "jsx-6fd383b431260eb2",
                                        children: t.heroSub
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 821,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 10,
                                            flexWrap: "wrap",
                                            marginTop: 16
                                        },
                                        className: "jsx-6fd383b431260eb2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/register",
                                                style: {
                                                    textDecoration: "none"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "primary",
                                                    children: "Registration"
                                                }, void 0, false, {
                                                    fileName: "[project]/web/app/page.tsx",
                                                    lineNumber: 825,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web/app/page.tsx",
                                                lineNumber: 824,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/login",
                                                style: {
                                                    textDecoration: "none"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "secondary",
                                                    children: "Login"
                                                }, void 0, false, {
                                                    fileName: "[project]/web/app/page.tsx",
                                                    lineNumber: 828,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/web/app/page.tsx",
                                                lineNumber: 827,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 823,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 10,
                                            opacity: 0.75,
                                            fontSize: 12,
                                            lineHeight: 1.5
                                        },
                                        className: "jsx-6fd383b431260eb2",
                                        children: "No exchange connection • No spreadsheets • Your data stays yours"
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 832,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/app/page.tsx",
                                lineNumber: 802,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: "100%",
                                    display: "flex",
                                    minHeight: 0
                                },
                                className: "jsx-6fd383b431260eb2" + " " + "mockDashboardWrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        display: "flex",
                                        minHeight: 0
                                    },
                                    className: "jsx-6fd383b431260eb2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$marketing$2f$DashboardWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardWindow"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$app$2f$components$2f$marketing$2f$MockDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MockDashboard"], {}, void 0, false, {
                                            fileName: "[project]/web/app/page.tsx",
                                            lineNumber: 841,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 840,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/web/app/page.tsx",
                                    lineNumber: 839,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web/app/page.tsx",
                                lineNumber: 838,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/app/page.tsx",
                        lineNumber: 793,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 18
                        },
                        className: "jsx-6fd383b431260eb2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TraderCalendarPanel, {}, void 0, false, {
                            fileName: "[project]/web/app/page.tsx",
                            lineNumber: 849,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/web/app/page.tsx",
                        lineNumber: 848,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 10
                        },
                        className: "jsx-6fd383b431260eb2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 18,
                                    fontWeight: 950,
                                    marginBottom: 10
                                },
                                className: "jsx-6fd383b431260eb2",
                                children: "How it works"
                            }, void 0, false, {
                                fileName: "[project]/web/app/page.tsx",
                                lineNumber: 854,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 12,
                                    alignItems: "stretch"
                                },
                                className: "jsx-6fd383b431260eb2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Step, {
                                        n: "1",
                                        title: t.how1,
                                        text: t.how1Text
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 856,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Step, {
                                        n: "2",
                                        title: t.how2,
                                        text: t.how2Text
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 857,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Step, {
                                        n: "3",
                                        title: t.how3,
                                        text: t.how3Text
                                    }, void 0, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 858,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/app/page.tsx",
                                lineNumber: 855,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/app/page.tsx",
                        lineNumber: 853,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 44
                        },
                        className: "jsx-6fd383b431260eb2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 950,
                                    marginBottom: 14,
                                    paddingLeft: 4
                                },
                                className: "jsx-6fd383b431260eb2",
                                children: t.featuresTitle
                            }, void 0, false, {
                                fileName: "[project]/web/app/page.tsx",
                                lineNumber: 864,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 12,
                                    alignItems: "stretch"
                                },
                                className: "jsx-6fd383b431260eb2",
                                children: t.features.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Feature, {
                                        title: f.title,
                                        subtitle: f.subtitle,
                                        points: f.points
                                    }, f.title, false, {
                                        fileName: "[project]/web/app/page.tsx",
                                        lineNumber: 867,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/web/app/page.tsx",
                                lineNumber: 865,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/app/page.tsx",
                        lineNumber: 863,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 14,
                            opacity: 0.6,
                            fontSize: 12,
                            display: "flex",
                            justifyContent: "center"
                        },
                        className: "jsx-6fd383b431260eb2",
                        children: [
                            "© ",
                            year,
                            " TradeLog"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/app/page.tsx",
                        lineNumber: 873,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "6fd383b431260eb2",
                        children: '.mockDashboardWrap.jsx-6fd383b431260eb2 [class*=demo],.mockDashboardWrap.jsx-6fd383b431260eb2 [data-demo],.mockDashboardWrap.jsx-6fd383b431260eb2 .demo,.mockDashboardWrap.jsx-6fd383b431260eb2 .demoData{display:none!important}.mockDashboardWrap.jsx-6fd383b431260eb2{height:100%}.mockDashboardWrap.jsx-6fd383b431260eb2 *{min-height:0}.pnlLine.jsx-6fd383b431260eb2,.rLine.jsx-6fd383b431260eb2,.rGlow.jsx-6fd383b431260eb2{stroke-dasharray:900;stroke-dashoffset:900px;animation:1.25s forwards drawLine}.pnlLine.jsx-6fd383b431260eb2{opacity:0;animation-name:drawPnl;animation-duration:1.05s;animation-delay:50ms}.rGlow.jsx-6fd383b431260eb2{filter:blur(6px);animation-delay:.18s}.rLine.jsx-6fd383b431260eb2{animation-delay:.18s}.pnlRGrid.jsx-6fd383b431260eb2 svg.jsx-6fd383b431260eb2 circle.jsx-6fd383b431260eb2{opacity:0;animation:.35s .95s forwards fadeDots}@keyframes drawLine{to{stroke-dashoffset:0}}@keyframes drawPnl{0%{stroke-dashoffset:900px;opacity:0}20%{opacity:1}to{stroke-dashoffset:0;opacity:1}}@keyframes fadeDots{to{opacity:.9}}@media (width<=980px){div[style*="grid-template-columns: 1.2fr 1fr"].jsx-6fd383b431260eb2,div[style*="grid-template-columns: repeat(3, 1fr)"].jsx-6fd383b431260eb2,.traderPanelGrid.jsx-6fd383b431260eb2{grid-template-columns:1fr!important}}'
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/app/page.tsx",
                lineNumber: 776,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/app/page.tsx",
        lineNumber: 773,
        columnNumber: 5
    }, this);
}
_s1(HomePage, "CgS6aVOjz8/g/+fFhZ1R0q+UxcA=");
_c4 = HomePage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "Feature");
__turbopack_context__.k.register(_c2, "Step");
__turbopack_context__.k.register(_c3, "TraderCalendarPanel");
__turbopack_context__.k.register(_c4, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=web_app_34c990ff._.js.map