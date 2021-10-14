export function getParentDirectory(path:string):string{
	return path.replace(/([\\\/])[^\\\/]+$/,'$1')
}
