require("dotenv").config();
const mongoose = require("mongoose");

const QuestionPaper = require("../models/QuestionPaper");

const MONGO_URI = process.env.MONGO_URI;

const AI_DS_VACANCY_ID = "69ed5bc853bf76fdd9c689cd";

const aiDsTechnicalPaper = {
  vacancyId: AI_DS_VACANCY_ID,
  testType: "TECHNICAL",
  title: "Technical Test - Scientist B AI & Data Science",
  durationMinutes: 40,
  isCommon: false,
  questions: [
    {
      question: "Which algorithm is commonly used for classification?",
      options: ["K-Means", "Decision Tree", "Apriori", "PCA"],
      correctAnswer: "Decision Tree",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What does overfitting mean in machine learning?",
      options: [
        "Model performs well on training data but poorly on new data",
        "Model performs poorly on training data",
        "Model has no features",
        "Model always gives perfect results",
      ],
      correctAnswer: "Model performs well on training data but poorly on new data",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which Python library is mainly used for data manipulation?",
      options: ["Pandas", "Matplotlib", "Flask", "OpenCV"],
      correctAnswer: "Pandas",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which metric is commonly used for classification evaluation?",
      options: ["Accuracy", "Mean Squared Error", "R-squared", "Silhouette Score"],
      correctAnswer: "Accuracy",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which algorithm is used for clustering?",
      options: ["K-Means", "Linear Regression", "Logistic Regression", "Naive Bayes"],
      correctAnswer: "K-Means",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What is the purpose of a training dataset?",
      options: [
        "To train the model",
        "To deploy the model",
        "To encrypt the model",
        "To delete features",
      ],
      correctAnswer: "To train the model",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which technique is used to reduce dimensionality?",
      options: ["PCA", "Bagging", "Boosting", "Tokenization"],
      correctAnswer: "PCA",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which activation function is commonly used in hidden layers of neural networks?",
      options: ["ReLU", "HTTP", "SQL", "DNS"],
      correctAnswer: "ReLU",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What does CNN stand for in deep learning?",
      options: [
        "Convolutional Neural Network",
        "Central Network Node",
        "Computer Numeric Network",
        "Classified Neural Notation",
      ],
      correctAnswer: "Convolutional Neural Network",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which neural network type is commonly used for image processing?",
      options: ["CNN", "RNN", "Decision Tree", "K-Means"],
      correctAnswer: "CNN",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which neural network type is commonly used for sequential data?",
      options: ["RNN", "CNN", "KNN", "SVM"],
      correctAnswer: "RNN",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which loss function is commonly used for binary classification?",
      options: [
        "Binary Cross-Entropy",
        "Mean Absolute Error only",
        "Hinge Loss only for clustering",
        "Silhouette Loss",
      ],
      correctAnswer: "Binary Cross-Entropy",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which method helps reduce overfitting in neural networks?",
      options: ["Dropout", "Increasing noise blindly", "Removing validation data", "Using only one feature"],
      correctAnswer: "Dropout",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "What is supervised learning?",
      options: [
        "Learning from labeled data",
        "Learning without any data",
        "Learning only from images",
        "Learning only from hardware signals",
      ],
      correctAnswer: "Learning from labeled data",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What is unsupervised learning?",
      options: [
        "Learning patterns from unlabeled data",
        "Learning from manually labeled data only",
        "Learning by compiling code",
        "Learning from database schemas",
      ],
      correctAnswer: "Learning patterns from unlabeled data",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which algorithm is based on Bayes theorem?",
      options: ["Naive Bayes", "K-Means", "Random Forest", "PCA"],
      correctAnswer: "Naive Bayes",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which ensemble method builds multiple decision trees and combines their output?",
      options: ["Random Forest", "Linear Regression", "PCA", "KNN"],
      correctAnswer: "Random Forest",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which method combines weak learners sequentially to improve performance?",
      options: ["Boosting", "Normalization", "Tokenization", "Indexing"],
      correctAnswer: "Boosting",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which preprocessing step scales data to a common range?",
      options: ["Normalization", "Compilation", "Parsing", "Hashing"],
      correctAnswer: "Normalization",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which problem occurs when the model is too simple to capture the data pattern?",
      options: ["Underfitting", "Overfitting", "Regularization", "Dropout"],
      correctAnswer: "Underfitting",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "What does NLP stand for?",
      options: [
        "Natural Language Processing",
        "Network Link Protocol",
        "Numerical Logic Program",
        "Neural Linear Processing",
      ],
      correctAnswer: "Natural Language Processing",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which technique converts text into smaller units like words or subwords?",
      options: ["Tokenization", "Normalization", "Backpropagation", "Clustering"],
      correctAnswer: "Tokenization",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which representation is commonly used to convert words into vectors?",
      options: ["Word Embeddings", "DNS Records", "SQL Tables", "CSS Classes"],
      correctAnswer: "Word Embeddings",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "What is the main purpose of backpropagation?",
      options: [
        "To update neural network weights using error gradients",
        "To store data in a database",
        "To route packets",
        "To normalize text only",
      ],
      correctAnswer: "To update neural network weights using error gradients",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which optimization algorithm is widely used to train deep learning models?",
      options: ["Adam", "Dijkstra", "Kruskal", "Round Robin"],
      correctAnswer: "Adam",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "What is a confusion matrix used for?",
      options: [
        "Evaluating classification performance",
        "Encrypting data",
        "Scheduling CPU processes",
        "Creating database tables",
      ],
      correctAnswer: "Evaluating classification performance",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which metric is useful when classes are imbalanced?",
      options: ["F1-score", "Only accuracy", "Execution time", "Memory size"],
      correctAnswer: "F1-score",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "What is feature engineering?",
      options: [
        "Creating or transforming input variables to improve model performance",
        "Deleting all features",
        "Changing monitor resolution",
        "Compiling a program",
      ],
      correctAnswer: "Creating or transforming input variables to improve model performance",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which type of learning uses rewards and penalties?",
      options: ["Reinforcement Learning", "Supervised Learning", "Unsupervised Learning", "Relational Learning"],
      correctAnswer: "Reinforcement Learning",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which process is used to check model performance on unseen data?",
      options: ["Validation", "Compilation", "Indexing", "Routing"],
      correctAnswer: "Validation",
      marks: 1,
      difficulty: "EASY",
    },
  ],
};

async function seedAiDsTechnicalPaper() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    if (AI_DS_VACANCY_ID === "PASTE_AI_DS_VACANCY_ID_HERE") {
      throw new Error("Please paste the AI & DS vacancy _id in AI_DS_VACANCY_ID");
    }

    await QuestionPaper.findOneAndUpdate(
      {
        vacancyId: AI_DS_VACANCY_ID,
        testType: "TECHNICAL",
      },
      aiDsTechnicalPaper,
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    console.log("AI & DS technical question paper seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seedAiDsTechnicalPaper();