from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import torch
from sentence_transformers import SentenceTransformer, util
from transformers import T5Tokenizer, T5ForConditionalGeneration

app = Flask(__name__)
CORS(app)

# Load FAQ data
def read_json(File_path):
  with open(File_path) as f:
    data = json.load(f)
  data_cat = []
  for cat in data:
    for faq in data[cat]:
      question = faq["question"]
      answer = faq["answer"]
      data_cat.append({"question": question, "target": answer})
  return data_cat



def generate_answer(question, tokenizer, model):
    input_ids = tokenizer.encode(question, return_tensors='pt')
    output = model.generate(input_ids, max_length=50, num_beams=3, early_stopping=True)
    answer = tokenizer.decode(output[0], skip_special_tokens=True)
    return answer

def find_similar_question(user_question, faq_data, faq_embeddings, threshold=0.7):
    user_embedding = sbert_model.encode(user_question, convert_to_tensor=True)
    similarities = util.pytorch_cos_sim(user_embedding, faq_embeddings)
    max_similarity, best_match_idx = torch.max(similarities, dim=1)
    max_similarity = max_similarity.item()

    if max_similarity >= threshold:
        return faq_data[best_match_idx]['target'] 

    return None


# Load models [These models are already pre-trained in python for more information please check the bot.py documentation]
faq_data = read_json('faqs.json')
sbert_model = SentenceTransformer('all-MiniLM-L6-v2')
t5_tokenizer = T5Tokenizer.from_pretrained('./fine_tune_t5_loRA')
t5_model = T5ForConditionalGeneration.from_pretrained('./fine_tune_t5_loRA')


faq_questions = [item['question'] for item in faq_data]
faq_embeddings = sbert_model.encode(faq_questions, convert_to_tensor=True)




# API endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    print("Server running ....")
    user_question = request.json.get('question')

    print(f"User Question: {user_question}")
    

    answer = find_similar_question(user_question, faq_data, faq_embeddings)
    
    if answer:
        print(f"Found similar FAQ: {answer}")
        return jsonify({'answer': answer})
    
    
    generated_answer = generate_answer(user_question, t5_tokenizer, t5_model)
    print(f"Generated answer: {generated_answer}")
    return jsonify({'answer': generated_answer})

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5001)
