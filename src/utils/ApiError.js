class ApiError extends Error {
constructor(
    statusCode,
    message ="Something went wrong",
    errors = [],
    stack = "" // stack datatype is string not a stack "Error: Boom\n at functionA...\n at functionB..."
){
    super(message) // parent Error class is called as Parent class is executed first than the child class 
    this.statusCode = statusCode
    this.data = null, // learn about this.data field mein hota kya hai, Custom field created by developer
    this.message = message,
    this.success = false
    this.errors = errors // used when multiple errors exist 

    if(stack){
    this.stack = stack // this give us the stack trace 
 
  }
    else {
        Error.captureStackTrace(this, this.constructor);
    }
}
}

export {ApiError}
/*
data:null
Why?

Because request failed.

There is no useful data to return.
Sent to client / extra response information
is mostly there for API response consistency.

Many projects never actually use err.data.
Some projects use:

data

to store extra error details.
data is EXTRA INFORMATION ABOUT THE ERROR
throw new ApiError(
    400,
    "Validation failed"
)

Now you might store:

err.data = {
    invalidField: "email",
    receivedValue: "abc"
}
// --------------------STACK--------------------
 /*
        Where error occurred
Which function called it
Which function called that
Error: Database timeout
    at UserRepository.findUser()
    at UserService.login()
    at AuthController.login()
    AuthController.login()
        ↓
UserService.login()
        ↓
UserRepository.findUser()
        ↓
BOOM 💀
Database timeout
The actual error occurred at:

UserRepository.findUser()
try{
    throw new Error("Boom")
}
catch(err){
    console.log(typeof err.stack)
}
*/