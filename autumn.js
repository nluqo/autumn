(function ( $ ) {
		var huslAvailable = false		
		if($.hasOwnProperty("husl")){
			huslAvailable = true;
		}
		
		//0: colorspace (hsl/husl/huslp)
		//1: saturation min
		//2: saturation max
		//3: lightness min
		//4: lightness max
		
		var colorProfiles = {
			hsldefault:	['hsl',		65,		95,		45,		75],
			superwide: 	['hsl',		30,		100,	20,		90],
			saturated: 	['hsl',		100,	100,	40,		70],
			greyscale:	['hsl',		0,		0,		15,		85]
		};
		
		//THE PROFILES BELOW REQUIRE HUSL
		var huslProfiles = {
			"default":	['husl',	90,		100,	50,		85],
			dark:		['husl',	80,		100,	30,		60],
			light:		['husl',	70,		100,	60,		90],
			pastel:		['huslp',	60,		100,	60,		90],
			wide:		['husl',	50,		100,	30,		85]
		}
		
		$.extend(colorProfiles, huslProfiles);
		
		var defaultOptions = {
			colorProfile: "default",
			hueCenter: 0,
			hueScale: 1,
			generator: "halton",
			primeWalkHueDistance: 223
		}
		
		if(!huslAvailable){
			defaultOptions.colorProfile = "hsldefault";
		}
		
		var currentOptions = {}
		
		currentOptions = $.extend(currentOptions, defaultOptions);
		
		
		$.fn.autumn=function(colorProperty, keyAttribute){
			if(colorProperty===undefined){
				colorProperty = "backgroundColor";
			}
			
			var key,cssObject;

			return this.each(function(index, element){
				cssObject = {};
				
				if(keyAttribute === undefined){
					key = index;
				}else{
					key = $(this).attr(keyAttribute);
				}
				
				cssObject[colorProperty]=$.fn.autumn.getColor(key);

				$(this).css(cssObject);
			});
		}	
		
		$.fn.autumn.init = function(options){
			if(typeof options.colorProfile === "object"){
				colorProfiles["user"] = options.colorProfile;
				options.colorProfile = "user";
			}
			currentOptions = $.extend({}, defaultOptions, options);
		};
		$.fn.autumn.getColor=function(key){
			var hsl = getHslComponents(key);
			return getColorOutput(
				hsl.h,
				hsl.s,
				hsl.l
			);
		};
		$.fn.autumn.getGradientColors=function(key, lightnessSpread){
			if(lightnessSpread===undefined){
				lightnessSpread = 30;
			}
			
			var hsl = getHslComponents(key);
			
			return [
				getColorOutput(
					hsl.h,
					hsl.s,
					Math.min(100	,hsl.l+lightnessSpread/2)
				),
				getColorOutput(
					hsl.h,
					hsl.s,
					Math.max(0,hsl.l-lightnessSpread/2)
				)
			];
		};
		$.fn.autumn.getColorProfiles=function(){
			return colorProfiles;
		};



		
		//equivalent to java hashcode implementation
		var hashCode = function(key){
			var hash = 0, character, i;
			for (i = 0; i < key.length; i++) {
				character = key.charCodeAt(i);
				hash = ((hash << 5) - hash) + character;
				hash = hash & hash;
			}
			return hash;
		}
		
		var getColorOutput = function(h,s,l){
			var profile = colorProfiles[currentOptions.colorProfile];
		
			if(profile[0]==="hsl" || !huslAvailable){
				return 'hsl('+h+','+s+'%,'+l+'%)';	
			}else if(profile[0]==="husl"){
				return $.husl.toHex(h,s,l);
			}else if(profile[0]==="huslp"){
				return $.husl.p.toHex(h,s,l);
			}
		}
		
		var getHslComponents = function(key){	
			var random1,random2,random3;			
			
			if(typeof key === "string"){
				if(!isNaN(key)){
					key  = Number(key);
				}else{
					key = hashCode(key);
				}
			}
			
			
	
			if(currentOptions.generator === "halton"){
				if(key<0){
					key=key>>>0;
				}
				
				var res, f, i;
				var bases = [3,5,7];
				var results = [];
				
				for(var j=0;j<bases.length;j++){
					res=0;
					f=1/bases[j];
					i=key;
					while(i>0){
						res = res + f * (i % bases[j]);
						i = Math.floor(i / bases[j]);
						f = f/bases[j];
					}
					results.push(res);
				}
	
				random1 = results[0]*360;
				random2 = results[1]*100; 		
				random3 = results[2]*100;
			}else{
				//repeats exactly every 359*101*103 = 3,734,677
				
				//167:	~1/2
				//223:	~-1/3	(roughly golden ratio conjugate; 359*.618 = 221.86
				//127:	~1/3
				//97:	~1/4
				//83:	~1/5
				//53:	~1/6
				//29:	~1/12
				//17:	~1/24
				//11:	~1/36
			
				random1 = (key * currentOptions.primeWalkHueDistance)%359*(360/359);
				random2 = (key * 13)%101*(100/101);
				random3 = (key * 19)%103*(100/103);
			}
					
			//center hue
			if(random1>=180)random1-=360;
			
			var profile = colorProfiles[currentOptions.colorProfile];
				
			var h = ((random1%360)*currentOptions.hueScale+currentOptions.hueCenter)%360;
			
			
			var s = ((random2%100)/100)*(profile[2]-profile[1])+profile[1];
			
			var l = ((random3%100)/100)*(profile[4]-profile[3])+profile[3];
			
			if(h<0)h+=360;
			if(s<0)s+=100;
			if(l<0)l+=100;
			
			return {
				h: h,
				s: s,
				l: l
			}
		}
	}(jQuery));