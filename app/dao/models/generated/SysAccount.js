/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SysAccount', {
        Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        AccountName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
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
        Nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        MobilePhoneNo: {
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
