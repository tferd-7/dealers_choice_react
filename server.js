const { syncAndSeed, models: { Fighter } } = require('./db');
const express = require('express');
const path = require('path');

const app = express();

//Front end routes
//want a static folder to look into dist/
app.use('/dist', express.static(path.join(__dirname, 'dist')));

//need a static directory to expose the assets to the client 
app.use('/assets', express.static(path.join(__dirname, 'assets')))

//main page
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')))


//Back end routes
//see if we can show all fighters
app.get('/api/fighters', async(req, res, next)=> {
    try{
        res.send(await Fighter.findAll({
            attributes: {
                exclude: ['signature', 'bio']
            }
        }));
    }
    catch(ex){
        next(ex);
    }

})

//can we find 1 specificfighter
app.get('/api/fighters/:id', async(req, res, next)=> {
    try{
        res.send(await Fighter.findByPk(req.params.id));

    }
    catch(ex){
        next(ex)
    }
})

//make a new fighter
app.post('/api/fighters', async(req, res, next) => {
    try{
        const fighter = await Fighter.create(req.body);
        res.send(fighter);
    }
    catch(ex){
        next(ex)
    }
})

/*
//delete a specific fighter
app.delete('/api/fighters/:id', async(req, res, next) => {
    try{
        const fighter  = await Fighter.findByPk(req.params.userId);
        !fighter ? res.sendStatus(404) : await fighter.destroy(),
        res.sendStatus(204);
    }
    catch(ex){
        res.sendStatus(400);
    }
})
*/

//initialize
const init = async() => {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3100;
        app.listen(port, ()=> console.log(`listening on port ${port}`))

    }
    catch(ex) {
        console.log(ex);
    }
}

init();