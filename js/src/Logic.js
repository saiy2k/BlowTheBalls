var winSize;
var Logic = {
    spriteHitTest: function(sprite1, sprite2) {
        var w1 = sprite1._contentSize.width;
        var h1 = sprite1._contentSize.height;
        var r1 = cc.RectMake(
                sprite1._position.x - w1 / 2,
                sprite1._position.y - h1 / 2,
                w1, h1);

        var w2 = sprite2._contentSize.width;
        var h2 = sprite2._contentSize.height;
        var r2 = cc.RectMake(
                sprite2._position.x - w2 / 2,
                sprite2._position.y - h2 / 2,
                w2, h2);

        return cc.Rect.CCRectIntersectsRect(r1, r2);
    },
    awardScore: function(type) {
    },
    isArrowHitBall: function(bb, arr, layer) {
        if (Logic.spriteHitTest(bb, arr)) {
            State.score += 100 + bb.type * 10;
            arr.removeFromParentAndCleanup(true);
            //if its already smallest ball, remove it
            if (bb.type == 1) {
                bb.removeFromParentAndCleanup(true);
            // else split the big ball into 2 small balls
            } else {
                var b1 = new Ball(bb.type - 1);
                b1.setPosition(bb._position);
                layer.ballArray.push(b1);
                layer.addChild(b1, 2, 2);
                var b2 = new Ball(bb.type - 1);
                b2.setPosition(bb._position);
                b2.vx = -4;
                layer.ballArray.push(b2);
                layer.addChild(b2, 2, 2);
                bb.removeFromParentAndCleanup(true);
            }
            return true;
        }
        return false;
    },
    powerDrop: function(bb, powerData) {
        var pp;
        for (var k = 0, len3 = powerData.length; k < len3, pp = powerData[k]; k++) {
            if (Math.random() < pp.seed) {
                pp.count--;
                if(pp.count == 0) {
                    powerData.splice(k, 1);
                }
                var pup = cc.Sprite.create(GAME.POWERUPS[pp.id].icon);
                pup.setPosition(bb._position);
                pup.vx = (Math.random() * 100) - 50;
                pup.vy = 100;
                pup.dt = 5;
                pup.tag= pp.id;
                return pup;
            }
        }
    }

};
