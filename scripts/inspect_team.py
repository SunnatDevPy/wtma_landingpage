import os
from PIL import Image
import numpy as np

def desc(im_path):
    im = Image.open(im_path).convert('RGB')
    arr = np.array(im)
    h, w, _ = arr.shape
    top_bg = arr[:int(h*0.05), :, :].mean(axis=(0,1))
    bot_cl = arr[-int(h*0.1):, :, :].mean(axis=(0,1))
    center = arr[int(h*0.25):int(h*0.45), int(w*0.3):int(w*0.7), :].mean(axis=(0,1))
    return f"size={w}x{h} bg=({top_bg[0]:.0f},{top_bg[1]:.0f},{top_bg[2]:.0f}) face=({center[0]:.0f},{center[1]:.0f},{center[2]:.0f}) bot=({bot_cl[0]:.0f},{bot_cl[1]:.0f},{bot_cl[2]:.0f})"

print("--- CURRENT TEAM (images/team) ---")
for i in range(1, 13):
    f = f"member_{i:02d}.webp"
    p = os.path.join("images/team", f)
    print(f"{f:15}: {desc(p)}")

print("\n--- TEAM V2 (images/team_v2) ---")
for f in sorted(os.listdir("images/team_v2")):
    p = os.path.join("images/team_v2", f)
    print(f"{f:55}: {desc(p)}")

print("\n--- PERSONAL IMAGES (design_assets/personal_images) ---")
for f in sorted(os.listdir("design_assets/personal_images")):
    p = os.path.join("design_assets/personal_images", f)
    print(f"{f:55}: {desc(p)}")
