const multer = require('multer');

// Set up storage for post uploaded  ;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/posts')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"post" + '-' + file.originalname);
    }
});

// set up storage for profile and cover image;

let authStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"public/usersImg")
    },
    filename: (req, file, cb) => { 
        cb(null,Date.now()+"user"+"-"+file.originalname);
    }
})

// Create the multer instance
const uploadPost = multer({ storage: storage });
const uploadUserImage = multer({ storage: authStorage });

module.exports = {
    uploadPost,
    uploadUserImage
}