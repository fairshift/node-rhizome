
//
// Document: node-rhizome GET / SELECT queries
//          (from nodeGet.php)
// Description:
// Logic is partially described here, for additional clarity later on
//


// Call to load a data "node" / "point" 
// and N(=horizon-cascade) levels of related nodes ...
function getNode(){
  return null // This function is to be built in controller, not here, because ...
        // - SQL storage and caching implementation is a decision to be made
} 


const getNodeByLanguage = (args) => {
  
  var { node_id, line_id, language_id } = args

  return
  'SELECT language_id FROM node_state WHERE node_id = "${route['node_id']}" '+
  'AND line_id = "${route['line_id']}" '+
  'AND language_id = "${language_id}" '+
  'LIMIT 1'
}


const getNodeTables = (args) => {

  var { route, sql_where } = args, sql

  if( route['table'] && route['id']   && !route['node_id'] ){

    if( route['id'] ){
      sql_where[] = 'id = "${route['id']}"'
    }

    return 
    'SELECT *, id AS ${route['table']}_id  FROM ${route['table']} WHERE '+ 
     sql_where.join(' AND ')

  } else if(route['node_id']){

    if(!route['main']){

      return
      'SELECT id AS node_id, table_name, main_line_id '+
      'FROM node '+
      'WHERE table_name = "${route['table']}" '+
      'AND entry_id = "${node['id']}"'

    } else { // ... eg. when a specific branch isn't found, switch to main

      return
      'SELECT id AS node_id, entry_id, table_name, main_line_id '+
      'FROM node WHERE id = "${route['node_id']}"'
  }
}


const getLine = (args) => {

  var { route, input } = args, line_id = null


  // Filter lines by related datasets
  if(!input['relation'])
    input['relation'] = '*'


  // Line - current line, root line and line tied to
  try
    line_id = (route['line_id']) ? route['line_id'] : route['main_line_id']
  catch(err)
    return err
  sql_where[] = 'id = "${line_id}"'

  // ROOTED: Line / Eventchain that is rooted in current line
  if(dataset = '*' || dataset = 'rooted'){
    sql_where[] = 'root_line_id = "${line_id}"' 
  }
  // TIED: Line / Eventchain that is tied to current line
  if(dataset = '*' || dataset = 'tied'){
    sql_where[] = 'tie_line_id = "${line_id}"' 
  }


  return
  'SELECT *, id AS line_id '+
  'FROM node_line WHERE '+
  sql_where.join(' OR ')+
  ' ORDER BY id = {$line_id} DESC, id DESC'

  // OMITTED: Additional logic applied by controller
  // pointer_state_time = [ root_pointer_state_time, tie_pointer_state_time ]
}


const getCachedNode = (args) => {

  var {
    node_cache_table,
    node_id, line_id,  language_id,
    horizon,
    time_unsynchronized
  } = args


  return 
  'SELECT response, nodes FROM ${node_cache_table} ',
  'WHERE node_id = "${route['node_id']}" ' +
  'AND line_id = "${route['line_id']}" ' +
  'AND language_id = "{language_id}" ' +
  'AND horizon >= "${horizon}" ' +
  'AND time_unsynchronized ${unsynchronized} ' +
  'ORDER BY ABS(horizon - ${horizon}) ASC LIMIT 1'
}


// Within a content line there's a trail of content states, evolution thereof
// ... also known as "history of changes", "audit trail"
const getState = (args) => {

  var { route, input } = args, sql_where = [], sql_lang = []


  if( route['node_id'] && route['line_id']
      && input['template'] 
      && route['languages'].isArray() ){

    sql_where = [
      "node_id = '${route['node_id']}'",
      "line_id = '${route['line_id']}'"
    ]

    route['languages'].forEach( (language_id) => {

      sql_lang = [...sql_lang,
        "language_id = '${language_id}'"
      ]
    }
    sql_where = [...sql_where,
      "( "+ sql_lang.join(' AND ') +" )"
    ]
  }

  //
  // Something about this will get an update
  // because of the way how node-rhizome augments existing collections and/or tables
  /*

        //Get current state of content for each field
          foreach($input['template'] AS $field => $content){

            if(!in_array($field, array('id', 'node_id', 'main_line_id', 'table', 'entry_id', 'created_by_user_id', 'created_by_entity_id', 'time_created', 'time_updated', 'closed_by_user_id', 'closed_by_entity_id', 'time_closed', 'open_by_user_id', 'open_by_entity_id', 'time_open', 'removed_by_user_id', 'removed_by_entity_id', 'removed_time'))){

              $sql_where['field'] = "field = '{$field}'";

              if($route['pointer_state_time'] && $route['pointer_state_time'] != 'current'){
                $sql = 'SELECT * FROM node_state WHERE '.implode(' AND ', $sql_where).' ORDER BY current DESC, id DESC LIMIT 1';
              } else {
               $sql = 'SELECT * FROM node_state WHERE '.implode(' AND ', $sql_where).' ORDER BY current DESC, id DESC LIMIT 1';
             }

            $result = mysqli_query($db, $sql);
            if($content = mysqli_fetch_array($result, MYSQLI_ASSOC)){

              $query[$language_id][$field] = $content;

              if($nodes = undersigned($content)){
                $query[$language_id]['related_nodes'] = arrayAddDistinct($query[$language_id]['related_nodes'], $nodes);
              }
            }
          }
          }
  */

  return
  'SELECT * FROM node_state "WHERE '.implode(' AND ', $sql_where).' ORDER BY current DESC, id DESC LIMIT 1'
  }
}


const generateActionField = (args) => {

  var { actionsArr } = args

}