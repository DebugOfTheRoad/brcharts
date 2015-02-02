module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		requirejs: {
			compile: {
				options: {
					baseUrl: "./charts",
					dir: "./built/brcharts",
					optimize: "none",//uglify
					modules: [
						{
							name: "brcharts"
						}
					]
				}
			}
		},
		clean: { 
			build: { 
				src: [
					"./built/brcharts/tools", 
					"./built/brcharts/utils",
					"./built/brcharts/columnchart.js",
					"./built/brcharts/piechart.js",
					"./built/brcharts/polarchart.js",
					"./built/brcharts/ringchart.js",
					"./built/brcharts/scatterchart.js",
					"./built/brcharts/splinechart.js",
					"./built/brcharts/tschart.js",
					"./built/brcharts/waterfallchart.js",
					"./built/brcharts/chart.js",
					"./built/brcharts/build.txt"
				] 
			},
			deploy:{
				src: [
					"./built/brcharts/brcharts.js", 
					"./built/release/built/brcharts/brcharts.js"
				]
			}
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> <%= pkg.version %>*/\n"
			},
			build: {
				expand:true,
				src: "./built/brcharts/**/*.js",
				dest: "./built/release"
			}
		},
		copy:{
			main:{
				src:"./main.js",
				dest:"./built/brcharts/main.js"
			},
			minmain:{
				src:"./main.js",
				dest:"./built/release/built/brcharts/main.js"
			},
			doc:{
				src:["./test/**","./charts/**"],
				dest:"./doc/brcharts/"
			},
			brcharts:{
				src:"./built/brcharts/brcharts.js",
				dest:"./built/brcharts/brcharts<%= pkg.version %>.js"
			},
			brchartsmin:{
				src:"./built/release/built/brcharts/brcharts.js",
				dest:"./built/release/built/brcharts/brcharts<%= pkg.version %>.js"
			}
		},
	});


	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	// 默认被执行的任务列表。
	grunt.registerTask("default", ["requirejs","clean:build","uglify","copy","clean:deploy"]);

};