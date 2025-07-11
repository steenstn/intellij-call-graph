
let regexes = new Map();
let replaceRegex = /[, ]/gi;
regexes.set(/(\w+\.\w+)\((.*)\)\(/, (matches) => matches[1] + matches[2].replaceAll(replaceRegex, "") + "[\"" + matches[1] + "(" + matches[2] + ")\"]");
regexes.set(/(\w+\.\w+)\((.*)\)  /, (matches) => matches[1] + matches[2].replaceAll(replaceRegex, "") + "[\"" + matches[1] + "(" + matches[2] + ")\"]");
regexes.set(/(\w+)\((.*)\).*in (\w*)/, (matches) => `${matches[3]}.${matches[1]}${matches[2].replaceAll(replaceRegex, "")}["${matches[3]}.${matches[1]}(${matches[2]})"]`);
regexes.set(/in (\w*\.\w+)/, (match) => match[1]);
regexes.set(/(\w+\.\w+)/, (match) => match[1]);

const entries = Array.from(regexes.entries());

let replaceLine = (line) => {
    let result = line;
    for (let i = 0; i < entries.length; i++) {
        const [regex, mappingFunction] = entries[i];
        let match = line.match(regex);

        if (match) {
            result = mappingFunction(match).replaceAll(/[<>]/gi, "");
            break;
        }
    }
    return result;

}

let parseCallGraph = (input) => {
    let lines = input.split('\n');
    let callStack = [];
    callStack.push("target");
    let currentIndentation = 0;

    let output = "graph TD\n";
    let lastLine = callStack[0];
    lines.forEach(line => {
        if (!line || line.trim() === '') {
            return;
        }
        let replacedLine = replaceLine(line);
        let indentation = line.search(/\w/);
        indentation /= 4;

        if (indentation > currentIndentation) {
            currentIndentation = indentation;
            callStack.push(lastLine);

        }
        if (indentation < currentIndentation) {
            let diff = currentIndentation - indentation;
            currentIndentation = indentation;
            for (let i = 0; i < diff; i++) {
                callStack.pop();
            }
        }
        output += replacedLine + " --> " + callStack[currentIndentation] + "\n";

        lastLine = replacedLine;
    });

    return output;
}
