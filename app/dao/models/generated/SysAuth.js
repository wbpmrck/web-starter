/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SysAuth', {
		AuthKey: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
			primaryKey: true
		},
		AuthName: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		AuthDesc: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		Enable: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		CreateTime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		UpdateTime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'SysAuth',
		timestamps: false,
		freezeTableName: true
	});
};
