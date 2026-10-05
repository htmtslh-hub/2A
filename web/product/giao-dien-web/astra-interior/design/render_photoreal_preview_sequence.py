import bpy
from pathlib import Path


scene = bpy.context.scene
output_dir = (Path(__file__).resolve().parent / "photoreal-preview-frames")
output_dir.mkdir(parents=True, exist_ok=True)

scene.render.engine = "CYCLES"
scene.render.resolution_percentage = 50
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.cycles.samples = 24
scene.cycles.use_denoising = True
scene.cycles.use_adaptive_sampling = True
scene.cycles.adaptive_threshold = 0.05
scene.cycles.device = "GPU"

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

for output_frame, source_frame in enumerate(range(1, 241, 2), start=1):
    scene.frame_set(source_frame)
    path = output_dir / f"astra_photo_{output_frame:04d}.png"
    scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)
    print(f"PHOTO_SEQUENCE {output_frame}/120 source={source_frame}", flush=True)

print("PHOTO_SEQUENCE_COMPLETE", flush=True)
