import os
from PIL import Image, ImageDraw

# Configuration for 12 members:
# For each member, we define the crop box (left, top, right, bottom) in the source image
# Such that:
# 1. Aspect ratio of crop box is EXACTLY 3:4 (i.e. (right - left) / (bottom - top) == 3/4)
# 2. In the resulting crop, the crown of the head is at approximately 11-13% from the top
# 3. The face is centered horizontally
# 4. The chin is at approximately 48-52% from the top
# 5. Output resolution is high quality (750x1000 or 900x1200)

members_info = [
    {
        'id': 1,
        'name': 'm01',
        'src': 'images/team_v2/hf_20260127_195347_367ee063-8593-4793-aea5-9b274a7478c3.png',
        # 1696x2528
    },
    {
        'id': 2,
        'name': 'm02',
        'src': 'images/team_v2/hf_20260127_195134_ca953d49-5792-4390-8b63-9927ba004164.png',
        # 1696x2528
    },
    {
        'id': 3,
        'name': 'm03',
        'src': 'images/team_v2/photo_5_2026-10-22_15-53-18.jpg',
        # 1696x2423
    },
    {
        'id': 4,
        'name': 'm04',
        'src': r'C:\Users\user\.gemini\antigravity-ide\brain\64063292-8c18-459b-9427-9b2bb533ce0c\.user_uploaded\media_1792726826687.png',
        # 670x1024
    },
    {
        'id': 5,
        'name': 'm05',
        'src': 'images/team_v2/hf_20260127_195826_26697fd7-7f3d-4f25-b7ff-546ae0502fc2.png',
        # 1696x2528
    },
    {
        'id': 6,
        'name': 'm06',
        'src': 'images/team_v2/hf_20260127_203328_1d8e4205-4b6d-4dbe-97fc-4cb0c7b7c968.png',
        # 1696x2528
    },
    {
        'id': 7,
        'name': 'm07',
        'src': 'images/team_v2/hf_20260127_225725_578c51f4-74c6-4a99-b163-07d0d74102da.png',
        # 1696x2528
    },
    {
        'id': 8,
        'name': 'm08',
        'src': 'images/team_v2/photo_3_2026-10-22_15-53-18.jpg',
        # 1695x2332
    },
    {
        'id': 9,
        'name': 'm09',
        'src': 'images/team_v2/photo_4_2026-10-22_15-53-18.jpg',
        # 1696x2254
    },
    {
        'id': 10,
        'name': 'm10',
        'src': 'images/team_v2/hf_20260127_232544_27eb7b13-5714-4472-8573-36aa07abee96.png',
        # 1696x2528
    },
    {
        'id': 11,
        'name': 'm11',
        'src': 'images/team_v2/photo_2_2026-10-22_15-53-18.jpg',
        # 1024x1445
    },
    {
        'id': 12,
        'name': 'm12',
        'src': r'design_assets\personal_images\photo_2026-10-13_21-13-15.jpg',
        # 1027x1531
    },
]

print("Members list initialized.")
