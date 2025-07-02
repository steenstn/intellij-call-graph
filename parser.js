
let replaceLine = (line) => {
    let regexes = [
        /(\w+\.\w+)\(.*\)/,
        /(\w+)\(.*\).*in (\w*)/,
        /in (\w*\.\w+)/
    ];

    let result = line;
    regexes.forEach(regex => {
        let match = line.match(regex);
        if(line.match(regex)) {
            result = match.length == 3 ? ""+match[2] + "." + match[1] : match[1];
        }
    });
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
        if (!line) {
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
