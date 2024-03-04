(function(){
    let bg = document.querySelector('.bg');                                 // 背景
    let tabCard = document.querySelector('header');                         // 选项卡
    let tabPlane = document.querySelectorAll('ul.planeType>li');            // 选项卡_飞机型号
    let prompt = document.querySelector('.prompt');                         // 提示内容
    let area = document.querySelector('#game_area');                        // 游戏区域
    let score = document.querySelector('#score');                           // 积分
    let mianGarage = document.querySelector('#main_garage');                // 信息栏
    let mianImg = document.querySelector('#main_garage>div>img');           // 信息栏_图片
    let mianTxt = document.querySelector('#main_garage div.type');          // 信息栏_弹药名
    let mianCont = document.querySelector('#main_garage div.cont');         // 信息栏_子弹数量
    let gameOver = document.querySelector('#game_over');                    // 结算清单
    let lastScore = document.querySelector('#last_score');                  // 结算清单_得分
    let repeat = document.querySelector('#repeat');                         // 结算清单_重新开始
    let history = document.querySelector('#history');                       // 结算清单_查看记录
    let historyList = document.querySelector('#history_list');              // 历史记录
    let historyOne = document.querySelectorAll('#history_list dd');         // 历史记录_每一条
    let bgSpand = 0;                                                        // 背景位置
    // 随机整数
    const rannum = function(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    // 随机小数
    const rannumMin = function(min, max) {
        return Math.random() * (max - min) + min;
    }
    // 背景动画
    setInterval(() => {
        bgSpand += 1;
        bg.style.backgroundPosition = `0px ${bgSpand}px`
    }, 1000/60);

    // 开始游戏
    (function gameStart(){
        console.log('gogogo');
        let tabCont = 0;
        tabCard.children[0]['cont'] = 0;
        tabCard.children[1]['cont'] = 0;
        tabCard.children[2]['cont'] = 0;
        let tabContOn = function(){
            for(let el of tabCard.children)el.classList.remove('on')
            tabCard.children[tabCont].classList.add('on')
            for(let el of tabCard.children[tabCont].children)el.classList.remove('action')
            tabCard.children[tabCont].children[tabCard.children[tabCont]['cont']].classList.add('action');
        }
        document.addEventListener('keydown',gameTa)                 //绑定按键事件
        function gameTa(ev){                                        //事件绑定的回调
            switch(ev.keyCode){
                // 上
                case 87:
                case 75:
                case 38:
                    if(tabCont>0){
                        tabCont--;
                        tabContOn()
                    }
                    break;
                // 下
                case 83:
                case 40:
                    if(tabCont<2){
                        tabCont++;
                        tabContOn()
                    }
                    break;
                // 左
                case 65:
                case 37:
                    for(let i=1;i<tabCard.children[tabCont].children.length;i++){
                        if(tabCard.children[tabCont]['cont']>=0&&
                        tabCard.children[tabCont].children[tabCard.children[tabCont]['cont']-i]&&
                        !tabCard.children[tabCont].children[tabCard.children[tabCont]['cont']-i].classList.contains('lock')){
                            tabCard.children[tabCont]['cont']-=i;
                            if(tabCard.children[tabCont].classList.contains('planeType')){
                                mianImg.src = tabCard.children[tabCont].children[tabCard.children[tabCont]['cont']].children[0].src;
                                mianTxt.innerHTML=tabCard.children[tabCont].children[tabCard.children[tabCont]['cont']].dataset.ammoname;
                            };
                            tabContOn()
                            break;
                        }
                    }
                    break;
                // 右
                case 68:
                case 39:
                    for(let i=1;i<tabCard.children[tabCont].children.length;i++){
                        if(tabCard.children[tabCont]['cont']<tabCard.children[tabCont].children.length-1&&
                        tabCard.children[tabCont].children[tabCard.children[tabCont]['cont']+i]&&
                        !tabCard.children[tabCont].children[tabCard.children[tabCont]['cont']+i].classList.contains('lock')){
                            tabCard.children[tabCont]['cont']+=i;
                            if(tabCard.children[tabCont].classList.contains('planeType')){
                                mianImg.src = tabCard.children[tabCont].children[tabCard.children[tabCont]['cont']].children[0].src;
                                mianTxt.innerHTML=tabCard.children[tabCont].children[tabCard.children[tabCont]['cont']].dataset.ammoname;
                            };
                            tabContOn()
                            break;
                        }
                    }
                    break;
                // 确认
                case 13:
                case 74:
                case 97:
                    if(tabCont==2){
                        document.removeEventListener('keydown',gameTa)                                                                           // 移除事件
                        tabCard.classList.add('out')                                                                                             // 移除选项卡
                        mianGarage.classList.add('out')                                                                                          // 展开信息栏
                        let tabPlaneCont = 0;
                        tabPlane.forEach((e,i)=>{if(e.classList.contains('action'))tabPlaneCont=i});
                        switch(tabPlaneCont){
                            case 0:
                                myPlane = new MyPlane(66,80,area.offsetWidth/2-33,area.offsetHeight-130,8,'预备卫翼','common','./img/myplane.gif','./img/myplaneBoom.gif');
                                myPlane.myPlaneBox.bulletType = '<img src="./img/bullet01.png">';
                                break;
                            case 1:
                                myPlane = new MyPlane(66,80,area.offsetWidth/2-33,area.offsetHeight-130,12,'战略核心','superSpeed','./img/myplaneBlue.gif','./img/myplaneBoomBlue.gif'); 
                                myPlane.myPlaneBox.bulletType = '<img src="./img/bullet02.png">';
                                mianTxt.style.color = '#265586';
                                break;
                            case 2:
                                myPlane = new MyPlane(66,80,area.offsetWidth/2-33,area.offsetHeight-130,10,'愤怒小鸟','mySelf','./img/myplaneRed.gif','./img/myplaneBoomRed.gif'); 
                                myPlane.myPlaneBox.bulletType = '<img src="./img/bullet02.png">';
                                mianTxt.style.color = '#265586';
                                break;
                            case 4:
                                myPlane = new MyPlane(66,80,area.offsetWidth/2-33,area.offsetHeight-130,12,'粒子光波','laser','./img/myplanePink.gif','./img/myplaneBoomPink.gif'); 
                                myPlane.myPlaneBox.bulletType = '<img src="./img/bullet05.png">';
                                mianTxt.style.color = 'rgb(177, 98, 124)';
                                break;
                        }
                        setTimeout(() => {                                                                                                       // ..等待2秒
                            prompt.classList.add('action');                                                                                      // 生成提示栏
                            score.classList.add('out')                                                                                           // 显示积分栏
                            setInterval(() => {                                                                                                  // 生成敌机
                                let howMany = rannum(1,3);
                                for(let i=0;i<howMany;i++){
                                    let howWitch = rannum(0,20)
                                    if(howWitch<13){
                                        new BadPlane(34,21,rannum(0,bg.offsetWidth-34),-21,rannumMin(3,4),2,1,'./img/smallplane.png','./img/smallplaneboom.gif');
                                    }else if(howWitch>=13&&howWitch<=19){
                                        new BadPlane(46,57,rannum(0,bg.offsetWidth-46),-57,rannumMin(2,3),8,3,'./img/midplane.png','./img/midplaneboom.gif');
                                    }else if(howWitch>19&&howWitch<=20){
                                        new BadPlane(110,159,rannum(0,bg.offsetWidth-110),-159,1,30,20,'./img/bigplane.png','./img/bigplaneboom.gif');
                                    }
                                }
                            }, 2000);
                            console.log('开始游戏');
                        }, 2000);
                    }
                    if(tabCont<2){
                        tabCont++;
                        tabContOn()
                    }
            }
        }
    })()

    // 飞行物
    class Plane{
        constructor(w,h,x,y,moveImg,boomImg){
            this.w = w;
            this.h = h;
            this.x = x;
            this.y = y;
            this.moveImg = moveImg;
            this.boomImg = boomImg;
        }
    }
    // 我方飞机
    class MyPlane extends Plane{
        constructor(w,h,x,y,blood,type,bullet,moveImg,boomImg){
            super(w,h,x,y,moveImg,boomImg);
            this.blood = blood;
            this.type = type;
            this.bullet = bullet;
            this.bulletCont = 22;
            this.createPlane();         // 创建
            this.movePlane();           // 移动
            this.bulletPlane();         // 射击
            // this.bulletContStart();     // 子弹填充
            this.bulletadd();           // 子弹缓慢生成
            this.Boarding()             // 飞机登场
            this.boomPlane()            // 飞机体检（检测血量）
            this.bloodAdd()             // 愤怒小鸟缓慢回血
            
        }

        // 创建
        createPlane(){
            this.myPlaneBox = document.createElement('div');
            this.myPlane = document.createElement('img');
            this.myPlaneBlood = document.createElement('div');
            this.myPlaneBloodNow = document.createElement('div');
            this.myPlaneBox.appendChild(this.myPlane)
            this.myPlaneBox.appendChild(this.myPlaneBlood)
            this.myPlaneBlood.appendChild(this.myPlaneBloodNow)
            this.myPlane.src = this.moveImg;
            this.myPlaneBox.blood = this.blood;
            this.myPlaneBox.type = this.type;
            this.myPlaneBox.bulletCont = this.bulletCont;
            this.myPlaneBox.className = 'myPlaneBox'
            this.myPlaneBlood.className = 'myPlaneBlood'
            this.myPlaneBloodNow.className = 'myPlaneBloodNow'
            this.myPlaneBloodNow.style.width = '100%'
            this.myPlane.className = 'Boarding myPlane'
            this.myPlaneBox.style.cssText = `width:${this.w}px;height:${this.h}px;position: absolute;left:${this.x}px;top:${this.y}px;`;
            area.appendChild(this.myPlaneBox)
        }

        // 飞机登场
        Boarding(){
            setTimeout(() => {
                this.myPlane.classList.remove('Boarding');
            }, 0);
        }

        // 移动
        movePlane(){
            document.addEventListener('keydown',direction);
            let that = this;
            let upTimer = null;
            let upFlag = true;
            let downTimer = null;
            let downFlag = true;
            let leftTimer = null;
            let leftFlag = true;
            let rightTimer = null;
            let rightFlag = true;
            function direction(e){
                switch(e.keyCode){
                    case 65:
                    case 37:
                        moveLeft();
                        break;
                    case 68:
                    case 39:
                        moveRight();
                        break;
                    case 87:
                    case 38:
                        moveUp();
                        break;
                    case 83:
                    case 40:
                        moveDown();
                }
            }
            function moveUp(){
                if(upFlag){
                    upFlag = false;
                    clearInterval(downTimer);
                    upTimer = setInterval(() => {
                        that.type!='愤怒小鸟'?that.y-=4:that.y-=20;
                        if(that.y<3)that.y = 3;
                        that.myPlaneBox.style.top = that.y + 'px';
                        document.addEventListener('keyup',stopMove);
                    }, 15);
                }
            }
            function moveDown(){
                if(downFlag){
                    downFlag = false;
                    clearInterval(upTimer);
                    downTimer = setInterval(() => {
                        that.type!='愤怒小鸟'?that.y+=4:that.y+=20;
                        if(that.y>bg.offsetHeight-that.h)that.y = bg.offsetHeight-that.h;
                        that.myPlaneBox.style.top = that.y + 'px';
                        document.addEventListener('keyup',stopMove);
                    }, 15);
                }
            }
            function moveLeft(){
                if(leftFlag){
                    leftFlag = false;
                    clearInterval(rightTimer);
                    leftTimer = setInterval(() => {
                        that.type!='愤怒小鸟'?that.x-=3:that.x-=15;
                        if(that.x<-20)that.x = -20;
                        that.myPlaneBox.style.left = that.x + 'px';
                        document.addEventListener('keyup',stopMove);
                    }, 15);
                }
            }
            function moveRight(){
                if(rightFlag){
                    rightFlag = false;
                    clearInterval(leftTimer);
                    rightTimer = setInterval(() => {
                        that.type!='愤怒小鸟'?that.x+=3:that.x+=15;
                        if(that.x>bg.offsetWidth-that.w+20)that.x = bg.offsetWidth-that.w+20;
                        that.myPlaneBox.style.left = that.x + 'px';
                        document.addEventListener('keyup',stopMove);
                    }, 15);
                }
            }
            function stopMove(e){
                switch(e.keyCode){
                    case 65:
                    case 37:
                        clearInterval(leftTimer);
                        leftFlag = true;
                        break;
                    case 68:
                    case 39:
                        clearInterval(rightTimer);
                        rightFlag = true;
                        break;
                    case 87:
                    case 38:
                        clearInterval(upTimer);
                        upFlag = true;
                        break;
                    case 83:
                    case 40:
                        clearInterval(downTimer);
                        downFlag = true;
                }
            }
        };

        // 射击
        bulletPlane(){
            let bulletFlag = true; 
            let bulletStartTimer = null;
            let that = this;
            document.addEventListener('keydown',function(e){
                // console.log(that);
                if(e.keyCode == 74){
                    if(bulletFlag&&myPlane.myPlaneBox.bulletCont){
                        bulletFlag = false;
                        switch(that.bullet){
                            case 'common':
                                // console.log('我在里面加了普通弹!');
                                new Bullet(6,14,that.x+that.w/2-3,that.y-14,'common',that,'./img/bullet01.png');
                                break;
                            case 'superSpeed':
                                // console.log('我在里面加了高速!');
                                new Bullet(6,14,that.x+that.w/2-3,that.y-14,'superSpeed',that,'./img/bullet02.png');
                                new Bullet(6,14,that.x+that.w/2-3,that.y-44,'superSpeed',that,'./img/bullet02.png');
                                new Bullet(6,14,that.x+that.w/2-3,that.y-74,'superSpeed',that,'./img/bullet02.png');
                                break;
                            case 'laser':
                                // console.log('我在里面加了激光!');
                                new Bullet(6,550,that.x+that.w/2-3,that.y-14,'laser',that,'./img/bullet02.png');
                                // console.log(that);
                                break;
                        };
                        myPlane.myPlaneBox.bulletCont-=2;
                        myPlane.bulletContStart();
                    }
                    clearInterval(bulletStartTimer)
                    bulletStartTimer = setInterval(() => {
                        if(myPlane.myPlaneBox.bulletCont){
                            
                            switch(that.bullet){
                                case 'common':
                                    new Bullet(6,14,that.x+that.w/2-3,that.y-14,'common',that,'./img/bullet01.png');
                                    myPlane.myPlaneBox.bulletCont-=2;
                                    myPlane.bulletContStart();
                                    break;
                                case 'superSpeed':
                                    console.log('我在里面加了高速!');
                                    new Bullet(6,14,that.x+that.w/2-3,that.y-14,'superSpeed',that,'./img/bullet02.png')
                                    new Bullet(6,14,that.x+that.w/2-3,that.y-44,'superSpeed',that,'./img/bullet02.png')
                                    new Bullet(6,14,that.x+that.w/2-3,that.y-74,'superSpeed',that,'./img/bullet02.png')
                                    myPlane.myPlaneBox.bulletCont-=2;
                                    myPlane.bulletContStart();
                                    break;
                                case 'laser':
                                    console.log('我在里面加了激光!');
                                    new Bullet(6,550,that.x+that.w/2-3,that.y-14,'laser',that,'')
                                    myPlane.myPlaneBox.bulletCont-=1;
                                    myPlane.bulletContStart();
                                    break;
                            };
                        }
                    }, 150);
                }
            })
            document.addEventListener('keyup',function(e){
                if(e.keyCode == 74){
                    bulletFlag = true;
                    clearInterval(bulletStartTimer)
                }
            })
        }

        // 子弹填充
        bulletContStart(){
            let inner = '';
            for(let i=0;i<this.myPlaneBox.bulletCont/2;i++){
                inner += this.myPlaneBox.bulletType;
                // inner += `<img src="./img/bullet01.png">`
            }
            mianCont.innerHTML = inner;
        }

        // 子弹缓慢生成
        bulletadd(){
            setInterval(() => {
                if(this.myPlaneBox.bulletCont<23){
                    this.myPlaneBox.bulletCont += 2;
                    this.bulletContStart();
                }
            }, 2000);
        }

        // 愤怒的小鸟缓慢回血
        bloodAdd(){
            if(this.type=='愤怒小鸟'){
                setInterval(() => {
                    if(this.blood<10)e.blood+=1;
                }, 5000);
            }
        }

        // 飞机血量检测
        boomPlane(){
            let now = this.myPlaneBox.blood/this.blood*100+'%'
            let myPlaneLife = setInterval(() => {
                if(now != this.myPlaneBox.blood/this.blood*100+'%'){
                    now = this.myPlaneBox.blood/this.blood*100+'%'
                    this.myPlaneBloodNow.style.width = now;
                    this.myPlaneBlood.classList.add('show');
                    this.myPlaneBox.classList.add('shake')
                    setTimeout(() => {
                        this.myPlaneBox.classList.remove('shake')
                    }, 200);
                    setTimeout(() => {
                        this.myPlaneBlood.classList.remove('show')
                    }, 1000);
                }
                if(this.myPlaneBox.blood<=0){
                    clearInterval(myPlaneLife);
                    this.myPlane.src=this.boomImg;
                    setTimeout(() => {
                        area.removeChild(this.myPlaneBox);
                        new Ammo(30,30,this.x,this.y,30,1,2,'./img/bulletBig.png');
                        // 游戏结束
                        if(document.querySelectorAll('.myPlane').length == 0){
                            let scoreAll = localStorage.getItem('planeWarScore');   //获取得分榜
                            let active = true;                                      //结算面板默认选择第一项-再次游戏
                            let d = new Date;                                       //获取现在事件
                            let scoreNow = {'score':+score.innerHTML,'type':this.type,'data':d.getMonth()+1+'.'+d.getDate()}//获取此次得分
                            gameOver.classList.add('out');
                            // 渲染得分榜
                            (function(){
                                lastScore.innerHTML = +score.innerHTML + '分';
                                scoreAll?scoreAll=scoreAll.split('&'):scoreAll=[];
                                scoreAll.push(JSON.stringify(scoreNow));
                                let scoreNew = scoreAll.map(e=>{return JSON.parse(e);})
                                function compare(property) {
                                    return function (a, b) {
                                        return (b[property] - a[property])
                                    }
                                }
                                scoreNew.sort(compare('score'));
                                if(scoreNew.length>10)scoreNew = scoreNew.slice(0,10);
                                historyOne.forEach((e,i)=>{
                                    if(scoreNew[i])e.innerHTML = `<p>${i+1}</p><p>${scoreNew[i]['type']}</p><p>${scoreNew[i]['score']}</p><p>${scoreNew[i]['data']}</p>`;
                                });
                                localStorage.setItem('planeWarScore',scoreAll.join('&'));
                            })()
                            document.addEventListener('keydown',(ev)=>{
                                if(ev.keyCode==87||ev.keyCode==38){
                                    active = true;
                                    repeat.classList.add('active')
                                    history.classList.remove('active')
                                }
                                if(ev.keyCode==83||ev.keyCode==40){
                                    active = false;
                                    history.classList.add('active')
                                    repeat.classList.remove('active')
                                }
                                if(ev.keyCode==13||ev.keyCode==74||ev.keyCode==97){
                                    if(active == true){
                                        location.reload();
                                    }else{
                                        historyList.classList.add('out')
                                        gameOver.classList.add('goout')
                                        document.addEventListener('keydown',function(ev){
                                            if(ev.keyCode==13||ev.keyCode==74||ev.keyCode==97)location.reload();
                                        });
                                    };
                                };
                            });
                        };
                    }, 600);
                }
            }, 20);
        }
    }
    document.documentElement.onmousemove=function(e){
        // console.log(e.pageY);
    }
    // 我方子弹
    class Bullet extends Plane{
        constructor(w,h,x,y,type,master,moveImg){
            super(w,h,x,y,moveImg);
            this.type = type;
            this.master = master;
            this.createBullet();
            this.moveBullet();
            this.myPlaneAttack();
        }
        // 生成弹药
        createBullet(){
            if(this.type != 'laser'){
                this.oneBullet = document.createElement('img');
                this.oneBullet.src = this.moveImg;
                this.oneBullet.style.cssText = `width:${this.w}px;height:${this.h}px;position:absolute;left:${this.x}px;top:${this.y}px`;
            }else{
                this.oneBullet = document.createElement('div');
                this.oneBullet.style.cssText = `width:0px;height:${this.h}px;position:absolute;left:${this.x}px;top:${this.y-500}px;background-color: rgba(221, 160, 221, 0.5);transition: width .15s;`;
            }
            area.appendChild(this.oneBullet);
        }
        // 子弹飞行
        moveBullet(){
            if(this.type != 'laser'){
                this.bulletTimer = setInterval(() => {
                    this.type != 'superSpeed'?this.y -= 5:this.y -= 8;
                    this.oneBullet.style.top = this.y +'px';
                    if(this.y<-6){
                        clearInterval(this.bulletTimer);
                        area.removeChild(this.oneBullet)
                    }
                    this.myPlaneAttack()
                }, 20);
            }else{
                this.date = new Date().getTime();
                this.bulletTimer = setInterval(() => {
                    this.myPlaneAttack()
                    this.oneBullet.style.left = parseInt(this.master.myPlaneBox.style.left)+this.master.w/2-parseInt(this.oneBullet.style.width)/2+'px';
                    this.oneBullet.style.top = parseInt(this.master.myPlaneBox.style.top)-this.h+'px';
                    this.x = parseInt(this.master.myPlaneBox.style.left)+this.master.w/2-parseInt(this.oneBullet.style.width)/2;
                    this.y = parseInt(this.master.myPlaneBox.style.top)-this.h;
                    if(new Date().getTime()-this.date>0){
                        this.oneBullet.style.width=4+'px';
                    }
                    if(new Date().getTime()-this.date>150){
                        this.oneBullet.style.width=0;
                    }
                    if(new Date().getTime()-this.date>300){
                        clearInterval(this.bulletTimer);
                        area.removeChild(this.oneBullet);
                    }
                }, 20);
            }
        }
        // 子弹撞击
        myPlaneAttack(){
            let foe = document.querySelectorAll('.foe');
            foe.forEach((e,i)=>{
                if(foe[i].blood>0&&this.x>parseInt(e.style.left)&&this.x+this.w<parseInt(e.style.left)+parseInt(e.offsetWidth)&&this.y<parseInt(e.style.top)+parseInt(e.offsetHeight)&&this.y+this.h>parseInt(e.style.top)){
                    switch(this.type){
                        case 'superSpeed':
                        case 'common':
                            if(this.type == 'common')foe[i].blood-=2
                            if(this.type == 'superSpeed')foe[i].blood-=1
                            clearInterval(this.bulletTimer)
                            try{
                                area.removeChild(this.oneBullet)
                            }catch(e){
                                return;
                            }
                            break
                        case 'laser':
                            foe[i].blood-=0.15
                            break
                    };
                }
            })
        }
        typeBullet(type){
            if(type == 'superSpeed'){
                this.createBullet();
                this.moveBullet();
                this.createBullet();
                this.moveBullet();
            }
        }
    }
    // 掉落物资
    class Ammo extends Plane{
        constructor(w,h,x,y,bullet,xSpeed,ySpeed,moveImg){
            super(w,h,x,y,moveImg);
            this.xSpeed = xSpeed;
            this.ySpeed = ySpeed;
            this.bullet = bullet;
            this.createAmmo();
            this.moveAmmo()
        }
        // 创建子弹包
        createAmmo(){
            this.ammoone = document.createElement('img');
            this.ammoone.src = this.moveImg;
            // this.ammoone.bullet = this.bullet;
            this.ammoone.className = 'ammo';
            this.ammoone.style.cssText = `width:${this.w}px;height:${this.h}px;position:absolute;left:${this.x}px;top:${this.y}px`;
            area.appendChild(this.ammoone);
        }
        // 移动子弹包
        moveAmmo(){
            let xSpeedRan = rannumMin(-2,2)
            this.movePlaneTimer = setInterval(() => {
                this.x -= this.xSpeed*xSpeedRan;
                this.y += this.ySpeed;
                this.ammoone.style.left = this.x +'px';
                this.ammoone.style.top = this.y +'px';
                if(this.x<0||this.x>area.offsetWidth-this.w){
                    this.xSpeed*=-1;
                }
                if(this.y>area.offsetHeight+10){
                    clearInterval(this.movePlaneTimer);
                    area.removeChild(this.ammoone);
                }
                this.getAmmo()
            }, 20);
        }
        // 舔包
        getAmmo(){
            let myPlane = document.querySelectorAll('.myPlaneBox');
            myPlane.forEach((e,i)=>{
                if(this.x>parseInt(e.style.left)-this.w&&(this.x+this.w)<parseInt(e.style.left)+parseInt(e.offsetWidth)+this.w&&this.y<parseInt(e.style.top)+parseInt(e.offsetHeight)&&this.y>parseInt(e.style.top)-this.h){
                    this.ammoone.classList.add('out')
                    if(e.type=='愤怒小鸟'){
                        if(e.blood<10)e.blood+=2;
                    }else{
                        e.bulletCont += this.bullet;
                        if(e.bulletCont>24)e.bulletCont=24
                        let inner = '';
                        for(let i=0;i<e.bulletCont/2;i++){
                            inner += e.bulletType;
                            // inner += `<img src="./img/bullet01.png">`
                        }
                        mianCont.innerHTML = inner;
                    };
                    clearInterval(this.movePlaneTimer);
                    setTimeout(() => {
                        area.removeChild(this.ammoone);
                    }, 200);
                }
            })
        }
    }
    // 敌方飞机
    class BadPlane extends Plane{
        constructor(w,h,x,y,spend,blood,score,moveImg,boomImg){
            super(w,h,x,y,moveImg,boomImg);
            this.spend = spend;
            this.blood = blood;
            this.score = score;
            this.createPlane();
            this.movePlane()
        }

        // 创建
        createPlane(){
            this.bedPlane = document.createElement('img');
            this.bedPlane.src = this.moveImg;
            this.bedPlane.blood = this.blood;
            this.bedPlane.className = 'foe'
            this.bedPlane.style.cssText = `width:${this.w}px;height:${this.h}px;position:absolute;left:${this.x}px;top:${this.y}px`;
            area.appendChild(this.bedPlane)
        }

        // 移动
        movePlane(){
            this.movePlaneTimer = setInterval(() => {
                this.y += this.spend;
                this.bedPlane.style.top = this.y +'px';
                if(this.y>area.offsetHeight+10){
                    clearInterval(this.movePlaneTimer);
                    area.removeChild(this.bedPlane);
                }
                this.boomPlane()
                this.myPlaneCrash()
            }, 20);
        }

        // 飞机碰撞检测
        myPlaneCrash(){
            let myPlane = document.querySelectorAll('.myPlaneBox');
            myPlane.forEach((e,i)=>{
                if(this.x>parseInt(e.style.left)-this.w&&(this.x+this.w)<parseInt(e.style.left)+parseInt(e.offsetWidth)+this.w&&this.y<parseInt(e.style.top)+parseInt(e.offsetHeight)&&this.y>parseInt(e.style.top)-this.h){
                    switch(this.score){
                        case 1:
                            myPlane[i].blood-=1;
                            break;
                        case 3:
                            myPlane[i].blood-=2;
                            break;
                        case 20:
                            myPlane[i].blood-=8;
                    };
                    this.bedPlane.src=this.boomImg;
                    clearInterval(this.movePlaneTimer);
                    setTimeout(() => {
                        try{
                            area.removeChild(this.bedPlane);
                            switch(this.score){
                                case 1:
                                    myPlane[i].type!='愤怒小鸟'?new Ammo(20,30,this.x,this.y,3,1,2,'./img/bulletSma.png'):new Ammo(20,30,this.x,this.y,3,3,6,'./img/bulletSma.png');
                                    break;
                                case 3:
                                    myPlane[i].type!='愤怒小鸟'?new Ammo(30,30,this.x,this.y,4,1,2,'./img/bulletMid.png'):new Ammo(30,30,this.x,this.y,4,4,8,'./img/bulletMid.png');
                                    break;
                                case 20:
                                    myPlane[i].type!='愤怒小鸟'?new Ammo(30,30,this.x,this.y,30,1,2,'./img/bulletBig.png'):new Ammo(30,30,this.x,this.y,30,5,10,'./img/bulletBig.png');
                                    break;
                            };
                            score.innerHTML=+score.innerHTML+this.score;
                        }catch(e){
                            return;
                        }
                    }, 400);
                }
            })
        }

        // 敌机血量检测
        boomPlane(){
            if(this.bedPlane.blood<=0){
                clearInterval(this.movePlaneTimer);
                this.bedPlane.src=this.boomImg;
                switch(this.score){
                    case 1:
                        new Ammo(20,30,this.x,this.y,3,1,2,'./img/bulletSma.png');
                        break;
                    case 3:
                        new Ammo(30,30,this.x,this.y,4,1,2,'./img/bulletMid.png');
                        break;
                    case 20:
                        new Ammo(30,30,this.x,this.y,30,1,2,'./img/bulletBig.png');
                        break;
                };
                setTimeout(() => {
                    area.removeChild(this.bedPlane);
                }, 400);
                score.innerHTML=+score.innerHTML+this.score;
                score.innerHTML= ('00000'+score.innerHTML).slice(-5)
            }
        }
    }
})()