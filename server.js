const { syncAndSeed, models: { Fighter } } = require('./db');
const express = require('express');
const path = require('path');

const app = express();

//Front end routes
//want a static folder to look into dist/
app.use('/dist', express.static(path.join(__dirname, 'dist')))

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

//initialize
const init = async() => {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`))

    }
    catch(ex) {
        console.log(ex);
    }
}

init();