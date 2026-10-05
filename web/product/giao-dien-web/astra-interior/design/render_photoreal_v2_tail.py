import bpy
from pathlib import Path


scene = bpy.context.scene
output_dir = (Path(__file__).resolve().parent / "photoreal-v2-previews")
scene.render.engine = "CYCLES"
scene.render.resolution_percentage = 75
scene.cycles.samples = 56
scene.cycles.use_denoising = True
scene.cycles.device = "GPU"

preferences = bpy.context.preferences.addons["cycles"].preferences
preferences.compute_device_type = "HIP"
preferences.refresh_devices()
for device in preferences.devices:
    device.use = device.type in {"HIP", "CPU"}

for frame in (160, 240):
    scene.frame_set(frame)
    path = output_dir / f"photoreal_v2_{frame:04d}.png"
    scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)
    print(f"PHOTOREAL_V2_TAIL frame={frame}", flush=True)

print("PHOTOREAL_V2_TAIL_COMPLETE", flush=True)
