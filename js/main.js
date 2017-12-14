(function () {
    var on = false;
    var strict = false; //check if strict is a reserved word
    var playerArr = [];
    var patternArr = [];
    var patternLength = 1;
    var patternIndex = 0;  
    var num = 0; //consider renaming this to something more specific
    var pad = null;
    var element = null;
    var padClicked = 0; //Holds the string value of the data-id attribute of the pad clicked: Green = "1", Red = "2", Blue = "3",  yellow = "4"
    var tone = null;
    var padGroupOnStatus = false;

    var checkForClickId = null; //check if setTimeout returns an object type or a number type
    var genPatternId = null;
    var flashId = null;
    var displayId1 = null;
    var displayId2 = null;
    var padGroupOnId = null;    

    //cache dom
    var simon = $("#simon");
    var displayText = simon.find("#displayText");
    var startButton = simon.find("#startButton");
    var strictButton = simon.find("#strictButton");
    var powerSwitch = simon.find("#powerSwitch");
    var buttonOff = simon.find("#buttonOff");
    var buttonOn = simon.find("#buttonOn");    
    var padGroup = simon.find(".pad");


    powerSwitch.on("click", onOff);


    function onOff() {
        if (!on) {
            //initialize "on" state
            on = true;
            buttonOff.css("visibility", "hidden");
            buttonOn.css("visibility", "visible");
            displayText.text("--");
            startButton.on("click", start);
            strictButton.on("click", strictPlay);

            console.groupCollapsed("%cfunction on/off %con = %c" + on, "color: blue;", "color: black;", "color: chocolate;");
                console.log("%cdisplayText.text('--');", "color: gray");
                console.log("%cstartButton.on('click', start);", "color: gray");
                console.log("%cstrictButton.on('click', strictPlay);", "color: gray");
                console.log("padGroupOnStatus = %c" + padGroupOnStatus, "color: chocolate;");
            console.groupEnd();
        }
        else {
            //initialize "off" state
            on = false;
            buttonOff.css("visibility", "visible");
            buttonOn.css("visibility", "hidden");
            displayText.text("");
            startButton.off();
            strictButton.off();
            padGroupOff();

            //reset variables
            strict = false;
            playerArr.length = 0;
            patternArr.length = 0;
            patternLength = 1;
            patternIndex = 0;
            num = 0;
            pad = null;
            element = null;
            padClicked = 0;
            tone = null;

            //reset timeouts
            clearTimeout(checkForClickId);
            checkForClickId = null;
            clearTimeout(genPatternId);
            genPatternId = null;
            clearTimeout(flashId);
            flashId = null;
            clearTimeout(displayId1);
            displayId1 = null;
            clearTimeout(displayId2);
            displayId2 = null;
            clearTimeout(padGroupOnId);
            padGroupOnId = null;

            console.groupCollapsed("%cfunction on/off %con = %c" + on, "color: blue;", "color: black;", "color: chocolate;");
                console.log("%cdisplayText.text('');", "color: gray");
                console.log("%cstartButton.off();", "color: gray");
                console.log("%cstrictButton.off();", "color: gray");
                console.log("strict = %c" + strict, "color: chocolate;");
                console.log("playerArr.length = %c" + playerArr.length, "color: chocolate;");
                console.log("patternArr.length = %c" + patternArr.length, "color: chocolate;");
                console.log("patternLength = %c" + patternLength, "color: chocolate;");
                console.log("patternIndex = %c" + patternIndex, "color: chocolate;");
                console.log("num = %c" + num, "color: chocolate;");
                console.log("pad = %c" + pad, "color: chocolate;");
                console.log("element = %c" + element, "color: chocolate;");
                console.log("padClicked = %c" + padClicked, "color: chocolate;");
                console.log("tone = %c" + tone, "color: chocolate;");
                console.log("padGroupOnStatus = %c" + padGroupOnStatus, "color: chocolate;");
            console.groupEnd();
        }
        return;
    }


    function start() {
        clearTimeout(checkForClickId);
        checkForClickId = null;
        clearTimeout(genPatternId);
        genPatternId = null;
        clearTimeout(flashId);
        flashId = null;
        clearTimeout(displayId1);
        displayId1 = null;
        clearTimeout(displayId2);
        displayId2 = null;
        
        strict = false;
        playerArr.length = 0;
        patternArr.length = 0;
        patternLength = 1;
        patternIndex = 0;
        num = 0;
        pad = null;
        element = null;
        padClicked = 0;
        tone = null;
        padGroupOnStatus = false;

        getPattern();
        output("--", 2, 0);
        output(patternLength, 0, 2000);
        genPattern(patternIndex, patternLength, 3500);
        padGroupOn(4500);
        checkForClick(4500 + 5000);

        console.groupCollapsed("%cfunction start", "color: blue;");
            console.log("strict = %c" + strict, "color: chocolate;");
            console.log("playerArr.length = %c" + playerArr.length, "color: chocolate;");
            console.log("patternArr.length = %c" + patternArr.length, "color: chocolate;");
            console.log("patternLength = %c" + patternLength, "color: chocolate;");
            console.log("patternIndex = %c" + patternIndex, "color: chocolate;");
            console.log("num = %c" + num, "color: chocolate;");
            console.log("pad = %c" + pad, "color: chocolate;");
            console.log("element = %c" + element, "color: chocolate;");
            console.log("padClicked = %c" + padClicked, "color: chocolate;");
            console.log("tone = %c" + tone, "color: chocolate;");
            console.log("padGroupOnStatus = %c" + padGroupOnStatus, "color: chocolate;");
        console.groupEnd();

        return;
    }


    function strictPlay() {
        if (!strict) {
            strict = true;
        }
        else {
            strict = false;
        }
        
        console.groupCollapsed("%cfunction strictPlay", "color: blue;");
            console.log("strict = %c" + strict, "color: chocolate;");
            console.log("playerArr.length = %c" + playerArr.length, "color: chocolate;");
            console.log("patternArr.length = %c" + patternArr.length, "color: chocolate;");
            console.log("patternLength = %c" + patternLength, "color: chocolate;");
            console.log("patternIndex = %c" + patternIndex, "color: chocolate;");
            console.log("num = %c" + num, "color: chocolate;");
            console.log("pad = %c" + pad, "color: chocolate;");
            console.log("element = %c" + element, "color: chocolate;");
            console.log("padClicked = %c" + padClicked, "color: chocolate;");
            console.log("tone = %c" + tone, "color: chocolate;");
            console.log("padGroupOnStatus = %c" + padGroupOnStatus, "color: chocolate;");
        console.groupEnd();

        return;
    }


    function output(content, blinks, delay) {
        //clearTimeout(displayId1);
        clearTimeout(displayId2);
        displayId2 = null;

        if (arguments.length !== 3) {
            console.warn("output() requires 3 arguments");
            return;
        }

        if (arguments[1] !== 0) {
            displayId1 = setTimeout(function () {
                for (let i = 0; i < blinks; i += 1) {
                    displayText.text(content).fadeOut(250);
                    displayText.text(content).fadeIn(250);
                }
            }, delay);
        }
        else {
            displayId2 = setTimeout(function () {
                displayText.text(content);
            }, delay);
        }

        console.groupCollapsed("%cfunction output", "color: blue;");
            console.log("strict = %c" + strict, "color: chocolate;");
            console.log("playerArr.length = %c" + playerArr.length, "color: chocolate;");
            console.log("patternArr.length = %c" + patternArr.length, "color: chocolate;");
            console.log("patternLength = %c" + patternLength, "color: chocolate;");
            console.log("patternIndex = %c" + patternIndex, "color: chocolate;");
            console.log("num = %c" + num, "color: chocolate;");
            console.log("pad = %c" + pad, "color: chocolate;");
            console.log("element = %c" + element, "color: chocolate;");
            console.log("padClicked = %c" + padClicked, "color: chocolate;");
            console.log("tone = %c" + tone, "color: chocolate;");
            console.log("padGroupOnStatus = %c" + padGroupOnStatus, "color: chocolate;");
        console.groupEnd();
    }


    function genPattern(idx, cnt, delay) {
        clearTimeout(genPatternId);
        genPatternId = null;

        if (idx < cnt) {
            genPatternId = setTimeout(function () {
                pad = simon.find("[data-id = " + patternArr[idx] + "]");
                tone = simon.find("#audio" + patternArr[idx]);
                flash(pad, 500);
                playSound(tone);
                idx += 1;
                genPattern(idx, cnt, 1000);
            }, delay);
        }
    }


    function checkForClick(delay) {
        clearTimeout(checkForClickId);
        checkForClickId = null;

        if (padClicked === 0) {
            checkForClickId = setTimeout(function () {
                padGroupOff();
                playerArr.length = 0;
                num = 0;
                output("!!", 2, 0);
                output(patternLength, 0, 2000);
                genPattern(patternIndex, patternLength, 3500);
                padGroupOn(3500 + (1000 * patternLength));
                checkForClick(3500 + (1000 * patternLength) + 5000);
            }, delay);
        }

        console.groupCollapsed("%cfunction checkForClick", "color: blue;");
            console.log("strict = %c" + strict, "color: chocolate;");
            console.log("playerArr.length = %c" + playerArr.length, "color: chocolate;");
            console.log("patternArr.length = %c" + patternArr.length, "color: chocolate;");
            console.log("patternLength = %c" + patternLength, "color: chocolate;");
            console.log("patternIndex = %c" + patternIndex, "color: chocolate;");
            console.log("num = %c" + num, "color: chocolate;");
            console.log("pad = %c" + pad, "color: chocolate;");
            console.log("element = %c" + element, "color: chocolate;");
            console.log("padClicked = %c" + padClicked, "color: chocolate;");
            console.log("tone = %c" + tone, "color: chocolate;");
            console.log("padGroupOnStatus = %c" + padGroupOnStatus, "color: chocolate;");
        console.groupEnd();
    }


    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function getPattern() {
        for (let j = 20 - 1; j >= 0; j -= 1) {
            patternArr.push(getRandom(1, 4));
        }
    }

    function padGroupOff() {
        if (padGroupOnStatus) {
            padGroup.off("click");
            padGroupOnStatus = false;
        }        
    }


    function padGroupOn(delay) {
        if (!padGroupOnStatus) {
            padGroupOnId = setTimeout(function () {
                padGroup.on("click", padClick);
                padGroupOnStatus = true;
            }, delay);            
            //console.log("padGroupOnStatus = " + padGroupOnStatus);
        }
    }


    function flash(pad, delay) {
        flashId = setTimeout(function () {
            pad.css("opacity", "1");
            setTimeout(function () {
                pad.removeAttr("style");
            }, delay);
        }, 0);
    }


    function playSound(tone) {
        tone[0].currentTime = 0;
        tone[0].volume = 1;
        tone[0].play();
    }


    function padClick() {
        padGroupOff();
        clearTimeout(checkForClickId);
        checkForClickId = null;

        element = $(this); //get the element clicked (#padGre, #padRed, #padYel, #padBlu)
        padClicked = parseInt(element.data("id"), 10); //get the value of the data-id attribute (1, 2, 3, 4)
        tone = element.find("#audio" + padClicked);
        //var patternLength = patternArr.slice(0, patternLength).length;

        flash(element, 500);
        playSound(tone);

        if (padClicked === patternArr[num] && num < patternLength) {
            // if id's match, push element clicked into playerArr array
            clearTimeout(checkForClickId);
            checkForClickId = null;
            
            console.log("%c Get pattern at current patternLength (patternLength starts at 1 and increment by 1 on each iteration)", "color: blue;");
            console.log("%c patternLength = " + patternLength, "color: chocolate;");
            console.log("patternArr = " + "[" + patternArr + "]");
            //console.log("pattern size =" + "%c " + patternLength + " (patternLength)", "color: chocolate;");
            console.log("patternArr.slice(0," + "%c patternLength)     " + "// " + patternLength, "color: chocolate;");
            console.log("pattern = " + "[" + patternArr.slice(0, patternLength) + "]");

            console.log("\n");

            console.log("%c Check if value of padClicked === value of patternArr[num]", "color: blue;");
            console.log("%c padClicked = " + padClicked, "color: chocolate");
            //console.log("Id of pad clicked = padClicked     " + "//" + padClicked);
            console.log("%c num = " + num, "color: cadetblue");            
            //console.log("Value of pattern[num] = " + pattern[num]);            
            console.log("if padClicked === patternArr[" + num + "]     " + "%c // " + padClicked + " === " + patternArr[num], "color: chocolate;");
            console.log("playerArr.push(padClicked)");                       

            playerArr.push(padClicked);
            console.log("playerArr = " + "[" + playerArr + "]");
            num += 1;
            console.log("num += 1");
            console.log("\n");
            padClicked = 0;
            checkForClick(5000);
            padGroupOn(0);
        }
        else {
            // else start over
            if (strict) {
                clearTimeout(checkForClickId);
                checkForClickId = null;

                console.error("Error: padClicked does not match patternArr[num]");
                console.log("strict = " + strict);
                console.log("%c Get pattern at current patternLength length (patternLength starts at 1 and increment by 1 on each iteration)", "color: blue;");
                console.log("%c patternLength = " + patternLength, "color: chocolate;");
                console.log("pattern = " + "[" + patternArr.slice + "]");
                //console.log("pattern size =" + "%c " + patternLength + " (patternLength)", "color: chocolate;");
                console.log("pattern.slice(0," + "%c patternLength)     " + "// " + patternLength, "color: chocolate;");
                console.log("pattern = " + "[" + patternArr.slice(0, patternLength) + "]");

                console.log("\n");

                console.log("%c Check if padClicked === value of pattern starting at index 0 (num)", "color: blue;");
                console.log("%c padClicked = " + padClicked, "color: chocolate");
                //console.log("Id of pad clicked = padClicked     " + "//" + padClicked);
                console.log("%c num = " + num, "color: cadetblue");            
                //console.log("Value of pattern[num] = " + pattern[num]);            
                console.log("if padClicked === pattern[" + num + "]     " + "%c // " + padClicked + " === " + patternArr[num], "color: chocolate;");
                console.log("playerArr.push(padClicked)");
                num = 0;
                console.log("playerArr[" + playerArr + "] === " + "pattern[" + pattern.slice(0, patternLength) + "]");
                console.log("start();");
                start();
                return;
            }
            else {
                //clearTimeout(checkForClickId);
                padClicked = 0;
                //padGroupOn();
                checkForClick(0);
                return;
            }
        }


        // if pattern is complete - playerArr matches patternArr
        if (playerArr.equals(patternArr.slice(0, patternLength))) {
            // if arrays at current patternLength match
            console.log("%c Check if playerArr === patternArr", "color: blue;");
            console.log("playerArr[" + playerArr + "] === " + "patternArr[" + patternArr.slice(0, patternLength) + "]");
            console.log("\n");
            console.log("\n");
            clearTimeout(checkForClickId);
            checkForClickId = null;

            // check if win
            if (playerArr.length === 5) {
                // check for win
                output("win", 0, 0);
            }
            else {
                // else reset and increase patternLength by 1 - 
                padClicked = 0;
                playerArr.length = 0;
                num = 0;
                patternLength += 1;
                output(patternLength, 0, 0);
                genPattern(patternIndex, patternLength, 1500);
                checkForClick(1500 + 5000 + (1000 * patternLength));
            }
        }
    }

}());


(function () {

      /****************** Compare arrays method from StackOverflow *********************
    https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript */

    // Warn if overriding existing method
    if (Array.prototype.equals) {
        console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
    }
    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array) {
            return false;
        }

        // compare lengths - can save a lot of time 
        if (this.length != array.length) {
            return false;
        }

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;       
            }           
            else if (this[i] != array[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;   
            }           
        }       
        return true;
    };
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});

}());