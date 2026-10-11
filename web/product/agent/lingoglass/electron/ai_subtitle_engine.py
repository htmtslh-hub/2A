import sys
import os
import json
import argparse
import time
import warnings

# Suppress noisy warnings
warnings.filterwarnings('ignore')
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'
os.environ['HF_HUB_DISABLE_PROGRESS_BARS'] = '1'
os.environ['TOKENIZERS_PARALLELISM'] = 'false'
os.environ['TRANSFORMERS_VERBOSITY'] = 'error'

# Ensure stdout uses utf-8
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

def emit_json(data):
    print(json.dumps(data, ensure_ascii=False), flush=True)

def check_gpu():
    import ctranslate2
    cuda_count = ctranslate2.get_cuda_device_count()
    gpu_name = "N/A"
    if cuda_count > 0:
        try:
            import torch
            if torch.cuda.is_available():
                gpu_name = torch.cuda.get_device_name(0)
            else:
                # fallback via nvidia-smi query or default
                import subprocess
                out = subprocess.check_output(['nvidia-smi', '--query-gpu=name', '--format=csv,noheader'], encoding='utf-8')
                gpu_name = out.strip().split('\n')[0]
        except Exception:
            gpu_name = "NVIDIA CUDA GPU"

    emit_json({
        "type": "gpu_status",
        "cudaAvailable": cuda_count > 0,
        "cudaDeviceCount": cuda_count,
        "gpuName": gpu_name
    })

def translate_texts_marian(texts, source_lang="en", target_lang="vi"):
    if not texts:
        return []
    
    if source_lang != "en" or target_lang != "vi":
        # For other language pairs, return as is or handle
        return texts

    try:
        from transformers import MarianTokenizer, MarianMTModel
        model_name = 'Helsinki-NLP/opus-mt-en-vi'
        tok = MarianTokenizer.from_pretrained(model_name)
        model = MarianMTModel.from_pretrained(model_name)

        # Batch translate with chunking to prevent OOM
        batch_size = 16
        translated_results = []
        for i in range(0, len(texts), batch_size):
            chunk = texts[i:i + batch_size]
            inputs = tok(chunk, return_tensors="pt", padding=True, truncation=True, max_length=512)
            outputs = model.generate(**inputs, max_length=512)
            decoded = [tok.decode(t, skip_special_tokens=True) for t in outputs]
            translated_results.extend(decoded)
        return translated_results
    except Exception as e:
        sys.stderr.write(f"MarianMT translation error: {e}\n")
        return texts

def transcribe_and_translate(input_media, model_size="base", source_lang=None, target_lang="vi", device="auto"):
    if not os.path.exists(input_media):
        emit_json({"type": "error", "message": f"Media file not found: {input_media}"})
        return

    emit_json({"type": "progress", "percent": 10, "message": "Đang chuẩn bị mô hình Whisper AI trên GPU..."})

    import ctranslate2
    cuda_available = ctranslate2.get_cuda_device_count() > 0

    if device == "auto":
        device = "cuda" if cuda_available else "cpu"
        compute_type = "float16" if cuda_available else "int8"
    elif device == "cuda":
        compute_type = "float16" if cuda_available else "int8"
        if not cuda_available:
            device = "cpu"
    else:
        device = "cpu"
        compute_type = "int8"

    emit_json({"type": "progress", "percent": 25, "message": f"Đang nạp Whisper ({model_size}) lên {device.upper()}..."})

    from faster_whisper import WhisperModel
    model = WhisperModel(model_size, device=device, compute_type=compute_type)

    emit_json({"type": "progress", "percent": 40, "message": "Đang nhận diện giọng nói & tách câu..."})

    # Transcribe audio
    # Note: if source_lang is None or 'auto', Whisper auto-detects language
    lang_param = source_lang if (source_lang and source_lang != 'auto') else None
    segments, info = model.transcribe(
        input_media,
        language=lang_param,
        beam_size=5,
        vad_filter=True, # Voice Activity Detection removes silence
        vad_parameters=dict(min_silence_duration_ms=400)
    )

    detected_lang = info.language
    emit_json({
        "type": "info",
        "detectedLanguage": detected_lang,
        "languageProbability": round(info.language_probability, 2),
        "duration": round(info.duration, 2)
    })

    cues = []
    texts_to_translate = []
    cue_id = 1

    for s in segments:
        text_clean = s.text.strip()
        if text_clean:
            cues.append({
                "id": cue_id,
                "startTime": round(s.start, 2),
                "endTime": round(s.end, 2),
                "textEn": text_clean,
                "textVi": ""
            })
            texts_to_translate.append(text_clean)
            cue_id += 1

    if not cues:
        emit_json({"type": "success", "cues": [], "message": "Không tìm thấy giọng nói trong media"})
        return

    emit_json({"type": "progress", "percent": 75, "message": f"Đã nhận diện {len(cues)} câu. Đang dịch sang Tiếng Việt..."})

    # Translate if target is Vietnamese and source is English
    if (detected_lang == "en" or source_lang == "en") and target_lang == "vi":
        try:
            translations = translate_texts_marian(texts_to_translate, source_lang="en", target_lang="vi")
            for i, trans in enumerate(translations):
                if i < len(cues):
                    cues[i]["textVi"] = trans.strip()
        except Exception as err:
            sys.stderr.write(f"Translation step failed: {err}\n")

    emit_json({
        "type": "success",
        "cues": cues,
        "count": len(cues),
        "detectedLanguage": detected_lang
    })

def translate_only(json_input_path, source_lang="en", target_lang="vi"):
    if not os.path.exists(json_input_path):
        emit_json({"type": "error", "message": f"Input JSON not found: {json_input_path}"})
        return

    with open(json_input_path, 'r', encoding='utf-8') as f:
        cues = json.load(f)

    texts = [c.get("textEn", "") for c in cues]
    emit_json({"type": "progress", "percent": 30, "message": f"Đang dịch {len(texts)} câu sang Tiếng Việt..."})

    translations = translate_texts_marian(texts, source_lang, target_lang)
    for i, trans in enumerate(translations):
        if i < len(cues):
            cues[i]["textVi"] = trans.strip()

    emit_json({"type": "success", "cues": cues, "count": len(cues)})

def main():
    parser = argparse.ArgumentParser(description="LingoGlass GPU Local Subtitle & Translation Engine")
    parser.add_argument("--action", choices=["check_gpu", "transcribe", "translate_only"], required=True)
    parser.add_argument("--input", type=str, help="Path to video/audio or JSON file")
    parser.add_argument("--model", type=str, default="base", help="Whisper model: tiny, base, small, medium")
    parser.add_argument("--source-lang", type=str, default="auto", help="Source language (e.g. en, ja, auto)")
    parser.add_argument("--target-lang", type=str, default="vi", help="Target language (e.g. vi)")
    parser.add_argument("--device", type=str, default="auto", help="Device: cuda, cpu, auto")

    args = parser.parse_args()

    if args.action == "check_gpu":
        check_gpu()
    elif args.action == "transcribe":
        if not args.input:
            emit_json({"type": "error", "message": "Missing --input parameter"})
            return
        transcribe_and_translate(args.input, args.model, args.source_lang, args.target_lang, args.device)
    elif args.action == "translate_only":
        if not args.input:
            emit_json({"type": "error", "message": "Missing --input parameter"})
            return
        translate_only(args.input, args.source_lang, args.target_lang)

if __name__ == "__main__":
    main()
