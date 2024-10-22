import { pipeline } from '@xenova/transformers';

let modelPipeline = null;

// Function to load the model (question-answering)
export const loadModel = async () => {
  try {
    // Load the model
    modelPipeline = await pipeline('question-answering', 'Xenova/bert-base-uncased-squad');
    console.log('Model loaded successfully!');
  } catch (error) {
    console.error('Error loading model:', error);
  }
};

// Function to find the best match
export const findBestMatch = async (question, faqQuestions) => {
  if (!modelPipeline) {
    throw new Error('Model not loaded yet');
  }

  const results = await Promise.all(
    faqQuestions.map(async (faqQuestion) => {
      const response = await modelPipeline({ question, context: faqQuestion });
      return response.score; // assuming response contains a score
    })
  );

  // Find the index of the FAQ with the highest score
  const bestMatchIndex = results.indexOf(Math.max(...results));
  return bestMatchIndex;
};
