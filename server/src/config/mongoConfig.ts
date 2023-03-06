export default () =>{ return `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.v8yjrjn.mongodb.net/?retryWrites=true&w=majority`}




/*
Normal configuration for app.module.
MongooseModule.forRoot(`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.v8yjrjn.mongodb.net/?retryWrites=true&w=majority`, 
{
  dbName: process.env.DB_name,
})
*/