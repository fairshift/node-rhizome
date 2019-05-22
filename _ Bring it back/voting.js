/*

  Voting mechanisms to enact motions in groups of people (circles)

*/
  
  const voting = {};
  voting.realizesAction = [ 
                            'circleMajority',           // 50%+
                            'circleSpecifiedMajority',  // % specified by group
                            'circleConsensus',          // All must agree

                            'empowered',                // Empowered commoners (group members) can decide in name of others

                            'minimumAttendance',        // % of attending voters required for motion to pass
                          ];

  voting.entityPower = [

    // Voting power is distributed ...
    'equalVotePerPerson', // equally among its members - individuals
    'equalVotePerEntity', // equally among its members - individuals and groups

    // Voting power is distributed, according to weighs, described in a specific value system, ...
  /*'fairVotePerPerson', // among individual members
    'fairVotePerEntity', // among individuals individuals and groups*/

    // There can be individual entities with power of veto
    'personCanHaveVeto',
    'circleCanHaveVeto',
    //'entityCanHaveVeto' // both of the above

  ];

  voting.delegate = [ //Entities (users and circles) can delegate their vote to a trusted peer

    'entrustPeer',
    'entrustExpert' // Is there a difference in how selection process of empowered commoners are selected?

  ];

  export voting;