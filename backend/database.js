import { Sequelize, DataTypes } from 'sequelize';

const connection = new Sequelize('flashcards' , 'root' , 'root' , {
    host : 'localhost',
    dialect : 'mysql'
});

const flashcard = connection.define('flashcard' , {
    id: {
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true,
    },

    question: {
        type:DataTypes.STRING,
        allowNull: false
    },

    answer: {
        type:DataTypes.STRING,
        allowNull: false
    },

});

connection.sync({force:false}).then(() => {
    console.log('Database and table created')
}).catch(err => {
    console.log("Error in creating tables and database")
})

export { connection,  flashcard};