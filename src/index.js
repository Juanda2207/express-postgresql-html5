const express = require('express');
const { dirname } = require('path');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

//routers

app.use(require('./routers/index'));


app.listen(app.get('port'), ()=>{
    console.log('Server on port 3000');
});

