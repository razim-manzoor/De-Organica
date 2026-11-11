import os
from PIL import Image
import numpy as np

src_path = "public/images/de-organica-logo.jpg"
img = Image.open(src_path).convert("RGB")
arr = np.array(img, dtype=np.float32)

# Compute brightness/whiteness
# White is (255, 255, 255)
# In the image, background is very close to white (> 245 in all channels)
# Let's inspect the minimum and maximum
r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
brightness = (r + g + b) / 3.0

# Calculate alpha:
# If brightness >= 250, alpha -> 0
# If brightness <= 210, alpha -> 255
# In between, linear ramp for smooth anti-aliased edges
alpha = np.zeros_like(brightness)
mask_solid = brightness <= 220
mask_transparent = brightness >= 252
mask_blend = (~mask_solid) & (~mask_transparent)

alpha[mask_solid] = 255
alpha[mask_transparent] = 0
blend_factor = (252.0 - brightness[mask_blend]) / (252.0 - 220.0)
alpha[mask_blend] = np.clip(blend_factor * 255.0, 0, 255)

# Reconstruct RGBA
# To avoid white halos on dark backgrounds, darken the RGB by the inverse of alpha
rgba = np.zeros((img.height, img.width, 4), dtype=np.uint8)
rgba[:, :, 0] = np.clip(arr[:, :, 0], 0, 255).astype(np.uint8)
rgba[:, :, 1] = np.clip(arr[:, :, 1], 0, 255).astype(np.uint8)
rgba[:, :, 2] = np.clip(arr[:, :, 2], 0, 255).astype(np.uint8)
rgba[:, :, 3] = alpha.astype(np.uint8)

res_img = Image.fromarray(rgba, "RGBA")

# Find bounding box of non-zero alpha
bbox = res_img.getbbox()
print("Logo Bounding Box:", bbox)

# Crop with a slight 8px margin
margin = 12
crop_box = (
    max(0, bbox[0] - margin),
    max(0, bbox[1] - margin),
    min(img.width, bbox[2] + margin),
    min(img.height, bbox[3] + margin)
)
cropped = res_img.crop(crop_box)
cropped.save("public/images/de-organica-logo.png", "PNG")
print("Saved public/images/de-organica-logo.png, size:", cropped.size)

# Also create Monogram-only crop (the top D and O mark)
# Notice in the image, "De Organica" text starts around y = 410
# Let's inspect height of the mark
mark_crop_box = (
    max(0, bbox[0] - margin),
    max(0, bbox[1] - margin),
    min(img.width, bbox[2] + margin),
    int(bbox[1] + (bbox[3] - bbox[1]) * 0.70)
)
mark_cropped = res_img.crop(mark_crop_box)
# Find tight bbox for mark
mark_bbox = mark_cropped.getbbox()
if mark_bbox:
    mark_cropped = mark_cropped.crop((
        max(0, mark_bbox[0] - 6),
        max(0, mark_bbox[1] - 6),
        min(mark_cropped.width, mark_bbox[2] + 6),
        min(mark_cropped.height, mark_bbox[3] + 6)
    ))
mark_cropped.save("public/images/de-organica-mark.png", "PNG")
print("Saved public/images/de-organica-mark.png, size:", mark_cropped.size)

# Also create white/inverted version for dark footers
# Invert RGB colors: make dark forest/olive turn into clean white and soft olive-green
arr_cropped = np.array(cropped, dtype=np.float32)
white_rgba = np.zeros_like(arr_cropped, dtype=np.uint8)
# Where it was dark, make it white (255, 255, 255)
white_rgba[:, :, 0] = 255
white_rgba[:, :, 1] = 255
white_rgba[:, :, 2] = 255
white_rgba[:, :, 3] = arr_cropped[:, :, 3].astype(np.uint8)

white_img = Image.fromarray(white_rgba, "RGBA")
white_img.save("public/images/de-organica-logo-white.png", "PNG")
print("Saved public/images/de-organica-logo-white.png, size:", white_img.size)
