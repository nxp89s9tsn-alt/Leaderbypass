import { app } from "../../../scripts/app.js";

const EXT_NAME = "leader.custom.nodew.stable.v4.ui";
const TARGET_CLASS = "LeaderCustomNodew";
const STORAGE_KEY = "leader_custom_nodew_v4_license_key";
const TELEGRAM_URL = "https://t.me/+tpCbrHNfVgoxZDMy";

function injectStyles() {
  if (document.getElementById("leader-custom-nodew-stable-v4-styles")) return;
  const style = document.createElement("style");
  style.id = "leader-custom-nodew-stable-v4-styles";
  style.textContent = `
    .lcn-shell{box-sizing:border-box;width:100%;min-height:680px;padding:12px;overflow:hidden;border-radius:22px;color:#eef2ff;position:relative;background:radial-gradient(circle at 10% 10%, rgba(102,126,234,.16), transparent 28%),radial-gradient(circle at 88% 12%, rgba(255,255,255,.06), transparent 24%),linear-gradient(180deg,#0b0e15 0%,#090b11 100%);border:1px solid rgba(255,255,255,.07);box-shadow:0 24px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.05);font-family:Inter,system-ui,sans-serif}
    .lcn-shell::before{content:"";position:absolute;inset:-40%;background:conic-gradient(from 0deg, rgba(127,90,240,.08), rgba(46,213,255,.06), rgba(255,255,255,.03), rgba(127,90,240,.08));animation:lcnspin 18s linear infinite;pointer-events:none;filter:blur(24px)}
    @keyframes lcnspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .lcn-shell>*{position:relative;z-index:1}
    .lcn-auth-only .lcn-main{display:none} .lcn-unlocked .lcn-auth{display:none}
    .lcn-topbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}
    .lcn-brand{display:flex;align-items:center;gap:12px}
    .lcn-brand-badge{width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,#f6f7fb,#bfc8ff 58%,#6a7dff);color:#0d1018;display:grid;place-items:center;font-weight:900;font-size:15px;box-shadow:0 12px 22px rgba(106,125,255,.28)}
    .lcn-brand-title{font-size:15px;font-weight:800;letter-spacing:.02em} .lcn-brand-sub{font-size:11px;color:#9ea7bd}
    .lcn-status-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    .lcn-chip{padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);font-size:11px;color:#aab2c5;backdrop-filter:blur(10px)}
    .lcn-chip.ok{color:#82f2a7} .lcn-chip.bad{color:#ff9ba6}
    .lcn-key-chip{position:relative;padding:8px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.025));font-size:11px;color:#dfe5f7;min-width:220px;text-align:center;letter-spacing:.06em;cursor:default;user-select:none}
    .lcn-key-chip .masked{display:block} .lcn-key-chip .real{display:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .lcn-key-chip:hover .masked{display:none} .lcn-key-chip:hover .real{display:block}
    .lcn-panel{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:12px;backdrop-filter:blur(10px)}
    .lcn-auth-card{min-height:640px;display:flex;flex-direction:column;justify-content:center;background:radial-gradient(circle at top center, rgba(255,255,255,.04), transparent 28%),rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:18px}
    .lcn-grid{display:grid;gap:12px} .lcn-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px} .lcn-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
    .lcn-field{display:flex;flex-direction:column;gap:7px} .lcn-field label{font-size:11px;letter-spacing:.02em;color:#96a0b8}
    .lcn-input,.lcn-select,.lcn-textarea{width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.08);background:rgba(8,11,18,.88);color:#eef2ff;border-radius:14px;padding:12px 14px;font-size:12px;outline:none;transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease}
    .lcn-input:focus,.lcn-select:focus,.lcn-textarea:focus{border-color:rgba(160,175,255,.55);box-shadow:0 0 0 4px rgba(110,125,255,.12);transform:translateY(-1px)}
    .lcn-textarea{resize:vertical;min-height:170px;line-height:1.4}
    .lcn-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
    .lcn-button{appearance:none;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.05);color:#eef2ff;border-radius:14px;padding:11px 15px;font-size:12px;cursor:pointer;transition:160ms ease;backdrop-filter:blur(8px)}
    .lcn-button:hover{transform:translateY(-1px);background:rgba(255,255,255,.08)}
    .lcn-button.primary{background:linear-gradient(135deg,#f6f7fb,#cad2ff 52%,#8c9cff);color:#0d1018;border-color:transparent;font-weight:800;box-shadow:0 10px 24px rgba(125,138,255,.22)}
    .lcn-button.ghost{background:transparent}
    .lcn-tabs{display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap}
    .lcn-tab{appearance:none;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.04);color:#97a2bb;font-size:12px;padding:10px 14px;border-radius:14px;cursor:pointer;transition:160ms ease}
    .lcn-tab.active{background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.06));color:#f2f5ff;border-color:rgba(170,180,255,.22);box-shadow:0 10px 20px rgba(0,0,0,.16)}
    .lcn-page{display:none;animation:lcnfade .18s ease} .lcn-page.active{display:block}
    @keyframes lcnfade{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}
    .lcn-range-wrap{display:grid;grid-template-columns:1fr 84px;gap:8px;align-items:center} .lcn-range{width:100%;accent-color:#bac5ff}
    .lcn-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:12px}
    .lcn-stat{padding:12px 14px;border-radius:16px;border:1px solid rgba(255,255,255,.07);background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.025))}
    .lcn-stat .k{font-size:10px;color:#8b96af;margin-bottom:6px;text-transform:uppercase;letter-spacing:.1em} .lcn-stat .v{font-size:13px;color:#f3f6ff;font-weight:700;word-break:break-word}
    .lcn-auth-title{font-size:22px;font-weight:900;margin-bottom:6px} .lcn-auth-sub{font-size:12px;color:#9ea7bd;margin-bottom:14px}
    .lcn-message{min-height:18px;font-size:11px;color:#98a2bb} .lcn-message.ok{color:#7df0a0} .lcn-message.bad{color:#ff99a8}
    .lcn-footer-note{font-size:11px;color:#818ba3;line-height:1.5}
    .lcn-bypass-box{border:2px solid rgba(74,255,255,.55);box-shadow:0 0 0 1px rgba(0,0,0,.8) inset, 0 0 18px rgba(0,255,255,.08);background:#0b0c0f;padding:14px 16px;border-radius:4px;font-family:"Courier New",monospace;line-height:1.25}
    .lcn-bypass-box .title{color:#ffffff;font-size:20px;margin-bottom:8px} .lcn-bypass-box .line{color:#17f85b;font-size:18px} .lcn-bypass-box a{color:#17f85b;text-decoration:none;word-break:break-all}
    .lcn-select-wrap{position:relative} .lcn-select-wrap::after{content:"⌄";position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;color:#9aa4bc;font-size:14px}
    .lcn-select.premium{appearance:none;padding-right:34px;background:#0b0f1a;color:#ffffff;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}
  `;
  document.head.appendChild(style);
}

function getWidget(node, name){ return node.widgets?.find((w)=>w.name===name); }
function getComboValues(widget){ if (!widget) return []; if (Array.isArray(widget.options?.values)) return widget.options.values; if (Array.isArray(widget.options)) return widget.options; return []; }
function setWidgetValue(widget, value, node){ if (!widget) return; widget.value = value; if (typeof widget.callback === "function") widget.callback(value, app.canvas, node); node?.setDirtyCanvas?.(true,true); }
function hideWidget(widget){ if (!widget || widget.__leaderHidden) return; widget.__leaderHidden = true; widget.computeSize = () => [0,-4]; }
function round64(v){ return Math.max(64, Math.round(v/64)*64); }
function ratioToWH(longerSide, aspectRatio){ const safeLonger = Math.max(512, Number(longerSide) || 1024); const [wRaw, hRaw] = String(aspectRatio || "1:1").split(":").map(Number); const w = wRaw > 0 ? wRaw : 1; const h = hRaw > 0 ? hRaw : 1; const ratio = w / h; let width, height; if (ratio >= 1){ width = safeLonger; height = safeLonger / ratio; } else { height = safeLonger; width = safeLonger * ratio; } width = Math.max(512, round64(width)); height = Math.max(512, round64(height)); return { width, height }; }
function maskKey(key){ if (!key) return "•••• •••• •••• ••••"; const clean = String(key); if (clean.length <= 8) return "••••••••"; return clean.slice(0,4) + " •••• •••• •••• " + clean.slice(-4); }
async function postJson(url, payload){ const res = await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); const data = await res.json().catch(()=>({})); if (!res.ok) throw new Error(data?.error || data?.message || `HTTP ${res.status}`); return data; }
async function getJson(url){ const res = await fetch(url); return await res.json().catch(()=>({})); }
function selectMarkup(bindName){ return `<div class="lcn-select-wrap"><select class="lcn-select premium" data-bind="${bindName}"></select></div>`; }

app.registerExtension({
  name: EXT_NAME,
  async nodeCreated(node){
    if (node.comfyClass !== TARGET_CLASS) return;
    injectStyles();

    if (node.widgets?.some(w => w.name === "leader_custom_nodew_ui")) return;
    if (node.__leaderMounted) return;
    node.__leaderMounted = true;

    const widgetNames = ["license_key","positive_prompt","negative_prompt","longer_side","aspect_ratio","batch_count","ckpt_name","skin_lora_name","skin_lora_strength_model","skin_lora_strength_clip"];
    for (const name of widgetNames) hideWidget(getWidget(node, name));

    node.resizable = true;
    node.setSize?.([Math.max(node.size?.[0] || 470, 470), Math.max(node.size?.[1] || 720, 720)]);

    const root = document.createElement("div");
    root.className = "lcn-shell";
    root.innerHTML = `
      <div class="lcn-auth">
        <div class="lcn-auth-card">
          <div class="lcn-grid">
            <div class="lcn-bypass-box">
              <div class="title">Leader Bypass v1</div>
              <div class="line">Telegram Channel: <a href="${TELEGRAM_URL}" target="_blank" rel="noopener noreferrer">${TELEGRAM_URL}</a></div>
            </div>
            <div class="lcn-auth-title">Leader Custom Nodew</div>
            <div class="lcn-auth-sub">Premium license access for your workflow. Enter your key and unlock the node.</div>
            <div class="lcn-field"><label>License Key</label><input class="lcn-input" data-auth="license_key" placeholder="LCNW-XXXX-XXXX-XXXX-XXXX" /></div>
            <div class="lcn-row"><button class="lcn-button primary" data-action="activate">Activate</button><button class="lcn-button ghost" data-action="check">Check</button></div>
            <div class="lcn-message" data-auth="message"></div>
            <div class="lcn-footer-note">The key is stored locally for this ComfyUI installation and validated on every protected run.</div>
          </div>
        </div>
      </div>

      <div class="lcn-main">
        <div class="lcn-topbar">
          <div class="lcn-brand"><div class="lcn-brand-badge">LC</div><div><div class="lcn-brand-title">Leader Custom Nodew</div><div class="lcn-brand-sub">Premium workflow entry point</div></div></div>
          <div class="lcn-status-row"><div class="lcn-key-chip" title="Hover to reveal key"><span class="masked" data-key="masked">•••• •••• •••• ••••</span><span class="real" data-key="real">—</span></div><div class="lcn-chip" data-auth="state">LOCKED</div><button class="lcn-button ghost" data-action="deactivate-main">Deactivate</button></div>
        </div>

        <div class="lcn-tabs"><button class="lcn-tab active" data-tab="prompts">Prompts</button><button class="lcn-tab" data-tab="model">Model</button><button class="lcn-tab" data-tab="size">Size</button></div>

        <div class="lcn-page active" data-page="prompts"><div class="lcn-panel"><div class="lcn-grid"><div class="lcn-field"><label>Positive prompt</label><textarea class="lcn-textarea" data-bind="positive_prompt"></textarea></div><div class="lcn-field"><label>Negative prompt</label><textarea class="lcn-textarea" data-bind="negative_prompt"></textarea></div></div></div></div>

        <div class="lcn-page" data-page="model"><div class="lcn-panel"><div class="lcn-grid"><div class="lcn-field"><label>Checkpoint</label>${selectMarkup("ckpt_name")}</div><div class="lcn-field"><label>Skin LoRA</label>${selectMarkup("skin_lora_name")}</div><div class="lcn-grid-2"><div class="lcn-field"><label>LoRA model</label><div class="lcn-range-wrap"><input class="lcn-range" type="range" min="-4" max="4" step="0.05" data-range="skin_lora_strength_model" /><input class="lcn-input" type="number" min="-4" max="4" step="0.05" data-bind="skin_lora_strength_model" /></div></div><div class="lcn-field"><label>LoRA clip</label><div class="lcn-range-wrap"><input class="lcn-range" type="range" min="-4" max="4" step="0.05" data-range="skin_lora_strength_clip" /><input class="lcn-input" type="number" min="-4" max="4" step="0.05" data-bind="skin_lora_strength_clip" /></div></div></div></div></div></div>

        <div class="lcn-page" data-page="size"><div class="lcn-panel"><div class="lcn-grid"><div class="lcn-grid-3"><div class="lcn-field"><label>Longer side</label>${selectMarkup("longer_side")}</div><div class="lcn-field"><label>Aspect ratio</label>${selectMarkup("aspect_ratio")}</div><div class="lcn-field"><label>Batch count</label><input class="lcn-input" type="number" min="1" max="64" step="1" data-bind="batch_count" /></div></div></div></div></div>

        <div class="lcn-stats"><div class="lcn-stat"><div class="k">Resolution</div><div class="v" data-kpi="resolution">—</div></div><div class="lcn-stat"><div class="k">Session</div><div class="v" data-kpi="session">—</div></div><div class="lcn-stat"><div class="k">Status</div><div class="v" data-kpi="status-text">Locked</div></div></div>
      </div>
    `;

    const authKey = root.querySelector('[data-auth="license_key"]');
    const authMessage = root.querySelector('[data-auth="message"]');
    const stateChip = root.querySelector('[data-auth="state"]');
    const maskedKey = root.querySelector('[data-key="masked"]');
    const realKey = root.querySelector('[data-key="real"]');
    const sessionKpi = root.querySelector('[data-kpi="session"]');
    const statusText = root.querySelector('[data-kpi="status-text"]');

    const values = {};

    function syncFromWidgets(){
      ["license_key","positive_prompt","negative_prompt","longer_side","aspect_ratio","batch_count","ckpt_name","skin_lora_name","skin_lora_strength_model","skin_lora_strength_clip"].forEach((name) => {
        const w = getWidget(node, name);
        values[name] = w ? w.value : values[name];
      });
      if (values.skin_lora_strength_model == null) values.skin_lora_strength_model = -1;
      if (values.skin_lora_strength_clip == null) values.skin_lora_strength_clip = -1;
    }

    function fillSelect(name){
      const widget = getWidget(node, name);
      const select = root.querySelector(`[data-bind="${name}"]`);
      if (!widget || !select) return;
      select.innerHTML = "";
      for (const value of getComboValues(widget)) {
        const option = document.createElement("option");
        option.value = String(value);
        option.textContent = String(value);
        select.appendChild(option);
      }
      if (values[name] != null && values[name] !== "") select.value = String(values[name]);
      else if (widget.value != null) select.value = String(widget.value);
    }

    function applyUiValues(){
      if (authKey) authKey.value = values.license_key || localStorage.getItem(STORAGE_KEY) || "";
      ["positive_prompt","negative_prompt","batch_count","skin_lora_strength_model","skin_lora_strength_clip"].forEach((name) => {
        const el = root.querySelector(`[data-bind="${name}"]`);
        if (el && values[name] != null) el.value = values[name];
      });
      ["ckpt_name","skin_lora_name","longer_side","aspect_ratio"].forEach(fillSelect);
      const r1 = root.querySelector('[data-range="skin_lora_strength_model"]');
      const r2 = root.querySelector('[data-range="skin_lora_strength_clip"]');
      const n1 = root.querySelector('[data-bind="skin_lora_strength_model"]');
      const n2 = root.querySelector('[data-bind="skin_lora_strength_clip"]');
      if (r1 && n1) { r1.value = values.skin_lora_strength_model ?? -1; n1.value = values.skin_lora_strength_model ?? -1; }
      if (r2 && n2) { r2.value = values.skin_lora_strength_clip ?? -1; n2.value = values.skin_lora_strength_clip ?? -1; }
      syncResolution();
    }

    function updateUi(status){
      const ok = !!status?.active;
      root.classList.toggle("lcn-auth-only", !ok);
      root.classList.toggle("lcn-unlocked", ok);
      stateChip.textContent = ok ? "ACTIVE" : "LOCKED";
      stateChip.classList.toggle("ok", ok);
      stateChip.classList.toggle("bad", !ok);
      const keyValue = status?.license_key || values.license_key || authKey?.value || "";
      maskedKey.textContent = maskKey(keyValue);
      realKey.textContent = keyValue || "—";
      sessionKpi.textContent = status?.session_id || "—";
      statusText.textContent = ok ? "Active" : "Locked";
      authMessage.textContent = status?.last_error || (ok ? "License active" : "Enter a valid license key");
      authMessage.classList.toggle("ok", ok);
      authMessage.classList.toggle("bad", !ok && !!(status?.last_error || ""));
      if (keyValue) {
        values.license_key = keyValue;
        localStorage.setItem(STORAGE_KEY, keyValue);
        const w = getWidget(node, "license_key");
        if (w) setWidgetValue(w, keyValue, node);
        if (authKey) authKey.value = keyValue;
      }
    }

    async function refreshStatus(){
      try {
        const data = await getJson("/leader_custom_nodew/license/status");
        updateUi(data || {});
      } catch (e) {
        updateUi({ active:false, last_error:String(e) });
      }
    }

    async function doActivate(){
      const license_key = authKey?.value?.trim() || "";
      values.license_key = license_key;
      const w = getWidget(node, "license_key");
      if (w) setWidgetValue(w, license_key, node);
      authMessage.textContent = "Activating...";
      authMessage.classList.remove("ok","bad");
      try {
        const result = await postJson("/leader_custom_nodew/license/activate", { license_key, version: "0.4.4" });
        updateUi(result?.status || {});
      } catch (e) {
        updateUi({ active:false, last_error:e.message || String(e) });
      }
    }

    async function doDeactivate(){
      try { await postJson("/leader_custom_nodew/license/deactivate", {}); } catch {}
      updateUi({ active:false, last_error:"" });
      await refreshStatus();
    }

    root.querySelector('[data-action="activate"]')?.addEventListener("click", doActivate);
    root.querySelector('[data-action="check"]')?.addEventListener("click", refreshStatus);
    root.querySelector('[data-action="deactivate-main"]')?.addEventListener("click", doDeactivate);

    root.querySelectorAll(".lcn-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        root.querySelectorAll(".lcn-tab").forEach((t) => t.classList.toggle("active", t === tab));
        root.querySelectorAll(".lcn-page").forEach((p) => p.classList.toggle("active", p.dataset.page === target));
        node.setDirtyCanvas?.(true, true);
      });
    });

    function bindControl(name){
      const widget = getWidget(node, name);
      const control = root.querySelector(`[data-bind="${name}"]`);
      if (!widget || !control) return;

      const pushValue = () => {
        const value = typeof widget.value === "number" ? Number(control.value) : control.value;
        values[name] = value;
        setWidgetValue(widget, value, node);
        const range = root.querySelector(`[data-range="${name}"]`);
        if (range) range.value = control.value;
        syncResolution();
      };
      control.addEventListener("input", pushValue);
      control.addEventListener("change", pushValue);
    }

    function syncResolution(){
      const longerSide = root.querySelector('[data-bind="longer_side"]')?.value;
      const aspectRatio = root.querySelector('[data-bind="aspect_ratio"]')?.value;
      const res = root.querySelector('[data-kpi="resolution"]');
      const { width, height } = ratioToWH(longerSide, aspectRatio);
      if (res) res.textContent = `${width} × ${height}`;
    }

    ["positive_prompt","negative_prompt","batch_count","longer_side","aspect_ratio","ckpt_name","skin_lora_name","skin_lora_strength_model","skin_lora_strength_clip"].forEach(bindControl);

    ["skin_lora_strength_model","skin_lora_strength_clip"].forEach((name) => {
      const widget = getWidget(node, name);
      const range = root.querySelector(`[data-range="${name}"]`);
      const number = root.querySelector(`[data-bind="${name}"]`);
      if (!widget || !range || !number) return;
      range.addEventListener("input", () => {
        number.value = range.value;
        values[name] = Number(range.value);
        setWidgetValue(widget, Number(range.value), node);
      });
      number.addEventListener("input", () => {
        range.value = number.value;
        values[name] = Number(number.value);
        setWidgetValue(widget, Number(number.value), node);
      });
    });

    syncFromWidgets();
    applyUiValues();
    refreshStatus();

    node.addDOMWidget("leader_custom_nodew_ui", "leader_custom_nodew_ui", root, {
      serialize: false,
      hideOnZoom: false,
      selectOn: ["click", "focusin"],
      getValue() { return undefined; },
      setValue() {},
    });

    const originalConfigure = node.configure?.bind(node);
    node.configure = function(info) {
      if (originalConfigure) originalConfigure(info);
      setTimeout(() => {
        syncFromWidgets();
        applyUiValues();
        refreshStatus();
      }, 0);
    };

    const originalOnResize = node.onResize?.bind(node);
    node.onResize = function(size) {
      if (originalOnResize) originalOnResize(size);
      const width = Math.max(470, size?.[0] || this.size?.[0] || 470);
      root.style.width = `${width - 24}px`;
    };

    node.setDirtyCanvas?.(true, true);
  }
});
