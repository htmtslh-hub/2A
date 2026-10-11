Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SetOutputToWaveFile("speech_sample.wav")
$synth.Speak("Hello and welcome to LingoGlass. This is an English audio test for subtitle recognition and GPU translation.")
$synth.Dispose()
Write-Host "Done generating speech_sample.wav"
