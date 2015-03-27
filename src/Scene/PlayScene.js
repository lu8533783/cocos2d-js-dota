var size = cc.director.getWinSize();
var PlayScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        this.loadbg(); //加载背景
        this.loadhero(); //加载英雄
        this.loadenemy(); //加载敌人

        this.scheduleUpdate();
    },
    loadbg:function(){
        var bj = new cc.Sprite(res.bj);
        bj.x = size.width/2;
        bj.y = size.height/2;
        this.addChild(bj);
    },
    loadhero: function () {
        var hero = new player(res.hero,"hero");
        this.addChild(hero,0,1);
        this.tag = 1;
        //根据中心点设置坐标
        hero.x = hero.width/2;
        hero.y = size.height/2 - hero.height/2;
    },
    loadenemy: function () {
        var enemy = new player(res.hero,"hero");
        this.addChild(enemy,0,2);
        this.tag = 2;
        //根据中心点设置坐标
        enemy.x = size.width-enemy.width/2;
        enemy.y = size.height/2 - enemy.height/2;
        enemy.scaleX=-1;
    },
    update:function(){
        //战斗
        this.att();
    },
    att:function(){
        var hero = this.getChildByTag(1);
        var enemy = this.getChildByTag(2);
        if(hero.x+hero.atkDistance < enemy.x-enemy.width){
            hero.state = 1;
            enemy.state = 1;
            hero.x+=hero.moveSpeed;
            enemy.x -=enemy.moveSpeed;
        }else{
            hero.state=2;
            enemy.state=2;
        }
    }
});

var player = flax.Animator.extend({
    atkDistance:20,
    moveSpeed:1,
    state:0,
    nowstate:0,//当前状态
    onEnter: function () {
        this._super();
        this.scheduleUpdate();
    },
    update:function(){
        if(this.state == this.nowstate){
            return;
        }else if(this.state == 1){
            cc.log('移动');
            this.nowstate = this.state;
            this.gotoAndPlay('Move');
        }else if(this.state == 2){
            var r = parseInt(Math.random()*3+1);
            this.gotoAndPlay("atk1");
        }
    }

})