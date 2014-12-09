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
					"./built/brcharts/tools", 
					"./built/brcharts/utils",
					"./built/brcharts/chart.js",
					"./built/brcharts/build.txt"
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
				dest: "./built/brcharts/min"
			}
		},
		copy:{
			main:{
				src:"./main.js",
				dest:"./built/brcharts/main.js"
			},
			minmain:{
				src:"./main.js",
				dest:"./built/brcharts/min/built/brcharts/main.js"
			},
			doc:{
				src:["./test/**","./charts/**"],
				dest:"./doc/brcharts/"
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