# template

`template` is an engine that compile our `server template` into `html`

# built-in template engine

- we use [koa-views](https://github.com/queckezz/koa-views) to handle view rendering work.
- [koa-views](https://github.com/queckezz/koa-views) use [consolidate](https://github.com/tj/consolidate.js) inside.
- at last, from [config file](../config/default.js) you can see we use [ect](https://github.com/baryshev/ect) as  the default template engine.

# api

> content below is from  [ect](https://github.com/baryshev/ect)


## Features

  * Excellent performance
  * Templates caching
  * Automatic reloading of changed templates
  * CoffeeScript code in templates
  * Multi-line expressions support
  * Tag customization support
  * Node.JS and client-side support
  * Powerful but simple syntax
  * Inheritance, partials, blocks
  * Compatible with `express`
  * Compatible with `RequireJS`
  * Backward compatible with `eco`
  * [Syntax highlighting for Sublime Text 2](https://github.com/TurtlePie/Sublime-ECT) by [TurtlePie](https://github.com/TurtlePie)

## Usage

```js
var ECT = require('ect');

var renderer = ECT({ root : __dirname + '/views', ext : '.ect' });
var html = renderer.render('page', { title: 'Hello, World!' });
```

or

```js
var ECT = require('ect');

var renderer = ECT({ root : __dirname + '/views', ext : '.ect' });

renderer.render('page', { title: 'Hello, World!' }, function (error, html) {
	console.log(error);
	console.log(html);
});
```

You may use JavaScript object as root.

```js
var ECT = require('ect');

var renderer = ECT({ root : {
				layout: '<html><head><title><%- @title %></title></head><body><% content %></body></html>',
				page: '<% extend "layout" %><p>Page content</p>'
				}
			});

var html = renderer.render('page', { title: 'Hello, World!' });
```

### With express

app.js
```js
var express = require('express');
var app = express();
var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.get('/', function (req, res){
	res.render('index');
});

app.listen(3000);
console.log('Listening on port 3000');
```

views/index.ect
```html
<% extend 'layout' %>
<% include 'extra' %>
<div>Hello, World!</div>
```

views/extra.ect
```html
<div>Include me!</div>
```

views/layout.ect
```html
<html>
	<body>
		<% content %>
	</body>
</html>
```

## Syntax

### Unescaped output

```
<%- someVar %>
```

### Escaped output

```
<%= someVar %>
```

### CoffeeScript code

```
<% for article in @articles : %>
	<% include 'article', article %>
<% end %>
```

or

```
<% if @user?.authenticated : %>
	<% include 'partials/user' %>
<% else : %>
	<% include 'partials/auth' %>
<% end %>
```

### Inheritance

```
<% extend 'layout' %>
```

Use


```
<% content %>
```

in parent template to define the insertion point.

### Partials

```
<% include 'partial' %>
```

You can redefine data context of partial

```
<% include 'partial', { customVar: 'Hello, World!' } %>
```

### Blocks

```
<% block 'blockName' : %>
	<p>This is block content</p>
<% end %>
```

Use


```
<% content 'blockName' %>
```

in parent template to define the insertion point.

Blocks supports more than one level of inheritance and may be redefined.

## Options

### Renderer

  - `root` — Templates root folder or JavaScript object containing templates
  - `ext` — Extension of templates, defaulting to `''` (not used for JavaScript objects as root)
  - `cache` — Compiled functions are cached, defaulting to `true`
  - `watch` — Automatic reloading of changed templates, defaulting to `false` (useful for debugging with enabled cache, not supported for client-side)
  - `open` — Open tag, defaulting to `<%`
  - `close` — Closing tag, defaulting to `%>`

### Compiler middleware

  - `root` — Base url, defaulting to `/` (should be equal to `root` option on the client side)
  - `gzip` — Compressing templates with gzip, defaulting to `false`

## Client-side support

Download and include [coffee-script.js](https://github.com/jashkenas/coffee-script/blob/master/extras/coffee-script.js) and [ect.min.js](https://github.com/baryshev/ect/tree/master/ect.min.js).

```html
<script src="/path/coffee-script.js"></script>
<script src="/path/ect.min.js"></script>
```

Use it.

```js
var renderer = ECT({ root : '/views' });
var data = { title : 'Hello, World!' };
var html = renderer.render('template.ect', data);
```

### With server side compiler middleware

Download and include [ect.min.js](https://github.com/baryshev/ect/tree/master/ect.min.js). You don't need to include CoffeeScript compiler, because templates are served already compiled by server side compiler middleware.

```html
<script src="/path/ect.min.js"></script>
```

Setup server side compiler middleware.

```js
var connect = require('connect');
var ECT = require('ect');

var renderer = ECT({ root : __dirname + '/views', ext : '.ect' });

var app = connect()
	.use(renderer.compiler({ root: '/views', gzip: true }))
	.use(function(err, req, res, next) {
		res.end(err.message);
	});

app.listen(3000);
```

Use it.

```js
var renderer = ECT({ root : '/views', ext : '.ect' });
var data = { title : 'Hello, World!' };
var html = renderer.render('template', data);
```

Note: root folder must be on the same domain to avoid cross-domain restrictions.