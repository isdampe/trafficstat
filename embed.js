if ( typeof document.querySelectorAll !== "undefined" ) {
	var count = 1, base = "http://ts.evasivesoftware.com/proc?reqs=", sc;
	var els = document.querySelectorAll("link[rel=stylesheet], script, img");
	if ( typeof els !== "undefined" ) {
	  count = count + els.length;
	}
	base = base + count;
	sc = document.createElement("script");
	sc.src = base;
	document.body.appendChild(sc);
}