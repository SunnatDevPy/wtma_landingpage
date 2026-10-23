import re

with open('index.html', encoding='utf-8') as f:
    html = f.read()

imgs = re.findall(r'images/team_v2/[^\"]+', html)
print(f'Total team members in index.html: {len(imgs)}')
for i, img in enumerate(imgs, 1):
    print(f'{i:02d}: {img}')
