module.exports = function check(str, bracketsConfig) {
    var bracketsLeftTemplate = generateLeftBracketsTemplate(bracketsConfig);
    var bracketsRightTemplate = generateRightBracketsTemplate(bracketsConfig);
    // String with odd number of brackets is not suitable
    if (str.length % 2 !== 0) {
        return false;
    }
    var stack = [];
    for (var i = 0; i < str.length; i++) {
        var topElement = stack[stack.length - 1];
        var topElementIndex = bracketsLeftTemplate.indexOf(topElement);
        var bracket = str[i];
        var bracketIndex = bracketsRightTemplate.indexOf(bracket);
        // If stack is empty
        if (!topElement) {
            stack.push(bracket);
            continue;
        }
        // Elements with equal indices correspond to left and right bracket of the same type.
        // If such elements were found we remove top element from stack.
        // Elements that were not found are excluded (such elements has -1 index).
        if (topElementIndex === bracketIndex && topElementIndex >= 0) {
            stack.pop();
        } else {
            stack.push(bracket);
        }
    }
    return !(stack.length > 0);

    // Generate array of type [(,[,{,|]
    function generateLeftBracketsTemplate(arr) {
        var result = [];
        for (var j = 0; j < arr.length; j++) {
            result.push(arr[j][0]);
        }
        return result;
    }
    // Generate array of type [),],},|]
    function generateRightBracketsTemplate(arr) {
        var result = [];
        for (var j = 0; j < arr.length; j++) {
            result.push(arr[j][1]);
        }
        return result;
    }
};