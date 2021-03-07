module.exports = function (grunt) {
    grunt.initConfig({
        mkdir: {
            all: {
              options: {
                mode: 0700,
                create: ['model/js', 'model/ts']
              },
            },
          },
        protoc: {
            server: {
                proto: ["*.proto"],
                includes: ["."],
                transpile: [
                    {
                        plugin: "js",
                        output: "model/js"
                    }
                ]
            },
            client: {
                protocPath: "node_modules/protoc/protoc/bin/protoc",
                proto: ["*.proto"],
                includes: ["."],
                transpile: [
                    {
                        plugin: "ts",
                        pluginPath: "node_modules/ts-protoc-gen/bin/protoc-gen-ts",
                        output: "model/ts"
                    }
                ]
            }
        }
    });
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-mkdir');
    grunt.registerTask('default', ['mkdir', 'protoc']);
};