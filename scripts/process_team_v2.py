import os
from PIL import Image

# Mapping from destination member file to source in team_v2
crops = {
    'member_01.webp': {
        'src': 'images/team_v2/hf_20260127_195347_367ee063-8593-4793-aea5-9b274a7478c3 (1).png',
        'crop_box': (0, 40, 1696, 40 + int(1696 * 4 / 3)), # 40, 2301
    },
    'member_02.webp': {
        'src': 'images/team_v2/hf_20260127_195134_ca953d49-5792-4390-8b63-9927ba004164.png',
        'crop_box': (0, 50, 1696, 50 + int(1696 * 4 / 3)),
    },
    'member_03.webp': {
        'src': 'images/team_v2/photo_5_2026-10-22_15-53-18.jpg',
        'crop_box': (0, 40, 1696, 40 + int(1696 * 4 / 3)),
    },
    'member_05.webp': {
        'src': 'images/team_v2/hf_20260127_195826_26697fd7-7f3d-4f25-b7ff-546ae0502fc2.png',
        'crop_box': (0, 50, 1696, 50 + int(1696 * 4 / 3)),
    },
    'member_06.webp': {
        'src': 'images/team_v2/hf_20260127_203328_1d8e4205-4b6d-4dbe-97fc-4cb0c7b7c968.png',
        'crop_box': (0, 50, 1696, 50 + int(1696 * 4 / 3)),
    },
    'member_07.webp': {
        'src': 'images/team_v2/hf_20260127_225725_578c51f4-74c6-4a99-b163-07d0d74102da.png',
        'crop_box': (0, 50, 1696, 50 + int(1696 * 4 / 3)),
    },
    'member_08.webp': {
        'src': 'images/team_v2/photo_3_2026-10-22_15-53-18.jpg',
        'crop_box': (0, 30, 1695, 30 + int(1695 * 4 / 3)),
    },
    'member_09.webp': {
        'src': 'images/team_v2/photo_4_2026-10-22_15-53-18.jpg',
        'crop_box': (3, 0, 3 + int(2254 * 3 / 4), 2254),
    },
    'member_10.webp': {
        'src': 'images/team_v2/hf_20260127_232544_27eb7b13-5714-4472-8573-36aa07abee96.png',
        'crop_box': (0, 50, 1696, 50 + int(1696 * 4 / 3)),
    },
    'member_11.webp': {
        'src': 'images/team_v2/photo_2_2026-10-22_15-53-18.jpg',
        'crop_box': (0, 25, 1024, 25 + int(1024 * 4 / 3)),
    },
}

target_size = (600, 800)
os.makedirs('images/team_backup', exist_ok=True)

for dest_name, conf in crops.items():
    dest_path = os.path.join('images/team', dest_name)
    backup_path = os.path.join('images/team_backup', dest_name)
    
    # Backup current file if not already backed up
    if os.path.exists(dest_path) and not os.path.exists(backup_path):
        with open(dest_path, 'rb') as f_in, open(backup_path, 'wb') as f_out:
            f_out.write(f_in.read())
            
    # Open source, crop, resize and save as WebP
    im = Image.open(conf['src']).convert('RGB')
    cropped = im.crop(conf['crop_box'])
    resized = cropped.resize(target_size, Image.Resampling.LANCZOS)
    resized.save(dest_path, 'WEBP', quality=90, method=6)
    print(f"Updated {dest_name}: from {conf['src']} -> {target_size}")

print("\nAll 10 team images successfully processed!")
