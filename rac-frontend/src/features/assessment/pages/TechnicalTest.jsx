import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../../applicant/components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import {
  getLatestActiveApplication,
  updateApplication,
  appendApplicationTimeline,
} from "../../../shared/utils/applicationStorage";
import {
  APPLICATION_STAGES,
  canAccessTechnicalTest,
  getStageLabel,
} from "../../applicant/utils/applicantHelpers";

const mockTests = {
  "Scientist B - Computer Science": [
    {
      id: 1,
      question: "Which data structure works on FIFO principle?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correct: "Queue",
    },
    {
      id: 2,
      question: "Which language is primarily used for styling web pages?",
      options: ["HTML", "Python", "CSS", "C++"],
      correct: "CSS",
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
      correct: "Structured Query Language",
    },
  ],
  "Scientist B - Electronics": [
    {
      id: 1,
      question: "Which component stores electric charge?",
      options: ["Resistor", "Capacitor", "Inductor", "Relay"],
      correct: "Capacitor",
    },
    {
      id: 2,
      question: "What does LED stand for?",
      options: [
        "Light Emitting Diode",
        "Low Energy Display",
        "Linear Electric Device",
        "Light Energy Detector",
      ],
      correct: "Light Emitting Diode",
    },
    {
      id: 3,
      question: "Which instrument is commonly used to measure voltage?",
      options: ["Ammeter", "Voltmeter", "Ohmmeter", "Galvanometer"],
      correct: "Voltmeter",
    },
  ],
};

export default function TechnicalTest() {
  const application = getLatestActiveApplication();
  const questions = useMemo(() => {
    if (!application?.vacancyTitle) return [];
    return mockTests[application.vacancyTitle] || mockTests["Scientist B - Computer Science"];
  }, [application]);

  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isAllowed = canAccessTechnicalTest(application);

  useEffect(() => {
    if (!application || !isAllowed) return;

    if (application.currentStage === APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED) {
      updateApplication(application.id, {
        currentStage: APPLICATION_STAGES.TECHNICAL_TEST_IN_PROGRESS,
        technicalTestStatus: "IN_PROGRESS",
      });

      appendApplicationTimeline(application.id, {
        stage: APPLICATION_STAGES.TECHNICAL_TEST_IN_PROGRESS,
        label: "Technical Test In Progress",
        note: "Applicant started the technical test.",
      });
    }
  }, [application, isAllowed]);

  useEffect(() => {
    if (!isAllowed || submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, isAllowed]);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    if (!application) return;

    const score = questions.reduce((total, q) => {
      return answers[q.id] === q.correct ? total + 1 : total;
    }, 0);

    const shortlisted = score >= Math.ceil(questions.length * 0.6);

    updateApplication(application.id, {
      currentStage: shortlisted
        ? APPLICATION_STAGES.TECHNICAL_SHORTLISTED
        : APPLICATION_STAGES.TECHNICAL_REJECTED,
      technicalTestStatus: shortlisted ? "SHORTLISTED" : "REJECTED",
      technicalScore: score,
      technicalRemarks: shortlisted
        ? "Technical test cleared successfully."
        : "Score below technical cutoff.",
      personalityTestStatus: shortlisted ? "NOT_ASSIGNED" : "NOT_ASSIGNED",
    });

    appendApplicationTimeline(application.id, {
      stage: APPLICATION_STAGES.TECHNICAL_TEST_SUBMITTED,
      label: "Technical Test Submitted",
      note: `Technical test submitted with score ${score}/${questions.length}.`,
    });

    appendApplicationTimeline(application.id, {
      stage: shortlisted
        ? APPLICATION_STAGES.TECHNICAL_SHORTLISTED
        : APPLICATION_STAGES.TECHNICAL_REJECTED,
      label: shortlisted
        ? "Shortlisted for Personality Test"
        : "Rejected after Technical Evaluation",
      note: shortlisted
        ? "Applicant cleared the technical cutoff."
        : "Applicant did not meet the technical cutoff.",
    });

    setSubmitted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!application || !isAllowed) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <ApplicantRibbon />

        <main className="mx-auto max-w-5xl px-4 py-6">
          <Card className="text-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Technical Test
            </h1>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              This test is not available right now. It becomes accessible only
              after your application clears profile verification and the technical
              test is assigned.
            </p>
            {application && (
              <div className="mt-4">
                <Badge variant="info">{getStageLabel(application.currentStage)}</Badge>
              </div>
            )}
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Technical Test
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vacancy: {application.vacancyTitle}
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
              Your responses have been recorded and evaluated for this simulation.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <Card key={q.id} className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
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
                      className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-3">
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
                      </div>
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