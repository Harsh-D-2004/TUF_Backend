import { flashcard } from "./database.js";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// Add Flashcard
app.post('/addcard', async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }
    const newFlashcard = await flashcard.create({ question, answer });
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error('Error in POST request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Flashcard
app.put('/updatecard/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const flashcardToUpdate = await flashcard.findByPk(id);
    if (!flashcardToUpdate) {
      return res.status(404).json({ error: 'Card not found' });
    }

    await flashcardToUpdate.update({ question, answer });
    res.status(200).json(flashcardToUpdate);
  } catch (error) {
    console.error('Error in PUT request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Flashcard
app.delete('/deletecard/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const flashcardToDelete = await flashcard.findByPk(id);
    if (!flashcardToDelete) {
      return res.status(404).json({ error: 'Card not found' });
    }

    await flashcardToDelete.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error in DELETE request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get All Cards
app.get('/getallcard', async (req, res) => {
  try {
    const allCards = await flashcard.findAll();
    res.status(200).json(allCards);
  } catch (error) {
    console.error('Error in GET request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
