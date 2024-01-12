
const libraryModel = require('../bookModel/bookmodel')

const {validateLibrary, validateLibrary2} = require("../helpers/validator")

//create books in my shelf  
exports.createABook = async (req,res) =>{
    try {
        const {error} =  validateLibrary(req.body)
        if(error){
            res.status(500).json({
                message:error.details[0].message,
            })
        }else{
        
        const book = new libraryModel(req.body);
        
        if(req.body.position !== "admin") {
         res.status(400).json({
            message: "Unauthorised Access. Sorry you're not an Administrator",
         });
    }else{
    await book.save();
    res.status(201).json({
        message: "Book has been added to THE PAGE CAFE",
        data : book
       
    })
}
} 
   }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

//Display all available book 
exports.displayBook = async (req, res) => {
    try{
        const book = await libraryModel.find()
        if(book.length == 0){
            res.status(404).json({
                message: "Oops! books are not available",
            })
        } else{
            res.status(200).json({
                message :`There are ${book.length} books available in this database`,
                data : book
            })
        }

    }catch{
        res.status(500).json({
            message: error.message,
        })
    }
}


//Get a book by Id or Issue a book by Id
exports.issueABook =  async (req, res) => {
    try{
        titleId=req.params.titleId
       // title  = (req.params.title).toLowerCase();
         
 const book = await libraryModel.findById(titleId);
//  const book = await libraryModel.find({ title: { $regex: `^${title}$` }})
        if (!book) {
            res.status(404).json({
                message:`Oops! This book ${titleId} is not available`
            })
            return;
        }else{
            res.status(200).json({
                message: `Enjoy! This book id: ${titleId} is available for pleasure`,
                data: book,
            })
        } 
    }catch(error){
        res.status(500).json({
        message:error.message,
        })
 
    }
}


//Update book 
exports.updateBook = async (req, res) => {
    try{
        const {error} =  validateLibrary2(req.body)
        if(error){
            res.status(500).json({
                message:error.details[0].message,
            });
            return;
        }else{
        //track book id
    const titleId= req.params.titleId;

    //track book with the id gotten
    const book = await libraryModel.findById(titleId);
   
    if(!book){
        res.status(400).json({
            message :`book with id ${titleId} is not registered`
        })
        return;
    }
     //check for book and replace the book update
     const bookUpdateData ={
        position: req.body.position || book.position,
        title : req.body.title || book.title,
        author: req.body.author || book.author, 
        genre: req.body.genre || book.genre

    }
    const updatedBook = await libraryModel.findByIdAndUpdate(titleId, bookUpdateData,  {new:true,
        })
       
        if(req.body.position !== "admin"){
            res.status(400).json({
                message: "Unauthorised Access. you're not allowed to make any changes",
            });
            return;

        }
    
    else{
            res.status(200).json({
                message: `${titleId} has been updated successfully`,
                data: updatedBook ,
            })
        }
    }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

//Remove Outdated Book
exports.outdatedBook = async (req, res) => {
    try{
        const bookId = req.params.bookId;
        const book = await libraryModel.findById(bookId);

if(!book) {
    res.status(404).json({
        message: `Book with id:${bookId} not found`
    });
}
//delete the book now
await libraryModel.findByIdAndDelete(book);
return res.status(200).json({
    message: `The ${bookId} has been deleted`,
    data: book,
})


    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
}



