var OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
    "rules": {
        "semi": [ WARN, "always" ],
        "max-len": [ WARN, { "code": 80 } ],
        "quotes": [ WARN, "single", {
        	"allowTemplateLiterals": true,
        	"avoidEscape": true
        }],
        "no-unused-vars": [ WARN, { "ignoreRestSiblings": true }],
        "indent": [ WARN, 2]
    }
};
