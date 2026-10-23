import os
import numpy as np
from PIL import Image, ImageDraw

members = [
    (1, 'images/team_v2/hf_20260127_195347_367ee063-8593-4793-aea5-9b274a7478c3.png'),
    (2, 'images/team_v2/hf_20260127_195134_ca953d49-5792-4390-8b63-9927ba004164.png'),
    (3, 'images/team_v2/photo_5_2026-10-22_15-53-18.jpg'),
    (4, r'C:\Users\user\.gemini\antigravity-ide\brain\64063292-8c18-459b-9427-9b2bb533ce0c\.user_uploaded\media_1792726826687.png'),
    (5, 'images/team_v2/hf_20260127_195826_26697fd7-7f3d-4f25-b7ff-546ae0502fc2.png'),
    (6, 'images/team_v2/hf_20260127_203328_1d8e4205-4b6d-4dbe-97fc-4cb0c7b7c968.png'),
    (7, 'images/team_v2/hf_20260127_225725_578c51f4-74c6-4a99-b163-07d0d74102da.png'),
    (8, 'images/team_v2/photo_3_2026-10-22_15-53-18.jpg'),
    (9, 'images/team_v2/photo_4_2026-10-22_15-53-18.jpg'),
    (10, 'images/team_v2/hf_20260127_232544_27eb7b13-5714-4472-8573-36aa07abee96.png'),
    (11, 'images/team_v2/photo_2_2026-10-22_15-53-18.jpg'),
    (12, r'design_assets\personal_images\photo_2026-10-13_21-13-15.jpg'),
]

def add_top_padding(im, pad_pixels):
    if pad_pixels <= 0:
        return im
    w, h = im.size
    new_h = h + pad_pixels
    new_im = Image.new('RGB', (w, new_h))
    # Replicate the top 10 rows smoothly upwards
    top_slice = im.crop((0, 0, w, min(20, h)))
    # stretch top_slice to fill pad_pixels
    stretched = top_slice.resize((w, pad_pixels), Image.Resampling.LANCZOS)
    new_im.paste(stretched, (0, 0))
    new_im.paste(im, (0, pad_pixels))
    return new_im

# Fine-tuned configs:
# pad: how many background pixels to pad at top
# crop: (left, top, right, bottom) in padded image
configs = {
    # 1. Round face beard: head top is around y=350, head height ~750
    1: {'pad': 0, 'crop': (0, 100, 1696, 100 + int(1696 * 4 / 3))},

    # 2. Smiling man, receding: pad 100px at top to give nice otstup
    2: {'pad': 100, 'crop': (0, 0, 1696, int(1696 * 4 / 3))},

    # 3. Glasses: head top was at y=140. Pad 180px at top to give identical otstup
    3: {'pad': 180, 'crop': (0, 0, 1696, int(1696 * 4 / 3))},

    # 4. Hijab woman: 670x1024. Head top at 100px.
    4: {'pad': 0, 'crop': (0, 0, 670, int(670 * 4 / 3))},

    # 5. Middle aged: head top at y=106. Pad 170px at top.
    5: {'pad': 170, 'crop': (0, 0, 1696, int(1696 * 4 / 3))},

    # 6. Beige blazer woman: 1696x2528.
    6: {'pad': 0, 'crop': (0, 0, 1696, int(1696 * 4 / 3))},

    # 7. Polo folded arms: start crop at y=200 to bring head up to cyan line
    7: {'pad': 0, 'crop': (0, 200, 1696, 200 + int(1696 * 4 / 3))},

    # 8. Suit narrow tie:
    8: {'pad': 0, 'crop': (0, 0, 1695, int(1695 * 4 / 3))},

    # 9. Beard patterned tie: start crop at y=120
    9: {'pad': 0, 'crop': (0, 120, 1696, 120 + int(1696 * 4 / 3))},

    # 10. Parted wavy hair: pad 80px at top
    10: {'pad': 80, 'crop': (0, 0, 1696, int(1696 * 4 / 3))},

    # 11. photo_2: 1024x1445. Start crop at y=60
    11: {'pad': 0, 'crop': (0, 60, 1024, 60 + int(1024 * 4 / 3))},

    # 12. Strategist: 1027x1531. Start crop at y=40
    12: {'pad': 0, 'crop': (0, 40, 1027, 40 + int(1027 * 4 / 3))},
}

card_w, card_h = 300, 400
strip = Image.new('RGB', (card_w * 6, card_h * 2), color=(20, 24, 30))
draw = ImageDraw.Draw(strip)

for idx, p in members:
    im = Image.open(p).convert('RGB')
    conf = configs[idx]
    if conf['pad'] > 0:
        im = add_top_padding(im, conf['pad'])
    
    cropped = im.crop(conf['crop'])
    resized = cropped.resize((card_w, card_h), Image.Resampling.LANCZOS)
    
    col = (idx - 1) % 6
    row = (idx - 1) // 6
    x = col * card_w
    y = row * card_h
    strip.paste(resized, (x, y))

# Draw horizontal alignment guide lines
for row in [0, 1]:
    base_y = row * card_h
    # Head crown line (Cyan at y = 44px / 11%)
    draw.line([(0, base_y + 44), (card_w * 6, base_y + 44)], fill=(0, 255, 255), width=2)
    # Eye line (Yellow at y = 130px / 32.5%)
    draw.line([(0, base_y + 130), (card_w * 6, base_y + 130)], fill=(255, 255, 0), width=1)
    # Chin line (Magenta at y = 200px / 50%)
    draw.line([(0, base_y + 200), (card_w * 6, base_y + 200)], fill=(255, 0, 255), width=2)

out_preview = 'scripts/team_alignment_preview.png'
strip.save(out_preview)
print(f"Updated alignment preview saved to {out_preview}")
