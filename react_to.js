function react_to(obj, meth){
	var hop = function(has, obj, prop){ var does = obj.hasOwnProperty(prop); return has?does:!does; };
	var virgin = true, RIP = '__originals';
	if(hop(false, obj, RIP)) obj[RIP] = { };
	if(hop(false, obj[RIP], meth)) obj[RIP][meth] = obj[meth] || function(x){return x};
	else virgin = false;
	
	var react_with = function(reaction){
		if(!reaction){ obj[meth] = obj[RIP][meth]; virgin = true; return react_with; }
		var action = virgin? obj[RIP][meth]: obj[meth]; virgin = false;
		obj[meth] = function(_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_L,_M,_N,_O,_P_Q_R_S_T_U_V_W_X_Y_Z){
			var act = action(_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_L,_M,_N,_O,_P_Q_R_S_T_U_V_W_X_Y_Z);
			return reaction(obj, meth, act, arguments) || act;
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
