/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SystemParam', {
		Id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Category: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		Key: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		Value: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		Creator: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		Updator: {
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
		tableName: 'SystemParam',
		timestamps: false,
		freezeTableName: true
	});
};
