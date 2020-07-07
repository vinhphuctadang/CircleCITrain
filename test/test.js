const request = require('request')
const assert = require('assert')
const BASE_URL = process.ENV.TEST_URL || 'http://localhost:8080'

// make a request of desired method with custom options (and parse response to json)
function makeRequest(method, options){
	__method__ = null
	switch(method){
		case 'get':
			__method__ = request.get
			break
		case 'post':
			__method__ = request.post
			break
	}

	return new Promise(
		(resolve,reject)=>{
			__method__(options, (err, res, body)=>{
				if (typeof(res.body) === 'object')
					resolve(res.body)
				else
					resolve(JSON.parse(res.body))
			})
		}
	)
	return
}

async function set(key, value){
	let result = await makeRequest(
		'post',
		{
			url: `${BASE_URL}/${key}`,
			json: true,
			body: {
				value: value
			}
		}
	)
	return result
}

async function get(key){
	let result = await makeRequest(
		'get',
		{
			url: `${BASE_URL}/${key}`
		}
	)
	return result
}

// simple test
describe('Test key set and get API', ()=>{
	it('should success set key', async()=>{
		let result = await set('ci', 'CircleCI')
		assert.equal(result.ok, 1)
	}).timeout(3000)

	it('shoud return correct value key "ci"', async()=>{
		let result = await get('ci')
		console.log(result)
		assert.equal(result.ok, 1)
		assert.equal(result.value, 'CircleCI')
	}).timeout(3000)

	it('should set ci to vinhphuctadang', async()=>{
		let result = await set('ci', 'vinhphuctadang')
		assert.equal(result.ok, 1)
	}).timeout(3000)

	it('shoud return correct value key "ci"', async()=>{
		let result = await get('ci')
		console.log(result)
		assert.equal(result.ok, 1)
		assert.equal(result.value, 'vinhphuctadang')
	}).timeout(3000)
})
