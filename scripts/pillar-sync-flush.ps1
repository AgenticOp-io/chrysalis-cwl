#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Scheduled flush: commit+push dirty CWL pillar-sync bus (candidate only).

.DESCRIPTION
  Called at end of each CWL coordinator tick. No empty commits.
  Does not touch Convert/Secure trees.
#>
param(
  [string] $Message = ""
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$branch = (git branch --show-current).Trim()
if ($branch -notmatch '^candidate/') {
  Write-Host "pillar-sync-flush: skip (not on candidate/* — branch=$branch)"
  exit 0
}

git add -- docs/pillar-sync scripts/pillar-sync-checkin.ps1 scripts/pillar-sync-flush.ps1 2>$null
$status = git status --porcelain -- docs/pillar-sync scripts/pillar-sync-checkin.ps1 scripts/pillar-sync-flush.ps1
if (-not $status) {
  Write-Host "pillar-sync-flush: clean"
  exit 0
}

if (-not $Message) {
  $Message = "pillar-sync: scheduled fleet flush $(Get-Date -Format 'yyyy-MM-ddTHH:mm:ssK')"
}

$env:GIT_AUTHOR_NAME = if ($env:GIT_AUTHOR_NAME) { $env:GIT_AUTHOR_NAME } else { "David" }
$env:GIT_AUTHOR_EMAIL = if ($env:GIT_AUTHOR_EMAIL) { $env:GIT_AUTHOR_EMAIL } else { "david@agenticop.io" }
$env:GIT_COMMITTER_NAME = $env:GIT_AUTHOR_NAME
$env:GIT_COMMITTER_EMAIL = $env:GIT_AUTHOR_EMAIL

git commit -m $Message
if ($LASTEXITCODE -ne 0) {
  Write-Host "pillar-sync-flush: commit failed"
  exit 1
}

git push -u origin HEAD
if ($LASTEXITCODE -ne 0) {
  Write-Host "pillar-sync-flush: push failed"
  exit 1
}

$sha = (git rev-parse --short HEAD).Trim()
Write-Host "pillar-sync-flush: ok SHA=$sha branch=$branch"
exit 0
