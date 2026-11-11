from PIL import Image

mark = Image.open("public/images/de-organica-mark.png")
wordmark = Image.open("public/images/de-organica-wordmark.png")

# Let's inspect their sizes
print("mark:", mark.size, "wordmark:", wordmark.size)

# Target height for mark in header: 48px
# Target height for wordmark: around 34px
h_mark = 48
w_mark = int(mark.width * (h_mark / mark.height))
mark_small = mark.resize((w_mark, h_mark), Image.Resampling.LANCZOS)

h_word = 34
w_word = int(wordmark.width * (h_word / wordmark.height))
word_small = wordmark.resize((w_word, h_word), Image.Resampling.LANCZOS)

gap = 14
canvas_w = w_mark + gap + w_word
canvas_h = h_mark

canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
canvas.paste(mark_small, (0, 0), mark_small)
y_offset = (canvas_h - h_word) // 2 + 2
canvas.paste(word_small, (w_mark + gap, y_offset), word_small)

# Also let's generate 2x retina size
h_mark_2x = 96
w_mark_2x = int(mark.width * (h_mark_2x / mark.height))
mark_2x = mark.resize((w_mark_2x, h_mark_2x), Image.Resampling.LANCZOS)

h_word_2x = 68
w_word_2x = int(wordmark.width * (h_word_2x / wordmark.height))
word_2x = wordmark.resize((w_word_2x, h_word_2x), Image.Resampling.LANCZOS)

gap_2x = 28
canvas_2x = Image.new("RGBA", (w_mark_2x + gap_2x + w_word_2x, h_mark_2x), (0, 0, 0, 0))
canvas_2x.paste(mark_2x, (0, 0), mark_2x)
y_offset_2x = (h_mark_2x - h_word_2x) // 2 + 4
canvas_2x.paste(word_2x, (w_mark_2x + gap_2x, y_offset_2x), word_2x)

canvas_2x.save("public/images/de-organica-lockup.png", "PNG")
print("Saved 2x lockup:", canvas_2x.size)

# Also white version for dark backgrounds
import numpy as np
arr = np.array(canvas_2x)
white_arr = np.zeros_like(arr)
white_arr[:, :, 0] = 255
white_arr[:, :, 1] = 255
white_arr[:, :, 2] = 255
white_arr[:, :, 3] = arr[:, :, 3]
Image.fromarray(white_arr, "RGBA").save("public/images/de-organica-lockup-white.png", "PNG")
print("Saved white 2x lockup")
