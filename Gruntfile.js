module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		requirejs: {
			compile: {
				options: {
					baseUrl: "./charts",
					dir: "./build",
					optimize: "none",//uglify
					modules: [
						{
							name: "tschart"
						},
						{
							name: "columnchart"
						},
						{
							name: "piechart"
						},
						{
							name: "polarchart"
						},
						{
							name: "ringchart"
						},
						{
							name: "scatterchart"
						},{
							name: "splinechart"
						},{
							name: "waterfallchart"
						}
					]
				}
			}
		},
		clean: { 
			build: { 
				src: [
					"./build/tools", 
					"./build/utils",
					"./build/chart.js",
					"./build/build.txt"
				] 
			} 
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> <%= pkg.version %>*/\n"
			},
			build: {
				expand:true,
				src: "./build/**/*.js",
				dest: "./build/min"
			}
		},
		copy:{
			main:{
				src:"./main.js",
				dest:"./build/main.js"
			},
			minmain:{
				src:"./main.js",
				dest:"./build/min/build/main.js"
			}
		},
	});


	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	// 默认被执行的任务列表。
	grunt.registerTask("default", ["requirejs","clean","uglify","copy"]);

};