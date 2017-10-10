(function () {
    var on = false;
    var player = [];
    var pattern = [];
    var index;
    var count = 1;
    var pad;
    var i;
    var k = 0;
    var dataId;
    //var id;
    var element;
    var clicked;
    var tone;
    var checkForClickId, genPatternId, flashId, displayId1, displayId2;
    

    //cache dom
    var simon = $("#simon");
    var displayText = simon.find("#displayText");
    var powerSwitch = simon.find("#powerSwitch");
    var buttonOff = simon.find("#buttonOff");
    var buttonOn = simon.find("#buttonOn");
    var startButton = simon.find("#startButton");
    var padGroup = simon.find(".pad");


    powerSwitch.on("click", onOff);


    function onOff() {
        if (!on) {
            on = true;
            index = 0;

            buttonOff.css("visibility", "hidden");
            buttonOn.css("visibility", "visible");
            displayText.text("--");
            startButton.on("click", start);
        } 
        else {
            on = false;

            clearTimeout(checkForClickId);
            clearTimeout(genPatternId);
            clearTimeout(flashId);
            clearTimeout(displayId1);
            clearTimeout(displayId2);
            
            
            buttonOff.css("visibility", "visible");
            buttonOn.css("visibility", "hidden");
            
            displayText.text("");
            //padGroup.css("opacity", "0.5");
            startButton.off();
            padGroup.off();
            return;
        }
    }


    function start() {
        clicked = undefined;
        player.length = 0;        
        pattern.length = 0;
        getPattern();
        console.log(pattern);

        count = 1;
        display("--", 2, 0);
        display(count, 0, 2000);
        genPattern(index, count, 3500);
        padGroupOn(4500);
        // setTimeout(function () {
        //     padGroup.on("click", padClick);
        // }, 4500);
        checkForClick(4500 + 5000);                           
    }


    function display(content, blinks, delay) {
        //clearTimeout(displayId1);
        clearTimeout(displayId2);

        if (arguments.length !== 3) {
            console.warn("display() requires 3 arguments");
            return;
        }

        if (arguments[1] !== 0) {
            displayId1 = setTimeout(function () {
                for (var i = 0; i < blinks; i += 1) {
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
    }


    function genPattern(idx, cnt, delay) {
        clearTimeout(genPatternId);

        if (idx < cnt) {
            genPatternId = setTimeout (function () {  
                pad = simon.find("[data-id = " + pattern[idx] + "]");
                tone = simon.find("#audio" + pattern[idx]);                   
                flash(pad, 500);
                playSound(tone);
                idx += 1;
                genPattern(idx, cnt, 1000);
            }, delay); 
        }
    }


    function checkForClick(delay) {
        clearTimeout(checkForClickId);

        if (clicked === undefined) {
            checkForClickId = setTimeout(function () {
                padGroup.off();
                player.length = 0;
                k = 0;
                display("!!", 2, 0);
                display(count, 0, 2000);
                genPattern(index, count, 3500);
                padGroupOn(3500 + (1000 * count));
                // setTimeout(function () {
                //     padGroup.on("click", padClick);
                // }, 3500 + (1000 * count));
                checkForClick(3500 + (1000 * count) + 5000);        
            }, delay);
        } 
    }


    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function getPattern() {
        for (var i = 20 - 1; i >= 0; i -= 1) {
            pattern.push(getRandom(1, 4));
        }
    }


    function padGroupOn(delay) {
        setTimeout(function () {
            padGroup.on("click", padClick);
        }, delay);
    }    


    function flash(pad, delay) {                    
        flashId = setTimeout(function() {
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
        clearTimeout(checkForClickId);

        element = $(this); //get the element clicked (#padGre, #padRed, #padYel, #padBlu)
        clicked = parseInt(element.data("id"), 10); //get the value of the data-id attribute (1, 2, 3, 4)
        tone = element.find("#audio" + clicked);
        var patternLength = pattern.slice(0, count).length;

        flash(element, 500);
        playSound(tone);

        if (clicked === pattern[k] && k < count) {
            // if id's match, push element clicked into player array
            console.log("k = " + k);
            console.log("count = " + count);

            player.push(clicked);
            k++;
            clicked = undefined;
            checkForClick(5000);
            console.log("player[" + player + "] === " + "pattern[" + pattern.slice(0, count) + "]");
        }
        else {
            // else start over            
            clicked = undefined;
            checkForClick(0);
        }


        if (player.equals(pattern.slice(0, count))) {
            // if arrays at current count match

            clearTimeout(checkForClickId);
            
            if (player.length === 20) {
                // check for win
                display("win", 0, 0);
            }
            else {
                // reset and increase count
                player.length = 0;
                k = 0;
                count++;
                display(count, 0, 0);
                genPattern(index, count, 1500);
                checkForClick(1500 + 5000 + (1000 * count)); 
            }
        }
    }       

})();


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

})();