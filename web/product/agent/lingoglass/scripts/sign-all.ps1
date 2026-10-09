$pfxPath = "D:\3. Agent\3-app\1-mkv\build\cert.pfx"
$password = ConvertTo-SecureString "lingoglass2026" -AsPlainText -Force
$cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2($pfxPath, $password)

$targets = @(
    "D:\3. Agent\3-app\1-mkv\release\LingoGlass Setup 1.0.0.exe",
    "D:\3. Agent\3-app\1-mkv\release\win-unpacked\LingoGlass.exe"
)

foreach ($target in $targets) {
    if (Test-Path $target) {
        Unblock-File -Path $target
        $res = Set-AuthenticodeSignature -Certificate $cert -FilePath $target
        Write-Host "Signed $($target) - Status: $($res.Status)"
    }
}
