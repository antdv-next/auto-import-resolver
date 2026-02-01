// import fs from 'node:fs'
// import path from 'node:path'
// import { fileURLToPath } from 'node:url'
//
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// const srcDir = path.resolve(__dirname, '../src')
// const antdvNextRoot = process.env.ANTDV_NEXT_ROOT
//   ? path.resolve(process.env.ANTDV_NEXT_ROOT)
//   : path.resolve(__dirname, '../../antdv-next')
//
// function warnMissing(filePath: string) {
//   const hint = process.env.ANTDV_NEXT_ROOT ? '' : ' (set ANTDV_NEXT_ROOT to packages/antdv-next)'
//   console.warn(`${filePath} not found${hint}`)
// }
//
// function generateComponents() {
//   const globalDtsFilePath = path.resolve(antdvNextRoot, 'global.d.ts')
//   if (!fs.existsSync(globalDtsFilePath)) {
//     warnMissing(globalDtsFilePath)
//     return
//   }
//
//   const dtsContent = fs.readFileSync(globalDtsFilePath, 'utf-8')
//   const result: Record<string, string> = {}
//
//   const regex = /(\w+):\s*typeof\s+import\(['"`][^'"`]+['"`]\)\[(['"`])([^'"`]+)\2\]/g
//
//   let match: RegExpExecArray | null
//   // eslint-disable-next-line no-cond-assign
//   while ((match = regex.exec(dtsContent)) !== null) {
//     const globalName = match[1]
//     const actualName = match[3]
//     if (!globalName || !actualName) {
//       continue
//     }
//
//     result[globalName] = actualName
//   }
//
//   fs.writeFileSync(path.join(srcDir, 'components.ts'), `export default ${JSON.stringify(result, null, 2)} as Record<string,string>\n`)
// }
//
// function generateIcons() {
//   const iconDir = path.resolve(antdvNextRoot, '../icons/src/icons')
//   if (!fs.existsSync(iconDir)) {
//     warnMissing(iconDir)
//     return
//   }
//
//   const iconFiles = fs.readdirSync(iconDir).filter(s => s !== 'index.ts').map(file => file.replace('.tsx', '')).filter(item => item !== 'index')
//   fs.writeFileSync(path.join(srcDir, 'icons.ts'), `export default ${JSON.stringify(iconFiles, null, 2)} as string[]\n`)
// }
//
// generateComponents()
// generateIcons()
