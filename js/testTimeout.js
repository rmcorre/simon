// var clicked = 1;

// function sto_checkForClick(checkForClick_delay) {
//     timeout1 = setTimeout(function () {
//         if (clicked === undefined) {
//             // sto_blink(2, "!!", 0);
//             // sto_count(2500);
//             // sto_genPattern(4000);
//         } else {
//             clearTimeout(timeout1);
//             clicked = undefined;
//         }
//         timeout1 = setTimeout(sto_checkForClick, 1000);        
//     }, checkForClick_delay);
// }

// sto_checkForClick(1000);

function hello(helloDelay) {
    setTimeout(function () {
        console.log("hello");
    }, helloDelay);
}


function goodbye(goodbyeDelay) {
    setTimeout(function () {
        console.log("goodbye");
    }, goodbyeDelay);
}


function begin() {
    hello(1000);
    goodbye(2000);
}


begin();