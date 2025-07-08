let assertEquals = (actual, expected) => {
    if (actual !== expected) {
        throw new Error("Expected:\n" + expected + "\n\nActual\n" + actual);
    }
}

let test = (functionToTest, input) => {
    let i;
    for(i = 0; i < input.length; i+=2) {
        let output = functionToTest(input[i])
        assertEquals(output, input[i+1])
    }

    document.getElementById("test_results").innerText +=  "\n" + i + " tests passed";
}

test(replaceLine, replaceLineTestCases);
test(parseCallGraph, fullTestCases);

document.getElementById("test_results").innerText +=  "\nAll test passed" ;
