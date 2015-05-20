var http = require("http");
var url = require('url');
var pageRequests = 0;
var requestsLastMin = 0;
var minStart = new Date().getTime() / 1000;

http.createServer(function(req, res){
	
	var buff, j, perSecond, cd, d, m;
	var queryData = url.parse(req.url, true);
	var path, q;
	
	path = queryData.pathname;
	q = queryData.query;
	
	
	if ( path === "/proc" ) {
		
		if ( q.hasOwnProperty("reqs") ) {
			if ( q.reqs > 250 ) {
				q.reqs = 250;
			}
			pageRequests = pageRequests + parseInt(q.reqs);
			requestsLastMin = requestsLastMin + parseInt(q.reqs);
		} else {
			pageRequests++;
			requestsLastMin++;	
		}
		
		res.end();

	} else if ( path === "/stat" ) {
		
		cd = Math.round(new Date().getTime() / 1000, 0);
		d = Math.round(cd - minStart, 0);
		m = Math.round(60 / d, 0);
		perSecond = Math.round(( requestsLastMin * m ) / 60, 0);
			
		j = {
			count: pageRequests,
			cps: perSecond
		};
		
		buff = JSON.stringify(j);
		
		res.writeHead(200,{
			'Content-Length': buff.length,
			'Content-Type': 'text/json'
		});
		res.write(buff);
		res.end();
		
	} else {
		res.writeHead(403);
		res.end();
	}
	
}).listen(8001);

setInterval(function(){
	minStart = new Date().getTime() / 1000;
	requestsLastMin = 0;
},60000);