$folders = "bin", "locales", "public", "routes", "views"
$files = "app.js", "package.json", "package-lock.json"

ForEach-Object -InputObject $folders {
	scp.exe -r $_ cross@fluxfinancial.net:/home/public/flux/
}

ForEach-Object -InputObject $files {
	scp.exe $_ cross@fluxfinancial.net:/home/public/flux/
}