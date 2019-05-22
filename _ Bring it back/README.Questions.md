
 # 	Where to evaluate permissions?

[X]	outside of this package - in scope of application; ways of access are defined there
 - 	within this package: (!!! revise)

 # 	Should each branch of a node have an entry of its own in its collection? 

   	SQL:

 - 	No, because then there's less entries in database; more pressure to perfect their distinctive contents

[X] Yes: 'node-rhizome' can be attached to existing database layouts; DB can be searched without package;
				   there's more freedom in publishing contents (derivates, which have stemmed from another data node)

 - 	Both options could be possible in one application, leaving decision to maintainers of each branch,
   	but it means an option more for user, requires more work on 'node-rhizome' package and its implementation

   	NoSQL:

 - 	Yes: there's possible differences in permissions among branches
 - 	No: collections can have indexes set within documents and are thus searchable from within;
	  	cached rhizome are a compiled structure, which, according to permissions and requests,
	  	might need to have parts removed before returned to frontend

 #	What if it was important to include related datasets in validation?

 # 	Should each translation of a node have an entry of its own in its collection?

   	SQL:

[X] Yes: search can be set in application, while if multiple translations returned can be seen as equal, 
	  it might make sense to remove all but one, or to treat them as one in row count - to not skew pagination

 -  No: (!!! revise)

 # 	Should reports be tied to a data node, instead of to circles (groups) where data nodes have influence?

 # 	Should there be a list of users / entities who have seen (given attention) to a certain data node?

 #	What if each user was able to create their draft version in branch?

 # 	How to map connected services (or peers) which store a unique data node (in a DHT type list), 
              	  when these services/peers have conflicting permissions (rights/privileges) to access data nodes / resources?

       (on Bittorrent's DHT "distributed sloppy hash table" protocol - http://bittorrent.org/beps/bep_0005.html)
 
 #  How would a change in API route be recognized? 
 #  How would a change in data scheme at remote API point affect a node?

 #  Which storage medium / service to choose to store a global list of registered data nodes and validation hashes?
