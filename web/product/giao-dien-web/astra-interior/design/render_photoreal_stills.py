import bpy
from pathlib import Path


scene = bpy.context.scene
output_dir = (Path(__file__).resolve().parent / "photoreal-previews")
output_dir.mkdir(parents=True, exist_ok=True)

scene.render.engine = "CYCLES"
scene.render.resolution_percentage = 75
scene.cycles.samples = 48
scene.cycles.use_denoising = True
scene.cycles.use_adaptive_sampling = True
scene.cycles.adaptive_threshold = 0.035
scene.cycles.device = "GPU"

try:
    preferences = bpy.context.preferences.addons["cycles"].preferences
    preferences.compute_device_type = "HIP"
    preferences.refresh_devices()
    for device in preferences.devices:
        device.use = device.type in {"HIP", "CPU"}
    print(
        "CYCLES_DEVICES "
        + ", ".join(f"{device.name}:{device.type}:{device.use}" for device in preferences.devices),
        flush=True,
    )
except Exception as exc:
    print(f"CYCLES_DEVICE_WARNING {exc}", flush=True)

for frame in (1, 80, 160, 240):
    scene.frame_set(frame)
    output_path = output_dir / f"photoreal_{frame:04d}.png"
    scene.render.filepath = str(output_path)
    bpy.ops.render.render(write_still=True)
    print(f"PHOTOREAL_RENDER frame={frame} path={output_path}", flush=True)

print("PHOTOREAL_RENDER_COMPLETE", flush=True)
