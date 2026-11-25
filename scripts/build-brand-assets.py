"""
Builds crisp, halo-free brand assets, true horizontal lockups, multi-size favicons,
PWA icons, and a 1200x630 Open Graph card from public/images/de-organica-logo.jpg.
Also safely optimizes large local JPEG assets in place without changing dimensions.
"""

import os
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT / "public"
IMAGES_DIR = PUBLIC_DIR / "images"
APP_DIR = ROOT / "src" / "app"


def extract_clean_rgba(src_path: Path) -> Image.Image:
    """Alpha-matting with color unmixing against white to eliminate edge halos."""
    img = Image.open(src_path).convert("RGB")
    arr = np.array(img, dtype=np.float32)

    # Distance from pure white based on minimum RGB channel (preserves saturated greens)
    min_ch = np.min(arr, axis=2)
    lum = (arr[:, :, 0] * 0.299 + arr[:, :, 1] * 0.587 + arr[:, :, 2] * 0.114)
    whiteness = np.minimum(min_ch, lum)

    # Smooth ramp from 212 (opaque) to 248 (transparent)
    low, high = 205.0, 248.0
    alpha = np.clip((high - whiteness) / (high - low), 0.0, 1.0)

    # Unmix foreground color from white background: C_obs = a*C_fg + (1-a)*255
    safe_a = np.maximum(alpha, 0.08)[:, :, None]
    fg = (arr - (1.0 - alpha[:, :, None]) * 255.0) / safe_a
    fg = np.clip(fg, 0.0, 255.0)

    rgba = np.zeros((img.height, img.width, 4), dtype=np.uint8)
    rgba[:, :, :3] = fg.astype(np.uint8)
    rgba[:, :, 3] = (alpha * 255.0).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def crop_tight(img: Image.Image, pad: int = 8) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    return img.crop((
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(img.width, bbox[2] + pad),
        min(img.height, bbox[3] + pad),
    ))


def make_dark_bg_variant(img: Image.Image) -> Image.Image:
    """
    Converts forest-dark pixels (#233D20) to crisp pure white (#FFFFFF) and
    olive-leaf pixels (#668B2E) to luminous Botanical Olive (#C5E096) so dark
    footers/banners preserve crisp two-tone branding.
    """
    arr = np.array(img, dtype=np.float32)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    # Olive regions are brighter (g > 92 and r > 62) with strong green dominance
    olive_score = (
        np.clip((g - 86.0) / 24.0, 0.0, 1.0)
        * np.clip(((g - b) - 25.0) / 30.0, 0.0, 1.0)
    )
    out = np.zeros_like(arr, dtype=np.uint8)
    out[:, :, 0] = np.clip(255.0 * (1.0 - olive_score) + 197.0 * olive_score, 0, 255).astype(np.uint8)
    out[:, :, 1] = np.clip(255.0 * (1.0 - olive_score) + 224.0 * olive_score, 0, 255).astype(np.uint8)
    out[:, :, 2] = np.clip(255.0 * (1.0 - olive_score) + 150.0 * olive_score, 0, 255).astype(np.uint8)
    out[:, :, 3] = a.astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def make_badge_icon(mark_dark_variant: Image.Image, size: int, radius_ratio: float = 0.22) -> Image.Image:
    """Places the two-tone light crest on a Heritage Forest Green rounded badge."""
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    radius = int(size * radius_ratio)
    draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=radius, fill=255)

    forest_tile = Image.new("RGBA", (size, size), (35, 61, 32, 255))
    bg.paste(forest_tile, (0, 0), mask)

    pad = int(size * 0.16)
    avail = size - 2 * pad
    scale = min(avail / mark_dark_variant.width, avail / mark_dark_variant.height)
    mw = max(1, int(round(mark_dark_variant.width * scale)))
    mh = max(1, int(round(mark_dark_variant.height * scale)))
    resized = mark_dark_variant.resize((mw, mh), Image.Resampling.LANCZOS)
    bg.paste(resized, ((size - mw) // 2, (size - mh) // 2), resized)
    return bg


def build_logos():
    src = IMAGES_DIR / "de-organica-logo.jpg"
    full_rgba = extract_clean_rgba(src)

    # Full stacked lockup (tight crop)
    stacked = crop_tight(full_rgba, pad=10)
    stacked.save(IMAGES_DIR / "de-organica-logo.png", "PNG", optimize=True)
    stacked_white = make_dark_bg_variant(stacked)
    stacked_white.save(IMAGES_DIR / "de-organica-logo-white.png", "PNG", optimize=True)
    print(f"Saved stacked lockup: {stacked.size}")

    # Find vertical split gap between the DO monogram and "De Organica" wordmark
    arr = np.array(stacked)
    row_has_ink = np.max(arr[:, :, 3], axis=1) > 16
    # Find largest gap in middle third of stacked image
    h = stacked.height
    mid_start, mid_end = int(h * 0.40), int(h * 0.72)
    gaps = []
    in_gap = False
    gap_start = 0
    for y in range(mid_start, mid_end):
        if not row_has_ink[y] and not in_gap:
            in_gap = True
            gap_start = y
        elif row_has_ink[y] and in_gap:
            in_gap = False
            gaps.append((y - gap_start, gap_start, y))
    if in_gap:
        gaps.append((mid_end - gap_start, gap_start, mid_end))

    split_y = max(gaps)[1] + max(gaps)[0] // 2 if gaps else int(h * 0.58)

    mark = crop_tight(stacked.crop((0, 0, stacked.width, split_y)), pad=6)
    mark.save(IMAGES_DIR / "de-organica-mark.png", "PNG", optimize=True)
    mark_white = make_dark_bg_variant(mark)
    print(f"Saved tight mark: {mark.size}")

    wordmark = crop_tight(stacked.crop((0, split_y, stacked.width, stacked.height)), pad=6)
    print(f"Extracted wordmark: {wordmark.size}")

    # Build crisp 2x retina horizontal lockup (target height 128px -> rendered 48-56px CSS)
    target_h = 128
    mark_scale = target_h / mark.height
    mark_w = int(round(mark.width * mark_scale))
    mark_h_img = mark.resize((mark_w, target_h), Image.Resampling.LANCZOS)

    # Wordmark occupies ~87% height so "De Organica" + "LLC" complement the taller DO crest crisply
    word_h = int(round(target_h * 0.87))
    word_scale = word_h / wordmark.height
    word_w = int(round(wordmark.width * word_scale))
    word_h_img = wordmark.resize((word_w, word_h), Image.Resampling.LANCZOS)

    gap = 22
    horiz = Image.new("RGBA", (mark_w + gap + word_w, target_h), (0, 0, 0, 0))
    horiz.paste(mark_h_img, (0, 0), mark_h_img)
    horiz.paste(word_h_img, (mark_w + gap, (target_h - word_h) // 2 + 1), word_h_img)
    horiz.save(IMAGES_DIR / "de-organica-horizontal.png", "PNG", optimize=True)

    horiz_white = make_dark_bg_variant(horiz)
    horiz_white.save(IMAGES_DIR / "de-organica-horizontal-white.png", "PNG", optimize=True)
    print(f"Saved horizontal lockup: {horiz.size}")

    # Build multi-size favicon.ico, apple-icon.png (180x180), and PWA icons (192, 512)
    ico_48 = make_badge_icon(mark_white, 48, radius_ratio=0.22)
    ico_48.save(
        PUBLIC_DIR / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    make_badge_icon(mark_white, 180, radius_ratio=0.0).save(APP_DIR / "apple-icon.png", "PNG", optimize=True)
    make_badge_icon(mark_white, 192, radius_ratio=0.20).save(IMAGES_DIR / "icon-192.png", "PNG", optimize=True)
    make_badge_icon(mark_white, 512, radius_ratio=0.20).save(IMAGES_DIR / "icon-512.png", "PNG", optimize=True)
    print("Generated favicon.ico (16/32/48), apple-icon.png (180), icon-192.png, icon-512.png")

    return mark_white


def build_og_image(mark_white: Image.Image):
    """Creates a clean 1200x630 Open Graph & Twitter preview card."""
    W, H = 1200, 630
    bg_src = Image.open(IMAGES_DIR / "tours" / "garni-temple.jpg").convert("RGB")
    bg = ImageOps.fit(bg_src, (W, H), method=Image.Resampling.LANCZOS).convert("RGBA")

    # Directional Heritage Forest scrim on left so text & crest have >10:1 contrast
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    for x in range(W):
        t = x / W
        # Strong on left (0..0.55), tapering smoothly while keeping rich contrast across the bottom strip
        alpha = int(245 * max(0.46, 1.0 - max(0.0, (t - 0.22) * 1.05)))
        odraw.line([(x, 0), (x, H)], fill=(25, 44, 23, alpha))
    card = Image.alpha_composite(bg, overlay)
    draw = ImageDraw.Draw(card)

    # Top-left accent line + eyebrow
    draw.rectangle([(76, 74), (132, 78)], fill=(197, 224, 150, 255))

    def load_font(candidates, size):
        for path in candidates:
            if os.path.exists(path):
                return ImageFont.truetype(path, size)
        return ImageFont.load_default()

    serif_bold = load_font([
        "C:/Windows/Fonts/georgiab.ttf",
        "C:/Windows/Fonts/timesbd.ttf",
    ], 54)
    sans_bold = load_font([
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
    ], 20)
    sans_reg = load_font([
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ], 25)
    sans_sm = load_font([
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
    ], 18)

    # Place crest mark
    crest_h = 110
    crest_w = int(round(mark_white.width * (crest_h / mark_white.height)))
    crest = mark_white.resize((crest_w, crest_h), Image.Resampling.LANCZOS)
    card.paste(crest, (76, 108), crest)

    draw.text((76, 248), "DE ORGANICA LLC", font=serif_bold, fill=(255, 255, 255, 255))
    draw.text(
        (76, 326),
        "ARMENIA TRAVEL & DMC  ·  INTERNATIONAL MANPOWER",
        font=sans_bold,
        fill=(197, 224, 150, 255),
    )
    draw.text(
        (76, 374),
        "Handcrafted Armenian journeys, B2B ground operations,\nand legal international recruitment from our Yerevan desk.",
        font=sans_reg,
        fill=(244, 243, 238, 240),
    )

    # Bottom footer strip
    draw.line([(76, 515), (720, 515)], fill=(255, 255, 255, 65), width=1)
    draw.text(
        (76, 536),
        "deorganica.am  ·  Yerevan, Republic of Armenia  ·  +374 55 569553",
        font=sans_sm,
        fill=(228, 199, 134, 255),
    )

    out_path = IMAGES_DIR / "og-deorganica.jpg"
    card.convert("RGB").save(out_path, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"Saved OG image: {out_path} ({out_path.stat().st_size} bytes)")


def optimize_jpegs():
    """Safely re-encodes large photographic JPEGs with progressive optimization."""
    targets = [
        IMAGES_DIR / "heritage" / "tonir-lavash.jpg",
        IMAGES_DIR / "tours" / "yerevan-cascade.jpg",
        IMAGES_DIR / "tours" / "wings-of-tatev.jpg",
        IMAGES_DIR / "tours" / "tsaghkadzor-ski.jpg",
        IMAGES_DIR / "tours" / "garni-temple.jpg",
        IMAGES_DIR / "manpower" / "corporate-team.jpg",
        IMAGES_DIR / "manpower" / "international-workforce.jpg",
    ]
    for p in targets:
        if not p.exists():
            continue
        before = p.stat().st_size
        tmp = p.with_suffix(".tmp.jpg")
        with Image.open(p) as im:
            rgb = ImageOps.exif_transpose(im).convert("RGB")
            rgb.save(tmp, "JPEG", quality=82, optimize=True, progressive=True)
        after = tmp.stat().st_size
        if after < before:
            tmp.replace(p)
            print(f"Optimized {p.name}: {before} -> {after} bytes ({100 - after * 100 // before}% smaller)")
        else:
            tmp.unlink()
            print(f"Kept {p.name}: already optimal ({before} bytes)")


if __name__ == "__main__":
    mark_white = build_logos()
    build_og_image(mark_white)
    optimize_jpegs()
