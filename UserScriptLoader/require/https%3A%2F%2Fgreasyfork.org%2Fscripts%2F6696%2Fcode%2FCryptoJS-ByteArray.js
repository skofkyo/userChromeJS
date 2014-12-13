(function (CryptoJS) {
	var C_lib = CryptoJS.lib;

	// Converts ByteArray to stadnard WordArray.
	// Example: CryptoJS.MD5(CryptoJS.lib.ByteArray ([ Bytes ])).toString(CryptoJS.enc.Base64);
	C_lib.ByteArray = function (arr) {
		var word = [];
		for (var i = 0; i < arr.length; i += 4) {
			word.push (arr[i + 0] << 24 | arr[i + 1] << 16 | arr[i + 2] << 8 | arr[i + 3] << 0);
		}

		return C_lib.WordArray.create (word, arr.length);
	};
})(CryptoJS);