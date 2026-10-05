import bpy
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE_BLEND = ROOT / "astra_scroll_film.blend"
PHOTO_BLEND = ROOT / "astra_scroll_film_photoreal.blend"
TEXTURES = ROOT / "textures"


def load_image(path, non_color=False):
    image = bpy.data.images.load(str(path), check_existing=True)
    if non_color:
        image.colorspace_settings.name = "Non-Color"
    return image


def image_material(material_name, asset_id, scale, tint, normal_strength=0.35, roughness_bias=0.0):
    mat = bpy.data.materials.get(material_name)
    if not mat:
        return

    diffuse_path = TEXTURES / asset_id / "diffuse.jpg"
    roughness_path = TEXTURES / asset_id / "rough.jpg"
    normal_path = TEXTURES / asset_id / "nor_gl.jpg"
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    output = nodes.new("ShaderNodeOutputMaterial")
    output.location = (720, 40)
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = (420, 40)
    bsdf.inputs["Base Color"].default_value = (*tint, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.5
    links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])

    texcoord = nodes.new("ShaderNodeTexCoord")
    texcoord.location = (-1000, 0)
    mapping = nodes.new("ShaderNodeMapping")
    mapping.location = (-820, 0)
    mapping.inputs["Scale"].default_value = (*scale,)
    links.new(texcoord.outputs["Generated"], mapping.inputs["Vector"])

    diffuse = nodes.new("ShaderNodeTexImage")
    diffuse.location = (-590, 150)
    diffuse.image = load_image(diffuse_path)
    diffuse.interpolation = "Linear"
    links.new(mapping.outputs["Vector"], diffuse.inputs["Vector"])

    tint_node = nodes.new("ShaderNodeMixRGB")
    tint_node.location = (-140, 150)
    tint_node.blend_type = "MULTIPLY"
    tint_node.inputs[0].default_value = 0.72
    tint_node.inputs[2].default_value = (*tint, 1.0)
    links.new(diffuse.outputs["Color"], tint_node.inputs[1])
    links.new(tint_node.outputs["Color"], bsdf.inputs["Base Color"])

    rough = nodes.new("ShaderNodeTexImage")
    rough.location = (-590, -70)
    rough.image = load_image(roughness_path, non_color=True)
    links.new(mapping.outputs["Vector"], rough.inputs["Vector"])
    if abs(roughness_bias) > 0.001:
        rough_curve = nodes.new("ShaderNodeMapRange")
        rough_curve.location = (120, -70)
        rough_curve.inputs["To Min"].default_value = max(0.0, roughness_bias)
        rough_curve.inputs["To Max"].default_value = min(1.0, 1.0 + roughness_bias)
        links.new(rough.outputs["Color"], rough_curve.inputs["Value"])
        links.new(rough_curve.outputs["Result"], bsdf.inputs["Roughness"])
    else:
        links.new(rough.outputs["Color"], bsdf.inputs["Roughness"])

    normal_tex = nodes.new("ShaderNodeTexImage")
    normal_tex.location = (-590, -290)
    normal_tex.image = load_image(normal_path, non_color=True)
    links.new(mapping.outputs["Vector"], normal_tex.inputs["Vector"])
    normal = nodes.new("ShaderNodeNormalMap")
    normal.location = (120, -250)
    normal.inputs["Strength"].default_value = normal_strength
    links.new(normal_tex.outputs["Color"], normal.inputs["Color"])
    links.new(normal.outputs["Normal"], bsdf.inputs["Normal"])


def procedural_metal(material_name, base_color, roughness, noise_scale=7.0):
    mat = bpy.data.materials.get(material_name)
    if not mat:
        return
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    output = nodes.new("ShaderNodeOutputMaterial")
    output.location = (480, 0)
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = (220, 0)
    bsdf.inputs["Base Color"].default_value = (*base_color, 1.0)
    bsdf.inputs["Metallic"].default_value = 0.86
    bsdf.inputs["Roughness"].default_value = roughness
    noise = nodes.new("ShaderNodeTexNoise")
    noise.location = (-320, -120)
    noise.inputs["Scale"].default_value = noise_scale
    noise.inputs["Detail"].default_value = 5.0
    noise.inputs["Roughness"].default_value = 0.75
    bump = nodes.new("ShaderNodeBump")
    bump.location = (-40, -120)
    bump.inputs["Strength"].default_value = 0.12
    bump.inputs["Distance"].default_value = 0.025
    links.new(noise.outputs["Fac"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])


def add_detail_cube(name, location, dimensions, material, collection, bevel=0.012):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    for source_collection in list(obj.users_collection):
        source_collection.objects.unlink(obj)
    collection.objects.link(obj)
    obj.data.materials.append(material)
    if bevel:
        modifier = obj.modifiers.new("Micro bevel", "BEVEL")
        modifier.width = bevel
        modifier.segments = 2
    return obj


def add_area(name, location, energy, color, size, target, collection):
    from mathutils import Vector

    light_data = bpy.data.lights.new(name, "AREA")
    light_data.energy = energy
    light_data.color = color
    light_data.shape = "RECTANGLE"
    light_data.size = size
    light_data.size_y = size * 0.55
    light = bpy.data.objects.new(name, light_data)
    collection.objects.link(light)
    light.location = location
    light.rotation_euler = (Vector(target) - light.location).to_track_quat("-Z", "Y").to_euler()
    return light


bpy.ops.wm.open_mainfile(filepath=str(SOURCE_BLEND))

# Upgrade the broad material families with real 1K PBR maps.
image_material("Dark walnut", "american_walnut_veneer", (2.5, 2.5, 2.5), (0.42, 0.20, 0.09), 0.42, 0.03)
image_material("Smoked oak", "american_walnut_veneer", (2.0, 2.0, 2.0), (0.72, 0.43, 0.19), 0.34, 0.06)
image_material("Ivory plaster", "beige_wall_001", (3.2, 3.2, 3.2), (0.94, 0.88, 0.76), 0.28, 0.1)
image_material("Deep taupe", "beige_wall_001", (3.5, 3.5, 3.5), (0.28, 0.18, 0.12), 0.42, 0.15)
image_material("Warm limestone", "marble_01", (2.7, 2.7, 2.7), (0.67, 0.58, 0.47), 0.32, 0.06)
image_material("Travertine floor", "brushed_concrete", (5.0, 5.0, 5.0), (0.58, 0.51, 0.41), 0.34, 0.02)
image_material("Cream boucle", "wool_boucle", (7.0, 7.0, 7.0), (0.95, 0.84, 0.66), 0.58, 0.18)
image_material("Black textile", "wool_boucle", (7.5, 7.5, 7.5), (0.055, 0.04, 0.03), 0.46, 0.2)
image_material("Rust textile", "wool_boucle", (7.0, 7.0, 7.0), (0.47, 0.13, 0.045), 0.5, 0.18)
procedural_metal("Aged brass", (0.53, 0.27, 0.065), 0.24)

# Fresh detail collection makes this script safe to rerun.
old_collection = bpy.data.collections.get("Photoreal_Detail")
if old_collection:
    for obj in list(old_collection.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    bpy.data.collections.remove(old_collection)
detail_collection = bpy.data.collections.new("Photoreal_Detail")
bpy.context.scene.collection.children.link(detail_collection)

floor_mat = bpy.data.materials["Travertine floor"]
charcoal = bpy.data.materials["Charcoal"]
brass = bpy.data.materials["Aged brass"]
light_warm = bpy.data.materials["Warm light strip"]
light_cool = bpy.data.materials["Gallery light strip"]

# Stone joints, baseboards and ceiling slots add scale cues missing in the blockout.
for x in range(-14, 19, 2):
    add_detail_cube(f"FloorJointX_{x}", (x, -1.0, 0.012), (0.012, 10.6, 0.014), charcoal, detail_collection, 0)
for index, y in enumerate((-5.8, -3.6, -1.4, 0.8, 3.0)):
    add_detail_cube(f"FloorJointY_{index}", (1.5, y, 0.014), (33.0, 0.012, 0.016), charcoal, detail_collection, 0)
add_detail_cube("RearBaseboard", (1.5, 4.18, 0.11), (33.0, 0.06, 0.22), brass, detail_collection, 0.015)

for x in (-11.2, -4.0, 3.0, 10.2, 15.1):
    add_detail_cube(f"CeilingSlot_{x}", (x, -0.8, 5.74), (3.4, 0.07, 0.045), light_cool, detail_collection, 0.01)

# Small decor prevents perfectly empty surfaces from reading as CG.
for index, (x, y, z, sx, sy, sz) in enumerate((
    (-9.7, 0.75, 0.72, 0.18, 0.18, 0.38),
    (-10.1, 0.75, 0.67, 0.13, 0.13, 0.28),
    (8.8, 0.75, 1.34, 0.14, 0.14, 0.28),
    (9.2, 0.75, 1.28, 0.10, 0.10, 0.18),
)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, location=(x, y, z), scale=(sx, sy, sz))
    vase = bpy.context.object
    vase.name = f"DecorVase_{index}"
    for source_collection in list(vase.users_collection):
        source_collection.objects.unlink(vase)
    detail_collection.objects.link(vase)
    vase.data.materials.append(brass if index % 2 == 0 else floor_mat)

# Calibrated Cycles lights. Existing keys are retained but reduced to avoid clipping.
for obj in bpy.context.scene.objects:
    if obj.type == "LIGHT" and obj.data.type == "AREA":
        obj.data.energy *= 0.62
add_area("PhotorealFrontFill", (1.5, -4.8, 4.5), 850, (1.0, 0.72, 0.52), 8.0, (1.5, 1.2, 1.6), detail_collection)
add_area("PhotorealGalleryFill", (11.0, -2.5, 4.2), 950, (0.82, 0.9, 1.0), 5.0, (11.0, 2.0, 1.7), detail_collection)

scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.samples = 64
scene.cycles.preview_samples = 16
scene.cycles.use_denoising = True
scene.cycles.use_adaptive_sampling = True
scene.cycles.adaptive_threshold = 0.03
scene.cycles.max_bounces = 7
scene.cycles.diffuse_bounces = 3
scene.cycles.glossy_bounces = 3
scene.cycles.transmission_bounces = 3
scene.cycles.device = "GPU"

try:
    cycles_prefs = bpy.context.preferences.addons["cycles"].preferences
    cycles_prefs.compute_device_type = "HIP"
    cycles_prefs.refresh_devices()
    for device in cycles_prefs.devices:
        device.use = device.type in {"HIP", "CPU"}
except Exception as exc:
    print(f"Cycles HIP configuration warning: {exc}")

scene.render.resolution_x = 1280
scene.render.resolution_y = 720
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.film_transparent = False
scene.render.use_persistent_data = True
if hasattr(scene.render, "use_motion_blur"):
    scene.render.use_motion_blur = True

camera = scene.camera
camera.data.dof.use_dof = True
camera.data.dof.focus_distance = 10.2
camera.data.dof.aperture_fstop = 5.6
camera.data.dof.aperture_blades = 7

scene.view_settings.look = "AgX - Medium High Contrast"
scene.view_settings.exposure = -0.35

# Embed maps so the photoreal file remains portable.
bpy.ops.file.pack_all()
bpy.ops.wm.save_as_mainfile(filepath=str(PHOTO_BLEND))

result = {
    "blend_path": str(PHOTO_BLEND),
    "engine": scene.render.engine,
    "samples": scene.cycles.samples,
    "objects": len(scene.objects),
    "packed_images": len([image for image in bpy.data.images if image.packed_file]),
    "resolution": [scene.render.resolution_x, scene.render.resolution_y],
}
