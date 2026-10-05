import bpy
import math
from mathutils import Vector
from pathlib import Path


ROOT = Path(__file__).resolve().parent
BLEND_PATH = ROOT / "astra_scroll_film.blend"
PREVIEW_DIR = ROOT / "previews"
FRAME_DIR = ROOT / "frames"


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (
        bpy.data.meshes,
        bpy.data.curves,
        bpy.data.materials,
        bpy.data.cameras,
        bpy.data.lights,
    ):
        for datablock in list(datablocks):
            if datablock.users == 0:
                datablocks.remove(datablock)


def material(name, color, roughness=0.45, metallic=0.0, emission=None, emission_strength=0.0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1.0)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission is not None:
        emission_input = bsdf.inputs.get("Emission Color") or bsdf.inputs.get("Emission")
        if emission_input:
            emission_input.default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat


def assign(obj, mat):
    obj.data.materials.append(mat)
    return obj


def box(name, location, dimensions, mat, bevel=0.08):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    assign(obj, mat)
    if bevel > 0:
        modifier = obj.modifiers.new("Soft edges", "BEVEL")
        modifier.width = bevel
        modifier.segments = 3
    return obj


def cylinder(name, location, radius, depth, mat, vertices=64):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location)
    obj = bpy.context.object
    obj.name = name
    assign(obj, mat)
    bevel = obj.modifiers.new("Soft edges", "BEVEL")
    bevel.width = min(radius * 0.08, 0.08)
    bevel.segments = 3
    return obj


def sphere(name, location, scale, mat):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=1.0, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    assign(obj, mat)
    return obj


def area_light(name, location, energy, size, color, target):
    data = bpy.data.lights.new(name=name, type="AREA")
    data.energy = energy
    data.shape = "DISK"
    data.size = size
    data.color = color
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    return obj


def point_light(name, location, energy, color, radius=0.3):
    data = bpy.data.lights.new(name=name, type="POINT")
    data.energy = energy
    data.color = color
    data.shadow_soft_size = radius
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    return obj


def add_books(x0, y, z, count, palette):
    widths = [0.09, 0.12, 0.075, 0.1, 0.14]
    for index in range(count):
        width = widths[index % len(widths)]
        height = 0.48 + 0.08 * ((index * 3) % 4)
        x = x0 + index * 0.14
        book = box(
            f"Book_{z:.1f}_{index}",
            (x, y, z + height / 2),
            (width, 0.24, height),
            palette[index % len(palette)],
            0.015,
        )
        book.rotation_euler.y = math.radians((-4, 0, 3, 0, 6)[index % 5])


def lounge_chair(name, x, y, z, upholstery, metal):
    seat = box(f"{name}_Seat", (x, y, z + 0.55), (1.25, 1.0, 0.28), upholstery, 0.18)
    back = box(f"{name}_Back", (x, y + 0.35, z + 1.18), (1.25, 0.28, 1.05), upholstery, 0.18)
    back.rotation_euler.x = math.radians(-12)
    for sx in (-0.48, 0.48):
        box(f"{name}_Leg_{sx}", (x + sx, y - 0.28, z + 0.24), (0.07, 0.07, 0.52), metal, 0.02)
        box(f"{name}_LegB_{sx}", (x + sx, y + 0.28, z + 0.24), (0.07, 0.07, 0.52), metal, 0.02)
    return seat


def sofa(name, x, y, z, upholstery):
    box(f"{name}_Base", (x, y, z + 0.42), (3.4, 1.25, 0.42), upholstery, 0.2)
    box(f"{name}_Back", (x, y + 0.48, z + 1.15), (3.4, 0.35, 1.15), upholstery, 0.22)
    for offset in (-1.08, 0.0, 1.08):
        box(f"{name}_Cushion_{offset}", (x + offset, y - 0.08, z + 0.76), (1.0, 0.86, 0.28), upholstery, 0.16)


def plant(name, x, y, z, pot_mat, leaf_mat):
    cylinder(f"{name}_Pot", (x, y, z + 0.45), 0.48, 0.9, pot_mat)
    cylinder(f"{name}_Trunk", (x, y, z + 1.55), 0.08, 1.8, MAT_WALNUT, 18)
    leaf_positions = [
        (-0.35, 0.0, 2.0), (0.35, 0.05, 2.15), (-0.1, -0.25, 2.45),
        (0.15, 0.25, 2.7), (-0.42, 0.12, 2.85), (0.42, -0.08, 3.0),
        (0.0, 0.0, 3.25),
    ]
    for index, (dx, dy, dz) in enumerate(leaf_positions):
        leaf = sphere(f"{name}_Leaf_{index}", (x + dx, y + dy, z + dz), (0.32, 0.12, 0.72), leaf_mat)
        leaf.rotation_euler.y = math.radians(22 if dx < 0 else -22)
        leaf.rotation_euler.z = math.radians(index * 41)


def set_camera_pose(camera, frame, location, target, lens):
    camera.location = location
    direction = Vector(target) - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    camera.data.lens = lens
    camera.keyframe_insert(data_path="location", frame=frame)
    camera.keyframe_insert(data_path="rotation_euler", frame=frame)
    camera.data.keyframe_insert(data_path="lens", frame=frame)


clear_scene()

# Palette: dark gallery -> warm lounge -> luminous stone.
MAT_IVORY = material("Ivory plaster", (0.71, 0.68, 0.60), 0.7)
MAT_STONE = material("Warm limestone", (0.48, 0.45, 0.39), 0.62)
MAT_FLOOR = material("Travertine floor", (0.28, 0.27, 0.24), 0.36)
MAT_CHARCOAL = material("Charcoal", (0.025, 0.023, 0.021), 0.32)
MAT_TAUPE = material("Deep taupe", (0.13, 0.10, 0.085), 0.52)
MAT_WALNUT = material("Dark walnut", (0.18, 0.075, 0.032), 0.4)
MAT_OAK = material("Smoked oak", (0.34, 0.19, 0.09), 0.47)
MAT_BRASS = material("Aged brass", (0.42, 0.24, 0.07), 0.23, 0.72)
MAT_CREAM = material("Cream boucle", (0.72, 0.65, 0.52), 0.92)
MAT_BLACK_FABRIC = material("Black textile", (0.018, 0.016, 0.014), 0.96)
MAT_RUST = material("Rust textile", (0.26, 0.085, 0.035), 0.88)
MAT_GREEN = material("Olive leaves", (0.075, 0.16, 0.055), 0.72)
MAT_BOOK_RED = material("Book oxblood", (0.26, 0.025, 0.02), 0.65)
MAT_BOOK_TAN = material("Book tan", (0.48, 0.27, 0.10), 0.65)
MAT_BOOK_GREY = material("Book grey", (0.19, 0.18, 0.16), 0.7)
MAT_LIGHT = material("Warm light strip", (0.55, 0.25, 0.08), 0.25, emission=(1.0, 0.42, 0.12), emission_strength=7.0)
MAT_LIGHT_COOL = material("Gallery light strip", (0.55, 0.55, 0.5), 0.2, emission=(1.0, 0.9, 0.72), emission_strength=5.0)

# Architectural shell.
box("Floor", (1.5, 0.0, -0.12), (34.0, 18.0, 0.24), MAT_FLOOR, 0.02)
box("RearWall", (1.5, 4.4, 3.0), (34.0, 0.24, 6.0), MAT_STONE, 0.03)
box("Ceiling", (1.5, 0.0, 5.9), (34.0, 18.0, 0.22), MAT_CHARCOAL, 0.02)
box("LeftWing", (-15.5, 0.0, 3.0), (0.35, 18.0, 6.0), MAT_CHARCOAL, 0.02)
box("RightWing", (18.5, 0.0, 3.0), (0.35, 18.0, 6.0), MAT_IVORY, 0.02)

# Scene 1 — dark millwork library.
box("LibraryBackdrop", (-10.0, 4.02, 2.75), (8.5, 0.55, 5.5), MAT_CHARCOAL, 0.05)
for sx in (-13.25, -10.75, -8.25):
    box(f"LibraryBay_{sx}", (sx, 3.58, 2.8), (2.1, 0.48, 4.75), MAT_WALNUT, 0.06)
    for z in (1.25, 2.35, 3.45, 4.55):
        box(f"Shelf_{sx}_{z}", (sx, 3.19, z), (1.85, 0.52, 0.09), MAT_BRASS, 0.025)
        if z < 4.5:
            add_books(sx - 0.72, 2.91, z + 0.06, 8, [MAT_BOOK_RED, MAT_BOOK_TAN, MAT_BOOK_GREY])
box("LibraryMonolith", (-6.65, 3.42, 2.65), (1.0, 0.72, 4.8), MAT_TAUPE, 0.08)
box("LibraryDesk", (-10.5, 0.8, 0.52), (3.0, 1.1, 0.16), MAT_WALNUT, 0.06)
box("LibraryDeskPedestal", (-10.5, 0.8, 0.24), (1.05, 0.7, 0.55), MAT_CHARCOAL, 0.06)
lounge_chair("LibraryChair", -8.1, -0.1, 0.0, MAT_BLACK_FABRIC, MAT_BRASS)
cylinder("LibraryTable", (-11.8, -1.2, 0.32), 0.7, 0.15, MAT_BRASS)
cylinder("LibraryTableBase", (-11.8, -1.2, 0.15), 0.08, 0.3, MAT_BRASS)
box("LibraryGlow", (-10.0, 3.00, 5.1), (7.9, 0.06, 0.08), MAT_LIGHT, 0.01)

# Scene 2 — cinematic taupe salon and portal.
box("SalonBackdrop", (-3.25, 4.0, 2.75), (5.0, 0.55, 5.5), MAT_TAUPE, 0.07)
box("SalonPortalLeft", (-5.8, 2.4, 2.8), (0.65, 3.7, 5.2), MAT_CHARCOAL, 0.07)
box("SalonPortalTop", (-3.55, 2.4, 5.05), (3.9, 3.7, 0.7), MAT_CHARCOAL, 0.07)
lounge_chair("SalonChair", -3.5, 0.7, 0.0, MAT_CREAM, MAT_BRASS)
cylinder("SalonTableTop", (-1.7, -0.25, 0.48), 0.85, 0.16, MAT_STONE)
cylinder("SalonTableBase", (-1.7, -0.25, 0.23), 0.22, 0.48, MAT_CHARCOAL)
box("SalonArt", (-2.6, 3.55, 2.95), (1.8, 0.16, 1.1), MAT_CHARCOAL, 0.04)
box("SalonArtGlow", (-2.6, 3.43, 2.95), (1.55, 0.05, 0.86), MAT_LIGHT, 0.02)

# Scene 3 — pale lounge.
box("LoungeBackdrop", (3.2, 4.04, 2.75), (7.5, 0.5, 5.5), MAT_IVORY, 0.05)
box("LoungeInset", (3.1, 3.67, 2.85), (3.2, 0.4, 2.4), MAT_STONE, 0.05)
sofa("LoungeSofa", 3.3, 1.6, 0.0, MAT_CREAM)
box("LoungeRug", (3.3, -0.1, 0.03), (5.4, 3.2, 0.06), MAT_IVORY, 0.02)
cylinder("LoungeCoffeeTop", (3.0, -0.2, 0.48), 1.15, 0.18, MAT_STONE)
cylinder("LoungeCoffeeBase", (3.0, -0.2, 0.24), 0.32, 0.48, MAT_CHARCOAL)
plant("LoungePlant", 6.1, 2.25, 0.0, MAT_TAUPE, MAT_GREEN)
box("LoungeLightSlot", (3.2, 3.33, 4.72), (6.7, 0.08, 0.08), MAT_LIGHT_COOL, 0.01)

# Scene 4 — gallery kitchen and luminous doorway.
box("GalleryBackdrop", (11.2, 4.02, 2.75), (8.5, 0.5, 5.5), MAT_IVORY, 0.05)
box("KitchenWall", (10.3, 3.65, 2.7), (3.0, 0.42, 4.2), MAT_STONE, 0.04)
box("KitchenIsland", (9.5, 0.8, 0.55), (3.4, 1.15, 1.1), MAT_IVORY, 0.12)
box("KitchenIslandTop", (9.5, 0.8, 1.14), (3.65, 1.35, 0.12), MAT_STONE, 0.04)
for x in (8.7, 9.5, 10.3):
    cylinder(f"KitchenPendant_{x}", (x, 0.8, 4.15), 0.18, 0.3, MAT_BRASS)
    cylinder(f"KitchenCord_{x}", (x, 0.8, 5.0), 0.018, 1.45, MAT_CHARCOAL, 12)
    point_light(f"KitchenLamp_{x}", (x, 0.8, 3.9), 120, (1.0, 0.43, 0.16), 0.18)
box("DoorLeft", (14.0, 3.5, 2.7), (0.55, 1.0, 5.4), MAT_TAUPE, 0.06)
box("DoorRight", (17.0, 3.5, 2.7), (0.55, 1.0, 5.4), MAT_TAUPE, 0.06)
box("DoorTop", (15.5, 3.5, 5.2), (3.55, 1.0, 0.45), MAT_TAUPE, 0.06)
box("DoorGlow", (15.5, 4.18, 2.8), (2.35, 0.04, 4.7), MAT_LIGHT_COOL, 0.02)
plant("GalleryPlant", 13.0, 1.65, 0.0, MAT_TAUPE, MAT_GREEN)

# Light rhythm that follows the camera journey.
area_light("LibraryKey", (-10.0, -0.5, 5.35), 1250, 5.0, (1.0, 0.42, 0.18), (-10.0, 2.0, 1.0))
area_light("SalonKey", (-3.2, -0.2, 5.25), 1400, 4.2, (1.0, 0.52, 0.28), (-3.0, 1.8, 1.0))
area_light("LoungeKey", (3.2, 0.0, 5.35), 1850, 5.5, (1.0, 0.82, 0.62), (3.3, 1.5, 1.0))
area_light("GalleryKey", (10.5, 0.0, 5.35), 2100, 5.6, (1.0, 0.88, 0.72), (10.5, 1.7, 1.1))
area_light("DoorKey", (15.5, 3.0, 4.2), 2800, 3.2, (1.0, 0.9, 0.75), (15.5, 0.0, 1.5))

# Animated camera: a single continuous dolly with staged reframing.
camera_data = bpy.data.cameras.new("AstraCamera")
camera = bpy.data.objects.new("AstraCamera", camera_data)
bpy.context.collection.objects.link(camera)
bpy.context.scene.camera = camera
camera_data.sensor_width = 36
camera_data.lens = 34
camera_data.clip_start = 0.05
camera_data.clip_end = 200

poses = [
    (1, (-13.8, -8.8, 2.75), (-10.6, 1.8, 2.1), 36),
    (52, (-9.2, -8.2, 2.55), (-7.2, 1.8, 2.0), 33),
    (102, (-4.6, -7.8, 2.65), (-2.9, 1.6, 1.9), 31),
    (150, (1.2, -7.4, 2.55), (3.5, 1.6, 1.8), 30),
    (198, (7.4, -7.0, 2.7), (9.4, 1.7, 2.0), 32),
    (240, (13.0, -6.5, 2.8), (15.3, 2.0, 2.2), 36),
]
for pose in poses:
    set_camera_pose(camera, *pose)

# Blender 5.x stores animation in layered actions. The default Bezier interpolation
# already gives the intended eased dolly, so no legacy fcurve mutation is needed.

# Subtle kinetic panels enhance parallax without making the space feel synthetic.
panel_a = box("KineticPanelA", (-0.1, 3.3, 2.65), (0.3, 0.7, 4.8), MAT_BRASS, 0.04)
panel_a.rotation_euler.z = math.radians(-18)
panel_a.keyframe_insert(data_path="rotation_euler", frame=70)
panel_a.rotation_euler.z = math.radians(12)
panel_a.keyframe_insert(data_path="rotation_euler", frame=140)

panel_b = box("KineticPanelB", (7.2, 3.5, 2.55), (0.35, 0.65, 4.5), MAT_TAUPE, 0.04)
panel_b.location.z = 2.55
panel_b.keyframe_insert(data_path="location", frame=135)
panel_b.location.z = 4.6
panel_b.keyframe_insert(data_path="location", frame=205)

# Render settings for a web-ready master.
scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = 240
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = 1280
scene.render.resolution_y = 720
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(FRAME_DIR / "astra_")
scene.render.fps = 30
scene.render.fps_base = 1.0
scene.render.film_transparent = False
scene.render.image_settings.color_mode = "RGBA"
scene.render.image_settings.color_depth = "8"
scene.render.image_settings.compression = 25
scene.render.resolution_percentage = 100
scene.render.use_file_extension = True

scene.view_settings.look = "AgX - Medium High Contrast"
scene.world.color = (0.012, 0.009, 0.007)
world_nodes = scene.world.node_tree.nodes if scene.world and scene.world.use_nodes else None
if scene.world:
    scene.world.use_nodes = True
    background = scene.world.node_tree.nodes.get("Background")
    background.inputs["Color"].default_value = (0.008, 0.006, 0.004, 1.0)
    background.inputs["Strength"].default_value = 0.14

scene.render.image_settings.color_mode = "RGB"
scene.render.filepath = str(FRAME_DIR / "astra_")

ROOT.mkdir(parents=True, exist_ok=True)
PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
FRAME_DIR.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH))

result = {
    "blend_path": str(BLEND_PATH),
    "frame_start": scene.frame_start,
    "frame_end": scene.frame_end,
    "fps": scene.render.fps,
    "resolution": [scene.render.resolution_x, scene.render.resolution_y],
    "objects": len(scene.objects),
    "camera": camera.name,
}
