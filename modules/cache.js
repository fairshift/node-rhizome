/*

	# Storage of compiled node-rhizome datasets
	- Recent states of one branch, in one language (saves bandwidth, increases number of documents in database)
	- Dataset variations (reduces need for processing database outputs within Node.js, increases number of documents in DB)

	Question: What is more efficient ...

			  - storing only full compilation of data node rhizome (as would possibly happen with NoSQL),
			  	and then reducing to match selection and rights/privileges?

			  - storing per branch dataset variation?

*/

const function readCache(tableName, node_id, branch_id, language_id){
	
}

const function writeCache(tableName, node_id, branch_id, language_id, timeout){
	
}

const function invalidateCache(tableName, node_id, branch_id, language_id){
	
}

/*

	# Functions to create and delete cached collections

*/

const function createCachedCollection(tableName){
	
}

const function deleteCachedCollection(tableName){
	
}

export {readCache, writeCache, invalidateCache, createCachedCollection, deleteCachedCollection};