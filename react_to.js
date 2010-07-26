var When = function(subject, action){
	if(!subject.hasOwnProperty('__events')) subject['__events'] = {};
	with(original = subject[action], events = subject['__events']){
		if(!events.hasOwnProperty(action)){
			var self = events[action] = {
				'listeners':[],
				'remove': function(listener){
					if(i = self['listeners'].indexOf(listener)) self['listeners'].splice(i,1); },
				'remove_all': function(){ self['listeners'] = [] },
				'tell_all': function(args){
					if(self['listeners'].length){ 
						for(var l=0; l<self['listeners'].length; l++) self['listeners'][l](args); 
					}
				}
			};
			
			subject[action] = function(){
				var a = [].slice.call(arguments); events[action].tell_all(arguments);
				return original(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[9],a[10]);
			};
		}
		var $Self = function(listener, remove){
			if(remove){
				if(listener) events[action].remove(listener);
				else events[action].remove_all();
				return $Self;
			}
			if(listener) events[action]['listeners'].push(listener); // Add listener to before or after original
			else events[action].remove_all(); // Remove all listeners
			return $Self;
		}
		return $Self;
	}
}
exports.when = When;