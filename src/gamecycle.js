/**
 * AkihabaraGamecycle contains your basic game loop: intro, menus,
 * crossfading between stages/lifes, gameover and ending.
 * @namespace AkihabaraGamecycle
 */
var AkihabaraGamecycle = {

    /**
    * AkihabaraGamecycle constructor - initializes a new game object
    *
    * @param    id        unique id of object
    * @param    group    name of group to store the object in
    */
    createMaingame: function (id, group) {
        return AkihabaraGamebox.addObject({
            id: id,
            group: group,
            counter: 0,
            difficulty: 0,

            // state transition
            state: 50,
            stateFirstIteration: true,

            hud: {},

            /**
            * This method is called whenever you load a new map. It's meant to be
            * overridden when you create your game.
            */
            changeLevel: function () { },

            /**
            * This method is called every time a player is "reborn". This method is
            * meant to be overridden since you have to do garbage collection.
            */
            newLife: function () { },

            // game disclaimer animation (if needed)
            gameDisclaimerAnimation: function (reset) {
                return true;
            },

            // game intro animation
            gameIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "LETS BEGIN!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), blinkspeed: 5, times: 6});
                }
            },

            // level intro animation
            levelIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "GET READY!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), blinkspeed: 5, times: 6});
                }
            },

            // Life intro animation
            newlifeIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.fixed(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "GET READY!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), time: 30});
                }
            },

            // gameover animation
            gameoverIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.fixed(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "GAME OVER", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), time: 50});
                }
            },

            // game title animation
            gameTitleIntroAnimation: function (reset) {
                if (!reset) {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    AkihabaraGamebox.blitText(AkihabaraGamebox.getBufferContext(), {font: "small", text: "GAME TITLE", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH() - 100});
                }
            },

            // End level animation
            endlevelIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    return AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "WELL DONE!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), blinkspeed: 5, times: 10});
                }
            },

            // Game ending
            gameEndingIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "CONGRATULATIONS!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), blinkspeed: 5, times: 10});
                }
            },

            // PRESS START
            pressStartIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "PRESS A TO START", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: Math.floor(AkihabaraGamebox.getScreenH() / 3), dw: AkihabaraGamebox.getScreenW(), dh: Math.floor(AkihabaraGamebox.getScreenH() / 3) * 2, blinkspeed: 10});
                    return AkihabaraInput.keyIsHit("a");
                }
            },

            /**
            * This method is called when the player dies.
            */
            gameIsOver: function () { return true; },

            /**
            * Actions done during the game (i.e. stage is clear or other ending conditions)
            */
            gameEvents: function () { },

            gameMenu: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "difficulty");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 0.5});
                    if (AkihabaraToys.ui.menu(this, "difficulty", {audiooption: "default-menu-option", audioconfirm: "default-menu-confirm", font: "small", keys: {up: "up", down: "down", ok: "a", cancel: "b"}, selector: " > ", items: ["EASY", "NORMAL", "HARD"], x: 10, y: 10})) {
                        if (AkihabaraToys.getToyValue(this, "difficulty", "ok") === -1) {
                            return -1;
                        } else {
                            this.difficulty = AkihabaraToys.getToyValue(this, "difficulty", "selected");
                            return true;
                        }
                    }
                    return false;
                }
            },

            // CHECK

            gameIsHold: function () { // Use this clause to check collision and kill player: if true the level is changing
                return (this.state === 400) || (this.state === 401);
            },

            isCompleted: function () {
                return (this.state === 800);
            },

            // GAME CYCLE

            getNextLevel: function () {
                return this._nextlevel;
            },

            gotoLevel: function (level) {
                this._nextlevel = level;
                this.setState(400);
            },

            playerDied: function (data) {
                this._loselife = data;
                this.setState(500);
            },

            gameIsCompleted: function () {
                this.setState(800);
            },

            // private methods

            /**
            * Changes the current game state
            *
            * @param st state number
            */
            setState: function (st) {
                this.state = st;
                this.stateFirstIteration = true;
            },

            /*
            * Removes all objects in each group except the game
            * cycle group. Used for garbage collection when resetting the game.
            */
            _resetGroups: function () {
                var g = AkihabaraGamebox.getGroups();
                for (var i = 0; i < g.length; i++) {
                    if (g[i] !== this.group) { AkihabaraGamebox.clearGroup(g[i]); }
                }
                AkihabaraGamebox.soloGroup(this.group);
            },

            stateIsReady: function () { this.stateFirstIteration = false; },

            blit: function () {
                switch (this.state) {
                case 50: // Disclaimer
                    if (this.stateFirstIteration) {
                        this._resetGroups();
                        this.gameDisclaimerAnimation(true);
                        this.stateIsReady();
                    }
                    if (this.gameDisclaimerAnimation(false)) {
                        this.setState(100);
                    }
                    break;
                // main menu
                case 100:
                case 101:
                case 102: // Press Start / Menu
                    if (this.stateFirstIteration && (this.state === 100)) {
                        this._resetGroups();
                        this.gameTitleIntroAnimation(true);
                    }
                    this.gameTitleIntroAnimation(false);
                    switch (this.state) {
                    case 100: // Press to start
                        if (this.stateFirstIteration) {
                            this.pressStartIntroAnimation(true);
                            this.stateIsReady();
                        }
                        if (this.pressStartIntroAnimation(false)) { this.setState(101); }
                        break;
                    case 101: // Game menu
                        if (this.stateFirstIteration) {
                            this.gameMenu(true);
                            this.stateIsReady();
                        }

                        var menu = this.gameMenu(false);
                        if (menu) {
                            if (menu === -1) {
                                this.setState(100);
                            } else {
                                this.setState(102);
                            }
                        }
                        break;
                    case 102: // Fader
                        if (this.stateFirstIteration) {
                            this._resetGroups();
                            AkihabaraToys.resetToy(this, "fadeout");
                            this.stateIsReady();
                        }
                        if (AkihabaraToys.fullscreen.fadeout(this, "fadeout", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) {
                            this.setState(200);
                        }
                        break;
                    }
                    break;

                case 200:// Game intro animation

                case 300:// Start game
                case 301:// Game is going

                case 400:// Fade out to change level
                case 401:// Level animation (levelIntroAnimation)
                case 402:// Fade in to next level

                case 500:// Wait after dead
                case 501:// Dead fadeout

                case 600:// Next life intro
                case 601:// New life fadein

                case 700:// Gameover animation

                case 800:// Fade out game ending
                case 801:// Game ending

                    // Game playing
                    if (this.stateFirstIteration) {
                        switch (this.state) {
                        case 200: // Game intro
                            AkihabaraToys.resetToy(this, "fadein");
                            this.level = null;
                            this._nextlevel = null;
                            this.hud = AkihabaraToys.ui.hud("maingamehud");
                            this.initializeGame();
                            this.gameIntroAnimation(true);
                            break;
                        case 300:
                            // Game start
                            this.level = this._nextlevel;
                            AkihabaraGamebox.playAllGroups();
                            this.changeLevel(this._nextlevel);
                            break;
                        case 800:
                        case 400:
                            this.endlevelIntroAnimation(true);
                            AkihabaraToys.resetToy(this, "fadeout");
                            break;
                        case 501:
                            AkihabaraToys.resetToy(this, "fadeout");
                            break;
                        case 401:
                            AkihabaraGamebox.soloGroup(this.group);
                            this.levelIntroAnimation(true);
                            break;
                        case 402:
                            AkihabaraToys.resetToy(this, "fadein");
                            this.level = this._nextlevel;
                            AkihabaraGamebox.playAllGroups();
                            this.changeLevel(this._nextlevel);
                            break;
                        case 600:
                            AkihabaraGamebox.soloGroup(this.group);
                            this.newlifeIntroAnimation(true);
                            break;
                        case 500:
                            this._loselife.counter = 0;
                            break;
                        case 601:
                            AkihabaraToys.resetToy(this, "fadein");
                            this.newLife();
                            AkihabaraGamebox.playAllGroups();
                            break;
                        case 700:
                            AkihabaraGamebox.soloGroup(this.group);
                            this.gameoverIntroAnimation(true);
                            break;
                        case 801:
                            AkihabaraGamebox.soloGroup(this.group);
                            this.gameEndingIntroAnimation(true);
                            break;
                        }
                        this.stateIsReady();
                    }

                    switch (this.state) {
                    case 200: // Game intro
                        if (this.gameIntroAnimation(false)) { this.setState(300); }
                        break;
                    case 601: // Fade in with new life
                    case 402: // Fade in after level change
                    case 300: // Fade in at the beginning of the game
                        if (AkihabaraToys.fullscreen.fadein(this, "fadein", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) { this.setState(301); }
                        break;
                    case 301: // Ingame stuff
                        this.gameEvents();
                        break;
                    case 400: // Fade out before changing the level
                        if (this.endlevelIntroAnimation(false)) {
                            if (AkihabaraToys.fullscreen.fadeout(this, "fadeout", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) { this.setState(401); }
                        }
                        break;
                    case 800: // Fade out before game ending
                        if (this.endlevelIntroAnimation(false)) {
                            if (AkihabaraToys.fullscreen.fadeout(this, "fadeout", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) { this.setState(801); }
                        }
                        break;
                    case 501: // Fade out after dead
                        if (AkihabaraToys.fullscreen.fadeout(this, "fadeout", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) {
                            if (this.gameIsOver()) {
                                this.setState(700); // GAME OVER
                            } else {
                                this.setState(600);
                            }
                        }
                        break;
                    case 401: // Level intro animation
                        if (this.levelIntroAnimation(false)) { this.setState(402); }
                        break;
                    case 500: // Wait after dead
                        this._loselife.counter++;
                        if (this._loselife.counter === this._loselife.wait) { this.setState(501); }
                        break;
                    case 600: // New life intro
                        if (this.newlifeIntroAnimation(false)) { this.setState(601); }
                        break;
                    case 700: // gameover
                        if (this.gameoverIntroAnimation(false)) { this.setState(100); } // Restart game
                        break;
                    case 801: // Game ending
                        if (this.gameEndingIntroAnimation(false)) {
                            this._loselife = {ending: true};
                            this.setState(700); // Game over
                        }
                        break;
                    }

                    this.hud.blit();
                    break;
                }
            }
        });
    }
};
