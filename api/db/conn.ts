import mongoose from "mongoose"

async function main() {
   await mongoose.connect('mongodb://localhost:27017/getPet')
   console.log('Application has connected with mongodb') 
}

main().catch((err)=>console.log(err))

module.exports = mongoose