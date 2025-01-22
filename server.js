const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const Recipe = require('./models/Recipe'); 



const app = express();
const PORT = 3000;



app.use(express.static(path.join(__dirname, 'public')));""
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ dest: 'uploads/' });

// Conexión a la base 
mongoose
  .connect('mongodb://127.0.0.1:27017/recetas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Verifica los datos que llegan
app.post('/submit-recipe', upload.single('recta'), async (req, res) => {
  try {
    console.log(req.body);  
    console.log(req.file);  

    const { name, email, instructions } = req.body;
    const filePath = req.file ? req.file.path : null; //archivo

    const newRecipe = new Recipe({ name, email, instructions, filePath });
    await newRecipe.save();

    res.status(201).json({ message: 'Receta guardada con éxito', recipe: newRecipe });
  } catch (error) {
    console.error('Error al guardar la receta:', error);
    res.status(500).json({ message: 'Error al guardar la receta' });
  }
});

// Iniciar el servi
app.listen(PORT, () => {
  console.log(`Servidor principal corriendo en http://localhost:${PORT}`);
});

