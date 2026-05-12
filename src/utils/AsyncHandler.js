
const AsyncHandler = (asyncFunc) => async (req, res, next) => {
  try {
    await asyncFunc(req, res, next)
  } catch (error) {
    console.log("Someting Went wrong -----> ", error)
    next(error)
  }
}


export default AsyncHandler
