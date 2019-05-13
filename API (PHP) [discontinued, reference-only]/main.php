<?php

//
// Leap ahead:
// see ./main/ folder for "include.php" (system) and "router.php" (API calls)
//


/*

# Caching rhizome nodes & subscriptions schema
  Because some clients already hold knowledge of this database.
  ... might want to skip this comment if reading for the first time


  Schematics of this functionality (which was in development):
  -> ./cache-subscriptions.txt

  Architecture without an external caching database & subscription message queue
 (eg. Redis & RabbitMQ):
    $GLOBALS['nodes-sent'] array for subscriptions (data residing on connected devices)
    $GLOBALS['nodes-memory'] array for in-memory cache
    $GLOBALS['nodes-cache'] array for database cache

*/


  // Cross-origin enabler (API access from any domain or URL)
  header('Access-Control-Allow-Origin: *'); // A bridge of data to a multiverse of online services, onwards into the world of the living


/*
  This centralized database is a metaphor for it's decentralized counterparts (peer to peer, blockchain). It could be a beginning of a beautiful transformation, if only ...
*/


  error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
  // error_reporting(0); @ini_set('display_errors', 0);
  // "... Something's wrong, but I don't know whayt ..."


/*

  With blockchain, any changes to data states are stored in the distributed database
  This API aims to emulate some core features a decentralized network of nodes running blockchain 

    * creating a data pool accessible accross many services the user chooses to share it with (this database isn't distributed, though)
    * maintaining proof for validity of data

  Doing so we keep in mind necessities of the blockchain paradigm shift, enabling a smoother passage onwards (trust in central authority's proper management is needed until processed data is signed by users as well as functions/objects dealing with it - without the possibility of tampering with internal states)

  Networks of brain and computer nodes are more aware when interacting to collaboratively shape a more complete, data driven picture
  A majority consensus on validity of data is needed for this to kick in, enabled by...

    * a process of collecting, storing and processing data that enjoys trust at both both ends, social and technological
    * trust in validity of data is based on a mathematical proof that is socially accepted (merkletree)
    * on the social end trust is enabled by a critical mass of ethical peers, beholding personal traits such as { "values": ["honesty", "integrity", "responsibility", ...] }
    * based on a need from which changes sprout, adoption of a process is social proof of it's validity

  As such, this API (a milestone in research for a project) aims to serve as a spark imagination, supporting transition of collective memories from conscious experiences into data blocks (by criteria of simultaneous occurence, as with core blockchain protocol; by additional relational criteria, as will be seen with sharding on blockchain and data distribution on Peer2P networks)

*/


  session_start(); // authenticate(), loginFacebok(), loginTwitter() are imported in "main/include.php", with the rest of components  

  include('local/config.php'); // Database & social media accounts
  include('includer.php'); // Script, which allows for customizations to API (in "_custom/$domain/" folder)


  dbWrapper($account); // $GLOBALS['db'] stores database object
  unset($account);


/*

  Ethereum(.org) decentralized platform charges computing power to the user (in amount of Ether as currency), providing incentive for script efficiency. Here, ...

    * Interactions with this API are logged, tracking changes to data states, enabling data validation, access control and measuring script efficiency
    * Such pattern can be imagined to facilitate validation of encrypted data (requires use of private-public key pairs by users) - eg.: http://enigma.media.mit.edu/

  With Ethereum's blockchain, user accounts are hashes that already exist

*/

  $transaction = transaction(array('api_call' => $_GET['calls']));


// Apply default and user's selected languages to current queries

  $GLOBALS['node_languages'][] = $GLOBALS['default_language_id'] = 20; //default language is English
  // ... a function to remove any duplicates is missing here: $GLOBALS['node_languages'] = arrayAddDistinct($GLOBALS['node_languages'])

  $response['languages'] = getLanguageList(array('route' => array('languages' => $GLOBALS['node_languages'])));


// Process call(s) to API - one or more possible, simultaneously
  $calls = explode($_GET['calls'][',']);

  $priorities[] = 'user/auth';
  $priorities[] = 'user/languages';
  $priorities[] = 'site/domain';  // a) when user first loads a site
  $priorities[] = 'site/id';      // b) on all next loads -> site_id
  foreach($priorities AS $call){
    if(in_array($call, $calls)){
      $response[$call] = router($call);
      unset($calls[$call]);
    }
  }

  foreach($calls AS $call){
    $response[$call] = router($call); //route call: object/function <-- $_REQUEST[$call] stores input parameters
  }


// JSON response
  $response['nodes'] = $GLOBALS['nodes']; // TO-DO: don't send out what has already been received ($GLOBALS['nodes-sent'] array)
  if(isset($response)){
    echo json_encode($response);
  }



//
//
// Maintenance functions after connection to frontend applications has been closed
  header( "Connection: Close" );

// Update modified tables with default language translation
/* if(isset($GLOBALS['translation_queue'])){
    foreach($GLOBALS['translation_queue'] AS $row){
      translateToDefault($row);
    }
} */

// Scheduled "cron jobs"
// cron($db);

// Save transactions — log of activity in-and-out of important functions
  transaction(array('transaction' => $transaction));
  storeTransactions();
  
?>