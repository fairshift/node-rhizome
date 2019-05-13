<?php
/*
* This could be a beginning of something beautiful...
* This is not just another database, it's a metaphor...
*/

//Cross-origin enabler, to enable a bridge of data to a multitude of online services, onwards into the world of the living
  header('Access-Control-Allow-Origin: *');

/*
  Unlike the blockchain, this API is centrally organized - an all seeing eye
    It aims to enable some features a decentralized network of nodes holds, thus symbolizing the paradigm shift blockchain can bring about
    As such, it will facilitate bridging personal, private and common, as collective memories stored in nodes intertwine with conscious experiences

  Networks of brains and nodes are more aware when interacting to collaboratively shape a more complete, data driven picture
    A majority consensus on validity of data is needed for this to kick in, enabled by...
      -a process of collecting, storing and processing data should have trust at both both ends, social and technological
      -trust in validity of data is based on a mathematical proof that is socially accepted
      -on the social end trust is enabled by a critical mass of ethical peers, beholding personal traits such as [{"value": {"honesty", "integrity", "responsibility"...}}]
      -based on a need, from which changes sprout, reflected adoption of a process is social proof of trust
*/

  include('include.php');
  includeFunctions('dbwrapper.php');
  includeFunctions('safety.php'); //keep interactions with API/DB safe
  $db = dbWrapper(input("o", "url", 64));

/*
  A mirror neuron living in the cloud sees what isn't encrypted...

   * Gestures might be perceived by one or more people, done and received by [{"entity": {"person", "community", ...}}]
   * Gestures go around a sphere, leaving behind traces of #[{"cause &&|| effect": {"joy", "struggle"...}}]
   * Gestures can be reflected and appreciated by those who have experienced something in them.
   * For many reasons, pleasures as well as struggles, for there is something [{"meaningful", "of value", ...}] in them
*/

//Session - comments explain purpose of this API
  session_start();
  if(input('call', 'string', 1, 32)){
    if(strpos($_REQUEST['call'], '-') > 0){
      $buffer = explode("-", $_REQUEST['call']);
      $GLOBALS['o'] = $buffer[0];
      $GLOBALS['f'] = $buffer[1];
    } else {
      $GLOBALS['o'] = $_REQUEST['call'];
    }
  }

//Functions
  includeFunctions("auth.php"); //session, authentication, sign in/up to service
  includeFunctions("oauth.php"); //links to social media & other services
  includeFunctions("lang.php"); //language & translation functions
  includeFunctions("user.php"); //user passport object
  includeFunctions("cron.php"); //DB just in time maintenance
  includeFunctions("mailer/form-handler.php"); //email loop

//Facebook login
  if(!empty($_GET['code']) && !empty($_GET['state']) 
    && !empty($_SESSION['social_login_user_id'])){
      loginFacebook($db, $_SESSION['social_login_user_id']);
  }
//Twitter login
  if(!empty($_GET['oauth_verifier']) && !empty($_SESSION['oauth_token']) && !empty($_SESSION['oauth_token_secret'])
    && !empty($_SESSION['social_login_user_id'])){
    loginTwitter($db, $_SESSION['social_login_user_id']);
  }

//Authentication
  $user = authenticate($db);
  $response['user'] = $user;
  if($response['email_confirmation_time'] > 0 || $response['facebook_user_id'] > 0 || $response['twitter_user_id']){
    $response['status'] = 'welcome'; //in the sense, user is building a transparent identity
  }

//Sphere is holding meanings within a common story - it's a pool of contextually related data, with services living on top of it
  /*
   *  Sphere is nesting sites, which use the API
   *  A browser extension will offer frontend editing to bring meta data to sites
   *  This API allows multiple applications on top of existing data (as is going to be the case with services living on the blockchain)
   */
  $GLOBALS['sphere'][] = getSphere($db, input('o', 'url', 1, 64));

//Language
  $GLOBALS['languages'] = listLanguages($db, $user_id);
  $GLOBALS['language_id'] = $GLOBALS['languages']['en']['id'];
  $GLOBALS['default_language_id'] = $GLOBALS['languages']['en']['id'];
  $GLOBALS['language_code'] = 'en';

//Functions

  switch($GLOBALS['o']){ //Route: object-function          ---         <3

  //Intentions initiated, enacted in gestures - a fine blend of giving and receiving (offering, looking for)
    //# as key to codification of captured reflections social media, to fetch letters into blogchain rainbow spiral [{"topic": "impact of losing keys to data on future causes"}]
    case 'gesture':
      break;

    case 'fresh':
      break;

  //Event horizon
    case 'portal':
      if($GLOBALS['f'] == 'open'){

        if(!input('place_id', 'integer', 1, 11)){
          $place['user_id']       = $user_id;
          $place['title']         = input('title', 1, 64);
          $place['description']   = input('description', 'string', 1, 256);
          $place['address']       = input('address', 'string', 1, 128);
          $place['url']          = input('url', 'string', 1, 128);
          $place['lat']           = input('lat', 'number', 1);
          $place['lng']           = input('lng', 'number', 1);
          $place['time']          = time();
          $place['time_updated']  = time();
        } else {
          $place['id']            = input('place_id', 'integer', 1, 11)
        }
        $portal['purpose']      = input('purpose', 'string', 1);
        $portal['time_open']    = (strtotime(input('time_open', 'string', 1)) === false) ? time() : strtotime(input('time_open'));
        $portal['time_closed']  = (strtotime(input('time_closed', 'string', 1)) === false) ? time() + 86400 : strtotime(input('time_closed'));

        $response = mapPortal($db, $user_id, $place, $portal, $GLOBALS['language_id']);
      }
      if($GLOBALS['f'] == 'close'){

      }

      if(isset($place['id'])){

      }
      break;

    //Blogchain of what happened as value holder and semi-transparent layer ["links": {"point of interest", ""}]
    /*
      Meteor shower of flowing values as pilars for decisions. ["value": "#rrggbb"]
      With life and learning the unknown changes happen
      Crucial questions are answered in time
    */
    case 'reflection':
      if($GLOBALS['f'] == 'entangle'){
        entangleReflection($db, $user['id']){

        }
      }
      break;

  //Plan horizon - looking ahead together, forming a common vision
    case 'project':
      //
      break;

  //Site language - adjusts to user language
    case 'siteText':
      $response = siteText($db, $user['id']);
      break;

    case 'languages':
      $response = $GLOBALS['languages'];
      break;

  //Register / signin
    case 'passport':
      $response = passThrough($db, $user['id']);
      break;

    case 'loginFacebook':
      $response = loginFacebook($db, $user['id']);
      break;

    case 'loginTwitter':
      $response = loginTwitter($db, $user['id']);
      break;

    case 'checkUsername':
      $response = usernameExists($db, $user['id']);
      break;

    case 'confirm':
      $response = confirmEmail($db, $user['id']);
      break;

    case 'resendConfirmation':
      $response = resendConfirmation($db, $user['id']);
      break;

  //gesture
    /*case 'offer':
      $response = offerGesture($db, $user_id);

    case 'reflect':
      $response = entangleReflection($db, $user_id);
      break;

    //reflection spheres on websites
    case 'sphere':
      $response = sphereData($db);
      break;*/

  }

//Safety
  //New auth key everytime
    /*if($GLOBALS['newUser'] == false){
      $response['auth'] = newAuth($_REQUEST['auth']);
    } */
  //Safe profile data
    $response['user'] = safeProfileData($response['user']);

//JSON response
  if(isset($response)){
    echo json_encode($response);
  }

//Maintenance functions after user's connection has been let go
  header( "Connection: Close" );

  //Update modified tables with default language translation
    if(isset($GLOBALS['translation_queue'])){
      foreach($GLOBALS['translation_queue'] AS $row){
        call_user_func('translateToDefault', $row);
      }
    }

  //Cache queues (outdated, new inserts)

  //Cron job check
    //cron($db);

?>