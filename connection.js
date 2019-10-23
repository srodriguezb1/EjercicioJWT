function connect(callback){

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb+srv://SebasRB:sebasrb192@sebasrb-ljhlz.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(url, { useUnifiedTopology: true });
  
    client.connect(errClient=>{
      if(errClient!==null) 
        console.log("Error while connecting to mongodb: ", errClient);  
      
      const db = client.db("users");
  
      const collection = db.collection("usuarios");
  
      callback(client, collection);
  
    });
  }

  function getUsuarios(callback){
    connect( (client, collection) =>{
      collection.find({}).toArray(function(errDatabase, docs) {
        if(errDatabase!==null)
          console.log("Error while getting the collection", errDatabase);
        callback(docs);
        client.close();
      });
    });
  }

  function getUsuario(callback, userName){
    connect( (client, collection) =>{
      collection.find({username: userName}).toArray(function(errDatabase, docs) {
        if(errDatabase!==null){
          console.log("Error while getting the collection", errDatabase);
          }
          else{
        console.log("Me conecte")
        callback(docs);
          }
        client.close();
      });
    });
  }


  module.exports = { connect, getUsuarios, getUsuario}; 