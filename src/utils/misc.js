String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

String.prototype.toTitleCase = function() {
    var target = this;
    return target.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
    }

String.prototype.replaceAllCaseInsensitive = function(search, replacement) {
    var target = this;
	var regEx = new RegExp(search, "ig");
	return target.replace(regEx, replacement);
};

function matchCase(text, pattern) {
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var c = text.charAt(i);
        var p = pattern.charCodeAt(i);

        if(p >= 65 && p < 65 + 26) {
            result += c.toUpperCase();
        } else {
            result += c.toLowerCase();
        }
    }

    return result;
}

String.prototype.highlightKeyword = function(substring) {
    var target = this;
	var searchTextRegExp = new RegExp(substring , "ig"); //  case insensitive regexp
	return target.replace(searchTextRegExp , '<span class="highlighted">$&</span>');
};

String.prototype.shortenToMaxLen = function(maxLen) {
    var target = this;
	if (target.length <= maxLen) {
		return target
	} else {
		return target.slice(0, maxLen-3) + "..."
	}
	
};