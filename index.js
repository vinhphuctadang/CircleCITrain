const Express = require('express')
const app = Express()
const parser = require('body-parser')
const db = require('mongoose')
const fs = require('fs')

const ENV = process.env.ENV || 'dev'
const cfg = require('yaml').parse(fs.readFileSync('servercfg.yaml', 'utf8'))[ENV]

db.connect(cfg.DB_URL, {useUnifiedTopology: true})

// parse application/x-www-form-urlencoded, reference: https://www.npmjs.com/package/body-parser
app.use(parser.urlencoded({ extended: false }))
// parse application/json
app.use(parser.json())

// for simplicity, just place all routes here
let mdKeyvalue = db.Model('keyvalue', {
	key: String,
	value: String
})
	
app.get('/', async(req,res)=>{
	res.send({ok: 1, status: 'running'})
})

app.post('/:key', async(req,res)=>{
	let key = req.params.key
	let value = req.params.value
	let result = mdKeyValue.findOneAndUpdate({key: key}, {value: value}, {new: true, upsert: true})
	res.send({ok: 1, status: result})
})

app.get('/:key', async(req,res)=>{
	let key = req.params.key
	let result = mdKeyValue.findOne({key: key})	
	res.send({ok: 1, value: result.value})
})

app.listen(80, ()=>{
	console.log('Running')	
})
