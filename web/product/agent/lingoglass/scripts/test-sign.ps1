$pfxPath = "D:\3. Agent\3-app\1-mkv\build\cert.pfx"
$password = ConvertTo-SecureString "lingoglass2026" -AsPlainText -Force
$cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2($pfxPath, $password)

$file = "D:\3. Agent\3-app\1-mkv\release\win-unpacked\LingoGlass.exe"
if (Test-Path $file) {
    Unblock-File -Path $file
    $res = Set-AuthenticodeSignature -Certificate $cert -FilePath $file
    Write-Host "Signed $($file) - Status: $($res.Status) - $($res.StatusMessage)"
}
