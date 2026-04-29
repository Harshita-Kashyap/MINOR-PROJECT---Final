require("dotenv").config();
const mongoose = require("mongoose");

const QuestionPaper = require("../models/QuestionPaper");

const MONGO_URI = process.env.MONGO_URI;

const CSE_VACANCY_ID = "69eccd0aaef14f0a3b2e1b82";

const cseTechnicalPaper = {
  vacancyId: CSE_VACANCY_ID,
  testType: "TECHNICAL",
  title: "Technical Test - Scientist B Computer Science",
  durationMinutes: 40,
  isCommon: false,
  questions: [
    {
      question: "Which data structure follows the FIFO principle?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correctAnswer: "Queue",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which data structure follows the LIFO principle?",
      options: ["Queue", "Stack", "Heap", "Linked List"],
      correctAnswer: "Stack",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "What is the time complexity of binary search on a sorted array?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: "O(log n)",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which sorting algorithm has average time complexity O(n log n)?",
      options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Linear Search"],
      correctAnswer: "Merge Sort",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which traversal of a binary search tree gives sorted order?",
      options: ["Preorder", "Postorder", "Inorder", "Level Order"],
      correctAnswer: "Inorder",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which graph algorithm is used to find the shortest path from a single source in a graph with non-negative weights?",
      options: ["DFS", "BFS", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
      correctAnswer: "Dijkstra's Algorithm",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which algorithm is used to find a minimum spanning tree?",
      options: ["Dijkstra", "Kruskal", "Floyd-Warshall", "Bellman-Ford"],
      correctAnswer: "Kruskal",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which data structure is commonly used for implementing recursion internally?",
      options: ["Queue", "Stack", "Heap", "Hash Table"],
      correctAnswer: "Stack",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "In operating systems, what is a deadlock?",
      options: [
        "A process finishing execution",
        "A condition where processes wait forever for resources",
        "A high CPU utilization state",
        "A memory allocation technique"
      ],
      correctAnswer: "A condition where processes wait forever for resources",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which scheduling algorithm may cause starvation?",
      options: ["Round Robin", "FCFS", "Priority Scheduling", "Shortest Job First only when all jobs are equal"],
      correctAnswer: "Priority Scheduling",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which memory management technique divides memory into fixed-size blocks?",
      options: ["Paging", "Segmentation", "Thrashing", "Compaction"],
      correctAnswer: "Paging",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "What is the main purpose of an operating system?",
      options: [
        "Only to compile programs",
        "To manage hardware and software resources",
        "Only to browse the internet",
        "To design databases"
      ],
      correctAnswer: "To manage hardware and software resources",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which protocol is used to reliably transfer data over the internet?",
      options: ["UDP", "TCP", "ARP", "ICMP"],
      correctAnswer: "TCP",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which layer of the OSI model is responsible for routing?",
      options: ["Application Layer", "Transport Layer", "Network Layer", "Physical Layer"],
      correctAnswer: "Network Layer",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which device works mainly at the network layer?",
      options: ["Hub", "Switch", "Router", "Repeater"],
      correctAnswer: "Router",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which protocol translates domain names into IP addresses?",
      options: ["HTTP", "DNS", "FTP", "SMTP"],
      correctAnswer: "DNS",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which SQL command is used to remove all rows from a table without deleting the table structure?",
      options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"],
      correctAnswer: "TRUNCATE",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which normal form removes partial dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correctAnswer: "2NF",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which key uniquely identifies a row in a relational table?",
      options: ["Foreign Key", "Primary Key", "Candidate Value", "Composite Attribute"],
      correctAnswer: "Primary Key",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which SQL clause is used to filter grouped records?",
      options: ["WHERE", "HAVING", "ORDER BY", "DISTINCT"],
      correctAnswer: "HAVING",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which object-oriented concept allows the same function name to behave differently based on parameters?",
      options: ["Inheritance", "Encapsulation", "Function Overloading", "Abstraction"],
      correctAnswer: "Function Overloading",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which OOP concept hides internal implementation details and shows only essential features?",
      options: ["Polymorphism", "Abstraction", "Inheritance", "Compilation"],
      correctAnswer: "Abstraction",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which software testing technique checks internal code structure?",
      options: ["Black-box Testing", "White-box Testing", "Alpha Testing", "Acceptance Testing"],
      correctAnswer: "White-box Testing",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which SDLC model is best suited when requirements are clearly known and stable?",
      options: ["Waterfall Model", "Spiral Model", "Prototype Model", "Agile Model"],
      correctAnswer: "Waterfall Model",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which compiler phase checks syntax using grammar rules?",
      options: ["Lexical Analysis", "Syntax Analysis", "Semantic Analysis", "Code Optimization"],
      correctAnswer: "Syntax Analysis",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which compiler phase converts source code into tokens?",
      options: ["Lexical Analysis", "Parsing", "Code Generation", "Linking"],
      correctAnswer: "Lexical Analysis",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which addressing method uses the address field to point directly to the operand?",
      options: ["Immediate Addressing", "Direct Addressing", "Indirect Addressing", "Register Addressing"],
      correctAnswer: "Direct Addressing",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which logic gate outputs true only when all inputs are true?",
      options: ["OR", "AND", "XOR", "NOT"],
      correctAnswer: "AND",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which concept is used to reduce repeated calculations in dynamic programming?",
      options: ["Memoization", "Hash Collision", "Deadlock", "Normalization"],
      correctAnswer: "Memoization",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which data structure is best suited for implementing a priority queue?",
      options: ["Array", "Stack", "Heap", "Queue"],
      correctAnswer: "Heap",
      marks: 1,
      difficulty: "MEDIUM",
    },
  ],
};

async function seedCseTechnicalPaper() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    if (CSE_VACANCY_ID === "PASTE_CSE_VACANCY_ID_HERE") {
      throw new Error("Please paste the CSE vacancy _id in CSE_VACANCY_ID");
    }

    await QuestionPaper.findOneAndUpdate(
      {
        vacancyId: CSE_VACANCY_ID,
        testType: "TECHNICAL",
      },
      cseTechnicalPaper,
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    console.log("CSE technical question paper seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seedCseTechnicalPaper();