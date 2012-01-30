/**
 * Debug module provides some utils for debug the Akihabara user project.
 * @namespace AkihabaraDebug
 */
var AkihabaraDebug = {

	fpsCounterInit: function (data) {

		// Default options
		if (!data) { data = {}; }
		if (!data.x) { data.x = 0; }
		if (!data.y) { data.y = 0; }
		if (!data.font) { data.font = 'lighter 10px sans-serif'; }
		if (!data.color) { data.color = "#FFF"; }

		// Own fpsCounter vars
		data.frameCount = 0;
		data.currentFps = 0;
		data.lastFps = new Date().getTime();

		// Setting data to main object game
		this.addDebugAction('fpsCounter', data);
	},

	statusBar: function (data) {
		// Default options
		if (!data) { data = {}; }
		if (!data.backgroundColor) { data.backgroundColor = "#FFF"; }
		if (!data.color) { data.color = "#000"; }
		if (!data.font) { data.font = 'lighter 10px sans-serif'; }

		this.addDebugAction('statusBar', data);
	},

	setStatBar: function (txt) {
		function createStatBar() {
			if (!AkihabaraGamebox._debugTool.statusBar) { return false; }

			var statbar = document.createElement("div");
			if (AkihabaraGamebox._border) { statbar.style.border = "1px solid black"; }
			statbar.style.margin = "auto";
			statbar.style.backgroundColor = AkihabaraGamebox._debugTool.statusBar.backgroundColor;
			statbar.style.font = AkihabaraGamebox._debugTool.statusBar.font;
			statbar.style.color = AkihabaraGamebox._debugTool.statusBar.color;
			statbar.style.width = (AkihabaraGamebox._camera.w * AkihabaraGamebox._zoom) + "px";
			AkihabaraGamebox._container.appendChild(statbar);
			AkihabaraGamebox._statbar = statbar;
		}

		if (!AkihabaraGamebox._statbar) { createStatBar(); }
		AkihabaraGamebox._statbar.innerHTML = (txt || "&nbsp");
	},

	// Add a new debug utility and its data
	addDebugAction: function  (name, data) {
		AkihabaraGamebox._debugTool[name] = data;
	},

	run: function (data) {

		if (data.fpsCounter) {
			var fps = data.fpsCounter,
			thisFrame = new Date().getTime(),
			diffTime = Math.ceil((thisFrame - fps.lastFps)),
			ctx = AkihabaraGamebox._screenCtx;

			if (diffTime >= 1000) {
				fps.currentFps = fps.frameCount;
				fps.frameCount = 0.0;
				fps.lastFps = thisFrame;
			}

			fps.frameCount++;

			// Print the result on the main CTX
			ctx.fillStyle = fps.color;
			ctx.font = fps.font;
			ctx.fillText('FPS: ' + fps.currentFps + '/' + AkihabaraGamebox._fps, fps.x, fps.y);

		}

		if (data.statusBar) {
			var statline = "Idle: " + AkihabaraGamebox._framestart + "/" + AkihabaraGamebox._mspf + (AkihabaraGamebox._frameskip > 0 ? " (" + AkihabaraGamebox._frameskip + "skip)" : "") + " | ";
			var cnt = 0, g = 0;
			for (g = 0; g < AkihabaraGamebox._groups.length; g++) {
				if (AkihabaraGamebox._groupplay[AkihabaraGamebox._groups[g]]) {
					cnt = 0;
					for (var obj in AkihabaraGamebox._objects[AkihabaraGamebox._groups[g]]) { cnt++; }
					if (cnt) { statline += AkihabaraGamebox._groups[g] + "[" + cnt + "] "; }
				}
			}
			cnt = 0;
			var ply = 0;
			for (g in AkihabaraAudio._audio.aud) {
				for (var x = 0; x < AkihabaraAudio._audio.aud[g].length; x++) {
					cnt++;
					if (!AkihabaraAudio._audio.aud[g][x].paused && !AkihabaraAudio._audio.aud[g][x].ended) { ply++; }
				}
			}
			statline += "| audio: " + ply + "/" + cnt + ":" + AkihabaraAudio._audioteam;

			if (AkihabaraAudio._totalAudioMute) { statline += ' MUTE ON'; }
			if (AkihabaraGamebox._pauseGame) { statline += ' | PAUSE ON'; }

			this.setStatBar(statline);
		}

	}

};
