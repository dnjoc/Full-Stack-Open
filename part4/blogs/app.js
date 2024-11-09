require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app



//codigo principal
// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');

// // Cargar URL de MongoDB desde la variable de entorno
// const mongoUrl = process.env.MONGODB_URL
// mongoose.connect(mongoUrl)

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// });

// const Blog = mongoose.model('Blog', blogSchema);

// app.use(cors());
// app.use(express.json());

// app.get('/api/blogs', (request, response) => {
//   Blog.find({}).then(blogs => {
//     response.json(blogs);
//   });
// });

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body);
//   blog.save().then(result => {
//     response.status(201).json(result);
//   });
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });
