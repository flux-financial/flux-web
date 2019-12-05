<#
Deployment script

	Usage: ./deploy.ps1 <your username to log in to the server>

Uses scp (copy over SSH) to copy files from the folders named in $folders and the top-level files named in $files.

It logs in as username@fluxfinancial.net and moves files to /home/public/flux.
#>

Param(
    [Parameter(Mandatory=$true)]
    [String]
    $user
)

$folders = "bin", "locales", "public", "views"
$files = "app.js", "package.json", "package-lock.json", ".dockerignore", "Dockerfile", "docker-compose.yml"

ForEach-Object -InputObject $folders {
	scp -r $_ $user@fluxfinancial.net:/home/public/flux/
}

ForEach-Object -InputObject $files {
	scp $_ $user@fluxfinancial.net:/home/public/flux/
}