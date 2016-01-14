//Author: Kwek Jing Yang
//Email: k.jingyang@gmail.com

function filter(messages, rules){
	var result = '{'
	var messagesKeys = Object.keys(messages);
	for(var i=0; i< messagesKeys.length; i++){
		result+= '"' + messagesKeys [i] + '"' + ':[';
		message  = messages[messagesKeys[i]];
		for(var j=0; j<rules.length; j++){
			if(rules[j]["from"] != undefined && !match(message["from"],rules[j]["from"])){
				continue;
			}
			if(rules[j]["to"] != undefined && !match(message["to"],rules[j]["to"])){
				continue;
			}
			result +=  '"' + rules[j]["action"] + '"' + ',';
		}
		if(result.slice(-1)==','){
			result = result.slice(0,-1); 
		}
		result+= '],';
	}
	if(result.slice(-1) == ','){	//Corrected	Mistake
	result = result.slice(0,-1); }

	//Original:	if statement absent
	//result = result.slice(0,-1);	
	
	//Corrected:
	return JSON.parse(result);		
	
	//Original:
	//return result;
	
}

function match(str, pattern){
	pattern = escapeRegExp(pattern)
	pattern = pattern.replace(/\?/g, '.');
	pattern = pattern.replace(/\*/g, '.*');
	pattern = '^' + pattern + '$'
	rex = new RegExp(pattern);
	return rex.test(str);
}


function escapeRegExp(str) { return str.replace(/[\-\[\]\/\{\}\(\)\+\.\\\^\$\|]/g, "\\$&"); }	
	
module.exports = filter
