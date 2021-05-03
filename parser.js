const nearley = require("nearley")
const grammar = require("./mylang")

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

try {
	parser.feed("a:=3.14")
	console.log(parser.results)
} catch(e) {
	console.log(`Parse failed: ${e.message}`)
}
