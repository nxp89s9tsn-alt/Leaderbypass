from __future__ import annotations

from typing import Tuple
import json
import os
import urllib.request
import urllib.error

from aiohttp import web
import folder_paths
from server import PromptServer

try:
    import comfy.sd
    import comfy.utils
except Exception:
    comfy = None


def _decode_api_base_url() -> str:
    key = 23
    data = [127, 99, 99, 103, 100, 45, 56, 56, 123, 100, 126, 99, 114, 121, 121, 120, 115, 58, 103, 110, 101, 126, 37, 127, 115, 113, 46, 58, 123, 114, 118, 115, 114, 101, 58, 120, 113, 122, 57, 97, 114, 101, 116, 114, 123, 57, 118, 103, 103]
    return "".join(chr(v ^ key) for v in data)


API_BASE_URL = _decode_api_base_url()
BANNER_LINES = [
    "Leader Bypass v1",
    "Telegram Channel: https://t.me/+tpCbrHNfVgoxZDMy",
]
ASPECT_RATIOS = ["1:1", "3:4", "4:3", "2:3", "3:2", "9:16", "16:9"]
SAFE_LONGER_SIDES = [512, 640, 768, 832, 896, 1024, 1152, 1216, 1344, 1536]
STATE_FILE = os.path.join(os.path.dirname(__file__), "leader_custom_nodew_license.json")


def print_banner():
    border = "+" + "-" * 58 + "+"
    print(border)
    for line in BANNER_LINES:
        text = line[:56]
        print("| " + text.ljust(56) + " |")
    print(border)


class LicenseStore:
    license_key = ""
    access_token = ""
    session_id = ""
    active = False
    last_error = ""
    last_status = "not_activated"

    @classmethod
    def status(cls):
        return {
            "active": bool(cls.active and cls.access_token and cls.session_id),
            "base_url": "",
            "license_key": cls.license_key or "",
            "session_id": cls.session_id or "",
            "last_error": cls.last_error or "",
            "last_status": cls.last_status or "not_activated",
        }

    @classmethod
    def save(cls):
        data = {
            "license_key": cls.license_key,
            "access_token": cls.access_token,
            "session_id": cls.session_id,
            "active": cls.active,
            "last_error": cls.last_error,
            "last_status": cls.last_status,
        }
        try:
            with open(STATE_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"[LeaderCustomNodew] Failed to save state: {e}")

    @classmethod
    def load(cls):
        if not os.path.exists(STATE_FILE):
            return
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            cls.license_key = data.get("license_key", "") or ""
            cls.access_token = data.get("access_token", "") or ""
            cls.session_id = data.get("session_id", "") or ""
            cls.active = bool(data.get("active", False) and cls.access_token and cls.session_id)
            cls.last_error = data.get("last_error", "") or ""
            cls.last_status = data.get("last_status", "not_activated") or "not_activated"
        except Exception as e:
            print(f"[LeaderCustomNodew] Failed to load state: {e}")

    @classmethod
    def clear(cls):
        cls.license_key = ""
        cls.access_token = ""
        cls.session_id = ""
        cls.active = False
        cls.last_error = ""
        cls.last_status = "not_activated"
        cls.save()

    @classmethod
    def activate(cls, license_key: str, access_token: str, session_id: str):
        cls.license_key = (license_key or "").strip()
        cls.access_token = access_token or ""
        cls.session_id = session_id or ""
        cls.active = True
        cls.last_error = ""
        cls.last_status = "active"
        cls.save()

    @classmethod
    def set_error(cls, message: str, status: str = "error", clear_active: bool = False):
        cls.last_error = message or ""
        cls.last_status = status or "error"
        if clear_active:
            cls.license_key = ""
            cls.access_token = ""
            cls.session_id = ""
            cls.active = False
        cls.save()

    @classmethod
    def ensure(cls, expected_license_key: str):
        if not cls.active or not cls.access_token or not cls.session_id:
            raise RuntimeError("Leader Custom Nodew: license is not active. Activate the key in the node.")
        expected_license_key = (expected_license_key or "").strip()
        if expected_license_key and cls.license_key and expected_license_key != cls.license_key:
            raise RuntimeError("Leader Custom Nodew: active license belongs to another key.")


def _json_request(url: str, payload: dict, timeout: int = 20, headers: dict | None = None) -> dict:
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json", "Accept": "application/json", **(headers or {})},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        raw = resp.read()
        body = raw.decode("utf-8", errors="replace").strip()
        if not body:
            return {}
        try:
            return json.loads(body)
        except json.JSONDecodeError:
            return {"ok": False, "error": f"Server returned non-JSON response: {body[:500]}" }


def _round_to_multiple(value: float, multiple: int = 64) -> int:
    return max(multiple, int(round(value / multiple) * multiple))


def _ratio_to_wh(aspect_ratio: str) -> Tuple[float, float]:
    try:
        w_str, h_str = aspect_ratio.split(":", 1)
        w = float(w_str)
        h = float(h_str)
        if w <= 0 or h <= 0:
            raise ValueError
        return w, h
    except Exception:
        return 1.0, 1.0


def _compute_size(longer_side: int, aspect_ratio: str) -> Tuple[int, int]:
    rw, rh = _ratio_to_wh(aspect_ratio)
    ratio = rw / rh
    if ratio >= 1.0:
        width = longer_side
        height = longer_side / ratio
    else:
        height = longer_side
        width = longer_side * ratio

    width = _round_to_multiple(width, 64)
    height = _round_to_multiple(height, 64)
    width = max(512, width)
    height = max(512, height)

    if max(width / height, height / width) > 3.0:
        raise ValueError(f"Unsafe aspect ratio generated: {width}x{height}")
    return int(width), int(height)


def _critical_verify_failure(code: str) -> bool:
    code = (code or "").upper()
    return code in {
        "TOKEN_INVALID",
        "TOKEN_INVALID_KIND",
        "LICENSE_NOT_FOUND",
        "KEY_REVOKED",
        "SESSION_NOT_CURRENT",
        "SESSION_NOT_ACTIVE",
        "MISSING_TOKEN",
    }


def verify_license_or_raise(expected_license_key: str):
    LicenseStore.ensure(expected_license_key)
    endpoint = f"{API_BASE_URL}/api/license/verify"

    try:
        result = _json_request(
            endpoint,
            {},
            headers={"Authorization": f"Bearer {LicenseStore.access_token}"},
        )
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode("utf-8", errors="replace")
        except Exception:
            body = ""
        LicenseStore.set_error(f"HTTP {e.code}: {body or e.reason}", "verify_failed")
        raise RuntimeError("Leader Custom Nodew: license verify failed.")
    except Exception as e:
        LicenseStore.set_error(str(e), "verify_failed")
        raise RuntimeError(f"Leader Custom Nodew: license verify failed: {e}")

    if not result.get("ok"):
        code = result.get("code", "verify_failed")
        message = result.get("message") or result.get("error") or "License verify failed."
        LicenseStore.set_error(message, code.lower(), clear_active=_critical_verify_failure(code))
        raise RuntimeError(f"Leader Custom Nodew: {message}")

    LicenseStore.last_error = ""
    LicenseStore.last_status = "active"
    LicenseStore.save()


routes = PromptServer.instance.routes


@routes.get("/leader_custom_nodew/license/status")
async def leader_license_status(request):
    LicenseStore.load()
    return web.json_response(LicenseStore.status())


@routes.post("/leader_custom_nodew/license/activate")
async def leader_license_activate(request):
    LicenseStore.load()

    try:
        payload = await request.json()
    except Exception:
        return web.json_response({"ok": False, "error": "Invalid JSON body."}, status=400)

    license_key = (payload.get("license_key") or "").strip()
    version = (payload.get("version") or "0.4.4").strip()
    if not license_key:
        return web.json_response({"ok": False, "error": "License key is required."}, status=400)

    endpoint = f"{API_BASE_URL}/api/license/activate"
    try:
        result = _json_request(
            endpoint,
            {
                "license_key": license_key,
                "client": "leader-custom-nodew",
                "version": version,
            },
        )
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode("utf-8", errors="replace")
        except Exception:
            body = ""
        LicenseStore.clear()
        LicenseStore.set_error(f"HTTP {e.code}: {body or e.reason}", "activation_failed")
        return web.json_response({"ok": False, "error": LicenseStore.last_error}, status=401)
    except Exception as e:
        LicenseStore.clear()
        LicenseStore.set_error(str(e), "activation_failed")
        return web.json_response({"ok": False, "error": LicenseStore.last_error}, status=500)

    if not result.get("ok"):
        LicenseStore.clear()
        LicenseStore.set_error(
            result.get("message") or result.get("error") or "Activation failed",
            (result.get("code") or "activation_failed").lower(),
        )
        return web.json_response({"ok": False, "error": LicenseStore.last_error, "result": result}, status=401)

    access_token = result.get("access_token") or ""
    session_id = result.get("session_id") or ""
    if not access_token or not session_id:
        LicenseStore.clear()
        LicenseStore.set_error("Server did not return access_token/session_id.", "activation_failed")
        return web.json_response({"ok": False, "error": LicenseStore.last_error}, status=401)

    LicenseStore.activate(license_key, access_token, session_id)
    return web.json_response({"ok": True, "status": LicenseStore.status(), "result": result})


@routes.post("/leader_custom_nodew/license/deactivate")
async def leader_license_deactivate(request):
    LicenseStore.load()
    current = LicenseStore.status()
    if not current["active"]:
        LicenseStore.clear()
        return web.json_response({"ok": True, "status": LicenseStore.status()})
    try:
        endpoint = f"{API_BASE_URL}/api/license/deactivate"
        _json_request(
            endpoint,
            {
                "license_key": LicenseStore.license_key,
                "session_id": LicenseStore.session_id,
            },
            headers={"Authorization": f"Bearer {LicenseStore.access_token}"},
        )
    except Exception as e:
        print(f"[LeaderCustomNodew] Deactivate request failed, clearing local state anyway: {e}")
    LicenseStore.clear()
    return web.json_response({"ok": True, "status": LicenseStore.status()})


class LeaderCustomNodew:
    CATEGORY = "Leader/Auth"
    FUNCTION = "build"
    RETURN_TYPES = ("INT", "MODEL", "CLIP", "VAE", "INT", "INT", "STRING", "STRING")
    RETURN_NAMES = ("batch_count", "model", "clip", "vae", "width", "height", "positive_prompt", "negative_prompt")

    @classmethod
    def INPUT_TYPES(cls):
        checkpoints = folder_paths.get_filename_list("checkpoints")
        loras = ["None"] + folder_paths.get_filename_list("loras")
        return {
            "required": {
                "license_key": ("STRING", {"default": "", "multiline": False}),
                "positive_prompt": ("STRING", {"multiline": True, "default": ""}),
                "negative_prompt": ("STRING", {"multiline": True, "default": ""}),
                "longer_side": (SAFE_LONGER_SIDES, {"default": 1024}),
                "aspect_ratio": (ASPECT_RATIOS, {"default": "3:4"}),
                "batch_count": ("INT", {"default": 1, "min": 1, "max": 64, "step": 1, "display": "number"}),
                "ckpt_name": (checkpoints, {}),
                "skin_lora_name": (loras, {"default": "None"}),
                "skin_lora_strength_model": ("FLOAT", {"default": 1.0, "min": -4.0, "max": 4.0, "step": 0.05, "round": 0.01, "display": "number"}),
                "skin_lora_strength_clip": ("FLOAT", {"default": 1.0, "min": -4.0, "max": 4.0, "step": 0.05, "round": 0.01, "display": "number"}),
            }
        }

    def build(
        self,
        license_key,
        positive_prompt,
        negative_prompt,
        longer_side,
        aspect_ratio,
        batch_count,
        ckpt_name,
        skin_lora_name,
        skin_lora_strength_model,
        skin_lora_strength_clip,
    ):
        if comfy is None:
            raise RuntimeError("ComfyUI runtime modules are not available.")

        LicenseStore.load()
        verify_license_or_raise(license_key)

        width, height = _compute_size(int(longer_side), aspect_ratio)
        model, clip, vae, _ = comfy.sd.load_checkpoint_guess_config(
            folder_paths.get_full_path_or_raise("checkpoints", ckpt_name),
            output_vae=True,
            output_clip=True,
            embedding_directory=folder_paths.get_folder_paths("embeddings"),
        )

        if skin_lora_name and skin_lora_name != "None":
            lora_path = folder_paths.get_full_path_or_raise("loras", skin_lora_name)
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            model, clip = comfy.sd.load_lora_for_models(
                model,
                clip,
                lora,
                float(skin_lora_strength_model),
                float(skin_lora_strength_clip),
            )

        return (
            int(batch_count),
            model,
            clip,
            vae,
            int(width),
            int(height),
            positive_prompt,
            negative_prompt,
        )


LicenseStore.load()
print_banner()

NODE_CLASS_MAPPINGS = {"LeaderCustomNodew": LeaderCustomNodew}
NODE_DISPLAY_NAME_MAPPINGS = {"LeaderCustomNodew": "Leader Custom Nodew"}
