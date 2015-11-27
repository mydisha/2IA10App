var regexps = {
    2  : /^([-+]?[01]*)(\.[01]*)?$/,
    8  : /^([-+]?[0-7]*)(\.[0-7]*)?$/,
    10 : /^([-+]?\d*)(\.\d*)?$/,
    16 : /^([-+]?[0-9a-f]*)(\.[0-9a-f]*)?$/i };

function numberOnInput(input) {
	var base = parseInt(input.name.substr(4));
	var s = input.value;
	// Allow 0x in front of hex numbers
	if (base == 16 && s.substr(0, 2) == '0x') {
		s = s.substr(2);
	}
	s = s.replace(/^ +| +$/g, '');

	var n;
	var matches = s.match(regexps[base]);
	if (!matches /*/^[-+]?\w*(\.\w*)?$/.test(s) */) {
	    n = NaN;
	} else if (!matches[2] || matches[2].length < 2) {
		n = parseInt(matches[1], base);
	} else {
		n = parseInt(matches[1], base);
		n += (n > 0 ? 1 : -1) * parseInt(matches[2].substr(1), base) / Math.pow(base, matches[2].length - 1);
	}

	var bases = [2, 8, 10, 16];
	for (var i = 0; i < bases.length; i++) {
		if (bases[i] != base) {
			var output;
			if (isNaN(n)) {
				output = '';
			} else if (16.25.toString(16) == '10.4') {

				output = n.toString(bases[i]);
			} else {
				output = (n > 0 ? Math.floor(n) : Math.ceil(n)).toString(bases[i]);
				if (n % 1) {
					output += '.' + Math.round((Math.abs(n) % 1) * Math.pow(bases[i], 8)).toString(bases[i]);
					output = output.replace(/0+$/, '');
				}
			}
			document.getElementById('base' + bases[i]).value = output.toUpperCase();
        }
	}
}
