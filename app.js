const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


// Replace with your GitHub Personal Access Token
const GITHUB_TOKEN = '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';

app.set('view engine', 'ejs');
app.set('views',path.join('C:/Users/anaya/github-repo-comparison','view'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/compare', async (req, res) => {
    const { repo1, repo2 } = req.body;
  
    try 
    {
      // Fetch repository details
      const [repo1Data, repo2Data] = await Promise.all([
        axios.get('https://api.github.com/repos/${repo1}', 
            {
                headers: { Authorization: 'token ${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}' }}),
        axios.get('https://api.github.com/repos/${repo2}', 
            {
          headers: { Authorization: 'token ${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}' }
        })
      ]);
  
      const repo1Info = repo1Data.data;
      const repo2Info = repo2Data.data;
  
      res.render('comparison', {
        repo1: repo1Info,
        repo2: repo2Info
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).send('Error fetching repository data.');
    }
  });

app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});