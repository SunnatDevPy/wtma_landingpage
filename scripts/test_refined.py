import bpy
import math

print("=== Testing Refined Haute Couture Mannequin & Fine Silk Threads ===")

bpy.ops.wm.read_factory_settings(use_empty=True)

scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 960
scene.render.resolution_y = 960
scene.render.film_transparent = True
scene.render.image_settings.file_format = 'PNG'

# Camera
cam_data = bpy.data.cameras.new("MainCam")
cam_data.lens = 70
cam_obj = bpy.data.objects.new("MainCam", cam_data)
cam_obj.location = (0, -6.2, 1.1)
cam_obj.rotation_euler = (math.radians(82), 0, 0)
scene.collection.objects.link(cam_obj)
scene.camera = cam_obj

# Studio Lighting
# Soft Key light
key = bpy.data.lights.new("Key", 'AREA')
key.energy = 700
key.size = 4.0
key.color = (1.0, 0.98, 0.95)
key_obj = bpy.data.objects.new("Key", key)
key_obj.location = (3.2, -4.5, 4.0)
key_obj.rotation_euler = (math.radians(45), math.radians(15), math.radians(-30))
scene.collection.objects.link(key_obj)

# WTMA Crimson Rim
rim = bpy.data.lights.new("Rim", 'AREA')
rim.energy = 1100
rim.size = 3.5
rim.color = (0.95, 0.08, 0.05)
rim_obj = bpy.data.objects.new("Rim", rim)
rim_obj.location = (-3.5, 3.5, 2.8)
rim_obj.rotation_euler = (math.radians(-45), 0, math.radians(135))
scene.collection.objects.link(rim_obj)

# Gold Accent Underlight
gold_light = bpy.data.lights.new("GoldLight", 'POINT')
gold_light.energy = 180
gold_light.color = (1.0, 0.75, 0.2)
gold_obj = bpy.data.objects.new("GoldLight", gold_light)
gold_obj.location = (0.5, -2.0, -0.2)
scene.collection.objects.link(gold_obj)

# Materials
blazer_mat = bpy.data.materials.new("BlazerFabric")
b_bsdf = blazer_mat.node_tree.nodes.get("Principled BSDF")
if b_bsdf:
    if "Base Color" in b_bsdf.inputs:
        b_bsdf.inputs["Base Color"].default_value = (0.02, 0.025, 0.035, 1.0)
    if "Roughness" in b_bsdf.inputs:
        b_bsdf.inputs["Roughness"].default_value = 0.38
    if "Sheen Weight" in b_bsdf.inputs:
        b_bsdf.inputs["Sheen Weight"].default_value = 1.0
    if "Coat Weight" in b_bsdf.inputs:
        b_bsdf.inputs["Coat Weight"].default_value = 0.4

red_silk_mat = bpy.data.materials.new("RedSilk")
r_bsdf = red_silk_mat.node_tree.nodes.get("Principled BSDF")
if r_bsdf:
    if "Base Color" in r_bsdf.inputs:
        r_bsdf.inputs["Base Color"].default_value = (0.85, 0.06, 0.04, 1.0)
    if "Roughness" in r_bsdf.inputs:
        r_bsdf.inputs["Roughness"].default_value = 0.22
    if "Coat Weight" in r_bsdf.inputs:
        r_bsdf.inputs["Coat Weight"].default_value = 0.9
    if "Emission Color" in r_bsdf.inputs:
        r_bsdf.inputs["Emission Color"].default_value = (0.85, 0.06, 0.04, 1.0)
    if "Emission Strength" in r_bsdf.inputs:
        r_bsdf.inputs["Emission Strength"].default_value = 0.3

gold_mat = bpy.data.materials.new("GoldMetal")
g_bsdf = gold_mat.node_tree.nodes.get("Principled BSDF")
if g_bsdf:
    if "Base Color" in g_bsdf.inputs:
        g_bsdf.inputs["Base Color"].default_value = (0.95, 0.8, 0.25, 1.0)
    if "Metallic" in g_bsdf.inputs:
        g_bsdf.inputs["Metallic"].default_value = 0.95
    if "Roughness" in g_bsdf.inputs:
        g_bsdf.inputs["Roughness"].default_value = 0.15

stand_mat = bpy.data.materials.new("StandMat")
s_bsdf = stand_mat.node_tree.nodes.get("Principled BSDF")
if s_bsdf:
    if "Base Color" in s_bsdf.inputs:
        s_bsdf.inputs["Base Color"].default_value = (0.04, 0.05, 0.07, 1.0)
    if "Roughness" in s_bsdf.inputs:
        s_bsdf.inputs["Roughness"].default_value = 0.85

# --- High Fashion Mannequin Torso ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.72, depth=2.3, location=(0, 0, 1.0), vertices=64)
torso = bpy.context.active_object
torso.data.materials.append(blazer_mat)

# Sculpt organic torso vertices (smooth athletic shoulders & waist)
for vert in torso.data.vertices:
    z = vert.co.z
    if z > 0.5: # Shoulders
        vert.co.x *= 1.42
        vert.co.y *= 0.78
    elif -0.3 < z <= 0.5: # Waist
        vert.co.x *= 1.02
        vert.co.y *= 0.92
    else: # Hips
        vert.co.x *= 1.18
        vert.co.y *= 0.98

# Subsurf & Smooth
subsurf = torso.modifiers.new("Subsurf", 'SUBSURF')
subsurf.levels = 2
subsurf.render_levels = 2

# Set smooth shading on all polygons!
bpy.ops.object.shade_smooth()

# Lapels (Smooth curved strips)
def create_lapel(name, x_pos, rot_y):
    bpy.ops.mesh.primitive_plane_add(size=1.0, location=(x_pos, -0.65, 1.35))
    lapel = bpy.context.active_object
    lapel.name = name
    lapel.scale = (0.32, 0.75, 1.0)
    lapel.rotation_euler = (math.radians(-12), math.radians(rot_y), math.radians(-10 if rot_y > 0 else 10))
    
    # Solidify modifier for realistic cloth thickness!
    solid = lapel.modifiers.new("Solidify", 'SOLIDIFY')
    solid.thickness = 0.035
    
    # Bevel for smooth tailoring edges
    bevel = lapel.modifiers.new("Bevel", 'BEVEL')
    bevel.width = 0.015
    bevel.segments = 3
    
    bpy.ops.object.shade_smooth()
    return lapel

left_l = create_lapel("LeftLapel", -0.32, 18)
left_l.data.materials.append(red_silk_mat)

right_l = create_lapel("RightLapel", 0.32, -18)
right_l.data.materials.append(blazer_mat)

# Collar
bpy.ops.mesh.primitive_torus_add(major_radius=0.52, minor_radius=0.06, location=(0, -0.05, 2.15), major_segments=48, minor_segments=24)
collar = bpy.context.active_object
collar.rotation_euler = (math.radians(10), 0, 0)
collar.data.materials.append(blazer_mat)
bpy.ops.object.shade_smooth()

# Stand Neck & Pole
bpy.ops.mesh.primitive_cylinder_add(radius=0.22, depth=0.8, location=(0, 0, 2.45), vertices=32)
neck = bpy.context.active_object
neck.data.materials.append(stand_mat)
bpy.ops.object.shade_smooth()

bpy.ops.mesh.primitive_cylinder_add(radius=0.045, depth=1.6, location=(0, 0, -0.5), vertices=24)
pole = bpy.context.active_object
pole.data.materials.append(stand_mat)
bpy.ops.object.shade_smooth()

# Gold Buttons
for idx, b_z in enumerate([1.0, 0.65, 0.3]):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.055, depth=0.025, location=(0.02, -0.72, b_z), vertices=32)
    btn = bpy.context.active_object
    btn.rotation_euler = (math.radians(90), 0, 0)
    btn.data.materials.append(gold_mat)
    bpy.ops.object.shade_smooth()

# Red Silk Pocket Square
bpy.ops.mesh.primitive_cone_add(radius1=0.12, depth=0.28, location=(0.38, -0.62, 1.45), vertices=24)
pocket_sq = bpy.context.active_object
pocket_sq.rotation_euler = (math.radians(-32), math.radians(22), math.radians(15))
pocket_sq.data.materials.append(red_silk_mat)
bpy.ops.object.shade_smooth()

# --- Fine Silk Threads (Delicate & Luxurious, NOT thick pipes!) ---
num_threads = 16
for t in range(num_threads):
    is_red = (t % 2 == 0)
    c_mat = red_silk_mat if is_red else gold_mat
    
    curve_data = bpy.data.curves.new(f"FineSilk_{t}", type='CURVE')
    curve_data.dimensions = '3D'
    curve_data.bevel_depth = 0.014 # Delicate, elegant thin thread!
    curve_data.bevel_resolution = 6
    
    spline = curve_data.splines.new('BEZIER')
    spline.bezier_points.add(5) # 6 smooth points
    
    phi = (t / num_threads) * math.pi * 2
    for p_idx, pt in enumerate(spline.bezier_points):
        frac = p_idx / 5.0
        angle = phi + (frac * math.pi * 3.0)
        rad = 1.35 + (math.sin(frac * math.pi) * 0.35)
        z = (frac * 2.5) - 0.2 + (math.sin(phi * 2) * 0.2)
        pt.co = (math.cos(angle) * rad, math.sin(angle) * rad, z)
        pt.handle_left_type = 'AUTO'
        pt.handle_right_type = 'AUTO'
        
    c_obj = bpy.data.objects.new(f"FineSilkObj_{t}", curve_data)
    c_obj.data.materials.append(c_mat)
    scene.collection.objects.link(c_obj)

# Render Single Test Frame
scene.render.filepath = "C:/Projects/wtma_landingPage/images/blender-sequence/test_refined.png"
bpy.ops.render.render(write_still=True)
print("=== Refined Test Render Finished ===")
