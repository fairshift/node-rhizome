
export {
  NodeStatechain,
  Eventchain, Leapchain
}


const NodeStatechain = {
  
}


const Eventchain = {
  tableKey: 'eventchain',
  id: 'eventId',
}


const Leapchain = {
  tableKey: 'leapchain',
  id: 'leapId',
  extValidation: { // valida?
    ...EthereumAddr,
    ...TwitterAddr
  }
}