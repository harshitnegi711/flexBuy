import mongoose from "mongoose"

const ConnectDb = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}/our-database`)

    console.log("mongo is connected at host -----> ", connection.connection.host)

  } catch (error) {
    console.log("Error at connecting to mongo db --> ", error)
  }
}


export default ConnectDb;
