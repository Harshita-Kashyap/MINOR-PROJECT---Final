// src/pages/TechnicalTest.jsx
import { useEffect, useState } from "react";
import Header from "../components/landing/Header";
import ApplicantRibbon from "../components/applicant/ApplicantRibbon";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const questions = [
  {
    id: 1,
    question: "Which data structure works on FIFO principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
  },
  {
    id: 2,
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "Python", "CSS", "C++"],
  },
  {
    id: 3,
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Logic",
      "System Query List",
      "Sequential Query Language",
    ],
  },
];

export default function TechnicalTest() {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Technical Test Answers:", answers);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ApplicantRibbon />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Technical Test
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Answer all multiple-choice questions before the timer ends.
            </p>
          </div>

          <Badge variant={timeLeft <= 60 ? "danger" : "warning"}>
            Time Left: {formatTime(timeLeft)}
          </Badge>
        </div>

        {submitted ? (
          <Card className="space-y-3 text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Technical Test Submitted
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your responses have been recorded successfully.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <Card key={q.id} className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Question {index + 1}
                  </p>
                  <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                    {q.question}
                  </h2>
                </div>

                <div className="grid gap-3">
                  {q.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        checked={answers[q.id] === option}
                        onChange={() => handleOptionChange(q.id, option)}
                        className="accent-blue-700"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </Card>
            ))}

            <div className="flex justify-end">
              <Button onClick={handleSubmit}>Submit Technical Test</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}