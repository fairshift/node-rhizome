
import { parseConditions } from 'types.parse'


//
// Functions
//
export {
  mandatoryFirst, 
  compareSchema, compareSchema_mandatory1st
}


const mandatoryFirst = (schemaKeys) => {

    // Make those ! mandatory keys move towards front of the array
    var mandatory = {}, ignorable = {}
    schemaKeys.forEach( (key, condition) => {

        if(condition[0].length == 1)
            mandatory[key] = condition
        else
            ignorable[key] = condition
    })

    return { 
        mandatory1st: true, // This is the "Alles klar" first-off type of definition
        ...mandatory, ...ignorable 
    }
}



const compareSchema = (args, schemaProperties) => {

////r
  var typeErrs = {}

  if(schemaKeys[0] === 'mandatory1st')
    compareSchema_mandatory1st( args, schemaProperties.shift() )
////c

  args.forEach( (arg, value) => { var i = -1
    schemaProperties.forEach( (propName, conditions) => { i++

      if( typeof propName !== 'undefined' ){
        if( arg == propName ){

          // Argument is on schema
          if( conditions[0].length == 1 ){ // Remember !

            if( 'undefined' === typeof value 
               ||value.length == 0 ){

              typeErrs[ propName ].push('undefined')
              break;

            } else
              conditions.shift()
          }

          if( var errors = match(value, conditions) )
            typeErrs[ arg ] = errors

          break;
      } }
    })

    // Reduce weight of schema for the very near future :)
    if( i == 0 )
      schemaProperties.shift()
    else
      schemaProperties[key] == 'undefined'
  })

  return typeErrs
}
// Efficiency concerns answered here
// - jsperf.com/shift-vs-pop-and-reverse-plus-pop/7
// - stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object/21735614#21735614


const compareSchema_mandatory1st = (args, schemaProps, omit = true) => {

    schemaProps.forEach( (propName, conditions) => { var i = 
        args.forEach( (arg, value) => {

            // This is pure temple code
        })
    })
}



const match = (argVal, conditions) => {

  
}