// ==UserScript==
// @name         Kirka Presets - Kirka UI V4
// @namespace    kirka-presets-v4
// @version      4.1
// @description  Kirka-native-style preset panel for Dawn Client
// @match        *://kirka.io/*
// @grant        none
// ==/UserScript==

(() => {
    "use strict";

    const PANEL_ID = "kirka-preset-panel-v4";
    const STYLE_ID = "kirka-preset-style-v4";
    const STORAGE_KEY = "kirka_presets_kirka_ui_v4";
    const POSITION_KEY = "kirka_presets_position_v4";

    // ------------------------------------------------------------
    // DEFAULT PRESETS
    // ------------------------------------------------------------

    const DEFAULT_PRESETS = [
        {
            name: "BUMP",
            message: "/trade bump",
            color: "#697985"
        },
        {
            name: "CANCEL",
            message: "/trade cancel",
            color: "#16b8d4"
        },
        {
            name: "QUACK",
            message: "quack",
            color: "#55b85a"
        },
        {
            name: "INV",
            message: "/inv",
            color: "#7657b8"
        },
        {
            name: "QUACK",
            message: "quack",
            color: "#e39a36"
        },
        {
            name: "LF",
            message: "lf",
            color: "#d94a45"
        }
    ];

    // ------------------------------------------------------------
    // STORAGE
    // ------------------------------------------------------------

    function loadPresets() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (!saved) {
                return DEFAULT_PRESETS.map(p => ({ ...p }));
            }

            const parsed = JSON.parse(saved);

            if (!Array.isArray(parsed)) {
                return DEFAULT_PRESETS.map(p => ({ ...p }));
            }

            return parsed.map((p, i) => ({
                name: String(p.name || `PRESET ${i + 1}`),
                message: String(p.message || ""),
                color: String(p.color || "#697985")
            }));
        } catch {
            return DEFAULT_PRESETS.map(p => ({ ...p }));
        }
    }

    function savePresets() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
        } catch {}
    }

    let presets = loadPresets();

    // ------------------------------------------------------------
    // STYLE
    // ------------------------------------------------------------

    function addStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;

        style.textContent = `
            /* =========================================================
               KIRKA NATIVE-STYLE PRESET PANEL
               Designed to visually match the panel shown in the reference:
               compact, squared, dark blue/slate UI, clean sans-serif type.
               ========================================================= */

            #${PANEL_ID} {
                position: fixed;
                left: 28px;
                top: 218px;
                width: 220px;
                z-index: 2147483647;

                background: #263642;
                border: 3px solid #111a22;
                color: #fff;

                box-shadow:
                    4px 5px 0 rgba(9, 15, 21, .85),
                    inset 0 0 0 1px #52616d;

                font-family:
                    Inter,
                    Roboto,
                    "Segoe UI",
                    Arial,
                    sans-serif;

                user-select: none;
                box-sizing: border-box;
            }

            #${PANEL_ID} * {
                box-sizing: border-box;
            }

            /* HEADER — compact Kirka-like tab */

            #${PANEL_ID} .kp-header {
                height: 43px;
                display: flex;
                align-items: center;

                background: #344653;
                border-bottom: 3px solid #111a22;

                cursor: move;
            }

            #${PANEL_ID} .kp-home {
                width: 39px;
                height: 40px;

                display: flex;
                align-items: center;
                justify-content: center;

                background: #202f3a;
                border-right: 2px solid #111a22;
                flex-shrink: 0;
            }

            #${PANEL_ID} .kp-home svg {
                width: 22px;
                height: 22px;
                fill: #fff;
                filter: drop-shadow(1px 1px 0 #111a22);
            }

            #${PANEL_ID} .kp-title {
                flex: 1;
                min-width: 0;
                padding-left: 10px;

                color: #fff;
                font-family:
                    Inter,
                    Roboto,
                    "Segoe UI",
                    Arial,
                    sans-serif;

                font-size: 22px;
                line-height: 1;
                font-weight: 800;
                letter-spacing: .2px;

                text-shadow: 2px 2px 0 #111a22;
            }

            #${PANEL_ID} .kp-close {
                width: 39px;
                height: 40px;

                display: flex;
                align-items: center;
                justify-content: center;

                border: 0;
                border-left: 2px solid #111a22;
                border-radius: 0;

                background: #d94743;
                color: #fff;

                font-family: Arial, sans-serif;
                font-size: 28px;
                font-weight: 800;
                line-height: 1;

                cursor: pointer;

                text-shadow: 2px 2px 0 #7b211f;
            }

            #${PANEL_ID} .kp-close:hover {
                background: #e64b47;
            }

            #${PANEL_ID} .kp-close:active {
                transform: translateY(1px);
            }

            /* CONTENT */

            #${PANEL_ID} .kp-body {
                padding: 7px;
                background: #263642;
            }

            #${PANEL_ID} .kp-row {
                display: flex;
                width: 100%;
                height: 31px;
                margin-bottom: 5px;
                gap: 4px;
            }

            /* MAIN PRESET BUTTON */

            #${PANEL_ID} .kp-main {
                flex: 1;
                min-width: 0;

                height: 31px;
                padding: 0 7px;

                border: 2px solid #111a22;
                border-radius: 0;

                color: #fff;
                font-family:
                    Inter,
                    Roboto,
                    "Segoe UI",
                    Arial,
                    sans-serif;

                font-size: 14px;
                line-height: 27px;
                font-weight: 800;
                letter-spacing: .15px;

                text-align: center;
                cursor: pointer;

                text-shadow: 1px 1px 0 rgba(0,0,0,.72);

                box-shadow:
                    inset 0 1px 0 rgba(255,255,255,.14),
                    2px 2px 0 #111a22;

                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                transition:
                    filter 70ms linear,
                    transform 70ms linear;
            }

            #${PANEL_ID} .kp-main:hover {
                filter: brightness(1.10);
            }

            #${PANEL_ID} .kp-main:active {
                transform: translate(1px, 1px);
                box-shadow:
                    inset 0 1px 0 rgba(255,255,255,.08),
                    1px 1px 0 #111a22;
            }

            /* SMALL E BUTTON */

            #${PANEL_ID} .kp-edit {
                width: 31px;
                height: 31px;
                flex-shrink: 0;

                border: 2px solid #111a22;
                border-radius: 0;

                background: #455662;
                color: #fff;

                font-family:
                    Inter,
                    Roboto,
                    "Segoe UI",
                    Arial,
                    sans-serif;

                font-size: 14px;
                font-weight: 800;

                cursor: pointer;
                text-shadow: 1px 1px 0 #111a22;

                box-shadow:
                    inset 0 1px 0 rgba(255,255,255,.12),
                    2px 2px 0 #111a22;
            }

            #${PANEL_ID} .kp-edit:hover {
                background: #526572;
            }

            /* DELETE X */

            #${PANEL_ID} .kp-delete {
                width: 31px;
                height: 31px;
                flex-shrink: 0;

                border: 2px solid #111a22;
                border-radius: 0;

                background: #c8413e;
                color: #fff;

                font-family: Arial, sans-serif;
                font-size: 21px;
                font-weight: 900;
                line-height: 24px;

                cursor: pointer;
                text-shadow: 1px 1px 0 #751d1c;

                box-shadow:
                    inset 0 1px 0 rgba(255,255,255,.12),
                    2px 2px 0 #111a22;
            }

            #${PANEL_ID} .kp-delete:hover {
                background: #df4945;
            }

            /* ADD PRESET */

            #${PANEL_ID} .kp-add {
                width: 100%;
                height: 39px;
                margin-top: 2px;

                border: 3px solid #111a22;
                border-radius: 0;

                background: #4b6170;
                color: #fff;

                font-family:
                    Inter,
                    Roboto,
                    "Segoe UI",
                    Arial,
                    sans-serif;

                font-size: 15px;
                font-weight: 800;
                letter-spacing: .35px;

                cursor: pointer;

                text-shadow:
                    1px 1px 0 #17212a;

                box-shadow:
                    inset 0 1px 0 rgba(255,255,255,.14),
                    3px 3px 0 #111a22;
            }

            #${PANEL_ID} .kp-add:hover {
                background: #566d7c;
            }

            #${PANEL_ID} .kp-add:active {
                transform: translate(1px, 1px);
                box-shadow:
                    inset 0 1px 0 rgba(255,255,255,.08),
                    1px 1px 0 #111a22;
            }

            /* EDITOR — same visual language */

            #${PANEL_ID} .kp-editor {
                position: absolute;
                left: 228px;
                top: 0;

                width: 265px;
                padding: 9px;

                background: #263642;
                border: 3px solid #111a22;

                box-shadow:
                    4px 5px 0 rgba(9,15,21,.85),
                    inset 0 0 0 1px #52616d;

                display: none;
            }

            #${PANEL_ID} .kp-editor.show {
                display: block;
            }

            #${PANEL_ID} .kp-editor-title {
                height: 32px;
                margin-bottom: 8px;
                padding-left: 8px;

                display: flex;
                align-items: center;

                background: #344653;
                border: 2px solid #111a22;

                color: #fff;

                font-family:
                    Inter,
                    Roboto,
                    "Segoe UI",
                    Arial,
                    sans-serif;

                font-size: 16px;
                font-weight: 800;

                text-shadow: 1px 1px 0 #111a22;
            }

            #${PANEL_ID} .kp-label {
                display: block;
                margin: 5px 0 3px;

                color: #dce5ea;

                font-family:
                    Inter,
                    Roboto,
                    "Segoe UI",
                    Arial,
                    sans-serif;

                font-size: 12px;
                font-weight: 800;

                text-shadow: 1px 1px 0 #111a22;
            }

            #${PANEL_ID} .kp-input,
            #${PANEL_ID} .kp-select {
                width: 100%;
                height: 32px;

                border: 2px solid #111a22;
                border-radius: 0;

                background: #17242d;
                color: #fff;

                outline: none;
                padding: 3px 7px;

                font-family:
                    Inter,
                    Roboto,
                    "Segoe UI",
                    Arial,
                    sans-serif;

                font-size: 14px;
                font-weight: 600;
            }

            #${PANEL_ID} .kp-input:focus,
            #${PANEL_ID} .kp-select:focus {
                border-color: #718896;
            }

            #${PANEL_ID} .kp-editor-buttons {
                display: flex;
                gap: 5px;
                margin-top: 10px;
            }

            #${PANEL_ID} .kp-save,
            #${PANEL_ID} .kp-cancel {
                flex: 1;
                height: 34px;

                border: 2px solid #111a22;
                border-radius: 0;

                color: #fff;

                font-family:
                    Inter,
                    Roboto,
                    "Segoe UI",
                    Arial,
                    sans-serif;

                font-size: 14px;
                font-weight: 800;

                cursor: pointer;
                text-shadow: 1px 1px 0 #111a22;
            }

            #${PANEL_ID} .kp-save {
                background: #55a85b;
            }

            #${PANEL_ID} .kp-cancel {
                background: #c8413e;
            }

            #${PANEL_ID} .kp-save:hover,
            #${PANEL_ID} .kp-cancel:hover {
                filter: brightness(1.10);
            }

            #${PANEL_ID}.kp-hidden {
                display: none !important;
            }
        `;

        document.head.appendChild(style);
    }

    // ------------------------------------------------------------
    // CHAT
    // ------------------------------------------------------------

    function chatInput() {
        const list = document.querySelectorAll("input, textarea");
        const visible = [];

        for (const el of list) {
            const rect = el.getBoundingClientRect();
            const style = getComputedStyle(el);

            if (
                rect.width > 0 &&
                rect.height > 0 &&
                style.display !== "none" &&
                style.visibility !== "hidden"
            ) {
                visible.push(el);
            }
        }

        if (!visible.length) return null;

        for (const el of visible) {
            const text =
                `${el.placeholder || ""} ${el.getAttribute("aria-label") || ""}`
                    .toLowerCase();

            if (
                text.includes("chat") ||
                text.includes("message")
            ) {
                return el;
            }
        }

        return visible[visible.length - 1];
    }

    function sendChat(message) {
        const input = chatInput();

        if (!input) {
            console.warn("[Kirka Presets] Chat input not found.");
            return false;
        }

        try {
            input.focus();

            const setter =
                Object.getOwnPropertyDescriptor(
                    HTMLInputElement.prototype,
                    "value"
                )?.set ||
                Object.getOwnPropertyDescriptor(
                    HTMLTextAreaElement.prototype,
                    "value"
                )?.set;

            if (setter) {
                setter.call(input, message);
            } else {
                input.value = message;
            }

            input.dispatchEvent(
                new Event("input", {
                    bubbles: true
                })
            );

            input.dispatchEvent(
                new Event("change", {
                    bubbles: true
                })
            );

            setTimeout(() => {
                input.dispatchEvent(
                    new KeyboardEvent("keydown", {
                        key: "Enter",
                        code: "Enter",
                        keyCode: 13,
                        which: 13,
                        bubbles: true,
                        cancelable: true
                    })
                );

                input.dispatchEvent(
                    new KeyboardEvent("keyup", {
                        key: "Enter",
                        code: "Enter",
                        keyCode: 13,
                        which: 13,
                        bubbles: true
                    })
                );
            }, 60);

            return true;
        } catch (error) {
            console.error(
                "[Kirka Presets] Failed to send chat:",
                error
            );

            return false;
        }
    }

    // ------------------------------------------------------------
    // PANEL
    // ------------------------------------------------------------

    let panel = null;
    let editor = null;
    let editingIndex = -1;

    function createPanel() {
        if (document.getElementById(PANEL_ID)) {
            panel = document.getElementById(PANEL_ID);
            return panel;
        }

        addStyle();

        panel = document.createElement("div");
        panel.id = PANEL_ID;

        // Header
        const header = document.createElement("div");
        header.className = "kp-header";

        const home = document.createElement("div");
        home.className = "kp-home";

        home.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="
                    M12 3
                    L3 10
                    V21
                    H9
                    V15
                    H15
                    V21
                    H21
                    V10
                    Z
                "/>
            </svg>
        `;

        const title = document.createElement("div");
        title.className = "kp-title";
        title.textContent = "PRESETS";

        const close = document.createElement("button");
        close.className = "kp-close";
        close.type = "button";
        close.textContent = "×";
        close.title = "Close";

        header.appendChild(home);
        header.appendChild(title);
        header.appendChild(close);

        // Body
        const body = document.createElement("div");
        body.className = "kp-body";

        const rows = document.createElement("div");
        rows.className = "kp-rows";

        const addButton = document.createElement("button");
        addButton.className = "kp-add";
        addButton.type = "button";
        addButton.textContent = "ADD PRESET";

        body.appendChild(rows);
        body.appendChild(addButton);

        panel.appendChild(header);
        panel.appendChild(body);

        // Editor
        editor = createEditor();

        panel.appendChild(editor);

        document.body.appendChild(panel);

        restorePosition();

        close.addEventListener("click", () => {
            panel.classList.add("kp-hidden");
            hideEditor();
        });

        addButton.addEventListener("click", () => {
            openEditor(-1);
        });

        setupDragging(header);

        renderRows();

        return panel;
    }

    // ------------------------------------------------------------
    // RENDER ROWS
    // ------------------------------------------------------------

    function renderRows() {
        if (!panel) return;

        const rows = panel.querySelector(".kp-rows");
        if (!rows) return;

        rows.innerHTML = "";

        presets.forEach((preset, index) => {
            const row = document.createElement("div");
            row.className = "kp-row";

            const main = document.createElement("button");
            main.className = "kp-main";
            main.type = "button";

            main.textContent = preset.name || `PRESET ${index + 1}`;
            main.title = preset.message || "";

            main.style.background = preset.color || "#697985";

            main.addEventListener("click", () => {
                if (preset.message) {
                    sendChat(preset.message);
                }
            });

            const edit = document.createElement("button");
            edit.className = "kp-edit";
            edit.type = "button";
            edit.textContent = "E";
            edit.title = "Edit preset";

            edit.addEventListener("click", event => {
                event.stopPropagation();
                openEditor(index);
            });

            const del = document.createElement("button");
            del.className = "kp-delete";
            del.type = "button";
            del.textContent = "×";
            del.title = "Delete preset";

            del.addEventListener("click", event => {
                event.stopPropagation();

                const name =
                    preset.name ||
                    `PRESET ${index + 1}`;

                if (!confirm(`Delete "${name}"?`)) {
                    return;
                }

                presets.splice(index, 1);
                savePresets();
                hideEditor();
                renderRows();
            });

            row.appendChild(main);
            row.appendChild(edit);
            row.appendChild(del);

            rows.appendChild(row);
        });
    }

    // ------------------------------------------------------------
    // EDITOR
    // ------------------------------------------------------------

    function createEditor() {
        const box = document.createElement("div");
        box.className = "kp-editor";

        box.innerHTML = `
            <div class="kp-editor-title">
                EDIT PRESET
            </div>

            <label class="kp-label">
                NAME
            </label>

            <input
                class="kp-input kp-name"
                type="text"
                maxlength="24"
                autocomplete="off"
            >

            <label class="kp-label">
                MESSAGE
            </label>

            <input
                class="kp-input kp-message"
                type="text"
                maxlength="150"
                autocomplete="off"
            >

            <label class="kp-label">
                BUTTON COLOR
            </label>

            <select class="kp-select kp-color">
                <option value="#697985">GRAY / BLUE</option>
                <option value="#16b8d4">CYAN</option>
                <option value="#55b85a">GREEN</option>
                <option value="#7657b8">PURPLE</option>
                <option value="#e39a36">ORANGE</option>
                <option value="#d94a45">RED</option>
            </select>

            <div class="kp-editor-buttons">
                <button class="kp-save" type="button">
                    SAVE
                </button>

                <button class="kp-cancel" type="button">
                    CANCEL
                </button>
            </div>
        `;

        box.querySelector(".kp-save").addEventListener(
            "click",
            saveEditor
        );

        box.querySelector(".kp-cancel").addEventListener(
            "click",
            hideEditor
        );

        return box;
    }

    function openEditor(index) {
        if (!editor) return;

        editingIndex = index;

        const nameInput =
            editor.querySelector(".kp-name");

        const messageInput =
            editor.querySelector(".kp-message");

        const colorInput =
            editor.querySelector(".kp-color");

        if (index === -1) {
            editor.querySelector(".kp-editor-title").textContent =
                "ADD PRESET";

            nameInput.value = "";
            messageInput.value = "";
            colorInput.value = getNextColor();
        } else {
            editor.querySelector(".kp-editor-title").textContent =
                "EDIT PRESET";

            const preset = presets[index];

            nameInput.value = preset.name;
            messageInput.value = preset.message;
            colorInput.value = preset.color || "#697985";
        }

        editor.classList.add("show");

        setTimeout(() => {
            nameInput.focus();
            nameInput.select();
        }, 20);
    }

    function hideEditor() {
        if (!editor) return;

        editor.classList.remove("show");
        editingIndex = -1;
    }

    function saveEditor() {
        if (!editor) return;

        const name =
            editor.querySelector(".kp-name").value.trim();

        const message =
            editor.querySelector(".kp-message").value.trim();

        const color =
            editor.querySelector(".kp-color").value;

        if (!name) {
            alert("Enter a preset name.");
            return;
        }

        if (!message) {
            alert("Enter a message.");
            return;
        }

        if (editingIndex === -1) {
            presets.push({
                name,
                message,
                color
            });
        } else if (presets[editingIndex]) {
            presets[editingIndex] = {
                name,
                message,
                color
            };
        }

        savePresets();
        renderRows();
        hideEditor();
    }

    function getNextColor() {
        const colors = [
            "#697985",
            "#16b8d4",
            "#55b85a",
            "#7657b8",
            "#e39a36",
            "#d94a45"
        ];

        return colors[presets.length % colors.length];
    }

    // ------------------------------------------------------------
    // DRAGGING
    // ------------------------------------------------------------

    function setupDragging(header) {
        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;

        header.addEventListener("mousedown", event => {
            if (event.target.closest("button")) return;

            dragging = true;

            const rect = panel.getBoundingClientRect();

            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;

            event.preventDefault();
        });

        document.addEventListener("mousemove", event => {
            if (!dragging) return;

            const maxX =
                Math.max(
                    0,
                    window.innerWidth - panel.offsetWidth
                );

            const maxY =
                Math.max(
                    0,
                    window.innerHeight - panel.offsetHeight
                );

            let x = event.clientX - offsetX;
            let y = event.clientY - offsetY;

            x = Math.max(0, Math.min(x, maxX));
            y = Math.max(0, Math.min(y, maxY));

            panel.style.left = `${x}px`;
            panel.style.top = `${y}px`;
        });

        document.addEventListener("mouseup", () => {
            if (!dragging) return;

            dragging = false;

            savePosition();
        });
    }

    function savePosition() {
        if (!panel) return;

        try {
            localStorage.setItem(
                POSITION_KEY,
                JSON.stringify({
                    left: panel.offsetLeft,
                    top: panel.offsetTop
                })
            );
        } catch {}
    }

    function restorePosition() {
        if (!panel) return;

        try {
            const saved =
                localStorage.getItem(POSITION_KEY);

            if (!saved) return;

            const pos = JSON.parse(saved);

            if (
                Number.isFinite(pos.left) &&
                Number.isFinite(pos.top)
            ) {
                panel.style.left = `${Math.max(
                    0,
                    Math.min(
                        pos.left,
                        window.innerWidth - panel.offsetWidth
                    )
                )}px`;

                panel.style.top = `${Math.max(
                    0,
                    Math.min(
                        pos.top,
                        window.innerHeight - panel.offsetHeight
                    )
                )}px`;
            }
        } catch {}
    }

    // ------------------------------------------------------------
    // KEYBOARD SHORTCUT
    // ` = OPEN / CLOSE
    // ------------------------------------------------------------

    function setupShortcut() {
        window.addEventListener(
            "keydown",
            event => {
                if (event.key !== "`" && event.code !== "Backquote") {
                    return;
                }

                const target = event.target;

                if (
                    target &&
                    (
                        target.tagName === "INPUT" ||
                        target.tagName === "TEXTAREA" ||
                        target.isContentEditable
                    )
                ) {
                    return;
                }

                event.preventDefault();

                if (!panel) {
                    createPanel();
                    return;
                }

                panel.classList.toggle("kp-hidden");

                if (panel.classList.contains("kp-hidden")) {
                    hideEditor();
                }
            },
            true
        );
    }

    // ------------------------------------------------------------
    // INITIALIZE
    // ------------------------------------------------------------

    function init() {
        if (!document.body) {
            setTimeout(init, 100);
            return;
        }

        createPanel();
        setupShortcut();

        console.log(
            "%c[Kirka Presets V4]%c Loaded",
            "color:#55b85a;font-weight:bold",
            "color:white"
        );
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();