import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../../applicant/components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import {
  getTechnicalTestByApplication,
  submitTechnicalTest,
} from "../../applicant/services/applicantService";

function formatDateTime(dateValue) {
  if (!dateValue) return "-";

  return new Date(dateValue).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function TechnicalTest() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [application, setApplication] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [paper, setPaper] = useState(null);
  const [accessStatus, setAccessStatus] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await getTechnicalTestByApplication(id);

        setApplication(data.application);
        setSchedule(data.schedule);
        setPaper(data.paper);
        setAccessStatus(data.accessStatus);

        if (data.schedule?.endTime) {
          const end = new Date(data.schedule.endTime).getTime();
          const now = Date.now();
          const remaining = Math.max(Math.floor((end - now) / 1000), 0);
          setTimeLeft(remaining);
        }
      } catch (err) {
        setError(err.message || "Unable to load technical test");
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  const questions = useMemo(() => {
    return paper?.questions || [];
  }, [paper]);

  useEffect(() => {
    if (accessStatus !== "ACTIVE" || submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, accessStatus, submitted]);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    if (submitted || submitting) return;

    try {
      setSubmitting(true);

      const formattedAnswers = Object.entries(answers).map(
        ([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
        })
      );

      const result = await submitTechnicalTest(id, formattedAnswers);

      setSubmitResult(result);
      setSubmitted(true);
    } catch (err) {
      alert(err.message || "Error submitting technical test");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <ApplicantRibbon />

        <main className="mx-auto max-w-5xl px-4 py-6">
          <Card className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Loading technical test...
            </p>
          </Card>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <ApplicantRibbon />

        <main className="mx-auto max-w-5xl px-4 py-6">
          <Card className="text-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Technical Test
            </h1>

            <p className="mt-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          </Card>
        </main>
      </div>
    );
  }

  if (accessStatus === "NOT_STARTED") {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <ApplicantRibbon />

        <main className="mx-auto max-w-5xl px-4 py-6">
          <Card className="text-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Technical Test Not Started
            </h1>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Your technical test has been assigned, but it is not active yet.
            </p>

            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-left dark:border-blue-900/50 dark:bg-blue-950/20">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <strong>Vacancy:</strong> {application?.vacancyTitle}
              </p>

              <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                <strong>Start:</strong> {formatDateTime(schedule?.startTime)}
              </p>

              <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                <strong>End:</strong> {formatDateTime(schedule?.endTime)}
              </p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (accessStatus === "EXPIRED") {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <ApplicantRibbon />

        <main className="mx-auto max-w-5xl px-4 py-6">
          <Card className="text-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Technical Test Window Closed
            </h1>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              The scheduled time slot for this test has ended.
            </p>

            <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4 text-left dark:border-gray-700 dark:bg-gray-900/40">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <strong>Start:</strong> {formatDateTime(schedule?.startTime)}
              </p>

              <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                <strong>End:</strong> {formatDateTime(schedule?.endTime)}
              </p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <ApplicantRibbon />

        <main className="mx-auto max-w-5xl px-4 py-6">
          <Card className="text-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              No Questions Found
            </h1>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Question paper is not available for this vacancy.
            </p>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {paper?.title || "Technical Test"}
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vacancy: {application?.vacancyTitle}
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Test Window: {formatDateTime(schedule?.startTime)} -{" "}
              {formatDateTime(schedule?.endTime)}
            </p>
          </div>

          <Badge variant={timeLeft <= 60 ? "danger" : "warning"}>
            Time Left: {formatTime(timeLeft)}
          </Badge>
        </section>

        {submitted ? (
          <Card className="space-y-3 text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Technical Test Submitted
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your responses have been submitted successfully.
            </p>

            {submitResult && (
              <div className="mx-auto mt-4 max-w-sm rounded-xl border border-gray-100 bg-gray-50 p-4 text-left dark:border-gray-700 dark:bg-gray-900/40">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Score:</strong> {submitResult.score}/{submitResult.totalMarks}
                </p>

                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <strong>Percentage:</strong>{" "}
                  {Number(submitResult.percentage || 0).toFixed(2)}%
                </p>
              </div>
            )}
          </Card>
        ) : (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <Card key={q._id} className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Question {index + 1}
                    </p>

                    <Badge variant="info">{q.marks || 1} mark</Badge>
                  </div>

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
                          name={`question-${q._id}`}
                          value={option}
                          checked={answers[q._id] === option}
                          onChange={() => handleOptionChange(q._id, option)}
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
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Technical Test"}
              </Button>
            </div>            
          </div>
        )}
      </main>
    </div>
  );
}