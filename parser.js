const nearley = require("nearley")
const grammar = require("./mylang")
const fs = require("mz/fs")
const path = require("path")

async function main() {

	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
	const filename = process.argv[2]
	const outputFilename = path.basename(filename, ".mylang") + ".ast"
	const code = (await fs.readFile(filename)).toString()

	try {
		// parser.feed("a:=3.14")
		parser.feed(code)

		const ast = parser.results[0]
		await fs.writeFile(outputFilename, JSON.stringify(ast, null, 2))

		console.log("Parse succeeded.")
		console.log(parser.results)
	} catch(e) {
		console.log(`Parse failed: ${e.message}`)
	}
}
main()
