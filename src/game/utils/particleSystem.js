game.module(
	'game.utils.particleSystem'
)
.require(
	'engine.particle'
)
.body(function() {

ParticleSystem = game.Emitter.extend({
	init: function(_texture, _configs) {
		this._super();

		this.textures.push(_texture);
  		this.changeConfigs(_configs);
	},
	changeConfigs: function(_configs) {
		this.position.x = _configs['position.x'];
        this.position.y = _configs['position.y'];
        this.positionVar.x = _configs['positionVar.x'];
        this.positionVar.y = _configs['positionVar.y'];
        this.angle = ((_configs['angle']/180)*Math.PI)-Math.PI;
        this.angleVar = (_configs['angleVar']/360)*Math.PI;
        this.speed = _configs['speed'];
        this.speedVar = _configs['speedVar'];
        this.life = _configs['life'];
        this.lifeVar = _configs['lifeVar'];
        this.count = _configs['count'];
        this.duration = _configs['duration'];
        // this.durationTimer = _configs['durationTimer'];
        this.rate = _configs['rate'];
        // this.rateTimer = _configs['rateTimer'];
        this.velRotate = _configs['velRotate'];
        this.velRotateVar = _configs['velRotateVar'];
        this.rotate = _configs['rotate'];
        this.rotateVar = _configs['rotateVar'];
        this.startAlpha = _configs['startAlpha'];
        this.endAlpha = _configs['endAlpha'];
        this.startScale = _configs['startScale'];
        this.startScaleVar = _configs['startScaleVar'];
        this.endScale = _configs['endScale'];
        this.endScaleVar = _configs['endScaleVar'];
        this.accelAngle = _configs['accelAngle'];
        this.accelAngleVar = _configs['accelAngleVar'];
        this.accelSpeed = _configs['accelSpeed'];
        this.accelSpeedVar = _configs['accelSpeedVar'];
        this.color = '0x'+_configs['color'];

	},
	changeProperty: function(_property) {
		var string = _property.name;
		var string2 = _property.name;
		if (_property.name != undefined) {
			if (string.indexOf('.') > 0) {
				string = string.slice(0, string.length-2);

				if (string2.slice(string2.indexOf('.')+1,string2.length) == 'x') {
					this[string].x = _property.value;
				}
				else {
					this[string].y = _property.value;	
				}
			}
			else {
				if (_property.name == 'color') {
					this[_property.name] = '0x'+_property.value;
				}
				else if (_property.name == 'angle') {
					this[_property.name]  = ((_property.value/180)*Math.PI)-Math.PI;
				}
				else if(_property.name == 'angleVar') {
					this[_property.name]  = ((_property.value/360)*Math.PI);
				}
				else {
					this[_property.name] = _property.value;
				}
			}
		}
	},
	exportSettings: function(_names) {
		var objExport = {};
		for (var i = 0; i < _names.length; i++){
			var string = _names[i];
			var string2 = _names[i];
			if (string.indexOf('.') > 0) {
				string = string.slice(0, string.length-2);
				if (string2.slice(string2.indexOf('.')+1,string2.length) == 'x') {
					objExport[_names[i]] = this[string].x;
				}
				else
				{
					objExport[_names[i]] = this[string].y;	
				}
			}
			else {
				if (string == 'angle') {
					objExport[string] = Math.floor(((this[string]/Math.PI)*180)+180);
				}
				else if (string == 'angleVar') {
					objExport[string] = Math.floor(((this[string]/Math.PI)*360));
				}
				else {
					objExport[_names[i]] = this[string];
				}
			}
		}
		objExport['color'] = this.color.toString().substr(2, this.color.toString().length);
		return objExport;
	}
});

});