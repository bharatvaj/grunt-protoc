# grunt-protoc
protoc generator task

# info
Original repo was missing some functionality I require. So I forked this repo and implemented some features of my own. Feel free to raise issues

## config

```js
<plugin>: {
    protocPath: "path/to/protoc",   // optional - path of the protoc, will use system protoc if left unspecified
    proto: ["*.proto"],             // required - proto files to compiles
    includes: ["."],                // optional - proto include path
    transpile: [                    // required - configure the transpilation
        {
        plugin: "js",                   // required - the name of the plugin
        pluginPath: "path/to/plugin",   // optional - path of the plugin
        output: "model/js",             // required - output directory, can also specify options here
        },
    ]
}
````

## LICENSE

MIT LICENSE