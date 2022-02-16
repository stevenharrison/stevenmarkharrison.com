---
Id: 23f3a64a-8b1e-4644-8ab9-da85b0907e1b
Title: Installing a DLL to the GAC
PublishedOn: '2022-02-14'
Published: true
Tags: [Powershell, GAC, SSIS]
Sources:
    - https://www.andrewcbancroft.com/2015/12/16/using-powershell-to-install-a-dll-into-the-gac/
---
# Installing a DLL to the GAC

Install dlls to the GAC is often done automatically. Sometimes, in the case of SSIS script components, you will need to do it manually. The easiest way is to use the powershell script below. 

If you don't have the dll to hand, you can install it with the "Install-Package" command from nuget in Visual Studio, and pick it up from the project directory. 

```powershell
#Note that you should be running PowerShell as an Administrator
[System.Reflection.Assembly]::Load("System.EnterpriseServices, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a")            
$publish = New-Object System.EnterpriseServices.Internal.Publish            
$publish.GacInstall("C:\Path\To\DLL.dll")
```