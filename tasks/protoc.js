// grunt-protoc
// ==========
// * GitHub: https://github.com/chobie/grunt-protoc
// * Copyright (c) 2014 Shuhei Tanuma
// * Licensed under the MIT license.

module.exports = function (grunt) {
    var proc = require('child_process')
        , _ = grunt.util._
        , f = require('util').format
        , log = grunt.log
        , verbose = grunt.verbose;

    grunt.registerMultiTask('protoc', 'generate protoc mesages.', function () {
        var data = this.data
            , execOptions = {}
            , callback = function() {}
            , childProcess
            , exitCodes = 0
            , done = this.async()
            , proto = data.proto
            , protocPath = data.protocPath
            , transpile = data.transpile
            , includes = data.includes
            ;

        proto = _.isArray(proto) ? proto : [proto];
        proto = proto.join(" ");
        protocPath = protocPath ? protocPath : "protoc";

        // command  = command + " --" + target + "_out=" + output;
        var command = `${protocPath}`

        for(let t of transpile){
            let plugin = t.plugin,
                pluginPath=t.pluginPath,
                output=t.output;

            if(pluginPath){
                command  += ` --plugin=${pluginPath}`;
            }
            if (!_.isUndefined(plugin) && !_.isUndefined(output)) {
                command += ` --${plugin}_out=${output}`;
            }
        }

        for(let include of includes){
            command += ` --proto_path=${include}`
        }

        command += ` ${proto}`;

        verbose.ok(command);

        exitCodes = _.isArray(exitCodes) ? exitCodes : [exitCodes];
        childProcess = proc.exec(command, execOptions, callback);

        childProcess.stdout.on('data', function (d) { log.write(d); });
        childProcess.stderr.on('data', function (d) { log.error(d); });

        childProcess.on('exit', function(code) {
            if (exitCodes.indexOf(code) < 0) {
                log.error(f('Exited with code: %d.', code));
                return done(false);
            }

            verbose.ok(f('Exited with code: %d.', code));
            done();
        });
    });
};