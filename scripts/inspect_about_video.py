import bpy
import os

video_path = "C:/Projects/wtma_landingPage/gemini_generated_video_e514b6dc.mp4"
scene = bpy.context.scene
scene.sequence_editor_create()
strip = scene.sequence_editor.strips.new_movie('AboutVid', video_path, channel=1, frame_start=1)

fps = scene.render.fps
total_frames = int(strip.frame_duration)
duration_sec = total_frames / fps

print(f"Total frames: {total_frames}, FPS: {fps}, Duration: {duration_sec:.2f} seconds")

out_dir = "C:/Projects/wtma_landingPage/images/about-inspect"
os.makedirs(out_dir, exist_ok=True)

scene.render.resolution_x = 1280
scene.render.resolution_y = 720
scene.render.image_settings.file_format = 'JPEG'
scene.render.image_settings.quality = 85

# Sample frames every 2 seconds or across 0s to duration_sec
step_sec = 2
for s in range(0, int(duration_sec) + 1, step_sec):
    f = max(1, min(int(s * fps), total_frames))
    scene.frame_set(f)
    scene.render.filepath = os.path.join(out_dir, f"sample_{s}s_frame_{f}.jpg")
    bpy.ops.render.render(write_still=True)
    print(f"Saved sample at {s}s (frame {f})")

# Also sample around 8s, 9s, 10s, 11s, 12s, 13s, 14s
for s in [8, 9, 10, 11, 12, 13, 14]:
    if s <= duration_sec:
        f = int(s * fps)
        scene.frame_set(f)
        scene.render.filepath = os.path.join(out_dir, f"detail_{s}s_frame_{f}.jpg")
        bpy.ops.render.render(write_still=True)
        print(f"Saved detail at {s}s (frame {f})")
