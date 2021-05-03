# MyLang

A hobby compiler build by nearley.

## Features

- Lexer
- Parser
- AST Tree as JSON format
- Generate JS as intermediate code

## Statements

- While loop
- Variable
- Print

## Using

```
$ node parser.js examples/hello-world.mylang
$ node examples/hello-world.js
```

## Examples

### Print

```
$ node parser.js examples/hello-world.mylang 
$ node examples/hello-world.js 
```

```js
print 10
```

### Loop

```
$ node parser.js examples/loop.mylang
$ node examples/loop.js
```

```js
n := 1
while n < 10 {
	n := n + 1
	print n
}
```

### Fibonacci

```
$ node parser.js examples/fib.mylang
$ node examples/fib.js
```

```js
i := 1
n := 10
fi := 1
fii := 1
while i <= n {
	print fi
	temp := fi + fii
	fi := fii
	fii := temp
	i := i +1
}
```

© Copyright Max Base 2021

Thanks from Toby Ho and Nearley (https://nearley.js.org/)
