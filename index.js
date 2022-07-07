const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

var mountains = [{id:0,name:"Mt. Rainier"},{id:1,name:"Mt. St. Helens"}]

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// allow cross-origin resource sharing (CORS)
app.use(cors());

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let port = process.env.PORT || 3000;


app.get("/mountains", (req,res)=>{
    res.send(mountains);
})
app.post("/mountain",(req,res)=>{
    mountains.push({id:req.body.id, name:req.body.name})
    res.send(`${JSON.stringify(mountains)} created`)
})
app.delete("/mountain/:id", (req,res)=>{
    console.log('delete:id:'+req.params.id)
    mountains = mountains.filter(item=> item.id != req.params.id)
    res.send("mountains left:"+JSON.stringify(mountains));
})

app.listen(port,()=>console.log(`Listening on ${port}`))