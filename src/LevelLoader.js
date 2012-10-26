cc.dumpConfig();

/*
	CLASS LevelLoader : Class
	Description: This class reads the level data file and sets up the game objects appropriately
*/
var LevelLoader = cc.Class.extend({
    delegate: null,

	/**
     * Constructor
     */
    ctor:function () {
		//Dunno what this does :)
        cc.associateWithNative( this, cc.Class );
    },

    /**
     * reads the level data, creates game objects and adds it to the 
     * given layer
     */
    load:function (wrld, lvl) {
            var i, len, obj;
            var level, arr = [];
            var self = this;

            $.getJSON('res/w' + wrld + 'level' + lvl + '.json', function(data) {
                level = data;
                //l1 hard coded for now
                //for each balls in the json object, create one sprite here
                //and set the type and position appropriately
                //then add them to the layer and array given
                for (i = 0, len = level.balls.length; i < len, obj = level.balls[i]; i++) {
                    var b = new Ball(obj.type);
                    b.setPosition(cc.p(obj.x, obj.y));
                    arr.push(b);
                    //console.log(obj);
                }
                self.delegate.onLevelLoaded(arr);
            }).error(function(err) { console.log(err) } );
    }
});
