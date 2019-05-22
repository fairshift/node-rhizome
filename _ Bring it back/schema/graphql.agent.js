//import { property, constant } from 'lodash';

export const schema = function($agentsFragment, $actionStateFragment){

return [`

type Agent {
  id: Int
  data_provider: String
  ${agentsFragment}
}

type Signed {
  ${agentsFragment}
  ${actionsFragment}
}

`]

};


/*

  # This needs reconsideration, if/when imagining a cross-platform approach
  
  # Question: How to map connected services (or peers) which store a unique data node (in a DHT type list), 
              when these services/peers have conflicting permissions (rights/privileges) to access data nodes / resources?

   (on Bittorrent's DHT "distributed sloppy hash table" protocol - http://bittorrent.org/beps/bep_0005.html)

*/