import bpy
from pathlib import Path


scene = bpy.context.scene
output_dir = (Path(__file__).resolve().parent / "preview-frames")
output_dir.mkdir(parents=True, exist_ok=True)

# Half-resolution, 120-frame review sequence. Each output frame samples every
# second master frame, preserving the full eight-second camera path at 15 fps.
scene.render.resolution_percentage = 50
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"

for output_frame, source_frame in enumerate(range(1, 241, 2), start=1):
    scene.frame_set(source_frame)
    scene.render.filepath = str(output_dir / f"astra_{output_frame:04d}.png")
    bpy.ops.render.render(write_still=True)
    print(f"ASTRA_RENDER {output_frame}/120 source={source_frame}", flush=True)

print("ASTRA_RENDER_COMPLETE", flush=True)
