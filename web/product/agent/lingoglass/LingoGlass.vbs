Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)
electronExe = currentDir & "\node_modules\electron\dist\electron.exe"
WshShell.CurrentDirectory = currentDir
WshShell.Run """" & electronExe & """ """ & currentDir & """", 0, False
