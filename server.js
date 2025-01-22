require('dotenv').config();  
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const Recipe = require('./models/Recipe'); 

const app = express();
const PORT = process.env.PORT || 3000;  


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ dest: 'uploads/' });


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));


app.post('/submit-recipe', upload.single('recipeFile'), async (req, res) => {
  try {
    const { name, email, instructions } = req.body;
    const filePath = req.file ? req.file.path : null;

    const newRecipe = new Recipe({ name, email, instructions, filePath });
    await newRecipe.save();

    res.status(201).json({ message: 'Receta guardada con éxito', recipe: newRecipe });
  } catch (error) {
    console.error('Error al guardar la receta:', error);
    res.status(500).json({ message: 'Error al guardar la receta' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

   
