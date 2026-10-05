import bpy
import math
from pathlib import Path


ROOT = Path(__file__).resolve().parent
ASSET_ROOT = ROOT / "assets"
SOURCE_BLEND = ROOT / "astra_scroll_film_photoreal.blend"
OUTPUT_BLEND = ROOT / "astra_scroll_film_photoreal_v2.blend"


ASSETS = {
    "chair": ASSET_ROOT / "mid_century_lounge_chair" / "mid_century_lounge_chair_1k.blend",
    "sofa": ASSET_ROOT / "Sofa_01" / "Sofa_01_1k.blend",
    "plant": ASSET_ROOT / "pachira_aquatica_01" / "pachira_aquatica_01_1k.blend",
    "table": ASSET_ROOT / "modern_coffee_table_01" / "modern_coffee_table_01_1k.blend",
}


def append_first_collection(path):
    with bpy.data.libraries.load(str(path), link=False) as (source, target):
        target.collections = [source.collections[0]]
    collection = target.collections[0]
    collection.name = f"Asset_{path.stem}"
    return collection


def create_instance(name, asset_collection, location, rotation_z=0.0, scale=1.0):
    instance = bpy.data.objects.new(name, None)
    instance.instance_type = "COLLECTION"
    instance.instance_collection = asset_collection
    instance.location = location
    instance.rotation_euler.z = math.radians(rotation_z)
    instance.scale = (scale, scale, scale)
    premium_collection.objects.link(instance)
    return instance


bpy.ops.wm.open_mainfile(filepath=str(SOURCE_BLEND))

# Remove only assets created by an earlier run of this upgrade.
old = bpy.data.collections.get("Premium_Assets")
if old:
    for obj in list(old.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    bpy.data.collections.remove(old)

premium_collection = bpy.data.collections.new("Premium_Assets")
bpy.context.scene.collection.children.link(premium_collection)

loaded = {key: append_first_collection(path) for key, path in ASSETS.items()}

# Hide blockout proxies while preserving them for easy art-direction changes.
proxy_prefixes = (
    "LibraryChair_",
    "SalonChair_",
    "LoungeSofa_",
    "LoungePlant_",
    "GalleryPlant_",
    "LoungeCoffeeTop",
    "LoungeCoffeeBase",
)
for obj in bpy.context.scene.objects:
    if obj.name.startswith(proxy_prefixes):
        obj.hide_render = True
        obj.hide_viewport = True

# Keep the original pots; only the low-poly trunks and leaves are replaced.
for pot_name in ("LoungePlant_Pot", "GalleryPlant_Pot"):
    pot = bpy.data.objects.get(pot_name)
    if pot:
        pot.hide_render = False
        pot.hide_viewport = False

# Real scanned/modelled furniture and foliage replace the visible proxies.
create_instance("PremiumChair_Library", loaded["chair"], (-8.1, -0.15, 0.0), -4.0, 1.12)
create_instance("PremiumChair_Salon", loaded["chair"], (-3.45, 0.65, 0.0), 7.0, 1.1)
create_instance("PremiumSofa_Lounge", loaded["sofa"], (3.25, 1.45, 0.02), 0.0, 1.85)
create_instance("PremiumTable_Lounge", loaded["table"], (3.05, -0.35, 0.02), 0.0, 1.55)
create_instance("PremiumPlant_Lounge", loaded["plant"], (6.1, 2.15, 0.0), -18.0, 1.35)
create_instance("PremiumPlant_Gallery", loaded["plant"], (13.0, 1.65, 0.0), 22.0, 1.42)

scene = bpy.context.scene
scene.view_settings.exposure = -0.5
scene.cycles.samples = 72
scene.cycles.use_denoising = True

# Pack appended textures into one portable deliverable.
bpy.ops.file.pack_all()
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT_BLEND))

result = {
    "blend_path": str(OUTPUT_BLEND),
    "premium_instances": [obj.name for obj in premium_collection.objects],
    "scene_objects": len(scene.objects),
    "samples": scene.cycles.samples,
}
