import bpy
import os

print("=== Extracting Frames from Gemini Generated Video ===")

scene = bpy.context.scene
scene.sequence_editor_create()

video_path = "C:/Projects/wtma_landingPage/gemini_generated_video_e64c67ea.mp4"
strip = scene.sequence_editor.strips.new_movie('GeminiVid', video_path, channel=1, frame_start=1)

scene.render.resolution_x = 1280
scene.render.resolution_y = 720
scene.render.image_settings.file_format = 'JPEG'
scene.render.image_settings.quality = 92

out_dir = "C:/Projects/wtma_landingPage/images/gemini-sequence"
os.makedirs(out_dir, exist_ok=True)

# 240 frames in original video. Extract every 2nd frame = 120 smooth frames!
total = 240
step = 2
count = 1

for f in range(1, total + 1, step):
    scene.frame_set(f)
    frame_name = f"frame_{count:03d}.jpg"
    scene.render.filepath = os.path.join(out_dir, frame_name)
    bpy.ops.render.render(write_still=True)
    if count % 20 == 0 or count == 1:
        print(f"Extracted {count}/120 frames ({frame_name})")
    count += 1

print(f"=== Successfully Extracted {count-1} Frames! ===")
