/***************** 
  
  SQL version only: database migrations (powered by Knex connector)

  This script could:

   - load up schema from data-manifest
   - generate tables from schema

   - fetch current tables from database
   - compare current database and data-manifest

   - create a migration script
   - backup tables that are being altered

   - run migration script

  For a start, it needs to do at least this:

   - load up schema from data-manifest
   - generate tables from schema
   - create a migration script
   - run migration script

*****************/

export function up(knex, Promise) {
  return Promise.all([

    /*knex.schemcreateTable('users', (table) => {

    }),*/

  ]);
}

export function down(knex, Promise) {
  return Promise.all([
    //knex.schemdropTable('comments'),
  ]);
}