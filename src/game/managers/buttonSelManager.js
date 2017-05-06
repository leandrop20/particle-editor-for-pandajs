game.module(
	'game.managers.buttonSelManager'
)
.require(
	'engine.sprite',
	'game.elements.buttonSel'
)
.body(function() {

const names = new Array('position.x', 'position.y', 'positionVar.x', 'positionVar.y', 'angle', 'angleVar', 'speed', 'speedVar', 'life', 'lifeVar',
				  'count', 'duration', /*'durationTimer',*/ 'rate', /*'rateTimer',*/ 'velRotate', 'velRotateVar', 'rotate', 'rotateVar', 'startAlpha',
				  'endAlpha', 'startScale', 'startScaleVar', 'endScale', 'endScaleVar', 'accelAngle', 'accelAngleVar', 'accelSpeed', 'accelSpeedVar');
const properties = new Array(/* position.x */     [20, 400],
							 /* position.y */     [20, 490],
							 /* positionVar.x */  [0, 1000],
							 /* positionVar.y */  [0, 1000],
							 /* angle */          [0, 360],
							 /* angleVar */       [0, 360],
							 /* speed */          [0, 500],
							 /* speedVar */       [0, 500],
							 /* life */           [0, 10],
							 /* lifeVar */        [0, 10],
							 /* count */          [0, 500],
							 /* duration */       [0, 1000],
							 /* durationTimer */  /*[0, 10],*/
							 /* rate */           [0, 1],
							 /* rateTimer */     /* [0, 10],*/
							 /* velRotate */      [0, 100],
							 /* velRotateVar */   [0, 100],
							 /* rotate */         [0, 100],
							 /* rotateVar */      [0, 100],
							 /* startAlpha */     [0, 1],
							 /* endAlpha */       [0, 1],
							 /* startScale */     [0, 1],
							 /* startScaleVar */  [0, 1],
							 /* endScale */       [0, 1],
							 /* endScaleVar */    [0, 1],
							 /* accelAngle */     [-500, 500],
							 /* accelAngleVar */  [-500, 500],
							 /* accelSpeed */     [-500, 500],
							 /* accelSpeedVar */  [0, 500]);

ButtonSelManager = game.Container.extend({

	init: function() {
		this._super();
		this.IDs = names;
		this.buttons = new Array();
		var index = 0;
		var space = 0;
		var breaks = new Array([4, 6, 8], [1, 5], [2, 6, 8]);
		for (var i = 0; i < 3; i++) {
			
			for (var j = 0; j < 10; j++) {
				if (i == 1 && (j == 2 || j == 4 || j == 9)) {
					//doesn't create
				}
				else {
					this.buttons.push(new ButtonSel(names[index], index, properties[index][0], properties[index][1]));
					this.buttons[index].interactive = true;
					this.buttons[index].x = (i*(this.buttons[index].width+15))+508;
					space = 5;
					for (var k = 0; k < breaks[i].length; k++) {
						if (breaks[i][k] == j){
							space = 27;
						}
					}
					if (j == 0) {
						this.buttons[index].position.y = (j*(this.buttons[index].height+space))+55;
					}
					else {
						this.buttons[index].position.y = (this.buttons[index].height+this.buttons[index-1].position.y)+space;
					}
					this.addChild(this.buttons[index]);
					index++;
				}
			}
		}
	},
	activateBtn: function(_id) {
		for (var i = 0; i < this.buttons.length; i++) {
			if (i == _id) {
				this.buttons[i].setTexture('bgBtnOn');
				game.scene.activatingProperty(this.buttons[i]);
			}
			else {
				this.buttons[i].setTexture('bgBtnOff');
			}
		}
	},
	changeConfigs: function(_configs) {
		for (var i = 0; i < names.length; i++) {
			this.buttons[i].setText(_configs[names[i]]);
			this.buttons[i].value = _configs[names[i]];
		}
	}
});

});