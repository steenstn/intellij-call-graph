let test = (functionToTest, input, expectedOutput) => {
    let output = functionToTest(input)
    if (output !== expectedOutput) {
        throw new Error("Expected:\n" + expectedOutput + "\n\nActual\n" + output);
    } else {
        console.log("yay")
    }
}
;

for(let i = 0; i < replaceLineTestCases.length;i+=2) {
    test(replaceLine, replaceLineTestCases[i], replaceLineTestCases[i+1]);
}
document.getElementById("test_results").innerText =  "replaceLine tests passed\n";


for(let i = 0; i < fullTestCases.length;i+=2) {
    test(parseCallGraph, fullTestCases[i], fullTestCases[i+1]);
}
document.getElementById("test_results").innerText +=  "parseCallGraph tests passed";
