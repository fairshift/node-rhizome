
In application container, outside of 'node-rhizome' package the following must occur: a variant of rhizomeTrie needs to be supplied with a corresponding 'JS function output object', 'collection (MongoDB)' / 'table (SQL)'

```js

const rhizomeTrie_variant = {
  'rzState': {
    'eventchain': {$: 0}
  },
  'leapchain': {
    'rzState': {$: 0}
  },
}

const dbRz = rhizomeInit({
	${nodeNamespace}: rhizomeTrie_variant
})

```