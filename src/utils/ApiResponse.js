const ApiResponse = (
  statusCode = 200,
  data = null,
  message = "Success"
) => {

  return {
    statusCode,
    success: statusCode < 400,
    message,
    data
  }
}

export default ApiResponse 
