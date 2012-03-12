

// okami language definitions
var okami = function() {

  // identities
  var id = {}

  id.identifier: {
    id: "i",
    regex: "([a-zA-Z0-9]+)[^a-zA-Z0-9]"
  }

  id.boolean: {
    id: "b",
    regex: ""
  }
  
  id.number: {
    "id": "n",
    "regex": ""
  }
  
  id.string: {
    "id": "s",
    "regex": ""
  }
  



  // operators
  var op = {}

  // operator forms
  var f = {
    infix: "infix",
    prefix: "prefix",
    postfix: "postfix",
    exp: "expression",
  }

  
  op.dot = {
      symbol: ".",
      regex: "\.",
      forms: [ f.in ]
  }

  op.assignment = {
      symbol: ":",
      regex: ":",
      forms: [ f.in ]
  }

  op.bang = {
      symbol: "!",
      regex: "!",
      forms: [ f.in, f.pos, f.pre, f.exp ]
  }

  op.object = {
      symbol: "@",
      regex: "@",
      forms: [ f.pre, f.exp ]
  }






  var pub = {}
  pub.identities = id
  pub.operators = op

  return pub
}()







