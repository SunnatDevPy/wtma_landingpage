import os
import base64
from io import BytesIO
from PIL import Image

def to_base64_thumb(im_path, max_size=(150, 200)):
    try:
        im = Image.open(im_path).convert('RGB')
        im.thumbnail(max_size)
        buf = BytesIO()
        im.save(buf, format='JPEG', quality=80)
        return 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode('utf-8')
    except Exception as e:
        return ''

html = ['<!DOCTYPE html><html><head><meta charset="utf-8"><title>Team Compare</title>',
        '<style>body{font-family:sans-serif;background:#111;color:#eee;padding:20px;}',
        'table{border-collapse:collapse;width:100%;margin-bottom:40px;}',
        'th,td{border:1px solid #444;padding:10px;text-align:center;vertical-align:top;}',
        'img{max-width:140px;border-radius:4px;display:block;margin:0 auto 6px;}',
        '</style></head><body>',
        '<h1>Team Comparison</h1>',
        '<h2>1. Current index.html Team (12 members)</h2><table><tr>']

for i in range(1, 13):
    html.append(f'<th>Member {i:02d}</th>')
html.append('</tr><tr>')

for i in range(1, 13):
    p = f'images/team/member_{i:02d}.webp'
    b64 = to_base64_thumb(p)
    html.append(f'<td><img src="{b64}"><br><b>member_{i:02d}.webp</b></td>')
html.append('</tr></table>')

html.append('<h2>2. images/team_v2 (10 files)</h2><table><tr>')
v2_files = sorted(os.listdir('images/team_v2'))
for f in v2_files:
    html.append(f'<th>{f[:20]}...</th>')
html.append('</tr><tr>')
for f in v2_files:
    p = os.path.join('images/team_v2', f)
    b64 = to_base64_thumb(p)
    html.append(f'<td><img src="{b64}"><br><small>{f}</small></td>')
html.append('</tr></table>')

html.append('<h2>3. design_assets/personal_images (12 files)</h2><table><tr>')
pers_files = sorted(os.listdir('design_assets/personal_images'))
for f in pers_files:
    html.append(f'<th>{f[:20]}...</th>')
html.append('</tr><tr>')
for f in pers_files:
    p = os.path.join('design_assets/personal_images', f)
    b64 = to_base64_thumb(p)
    html.append(f'<td><img src="{b64}"><br><small>{f}</small></td>')
html.append('</tr></table></body></html>')

with open('scratch_team_compare.html', 'w', encoding='utf-8') as f:
    f.write(''.join(html))

print("Created scratch_team_compare.html")
