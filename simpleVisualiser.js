// Simple Visualiser.
littleDebugger.common.namespacer.createNamespace("littleDebugger.audioProcessing.ui.visualisers");

// Initialise a visualiser
// <canvas> The canvas element on which the graph should be drawn.
// <xAxis> Boolen flag for bold x-axis.
// <waveColor> Color of the wave.
littleDebugger.audioProcessing.ui.visualisers.simpleVisualiser = function (canvas, xAxis, waveColor) {
    var that = {};

    var ctx = canvas.getContext("2d");
    var noneCroppingHeight = canvas.height - 2;

    // Set the grid colours.
    var axisColor = "Black";
    var divideColor = "grey";

    // Draw a wave.
    // <waveOffset> The offset of the wave.
    // <color> Color of the wave.
    that.drawWave = function (signal) {
        ctx.strokeStyle = waveColor;
        ctx.st

        ctx.beginPath();

        for (var i = 0; i < signal.length; i++) {
            var y = signal[i];
            ctx.lineTo(i, canvas.height - ((y * noneCroppingHeight / 2) + (canvas.height / 2)));
        }

        ctx.stroke();
    };

    that.reset = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid.
        drawHorizonalLine(canvas.height / 4, divideColor);
        drawHorizonalLine(canvas.height / 4 * 3, divideColor);
        drawHorizonalLine(canvas.height / 2, axisColor);

        drawVirticalLine(canvas.width / 8, divideColor);
        drawVirticalLine(canvas.width / 8 * 2, divideColor);
        drawVirticalLine(canvas.width / 8 * 3, divideColor);
        drawVirticalLine(canvas.width / 8 * 5, divideColor);
        drawVirticalLine(canvas.width / 8 * 6, divideColor);
        drawVirticalLine(canvas.width / 8 * 7, divideColor);
        drawVirticalLine(canvas.width / 2, xAxis ? axisColor : divideColor);
    }

    // Draw a horizonal line of the canvas
    // <y> The point on the Y-axis where the line should be draw.
    // <color> Color of the line.
    function drawHorizonalLine(y, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Draw a virtical line of the canvas
    // <x> The point on the X-axis where the line should be draw.
    // <color> Color of the line.
    function drawVirticalLine(x, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // So the Iframes don't overflow on mobile devices.
    var setDimensions = function () {
        canvas.style.width = (window.innerWidth - 20) + "px";
        var height = window.innerHeight > window.innerWidth ?
            window.innerWidth :
            window.innerHeight;
        canvas.style.height = (height - 30) + "px";
    };

    window.onresize = function () {
        setDimensions();
    };

    that.reset();
    setDimensions();

    return that;
}