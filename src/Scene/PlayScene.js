var size = cc.director.getWinSize();
var hero_list = [];
var enemy_list = [];
//场景
var PlayScene = cc.Scene.extend({
    hero_list:[],
    enemy_list:[],
    ctor:function(){
        this._super();

        var bj = new bjLayer();
        this.addChild(bj);

        hero_list.push(flax.assetsManager.createDisplay(res.hero, "hero", {parent: this,x: 100,y: 150}, false, "heroClass"));
        enemy_list.push(flax.assetsManager.createDisplay(res.hero, "hero", {parent: this,x: 600,y: 150,scaleX:-1}, false, "EnemyClass"));

        //cc.log(enemy_list[0]);
        this.scheduleUpdate();
    },
    update: function (t) {
        for(k in enemy_list){
            if(enemy_list[k].hp<=0)  enemy_list.splice(k,1);
        }
        if(enemy_list.length<=0){
            this.unscheduleUpdate();
            cc.log("玩家赢了");
        }
    }
});
//背景层
var bjLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var bj = new cc.Sprite(res.bj);
        bj.x = size.width/2;
        bj.y = size.height/2;
        this.addChild(bj);
    }
});



//
var heroClass = flax.MovieClip.extend({
    collider:null,
    enemy:null,
    isatk:false,
    attack:20,
    atkSpeed:6,
    hp:100,
    state:0,
    onEnter:function(){
        this._super();

        this.atk();
        //箭射出
        this.onFrameLabel.add(function (frame) {
            var jian = this.getChildByAssetID("jian");
            if (frame == 'flyOut') {
                this.collider = flax.assetsManager.cloneDisplay(jian, 0, 1);
            }
        }, this);
        this.scheduleUpdate();
    },
    damaged:function(attack) {
        this.autoStopWhenOver = true;
        this.gotoAndPlay("damaged");
        this.hp -= attack;
        if (this.hp <= 0) this.death();
        this.gouxue(attack);
    },
    death:function(){
        this.gotoAndPlay("death");
        this.onAnimationOver.add(function(){
            this.removeFromParent();
        },this);
    },
    atk:function(){
        if(this.enemy && !this.isatk) {
            this.autoStopWhenOver = true;
            this.gotoAndPlay("atk");
            this.isatk = true;
        }
    },
    search:function(){
        if(!this.enemy && enemy_list[0]){
            this.enemy = enemy_list[0];
        }
    },
    update:function(){
        this.search();
        this.atk();
        if(this.collider && this.enemy.getChildByAssetID("asset14").getCollider("b")) {
            this.collider.x += this.atkSpeed;
            if (this.collider.getCollider("a").checkCollision(this.enemy.getChildByAssetID("asset14").getCollider("b"))) {
                cc.log("击中");
                this.enemy.damaged(this.attack);
                this.collider.removeFromParent(true);
                this.collider=null;
                this.enemy = null;
                this.isatk=false;
            }
        }
    },gouxue:function(v){
        var label = new cc.LabelTTF("-"+v);
        label.setColor(cc.color(255,0,0));
        label.setPosition(cc.p(this.width/2,this.height/2));
        var call = cc.callFunc(function(){
            label.removeFromParent();
        },this);
        var sequence = cc.sequence(cc.moveBy(1,cc.p(0,70)),call);
        label.runAction(sequence);
        this.addChild(label,99);
    }
})

var EnemyClass = flax.MovieClip.extend({
    collider:null,
    enemy:null,
    isatk:false,
    attack:20,
    atkSpeed:6,
    hp:60,
    onEnter:function(){
        this._super();

        //this.atk();
        //箭射出
        this.onFrameLabel.add(function (frame) {
            var jian = this.getChildByAssetID("jian");
            if (frame == 'flyOut') {
                this.collider = flax.assetsManager.cloneDisplay(jian, 0, 1);
            }
        }, this);
        this.scheduleUpdate();
    },
    damaged:function(attack) {
        this.autoStopWhenOver = true;
        this.gotoAndPlay("damaged");
        this.hp -= attack;
        if (this.hp <= 0) this.death();
        this.gouxue(attack);
    },
    death:function(){
        this.gotoAndPlay("death");
        this.onAnimationOver.add(function(){
            this.removeFromParent();
        },this);
    },
    atk:function(){
        if(this.enemy && !this.isatk) {
            this.autoStopWhenOver = true;
            this.gotoAndPlay("atk");
            this.isatk = true;
        }
    },
    search:function(){
        if(!this.enemy && hero_list[0]){
            this.enemy = hero_list[0];
        }
    },
    update:function(){
        //this.search();
        //this.atk();
        if(this.collider && this.enemy.getChildByAssetID("asset14").getCollider("b")) {
            this.collider.x += this.atkSpeed;
            if (this.collider.getCollider("a").checkCollision(this.enemy.getChildByAssetID("asset14").getCollider("b"))) {
                cc.log("击中");
                this.enemy.damaged(this.attack);
                this.collider.removeFromParent(true);
                this.collider=null;
                this.enemy = null;
                this.isatk=false;
            }
        }
    },gouxue:function(v){
        var label = new cc.LabelTTF("-"+v);
        label.setColor(cc.color(255,0,0));
        label.setPosition(cc.p(this.width/2,this.height/2));
        var call = cc.callFunc(function(){
            label.removeFromParent();
        },this);
        var sequence = cc.sequence(cc.moveBy(1,cc.p(0,70)),call);
        label.runAction(sequence);
        label.scaleX = -1;
        this.addChild(label,99);
    }
})