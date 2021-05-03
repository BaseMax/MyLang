const nearley = require("nearley")
const grammar = require("./mylang")
const fs = require("mz/fs")
const path = require("path")

async function main() {

	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

	const filename = process.argv[2]
	const filenamePath = path.basename(filename, ".mylang")

	const astFilename = "examples/" + filenamePath + ".ast"
	const outputFilename = "examples/" + filenamePath + ".js"

	const code = (await fs.readFile(filename)).toString()

	try {
		// parser.feed("a:=3.14")
		parser.feed(code)

		const ast = parser.results[0]
		await fs.writeFile(astFilename, JSON.stringify(ast, null, 2))

		const jsCode = generateJS(ast, [])
		await fs.writeFile(outputFilename, jsCode)

		console.log("Parse succeeded.")
		console.log(parser.results)
	} catch(e) {
		console.log(e)
		console.log(`Parse failed: ${e.message}`)
	}
}

function generateJSExpression(expression) {
	// console.log(expression)

	const oepratorMap = {
		"+": "+",
		"-": "-",
		"*": "*",
		"/": "/",
		">=": ">=",
		"<=": "<=",
		">": ">",
		"<": "<",
		"=": "=="
	}

	if(typeof expression === "object") {
		if(expression.type === "binary_expression") {
			const left = generateJSExpression(expression.left)
			const right = generateJSExpression(expression.right)
			const operator = oepratorMap[expression.operator]
			return `${left} ${operator} ${right}`
		}
	}
	else {
		// identifier or number
		return expression
	}
}

function generateJS(statements, declaredVariables) {
	console.log(declaredVariables)

	const lines = []
	for (let statement of statements) {
		
		if(statement.type === "var_assignment") {
			const value = generateJSExpression(statement.value)
			if(declaredVariables.indexOf(statement.varname) === -1) {
				lines.push(`let ${statement.varname} = ${value};`)
				declaredVariables.push(statement.varname)
			}
			else {
				lines.push(`${statement.varname} = ${value};`)
			}
		}

		else if(statement.type === "while_loop") {
			const condition = generateJSExpression(statement.condition)
			const body = generateJS(statement.body, declaredVariables).split("\n").map(line => "	" + line).join("\n")
			lines.push(`while(${condition}) {\n${body}\n}`)
		}

		else if(statement.type === "print_statement") {
			const expression = generateJSExpression(statement.expression)
			lines.push(`console.log(${expression});`)
		}
	}
	return lines.join("\n")
	// return "console.log('Hello, World!');"
}

main()
