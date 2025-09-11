# Script to remove empty MongoDB-related files
$emptyFiles = @(
    "server.js",
    "models\User.js",
    "models\Material.js",
    "controllers\authController.js",
    "src\api.js",
    "src\api\index.js",
    "config\db.js"
)

foreach ($file in $emptyFiles) {
    $fullPath = Join-Path -Path $PWD -ChildPath $file
    if (Test-Path -Path $fullPath) {
        $content = Get-Content -Path $fullPath -Raw
        if ([string]::IsNullOrWhiteSpace($content)) {
            Write-Host "Removing empty file: $file"
            Remove-Item -Path $fullPath -Force
        }
        else {
            Write-Host "File is not empty, skipping: $file"
        }
    }
}

# Remove empty directories
$emptyDirs = @(
    "models",
    "controllers",
    "routes",
    "middleware"
)

foreach ($dir in $emptyDirs) {
    $fullPath = Join-Path -Path $PWD -ChildPath $dir
    if (Test-Path -Path $fullPath) {
        $files = Get-ChildItem -Path $fullPath -Recurse
        if ($files.Count -eq 0) {
            Write-Host "Removing empty directory: $dir"
            Remove-Item -Path $fullPath -Force -Recurse
        }
        else {
            Write-Host "Directory is not empty, skipping: $dir"
        }
    }
}

Write-Host "Cleanup complete!"
