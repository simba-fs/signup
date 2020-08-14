module.exports = class Pool{
	constructor(type, timeout=0){
		/** @type {Number} */
		this.timeout = timeout;
		/** @type {Array} */
		this.pool = [];
		this.type = type;
	}

	add(data, timeout=this.timeout){
		// type check
		if(!(data instanceof this.type)) return this;

		this.pool.push(data);
		if(this.timeout !== 0){
			setTimeout(() => this.pool = this.pool.filter(i => i !== data), timeout);
		}
		return this;
	}

	clear(){
		this.pool = [];
		return this;
	}

	remove(query){
		if(
			this.type === Object ||
			typeof this.type[Symbol.iterator] === 'function'
		){
			let result = this.pool;
			for(let i in query){
				console.group(i);
				result = result.filter(item => {
					return item[i] === query[i]
				});
				console.groupEnd(i);
			}
			for(let i of result) this.pool = this.pool
				.filter(j => i !== j);
		}
		return this;
	}

	*[Symbol.iterator](){
		for(let i of this.pool) yield i;
	}
}
