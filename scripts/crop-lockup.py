import os
from PIL import Image
import numpy as np

src = Image.open("public/images/de-organica-logo.png")
arr = np.array(src)

# 1. Clean Mark (y: 0 to 408)
mark_crop = src.crop((0, 0, src.width, 408))
mark_bbox = mark_crop.getbbox()
mark_clean = mark_crop.crop((mark_bbox[0] - 4, mark_bbox[1] - 4, mark_bbox[2] + 4, mark_bbox[3] + 4))
mark_clean.save("public/images/de-organica-mark.png", "PNG")
print("Saved mark:", mark_clean.size)

# 2. Clean Text (y: 416 to end)
text_crop = src.crop((0, 416, src.width, src.height))
text_bbox = text_crop.getbbox()
text_clean = text_crop.crop((text_bbox[0] - 4, text_bbox[1] - 4, text_bbox[2] + 4, text_bbox[3] + 4))
text_clean.save("public/images/de-organica-wordmark.png", "PNG")
print("Saved wordmark:", text_clean.size)

# 3. Create Horizontal Lockup (Mark on left, Wordmark on right)
# Scale mark so its height matches nicely with wordmark
target_mark_h = 160
mark_scale_ratio = target_mark_h / mark_clean.height
target_mark_w = int(mark_clean.width * mark_scale_ratio)
mark_resized = mark_clean.resize((target_mark_w, target_mark_h), Image.Resampling.LANCZOS)

target_text_h = int(target_mark_h * 0.72)
text_scale_ratio = target_text_h / text_clean.height
target_text_w = int(text_clean.width * text_scale_ratio)
text_resized = text_clean.resize((target_text_w, target_text_h), Image.Resampling.LANCZOS)

# Create canvas
gap = 28
total_w = target_mark_w + gap + target_text_w
total_h = target_mark_h

horiz_canvas = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))
horiz_canvas.paste(mark_resized, (0, 0), mark_resized)
text_y = (total_h - target_text_h) // 2 + 6
horiz_canvas.paste(text_resized, (target_mark_w + gap, text_y), text_resized)

horiz_canvas.save("public/images/de-organica-horizontal.png", "PNG")
print("Saved horizontal lockup:", horiz_canvas.size)

# Inverted version for dark backgrounds
arr_horiz = np.array(horiz_canvas, dtype=np.float32)
white_horiz = np.zeros_like(arr_horiz, dtype=np.uint8)
white_horiz[:, :, 0] = 255
white_horiz[:, :, 1] = 255
white_horiz[:, :, 2] = 255
white_horiz[:, :, 3] = arr_horiz[:, :, 3].astype(np.uint8)
Image.fromarray(white_horiz, "RGBA").save("public/images/de-organica-horizontal-white.png", "PNG")
print("Saved white horizontal lockup")
