/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SysAccount', {
		AccountName: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
			primaryKey: true
		},
		AccountPasswordSecret: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		Salt: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
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
		tableName: 'SysAccount',
		timestamps: false,
		freezeTableName: true
	});
};
