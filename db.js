//copy pasted from original server.js
const Sequelize = require('sequelize'); 
const { STRING, TEXT} = Sequelize; //Datatypes that will be used in model attributes
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/fight_db'); //connection to database

//creating the model
const Fighter = conn.define('fighter', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        },
    },
    signature: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: 'Flailing'
    },
    bio: {
        type: TEXT,
        allowNull: false,
        defaultValue: 'Stay tuned to find out the backstory'
    }
}, {
    hooks: {
        beforeCreate: function(fighter) {
            fighter.name = fighter.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            fighter.signature = fighter.signature.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            fighter.bio = fighter.bio.split('. ').map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1)).join('. ');
        }
    }
});

//Class Methods
//Fighter.createWithName = name => Fighter.create({ name });

//data
let characters = [
    {
        name: 'kazuya',
        signature: 'demon slayer',
        bio: 'thrown off a cliff by his father Heihachi and antagonized by his ungrateful son Jin, Kazuya has scores to settle!'
    },
    {
        name: 'ryu',
        signature: 'shinko hadoken',
        bio: 'determined to win the World Warrior Tournament, Ryu will fight whoever.  you must defeat Sheng Long to stand a chance!'
    },
    {
        name: 'mike tyson',
        signature: 'right uppercut',
        bio: 'arguably the most awe-inspiring boxer ever, Iron Mike is now laying siege to virtual opponents. remember to cover your ears!'

    },
    {
        name: 'hunter hearst helmsley',
        signature: 'pedigree',
        bio: 'he is the game. originally a blue-blooded aristocrat he now runs the show. but he is always spoiling for a fight!'
    }
];

//SyncAndSeed the Database
const syncAndSeed = async() => {
    await conn.sync({ force: true });
    const [kazuya, ryu, tyson, hhh] = await Promise.all(
        characters.map(object => Fighter.create({
            name: object.name,
            signature: object.signature,
            bio: object.bio
        }))
    );

};

module.exports = {
    models: {
        Fighter
    },
    syncAndSeed
};