require("dotenv").config();
const mongoose = require("mongoose");

const QuestionPaper = require("../models/QuestionPaper");

const MONGO_URI = process.env.MONGO_URI;

const personalityPaper = {
  vacancyId: null,
  testType: "PERSONALITY",
  title: "Common Personality Assessment - DRDO Scientist B",
  durationMinutes: 30,
  isCommon: true,
  questions: [
    {
      question: "You are assigned a critical defence research task with a tight deadline. What would you do first?",
      options: [
        "Break the task into smaller milestones and prioritize work",
        "Start working randomly to save time",
        "Wait for someone else to guide every step",
        "Ignore the deadline until pressure increases"
      ],
      correctAnswer: "Break the task into smaller milestones and prioritize work",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "A teammate disagrees with your technical approach during a project discussion. What is the best response?",
      options: [
        "Listen to their reasoning and compare both approaches objectively",
        "Reject their view immediately",
        "Stop participating in the discussion",
        "Complain to seniors without discussion"
      ],
      correctAnswer: "Listen to their reasoning and compare both approaches objectively",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "You discover a small error in your submitted analysis report. What should you do?",
      options: [
        "Inform the concerned authority and submit a corrected version",
        "Hide the mistake because it is small",
        "Blame another team member",
        "Wait until someone else finds it"
      ],
      correctAnswer: "Inform the concerned authority and submit a corrected version",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "In a confidential defence project, a friend asks about your work details. What should you do?",
      options: [
        "Politely refuse to share confidential information",
        "Share only interesting details",
        "Send project documents privately",
        "Discuss it casually on social media"
      ],
      correctAnswer: "Politely refuse to share confidential information",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Your experiment fails repeatedly. What is the most professional response?",
      options: [
        "Analyze the causes, document observations, and try improved methods",
        "Stop working on the task permanently",
        "Declare the problem impossible immediately",
        "Change results to look successful"
      ],
      correctAnswer: "Analyze the causes, document observations, and try improved methods",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "You receive criticism from a senior scientist. How should you handle it?",
      options: [
        "Treat it as feedback and improve your work",
        "Take it personally and stop trying",
        "Argue without listening",
        "Ignore all feedback"
      ],
      correctAnswer: "Treat it as feedback and improve your work",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "A project requires teamwork across multiple departments. What quality is most important?",
      options: [
        "Clear communication and coordination",
        "Working alone without updates",
        "Avoiding responsibility",
        "Only focusing on personal credit"
      ],
      correctAnswer: "Clear communication and coordination",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "If two urgent tasks arrive at the same time, what should you do?",
      options: [
        "Assess priority, impact, and deadline before acting",
        "Choose the easier one only",
        "Ignore both tasks",
        "Work without informing anyone"
      ],
      correctAnswer: "Assess priority, impact, and deadline before acting",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "A junior colleague is struggling with a concept you understand well. What should you do?",
      options: [
        "Help them understand without making them feel inferior",
        "Mock them for not knowing",
        "Avoid them completely",
        "Do their entire work without explanation"
      ],
      correctAnswer: "Help them understand without making them feel inferior",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "You are unsure about an important calculation in a report. What is the best action?",
      options: [
        "Recheck it and seek validation if needed",
        "Submit it without checking",
        "Guess the value",
        "Remove the calculation silently"
      ],
      correctAnswer: "Recheck it and seek validation if needed",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which behavior best reflects scientific integrity?",
      options: [
        "Reporting results honestly even if they are not expected",
        "Changing data to match assumptions",
        "Ignoring failed trials",
        "Copying someone else's work"
      ],
      correctAnswer: "Reporting results honestly even if they are not expected",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "During a high-pressure review meeting, your presentation is questioned. What should you do?",
      options: [
        "Respond calmly with evidence and accept valid points",
        "Become defensive and angry",
        "Leave the meeting",
        "Give random answers"
      ],
      correctAnswer: "Respond calmly with evidence and accept valid points",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "A colleague takes credit for your contribution. What is the most mature response?",
      options: [
        "Discuss the matter professionally with evidence",
        "Start a public argument",
        "Stop contributing to the team",
        "Spread negative comments"
      ],
      correctAnswer: "Discuss the matter professionally with evidence",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "What should you do when working with sensitive technical documents?",
      options: [
        "Follow access control and confidentiality rules",
        "Store them on public drives",
        "Share them through personal chat apps",
        "Print unnecessary copies"
      ],
      correctAnswer: "Follow access control and confidentiality rules",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "You identify a safety risk in a lab setup. What should you do?",
      options: [
        "Report it immediately and stop unsafe work if required",
        "Ignore it to avoid delay",
        "Let others discover it",
        "Continue because deadline is important"
      ],
      correctAnswer: "Report it immediately and stop unsafe work if required",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "A defence project changes direction suddenly. What is the best mindset?",
      options: [
        "Adapt quickly and realign work with new requirements",
        "Resist every change",
        "Complain without understanding the reason",
        "Stop working until everything is perfect"
      ],
      correctAnswer: "Adapt quickly and realign work with new requirements",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "What is the best way to handle repetitive technical documentation work?",
      options: [
        "Maintain accuracy and consistency even if the work is repetitive",
        "Rush through it carelessly",
        "Skip sections",
        "Copy old data without checking"
      ],
      correctAnswer: "Maintain accuracy and consistency even if the work is repetitive",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Your team receives incomplete requirements. What should you do?",
      options: [
        "Clarify requirements before making major assumptions",
        "Guess everything and proceed",
        "Ignore the task",
        "Blame the requester"
      ],
      correctAnswer: "Clarify requirements before making major assumptions",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which quality is most important for long-term research work?",
      options: [
        "Patience and disciplined problem-solving",
        "Expecting instant success always",
        "Avoiding complex problems",
        "Changing goals every day"
      ],
      correctAnswer: "Patience and disciplined problem-solving",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "If you make a wrong decision in a project, what should you do?",
      options: [
        "Accept responsibility, correct it, and learn from it",
        "Hide the mistake",
        "Blame the system always",
        "Refuse to discuss it"
      ],
      correctAnswer: "Accept responsibility, correct it, and learn from it",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "A senior asks you to complete a task in a way that seems technically unsafe. What should you do?",
      options: [
        "Respectfully raise the concern with technical reasoning",
        "Follow blindly without question",
        "Refuse rudely",
        "Ignore the instruction secretly"
      ],
      correctAnswer: "Respectfully raise the concern with technical reasoning",
      marks: 1,
      difficulty: "HARD",
    },
    {
      question: "Which response best shows leadership in a technical team?",
      options: [
        "Taking responsibility and helping the team move forward",
        "Only giving orders",
        "Avoiding difficult decisions",
        "Taking credit for all work"
      ],
      correctAnswer: "Taking responsibility and helping the team move forward",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Your solution works, but documentation is weak. What should you do?",
      options: [
        "Improve documentation so others can understand and verify it",
        "Ignore documentation because code works",
        "Delete old notes",
        "Ask others to guess your logic"
      ],
      correctAnswer: "Improve documentation so others can understand and verify it",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "You are asked to learn a new tool quickly for project needs. What is the best approach?",
      options: [
        "Learn the essentials, practice, and apply it step by step",
        "Avoid the task",
        "Say it is impossible without trying",
        "Wait for someone to do it for you"
      ],
      correctAnswer: "Learn the essentials, practice, and apply it step by step",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "A team member gives an idea different from yours. What should you do?",
      options: [
        "Evaluate the idea based on merit",
        "Reject it because it is not yours",
        "Discourage discussion",
        "Ignore the person"
      ],
      correctAnswer: "Evaluate the idea based on merit",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "Which action shows accountability?",
      options: [
        "Owning your assigned work and reporting progress honestly",
        "Only reporting success",
        "Hiding delays",
        "Avoiding responsibility"
      ],
      correctAnswer: "Owning your assigned work and reporting progress honestly",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "If an urgent national-security related task comes with limited information, what should you do?",
      options: [
        "Work with available information while seeking necessary clarification",
        "Stop completely until everything is perfect",
        "Make unsupported claims",
        "Ignore urgency"
      ],
      correctAnswer: "Work with available information while seeking necessary clarification",
      marks: 1,
      difficulty: "HARD",
    },
    {
      question: "What is the best way to manage stress during a demanding technical phase?",
      options: [
        "Stay organized, communicate blockers, and take constructive action",
        "Panic and stop working",
        "Hide all problems",
        "Work carelessly"
      ],
      correctAnswer: "Stay organized, communicate blockers, and take constructive action",
      marks: 1,
      difficulty: "MEDIUM",
    },
    {
      question: "Which attitude is most suitable for a scientist working in defence research?",
      options: [
        "Curiosity, responsibility, discipline, and ethical conduct",
        "Carelessness and secrecy violation",
        "Only personal ambition",
        "Avoiding teamwork"
      ],
      correctAnswer: "Curiosity, responsibility, discipline, and ethical conduct",
      marks: 1,
      difficulty: "EASY",
    },
    {
      question: "If your result differs from expected theory, what should you do?",
      options: [
        "Verify experiment setup, data, and assumptions before concluding",
        "Change data to match theory",
        "Discard the result without checking",
        "Ignore the difference"
      ],
      correctAnswer: "Verify experiment setup, data, and assumptions before concluding",
      marks: 1,
      difficulty: "MEDIUM",
    },
  ],
};

async function seedPersonalityPaper() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await QuestionPaper.findOneAndUpdate(
      {
        testType: "PERSONALITY",
        isCommon: true,
      },
      personalityPaper,
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    console.log("Common personality question paper seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seedPersonalityPaper();