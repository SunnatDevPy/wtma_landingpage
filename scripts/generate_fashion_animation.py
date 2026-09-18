import bpy
import math
import os

print("=== Starting WTMA Haute Couture 3D Animation Generation ===")

# Reset Blender to empty scene
bpy.ops.wm.read_factory_settings(use_empty=True)

scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 960
scene.render.resolution_y = 960
scene.render.film_transparent = True
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'

TOTAL_FRAMES = 60
scene.frame_start = 1
scene.frame_end = TOTAL_FRAMES

# Output directory
output_dir = "C:/Projects/wtma_landingPage/images/blender-sequence"
os.makedirs(output_dir, exist_ok=True)

# -------------------------------------------------------------
# 1. LUXURY STUDIO LIGHTING (Apple Keynote & Fashion Runway)
# -------------------------------------------------------------
# Key Light (Main soft light from upper front-right)
key_light_data = bpy.data.lights.new(name="KeyLight", type='AREA')
key_light_data.energy = 650
key_light_data.size = 3.5
key_light_data.color = (1.0, 0.98, 0.94)
key_light_obj = bpy.data.objects.new("KeyLight", key_light_data)
key_light_obj.location = (2.8, -3.8, 3.8)
key_light_obj.rotation_euler = (math.radians(52), math.radians(12), math.radians(-28))
scene.collection.objects.link(key_light_obj)

# WTMA Crimson Red Rim Light (Dramatic backlight from rear-left)
rim_light_data = bpy.data.lights.new(name="RimRedLight", type='AREA')
rim_light_data.energy = 950
rim_light_data.size = 3.0
rim_light_data.color = (0.92, 0.12, 0.08) # Signature WTMA Red
rim_light_obj = bpy.data.objects.new("RimRedLight", rim_light_data)
rim_light_obj.location = (-3.2, 3.2, 2.6)
rim_light_obj.rotation_euler = (math.radians(-50), 0, math.radians(135))
scene.collection.objects.link(rim_light_obj)

# Fill Light (Soft cool fill from front-left)
fill_light_data = bpy.data.lights.new(name="FillLight", type='AREA')
fill_light_data.energy = 220
fill_light_data.size = 3.0
fill_light_data.color = (0.75, 0.85, 1.0)
fill_light_obj = bpy.data.objects.new("FillLight", fill_light_data)
fill_light_obj.location = (-3.0, -3.0, 1.2)
fill_light_obj.rotation_euler = (math.radians(35), math.radians(-20), math.radians(30))
scene.collection.objects.link(fill_light_obj)

# Silk Gold Accent Light (Underlight highlighting buttons & lower cloth)
gold_light_data = bpy.data.lights.new(name="GoldLight", type='POINT')
gold_light_data.energy = 140
gold_light_data.color = (1.0, 0.72, 0.25)
gold_light_obj = bpy.data.objects.new("GoldLight", gold_light_data)
gold_light_obj.location = (0.2, -1.8, -0.4)
scene.collection.objects.link(gold_light_obj)

# -------------------------------------------------------------
# 2. CAMERA CHOREOGRAPHY
# -------------------------------------------------------------
cam_data = bpy.data.cameras.new("FashionCam")
cam_data.lens = 65 # Portrait focal length for luxury compression
cam_obj = bpy.data.objects.new("FashionCam", cam_data)
scene.collection.objects.link(cam_obj)
scene.camera = cam_obj

# Camera tracking empty
target_empty = bpy.data.objects.new("CamTarget", None)
target_empty.location = (0, 0, 1.1)
scene.collection.objects.link(target_empty)

track_constraint = cam_obj.constraints.new(type='TRACK_TO')
track_constraint.target = target_empty
track_constraint.track_axis = 'TRACK_NEGATIVE_Z'
track_constraint.up_axis = 'UP_Y'

# Animate Camera Orbit smoothly
for f in range(1, TOTAL_FRAMES + 1):
    scene.frame_set(f)
    t = (f - 1) / (TOTAL_FRAMES - 1)
    
    # Smooth cinematic arc around the garment
    # Frame 1: Slightly pulled back and angled to see flying threads
    # Frame 40: Moves closer as jacket forms
    # Frame 60: Orbits gently for the fashion runway reveal
    cam_dist = 5.2 - (0.6 * math.sin(t * math.pi))
    cam_angle = math.radians(-25) + (t * math.radians(50))
    
    cam_x = math.sin(cam_angle) * cam_dist
    cam_y = -math.cos(cam_angle) * cam_dist
    cam_z = 1.3 + math.sin(t * math.pi * 2) * 0.25
    
    cam_obj.location = (cam_x, cam_y, cam_z)
    cam_obj.keyframe_insert(data_path="location", frame=f)

# -------------------------------------------------------------
# 3. HIGH-FASHION MATERIALS
# -------------------------------------------------------------
# Luxury Charcoal Wool / Silk Blazer Fabric
blazer_mat = bpy.data.materials.new(name="BlazerFabric")
b_bsdf = blazer_mat.node_tree.nodes.get("Principled BSDF")
if b_bsdf:
    if "Base Color" in b_bsdf.inputs:
        b_bsdf.inputs["Base Color"].default_value = (0.025, 0.03, 0.045, 1.0)
    if "Roughness" in b_bsdf.inputs:
        b_bsdf.inputs["Roughness"].default_value = 0.42
    if "Sheen Weight" in b_bsdf.inputs:
        b_bsdf.inputs["Sheen Weight"].default_value = 1.0
    if "Coat Weight" in b_bsdf.inputs:
        b_bsdf.inputs["Coat Weight"].default_value = 0.35

# Inner Lapel & Trim Crimson Silk
red_silk_mat = bpy.data.materials.new(name="RedSilk")
r_bsdf = red_silk_mat.node_tree.nodes.get("Principled BSDF")
if r_bsdf:
    if "Base Color" in r_bsdf.inputs:
        r_bsdf.inputs["Base Color"].default_value = (0.75, 0.08, 0.06, 1.0)
    if "Roughness" in r_bsdf.inputs:
        r_bsdf.inputs["Roughness"].default_value = 0.25
    if "Coat Weight" in r_bsdf.inputs:
        r_bsdf.inputs["Coat Weight"].default_value = 0.8
    if "Emission Color" in r_bsdf.inputs:
        r_bsdf.inputs["Emission Color"].default_value = (0.75, 0.08, 0.06, 1.0)
    if "Emission Strength" in r_bsdf.inputs:
        r_bsdf.inputs["Emission Strength"].default_value = 0.2

# Gold Thread / Metallic Material
gold_mat = bpy.data.materials.new(name="GoldMetal")
g_bsdf = gold_mat.node_tree.nodes.get("Principled BSDF")
if g_bsdf:
    if "Base Color" in g_bsdf.inputs:
        g_bsdf.inputs["Base Color"].default_value = (0.95, 0.78, 0.28, 1.0)
    if "Metallic" in g_bsdf.inputs:
        g_bsdf.inputs["Metallic"].default_value = 0.92
    if "Roughness" in g_bsdf.inputs:
        g_bsdf.inputs["Roughness"].default_value = 0.18

# Mannequin Stand Matte Black Material
stand_mat = bpy.data.materials.new(name="MannequinStand")
s_bsdf = stand_mat.node_tree.nodes.get("Principled BSDF")
if s_bsdf:
    if "Base Color" in s_bsdf.inputs:
        s_bsdf.inputs["Base Color"].default_value = (0.05, 0.06, 0.08, 1.0)
    if "Roughness" in s_bsdf.inputs:
        s_bsdf.inputs["Roughness"].default_value = 0.85

# -------------------------------------------------------------
# 4. SCULPTING THE 3D TAILORED JACKET & MANNEQUIN
# -------------------------------------------------------------
# Main Torso Structure (Tailored Silhouette)
bpy.ops.mesh.primitive_cylinder_add(radius=0.75, depth=2.4, location=(0, 0, 1.1), vertices=32)
torso_obj = bpy.context.active_object
torso_obj.name = "TailoredTorso"
torso_obj.data.materials.append(blazer_mat)

# Add Subdivision Surface for silky curves
subsurf = torso_obj.modifiers.new(name="Subsurf", type='SUBSURF')
subsurf.levels = 2
subsurf.render_levels = 2

# Sculpt Torso Shape (Shoulders, waist taper, chest)
mesh = torso_obj.data
for vert in mesh.vertices:
    z = vert.co.z
    # Shoulder flare at top
    if z > 0.6:
        vert.co.x *= 1.35
        vert.co.y *= 0.85
    # Tapered athletic waist in middle
    elif -0.3 < z <= 0.6:
        vert.co.x *= 1.05
        vert.co.y *= 0.95
    # Hip flare at bottom
    else:
        vert.co.x *= 1.15
        vert.co.y *= 1.05

# Left Lapel (Yoqa qanoti)
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(-0.35, -0.72, 1.45))
left_lapel = bpy.context.active_object
left_lapel.scale = (0.28, 0.05, 0.75)
left_lapel.rotation_euler = (math.radians(-14), math.radians(22), math.radians(-18))
left_lapel.data.materials.append(red_silk_mat)

# Right Lapel
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.35, -0.72, 1.45))
right_lapel = bpy.context.active_object
right_lapel.scale = (0.28, 0.05, 0.75)
right_lapel.rotation_euler = (math.radians(-14), math.radians(-22), math.radians(18))
right_lapel.data.materials.append(blazer_mat)

# Collar (Stoyka yoqa)
bpy.ops.mesh.primitive_torus_add(major_radius=0.55, minor_radius=0.08, location=(0, -0.05, 2.25))
collar = bpy.context.active_object
collar.rotation_euler = (math.radians(12), 0, 0)
collar.data.materials.append(blazer_mat)

# Mannequin Stand Base & Neck
bpy.ops.mesh.primitive_cylinder_add(radius=0.25, depth=0.8, location=(0, 0, 2.5), vertices=24)
neck = bpy.context.active_object
neck.data.materials.append(stand_mat)

bpy.ops.mesh.primitive_cylinder_add(radius=0.06, depth=1.6, location=(0, 0, -0.5), vertices=16)
stand_pole = bpy.context.active_object
stand_pole.data.materials.append(stand_mat)

bpy.ops.mesh.primitive_cylinder_add(radius=0.9, depth=0.08, location=(0, 0, -1.3), vertices=32)
stand_base = bpy.context.active_object
stand_base.data.materials.append(stand_mat)

# Metallic Gold Buttons
button_y_offset = -0.78
buttons = []
for idx, b_z in enumerate([1.1, 0.7, 0.3]):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.065, depth=0.03, location=(0.04, button_y_offset, b_z), vertices=24)
    btn = bpy.context.active_object
    btn.rotation_euler = (math.radians(90), 0, 0)
    btn.data.materials.append(gold_mat)
    buttons.append(btn)

# Breast Pocket with Red Silk Handkerchief
bpy.ops.mesh.primitive_cone_add(radius1=0.14, depth=0.35, location=(0.42, -0.68, 1.55))
pocket_square = bpy.context.active_object
pocket_square.rotation_euler = (math.radians(-35), math.radians(25), math.radians(15))
pocket_square.data.materials.append(red_silk_mat)

# Group all garment objects for synchronized metamorphosis animation
garment_elements = [torso_obj, left_lapel, right_lapel, collar, pocket_square] + buttons

# -------------------------------------------------------------
# 5. VOLUMETRIC SILK RIBBONS & YARN FIBERS
# -------------------------------------------------------------
ribbon_curves = []
ribbon_configs = [
    {"color": red_silk_mat, "radius": 0.055, "phi": 0.0, "z_drift": 0.3},
    {"color": gold_mat,     "radius": 0.045, "phi": math.pi * 0.5, "z_drift": -0.2},
    {"color": red_silk_mat, "radius": 0.065, "phi": math.pi * 1.1, "z_drift": 0.5},
    {"color": blazer_mat,   "radius": 0.050, "phi": math.pi * 1.6, "z_drift": -0.4}
]

for idx, cfg in enumerate(ribbon_configs):
    curve_data = bpy.data.curves.new(f"SilkRibbon_{idx}", type='CURVE')
    curve_data.dimensions = '3D'
    curve_data.bevel_depth = cfg["radius"]
    curve_data.bevel_resolution = 4
    
    spline = curve_data.splines.new('BEZIER')
    spline.bezier_points.add(4) # 5 points total
    
    # Base control points spiraling vertically
    for p_idx, pt in enumerate(spline.bezier_points):
        frac = p_idx / 4.0
        angle = cfg["phi"] + (frac * math.pi * 3.5)
        rad = 1.4 + math.sin(frac * math.pi) * 0.4
        
        pt.co = (math.cos(angle) * rad, math.sin(angle) * rad, (frac * 2.6) - 0.2 + cfg["z_drift"])
        pt.handle_left_type = 'AUTO'
        pt.handle_right_type = 'AUTO'
        
    ribbon_obj = bpy.data.objects.new(f"SilkRibbonObj_{idx}", curve_data)
    ribbon_obj.data.materials.append(cfg["color"])
    scene.collection.objects.link(ribbon_obj)
    ribbon_curves.append(ribbon_obj)

# -------------------------------------------------------------
# 6. ANIMATING THE METAMORPHOSIS (Thread -> Weave -> Garment)
# -------------------------------------------------------------
for f in range(1, TOTAL_FRAMES + 1):
    scene.frame_set(f)
    t = (f - 1) / (TOTAL_FRAMES - 1) # 0.0 to 1.0
    
    # --- Phase 1 & 2: Silk Ribbons Swirling and Wrapping ---
    for r_idx, r_obj in enumerate(ribbon_curves):
        # In frames 1-25: wide loose unraveled ribbons
        # In frames 25-50: ribbons wrap tightly into the garment fabric
        # In frames 50-60: settle as tailored accent trims
        if t < 0.45:
            ribbon_scale = 1.8 - (t / 0.45) * 0.7
            ribbon_rot_z = (t * math.pi * 4) + (r_idx * 0.5)
            r_obj.location.z = math.sin(t * math.pi * 3 + r_idx) * 0.4
        else:
            ribbon_scale = 1.1 - (t - 0.45) * 0.15
            ribbon_rot_z = (math.pi * 4) + (t * math.pi * 0.8) + (r_idx * 0.5)
            r_obj.location.z = 0
            
        r_obj.scale = (ribbon_scale, ribbon_scale, ribbon_scale)
        r_obj.rotation_euler.z = ribbon_rot_z
        r_obj.keyframe_insert(data_path="scale", frame=f)
        r_obj.keyframe_insert(data_path="rotation_euler", frame=f)
        r_obj.keyframe_insert(data_path="location", frame=f)
        
    # --- Phase 2 & 3: Tailored Garment Materializes from Fibers ---
    # Up to frame 18: Garment is emerging (scaled down & lower)
    # Frames 18 to 45: Expands, buttons assemble, lapels lock into place
    # Frames 45 to 60: Full haute couture glory with subtle luxury breath
    for elem in garment_elements:
        if t < 0.35:
            # Emerging from vortex
            elem_scale = math.pow(t / 0.35, 2.2) * 0.75
            elem.scale = (elem_scale, elem_scale, elem_scale)
            elem.location.z = elem.location.z if f == 1 else elem.location.z # keep original z
        else:
            # Formed garment with subtle breathing life
            prog = (t - 0.35) / 0.65
            subtle_scale = 0.75 + (prog * 0.25)
            elem.scale = (subtle_scale, subtle_scale, subtle_scale)
            
        elem.keyframe_insert(data_path="scale", frame=f)

print("=== Starting Batch Render of All 60 Frames ===")
for f in range(1, TOTAL_FRAMES + 1):
    scene.frame_set(f)
    frame_filename = f"frame_{f:03d}.png"
    scene.render.filepath = os.path.join(output_dir, frame_filename)
    bpy.ops.render.render(write_still=True)
    if f % 10 == 0 or f == 1 or f == TOTAL_FRAMES:
        print(f"Rendered: {f}/{TOTAL_FRAMES} frames ({frame_filename})")

print("=== ALL 60 BLENDER FRAMES RENDERED SUCCESSFULLY ===")
