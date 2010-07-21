function react_to(obj, meth){
	var hop = function(has, obj, prop){ var does = obj.hasOwnProperty(prop); return has?does:!does; };
	var virgin = true, RIP = '__originals';
	if(hop(false, obj, RIP)) obj[RIP] = { };
	if(hop(false, obj[RIP], meth)) obj[RIP][meth] = obj[meth] || function(x){return x};
	else virgin = false;
	
	var react_with = function(reaction){
		if(!reaction){ obj[meth] = obj[RIP][meth]; virgin = true; return react_with; }
		var action = virgin? obj[RIP][meth]: obj[meth]; virgin = false;
		obj[meth] = function(){
			var arg_to_arr = function(args){var arr = []; for(var arg in args) arr.push(args[arg]); return arr; };
			var a = arg_to_arr(arguments);
			var act = action(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10]);
			return reaction(obj, meth, act, a) || act;
		}; return react_with;
	}; return react_with;
}

function react_to_many(objects, methods){
	objects = (objects instanceof Array)?objects:[objects];
	methods = (methods instanceof Array)?methods:[methods];
	
	var react_with = function(reaction){
		for(var o = 0; o < objects.length; o++){ 
			for(var m = 0; m < methods.length; m++){ 
				react_to(objects[o], methods[m])(reaction);}}
		return react_with;
	};
	return react_with;
}
alert(1);