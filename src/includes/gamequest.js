(function ( GameQuest ) {


    /**
     *
     * AkihabaraGamequest augments Gamed GameQuest Class
     * https://github.com/kitajchuk/gamed/blob/master/src/GameQuest.js
     * @constructor AkihabaraGamequest
     * @augments GameQuest
     * @see {@link GameQuest}
     * @author kitajchuk
     *
     */
    var AkihabaraGamequest = function () {};
    
    AkihabaraGamequest.prototype = new GameQuest();
    
    window.AkihabaraGamequest = new AkihabaraGamequest();


})( window.GameQuest );