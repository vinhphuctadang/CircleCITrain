const Express = require('express')
const app = Express()
const parser = require('body-parser')
const db = require('mongoose')
const fs = require('fs')

const ENV = process.env.ENV || 'dev'
const cfg = require('yaml').parse(fs.readFileSync('servercfg.yaml', 'utf8'))[ENV]

console.log('Current ENV:', ENV)
console.log('Current Config:', cfg)

db.connect(
	cfg.DB_URL,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false, // will use native findOneAndUpdate of mongodb native driver
	}
)

// parse application/x-www-form-urlencoded, reference: https://www.npmjs.com/package/body-parser
app.use(parser.urlencoded({ extended: false }))
// parse application/json
app.use(parser.json())

// for simplicity, just place all routes here
let mdKeyValue = db.model('KeyValue', db.Schema({
	key: String,
	value: String
}))

app.get('/', async(req,res)=>{
	res.send({ok: 1, status: 'running'})
})

app.post('/:key', async(req,res)=>{
	let key = req.params.key
	let value = req.body.value
	let result = await mdKeyValue.findOneAndUpdate({key: key}, {value: value}, {new: true, upsert: true})
	res.send({ok: 1, status: result})
})

app.get('/:key', async(req,res)=>{
	let key = req.params.key
	// console.log(key)
	let result = await mdKeyValue.findOne({key: key}).lean()
	if (!result)
		res.send({ok: 0, msg: "Value not found"})
	else
		res.send({ok: 1, value: result.value})
})

app.listen(cfg.PORT || 8000, ()=>{
	console.log(`Running at ${cfg.PORT}`)
})
