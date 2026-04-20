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
  canAccessPersonalityTest,
  getStageLabel,
} from "../../applicant/utils/applicantHelpers";

const questions = [
  {
    id: 1,
    question: "How do you usually react under pressure?",
    options: [
      "Stay calm and think logically",
      "Feel stressed but continue working",
      "Ask others for help immediately",
      "Avoid the situation",
    ],
  },
  {
    id: 2,
    question: "Which statement best describes your teamwork style?",
    options: [
      "I like leading the group",
      "I cooperate and support others",
      "I prefer working alone",
      "I speak only when needed",
    ],
  },
  {
    id: 3,
    question: "How do you handle criticism?",
    options: [
      "Use it to improve myself",
      "Accept it but feel uncomfortable",
      "Ignore it",
      "Take it personally",
    ],
  },
];

export default function PersonalityTest() {
  const application = getLatestActiveApplication();
  const [timeLeft, setTimeLeft] = useState(8 * 60);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isAllowed = canAccessPersonalityTest(application);

  useEffect(() => {
    if (!application || !isAllowed) return;

    if (application.currentStage === APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED) {
      updateApplication(application.id, {
        currentStage: APPLICATION_STAGES.PERSONALITY_TEST_IN_PROGRESS,
        personalityTestStatus: "IN_PROGRESS",
      });

      appendApplicationTimeline(application.id, {
        stage: APPLICATION_STAGES.PERSONALITY_TEST_IN_PROGRESS,
        label: "Personality Test In Progress",
        note: "Applicant started the personality test.",
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

    const score = Object.keys(answers).length;

    updateApplication(application.id, {
      currentStage: APPLICATION_STAGES.FINAL_REVIEW,
      personalityTestStatus: "SUBMITTED",
      personalityScore: score,
      personalityRemarks: "Personality assessment submitted successfully.",
      finalStatus: "UNDER_REVIEW",
    });

    appendApplicationTimeline(application.id, {
      stage: APPLICATION_STAGES.PERSONALITY_TEST_SUBMITTED,
      label: "Personality Test Submitted",
      note: "Personality assessment submitted successfully.",
    });

    appendApplicationTimeline(application.id, {
      stage: APPLICATION_STAGES.FINAL_REVIEW,
      label: "Final Review",
      note: "Application moved to final review.",
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
              Personality Test
            </h1>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              This stage is not available yet. The personality assessment is only
              assigned after technical shortlisting.
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
              Personality Test
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
              Personality Test Submitted
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your responses have been recorded. The application is now in final review.
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
              <Button onClick={handleSubmit}>Submit Personality Test</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}