game.module(
	'game.elements.slider'
)
.require(
	'engine.sprite'
)
.body(function() {
	
Slider = game.Sprite.extend({

	init: function(_x, _y) {
		this._super(_x, _y, 'bgSlider');

		this.level = new game.Sprite(0, 3 ,'level');
		this.level.anchor.set(0.5, 0.5);
		this.addChild(this.level);
		this.level.interactive = true;
		this.level.down = false;
		this.level.name = 'level';

		this.level.mousedown = function(evt) {
			this.down = true;
		}
		this.level.mousemove = function(evt) {
			if (this.down && game.scene.propertyActive) {
				if (this.position.x >= 0 && this.position.x <= 505) {
					this.position.x = evt.global.x-this.parent.x;
					var pct = this.position.x/505;
					var sub = pct*(game.scene.propertyActive.max - game.scene.propertyActive.min);
					var result = game.scene.propertyActive.min + sub;
					if (game.scene.propertyActive.max == 1) {
						result = result.toFixed(2);
					}
					else
					{
						result = Math.floor(result);
					}
					if (this.position.x < 0) {
						result = game.scene.propertyActive.min;
					} else if (this.position.x > 505) {
						result = game.scene.propertyActive.max;
					}
					game.scene.propertyActive.setText(result.toString());
					game.scene.propertyActive.value = result;
				}
				else
				{
					this.down = false;
					if (this.position.x < 0) {
						this.position.x = 0;
						game.scene.propertyActive.setText(game.scene.propertyActive.min);
						game.scene.propertyActive.value = game.scene.propertyActive.min;
					}
					else if (this.position.x > 505){
						this.position.x = 505;
						game.scene.propertyActive.setText(game.scene.propertyActive.max);
						game.scene.propertyActive.value = game.scene.propertyActive.max;
					}
					game.scene.changeProperty({name:game.scene.propertyActive.name, value:game.scene.propertyActive.value});
				}
			}
		}
		this.level.mouseup = this.level.mouseout = function(evt) {
			if (this.position.x < 0) {
				this.position.x = 0;
				game.scene.propertyActive.value = game.scene.propertyActive.min;
			}
			else if (this.position.x > 505){
				this.position.x = 505;
				game.scene.propertyActive.value = game.scene.propertyActive.max;
			}
			if (this.down) {
				game.scene.changeProperty({name:game.scene.propertyActive.name, value:game.scene.propertyActive.value});
			}
			this.down = false;
		}
	},
	loadProperty: function() {
		var pct = (game.scene.propertyActive.value+(-game.scene.propertyActive.min))/(game.scene.propertyActive.max+(-game.scene.propertyActive.min));
		var result = pct*505;
		this.level.position.x = result;
	}
});

});