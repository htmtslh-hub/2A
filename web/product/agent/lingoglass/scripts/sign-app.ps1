# Create self-signed code signing certificate if not existing
$certSubject = "CN=LingoGlass Player, O=LingoGlass, C=VN"
$cert = Get-ChildItem Cert:\CurrentUser\My -CodeSigningCert | Where-Object { $_.Subject -eq $certSubject } | Select-Object -First 1

if (-not $cert) {
    Write-Host "Creating new Code Signing Certificate..."
    $cert = New-SelfSignedCertificate -Type CodeSigning -Subject $certSubject -CertStoreLocation Cert:\CurrentUser\My -NotAfter (Get-Date).AddYears(5)
    
    # Also trust in CurrentUser Trusted Root Certification Authorities
    $rootStore = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root", "CurrentUser")
    $rootStore.Open("ReadWrite")
    $rootStore.Add($cert)
    $rootStore.Close()
    Write-Host "Certificate added to Trusted Root Authorities."
}

$files = @(
    "D:\3. Agent\3-app\1-mkv\release\win-unpacked\LingoGlass.exe",
    "D:\3. Agent\3-app\1-mkv\release\LingoGlass 1.0.0.exe"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Signing $file..."
        Unblock-File -Path $file
        $res = Set-AuthenticodeSignature -Certificate $cert -FilePath $file
        Write-Host "Result: $($res.Status) - $($res.StatusMessage)"
    }
}
