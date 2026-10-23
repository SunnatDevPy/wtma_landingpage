import os
import shutil
from PIL import Image, ImageFilter

raw_backup_dir = 'images/team_v2_raw'
os.makedirs(raw_backup_dir, exist_ok=True)

members = [
    {
        'id': 1,
        'src': 'images/team_v2/hf_20260127_195347_367ee063-8593-4793-aea5-9b274a7478c3.png',
        'dest_v2': 'images/team_v2/hf_20260127_195347_367ee063-8593-4793-aea5-9b274a7478c3.png',
        'dest_team': 'images/team/member_01.webp',
        'top_pad': 0,
        'bot_pad': 0,
        'crop': (0, 100, 1696, 100 + int(1696 * 4 / 3)),
    },
    {
        'id': 2,
        'src': 'images/team_v2/hf_20260127_195134_ca953d49-5792-4390-8b63-9927ba004164.png',
        'dest_v2': 'images/team_v2/hf_20260127_195134_ca953d49-5792-4390-8b63-9927ba004164.png',
        'dest_team': 'images/team/member_02.webp',
        'top_pad': 100,
        'bot_pad': 0,
        'crop': (0, 0, 1696, int(1696 * 4 / 3)),
    },
    {
        'id': 3,
        'src': 'images/team_v2/photo_5_2026-10-22_15-53-18.jpg',
        'dest_v2': 'images/team_v2/photo_5_2026-10-22_15-53-18.jpg',
        'dest_team': 'images/team/member_03.webp',
        'top_pad': 180,
        'bot_pad': 0,
        'crop': (0, 0, 1696, int(1696 * 4 / 3)),
    },
    {
        'id': 4,
        'src': r'C:\Users\user\.gemini\antigravity-ide\brain\64063292-8c18-459b-9427-9b2bb533ce0c\.user_uploaded\media_1792726826687.png',
        'dest_v2': 'images/team_v2/photo_member_04.png',
        'dest_team': 'images/team/member_04.webp',
        'top_pad': 0,
        'bot_pad': 0,
        'crop': (0, 0, 670, int(670 * 4 / 3)),
    },
    {
        'id': 5,
        'src': 'images/team_v2/hf_20260127_195826_26697fd7-7f3d-4f25-b7ff-546ae0502fc2.png',
        'dest_v2': 'images/team_v2/hf_20260127_195826_26697fd7-7f3d-4f25-b7ff-546ae0502fc2.png',
        'dest_team': 'images/team/member_05.webp',
        'top_pad': 60,
        'bot_pad': 0,
        'crop': (48, 0, 1648, int(1600 * 4 / 3)),
    },
    {
        'id': 6,
        'src': 'images/team_v2/hf_20260127_203328_1d8e4205-4b6d-4dbe-97fc-4cb0c7b7c968.png',
        'dest_v2': 'images/team_v2/hf_20260127_203328_1d8e4205-4b6d-4dbe-97fc-4cb0c7b7c968.png',
        'dest_team': 'images/team/member_06.webp',
        'top_pad': 0,
        'bot_pad': 0,
        'crop': (0, 0, 1696, int(1696 * 4 / 3)),
    },
    {
        'id': 7,
        'src': 'images/team_v2/hf_20260127_225725_578c51f4-74c6-4a99-b163-07d0d74102da.png',
        'dest_v2': 'images/team_v2/hf_20260127_225725_578c51f4-74c6-4a99-b163-07d0d74102da.png',
        'dest_team': 'images/team/member_07.webp',
        'top_pad': 160,
        'bot_pad': 0,
        'crop': (0, 0, 1696, int(1696 * 4 / 3)),
    },
    {
        'id': 8,
        'src': 'images/team_v2/photo_3_2026-10-22_15-53-18.jpg',
        'dest_v2': 'images/team_v2/photo_3_2026-10-22_15-53-18.jpg',
        'dest_team': 'images/team/member_08.webp',
        'top_pad': 0,
        'bot_pad': 0,
        'crop': (0, 0, 1695, int(1695 * 4 / 3)),
    },
    {
        'id': 9,
        'src': 'images/team_v2/photo_4_2026-10-22_15-53-18.jpg',
        'dest_v2': 'images/team_v2/photo_4_2026-10-22_15-53-18.jpg',
        'dest_team': 'images/team/member_09.webp',
        'top_pad': 0,
        'bot_pad': 150,
        'crop': (0, 100, 1696, 100 + int(1696 * 4 / 3)),
    },
    {
        'id': 10,
        'src': 'images/team_v2/hf_20260127_232544_27eb7b13-5714-4472-8573-36aa07abee96.png',
        'dest_v2': 'images/team_v2/hf_20260127_232544_27eb7b13-5714-4472-8573-36aa07abee96.png',
        'dest_team': 'images/team/member_10.webp',
        'top_pad': 80,
        'bot_pad': 0,
        'crop': (0, 0, 1696, int(1696 * 4 / 3)),
    },
    {
        'id': 11,
        'src': 'images/team_v2/photo_2_2026-10-22_15-53-18.jpg',
        'dest_v2': 'images/team_v2/photo_2_2026-10-22_15-53-18.jpg',
        'dest_team': 'images/team/member_11.webp',
        'top_pad': 0,
        'bot_pad': 0,
        'crop': (0, 60, 1024, 60 + int(1024 * 4 / 3)),
    },
    {
        'id': 12,
        'src': r'design_assets\personal_images\photo_2026-10-13_21-13-15.jpg',
        'dest_v2': 'images/team_v2/photo_member_12.png',
        'dest_team': 'images/team/member_12.webp',
        'top_pad': 0,
        'bot_pad': 0,
        'crop': (0, 40, 1027, 40 + int(1027 * 4 / 3)),
    },
]

def pad_image_seamless(im, top_pad, bot_pad):
    w, h = im.size
    new_h = h + top_pad + bot_pad
    new_im = Image.new('RGB', (w, new_h))
    
    # 1. Top pad (pure top background slice stretched with blur)
    if top_pad > 0:
        sample_h = min(60, h)
        top_slice = im.crop((0, 0, w, sample_h))
        stretched = top_slice.resize((w, top_pad), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(radius=4))
        new_im.paste(stretched, (0, 0))
        
    # 2. Main image
    new_im.paste(im, (0, top_pad))
    
    # 3. Bottom pad (pure bottom suit slice with blur)
    if bot_pad > 0:
        sample_h = min(80, h)
        bot_slice = im.crop((0, h - sample_h, w, h)).transpose(Image.Transpose.FLIP_TOP_BOTTOM)
        stretched_bot = bot_slice.resize((w, bot_pad), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(radius=2))
        new_im.paste(stretched_bot, (0, top_pad + h))
        
    return new_im

target_dim = (900, 1200)

for m in members:
    base = os.path.basename(m['src'])
    raw_source = os.path.join(raw_backup_dir, f"{m['id']:02d}_{base}")
    if not os.path.exists(raw_source):
        raw_source = m['src']
        
    im = Image.open(raw_source).convert('RGB')
    
    if m['top_pad'] > 0 or m['bot_pad'] > 0:
        im = pad_image_seamless(im, m['top_pad'], m['bot_pad'])
        
    cropped = im.crop(m['crop'])
    resized = cropped.resize(target_dim, Image.Resampling.LANCZOS)
    
    # Save to images/team_v2/
    dest_v2 = m['dest_v2']
    if dest_v2.lower().endswith('.png'):
        resized.save(dest_v2, format='PNG', optimize=True)
    elif dest_v2.lower().endswith('.jpg') or dest_v2.lower().endswith('.jpeg'):
        resized.save(dest_v2, format='JPEG', quality=95, subsampling=0)
        
    # Save to images/team/
    dest_team = m['dest_team']
    resized.save(dest_team, format='WEBP', quality=95, method=6)
    
    print(f"Member {m['id']:02d} processed -> {dest_v2} & {dest_team}")

# Remove temp file if exists
if os.path.exists('test_m3.jpg'):
    os.remove('test_m3.jpg')

print("\nAll 12 members updated perfectly!")
