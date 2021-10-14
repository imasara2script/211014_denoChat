import { getParentDirectory } from './getParentDirectory.ts'

export async function get絶対Path(path:string):Promise<string>{
	if(!await isExists(path)){return ''}
	return Deno.realPathSync(path).replace(/^UNC/,'\\')
}

export async function isExists(path: string): Promise<boolean> {
	try {
		await Deno.lstat(path)
		return true
	} catch (err) {
		if (err instanceof Deno.errors.NotFound) {
console.log('Deno.errors.NotFound '+path)
			return false
		}
console.log('Deno.errors.NotFound以外のエラー '+path)
		throw err
	}
}
