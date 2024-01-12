const hapiJoiValidator = require ("@hapi/joi")

const validateLibrary = (data)=>{
    const validateBook = hapiJoiValidator.object({
        position: hapiJoiValidator.string().min(3).max(5).pattern(/^[a-zA-Z]+$/).required(),
        title: hapiJoiValidator.string().min(3).max(40).pattern(/^[a-zA-Z]+$/).required(),
        author: hapiJoiValidator.string().min(3).max(40).pattern(/^[a-zA-Z]+$/).required(),
        genre: hapiJoiValidator.string().min(3).max(40).pattern(/^[a-zA-Z]+$/).required(),       
        
    })
    return validateBook.validate(data)

};
const validateLibrary2= (data)=>{
    const validateBook = hapiJoiValidator.object({
        position: hapiJoiValidator.string().min(3).max(40).pattern(/^[a-zA-Z]+$/),
        title: hapiJoiValidator.string().min(3).max(40).pattern(/^[a-zA-Z]+$/),
        author: hapiJoiValidator.string().min(3).max(40).pattern(/^[a-zA-Z]+$/),
        genre: hapiJoiValidator.string().min(3).max(40).pattern(/^[a-zA-Z]+$/),
        
    })
    return validateBook.validate(data)

};
module.exports = {validateLibrary, validateLibrary2}