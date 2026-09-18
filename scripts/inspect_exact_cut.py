import bpy
import os

video_path = "C:/Projects/wtma_landingPage/gemini_generated_video_e514b6dc.mp4"
scene = bpy.context.scene
scene.sequence_editor_create()
strip = scene.sequence_editor.strips.new_movie('AboutVid', video_path, channel=1, frame_start=1)

out_dir = "C:/Projects/wtma_landingPage/images/about-inspect2"
os.makedirs(out_dir, exist_ok=True)
scene.render.resolution_x = 640
scene.render.resolution_y = 360
scene.render.image_settings.file_format = 'JPEG'
scene.render.image_settings.quality = 70

# Check every 10 frames from 220 to 300
for f in range(220, 301, 10):
    scene.frame_set(f)
    scene.render.filepath = os.path.join(out_dir, f"f_{f}.jpg")
    bpy.ops.render.render(write_still=True)
print("Done rendering 220-300")
