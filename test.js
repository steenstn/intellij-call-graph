let assertEquals = (actual, expected) => {
    if (actual !== expected) {
        throw new Error("Expected:\n" + expected + "\n\nActual\n" + actual);
    }
}
let test = (functionToTest, input) => {
    let i = 0;
    for(i = 0; i < input.length; i+=2) {
        let output = functionToTest(input[i])
        assertEquals(output, input[i+1])
    }
}

test(replaceLine, replaceLineTestCases);
document.getElementById("test_results").innerText =  "replaceLine tests passed\n";

test(parseCallGraph, fullTestCases);
document.getElementById("test_results").innerText +=  "parseCallGraph tests passed";
