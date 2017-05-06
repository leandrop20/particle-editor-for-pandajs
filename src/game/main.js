/**
                         `,             ,                                    
  @@@@@          ;@      @            @@@@@             ,@                   
  @   @:         ;@      .     .      @   @   .`     `  #@   .`     `   `.   
  @..,@  @  @`   ;@     @#@:  @@@,    @@+`  `@+@# @+#@+ @@#`@+@# @+#@+ @@#@  
  @@@@@  @. @    ;@    @# `@ @  ,@      @@@    ;@ @;  @ #@    ;@ @;  @    @, 
  @   #@  @+#    ;@    @@@@@ @   @    ,   @``@#;@ @, ;@ #@ `@#;@ @, ;@ +@ @, 
  @   @@  @@     ;@    +@ ,; @: +@    @: `@ @+ +@ @, ;@ #@ @+ +@ @, ;@ @  @, 
  @@@@@   @@     ;@@@@, @@@` `@@@     :@@@+ .@@,@ @, ;@ :@@.@@,@ @, ;@ @@@@ 
          @                                                                 
         @@                                                                  
**/

game.module(
    'game.main'
)
.require(
    'engine.core',
    'engine.particle',
    'game.assets.assets',
    'game.managers.buttonSelManager',
    'game.elements.slider',
    'game.utils.simpleButton',
    'game.elements.buttonColor',
    'game.elements.pallete',
    'game.utils.particleSystem'
)
.body(function() {

var container;
var particle;
var changeImport;
var manager;
var btnColor;
var createParticle;
const defaultValues = { 'position.x':200, 'position.y':200, 'positionVar.x':0, 'positionVar.y':0, 'angle':0, 'angleVar':360, 'speed':100, 'speedVar':0,
                       'life':2, 'lifeVar':0, 'count':10, 'duration':0, 'durationTimer':0, 'rate':0.1, 'rateTimer':0, 'velRotate':0, 'velRotateVar':0,
                       'rotate':0, 'rotateVar':0, 'startAlpha':1, 'endAlpha':0, 'startScale':1, 'startScaleVar':0, 'endScale':1, 'endScaleVar':0,
                       'accelAngle':2, 'accelAngleVar':0, 'accelSpeed':0, 'accelSpeedVar':0, 'color':'FFFFFF' };

SceneInit = game.Scene.extend({
    backgroundColor: 0x808080,
    propertyActive: '',
    changeColor: null,

    init: function() {
        this.name = 'ttt';
        this.bg = new game.Sprite('bg');
        this.stage.addChild(this.bg);
        this.title = new game.Text('Particle Editor v1.2 for pandajs', {fill:'white', font:'14px Inconsolata'});
        this.title.x = game.system.width-this.title.width - 5;
        this.title.y = 5;
        this.stage.addChild(this.title);

        manager = new ButtonSelManager();
        this.stage.addChild(manager);

        this.btnTextDefault = new SimpleButton(713, 438, 'btnColor', 'Texture Default', {fill:'white', font:'14px Inconsolata'});
        this.stage.addChild(this.btnTextDefault);

        this.btnTextDefault.click = function() { createParticle('media/images/particle1.png'); }

        this.btnLoadTexture = new SimpleButton(713, 482, 'btnColor', 'Load Texture', {fill:'white', font:'14px Inconsolata'});
        this.stage.addChild(this.btnLoadTexture);

        this.btnLoadTexture.click = this.importTexture;

        btnColor = new ButtonColor(713, 526, 'btnColor');
        this.stage.addChild(btnColor);

        this.pallete = new Pallete(585, 155);
        this.stage.addChild(this.pallete);
        
        btnColor.click = this.pallete.show;

        this.slider = new Slider(462, 572);
        this.stage.addChild(this.slider);

        this.btnImport = new SimpleButton(205, 532, 'btnExport', 'Import Particle', {fill:'white', font:'14px Inconsolata'});
        this.stage.addChild(this.btnImport);
        this.btnImport.click = this.importJson;

        this.btnExport = new SimpleButton(205, 572, 'btnExport', 'Export Particle', {fill:'white', font:'14px Inconsolata'});
        this.stage.addChild(this.btnExport);
        this.btnExport.click = this.exportJson;

        this.c = new game.Container();
        game.scene.stage.addChild(this.c);
        container = this.c;
        
        this.maskara = new game.Graphics();
        this.maskara.beginFill(0xFFFFFF);
        this.maskara.drawRect(5, 5, 400, 500);
        this.c.addChild(this.maskara);
        this.c.mask = this.maskara;

        manager.changeConfigs(defaultValues);
        btnColor.changeColor(defaultValues.color);

        this.createParticle('media/images/particle1.png');

        this.changeColor = this.setColor;
        changeImport = this.changeImport;
        createParticle = this.createParticle;
    },
    createParticle: function(_texture) {
        if (particle != undefined) {
            game.scene.removeEmitter(particle);
            particle.remove();
            particle = null;
            container.remove();
            container = null;
            container = new game.Container();
            game.scene.stage.addChild(container);
        }
        particle = new ParticleSystem(_texture, defaultValues);
        game.scene.addEmitter(particle);
        particle.container = container;
    },
    click: function(evt) {
        
        if (evt.global.x >= 5 && evt.global.x <= 400 && evt.global.y >= 5 && evt.global.y <= 445) {
            particle.emit();
            particle.position.x = evt.global.x;
            particle.position.y = evt.global.y;
        }
    },
    activatingProperty: function(_obj) {
        this.propertyActive = _obj;
        this.slider.loadProperty();
    },
    changeProperty: function(_property) {
        particle.changeProperty(_property);
    },
    setColor: function(_color) {
        btnColor.changeColor(_color);
        particle.changeProperty({name:'color', value:_color});
    },
    changeImport: function(_configs) {
        manager.changeConfigs(_configs);
        btnColor.changeColor(_configs.color);
        particle.changeConfigs(_configs);
    },
    importJson: function() {
        function loading(evt) {
            var reader = new FileReader();
            reader.onload = function(e) {
                changeImport(JSON.parse(e.target.result));
            }
            reader.readAsBinaryString(evt.target.files[0]);
        }
        var input = document.createElement('input');
        input.type = 'file';
        input.id = 'file';
        input.style.display = 'none';
        input.click();
        document.body.appendChild(input);
        input.addEventListener('change', loading, false);
    },
    exportJson: function() {
        var blob = new Blob([JSON.stringify(particle.exportSettings(manager.IDs))]);
        var send = document.createElement("a");
        send.href = window.URL.createObjectURL(blob);
        send.download = 'particleSettings.json';
        send.click();
    },
    importTexture: function() {
        function loading2(evt) {
            var reader = new FileReader();
            reader.onload = function(evt) {
                var img = document.createElement('img');
                var dataURL = evt.target;
                var mimeType = dataURL.result.split(",")[0].split(":")[1].split(";")[0];
                if (mimeType != 'image/png') {
                    //Error
                }
                else {
                    img.src = dataURL.result;
                    if (img.width <= 100 && img.height <= 100) {
                        var time = window.setInterval(function() {
                            createParticle(game.Texture.fromImage(dataURL.result, true));
                            // window.clearInterval(time);
                        }, 2000);
                    }
                }
            }
            reader.readAsDataURL(evt.target.files[0]);
        }
        var input = document.createElement('input');
        input.type = 'file';
        input.id = 'file2';
        input.style.display = 'none';
        input.click();
        document.body.appendChild(input);
        document.getElementById('file2').addEventListener('change', loading2, false);
    }
});

// game.System.width = window.innerWidth * game.device.pixelRatio;
// game.System.height = window.innerHeight * game.device.pixelRatio;
game.System.orientation = game.System.LANDSCAPE;

game.Debug.enabled = true;
game.start(SceneInit, 1024, 600);

});