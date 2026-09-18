import bpy
import os

print("=== Extracting 120 Frames from Pure Globe (frame 260 to 480) ===")

scene = bpy.context.scene
scene.sequence_editor_create()

video_path = "C:/Projects/wtma_landingPage/gemini_generated_video_e514b6dc.mp4"
strip = scene.sequence_editor.strips.new_movie('AboutVid', video_path, channel=1, frame_start=1)

scene.render.resolution_x = 1280
scene.render.resolution_y = 720
scene.render.image_settings.file_format = 'JPEG'
scene.render.image_settings.quality = 90

out_dir = "C:/Projects/wtma_landingPage/images/about-sequence"
os.makedirs(out_dir, exist_ok=True)

start_frame = 260
end_frame = 480
total_output_frames = 120

for i in range(total_output_frames):
    f = int(round(start_frame + i * (end_frame - start_frame) / (total_output_frames - 1)))
    scene.frame_set(f)
    frame_name = f"frame_{i+1:03d}.jpg"
    scene.render.filepath = os.path.join(out_dir, frame_name)
    bpy.ops.render.render(write_still=True)
    if (i+1) % 20 == 0 or (i+1) == 1:
        print(f"Extracted {i+1}/120 frames (video frame {f} -> {frame_name})")

print("=== Successfully Extracted 120 Pure Globe Network Frames! ===")
