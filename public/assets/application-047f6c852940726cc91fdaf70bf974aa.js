/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote], button[data-confirm]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {


}).call(this);
/*
 AngularJS v1.2.23
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/

(function(Q,X,t){'use strict';function x(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.2.23/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function fb(b){if(null==b||Fa(b))return!1;
var a=b.length;return 1===b.nodeType&&a?!0:z(b)||H(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function r(b,a,c){var d;if(b)if(P(b))for(d in b)"prototype"==d||("length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d))||a.call(c,b[d],d);else if(H(b)||fb(b))for(d=0;d<b.length;d++)a.call(c,b[d],d);else if(b.forEach&&b.forEach!==r)b.forEach(a,c);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Zb(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function Tc(b,
a,c){for(var d=Zb(b),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function $b(b){return function(a,c){b(c,a)}}function gb(){for(var b=la.length,a;b;){b--;a=la[b].charCodeAt(0);if(57==a)return la[b]="A",la.join("");if(90==a)la[b]="0";else return la[b]=String.fromCharCode(a+1),la.join("")}la.unshift("0");return la.join("")}function ac(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function B(b){var a=b.$$hashKey;r(arguments,function(a){a!==b&&r(a,function(a,c){b[c]=a})});ac(b,a);return b}function Z(b){return parseInt(b,
10)}function bc(b,a){return B(new (B(function(){},{prototype:b})),a)}function y(){}function Ga(b){return b}function $(b){return function(){return b}}function D(b){return"undefined"===typeof b}function A(b){return"undefined"!==typeof b}function T(b){return null!=b&&"object"===typeof b}function z(b){return"string"===typeof b}function Ab(b){return"number"===typeof b}function sa(b){return"[object Date]"===ya.call(b)}function P(b){return"function"===typeof b}function hb(b){return"[object RegExp]"===ya.call(b)}
function Fa(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function Uc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Vc(b,a,c){var d=[];r(b,function(b,f,g){d.push(a.call(c,b,f,g))});return d}function Qa(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Ra(b,a){var c=Qa(b,a);0<=c&&b.splice(c,1);return a}function Ha(b,a,c,d){if(Fa(b)||b&&b.$evalAsync&&b.$watch)throw Sa("cpws");if(a){if(b===a)throw Sa("cpi");c=c||[];
d=d||[];if(T(b)){var e=Qa(c,b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(H(b))for(var f=a.length=0;f<b.length;f++)e=Ha(b[f],null,c,d),T(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);else{var g=a.$$hashKey;H(a)?a.length=0:r(a,function(b,c){delete a[c]});for(f in b)e=Ha(b[f],null,c,d),T(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e;ac(a,g)}}else if(a=b)H(b)?a=Ha(b,[],c,d):sa(b)?a=new Date(b.getTime()):hb(b)?(a=RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):T(b)&&(a=Ha(b,{},c,d));
return a}function ga(b,a){if(H(b)){a=a||[];for(var c=0;c<b.length;c++)a[c]=b[c]}else if(T(b))for(c in a=a||{},b)!ib.call(b,c)||"$"===c.charAt(0)&&"$"===c.charAt(1)||(a[c]=b[c]);return a||b}function za(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(H(b)){if(!H(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!za(b[d],a[d]))return!1;return!0}}else{if(sa(b))return sa(a)?isNaN(b.getTime())&&isNaN(a.getTime())||b.getTime()===
a.getTime():!1;if(hb(b)&&hb(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||Fa(b)||Fa(a)||H(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!P(b[d])){if(!za(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==t&&!P(a[d]))return!1;return!0}return!1}function Bb(b,a){var c=2<arguments.length?Aa.call(arguments,2):[];return!P(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(Aa.call(arguments,
0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Wc(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)?c=t:Fa(a)?c="$WINDOW":a&&X===a?c="$DOCUMENT":a&&(a.$evalAsync&&a.$watch)&&(c="$SCOPE");return c}function ta(b,a){return"undefined"===typeof b?t:JSON.stringify(b,Wc,a?"  ":null)}function cc(b){return z(b)?JSON.parse(b):b}function Ta(b){"function"===typeof b?b=!0:b&&0!==b.length?(b=N(""+b),b=!("f"==b||"0"==b||"false"==b||"no"==b||"n"==b||"[]"==b)):b=!1;
return b}function ha(b){b=u(b).clone();try{b.empty()}catch(a){}var c=u("<div>").append(b).html();try{return 3===b[0].nodeType?N(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+N(b)})}catch(d){return N(c)}}function dc(b){try{return decodeURIComponent(b)}catch(a){}}function ec(b){var a={},c,d;r((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,"%20").split("="),d=dc(c[0]),A(d)&&(b=A(c[1])?dc(c[1]):!0,ib.call(a,d)?H(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Cb(b){var a=
[];r(b,function(b,d){H(b)?r(b,function(b){a.push(Ba(d,!0)+(!0===b?"":"="+Ba(b,!0)))}):a.push(Ba(d,!0)+(!0===b?"":"="+Ba(b,!0)))});return a.length?a.join("&"):""}function jb(b){return Ba(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Ba(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function Xc(b,a){function c(a){a&&d.push(a)}var d=[b],e,f,g=["ng:app","ng-app","x-ng-app",
"data-ng-app"],k=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;r(g,function(a){g[a]=!0;c(X.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(r(b.querySelectorAll("."+a),c),r(b.querySelectorAll("."+a+"\\:"),c),r(b.querySelectorAll("["+a+"]"),c))});r(d,function(a){if(!e){var b=k.exec(" "+a.className+" ");b?(e=a,f=(b[2]||"").replace(/\s+/g,",")):r(a.attributes,function(b){!e&&g[b.name]&&(e=a,f=b.value)})}});e&&a(e,f?[f]:[])}function fc(b,a){var c=function(){b=u(b);if(b.injector()){var c=b[0]===X?
"document":ha(b);throw Sa("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");c=gc(a);c.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",function(a,b,c,d,e){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},d=/^NG_DEFER_BOOTSTRAP!/;if(Q&&!d.test(Q.name))return c();Q.name=Q.name.replace(d,"");Ua.resumeBootstrap=function(b){r(b,function(b){a.push(b)});c()}}function kb(b,a){a=
a||"_";return b.replace(Yc,function(b,d){return(d?a:"")+b.toLowerCase()})}function Db(b,a,c){if(!b)throw Sa("areq",a||"?",c||"required");return b}function Va(b,a,c){c&&H(b)&&(b=b[b.length-1]);Db(P(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ca(b,a){if("hasOwnProperty"===b)throw Sa("badname",a);}function hc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&P(b)?Bb(e,b):b}function Eb(b){var a=
b[0];b=b[b.length-1];if(a===b)return u(a);var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return u(c)}function Zc(b){var a=x("$injector"),c=x("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||x;return b.module||(b.module=function(){var b={};return function(e,f,g){if("hasOwnProperty"===e)throw c("badname","module");f&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e){return function(){c[e||"push"]([a,d,arguments]);return n}}if(!f)throw a("nomod",
e);var c=[],d=[],l=b("$injector","invoke"),n={_invokeQueue:c,_runBlocks:d,requires:f,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide","constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:l,run:function(a){d.push(a);return this}};g&&l(g);return n}())}}())}
function $c(b){B(b,{bootstrap:fc,copy:Ha,extend:B,equals:za,element:u,forEach:r,injector:gc,noop:y,bind:Bb,toJson:ta,fromJson:cc,identity:Ga,isUndefined:D,isDefined:A,isString:z,isFunction:P,isObject:T,isNumber:Ab,isElement:Uc,isArray:H,version:ad,isDate:sa,lowercase:N,uppercase:Ia,callbacks:{counter:0},$$minErr:x,$$csp:Wa});Xa=Zc(Q);try{Xa("ngLocale")}catch(a){Xa("ngLocale",[]).provider("$locale",bd)}Xa("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:cd});a.provider("$compile",
ic).directive({a:dd,input:jc,textarea:jc,form:ed,script:fd,select:gd,style:hd,option:id,ngBind:jd,ngBindHtml:kd,ngBindTemplate:ld,ngClass:md,ngClassEven:nd,ngClassOdd:od,ngCloak:pd,ngController:qd,ngForm:rd,ngHide:sd,ngIf:td,ngInclude:ud,ngInit:vd,ngNonBindable:wd,ngPluralize:xd,ngRepeat:yd,ngShow:zd,ngStyle:Ad,ngSwitch:Bd,ngSwitchWhen:Cd,ngSwitchDefault:Dd,ngOptions:Ed,ngTransclude:Fd,ngModel:Gd,ngList:Hd,ngChange:Id,required:kc,ngRequired:kc,ngValue:Jd}).directive({ngInclude:Kd}).directive(Fb).directive(lc);
a.provider({$anchorScroll:Ld,$animate:Md,$browser:Nd,$cacheFactory:Od,$controller:Pd,$document:Qd,$exceptionHandler:Rd,$filter:mc,$interpolate:Sd,$interval:Td,$http:Ud,$httpBackend:Vd,$location:Wd,$log:Xd,$parse:Yd,$rootScope:Zd,$q:$d,$sce:ae,$sceDelegate:be,$sniffer:ce,$templateCache:de,$timeout:ee,$window:fe,$$rAF:ge,$$asyncCallback:he})}])}function Ya(b){return b.replace(ie,function(a,b,d,e){return e?d.toUpperCase():d}).replace(je,"Moz$1")}function Gb(b,a,c,d){function e(b){var e=c&&b?[this.filter(b)]:
[this],m=a,h,l,n,p,q,s;if(!d||null!=b)for(;e.length;)for(h=e.shift(),l=0,n=h.length;l<n;l++)for(p=u(h[l]),m?p.triggerHandler("$destroy"):m=!m,q=0,p=(s=p.children()).length;q<p;q++)e.push(Da(s[q]));return f.apply(this,arguments)}var f=Da.fn[b],f=f.$original||f;e.$original=f;Da.fn[b]=e}function S(b){if(b instanceof S)return b;z(b)&&(b=aa(b));if(!(this instanceof S)){if(z(b)&&"<"!=b.charAt(0))throw Hb("nosel");return new S(b)}if(z(b)){var a=b;b=X;var c;if(c=ke.exec(a))b=[b.createElement(c[1])];else{var d=
b,e;b=d.createDocumentFragment();c=[];if(Ib.test(a)){d=b.appendChild(d.createElement("div"));e=(le.exec(a)||["",""])[1].toLowerCase();e=ba[e]||ba._default;d.innerHTML="<div>&#160;</div>"+e[1]+a.replace(me,"<$1></$2>")+e[2];d.removeChild(d.firstChild);for(a=e[0];a--;)d=d.lastChild;a=0;for(e=d.childNodes.length;a<e;++a)c.push(d.childNodes[a]);d=b.firstChild;d.textContent=""}else c.push(d.createTextNode(a));b.textContent="";b.innerHTML="";b=c}Jb(this,b);u(X.createDocumentFragment()).append(this)}else Jb(this,
b)}function Kb(b){return b.cloneNode(!0)}function Ja(b){Lb(b);var a=0;for(b=b.childNodes||[];a<b.length;a++)Ja(b[a])}function nc(b,a,c,d){if(A(d))throw Hb("offargs");var e=ma(b,"events");ma(b,"handle")&&(D(a)?r(e,function(a,c){Za(b,c,a);delete e[c]}):r(a.split(" "),function(a){D(c)?(Za(b,a,e[a]),delete e[a]):Ra(e[a]||[],c)}))}function Lb(b,a){var c=b.ng339,d=$a[c];d&&(a?delete $a[c].data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),nc(b)),delete $a[c],b.ng339=t))}function ma(b,a,c){var d=
b.ng339,d=$a[d||-1];if(A(c))d||(b.ng339=d=++ne,d=$a[d]={}),d[a]=c;else return d&&d[a]}function Mb(b,a,c){var d=ma(b,"data"),e=A(c),f=!e&&A(a),g=f&&!T(a);d||g||ma(b,"data",d={});if(e)d[a]=c;else if(f){if(g)return d&&d[a];B(d,a)}else return d}function Nb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function lb(b,a){a&&b.setAttribute&&r(a.split(" "),function(a){b.setAttribute("class",aa((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g,
" ").replace(" "+aa(a)+" "," ")))})}function mb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");r(a.split(" "),function(a){a=aa(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",aa(c))}}function Jb(b,a){if(a){a=a.nodeName||!A(a.length)||Fa(a)?[a]:a;for(var c=0;c<a.length;c++)b.push(a[c])}}function oc(b,a){return nb(b,"$"+(a||"ngController")+"Controller")}function nb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=H(a)?a:[a];b;){for(var d=
0,e=a.length;d<e;d++)if((c=u.data(b,a[d]))!==t)return c;b=b.parentNode||11===b.nodeType&&b.host}}function pc(b){for(var a=0,c=b.childNodes;a<c.length;a++)Ja(c[a]);for(;b.firstChild;)b.removeChild(b.firstChild)}function qc(b,a){var c=ob[a.toLowerCase()];return c&&rc[b.nodeName]&&c}function oe(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||X);if(D(c.defaultPrevented)){var f=
c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;f.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===c.returnValue};var g=ga(a[e||c.type]||[]);r(g,function(a){a.call(b,c)});8>=R?(c.preventDefault=null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Ka(b,a){var c=typeof b,d;"function"==c||"object"==c&&null!==b?"function"==typeof(d=
b.$$hashKey)?d=b.$$hashKey():d===t&&(d=b.$$hashKey=(a||gb)()):d=b;return c+":"+d}function ab(b,a){if(a){var c=0;this.nextUid=function(){return++c}}r(b,this.put,this)}function sc(b){var a,c;"function"===typeof b?(a=b.$inject)||(a=[],b.length&&(c=b.toString().replace(pe,""),c=c.match(qe),r(c[1].split(re),function(b){b.replace(se,function(b,c,d){a.push(d)})})),b.$inject=a):H(b)?(c=b.length-1,Va(b[c],"fn"),a=b.slice(0,c)):Va(b,"fn",!0);return a}function gc(b){function a(a){return function(b,c){if(T(b))r(b,
$b(a));else return a(b,c)}}function c(a,b){Ca(a,"service");if(P(b)||H(b))b=n.instantiate(b);if(!b.$get)throw bb("pget",a);return l[a+k]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[],c,d,f,k;r(a,function(a){if(!h.get(a)){h.put(a,!0);try{if(z(a))for(c=Xa(a),b=b.concat(e(c.requires)).concat(c._runBlocks),d=c._invokeQueue,f=0,k=d.length;f<k;f++){var g=d[f],m=n.get(g[0]);m[g[1]].apply(m,g[2])}else P(a)?b.push(n.invoke(a)):H(a)?b.push(n.invoke(a)):Va(a,"module")}catch(l){throw H(a)&&(a=
a[a.length-1]),l.message&&(l.stack&&-1==l.stack.indexOf(l.message))&&(l=l.message+"\n"+l.stack),bb("modulerr",a,l.stack||l.message||l);}}});return b}function f(a,b){function c(d){if(a.hasOwnProperty(d)){if(a[d]===g)throw bb("cdep",d+" <- "+m.join(" <- "));return a[d]}try{return m.unshift(d),a[d]=g,a[d]=b(d)}catch(e){throw a[d]===g&&delete a[d],e;}finally{m.shift()}}function d(a,b,e){var f=[],k=sc(a),g,m,h;m=0;for(g=k.length;m<g;m++){h=k[m];if("string"!==typeof h)throw bb("itkn",h);f.push(e&&e.hasOwnProperty(h)?
e[h]:c(h))}H(a)&&(a=a[g]);return a.apply(b,f)}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(H(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return T(e)||P(e)?e:c},get:c,annotate:sc,has:function(b){return l.hasOwnProperty(b+k)||a.hasOwnProperty(b)}}}var g={},k="Provider",m=[],h=new ab([],!0),l={$provide:{provider:a(c),factory:a(d),service:a(function(a,b){return d(a,["$injector",function(a){return a.instantiate(b)}])}),value:a(function(a,b){return d(a,$(b))}),constant:a(function(a,
b){Ca(a,"constant");l[a]=b;p[a]=b}),decorator:function(a,b){var c=n.get(a+k),d=c.$get;c.$get=function(){var a=q.invoke(d,c);return q.invoke(b,null,{$delegate:a})}}}},n=l.$injector=f(l,function(){throw bb("unpr",m.join(" <- "));}),p={},q=p.$injector=f(p,function(a){a=n.get(a+k);return q.invoke(a.$get,a)});r(e(b),function(a){q.invoke(a||y)});return q}function Ld(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;
r(a,function(a){b||"a"!==N(a.nodeName)||(b=a)});return b}function f(){var b=c.hash(),d;b?(d=g.getElementById(b))?d.scrollIntoView():(d=e(g.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var g=a.document;b&&d.$watch(function(){return c.hash()},function(){d.$evalAsync(f)});return f}]}function he(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function te(b,a,c,d){function e(a){try{a.apply(null,
Aa.call(arguments,1))}finally{if(s--,0===s)for(;L.length;)try{L.pop()()}catch(b){c.error(b)}}}function f(a,b){(function ca(){r(v,function(a){a()});C=b(ca,a)})()}function g(){w=null;O!=k.url()&&(O=k.url(),r(da,function(a){a(k.url())}))}var k=this,m=a[0],h=b.location,l=b.history,n=b.setTimeout,p=b.clearTimeout,q={};k.isMock=!1;var s=0,L=[];k.$$completeOutstandingRequest=e;k.$$incOutstandingRequestCount=function(){s++};k.notifyWhenNoOutstandingRequests=function(a){r(v,function(a){a()});0===s?a():L.push(a)};
var v=[],C;k.addPollFn=function(a){D(C)&&f(100,n);v.push(a);return a};var O=h.href,I=a.find("base"),w=null;k.url=function(a,c){h!==b.location&&(h=b.location);l!==b.history&&(l=b.history);if(a){if(O!=a)return O=a,d.history?c?l.replaceState(null,"",a):(l.pushState(null,"",a),I.attr("href",I.attr("href"))):(w=a,c?h.replace(a):h.href=a),k}else return w||h.href.replace(/%27/g,"'")};var da=[],K=!1;k.onUrlChange=function(a){if(!K){if(d.history)u(b).on("popstate",g);if(d.hashchange)u(b).on("hashchange",g);
else k.addPollFn(g);K=!0}da.push(a);return a};k.baseHref=function(){var a=I.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var W={},ea="",J=k.baseHref();k.cookies=function(a,b){var d,e,f,k;if(a)b===t?m.cookie=escape(a)+"=;path="+J+";expires=Thu, 01 Jan 1970 00:00:00 GMT":z(b)&&(d=(m.cookie=escape(a)+"="+escape(b)+";path="+J).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(m.cookie!==ea)for(ea=m.cookie,
d=ea.split("; "),W={},f=0;f<d.length;f++)e=d[f],k=e.indexOf("="),0<k&&(a=unescape(e.substring(0,k)),W[a]===t&&(W[a]=unescape(e.substring(k+1))));return W}};k.defer=function(a,b){var c;s++;c=n(function(){delete q[c];e(a)},b||0);q[c]=!0;return c};k.defer.cancel=function(a){return q[a]?(delete q[a],p(a),e(y),!0):!1}}function Nd(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new te(b,d,a,c)}]}function Od(){this.$get=function(){function b(b,d){function e(a){a!=n&&(p?p==a&&
(p=a.n):p=a,f(a.n,a.p),f(a,n),n=a,n.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw x("$cacheFactory")("iid",b);var g=0,k=B({},d,{id:b}),m={},h=d&&d.capacity||Number.MAX_VALUE,l={},n=null,p=null;return a[b]={put:function(a,b){if(h<Number.MAX_VALUE){var c=l[a]||(l[a]={key:a});e(c)}if(!D(b))return a in m||g++,m[a]=b,g>h&&this.remove(p.key),b},get:function(a){if(h<Number.MAX_VALUE){var b=l[a];if(!b)return;e(b)}return m[a]},remove:function(a){if(h<Number.MAX_VALUE){var b=l[a];if(!b)return;
b==n&&(n=b.p);b==p&&(p=b.n);f(b.n,b.p);delete l[a]}delete m[a];g--},removeAll:function(){m={};g=0;l={};n=p=null},destroy:function(){l=k=m=null;delete a[b]},info:function(){return B({},k,{size:g})}}}var a={};b.info=function(){var b={};r(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function de(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function ic(b,a){var c={},d="Directive",e=/^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,f=/(([\d\w_\-]+)(?:\:([^;]+))?;?)/,
g=/^(on[a-z]+|formaction)$/;this.directive=function m(a,e){Ca(a,"directive");z(a)?(Db(e,"directiveFactory"),c.hasOwnProperty(a)||(c[a]=[],b.factory(a+d,["$injector","$exceptionHandler",function(b,d){var e=[];r(c[a],function(c,f){try{var g=b.invoke(c);P(g)?g={compile:$(g)}:!g.compile&&g.link&&(g.compile=$(g.link));g.priority=g.priority||0;g.index=f;g.name=g.name||a;g.require=g.require||g.controller&&g.name;g.restrict=g.restrict||"A";e.push(g)}catch(m){d(m)}});return e}])),c[a].push(e)):r(a,$b(m));
return this};this.aHrefSanitizationWhitelist=function(b){return A(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return A(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,l,n,p,q,s,L,v,C,O,I){function w(a,b,c,d,e){a instanceof
u||(a=u(a));r(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=u(b).wrap("<span></span>").parent()[0])});var f=K(a,b,a,c,d,e);da(a,"ng-scope");return function(b,c,d,e){Db(b,"scope");var g=c?La.clone.call(a):a;r(d,function(a,b){g.data("$"+b+"Controller",a)});d=0;for(var m=g.length;d<m;d++){var h=g[d].nodeType;1!==h&&9!==h||g.eq(d).data("$scope",b)}c&&c(g,b);f&&f(b,g,g,e);return g}}function da(a,b){try{a.addClass(b)}catch(c){}}function K(a,b,c,d,e,f){function g(a,c,d,e){var f,h,l,q,n,
p,s;f=c.length;var M=Array(f);for(q=0;q<f;q++)M[q]=c[q];p=q=0;for(n=m.length;q<n;p++)h=M[p],c=m[q++],f=m[q++],c?(c.scope?(l=a.$new(),u.data(h,"$scope",l)):l=a,s=c.transcludeOnThisElement?W(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?W(a,b):null,c(f,l,h,d,s)):f&&f(a,h.childNodes,t,e)}for(var m=[],h,l,q,n,p=0;p<a.length;p++)h=new Ob,l=ea(a[p],[],h,0===p?d:t,e),(f=l.length?F(l,a[p],h,b,c,null,[],[],f):null)&&f.scope&&da(h.$$element,"ng-scope"),h=f&&f.terminal||!(q=a[p].childNodes)||!q.length?
null:K(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b),m.push(f,h),n=n||f||h,f=null;return n?g:null}function W(a,b,c){return function(d,e,f){var g=!1;d||(d=a.$new(),g=d.$$transcluded=!0);e=b(d,e,f,c);if(g)e.on("$destroy",function(){d.$destroy()});return e}}function ea(a,b,c,d,g){var h=c.$attr,m;switch(a.nodeType){case 1:ca(b,na(Ma(a).toLowerCase()),"E",d,g);for(var l,q,n,p=a.attributes,s=0,L=p&&p.length;s<L;s++){var C=!1,O=!1;l=p[s];if(!R||8<=R||l.specified){m=l.name;q=
aa(l.value);l=na(m);if(n=V.test(l))m=kb(l.substr(6),"-");var v=l.replace(/(Start|End)$/,"");l===v+"Start"&&(C=m,O=m.substr(0,m.length-5)+"end",m=m.substr(0,m.length-6));l=na(m.toLowerCase());h[l]=m;if(n||!c.hasOwnProperty(l))c[l]=q,qc(a,l)&&(c[l]=!0);Q(a,b,q,l);ca(b,l,"A",d,g,C,O)}}a=a.className;if(z(a)&&""!==a)for(;m=f.exec(a);)l=na(m[2]),ca(b,l,"C",d,g)&&(c[l]=aa(m[3])),a=a.substr(m.index+m[0].length);break;case 3:x(b,a.nodeValue);break;case 8:try{if(m=e.exec(a.nodeValue))l=na(m[1]),ca(b,l,"M",
d,g)&&(c[l]=aa(m[2]))}catch(w){}}b.sort(D);return b}function J(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ia("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return u(d)}function E(a,b,c){return function(d,e,f,g,m){e=J(e[0],b,c);return a(d,e,f,g,m)}}function F(a,c,d,e,f,g,m,n,p){function L(a,b,c,d){if(a){c&&(a=E(a,c,d));a.require=G.require;a.directiveName=oa;if(K===G||G.$$isolateScope)a=
tc(a,{isolateScope:!0});m.push(a)}if(b){c&&(b=E(b,c,d));b.require=G.require;b.directiveName=oa;if(K===G||G.$$isolateScope)b=tc(b,{isolateScope:!0});n.push(b)}}function C(a,b,c,d){var e,f="data",g=!1;if(z(b)){for(;"^"==(e=b.charAt(0))||"?"==e;)b=b.substr(1),"^"==e&&(f="inheritedData"),g=g||"?"==e;e=null;d&&"data"===f&&(e=d[b]);e=e||c[f]("$"+b+"Controller");if(!e&&!g)throw ia("ctreq",b,a);}else H(b)&&(e=[],r(b,function(b){e.push(C(a,b,c,d))}));return e}function O(a,e,f,g,p){function L(a,b){var c;2>
arguments.length&&(b=a,a=t);Ea&&(c=ea);return p(a,b,c)}var v,M,w,I,E,J,ea={},qb;v=c===f?d:ga(d,new Ob(u(f),d.$attr));M=v.$$element;if(K){var Na=/^\s*([@=&])(\??)\s*(\w*)\s*$/;J=e.$new(!0);!F||F!==K&&F!==K.$$originalDirective?M.data("$isolateScopeNoTemplate",J):M.data("$isolateScope",J);da(M,"ng-isolate-scope");r(K.scope,function(a,c){var d=a.match(Na)||[],f=d[3]||c,g="?"==d[2],d=d[1],m,l,n,p;J.$$isolateBindings[c]=d+f;switch(d){case "@":v.$observe(f,function(a){J[c]=a});v.$$observers[f].$$scope=e;
v[f]&&(J[c]=b(v[f])(e));break;case "=":if(g&&!v[f])break;l=q(v[f]);p=l.literal?za:function(a,b){return a===b||a!==a&&b!==b};n=l.assign||function(){m=J[c]=l(e);throw ia("nonassign",v[f],K.name);};m=J[c]=l(e);J.$watch(function(){var a=l(e);p(a,J[c])||(p(a,m)?n(e,a=J[c]):J[c]=a);return m=a},null,l.literal);break;case "&":l=q(v[f]);J[c]=function(a){return l(e,a)};break;default:throw ia("iscp",K.name,c,a);}})}qb=p&&L;W&&r(W,function(a){var b={$scope:a===K||a.$$isolateScope?J:e,$element:M,$attrs:v,$transclude:qb},
c;E=a.controller;"@"==E&&(E=v[a.name]);c=s(E,b);ea[a.name]=c;Ea||M.data("$"+a.name+"Controller",c);a.controllerAs&&(b.$scope[a.controllerAs]=c)});g=0;for(w=m.length;g<w;g++)try{I=m[g],I(I.isolateScope?J:e,M,v,I.require&&C(I.directiveName,I.require,M,ea),qb)}catch(ca){l(ca,ha(M))}g=e;K&&(K.template||null===K.templateUrl)&&(g=J);a&&a(g,f.childNodes,t,p);for(g=n.length-1;0<=g;g--)try{I=n[g],I(I.isolateScope?J:e,M,v,I.require&&C(I.directiveName,I.require,M,ea),qb)}catch(pb){l(pb,ha(M))}}p=p||{};for(var v=
-Number.MAX_VALUE,I,W=p.controllerDirectives,K=p.newIsolateScopeDirective,F=p.templateDirective,ca=p.nonTlbTranscludeDirective,D=!1,B=!1,Ea=p.hasElementTranscludeDirective,x=d.$$element=u(c),G,oa,U,S=e,R,Q=0,pa=a.length;Q<pa;Q++){G=a[Q];var V=G.$$start,Y=G.$$end;V&&(x=J(c,V,Y));U=t;if(v>G.priority)break;if(U=G.scope)I=I||G,G.templateUrl||(N("new/isolated scope",K,G,x),T(U)&&(K=G));oa=G.name;!G.templateUrl&&G.controller&&(U=G.controller,W=W||{},N("'"+oa+"' controller",W[oa],G,x),W[oa]=G);if(U=G.transclude)D=
!0,G.$$tlb||(N("transclusion",ca,G,x),ca=G),"element"==U?(Ea=!0,v=G.priority,U=x,x=d.$$element=u(X.createComment(" "+oa+": "+d[oa]+" ")),c=x[0],Na(f,Aa.call(U,0),c),S=w(U,e,v,g&&g.name,{nonTlbTranscludeDirective:ca})):(U=u(Kb(c)).contents(),x.empty(),S=w(U,e));if(G.template)if(B=!0,N("template",F,G,x),F=G,U=P(G.template)?G.template(x,d):G.template,U=Z(U),G.replace){g=G;U=Ib.test(U)?u(aa(U)):[];c=U[0];if(1!=U.length||1!==c.nodeType)throw ia("tplrt",oa,"");Na(f,x,c);pa={$attr:{}};U=ea(c,[],pa);var $=
a.splice(Q+1,a.length-(Q+1));K&&pb(U);a=a.concat(U).concat($);A(d,pa);pa=a.length}else x.html(U);if(G.templateUrl)B=!0,N("template",F,G,x),F=G,G.replace&&(g=G),O=y(a.splice(Q,a.length-Q),x,d,f,D&&S,m,n,{controllerDirectives:W,newIsolateScopeDirective:K,templateDirective:F,nonTlbTranscludeDirective:ca}),pa=a.length;else if(G.compile)try{R=G.compile(x,d,S),P(R)?L(null,R,V,Y):R&&L(R.pre,R.post,V,Y)}catch(ba){l(ba,ha(x))}G.terminal&&(O.terminal=!0,v=Math.max(v,G.priority))}O.scope=I&&!0===I.scope;O.transcludeOnThisElement=
D;O.templateOnThisElement=B;O.transclude=S;p.hasElementTranscludeDirective=Ea;return O}function pb(a){for(var b=0,c=a.length;b<c;b++)a[b]=bc(a[b],{$$isolateScope:!0})}function ca(b,e,f,g,h,q,n){if(e===h)return null;h=null;if(c.hasOwnProperty(e)){var p;e=a.get(e+d);for(var s=0,v=e.length;s<v;s++)try{p=e[s],(g===t||g>p.priority)&&-1!=p.restrict.indexOf(f)&&(q&&(p=bc(p,{$$start:q,$$end:n})),b.push(p),h=p)}catch(L){l(L)}}return h}function A(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;r(a,function(d,e){"$"!=
e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,f){"class"==f?(da(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function y(a,b,c,d,e,f,g,m){var h=[],l,q,s=b[0],v=a.shift(),L=B({},v,{templateUrl:null,transclude:null,replace:null,$$originalDirective:v}),O=P(v.templateUrl)?v.templateUrl(b,c):v.templateUrl;
b.empty();n.get(C.getTrustedResourceUrl(O),{cache:p}).success(function(n){var p,C;n=Z(n);if(v.replace){n=Ib.test(n)?u(aa(n)):[];p=n[0];if(1!=n.length||1!==p.nodeType)throw ia("tplrt",v.name,O);n={$attr:{}};Na(d,b,p);var w=ea(p,[],n);T(v.scope)&&pb(w);a=w.concat(a);A(c,n)}else p=s,b.html(n);a.unshift(L);l=F(a,p,c,e,b,v,f,g,m);r(d,function(a,c){a==p&&(d[c]=b[0])});for(q=K(b[0].childNodes,e);h.length;){n=h.shift();C=h.shift();var I=h.shift(),E=h.shift(),w=b[0];if(C!==s){var J=C.className;m.hasElementTranscludeDirective&&
v.replace||(w=Kb(p));Na(I,u(C),w);da(u(w),J)}C=l.transcludeOnThisElement?W(n,l.transclude,E):E;l(q,n,w,d,C)}h=null}).error(function(a,b,c,d){throw ia("tpload",d.url);});return function(a,b,c,d,e){a=e;h?(h.push(b),h.push(c),h.push(d),h.push(a)):(l.transcludeOnThisElement&&(a=W(b,l.transclude,e)),l(q,b,c,d,a))}}function D(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function N(a,b,c,d){if(b)throw ia("multidir",b.name,c.name,a,ha(d));}function x(a,
c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){var b=a.parent().length;b&&da(a.parent(),"ng-binding");return function(a,c){var e=c.parent(),f=e.data("$binding")||[];f.push(d);e.data("$binding",f);b||da(e,"ng-binding");a.$watch(d,function(a){c[0].nodeValue=a})}}})}function S(a,b){if("srcdoc"==b)return C.HTML;var c=Ma(a);if("xlinkHref"==b||"FORM"==c&&"action"==b||"IMG"!=c&&("src"==b||"ngSrc"==b))return C.RESOURCE_URL}function Q(a,c,d,e){var f=b(d,!0);if(f){if("multiple"===e&&"SELECT"===
Ma(a))throw ia("selmulti",ha(a));c.push({priority:100,compile:function(){return{pre:function(c,d,m){d=m.$$observers||(m.$$observers={});if(g.test(e))throw ia("nodomevents");if(f=b(m[e],!0,S(a,e)))m[e]=f(c),(d[e]||(d[e]=[])).$$inter=!0,(m.$$observers&&m.$$observers[e].$$scope||c).$watch(f,function(a,b){"class"===e&&a!=b?m.$updateClass(a,b):m.$set(e,a)})}}}})}}function Na(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,m;if(a)for(g=0,m=a.length;g<m;g++)if(a[g]==d){a[g++]=c;m=g+e-1;for(var h=a.length;g<
h;g++,m++)m<h?a[g]=a[m]:delete a[g];a.length-=e-1;break}f&&f.replaceChild(c,d);a=X.createDocumentFragment();a.appendChild(d);c[u.expando]=d[u.expando];d=1;for(e=b.length;d<e;d++)f=b[d],u(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function tc(a,b){return B(function(){return a.apply(null,arguments)},a,b)}var Ob=function(a,b){this.$$element=a;this.$attr=b||{}};Ob.prototype={$normalize:na,$addClass:function(a){a&&0<a.length&&O.addClass(this.$$element,a)},$removeClass:function(a){a&&0<
a.length&&O.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=uc(a,b),d=uc(b,a);0===c.length?O.removeClass(this.$$element,d):0===d.length?O.addClass(this.$$element,c):O.setClass(this.$$element,c,d)},$set:function(a,b,c,d){var e=qc(this.$$element[0],a);e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=d:(d=this.$attr[a])||(this.$attr[a]=d=kb(a,"-"));e=Ma(this.$$element);if("A"===e&&"href"===a||"IMG"===e&&"src"===a)this[a]=b=I(b,"src"===a);!1!==c&&(null===b||b===t?this.$$element.removeAttr(d):
this.$$element.attr(d,b));(c=this.$$observers)&&r(c[a],function(a){try{a(b)}catch(c){l(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);L.$evalAsync(function(){e.$$inter||b(c[a])});return b}};var pa=b.startSymbol(),Ea=b.endSymbol(),Z="{{"==pa||"}}"==Ea?Ga:function(a){return a.replace(/\{\{/g,pa).replace(/}}/g,Ea)},V=/^ngAttr[A-Z]/;return w}]}function na(b){return Ya(b.replace(ue,""))}function uc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),
f=0;a:for(;f<d.length;f++){for(var g=d[f],k=0;k<e.length;k++)if(g==e[k])continue a;c+=(0<c.length?" ":"")+g}return c}function Pd(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,d){Ca(a,"controller");T(a)?B(b,a):b[a]=d};this.$get=["$injector","$window",function(c,d){return function(e,f){var g,k,m;z(e)&&(g=e.match(a),k=g[1],m=g[3],e=b.hasOwnProperty(k)?b[k]:hc(f.$scope,k,!0)||hc(d,k,!0),Va(e,k,!0));g=c.instantiate(e,f);if(m){if(!f||"object"!==typeof f.$scope)throw x("$controller")("noscp",
k||e.name,m);f.$scope[m]=g}return g}}]}function Qd(){this.$get=["$window",function(b){return u(b.document)}]}function Rd(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function vc(b){var a={},c,d,e;if(!b)return a;r(b.split("\n"),function(b){e=b.indexOf(":");c=N(aa(b.substr(0,e)));d=aa(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function wc(b){var a=T(b)?b:t;return function(c){a||(a=vc(b));return c?a[N(c)]||null:a}}function xc(b,a,c){if(P(c))return c(b,
a);r(c,function(c){b=c(b,a)});return b}function Ud(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d){z(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=cc(d)));return d}],transformRequest:[function(a){return T(a)&&"[object File]"!==ya.call(a)&&"[object Blob]"!==ya.call(a)?ta(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ga(d),put:ga(d),patch:ga(d)},xsrfCookieName:"XSRF-TOKEN",
xsrfHeaderName:"X-XSRF-TOKEN"},f=this.interceptors=[],g=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,n,p){function q(a){function b(a){var d=B({},a,{data:xc(a.data,a.headers,c.transformResponse)});return 200<=a.status&&300>a.status?d:n.reject(d)}var c={method:"get",transformRequest:e.transformRequest,transformResponse:e.transformResponse},d=function(a){var b=e.headers,c=B({},a.headers),d,f,b=B({},b.common,b[N(a.method)]);
a:for(d in b){a=N(d);for(f in c)if(N(f)===a)continue a;c[d]=b[d]}(function(a){var b;r(a,function(c,d){P(c)&&(b=c(),null!=b?a[d]=b:delete a[d])})})(c);return c}(a);B(c,a);c.headers=d;c.method=Ia(c.method);var f=[function(a){d=a.headers;var c=xc(a.data,wc(d),a.transformRequest);D(c)&&r(d,function(a,b){"content-type"===N(b)&&delete d[b]});D(a.withCredentials)&&!D(e.withCredentials)&&(a.withCredentials=e.withCredentials);return s(a,c,d).then(b,b)},t],g=n.when(c);for(r(C,function(a){(a.request||a.requestError)&&
f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var m=f.shift(),g=g.then(a,m)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,c)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,c)});return g};return g}function s(c,f,g){function h(a,b,c,e){E&&(200<=a&&300>a?E.put(u,[a,b,vc(c),e]):E.remove(u));p(b,a,c,e);d.$$phase||d.$apply()}function p(a,b,d,e){b=Math.max(b,0);(200<=
b&&300>b?C.resolve:C.reject)({data:a,status:b,headers:wc(d),config:c,statusText:e})}function s(){var a=Qa(q.pendingRequests,c);-1!==a&&q.pendingRequests.splice(a,1)}var C=n.defer(),r=C.promise,E,F,u=L(c.url,c.params);q.pendingRequests.push(c);r.then(s,s);!c.cache&&!e.cache||(!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method)||(E=T(c.cache)?c.cache:T(e.cache)?e.cache:v);if(E)if(F=E.get(u),A(F)){if(F&&P(F.then))return F.then(s,s),F;H(F)?p(F[1],F[0],ga(F[2]),F[3]):p(F,200,{},"OK")}else E.put(u,r);D(F)&&
((F=Pb(c.url)?b.cookies()[c.xsrfCookieName||e.xsrfCookieName]:t)&&(g[c.xsrfHeaderName||e.xsrfHeaderName]=F),a(c.method,u,f,h,g,c.timeout,c.withCredentials,c.responseType));return r}function L(a,b){if(!b)return a;var c=[];Tc(b,function(a,b){null===a||D(a)||(H(a)||(a=[a]),r(a,function(a){T(a)&&(sa(a)?a=a.toISOString():T(a)&&(a=ta(a)));c.push(Ba(b)+"="+Ba(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var v=c("$http"),C=[];r(f,function(a){C.unshift(z(a)?p.get(a):p.invoke(a))});
r(g,function(a,b){var c=z(a)?p.get(a):p.invoke(a);C.splice(b,0,{response:function(a){return c(n.when(a))},responseError:function(a){return c(n.reject(a))}})});q.pendingRequests=[];(function(a){r(arguments,function(a){q[a]=function(b,c){return q(B(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){q[a]=function(b,c,d){return q(B(d||{},{method:a,url:b,data:c}))}})})("post","put");q.defaults=e;return q}]}function ve(b){if(8>=R&&(!b.match(/^(get|post|head|put|delete|options)$/i)||
!Q.XMLHttpRequest))return new Q.ActiveXObject("Microsoft.XMLHTTP");if(Q.XMLHttpRequest)return new Q.XMLHttpRequest;throw x("$httpBackend")("noxhr");}function Vd(){this.$get=["$browser","$window","$document",function(b,a,c){return we(b,ve,b.defer,a.angular.callbacks,c[0])}]}function we(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),g=null;f.type="text/javascript";f.src=a;f.async=!0;g=function(a){Za(f,"load",g);Za(f,"error",g);e.body.removeChild(f);f=null;var k=-1,s="unknown";a&&("load"!==
a.type||d[b].called||(a={type:"error"}),s=a.type,k="error"===a.type?404:200);c&&c(k,s)};rb(f,"load",g);rb(f,"error",g);8>=R&&(f.onreadystatechange=function(){z(f.readyState)&&/loaded|complete/.test(f.readyState)&&(f.onreadystatechange=null,g({type:"load"}))});e.body.appendChild(f);return g}var g=-1;return function(e,m,h,l,n,p,q,s){function L(){C=g;I&&I();w&&w.abort()}function v(a,d,e,f,g){K&&c.cancel(K);I=w=null;0===d&&(d=e?200:"file"==ua(m).protocol?404:0);a(1223===d?204:d,e,f,g||"");b.$$completeOutstandingRequest(y)}
var C;b.$$incOutstandingRequestCount();m=m||b.url();if("jsonp"==N(e)){var O="_"+(d.counter++).toString(36);d[O]=function(a){d[O].data=a;d[O].called=!0};var I=f(m.replace("JSON_CALLBACK","angular.callbacks."+O),O,function(a,b){v(l,a,d[O].data,"",b);d[O]=y})}else{var w=a(e);w.open(e,m,!0);r(n,function(a,b){A(a)&&w.setRequestHeader(b,a)});w.onreadystatechange=function(){if(w&&4==w.readyState){var a=null,b=null,c="";C!==g&&(a=w.getAllResponseHeaders(),b="response"in w?w.response:w.responseText);C===g&&
10>R||(c=w.statusText);v(l,C||w.status,b,a,c)}};q&&(w.withCredentials=!0);if(s)try{w.responseType=s}catch(da){if("json"!==s)throw da;}w.send(h||null)}if(0<p)var K=c(L,p);else p&&P(p.then)&&p.then(L)}}function Sd(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(f,h,l){for(var n,p,q=0,s=[],L=f.length,v=!1,C=[];q<L;)-1!=(n=f.indexOf(b,q))&&-1!=(p=f.indexOf(a,
n+g))?(q!=n&&s.push(f.substring(q,n)),s.push(q=c(v=f.substring(n+g,p))),q.exp=v,q=p+k,v=!0):(q!=L&&s.push(f.substring(q)),q=L);(L=s.length)||(s.push(""),L=1);if(l&&1<s.length)throw yc("noconcat",f);if(!h||v)return C.length=L,q=function(a){try{for(var b=0,c=L,g;b<c;b++){if("function"==typeof(g=s[b]))if(g=g(a),g=l?e.getTrusted(l,g):e.valueOf(g),null==g)g="";else switch(typeof g){case "string":break;case "number":g=""+g;break;default:g=ta(g)}C[b]=g}return C.join("")}catch(k){a=yc("interr",f,k.toString()),
d(a)}},q.exp=f,q.parts=s,q}var g=b.length,k=a.length;f.startSymbol=function(){return b};f.endSymbol=function(){return a};return f}]}function Td(){this.$get=["$rootScope","$window","$q",function(b,a,c){function d(d,g,k,m){var h=a.setInterval,l=a.clearInterval,n=c.defer(),p=n.promise,q=0,s=A(m)&&!m;k=A(k)?k:0;p.then(null,null,d);p.$$intervalId=h(function(){n.notify(q++);0<k&&q>=k&&(n.resolve(q),l(p.$$intervalId),delete e[p.$$intervalId]);s||b.$apply()},g);e[p.$$intervalId]=n;return p}var e={};d.cancel=
function(b){return b&&b.$$intervalId in e?(e[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete e[b.$$intervalId],!0):!1};return d}]}function bd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),
SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function Qb(b){b=b.split("/");for(var a=b.length;a--;)b[a]=
jb(b[a]);return b.join("/")}function zc(b,a,c){b=ua(b,c);a.$$protocol=b.protocol;a.$$host=b.hostname;a.$$port=Z(b.port)||xe[b.protocol]||null}function Ac(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=ua(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=ec(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function qa(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function cb(b){var a=
b.indexOf("#");return-1==a?b:b.substr(0,a)}function Rb(b){return b.substr(0,cb(b).lastIndexOf("/")+1)}function Bc(b,a){this.$$html5=!0;a=a||"";var c=Rb(b);zc(b,this,b);this.$$parse=function(a){var e=qa(c,a);if(!z(e))throw Sb("ipthprfx",a,c);Ac(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Cb(this.$$search),b=this.$$hash?"#"+jb(this.$$hash):"";this.$$url=Qb(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$rewrite=function(d){var e;
if((e=qa(b,d))!==t)return d=e,(e=qa(a,e))!==t?c+(qa("/",e)||e):b+d;if((e=qa(c,d))!==t)return c+e;if(c==d+"/")return c}}function Tb(b,a){var c=Rb(b);zc(b,this,b);this.$$parse=function(d){var e=qa(b,d)||qa(c,d),e="#"==e.charAt(0)?qa(a,e):this.$$html5?e:"";if(!z(e))throw Sb("ihshprfx",d,a);Ac(e,this,b);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Cb(this.$$search),e=this.$$hash?
"#"+jb(this.$$hash):"";this.$$url=Qb(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$rewrite=function(a){if(cb(b)==cb(a))return a}}function Ub(b,a){this.$$html5=!0;Tb.apply(this,arguments);var c=Rb(b);this.$$rewrite=function(d){var e;if(b==cb(d))return d;if(e=qa(c,d))return b+a+e;if(c===d+"/")return c};this.$$compose=function(){var c=Cb(this.$$search),e=this.$$hash?"#"+jb(this.$$hash):"";this.$$url=Qb(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function sb(b){return function(){return this[b]}}
function Cc(b,a){return function(c){if(D(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Wd(){var b="",a=!1;this.hashPrefix=function(a){return A(a)?(b=a,this):b};this.html5Mode=function(b){return A(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,f){function g(a){c.$broadcast("$locationChangeSuccess",k.absUrl(),a)}var k,m,h=d.baseHref(),l=d.url(),n;a?(n=l.substring(0,l.indexOf("/",l.indexOf("//")+2))+(h||"/"),m=e.history?Bc:Ub):(n=
cb(l),m=Tb);k=new m(n,"#"+b);k.$$parse(k.$$rewrite(l));var p=/^\s*(javascript|mailto):/i;f.on("click",function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var e=u(a.target);"a"!==N(e[0].nodeName);)if(e[0]===f[0]||!(e=e.parent())[0])return;var g=e.prop("href");T(g)&&"[object SVGAnimatedString]"===g.toString()&&(g=ua(g.animVal).href);if(!p.test(g)){if(m===Ub){var h=e.attr("href")||e.attr("xlink:href");if(h&&0>h.indexOf("://"))if(g="#"+b,"/"==h[0])g=n+g+h;else if("#"==h[0])g=n+g+(k.path()||"/")+h;
else{var l=k.path().split("/"),h=h.split("/");2!==l.length||l[1]||(l.length=1);for(var q=0;q<h.length;q++)"."!=h[q]&&(".."==h[q]?l.pop():h[q].length&&l.push(h[q]));g=n+g+l.join("/")}}l=k.$$rewrite(g);g&&(!e.attr("target")&&l&&!a.isDefaultPrevented())&&(a.preventDefault(),l!=d.url()&&(k.$$parse(l),c.$apply(),Q.angular["ff-684208-preventDefault"]=!0))}}});k.absUrl()!=l&&d.url(k.absUrl(),!0);d.onUrlChange(function(a){k.absUrl()!=a&&(c.$evalAsync(function(){var b=k.absUrl();k.$$parse(a);c.$broadcast("$locationChangeStart",
a,b).defaultPrevented?(k.$$parse(b),d.url(b)):g(b)}),c.$$phase||c.$digest())});var q=0;c.$watch(function(){var a=d.url(),b=k.$$replace;q&&a==k.absUrl()||(q++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",k.absUrl(),a).defaultPrevented?k.$$parse(a):(d.url(k.absUrl(),b),g(a))}));k.$$replace=!1;return q});return k}]}function Xd(){var b=!0,a=this;this.debugEnabled=function(a){return A(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&
-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||y;a=!1;try{a=!!e.apply}catch(m){}return a?function(){var a=[];r(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function ja(b,
a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw ka("isecfld",a);return b}function Oa(b,a){if(b){if(b.constructor===b)throw ka("isecfn",a);if(b.document&&b.location&&b.alert&&b.setInterval)throw ka("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw ka("isecdom",a);if(b===Object)throw ka("isecobj",a);}return b}function tb(b,a,c,d,e){e=e||{};a=a.split(".");for(var f,g=0;1<a.length;g++){f=ja(a.shift(),d);
var k=b[f];k||(k={},b[f]=k);b=k;b.then&&e.unwrapPromises&&(va(d),"$$v"in b||function(a){a.then(function(b){a.$$v=b})}(b),b.$$v===t&&(b.$$v={}),b=b.$$v)}f=ja(a.shift(),d);Oa(b,d);Oa(b[f],d);return b[f]=c}function Dc(b,a,c,d,e,f,g){ja(b,f);ja(a,f);ja(c,f);ja(d,f);ja(e,f);return g.unwrapPromises?function(g,m){var h=m&&m.hasOwnProperty(b)?m:g,l;if(null==h)return h;(h=h[b])&&h.then&&(va(f),"$$v"in h||(l=h,l.$$v=t,l.then(function(a){l.$$v=a})),h=h.$$v);if(!a)return h;if(null==h)return t;(h=h[a])&&h.then&&
(va(f),"$$v"in h||(l=h,l.$$v=t,l.then(function(a){l.$$v=a})),h=h.$$v);if(!c)return h;if(null==h)return t;(h=h[c])&&h.then&&(va(f),"$$v"in h||(l=h,l.$$v=t,l.then(function(a){l.$$v=a})),h=h.$$v);if(!d)return h;if(null==h)return t;(h=h[d])&&h.then&&(va(f),"$$v"in h||(l=h,l.$$v=t,l.then(function(a){l.$$v=a})),h=h.$$v);if(!e)return h;if(null==h)return t;(h=h[e])&&h.then&&(va(f),"$$v"in h||(l=h,l.$$v=t,l.then(function(a){l.$$v=a})),h=h.$$v);return h}:function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==
h)return h;h=h[b];if(!a)return h;if(null==h)return t;h=h[a];if(!c)return h;if(null==h)return t;h=h[c];if(!d)return h;if(null==h)return t;h=h[d];return e?null==h?t:h=h[e]:h}}function Ec(b,a,c){if(Vb.hasOwnProperty(b))return Vb[b];var d=b.split("."),e=d.length,f;if(a.csp)f=6>e?Dc(d[0],d[1],d[2],d[3],d[4],c,a):function(b,f){var g=0,k;do k=Dc(d[g++],d[g++],d[g++],d[g++],d[g++],c,a)(b,f),f=t,b=k;while(g<e);return k};else{var g="var p;\n";r(d,function(b,d){ja(b,c);g+="if(s == null) return undefined;\ns="+
(d?"s":'((k&&k.hasOwnProperty("'+b+'"))?k:s)')+'["'+b+'"];\n'+(a.unwrapPromises?'if (s && s.then) {\n pw("'+c.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n':"")});var g=g+"return s;",k=new Function("s","k","pw",g);k.toString=$(g);f=a.unwrapPromises?function(a,b){return k(a,b,va)}:k}"hasOwnProperty"!==b&&(Vb[b]=f);return f}function Yd(){var b={},a={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0};this.unwrapPromises=
function(b){return A(b)?(a.unwrapPromises=!!b,this):a.unwrapPromises};this.logPromiseWarnings=function(b){return A(b)?(a.logPromiseWarnings=b,this):a.logPromiseWarnings};this.$get=["$filter","$sniffer","$log",function(c,d,e){a.csp=d.csp;va=function(b){a.logPromiseWarnings&&!Fc.hasOwnProperty(b)&&(Fc[b]=!0,e.warn("[$parse] Promise found in the expression `"+b+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))};return function(d){var e;switch(typeof d){case "string":if(b.hasOwnProperty(d))return b[d];
e=new Wb(a);e=(new db(e,c,a)).parse(d);"hasOwnProperty"!==d&&(b[d]=e);return e;case "function":return d;default:return y}}}]}function $d(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return ye(function(a){b.$evalAsync(a)},a)}]}function ye(b,a){function c(a){return a}function d(a){return g(a)}var e=function(){var g=[],h,l;return l={resolve:function(a){if(g){var c=g;g=t;h=f(a);c.length&&b(function(){for(var a,b=0,d=c.length;b<d;b++)a=c[b],h.then(a[0],a[1],a[2])})}},reject:function(a){l.resolve(k(a))},
notify:function(a){if(g){var c=g;g.length&&b(function(){for(var b,d=0,e=c.length;d<e;d++)b=c[d],b[2](a)})}},promise:{then:function(b,f,k){var l=e(),L=function(d){try{l.resolve((P(b)?b:c)(d))}catch(e){l.reject(e),a(e)}},v=function(b){try{l.resolve((P(f)?f:d)(b))}catch(c){l.reject(c),a(c)}},C=function(b){try{l.notify((P(k)?k:c)(b))}catch(d){a(d)}};g?g.push([L,v,C]):h.then(L,v,C);return l.promise},"catch":function(a){return this.then(null,a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):
d.reject(a);return d.promise}function d(e,f){var g=null;try{g=(a||c)()}catch(k){return b(k,!1)}return g&&P(g.then)?g.then(function(){return b(e,f)},function(a){return b(a,!1)}):b(e,f)}return this.then(function(a){return d(a,!0)},function(a){return d(a,!1)})}}}},f=function(a){return a&&P(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},g=function(a){var b=e();b.reject(a);return b.promise},k=function(c){return{then:function(f,g){var k=e();b(function(){try{k.resolve((P(g)?
g:d)(c))}catch(b){k.reject(b),a(b)}});return k.promise}}};return{defer:e,reject:g,when:function(k,h,l,n){var p=e(),q,s=function(b){try{return(P(h)?h:c)(b)}catch(d){return a(d),g(d)}},L=function(b){try{return(P(l)?l:d)(b)}catch(c){return a(c),g(c)}},v=function(b){try{return(P(n)?n:c)(b)}catch(d){a(d)}};b(function(){f(k).then(function(a){q||(q=!0,p.resolve(f(a).then(s,L,v)))},function(a){q||(q=!0,p.resolve(L(a)))},function(a){q||p.notify(v(a))})});return p.promise},all:function(a){var b=e(),c=0,d=H(a)?
[]:{};r(a,function(a,e){c++;f(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function ge(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:
function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Zd(){var b=10,a=x("$rootScope"),c=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(d,e,f,g){function k(){this.$id=gb();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=
[];this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings={}}function m(b){if(p.$$phase)throw a("inprog",p.$$phase);p.$$phase=b}function h(a,b){var c=f(a);Va(c,b);return c}function l(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function n(){}k.prototype={constructor:k,$new:function(a){a?(a=new k,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=this.$$postDigestQueue):(this.$$childScopeClass||(this.$$childScopeClass=
function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$id=gb();this.$$childScopeClass=null},this.$$childScopeClass.prototype=this),a=new this.$$childScopeClass);a["this"]=a;a.$parent=this;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,d){var e=h(a,"watch"),f=this.$$watchers,g={fn:b,last:n,get:e,exp:a,
eq:!!d};c=null;if(!P(b)){var k=h(b||y,"listener");g.fn=function(a,b,c){k(c)}}if("string"==typeof a&&e.constant){var m=g.fn;g.fn=function(a,b,c){m.call(this,a,b,c);Ra(f,g)}}f||(f=this.$$watchers=[]);f.unshift(g);return function(){Ra(f,g);c=null}},$watchCollection:function(a,b){var c=this,d,e,g,k=1<b.length,h=0,m=f(a),l=[],p={},n=!0,r=0;return this.$watch(function(){d=m(c);var a,b,f;if(T(d))if(fb(d))for(e!==l&&(e=l,r=e.length=0,h++),a=d.length,r!==a&&(h++,e.length=r=a),b=0;b<a;b++)f=e[b]!==e[b]&&d[b]!==
d[b],f||e[b]===d[b]||(h++,e[b]=d[b]);else{e!==p&&(e=p={},r=0,h++);a=0;for(b in d)d.hasOwnProperty(b)&&(a++,e.hasOwnProperty(b)?(f=e[b]!==e[b]&&d[b]!==d[b],f||e[b]===d[b]||(h++,e[b]=d[b])):(r++,e[b]=d[b],h++));if(r>a)for(b in h++,e)e.hasOwnProperty(b)&&!d.hasOwnProperty(b)&&(r--,delete e[b])}else e!==d&&(e=d,h++);return h},function(){n?(n=!1,b(d,d,c)):b(d,g,c);if(k)if(T(d))if(fb(d)){g=Array(d.length);for(var a=0;a<d.length;a++)g[a]=d[a]}else for(a in g={},d)ib.call(d,a)&&(g[a]=d[a]);else g=d})},$digest:function(){var d,
f,g,k,h=this.$$asyncQueue,l=this.$$postDigestQueue,r,w,t=b,K,W=[],u,J,E;m("$digest");c=null;do{w=!1;for(K=this;h.length;){try{E=h.shift(),E.scope.$eval(E.expression)}catch(F){p.$$phase=null,e(F)}c=null}a:do{if(k=K.$$watchers)for(r=k.length;r--;)try{if(d=k[r])if((f=d.get(K))!==(g=d.last)&&!(d.eq?za(f,g):"number"===typeof f&&"number"===typeof g&&isNaN(f)&&isNaN(g)))w=!0,c=d,d.last=d.eq?Ha(f,null):f,d.fn(f,g===n?f:g,K),5>t&&(u=4-t,W[u]||(W[u]=[]),J=P(d.exp)?"fn: "+(d.exp.name||d.exp.toString()):d.exp,
J+="; newVal: "+ta(f)+"; oldVal: "+ta(g),W[u].push(J));else if(d===c){w=!1;break a}}catch(A){p.$$phase=null,e(A)}if(!(k=K.$$childHead||K!==this&&K.$$nextSibling))for(;K!==this&&!(k=K.$$nextSibling);)K=K.$parent}while(K=k);if((w||h.length)&&!t--)throw p.$$phase=null,a("infdig",b,ta(W));}while(w||h.length);for(p.$$phase=null;l.length;)try{l.shift()()}catch(x){e(x)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this!==p&&(r(this.$$listenerCount,
Bb(null,l,this)),a.$$childHead==this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=null,this.$$listeners={},this.$$watchers=this.$$asyncQueue=this.$$postDigestQueue=[],this.$destroy=this.$digest=this.$apply=y,this.$on=
this.$watch=function(){return y})}},$eval:function(a,b){return f(a)(this,b)},$evalAsync:function(a){p.$$phase||p.$$asyncQueue.length||g.defer(function(){p.$$asyncQueue.length&&p.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return m("$apply"),this.$eval(a)}catch(b){e(b)}finally{p.$$phase=null;try{p.$digest()}catch(c){throw e(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=
c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){c[Qa(c,b)]=null;l(e,1,a)}},$emit:function(a,b){var c=[],d,f=this,g=!1,k={name:a,targetScope:f,stopPropagation:function(){g=!0},preventDefault:function(){k.defaultPrevented=!0},defaultPrevented:!1},h=[k].concat(Aa.call(arguments,1)),m,l;do{d=f.$$listeners[a]||c;k.currentScope=f;m=0;for(l=d.length;m<l;m++)if(d[m])try{d[m].apply(null,h)}catch(p){e(p)}else d.splice(m,
1),m--,l--;if(g)break;f=f.$parent}while(f);return k},$broadcast:function(a,b){for(var c=this,d=this,f={name:a,targetScope:this,preventDefault:function(){f.defaultPrevented=!0},defaultPrevented:!1},g=[f].concat(Aa.call(arguments,1)),k,h;c=d;){f.currentScope=c;d=c.$$listeners[a]||[];k=0;for(h=d.length;k<h;k++)if(d[k])try{d[k].apply(null,g)}catch(m){e(m)}else d.splice(k,1),k--,h--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}return f}};
var p=new k;return p}]}function cd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return A(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return A(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;if(!R||8<=R)if(f=ua(c).href,""!==f&&!f.match(e))return"unsafe:"+f;return c}}}function ze(b){if("self"===b)return b;if(z(b)){if(-1<b.indexOf("***"))throw wa("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,
"\\$1").replace(/\x08/g,"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+b+"$")}if(hb(b))return RegExp("^"+b.source+"$");throw wa("imatcher");}function Gc(b){var a=[];A(b)&&r(b,function(b){a.push(ze(b))});return a}function be(){this.SCE_CONTEXTS=fa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=Gc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=Gc(b));return a};this.$get=["$injector",function(c){function d(a){var b=
function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw wa("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var f=d(),g={};g[fa.HTML]=d(f);g[fa.CSS]=d(f);g[fa.URL]=d(f);g[fa.JS]=d(f);g[fa.RESOURCE_URL]=d(g[fa.URL]);return{trustAs:function(a,b){var c=g.hasOwnProperty(a)?g[a]:null;if(!c)throw wa("icontext",
a,b);if(null===b||b===t||""===b)return b;if("string"!==typeof b)throw wa("itype",a);return new c(b)},getTrusted:function(c,d){if(null===d||d===t||""===d)return d;var f=g.hasOwnProperty(c)?g[c]:null;if(f&&d instanceof f)return d.$$unwrapTrustedValue();if(c===fa.RESOURCE_URL){var f=ua(d.toString()),l,n,p=!1;l=0;for(n=b.length;l<n;l++)if("self"===b[l]?Pb(f):b[l].exec(f.href)){p=!0;break}if(p)for(l=0,n=a.length;l<n;l++)if("self"===a[l]?Pb(f):a[l].exec(f.href)){p=!1;break}if(p)return d;throw wa("insecurl",
d.toString());}if(c===fa.HTML)return e(d);throw wa("unsafe");},valueOf:function(a){return a instanceof f?a.$$unwrapTrustedValue():a}}}]}function ae(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw wa("iequirks");var e=ga(fa);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},
e.valueOf=Ga);e.parseAs=function(b,c){var d=a(c);return d.literal&&d.constant?d:function(a,c){return e.getTrusted(b,d(a,c))}};var f=e.parseAs,g=e.getTrusted,k=e.trustAs;r(fa,function(a,b){var c=N(b);e[Ya("parse_as_"+c)]=function(b){return f(a,b)};e[Ya("get_trusted_"+c)]=function(b){return g(a,b)};e[Ya("trust_as_"+c)]=function(b){return k(a,b)}});return e}]}function ce(){this.$get=["$window","$document",function(b,a){var c={},d=Z((/android (\d+)/.exec(N((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||
{}).userAgent),f=a[0]||{},g=f.documentMode,k,m=/^(Moz|webkit|O|ms)(?=[A-Z])/,h=f.body&&f.body.style,l=!1,n=!1;if(h){for(var p in h)if(l=m.exec(p)){k=l[0];k=k.substr(0,1).toUpperCase()+k.substr(1);break}k||(k="WebkitOpacity"in h&&"webkit");l=!!("transition"in h||k+"Transition"in h);n=!!("animation"in h||k+"Animation"in h);!d||l&&n||(l=z(f.body.style.webkitTransition),n=z(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!g||7<
g),hasEvent:function(a){if("input"==a&&9==R)return!1;if(D(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:Wa(),vendorPrefix:k,transitions:l,animations:n,android:d,msie:R,msieDocumentMode:g}}]}function ee(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,k,m){var h=c.defer(),l=h.promise,n=A(m)&&!m;k=a.defer(function(){try{h.resolve(e())}catch(a){h.reject(a),d(a)}finally{delete f[l.$$timeoutId]}n||b.$apply()},k);l.$$timeoutId=k;f[k]=h;
return l}var f={};e.cancel=function(b){return b&&b.$$timeoutId in f?(f[b.$$timeoutId].reject("canceled"),delete f[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return e}]}function ua(b,a){var c=b;R&&(V.setAttribute("href",c),c=V.href);V.setAttribute("href",c);return{href:V.href,protocol:V.protocol?V.protocol.replace(/:$/,""):"",host:V.host,search:V.search?V.search.replace(/^\?/,""):"",hash:V.hash?V.hash.replace(/^#/,""):"",hostname:V.hostname,port:V.port,pathname:"/"===V.pathname.charAt(0)?V.pathname:
"/"+V.pathname}}function Pb(b){b=z(b)?ua(b):b;return b.protocol===Hc.protocol&&b.host===Hc.host}function fe(){this.$get=$(Q)}function mc(b){function a(d,e){if(T(d)){var f={};r(d,function(b,c){f[c]=a(c,b)});return f}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",Ic);a("date",Jc);a("filter",Ae);a("json",Be);a("limitTo",Ce);a("lowercase",De);a("number",Kc);a("orderBy",Lc);a("uppercase",Ee)}function Ae(){return function(b,
a,c){if(!H(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return Ua.equals(a,b)}:function(a,b){if(a&&b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&ib.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var f=function(a,b){if("string"==typeof b&&"!"===b.charAt(0))return!f(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,
b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&f(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(f(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var g in a)(function(b){"undefined"!==typeof a[b]&&e.push(function(c){return f("$"==b?c:c&&c[b],a[b])})})(g);break;case "function":e.push(a);break;default:return b}d=[];for(g=0;g<b.length;g++){var k=
b[g];e.check(k)&&d.push(k)}return d}}function Ic(b){var a=b.NUMBER_FORMATS;return function(b,d){D(d)&&(d=a.CURRENCY_SYM);return Mc(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Kc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Mc(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Mc(b,a,c,d,e){if(null==b||!isFinite(b)||T(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",k="",m=[],h=!1;if(-1!==g.indexOf("e")){var l=g.match(/([\d\.]+)e(-?)(\d+)/);l&&"-"==l[2]&&
l[3]>e+1?(g="0",b=0):(k=g,h=!0)}if(h)0<e&&(-1<b&&1>b)&&(k=b.toFixed(e));else{g=(g.split(Nc)[1]||"").length;D(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);b=(""+b).split(Nc);g=b[0];b=b[1]||"";var l=0,n=a.lgSize,p=a.gSize;if(g.length>=n+p)for(l=g.length-n,h=0;h<l;h++)0===(l-h)%p&&0!==h&&(k+=c),k+=g.charAt(h);for(h=l;h<g.length;h++)0===(g.length-h)%n&&0!==h&&(k+=c),k+=g.charAt(h);for(;b.length<e;)b+="0";e&&"0"!==e&&(k+=d+b.substr(0,e))}m.push(f?
a.negPre:a.posPre);m.push(k);m.push(f?a.negSuf:a.posSuf);return m.join("")}function Xb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function Y(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Xb(e,a,d)}}function ub(b,a){return function(c,d){var e=c["get"+b](),f=Ia(a?"SHORT"+b:b);return d[f][e]}}function Jc(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,k=b[8]?a.setUTCFullYear:
a.setFullYear,m=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=Z(b[9]+b[10]),g=Z(b[9]+b[11]));k.call(a,Z(b[1]),Z(b[2])-1,Z(b[3]));f=Z(b[4]||0)-f;g=Z(b[5]||0)-g;k=Z(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));m.call(a,f,g,k,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e){var f="",g=[],k,m;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;z(c)&&(c=Fe.test(c)?Z(c):a(c));Ab(c)&&(c=new Date(c));if(!sa(c))return c;
for(;e;)(m=Ge.exec(e))?(g=g.concat(Aa.call(m,1)),e=g.pop()):(g.push(e),e=null);r(g,function(a){k=He[a];f+=k?k(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return f}}function Be(){return function(b){return ta(b,!0)}}function Ce(){return function(b,a){if(!H(b)&&!z(b))return b;a=Infinity===Math.abs(Number(a))?Number(a):Z(a);if(z(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);
for(;d<e;d++)c.push(b[d]);return c}}function Lc(b){return function(a,c,d){function e(a,b){return Ta(b)?function(b,c){return a(c,b)}:a}function f(a,b){var c=typeof a,d=typeof b;return c==d?(sa(a)&&sa(b)&&(a=a.valueOf(),b=b.valueOf()),"string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!H(a)||!c)return a;c=H(c)?c:[c];c=Vc(c,function(a){var c=!1,d=a||Ga;if(z(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);d=b(a);if(d.constant){var g=d();return e(function(a,
b){return f(a[g],b[g])},c)}}return e(function(a,b){return f(d(a),d(b))},c)});for(var g=[],k=0;k<a.length;k++)g.push(a[k]);return g.sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function xa(b){P(b)&&(b={link:b});b.restrict=b.restrict||"AC";return $(b)}function Oc(b,a,c,d){function e(a,c){c=c?"-"+kb(c,"-"):"";d.removeClass(b,(a?vb:wb)+c);d.addClass(b,(a?wb:vb)+c)}var f=this,g=b.parent().controller("form")||xb,k=0,m=f.$error={},h=[];f.$name=a.name||
a.ngForm;f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;g.$addControl(f);b.addClass(Pa);e(!0);f.$addControl=function(a){Ca(a.$name,"input");h.push(a);a.$name&&(f[a.$name]=a)};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];r(m,function(b,c){f.$setValidity(c,!0,a)});Ra(h,a)};f.$setValidity=function(a,b,c){var d=m[a];if(b)d&&(Ra(d,c),d.length||(k--,k||(e(b),f.$valid=!0,f.$invalid=!1),m[a]=!1,e(!0,a),g.$setValidity(a,!0,f)));else{k||e(b);if(d){if(-1!=Qa(d,c))return}else m[a]=
d=[],k++,e(!1,a),g.$setValidity(a,!1,f);d.push(c);f.$valid=!1;f.$invalid=!0}};f.$setDirty=function(){d.removeClass(b,Pa);d.addClass(b,yb);f.$dirty=!0;f.$pristine=!1;g.$setDirty()};f.$setPristine=function(){d.removeClass(b,yb);d.addClass(b,Pa);f.$dirty=!1;f.$pristine=!0;r(h,function(a){a.$setPristine()})}}function ra(b,a,c,d){b.$setValidity(a,c);return c?d:t}function Pc(b,a){var c,d;if(a)for(c=0;c<a.length;++c)if(d=a[c],b[d])return!0;return!1}function Ie(b,a,c,d,e){T(e)&&(b.$$hasNativeValidators=!0,
b.$parsers.push(function(f){if(b.$error[a]||Pc(e,d)||!Pc(e,c))return f;b.$setValidity(a,!1)}))}function zb(b,a,c,d,e,f){var g=a.prop(Je),k=a[0].placeholder,m={},h=N(a[0].type);d.$$validityState=g;if(!e.android){var l=!1;a.on("compositionstart",function(a){l=!0});a.on("compositionend",function(){l=!1;n()})}var n=function(e){if(!l){var f=a.val();if(R&&"input"===(e||m).type&&a[0].placeholder!==k)k=a[0].placeholder;else if("password"!==h&&Ta(c.ngTrim||"T")&&(f=aa(f)),e=g&&d.$$hasNativeValidators,d.$viewValue!==
f||""===f&&e)b.$$phase?d.$setViewValue(f):b.$apply(function(){d.$setViewValue(f)})}};if(e.hasEvent("input"))a.on("input",n);else{var p,q=function(){p||(p=f.defer(function(){n();p=null}))};a.on("keydown",function(a){a=a.keyCode;91===a||(15<a&&19>a||37<=a&&40>=a)||q()});if(e.hasEvent("paste"))a.on("paste cut",q)}a.on("change",n);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)};var s=c.ngPattern;s&&((e=s.match(/^\/(.*)\/([gim]*)$/))?(s=RegExp(e[1],e[2]),e=function(a){return ra(d,
"pattern",d.$isEmpty(a)||s.test(a),a)}):e=function(c){var e=b.$eval(s);if(!e||!e.test)throw x("ngPattern")("noregexp",s,e,ha(a));return ra(d,"pattern",d.$isEmpty(c)||e.test(c),c)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var r=Z(c.ngMinlength);e=function(a){return ra(d,"minlength",d.$isEmpty(a)||a.length>=r,a)};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var v=Z(c.ngMaxlength);e=function(a){return ra(d,"maxlength",d.$isEmpty(a)||a.length<=v,a)};d.$parsers.push(e);
d.$formatters.push(e)}}function Yb(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],l=0;l<b.length;l++)if(e==b[l])continue a;c.push(e)}return c}function e(a){if(!H(a)){if(z(a))return a.split(" ");if(T(a)){var b=[];r(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,k){function m(a,b){var c=g.data("$classCounts")||{},d=[];r(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<
b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function h(b){if(!0===a||f.$index%2===a){var h=e(b||[]);if(!l){var q=m(h,1);k.$addClass(q)}else if(!za(b,l)){var s=e(l),q=d(h,s),h=d(s,h),h=m(h,-1),q=m(q,1);0===q.length?c.removeClass(g,h):0===h.length?c.addClass(g,q):c.setClass(g,q,h)}}l=ga(b)}var l;f.$watch(k[b],h,!0);k.$observe("class",function(a){h(f.$eval(k[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var h=e(f.$eval(k[b]));g===a?(g=m(h,1),k.$addClass(g)):
(g=m(h,-1),k.$removeClass(g))}})}}}]}var Je="validity",N=function(b){return z(b)?b.toLowerCase():b},ib=Object.prototype.hasOwnProperty,Ia=function(b){return z(b)?b.toUpperCase():b},R,u,Da,Aa=[].slice,Ke=[].push,ya=Object.prototype.toString,Sa=x("ng"),Ua=Q.angular||(Q.angular={}),Xa,Ma,la=["0","0","0"];R=Z((/msie (\d+)/.exec(N(navigator.userAgent))||[])[1]);isNaN(R)&&(R=Z((/trident\/.*; rv:(\d+)/.exec(N(navigator.userAgent))||[])[1]));y.$inject=[];Ga.$inject=[];var H=function(){return P(Array.isArray)?
Array.isArray:function(b){return"[object Array]"===ya.call(b)}}(),aa=function(){return String.prototype.trim?function(b){return z(b)?b.trim():b}:function(b){return z(b)?b.replace(/^\s\s*/,"").replace(/\s\s*$/,""):b}}();Ma=9>R?function(b){b=b.nodeName?b:b[0];return b.scopeName&&"HTML"!=b.scopeName?Ia(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};var Wa=function(){if(A(Wa.isActive_))return Wa.isActive_;var b=!(!X.querySelector("[ng-csp]")&&!X.querySelector("[data-ng-csp]"));
if(!b)try{new Function("")}catch(a){b=!0}return Wa.isActive_=b},Yc=/[A-Z]/g,ad={full:"1.2.23",major:1,minor:2,dot:23,codeName:"superficial-malady"};S.expando="ng339";var $a=S.cache={},ne=1,rb=Q.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},Za=Q.document.removeEventListener?function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)};S._data=function(b){return this.cache[b[this.expando]]||{}};var ie=/([\:\-\_]+(.))/g,
je=/^moz([A-Z])/,Hb=x("jqLite"),ke=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Ib=/<|&#?\w+;/,le=/<([\w:]+)/,me=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ba.optgroup=ba.option;ba.tbody=ba.tfoot=ba.colgroup=ba.caption=ba.thead;ba.th=
ba.td;var La=S.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===X.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),S(Q).on("load",a))},toString:function(){var b=[];r(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?u(this[b]):u(this[this.length+b])},length:0,push:Ke,sort:[].sort,splice:[].splice},ob={};r("multiple selected checked disabled readOnly required open".split(" "),function(b){ob[N(b)]=b});var rc={};r("input select option textarea button form details".split(" "),
function(b){rc[Ia(b)]=!0});r({data:Mb,removeData:Lb},function(b,a){S[a]=b});r({data:Mb,inheritedData:nb,scope:function(b){return u.data(b,"$scope")||nb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return u.data(b,"$isolateScope")||u.data(b,"$isolateScopeNoTemplate")},controller:oc,injector:function(b){return nb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Nb,css:function(b,a,c){a=Ya(a);if(A(c))b.style[a]=c;else{var d;8>=R&&(d=b.currentStyle&&b.currentStyle[a],
""===d&&(d="auto"));d=d||b.style[a];8>=R&&(d=""===d?t:d);return d}},attr:function(b,a,c){var d=N(a);if(ob[d])if(A(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||y).specified?d:t;else if(A(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?t:b},prop:function(b,a,c){if(A(c))b[a]=c;else return b[a]},text:function(){function b(b,d){var e=a[b.nodeType];if(D(d))return e?b[e]:"";b[e]=d}var a=[];9>R?(a[1]=
"innerText",a[3]="nodeValue"):a[1]=a[3]="textContent";b.$dv="";return b}(),val:function(b,a){if(D(a)){if("SELECT"===Ma(b)&&b.multiple){var c=[];r(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(D(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Ja(d[c]);b.innerHTML=a},empty:pc},function(b,a){S.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==pc&&(2==b.length&&b!==Nb&&b!==oc?a:d)===t){if(T(a)){for(e=
0;e<g;e++)if(b===Mb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===t?Math.min(g,1):g;for(f=0;f<g;f++){var k=b(this[f],a,d);e=e?e+k:k}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});r({removeData:Lb,dealoc:Ja,on:function a(c,d,e,f){if(A(f))throw Hb("onargs");var g=ma(c,"events"),k=ma(c,"handle");g||ma(c,"events",g={});k||ma(c,"handle",k=oe(c,g));r(d.split(" "),function(d){var f=g[d];if(!f){if("mouseenter"==d||"mouseleave"==d){var l=X.body.contains||X.body.compareDocumentPosition?
function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};g[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=a.relatedTarget;c&&(c===this||l(this,c))||k(a,d)})}else rb(c,d,k),g[d]=[];f=g[d]}f.push(e)})},off:nc,one:function(a,c,d){a=u(a);a.on(c,function f(){a.off(c,
d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;Ja(a);r(new S(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];r(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){r(new S(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,c){if(1===a.nodeType){var d=a.firstChild;r(new S(c),function(c){a.insertBefore(c,
d)})}},wrap:function(a,c){c=u(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Ja(a);var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;r(new S(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:mb,removeClass:lb,toggleClass:function(a,c,d){c&&r(c.split(" "),function(c){var f=d;D(f)&&(f=!Nb(a,c));(f?mb:lb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;
for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Kb,triggerHandler:function(a,c,d){var e,f;e=c.type||c;var g=(ma(a,"events")||{})[e];g&&(e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopPropagation:y,type:e,target:a},c.type&&(e=B(e,c)),c=ga(g),f=d?[e].concat(d):[e],r(c,function(c){c.apply(a,f)}))}},function(a,c){S.prototype[c]=
function(c,e,f){for(var g,k=0;k<this.length;k++)D(g)?(g=a(this[k],c,e,f),A(g)&&(g=u(g))):Jb(g,a(this[k],c,e,f));return A(g)?g:this};S.prototype.bind=S.prototype.on;S.prototype.unbind=S.prototype.off});ab.prototype={put:function(a,c){this[Ka(a,this.nextUid)]=c},get:function(a){return this[Ka(a,this.nextUid)]},remove:function(a){var c=this[a=Ka(a,this.nextUid)];delete this[a];return c}};var qe=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,re=/,/,se=/^\s*(_?)(\S+?)\1\s*$/,pe=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
bb=x("$injector"),Le=x("$animate"),Md=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Le("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$timeout","$$asyncCallback",function(a,d){return{enter:function(a,c,g,k){g?g.after(a):(c&&c[0]||(c=g.parent()),c.append(a));k&&
d(k)},leave:function(a,c){a.remove();c&&d(c)},move:function(a,c,d,k){this.enter(a,c,d,k)},addClass:function(a,c,g){c=z(c)?c:H(c)?c.join(" "):"";r(a,function(a){mb(a,c)});g&&d(g)},removeClass:function(a,c,g){c=z(c)?c:H(c)?c.join(" "):"";r(a,function(a){lb(a,c)});g&&d(g)},setClass:function(a,c,g,k){r(a,function(a){mb(a,c);lb(a,g)});k&&d(k)},enabled:y}}]}],ia=x("$compile");ic.$inject=["$provide","$$sanitizeUriProvider"];var ue=/^(x[\:\-_]|data[\:\-_])/i,yc=x("$interpolate"),Me=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
xe={http:80,https:443,ftp:21},Sb=x("$location");Ub.prototype=Tb.prototype=Bc.prototype={$$html5:!1,$$replace:!1,absUrl:sb("$$absUrl"),url:function(a,c){if(D(a))return this.$$url;var d=Me.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));(d[2]||d[1])&&this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:sb("$$protocol"),host:sb("$$host"),port:sb("$$port"),path:Cc("$$path",function(a){return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;
case 1:if(z(a))this.$$search=ec(a);else if(T(a))r(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Sb("isrcharg");break;default:D(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:Cc("$$hash",Ga),replace:function(){this.$$replace=!0;return this}};var ka=x("$parse"),Fc={},va,Ne=Function.prototype.call,Oe=Function.prototype.apply,Qc=Function.prototype.bind,eb={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},
undefined:y,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return A(d)?A(e)?d+e:d:A(e)?e:t},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(A(d)?d:0)-(A(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":y,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,
c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Pe={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},Wb=function(a){this.options=a};Wb.prototype=
{constructor:Wb,lex:function(a){this.text=a;this.index=0;this.ch=t;this.lastCh=":";for(this.tokens=[];this.index<this.text.length;){this.ch=this.text.charAt(this.index);if(this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent();else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch}),this.index++;else if(this.isWhitespace(this.ch)){this.index++;continue}else{a=
this.ch+this.peek();var c=a+this.peek(2),d=eb[this.ch],e=eb[a],f=eb[c];f?(this.tokens.push({index:this.index,text:c,fn:f}),this.index+=3):e?(this.tokens.push({index:this.index,text:a,fn:e}),this.index+=2):d?(this.tokens.push({index:this.index,text:this.ch,fn:d}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},was:function(a){return-1!==a.indexOf(this.lastCh)},peek:function(a){a=
a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=A(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw ka("lexerr",a,c,this.text);
},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=N(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,literal:!0,constant:!0,fn:function(){return a}})},
readIdent:function(){for(var a=this,c="",d=this.index,e,f,g,k;this.index<this.text.length;){k=this.text.charAt(this.index);if("."===k||this.isIdent(k)||this.isNumber(k))"."===k&&(e=this.index),c+=k;else break;this.index++}if(e)for(f=this.index;f<this.text.length;){k=this.text.charAt(f);if("("===k){g=c.substr(e-d+1);c=c.substr(0,e-d);this.index=f;break}if(this.isWhitespace(k))f++;else break}d={index:d,text:c};if(eb.hasOwnProperty(c))d.fn=eb[c],d.literal=!0,d.constant=!0;else{var m=Ec(c,this.options,
this.text);d.fn=B(function(a,c){return m(a,c)},{assign:function(d,e){return tb(d,c,e,a.text,a.options)}})}this.tokens.push(d);g&&(this.tokens.push({index:e,text:"."}),this.tokens.push({index:e+1,text:g}))},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=
4,d+=String.fromCharCode(parseInt(f,16))):d+=Pe[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,string:d,literal:!0,constant:!0,fn:function(){return d}});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var db=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};db.ZERO=B(function(){return 0},{constant:!0});db.prototype={constructor:db,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&
this.throwError("is an unexpected token",this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);a.literal=!!c.literal;a.constant=!!c.constant}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):
"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw ka("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw ka("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var f=this.tokens[0],g=f.text;if(g===a||g===c||g===d||g===e||!(a||c||d||e))return f}return!1},expect:function(a,c,d,e){return(a=this.peek(a,
c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},unaryFn:function(a,c){return B(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return B(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return B(function(e,f){return c(e,f,a,d)},{constant:a.constant&&d.constant})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&
!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=0;f<a.length;f++){var g=a[f];g&&(e=g(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];;)if(a=this.expect(":"))d.push(this.expression());else{var e=function(a,e,k){k=[k];for(var m=0;m<d.length;m++)k.push(d[m](a,
e));return c.apply(a,k)};return function(){return e}}},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,f){return a.assign(d,c(d,f),f)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.assignment();if(d=this.expect(":"))return this.ternaryFn(a,c,this.assignment());
this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,c.fn,this.logicalAND());else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},relational:function(){var a=this.additive(),c;if(c=this.expect("<",
">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(db.ZERO,a.fn,this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):
this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=Ec(d,this.options,this.text);return B(function(c,d,k){return e(k||a(c,d))},{assign:function(e,g,k){(k=a(e,k))||a.assign(e,k={});return tb(k,d,g,c.text,c.options)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return B(function(e,f){var g=a(e,f),k=d(e,f),m;ja(k,c.text);if(!g)return t;(g=Oa(g[k],c.text))&&(g.then&&c.options.unwrapPromises)&&(m=g,"$$v"in g||(m.$$v=t,m.then(function(a){m.$$v=a})),g=
g.$$v);return g},{assign:function(e,f,g){var k=ja(d(e,g),c.text);(g=Oa(a(e,g),c.text))||a.assign(e,g={});return g[k]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this;return function(f,g){for(var k=[],m=c?c(f,g):f,h=0;h<d.length;h++)k.push(d[h](f,g));h=a(f,g,m)||y;Oa(m,e.text);var l=e.text;if(h){if(h.constructor===h)throw ka("isecfn",l);if(h===Ne||h===Oe||Qc&&h===Qc)throw ka("isecff",l);}k=h.apply?
h.apply(m,k):h(k[0],k[1],k[2],k[3],k[4]);return Oa(k,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{if(this.peek("]"))break;var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return B(function(c,d){for(var g=[],k=0;k<a.length;k++)g.push(a[k](c,d));return g},{literal:!0,constant:c})},object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.expect(),d=d.string||d.text;this.consume(":");
var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return B(function(c,d){for(var e={},m=0;m<a.length;m++){var h=a[m];e[h.key]=h.value(c,d)}return e},{literal:!0,constant:c})}};var Vb={},wa=x("$sce"),fa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},V=X.createElement("a"),Hc=ua(Q.location.href,!0);mc.$inject=["$provide"];Ic.$inject=["$locale"];Kc.$inject=["$locale"];var Nc=".",He={yyyy:Y("FullYear",4),yy:Y("FullYear",
2,0,!0),y:Y("FullYear",1),MMMM:ub("Month"),MMM:ub("Month",!0),MM:Y("Month",2,1),M:Y("Month",1,1),dd:Y("Date",2),d:Y("Date",1),HH:Y("Hours",2),H:Y("Hours",1),hh:Y("Hours",2,-12),h:Y("Hours",1,-12),mm:Y("Minutes",2),m:Y("Minutes",1),ss:Y("Seconds",2),s:Y("Seconds",1),sss:Y("Milliseconds",3),EEEE:ub("Day"),EEE:ub("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Xb(Math[0<a?"floor":"ceil"](a/60),2)+Xb(Math.abs(a%60),
2))}},Ge=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Fe=/^\-?\d+$/;Jc.$inject=["$locale"];var De=$(N),Ee=$(Ia);Lc.$inject=["$parse"];var dd=$({restrict:"E",compile:function(a,c){8>=R&&(c.href||c.name||c.$set("href",""),a.append(X.createComment("IE fix")));if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var f="[object SVGAnimatedString]"===ya.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}),Fb={};r(ob,function(a,
c){if("multiple"!=a){var d=na("ng-"+c);Fb[d]=function(){return{priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}});r(["src","srcset","href"],function(a){var c=na("ng-"+a);Fb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,k=a;"href"===a&&"[object SVGAnimatedString]"===ya.call(e.prop("href"))&&(k="xlinkHref",f.$attr[k]="xlink:href",g=null);f.$observe(c,function(c){c?(f.$set(k,c),R&&g&&e.prop(g,f[k])):"href"===a&&f.$set(k,null)})}}}});var xb={$addControl:y,
$removeControl:y,$setValidity:y,$setDirty:y,$setPristine:y};Oc.$inject=["$element","$attrs","$scope","$animate"];var Rc=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:Oc,compile:function(){return{pre:function(a,e,f,g){if(!f.action){var k=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};rb(e[0],"submit",k);e.on("$destroy",function(){c(function(){Za(e[0],"submit",k)},0,!1)})}var m=e.parent().controller("form"),h=f.name||f.ngForm;h&&tb(a,
h,g,h);if(m)e.on("$destroy",function(){m.$removeControl(g);h&&tb(a,h,t,h);B(g,xb)})}}}}}]},ed=Rc(),rd=Rc(!0),Qe=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Re=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Se=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Sc={text:zb,number:function(a,c,d,e,f,g){zb(a,c,d,e,f,g);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||Se.test(a))return e.$setValidity("number",!0),""===
a?null:c?a:parseFloat(a);e.$setValidity("number",!1);return t});Ie(e,"number",Te,null,e.$$validityState);e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=parseFloat(d.min);return ra(e,"min",e.$isEmpty(a)||a>=c,a)},e.$parsers.push(a),e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);return ra(e,"max",e.$isEmpty(a)||a<=c,a)},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){return ra(e,"number",e.$isEmpty(a)||Ab(a),a)})},
url:function(a,c,d,e,f,g){zb(a,c,d,e,f,g);a=function(a){return ra(e,"url",e.$isEmpty(a)||Qe.test(a),a)};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,f,g){zb(a,c,d,e,f,g);a=function(a){return ra(e,"email",e.$isEmpty(a)||Re.test(a),a)};e.$formatters.push(a);e.$parsers.push(a)},radio:function(a,c,d,e){D(d.name)&&c.attr("name",gb());c.on("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",
e.$render)},checkbox:function(a,c,d,e){var f=d.ngTrueValue,g=d.ngFalseValue;z(f)||(f=!0);z(g)||(g=!1);c.on("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==f};e.$formatters.push(function(a){return a===f});e.$parsers.push(function(a){return a?f:g})},hidden:y,button:y,submit:y,reset:y,file:y},Te=["badInput"],jc=["$browser","$sniffer",function(a,c){return{restrict:"E",require:"?ngModel",link:function(d,
e,f,g){g&&(Sc[N(f.type)]||Sc.text)(d,e,f,g,c,a)}}}],wb="ng-valid",vb="ng-invalid",Pa="ng-pristine",yb="ng-dirty",Ue=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate",function(a,c,d,e,f,g){function k(a,c){c=c?"-"+kb(c,"-"):"";g.removeClass(e,(a?vb:wb)+c);g.addClass(e,(a?wb:vb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$name=d.name;var m=f(d.ngModel),
h=m.assign;if(!h)throw x("ngModel")("nonassign",d.ngModel,ha(e));this.$render=y;this.$isEmpty=function(a){return D(a)||""===a||null===a||a!==a};var l=e.inheritedData("$formController")||xb,n=0,p=this.$error={};e.addClass(Pa);k(!0);this.$setValidity=function(a,c){p[a]!==!c&&(c?(p[a]&&n--,n||(k(!0),this.$valid=!0,this.$invalid=!1)):(k(!1),this.$invalid=!0,this.$valid=!1,n++),p[a]=!c,k(c,a),l.$setValidity(a,c,this))};this.$setPristine=function(){this.$dirty=!1;this.$pristine=!0;g.removeClass(e,yb);g.addClass(e,
Pa)};this.$setViewValue=function(d){this.$viewValue=d;this.$pristine&&(this.$dirty=!0,this.$pristine=!1,g.removeClass(e,Pa),g.addClass(e,yb),l.$setDirty());r(this.$parsers,function(a){d=a(d)});this.$modelValue!==d&&(this.$modelValue=d,h(a,d),r(this.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}}))};var q=this;a.$watch(function(){var c=m(a);if(q.$modelValue!==c){var d=q.$formatters,e=d.length;for(q.$modelValue=c;e--;)c=d[e](c);q.$viewValue!==c&&(q.$viewValue=c,q.$render())}return c})}],Gd=
function(){return{require:["ngModel","^?form"],controller:Ue,link:function(a,c,d,e){var f=e[0],g=e[1]||xb;g.$addControl(f);a.$on("$destroy",function(){g.$removeControl(f)})}}},Id=$({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),kc=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var f=function(a){if(d.required&&e.$isEmpty(a))e.$setValidity("required",!1);else return e.$setValidity("required",!0),a};e.$formatters.push(f);
e.$parsers.unshift(f);d.$observe("required",function(){f(e.$viewValue)})}}}},Hd=function(){return{require:"ngModel",link:function(a,c,d,e){var f=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){if(!D(a)){var c=[];a&&r(a.split(f),function(a){a&&c.push(aa(a))});return c}});e.$formatters.push(function(a){return H(a)?a.join(", "):t});e.$isEmpty=function(a){return!a||!a.length}}}},Ve=/^(true|false|\d+)$/,Jd=function(){return{priority:100,compile:function(a,c){return Ve.test(c.ngValue)?
function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},jd=xa({compile:function(a){a.addClass("ng-binding");return function(a,d,e){d.data("$binding",e.ngBind);a.$watch(e.ngBind,function(a){d.text(a==t?"":a)})}}}),ld=["$interpolate",function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],kd=["$sce","$parse",function(a,c){return{compile:function(d){d.addClass("ng-binding");
return function(d,f,g){f.data("$binding",g.ngBindHtml);var k=c(g.ngBindHtml);d.$watch(function(){return(k(d)||"").toString()},function(c){f.html(a.getTrustedHtml(k(d))||"")})}}}}],md=Yb("",!0),od=Yb("Odd",0),nd=Yb("Even",1),pd=xa({compile:function(a,c){c.$set("ngCloak",t);a.removeClass("ng-cloak")}}),qd=[function(){return{scope:!0,controller:"@",priority:500}}],lc={};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var c=na("ng-"+a);lc[c]=["$parse",function(d){return{compile:function(e,f){var g=d(f[c]);return function(c,d){d.on(N(a),function(a){c.$apply(function(){g(c,{$event:a})})})}}}}]});var td=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var k,m,h;c.$watch(e.ngIf,function(f){Ta(f)?m||(m=c.$new(),g(m,function(c){c[c.length++]=X.createComment(" end ngIf: "+e.ngIf+" ");k={clone:c};a.enter(c,d.parent(),d)})):(h&&(h.remove(),
h=null),m&&(m.$destroy(),m=null),k&&(h=Eb(k.clone),a.leave(h,function(){h=null}),k=null))})}}}],ud=["$http","$templateCache","$anchorScroll","$animate","$sce",function(a,c,d,e,f){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:Ua.noop,compile:function(g,k){var m=k.ngInclude||k.src,h=k.onload||"",l=k.autoscroll;return function(g,k,q,r,L){var v=0,t,u,I,w=function(){u&&(u.remove(),u=null);t&&(t.$destroy(),t=null);I&&(e.leave(I,function(){u=null}),u=I,I=null)};g.$watch(f.parseAsResourceUrl(m),
function(f){var m=function(){!A(l)||l&&!g.$eval(l)||d()},q=++v;f?(a.get(f,{cache:c}).success(function(a){if(q===v){var c=g.$new();r.template=a;a=L(c,function(a){w();e.enter(a,null,k,m)});t=c;I=a;t.$emit("$includeContentLoaded");g.$eval(h)}}).error(function(){q===v&&w()}),g.$emit("$includeContentRequested")):(w(),r.template=null)})}}}}],Kd=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){d.html(f.template);a(d.contents())(c)}}}],vd=xa({priority:450,
compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),wd=xa({terminal:!0,priority:1E3}),xd=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,f,g){var k=g.count,m=g.$attr.when&&f.attr(g.$attr.when),h=g.offset||0,l=e.$eval(m)||{},n={},p=c.startSymbol(),q=c.endSymbol(),s=/^when(Minus)?(.+)$/;r(g,function(a,c){s.test(c)&&(l[N(c.replace("when","").replace("Minus","-"))]=f.attr(g.$attr[c]))});r(l,function(a,e){n[e]=c(a.replace(d,p+k+"-"+h+q))});e.$watch(function(){var c=
parseFloat(e.$eval(k));if(isNaN(c))return"";c in l||(c=a.pluralCat(c-h));return n[c](e,f,!0)},function(a){f.text(a)})}}}],yd=["$parse","$animate",function(a,c){var d=x("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,link:function(e,f,g,k,m){var h=g.ngRepeat,l=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),n,p,q,s,t,v,C={$id:Ka};if(!l)throw d("iexp",h);g=l[1];k=l[2];(l=l[3])?(n=a(l),p=function(a,c,d){v&&(C[v]=a);C[t]=c;C.$index=d;return n(e,
C)}):(q=function(a,c){return Ka(c)},s=function(a){return a});l=g.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!l)throw d("iidexp",g);t=l[3]||l[1];v=l[2];var A={};e.$watchCollection(k,function(a){var g,k,l=f[0],n,C={},J,E,F,x,z,y,H=[];if(fb(a))z=a,n=p||q;else{n=p||s;z=[];for(F in a)a.hasOwnProperty(F)&&"$"!=F.charAt(0)&&z.push(F);z.sort()}J=z.length;k=H.length=z.length;for(g=0;g<k;g++)if(F=a===z?g:z[g],x=a[F],x=n(F,x,g),Ca(x,"`track by` id"),A.hasOwnProperty(x))y=A[x],delete A[x],C[x]=
y,H[g]=y;else{if(C.hasOwnProperty(x))throw r(H,function(a){a&&a.scope&&(A[a.id]=a)}),d("dupes",h,x);H[g]={id:x};C[x]=!1}for(F in A)A.hasOwnProperty(F)&&(y=A[F],g=Eb(y.clone),c.leave(g),r(g,function(a){a.$$NG_REMOVED=!0}),y.scope.$destroy());g=0;for(k=z.length;g<k;g++){F=a===z?g:z[g];x=a[F];y=H[g];H[g-1]&&(l=H[g-1].clone[H[g-1].clone.length-1]);if(y.scope){E=y.scope;n=l;do n=n.nextSibling;while(n&&n.$$NG_REMOVED);y.clone[0]!=n&&c.move(Eb(y.clone),null,u(l));l=y.clone[y.clone.length-1]}else E=e.$new();
E[t]=x;v&&(E[v]=F);E.$index=g;E.$first=0===g;E.$last=g===J-1;E.$middle=!(E.$first||E.$last);E.$odd=!(E.$even=0===(g&1));y.scope||m(E,function(a){a[a.length++]=X.createComment(" end ngRepeat: "+h+" ");c.enter(a,null,u(l));l=a;y.scope=E;y.clone=a;C[y.id]=y})}A=C})}}}],zd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[Ta(c)?"removeClass":"addClass"](d,"ng-hide")})}}],sd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[Ta(c)?"addClass":"removeClass"](d,
"ng-hide")})}}],Ad=xa(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&r(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Bd=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],k=[],m=[],h=[];c.$watch(e.ngSwitch||e.on,function(d){var n,p;n=0;for(p=m.length;n<p;++n)m[n].remove();n=m.length=0;for(p=h.length;n<p;++n){var q=k[n];h[n].$destroy();m[n]=q;a.leave(q,function(){m.splice(n,1)})}k.length=0;h.length=
0;if(g=f.cases["!"+d]||f.cases["?"])c.$eval(e.change),r(g,function(d){var e=c.$new();h.push(e);d.transclude(e,function(c){var e=d.element;k.push(c);a.enter(c,e.parent(),e)})})})}}}],Cd=xa({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),Dd=xa({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||
[];e.cases["?"].push({transclude:f,element:c})}}),Fd=xa({link:function(a,c,d,e,f){if(!f)throw x("ngTransclude")("orphan",ha(c));f(function(a){c.empty();c.append(a)})}}),fd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],We=x("ngOptions"),Ed=$({terminal:!0}),gd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
e={$setViewValue:y};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var m=this,h={},l=e,n;m.databound=d.ngModel;m.init=function(a,c,d){l=a;n=d};m.addOption=function(c){Ca(c,'"option value"');h[c]=!0;l.$viewValue==c&&(a.val(c),n.parent()&&n.remove())};m.removeOption=function(a){this.hasOption(a)&&(delete h[a],l.$viewValue==a&&this.renderUnknownOption(a))};m.renderUnknownOption=function(c){c="? "+Ka(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",
!0)};m.hasOption=function(a){return h.hasOwnProperty(a)};c.$on("$destroy",function(){m.renderUnknownOption=y})}],link:function(e,g,k,m){function h(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(z.parent()&&z.remove(),c.val(a),""===a&&v.prop("selected",!0)):D(a)&&v?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){z.parent()&&z.remove();d.$setViewValue(c.val())})})}function l(a,c,d){var e;d.$render=function(){var a=new ab(d.$viewValue);r(c.find("option"),
function(c){c.selected=A(a.get(c.value))})};a.$watch(function(){za(e,d.$viewValue)||(e=ga(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];r(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,g){function k(){var a={"":[]},c=[""],d,h,s,t,w;s=g.$modelValue;t=v(e)||[];var E=n?Zb(t):t,I,M,B;M={};B=!1;if(q)if(h=g.$modelValue,u&&H(h))for(B=new ab([]),d={},w=0;w<h.length;w++)d[m]=h[w],B.put(u(e,d),h[w]);else B=new ab(h);w=B;
var D,J;for(B=0;I=E.length,B<I;B++){h=B;if(n){h=E[B];if("$"===h.charAt(0))continue;M[n]=h}M[m]=t[h];d=p(e,M)||"";(h=a[d])||(h=a[d]=[],c.push(d));q?d=A(w.remove(u?u(e,M):r(e,M))):(u?(d={},d[m]=s,d=u(e,d)===u(e,M)):d=s===r(e,M),w=w||d);D=l(e,M);D=A(D)?D:"";h.push({id:u?u(e,M):n?E[B]:B,label:D,selected:d})}q||(x||null===s?a[""].unshift({id:"",label:"",selected:!w}):w||a[""].unshift({id:"?",label:"",selected:!0}));M=0;for(E=c.length;M<E;M++){d=c[M];h=a[d];z.length<=M?(s={element:y.clone().attr("label",
d),label:h.label},t=[s],z.push(t),f.append(s.element)):(t=z[M],s=t[0],s.label!=d&&s.element.attr("label",s.label=d));D=null;B=0;for(I=h.length;B<I;B++)d=h[B],(w=t[B+1])?(D=w.element,w.label!==d.label&&D.text(w.label=d.label),w.id!==d.id&&D.val(w.id=d.id),D[0].selected!==d.selected&&(D.prop("selected",w.selected=d.selected),R&&D.prop("selected",w.selected))):(""===d.id&&x?J=x:(J=C.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).text(d.label),t.push({element:J,label:d.label,
id:d.id,selected:d.selected}),D?D.after(J):s.element.append(J),D=J);for(B++;t.length>B;)t.pop().element.remove()}for(;z.length>M;)z.pop()[0].element.remove()}var h;if(!(h=s.match(d)))throw We("iexp",s,ha(f));var l=c(h[2]||h[1]),m=h[4]||h[6],n=h[5],p=c(h[3]||""),r=c(h[2]?h[1]:m),v=c(h[7]),u=h[8]?c(h[8]):null,z=[[{element:f,label:""}]];x&&(a(x)(e),x.removeClass("ng-scope"),x.remove());f.empty();f.on("change",function(){e.$apply(function(){var a,c=v(e)||[],d={},h,l,p,s,w,x,y;if(q)for(l=[],s=0,x=z.length;s<
x;s++)for(a=z[s],p=1,w=a.length;p<w;p++){if((h=a[p].element)[0].selected){h=h.val();n&&(d[n]=h);if(u)for(y=0;y<c.length&&(d[m]=c[y],u(e,d)!=h);y++);else d[m]=c[h];l.push(r(e,d))}}else if(h=f.val(),"?"==h)l=t;else if(""===h)l=null;else if(u)for(y=0;y<c.length;y++){if(d[m]=c[y],u(e,d)==h){l=r(e,d);break}}else d[m]=c[h],n&&(d[n]=h),l=r(e,d);g.$setViewValue(l);k()})});g.$render=k;e.$watchCollection(v,k);q&&e.$watchCollection(function(){return g.$modelValue},k)}if(m[1]){var p=m[0];m=m[1];var q=k.multiple,
s=k.ngOptions,x=!1,v,C=u(X.createElement("option")),y=u(X.createElement("optgroup")),z=C.clone();k=0;for(var w=g.children(),B=w.length;k<B;k++)if(""===w[k].value){v=x=w.eq(k);break}p.init(m,x,z);q&&(m.$isEmpty=function(a){return!a||0===a.length});s?n(e,g,m):q?l(e,g,m):h(e,g,m,p)}}}}],id=["$interpolate",function(a){var c={addOption:y,removeOption:y};return{restrict:"E",priority:100,compile:function(d,e){if(D(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var h=d.parent(),
l=h.data("$selectController")||h.parent().data("$selectController");l&&l.databound?d.prop("selected",!1):l=c;f?a.$watch(f,function(a,c){e.$set("value",a);a!==c&&l.removeOption(c);l.addOption(a)}):l.addOption(e.value);d.on("$destroy",function(){l.removeOption(e.value)})}}}}],hd=$({restrict:"E",terminal:!0});Q.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):((Da=Q.jQuery)&&Da.fn.on?(u=Da,B(Da.fn,{scope:La.scope,isolateScope:La.isolateScope,controller:La.controller,injector:La.injector,
inheritedData:La.inheritedData}),Gb("remove",!0,!0,!1),Gb("empty",!1,!1,!1),Gb("html",!1,!1,!0)):u=S,Ua.element=u,$c(Ua),u(X).ready(function(){Xc(X,fc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>');
//# sourceMappingURL=angular.min.js.map
;
{
"version":3,
"file":"angular.min.js",
"lineCount":201,
"mappings":"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",
"sources":["angular.js"],
"names":["window","document","undefined","minErr","isArrayLike","obj","isWindow","length","nodeType","isString","isArray","forEach","iterator","context","key","isFunction","hasOwnProperty","call","sortedKeys","keys","push","sort","forEachSorted","i","reverseParams","iteratorFn","value","nextUid","index","uid","digit","charCodeAt","join","String","fromCharCode","unshift","setHashKey","h","$$hashKey","extend","dst","arguments","int","str","parseInt","inherit","parent","extra","noop","identity","$","valueFn","isUndefined","isDefined","isObject","isNumber","isDate","toString","isRegExp","location","alert","setInterval","isElement","node","nodeName","on","find","map","results","list","indexOf","array","arrayRemove","splice","copy","source","destination","$evalAsync","$watch","ngMinErr","Date","getTime","RegExp","shallowCopy","src","charAt","equals","o1","o2","t1","t2","keySet","csp","securityPolicy","isActive","querySelector","bind","self","fn","curryArgs","slice","startIndex","apply","concat","toJsonReplacer","val","toJson","pretty","JSON","stringify","fromJson","json","parse","toBoolean","v","lowercase","startingTag","element","jqLite","clone","empty","e","elemHtml","append","html","TEXT_NODE","match","replace","tryDecodeURIComponent","decodeURIComponent","parseKeyValue","keyValue","key_value","split","toKeyValue","parts","arrayValue","encodeUriQuery","encodeUriSegment","pctEncodeSpaces","encodeURIComponent","angularInit","bootstrap","elements","appElement","module","names","NG_APP_CLASS_REGEXP","name","getElementById","querySelectorAll","exec","className","attributes","attr","modules","doBootstrap","injector","tag","$provide","createInjector","invoke","scope","compile","animate","$apply","data","NG_DEFER_BOOTSTRAP","test","angular","resumeBootstrap","angular.resumeBootstrap","extraModules","snake_case","separator","SNAKE_CASE_REGEXP","letter","pos","toLowerCase","assertArg","arg","reason","assertArgFn","acceptArrayAnnotation","constructor","assertNotHasOwnProperty","getter","path","bindFnToScope","lastInstance","len","getBlockElements","nodes","startNode","endNode","nextSibling","setupModuleLoader","$injectorMinErr","$$minErr","factory","requires","configFn","invokeLater","provider","method","insertMethod","invokeQueue","moduleInstance","runBlocks","config","run","block","camelCase","SPECIAL_CHARS_REGEXP","_","offset","toUpperCase","MOZ_HACK_REGEXP","jqLitePatchJQueryRemove","dispatchThis","filterElems","getterIfNoArguments","removePatch","param","filter","fireEvent","set","setIndex","setLength","childIndex","children","shift","triggerHandler","childLength","jQuery","originalJqFn","$original","JQLite","trim","jqLiteMinErr","div","createElement","innerHTML","removeChild","firstChild","jqLiteAddNodes","childNodes","fragment","createDocumentFragment","jqLiteClone","cloneNode","jqLiteDealoc","jqLiteRemoveData","jqLiteOff","type","unsupported","events","jqLiteExpandoStore","handle","eventHandler","removeEventListenerFn","expandoId","jqName","expandoStore","jqCache","$destroy","jqId","jqLiteData","isSetter","keyDefined","isSimpleGetter","jqLiteHasClass","selector","getAttribute","jqLiteRemoveClass","cssClasses","setAttribute","cssClass","jqLiteAddClass","existingClasses","root","jqLiteController","jqLiteInheritedData","ii","jqLiteEmpty","getBooleanAttrName","booleanAttr","BOOLEAN_ATTR","BOOLEAN_ELEMENTS","createEventHandler","event","preventDefault","event.preventDefault","returnValue","stopPropagation","event.stopPropagation","cancelBubble","target","srcElement","defaultPrevented","prevent","isDefaultPrevented","event.isDefaultPrevented","eventHandlersCopy","msie","elem","hashKey","objType","HashMap","put","annotate","$inject","fnText","STRIP_COMMENTS","argDecl","FN_ARGS","FN_ARG_SPLIT","FN_ARG","all","underscore","last","modulesToLoad","supportObject","delegate","provider_","providerInjector","instantiate","$get","providerCache","providerSuffix","factoryFn","loadModules","moduleFn","loadedModules","get","angularModule","_runBlocks","_invokeQueue","invokeArgs","message","stack","createInternalInjector","cache","getService","serviceName","INSTANTIATING","err","locals","args","Type","Constructor","returnedValue","prototype","instance","has","service","$injector","constant","instanceCache","decorator","decorFn","origProvider","orig$get","origProvider.$get","origInstance","instanceInjector","servicename","$AnchorScrollProvider","autoScrollingEnabled","disableAutoScrolling","this.disableAutoScrolling","$window","$location","$rootScope","getFirstAnchor","result","scroll","hash","elm","scrollIntoView","getElementsByName","scrollTo","autoScrollWatch","autoScrollWatchAction","Browser","$log","$sniffer","completeOutstandingRequest","outstandingRequestCount","outstandingRequestCallbacks","pop","error","startPoller","interval","setTimeout","check","pollFns","pollFn","pollTimeout","fireUrlChange","newLocation","lastBrowserUrl","url","urlChangeListeners","listener","rawDocument","history","clearTimeout","pendingDeferIds","isMock","$$completeOutstandingRequest","$$incOutstandingRequestCount","self.$$incOutstandingRequestCount","notifyWhenNoOutstandingRequests","self.notifyWhenNoOutstandingRequests","callback","addPollFn","self.addPollFn","href","baseElement","self.url","replaceState","pushState","urlChangeInit","onUrlChange","self.onUrlChange","hashchange","baseHref","self.baseHref","lastCookies","lastCookieString","cookiePath","cookies","self.cookies","cookieLength","cookie","escape","warn","cookieArray","unescape","substring","defer","self.defer","delay","timeoutId","cancel","self.defer.cancel","deferId","$BrowserProvider","$document","$CacheFactoryProvider","this.$get","cacheFactory","cacheId","options","refresh","entry","freshEnd","staleEnd","n","link","p","nextEntry","prevEntry","caches","size","stats","capacity","Number","MAX_VALUE","lruHash","lruEntry","remove","removeAll","destroy","info","cacheFactory.info","cacheFactory.get","$TemplateCacheProvider","$cacheFactory","$CompileProvider","$$sanitizeUriProvider","hasDirectives","Suffix","COMMENT_DIRECTIVE_REGEXP","CLASS_DIRECTIVE_REGEXP","EVENT_HANDLER_ATTR_REGEXP","directive","this.directive","registerDirective","directiveFactory","$exceptionHandler","directives","priority","require","controller","restrict","aHrefSanitizationWhitelist","this.aHrefSanitizationWhitelist","regexp","imgSrcSanitizationWhitelist","this.imgSrcSanitizationWhitelist","$interpolate","$http","$templateCache","$parse","$controller","$sce","$animate","$$sanitizeUri","$compileNodes","transcludeFn","maxPriority","ignoreDirective","previousCompileContext","nodeValue","wrap","compositeLinkFn","compileNodes","safeAddClass","publicLinkFn","cloneConnectFn","transcludeControllers","$linkNode","JQLitePrototype","eq","$element","addClass","nodeList","$rootElement","boundTranscludeFn","childLinkFn","$node","childScope","nodeListLength","stableNodeList","Array","linkFns","nodeLinkFn","$new","childTranscludeFn","transclude","createBoundTranscludeFn","attrs","linkFnFound","Attributes","collectDirectives","applyDirectivesToNode","terminal","transcludedScope","cloneFn","controllers","scopeCreated","$$transcluded","attrsMap","$attr","addDirective","directiveNormalize","nodeName_","nName","nAttrs","j","jj","attrStartName","attrEndName","specified","ngAttrName","NG_ATTR_BINDING","substr","directiveNName","addAttrInterpolateDirective","addTextInterpolateDirective","byPriority","groupScan","attrStart","attrEnd","depth","hasAttribute","$compileMinErr","groupElementsLinkFnWrapper","linkFn","compileNode","templateAttrs","jqCollection","originalReplaceDirective","preLinkFns","postLinkFns","addLinkFns","pre","post","newIsolateScopeDirective","$$isolateScope","cloneAndAnnotateFn","getControllers","elementControllers","retrievalMethod","optional","directiveName","linkNode","controllersBoundTransclude","cloneAttachFn","hasElementTranscludeDirective","isolateScope","$$element","LOCAL_REGEXP","templateDirective","$$originalDirective","definition","scopeName","attrName","mode","lastValue","parentGet","parentSet","compare","$$isolateBindings","$observe","$$observers","$$scope","literal","a","b","assign","parentValueWatch","parentValue","controllerDirectives","controllerInstance","controllerAs","$scope","scopeToChild","template","templateUrl","terminalPriority","newScopeDirective","nonTlbTranscludeDirective","hasTranscludeDirective","$compileNode","$template","$$start","$$end","directiveValue","assertNoDuplicate","$$tlb","createComment","replaceWith","replaceDirective","contents","denormalizeTemplate","newTemplateAttrs","templateDirectives","unprocessedDirectives","markDirectivesAsIsolate","mergeTemplateAttributes","compileTemplateUrl","Math","max","tDirectives","startAttrName","endAttrName","srcAttr","dstAttr","$set","tAttrs","linkQueue","afterTemplateNodeLinkFn","afterTemplateChildLinkFn","beforeTemplateCompileNode","origAsyncDirective","derivedSyncDirective","getTrustedResourceUrl","success","content","childBoundTranscludeFn","tempTemplateAttrs","beforeTemplateLinkNode","linkRootElement","oldClasses","response","code","headers","delayedNodeLinkFn","ignoreChildLinkFn","rootElement","diff","what","previousDirective","text","interpolateFn","textInterpolateLinkFn","bindings","interpolateFnWatchAction","getTrustedContext","attrNormalizedName","HTML","RESOURCE_URL","attrInterpolatePreLinkFn","$$inter","newValue","oldValue","$updateClass","elementsToRemove","newNode","firstElementToRemove","removeCount","parentNode","j2","replaceChild","appendChild","expando","k","kk","annotation","$addClass","classVal","$removeClass","removeClass","newClasses","tokenDifference","writeAttr","booleanKey","prop","removeAttr","listeners","startSymbol","endSymbol","PREFIX_REGEXP","str1","str2","values","tokens1","tokens2","token","$ControllerProvider","CNTRL_REG","register","this.register","expression","identifier","$DocumentProvider","$ExceptionHandlerProvider","exception","cause","parseHeaders","parsed","line","headersGetter","headersObj","transformData","fns","$HttpProvider","JSON_START","JSON_END","PROTECTION_PREFIX","CONTENT_TYPE_APPLICATION_JSON","defaults","d","interceptorFactories","interceptors","responseInterceptorFactories","responseInterceptors","$httpBackend","$browser","$q","requestConfig","transformResponse","resp","status","reject","transformRequest","mergeHeaders","execHeaders","headerContent","headerFn","header","defHeaders","reqHeaders","defHeaderName","reqHeaderName","common","lowercaseDefHeaderName","uppercase","xsrfValue","urlIsSameOrigin","xsrfCookieName","xsrfHeaderName","chain","serverRequest","reqData","withCredentials","sendReq","then","promise","when","reversedInterceptors","interceptor","request","requestError","responseError","thenFn","rejectFn","promise.success","promise.error","done","headersString","resolvePromise","$$phase","deferred","resolve","removePendingReq","idx","pendingRequests","cachedResp","buildUrl","params","defaultCache","timeout","responseType","interceptorFactory","responseFn","createShortMethods","createShortMethodsWithData","createXhr","XMLHttpRequest","ActiveXObject","$HttpBackendProvider","createHttpBackend","callbacks","$browserDefer","jsonpReq","script","doneWrapper","onreadystatechange","onload","onerror","body","script.onreadystatechange","readyState","script.onerror","ABORTED","timeoutRequest","jsonpDone","xhr","abort","completeRequest","callbackId","counter","open","setRequestHeader","xhr.onreadystatechange","responseHeaders","getAllResponseHeaders","responseText","send","$InterpolateProvider","this.startSymbol","this.endSymbol","mustHaveExpression","trustedContext","endIndex","hasInterpolation","startSymbolLength","exp","endSymbolLength","$interpolateMinErr","part","getTrusted","valueOf","newErr","$interpolate.startSymbol","$interpolate.endSymbol","$IntervalProvider","count","invokeApply","clearInterval","iteration","skipApply","$$intervalId","tick","notify","intervals","interval.cancel","$LocaleProvider","short","pluralCat","num","encodePath","segments","parseAbsoluteUrl","absoluteUrl","locationObj","appBase","parsedUrl","urlResolve","$$protocol","protocol","$$host","hostname","$$port","port","DEFAULT_PORTS","parseAppUrl","relativeUrl","prefixed","$$path","pathname","$$search","search","$$hash","beginsWith","begin","whole","stripHash","stripFile","lastIndexOf","LocationHtml5Url","basePrefix","$$html5","appBaseNoFile","$$parse","this.$$parse","pathUrl","$locationMinErr","$$compose","this.$$compose","$$url","$$absUrl","$$rewrite","this.$$rewrite","appUrl","prevAppUrl","LocationHashbangUrl","hashPrefix","withoutBaseUrl","withoutHashUrl","windowsFilePathExp","firstPathSegmentMatch","LocationHashbangInHtml5Url","locationGetter","property","locationGetterSetter","preprocess","$LocationProvider","html5Mode","this.hashPrefix","prefix","this.html5Mode","afterLocationChange","oldUrl","$broadcast","absUrl","initialUrl","LocationMode","ctrlKey","metaKey","which","absHref","animVal","rewrittenUrl","newUrl","$digest","changeCounter","$locationWatch","currentReplace","$$replace","$LogProvider","debug","debugEnabled","this.debugEnabled","flag","formatError","Error","sourceURL","consoleLog","console","logFn","log","hasApply","arg1","arg2","ensureSafeMemberName","fullExpression","$parseMinErr","ensureSafeObject","setter","setValue","fullExp","propertyObj","unwrapPromises","promiseWarning","$$v","cspSafeGetterFn","key0","key1","key2","key3","key4","cspSafePromiseEnabledGetter","pathVal","cspSafeGetter","simpleGetterFn1","simpleGetterFn2","getterFn","getterFnCache","pathKeys","pathKeysLength","evaledFnGetter","Function","$ParseProvider","$parseOptions","this.unwrapPromises","logPromiseWarnings","this.logPromiseWarnings","$filter","promiseWarningCache","parsedExpression","lexer","Lexer","parser","Parser","$QProvider","qFactory","nextTick","exceptionHandler","defaultCallback","defaultErrback","pending","ref","createInternalRejectedPromise","progress","errback","progressback","wrappedCallback","wrappedErrback","wrappedProgressback","catch","finally","makePromise","resolved","handleCallback","isResolved","callbackOutput","promises","$RootScopeProvider","TTL","$rootScopeMinErr","lastDirtyWatch","digestTtl","this.digestTtl","Scope","$id","$parent","$$watchers","$$nextSibling","$$prevSibling","$$childHead","$$childTail","$root","$$destroyed","$$asyncQueue","$$postDigestQueue","$$listeners","$$listenerCount","beginPhase","phase","compileToFn","decrementListenerCount","current","initWatchVal","isolate","child","ChildScope","watchExp","objectEquality","watcher","listenFn","watcher.fn","newVal","oldVal","originalFn","$watchCollection","changeDetected","objGetter","internalArray","internalObject","oldLength","$watchCollectionWatch","newLength","$watchCollectionAction","watch","watchers","asyncQueue","postDigestQueue","dirty","ttl","watchLog","logIdx","logMsg","asyncTask","$eval","isNaN","next","expr","$$postDigest","$on","namedListeners","$emit","listenerArgs","array1","currentScope","$$SanitizeUriProvider","sanitizeUri","uri","isImage","regex","normalizedVal","adjustMatcher","matcher","$sceMinErr","adjustMatchers","matchers","adjustedMatchers","$SceDelegateProvider","SCE_CONTEXTS","resourceUrlWhitelist","resourceUrlBlacklist","this.resourceUrlWhitelist","this.resourceUrlBlacklist","generateHolderType","Base","holderType","trustedValue","$$unwrapTrustedValue","this.$$unwrapTrustedValue","holderType.prototype.valueOf","holderType.prototype.toString","htmlSanitizer","trustedValueHolderBase","byType","CSS","URL","JS","trustAs","maybeTrusted","allowed","$SceProvider","enabled","this.enabled","$sceDelegate","msieDocumentMode","sce","isEnabled","sce.isEnabled","sce.getTrusted","parseAs","sce.parseAs","sceParseAsTrusted","enumValue","lName","$SnifferProvider","eventSupport","android","userAgent","navigator","boxee","documentMode","vendorPrefix","vendorRegex","bodyStyle","style","transitions","animations","webkitTransition","webkitAnimation","hasEvent","divElm","$TimeoutProvider","deferreds","$$timeoutId","timeout.cancel","base","urlParsingNode","host","requestUrl","originUrl","$WindowProvider","$FilterProvider","filters","suffix","currencyFilter","dateFilter","filterFilter","jsonFilter","limitToFilter","lowercaseFilter","numberFilter","orderByFilter","uppercaseFilter","comparator","comparatorType","predicates","predicates.check","objKey","filtered","$locale","formats","NUMBER_FORMATS","amount","currencySymbol","CURRENCY_SYM","formatNumber","PATTERNS","GROUP_SEP","DECIMAL_SEP","number","fractionSize","pattern","groupSep","decimalSep","isFinite","isNegative","abs","numStr","formatedText","hasExponent","toFixed","fractionLen","min","minFrac","maxFrac","pow","round","fraction","lgroup","lgSize","group","gSize","negPre","posPre","negSuf","posSuf","padNumber","digits","neg","dateGetter","date","dateStrGetter","shortForm","jsonStringToDate","string","R_ISO8601_STR","tzHour","tzMin","dateSetter","setUTCFullYear","setFullYear","timeSetter","setUTCHours","setHours","m","s","ms","parseFloat","format","DATETIME_FORMATS","NUMBER_STRING","DATE_FORMATS_SPLIT","DATE_FORMATS","object","input","limit","out","sortPredicate","reverseOrder","reverseComparator","comp","descending","predicate","v1","v2","arrayCopy","ngDirective","FormController","toggleValidCss","isValid","validationErrorKey","INVALID_CLASS","VALID_CLASS","form","parentForm","nullFormCtrl","invalidCount","errors","$error","controls","$name","ngForm","$dirty","$pristine","$valid","$invalid","$addControl","PRISTINE_CLASS","form.$addControl","control","$removeControl","form.$removeControl","queue","validationToken","$setValidity","form.$setValidity","$setDirty","form.$setDirty","DIRTY_CLASS","$setPristine","form.$setPristine","validate","ctrl","validatorName","validity","textInputType","composing","ngTrim","$viewValue","$setViewValue","deferListener","keyCode","$render","ctrl.$render","$isEmpty","ngPattern","patternValidator","patternObj","$formatters","$parsers","ngMinlength","minlength","minLengthValidator","ngMaxlength","maxlength","maxLengthValidator","classDirective","ngClassWatchAction","$index","flattenClasses","classes","old$index","mod","Object","version","addEventListenerFn","addEventListener","attachEvent","removeEventListener","detachEvent","ready","trigger","fired","removeAttribute","css","currentStyle","lowercasedName","getNamedItem","ret","getText","textProp","NODE_TYPE_TEXT_PROPERTY","$dv","multiple","option","selected","onFn","eventFns","contains","compareDocumentPosition","adown","documentElement","bup","eventmap","related","relatedTarget","one","off","replaceNode","insertBefore","prepend","wrapNode","after","newElement","toggleClass","condition","nextElementSibling","getElementsByTagName","eventName","eventData","arg3","unbind","$animateMinErr","$AnimateProvider","$$selectors","classNameFilter","this.classNameFilter","$$classNameFilter","$timeout","enter","leave","move","PATH_MATCH","paramValue","OPERATORS","null","true","false","+","-","*","/","%","^","===","!==","==","!=","<",">","<=",">=","&&","||","&","|","!","ESCAPE","lex","ch","lastCh","tokens","is","readString","peek","readNumber","isIdent","readIdent","was","isWhitespace","ch2","ch3","fn2","fn3","throwError","chars","isExpOperator","start","end","colStr","peekCh","ident","lastDot","peekIndex","methodName","quote","rawString","hex","rep","ZERO","Parser.ZERO","assignment","logicalOR","functionCall","fieldAccess","objectIndex","filterChain","this.filterChain","primary","statements","expect","consume","arrayDeclaration","msg","peekToken","e1","e2","e3","e4","t","unaryFn","right","ternaryFn","left","middle","binaryFn","statement","argsFn","fnInvoke","ternary","logicalAND","equality","relational","additive","multiplicative","unary","field","indexFn","o","safe","contextGetter","fnPtr","elementFns","allConstant","elementFn","keyValues","ampmGetter","getHours","AMPMS","timeZoneGetter","zone","getTimezoneOffset","paddedZone","htmlAnchorDirective","xlinkHref","ngAttributeAliasDirectives","propName","normalized","ngBooleanAttrWatchAction","formDirectiveFactory","isNgForm","formDirective","formElement","action","preventDefaultListener","parentFormCtrl","alias","ngFormDirective","URL_REGEXP","EMAIL_REGEXP","NUMBER_REGEXP","inputType","numberInputType","minValidator","maxValidator","urlInputType","urlValidator","emailInputType","emailValidator","radioInputType","checked","checkboxInputType","trueValue","ngTrueValue","falseValue","ngFalseValue","ctrl.$isEmpty","inputDirective","NgModelController","$modelValue","NaN","$viewChangeListeners","ngModelGet","ngModel","ngModelSet","this.$isEmpty","inheritedData","this.$setValidity","this.$setPristine","this.$setViewValue","ngModelWatch","formatters","ngModelDirective","ctrls","modelCtrl","formCtrl","ngChangeDirective","ngChange","requiredDirective","required","validator","ngListDirective","ngList","viewValue","CONSTANT_VALUE_REGEXP","ngValueDirective","tpl","tplAttr","ngValue","ngValueConstantLink","ngValueLink","valueWatchAction","ngBindDirective","ngBind","ngBindWatchAction","ngBindTemplateDirective","ngBindTemplate","ngBindHtmlDirective","ngBindHtml","getStringValue","ngBindHtmlWatchAction","getTrustedHtml","ngClassDirective","ngClassOddDirective","ngClassEvenDirective","ngCloakDirective","ngControllerDirective","ngEventDirectives","ngIfDirective","$transclude","ngIf","ngIfWatchAction","ngIncludeDirective","$anchorScroll","srcExp","ngInclude","onloadExp","autoScrollExp","autoscroll","currentElement","cleanupLastIncludeContent","parseAsResourceUrl","ngIncludeWatchAction","afterAnimation","thisChangeId","newScope","ngIncludeFillContentDirective","$compile","ngInitDirective","ngInit","ngNonBindableDirective","ngPluralizeDirective","BRACE","numberExp","whenExp","whens","whensExpFns","isWhen","attributeName","ngPluralizeWatch","ngPluralizeWatchAction","ngRepeatDirective","ngRepeatMinErr","ngRepeat","trackByExpGetter","trackByIdExpFn","trackByIdArrayFn","trackByIdObjFn","valueIdentifier","keyIdentifier","hashFnLocals","lhs","rhs","trackByExp","lastBlockMap","ngRepeatAction","collection","previousNode","nextNode","nextBlockMap","arrayLength","collectionKeys","nextBlockOrder","trackByIdFn","trackById","id","$first","$last","$middle","$odd","$even","ngShowDirective","ngShow","ngShowWatchAction","ngHideDirective","ngHide","ngHideWatchAction","ngStyleDirective","ngStyle","ngStyleWatchAction","newStyles","oldStyles","ngSwitchDirective","ngSwitchController","cases","selectedTranscludes","selectedElements","selectedScopes","ngSwitch","ngSwitchWatchAction","change","selectedTransclude","selectedScope","caseElement","anchor","ngSwitchWhenDirective","ngSwitchWhen","ngSwitchDefaultDirective","ngTranscludeDirective","$attrs","scriptDirective","ngOptionsMinErr","ngOptionsDirective","selectDirective","NG_OPTIONS_REGEXP","nullModelCtrl","optionsMap","ngModelCtrl","unknownOption","databound","init","self.init","ngModelCtrl_","nullOption_","unknownOption_","addOption","self.addOption","removeOption","self.removeOption","hasOption","renderUnknownOption","self.renderUnknownOption","unknownVal","self.hasOption","setupAsSingle","selectElement","selectCtrl","ngModelCtrl.$render","emptyOption","setupAsMultiple","lastView","items","selectMultipleWatch","setupAsOptions","render","optionGroups","optionGroupNames","optionGroupName","optionGroup","existingParent","existingOptions","modelValue","valuesFn","keyName","groupIndex","selectedSet","lastElement","trackFn","trackIndex","valueName","groupByFn","modelCast","label","displayFn","nullOption","groupLength","optionGroupsCache","optGroupTemplate","existingOption","optionTemplate","optionsExp","track","optionElement","ngOptions","ngModelCtrl.$isEmpty","optionDirective","nullSelectCtrl","selectCtrlName","interpolateWatchAction","styleDirective","publishExternalAPI","ngModule","$$csp"]
}
;
var myStore = angular.module("myStore", []);

myStore.controller("ordersController", ['$scope', '$http', function($scope, $http){
	$scope.completed_orders = gon.completed_orders;
	$scope.current_orders = gon.current_orders;
	$scope.cancelled_orders = gon.cancelled_orders;
	$scope.all_products = gon.products;
	this.tab = 1;
	$scope.search_product = function(key){
		for (var i in $scope.all_products) {
			if ($scope.all_products[i].id == key){
				return $scope.all_products[i].title;
			};
		};
	};

	$scope.cancel_order = function(num){
		var postData = { 'id': $scope.current_orders[num].id , 'statusCode': '訂單取消'};
		$http.post('/admin/orders/change_order_status' , postData);
		$scope.current_orders[num].status = "取消";
		$scope.cancelled_orders.push($scope.current_orders[num]);
		$scope.current_orders.splice(num,1);
	};

	$scope.recover_order = function(num){
		var postData = { 'id': $scope.cancelled_orders[num].id , 'statusCode': '恢復下訂'};
		$http.post('/admin/orders/change_order_status' , postData).success(function(response){
			if (response.result == 'success' ) {
				$scope.cancelled_orders[num].status = "下訂";
				$scope.current_orders.push($scope.cancelled_orders[num]);
				$scope.cancelled_orders.splice(num,1);				
			} else {
				alert("已無庫存，無法恢復訂單");
			};
		});

	};	

	$scope.done_order = function(num){
		var postData = { 'id': $scope.current_orders[num].id , 'statusCode': '訂單完成'};
		$http.post('/admin/orders/change_order_status' , postData);
		$scope.current_orders[num].status = "完成";
		$scope.completed_orders.push($scope.current_orders[num]);
		$scope.current_orders.splice(num,1);
	};

	$scope.undone_order = function(num){
		var postData = { 'id': $scope.completed_orders[num].id , 'statusCode': '改為下訂'};
		$http.post('/admin/orders/change_order_status' , postData);
		$scope.completed_orders[num].status = "完成";
		$scope.current_orders.push($scope.completed_orders[num]);
		$scope.completed_orders.splice(num,1);
	};

}]);

myStore.controller("listController", ['$scope', function($scope){
	this.list = gon.products;
	this.category = gon.category;
	this.c_list = gon.category_dropdown;
	$scope.selection = "顯示全部";
	console.log(gon.category);
	console.log(this.category);

	// 填入各項product的category title
	for (i = 0; i < this.list.length; i++) {		
			for (j = 0; j < this.category.length; j++) {
				if (this.list[i].id === this.category[j][0]) {
					this.list[i].category = this.category[j][1];
				};
			};
	};

	this.specific_product = {
		"id": 0,
		"title": "",
		"link": "",
		"description": "",
		"default_image": "",
		"comments": ""
	};
	this.show = false;
	this.demonstrate_product = function(num) {
		this.show = true;
		var the_id = 0;
		for (i = 0; i < this.list.length; i++) {
			if (this.list[i].id == num) {
				this.specific_product = {
					"id": this.list[i].id,
					"title": this.list[i].title,
					"link": this.list[i].link,
					"description": this.list[i].description,
					"default_image": this.list[i].default_image,
					"comments": this.list[i].comments
				};
			};
		$('#specific_product_id').val(this.list[i].id);
		};	

	};



}]);

myStore.controller("productController", ['$scope', function($scope){
	this.specific_product = gon.specific_product;
	this.specific_product.category = gon.category
}]);	
/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.2.0",d.prototype.close=function(b){function c(){f.detach().trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",c).emulateTransitionEnd(150):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.2.0",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),d[e](null==f[b]?this.options[b]:f[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b).on("keydown.bs.carousel",a.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.2.0",c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},c.prototype.keydown=function(a){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.to=function(b){var c=this,d=this.getItemIndex(this.$active=this.$element.find(".item.active"));return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=e[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:g});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,f&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(e)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:g});return a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one("bsTransitionEnd",function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger(m)),f&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(b=!b),e||d.data("bs.collapse",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};c.VERSION="3.2.0",c.DEFAULTS={toggle:!0},c.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},c.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var c=a.Event("show.bs.collapse");if(this.$element.trigger(c),!c.isDefaultPrevented()){var d=this.$parent&&this.$parent.find("> .panel > .in");if(d&&d.length){var e=d.data("bs.collapse");if(e&&e.transitioning)return;b.call(d,"hide"),e||d.data("bs.collapse",null)}var f=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[f](0),this.transitioning=1;var g=function(){this.$element.removeClass("collapsing").addClass("collapse in")[f](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return g.call(this);var h=a.camelCase(["scroll",f].join("-"));this.$element.one("bsTransitionEnd",a.proxy(g,this)).emulateTransitionEnd(350)[f](this.$element[0][h])}}},c.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},c.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var d=a.fn.collapse;a.fn.collapse=b,a.fn.collapse.Constructor=c,a.fn.collapse.noConflict=function(){return a.fn.collapse=d,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(c){var d,e=a(this),f=e.attr("data-target")||c.preventDefault()||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),g=a(f),h=g.data("bs.collapse"),i=h?"toggle":e.data(),j=e.attr("data-parent"),k=j&&a(j);h&&h.transitioning||(k&&k.find('[data-toggle="collapse"][data-parent="'+j+'"]').not(e).addClass("collapsed"),e[g.hasClass("in")?"addClass":"removeClass"]("collapsed")),b.call(g,i)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.2.0",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f+', [role="menu"], [role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.2.0",c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(c.$body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one("bsTransitionEnd",function(){c.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(300):c.$element.trigger("focus").trigger(e)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;if(this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;e?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(150):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var f=function(){c.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",f).emulateTransitionEnd(150):f()}else b&&b()},c.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.2.0",c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var c=a.contains(document.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!c)return;var d=this,e=this.tip(),f=this.getUID(this.type);this.setContent(),e.attr("id",f),this.$element.attr("aria-describedby",f),this.options.animation&&e.addClass("fade");var g="function"==typeof this.options.placement?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,h=/\s?auto?\s?/i,i=h.test(g);i&&(g=g.replace(h,"")||"top"),e.detach().css({top:0,left:0,display:"block"}).addClass(g).data("bs."+this.type,this),this.options.container?e.appendTo(this.options.container):e.insertAfter(this.$element);var j=this.getPosition(),k=e[0].offsetWidth,l=e[0].offsetHeight;if(i){var m=g,n=this.$element.parent(),o=this.getPosition(n);g="bottom"==g&&j.top+j.height+l-o.scroll>o.height?"top":"top"==g&&j.top-o.scroll-l<0?"bottom":"right"==g&&j.right+k>o.width?"left":"left"==g&&j.left-k<o.left?"right":g,e.removeClass(m).addClass(g)}var p=this.getCalculatedOffset(g,j,k,l);this.applyPlacement(p,g);var q=function(){d.$element.trigger("shown.bs."+d.type),d.hoverState=null};a.support.transition&&this.$tip.hasClass("fade")?e.one("bsTransitionEnd",q).emulateTransitionEnd(150):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=k.left?2*k.left-e+i:2*k.top-f+j,m=k.left?"left":"top",n=k.left?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(l,d[0][n],m)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one("bsTransitionEnd",b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName;return a.extend({},"function"==typeof c.getBoundingClientRect?c.getBoundingClientRect():null,{scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop(),width:d?a(window).width():b.outerWidth(),height:d?a(window).height():b.outerHeight()},d?{top:0,left:0}:b.offset())},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.2.0",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").empty()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.2.0",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.2.0",c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.closest("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},c.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one("bsTransitionEnd",e).emulateTransitionEnd(150):e(),f.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(c){c.preventDefault(),b.call(a(this),"show")})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.2.0",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=a(document).height(),d=this.$target.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=b-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){null!=this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:b-this.$element.height()-h}))}}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},d.offsetBottom&&(d.offset.bottom=d.offsetBottom),d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
(function() {


}).call(this);

(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//



;
