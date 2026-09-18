import bpy
import math

print("=== Starting Blender 5.1 Test Render ===")

# Reset to empty scene
bpy.ops.wm.read_factory_settings(use_empty=True)

scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 960
scene.render.resolution_y = 960
scene.render.film_transparent = True
scene.render.image_settings.file_format = 'PNG'

# Create camera
cam_data = bpy.data.cameras.new("MainCam")
cam_data.lens = 50
cam_obj = bpy.data.objects.new("MainCam", cam_data)
cam_obj.location = (0, -5.5, 1.5)
cam_obj.rotation_euler = (math.radians(78), 0, 0)
scene.collection.objects.link(cam_obj)
scene.camera = cam_obj

# Create Lights
key_light_data = bpy.data.lights.new(name="KeyLight", type='AREA')
key_light_data.energy = 500
key_light_data.size = 2.5
key_light_data.color = (1.0, 0.96, 0.92)
key_light_obj = bpy.data.objects.new("KeyLight", key_light_data)
key_light_obj.location = (3.0, -3.5, 4.0)
key_light_obj.rotation_euler = (math.radians(45), math.radians(15), math.radians(-30))
scene.collection.objects.link(key_light_obj)

rim_light_data = bpy.data.lights.new(name="RimRedLight", type='AREA')
rim_light_data.energy = 800
rim_light_data.size = 3.0
rim_light_data.color = (0.9, 0.12, 0.08) # WTMA Red
rim_light_obj = bpy.data.objects.new("RimRedLight", rim_light_data)
rim_light_obj.location = (-3.5, 3.0, 2.5)
rim_light_obj.rotation_euler = (math.radians(-45), 0, math.radians(140))
scene.collection.objects.link(rim_light_obj)

# Create a test mannequin torso
bpy.ops.mesh.primitive_cylinder_add(radius=0.7, depth=2.2, location=(0, 0, 1.1))
torso = bpy.context.active_object
torso.name = "MannequinTorso"

# Material
mat = bpy.data.materials.new(name="TextileMat")
mat.use_nodes = True
bsdf = mat.node_tree.nodes.get("Principled BSDF")
if bsdf:
    # Set to luxury dark charcoal
    if "Base Color" in bsdf.inputs:
        bsdf.inputs["Base Color"].default_value = (0.04, 0.05, 0.07, 1.0)
    if "Roughness" in bsdf.inputs:
        bsdf.inputs["Roughness"].default_value = 0.4
    if "Sheen Weight" in bsdf.inputs:
        bsdf.inputs["Sheen Weight"].default_value = 1.0
    if "Coat Weight" in bsdf.inputs:
        bsdf.inputs["Coat Weight"].default_value = 0.4
torso.data.materials.append(mat)

# Test render single frame
scene.render.filepath = "C:/Projects/wtma_landingPage/images/blender-sequence/test_frame.png"
bpy.ops.render.render(write_still=True)

print("=== Test Render Completed Successfully ===")
