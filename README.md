
# Smart FAQ System

This is a project , for the SARCathon organized by IIT Bombay (Indian Institute of Technology Bombay). You can find the problem statement [here](https://gist.github.com/MudrekaSaras/815f93bdd824bebf77b991c8d1dc111e) as _"Smart FAQ system for SARAS AI Institute website"_

## Important Notice ⚠️

**Warning: A large file has not been committed to this repository due to size restrictions.**  
To fully run the project, please download the missing file from the following link:

[Download model.safetensor file](https://drive.google.com/file/d/1b2Ip4qqsYy0ObRP5bP-hraHXAmOLQkUA/view?usp=sharing)

Once downloaded, place the file in the appropriate directory as name of **model.safetensors** 

save it  
_smart-faq-module/src/Fine_tune_t5_loRA_ 

this path


## Table of Contents
- [Dataset](#dataset)
- [Problem Statement](#problem-statement)
- [Task](#task)
- [Solution](#solution)
- [Model](#model)
  - [1. Data preparation](#1-encoder-path-contraction-phase)
  - [2. SBERT embeddings](#2)
  - [3. Paraphrase Generation for Data Augmentation](#3-decoder-path-expansion-phase)
  - [4. Fine-Tuning T5 for Question Answering](#4-output-layer)
  - [5. Real-Time Question Matching and Answer Generation](#5)
- [How it works](#how-it-works)
- [Installation](#installation)
- [Results](#results)
- [Contributing](#contributing)
- [License](#license)

## Dataset

A JSON file containing all the FAQ data.

## Problem Statement

Develop a smart FAQ module for SARAS AI Institute website that intelligently returns relevant FAQ entries based on user queries. The module should enhance user experience by providing precise and immediate responses using open-source technologies.


## Task 

- Develop a solution that can interpret user queries and match them with the most relevant FAQs.
- Create a user interface where users can input their queries and view the results

## Solution

- **Front-End:** The UI is based on REACT framework . Here the UI is more likely a chatbased UI where the user interact with the system with chat window.

- **Back-End** : This backend system uses a Flask API to handle user questions, first searching for a similar FAQ using sentence embeddings (via SBERT) and, if no match is found, generating a response using a fine-tuned T5 model. It integrates CORS, processes input via JSON, and returns the appropriate answer in real-time.

- **Model :** The model augments an FAQ dataset by generating paraphrases using a pre-trained T5 model and then fine-tunes another T5 model for question-answer generation. It uses a SentenceTransformer (SBERT) to compute embeddings and find the most similar FAQ question based on cosine similarity, and if no match is found, it generates an answer using the fine-tuned T5 model. The system integrates training, evaluation, and real-time interaction through a conversational interface.



## Model

### Data Preparation
The FAQ data is read from a JSON file. Each FAQ consists of a question and a corresponding answer, which are processed and stored in a structured format (Pandas DataFrame) for further use.

### SBERT embeddings
SBERT (Sentence-BERT) is used to generate embeddings (vector representations) for the FAQ questions. These embeddings allow the model to calculate the similarity between user questions and pre-existing FAQ questions based on cosine similarity. The embeddings are precomputed to optimize real-time interaction.

### Paraphrase Generation for Data Augmentation
To increase the variety and robustness of the dataset, T5 is used to generate multiple paraphrases of each question and answer. This step allows the model to learn from different phrasings and variations of the same FAQ, improving its ability to match user queries with the most relevant FAQ entry

### Fine-Tuning T5 for Question Answering
The augmented FAQ data is then used to fine-tune a pre-trained T5 model for the task of generating relevant answers. This involves training the T5 model to map questions to their respective answers using the augmented dataset. Both input questions and target answers are tokenized, and the model is trained for multiple epochs with evaluation strategies and checkpoints in place.

### Real-Time Question Matching and Answer Generation
 - When the user asks a question, the system first calculates the cosine similarity between the user's question embedding and the precomputed FAQ question embeddings.
 - If the similarity score exceeds a predefined threshold, the corresponding FAQ answer is returned.
 - If no similar FAQ is found, the T5 model generates an answer on the fly using its question-answering capabilities.


## How it works
1. FAQ Matching
 - The model uses SBERT to precompute vector representations of FAQ questions.
 - When a user question is asked, it computes the similarity between the user question and the FAQ questions using cosine similarity.
 - If the similarity score is above a threshold (e.g., 0.7), it returns the corresponding FAQ answer.

2. Answer Generation:
 - If no similar FAQ is found, the model uses the fine-tuned T5 model to generate an answer based on the user question.
 - This allows the system to handle out-of-domain or novel questions that do not exist in the FAQ dataset.

3. Data Augmentation:
 - The system uses paraphrasing to expand the dataset by generating multiple variants of each question and answer.
 - This helps improve the model's understanding of diverse phrasings and improves overall robustness.


## Installation
1. Clone the repository:
 
 ```
 git clone https://github.com/Bhadra-Indranil/SARCathon-FAQ-module.git
 cd smart-faq-module
 ```
 make sure your system has Node.js and Python

2. To install the dependencies, run the following command:

```
pip install -r requirements.txt

```

## Running 

1. First run the react app . Make sure you are in the correct directory
    ```
    npm run start
    ```

2. at first run the app.py 
    ```
    cd src
    python app.py
    ``` 

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)






