$pfxPath = "D:\3. Agent\3-app\1-mkv\build\cert.pfx"
$password = ConvertTo-SecureString "lingoglass2026" -AsPlainText -Force
$cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2($pfxPath, $password, [System.Security.Cryptography.X509Certificates.X509KeyStorageFlags]::Exportable)

# Add to CurrentUser\Root
$rootStore = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root", "CurrentUser")
$rootStore.Open([System.Security.Cryptography.X509Certificates.OpenFlags]::ReadWrite)
$rootStore.Add($cert)
$rootStore.Close()

# Add to CurrentUser\TrustedPublisher
$pubStore = New-Object System.Security.Cryptography.X509Certificates.X509Store("TrustedPublisher", "CurrentUser")
$pubStore.Open([System.Security.Cryptography.X509Certificates.OpenFlags]::ReadWrite)
$pubStore.Add($cert)
$pubStore.Close()

Write-Host "Successfully added cert to CurrentUser\Root and CurrentUser\TrustedPublisher."

# Re-sign binaries with timestamping
$targets = @(
    "D:\3. Agent\3-app\1-mkv\release\LingoGlass Setup 1.0.0.exe",
    "D:\3. Agent\3-app\1-mkv\release\win-unpacked\LingoGlass.exe"
)

foreach ($target in $targets) {
    if (Test-Path $target) {
        Unblock-File -Path $target
        $res = Set-AuthenticodeSignature -Certificate $cert -FilePath $target
        Write-Host "Re-signed $target - Status: $($res.Status)"
    }
}

# Check signature status
Get-AuthenticodeSignature $targets | Format-List Path, Status, StatusMessage
