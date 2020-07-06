const assert = require('assert')

async function set(key, value){
	let result = {}
	return result
}

async function get(key){
	let result = {}
	return result
}

// simple test
describe('Test key set and get API', ()=>{
	it('should success set key', async()=>{
		let result = set('ci', 'CircleCI')
		assert.equal(result.r, 1)
	})

	it('shoud return correct value key "ci"', async()=>{
		let result = get('ci')
		assert.equal(result.r, 1)
		assert.equal(result.value, ci)
	})
})
