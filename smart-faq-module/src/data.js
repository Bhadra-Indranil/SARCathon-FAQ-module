// Import the JSON data (assuming it's in the same directory or adjust path accordingly)
import faqJson from './faqs.json';

// Function to get all questions
export const getAllFaqQuestions = () => {
  const allQuestions = [];

  Object.keys(faqJson).forEach((category) => {
    const questions = faqJson[category].map((faqItem) => faqItem.question);
    allQuestions.push(...questions);
  });

  return allQuestions;
};

// Function to get the answer based on the question index
export const getFaqAnswer = (questionIndex) => {
  let counter = 0;
  
  for (const category of Object.keys(faqJson)) {
    for (const faqItem of faqJson[category]) {
      if (counter === questionIndex) {
        return faqItem.answer;
      }
      counter++;
    }
  }

  return null; // Return null if the question index is out of bounds
};

// Function to get all questions and answers as a map (optional if needed)
export const getAllFaqData = () => {
  const faqData = [];

  Object.keys(faqJson).forEach((category) => {
    faqJson[category].forEach((faqItem) => {
      faqData.push({
        question: faqItem.question,
        answer: faqItem.answer,
      });
    });
  });

  return faqData;
};
