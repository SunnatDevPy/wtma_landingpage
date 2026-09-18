import bpy
import os

video_path = "C:/Projects/wtma_landingPage/gemini_generated_video_589fbcb9.mp4"
scene = bpy.context.scene
scene.sequence_editor_create()
strip = scene.sequence_editor.strips.new_movie('NapravVid', video_path, channel=1, frame_start=1)

print(f"Video duration frames: {strip.frame_duration}")
print(f"FPS: {scene.render.fps}")

out_dir = "C:/Projects/wtma_landingPage/images/napravleniya-preview"
os.makedirs(out_dir, exist_ok=True)

scene.render.resolution_x = 1280
scene.render.resolution_y = 720
scene.render.image_settings.file_format = 'JPEG'
scene.render.image_settings.quality = 90

total = int(strip.frame_duration)
sample_points = [1, int(total * 0.25), int(total * 0.5), int(total * 0.75), total]

for i, f in enumerate(sample_points):
    scene.frame_set(f)
    scene.render.filepath = os.path.join(out_dir, f"sample_{i}_{f}.jpg")
    bpy.ops.render.render(write_still=True)
    print(f"Saved sample {i} at frame {f}")
