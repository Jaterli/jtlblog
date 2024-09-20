/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', // solo se aplica al directorio src
		// './public/index.html',
		//'./dist/**/*.{html,js}'
	], 

	theme: {	
		extend: {},
		/*
		fontSize: {
			lg: '3rem', // Adds a new `font-display` class
		}
		*/		
	  },
	
	plugins: [
		require("@tailwindcss/typography"), // Para dar estilos a los MD: https://tailwindcss.com/docs/plugins#typography
		require("daisyui"),
	],
	
	daisyui: {
		//themes: ["light", "dark"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		
		themes: [
			{
			'light':{
				...require("daisyui/src/theming/themes")["light"],
				".badge-neutral": {
						"background-color": "#000000",
						"color": "#ffffff",
					},
				"base-200": "rgb(235, 235, 235)",
				}
			},
			{			
			'dark':{
				...require("daisyui/src/theming/themes")["dark"],
				"base-content" : "#dddddd", // font color
				".badge-neutral": {
						"background-color": "#ffffff",
						"color": "#000000",
					},
				"base-200": "rgb(9, 17, 27)",
				},				
				// Ref para configurar theme: https://themes.ionevolve.com/
			},
		], 
	},
	
	darkMode: ['class', '[data-theme="dark"]']
}