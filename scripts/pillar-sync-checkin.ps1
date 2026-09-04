#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Pillar-sync check-in summary for CWL fleet coordinator ticks.

.DESCRIPTION
  Pulls are caller's job. This script reads BOARD + three OUTBOXes and prints
  a compact status + sentinel for agent loops.
#>
$ErrorActionPreference = "Continue"
$engines = Join-Path (Split-Path -Parent (Split-Path -Parent $PSScriptRoot)) ""
# scripts/ → repo root is parent of scripts
$root = Split-Path -Parent $PSScriptRoot
$cwl = $root
$convert = Join-Path (Split-Path -Parent $root) "chrysalis-convert"
$secure = Join-Path (Split-Path -Parent $root) "chrysalis-security"

function Short-Sha([string]$repo) {
  if (-not (Test-Path $repo)) { return "missing" }
  try { return (git -C $repo rev-parse --short HEAD 2>$null).Trim() } catch { return "err" }
}

function Read-Head([string]$path, [int]$n = 40) {
  if (-not (Test-Path $path)) { return "(missing $path)" }
  return (Get-Content -LiteralPath $path -TotalCount $n) -join "`n"
}

$shaCwl = Short-Sha $cwl
$shaConv = Short-Sha $convert
$shaSec = Short-Sha $secure

Write-Host "=== pillar-sync checkin ==="
Write-Host "CWL     $shaCwl"
Write-Host "Convert $shaConv"
Write-Host "Secure  $shaSec"
Write-Host ""
Write-Host "--- BOARD (head) ---"
Write-Host (Read-Head (Join-Path $cwl "docs\pillar-sync\BOARD.md") 35)
Write-Host ""
Write-Host "--- CWL OUTBOX (head) ---"
Write-Host (Read-Head (Join-Path $cwl "docs\pillar-sync\OUTBOX.md") 45)
Write-Host ""
Write-Host "--- Convert OUTBOX (head) ---"
Write-Host (Read-Head (Join-Path $convert "docs\pillar-sync\OUTBOX.md") 35)
Write-Host ""
Write-Host "--- Secure OUTBOX (head) ---"
Write-Host (Read-Head (Join-Path $secure "docs\pillar-sync\OUTBOX.md") 35)
Write-Host ""

$board = Get-Content -LiteralPath (Join-Path $cwl "docs\pillar-sync\BOARD.md") -Raw
$idle = $board -match "CWL_FLEET_IDLE:\s*yes"
$openConvert = (Select-String -Path (Join-Path $cwl "docs\pillar-sync\OUTBOX.md") -Pattern "\*\*To:\*\*\s*convert" -SimpleMatch:$false | Measure-Object).Count
# crude: look for Status:** open near convert asks — coordinator also reads manually
$hasOpenAsk = $board -match "\*\*open\*\*" -or ((Get-Content (Join-Path $cwl "docs\pillar-sync\OUTBOX.md") -Raw) -match '\*\*Status:\*\*\s*\*\*open\*\*')

$payload = @{
  prompt = "CWL fleet coordinator tick: act on sibling OUTBOX replies; refresh HEARTBEAT/BOARD; post next asks if waiting; CWL hygiene only on contract gaps; commit+push; stop if CWL_FLEET_IDLE"
  cwl = $shaCwl
  convert = $shaConv
  secure = $shaSec
  idle = $idle
  hasOpenAsk = [bool]$hasOpenAsk
} | ConvertTo-Json -Compress

Write-Host "AGENT_LOOP_TICK_cwl_fleet $payload"
if ($idle) {
  Write-Host "CWL_FLEET_IDLE"
  exit 0
}
exit 0
