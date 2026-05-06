import { useEffect, useMemo, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../../applicant/components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import * as faceapi from "face-api.js";
import Badge from "../../../shared/components/ui/Badge";
import {
  getPersonalityTestByApplication,
  submitPersonalityTest,
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

export default function PersonalityTest(){
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
const [noFaceCount, setNoFaceCount] = useState(0);
const [multiFaceCount, setMultiFaceCount] = useState(0);

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [application, setApplication] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [paper, setPaper] = useState(null);
  const [accessStatus, setAccessStatus] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStatus, setQuestionStatus] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await getPersonalityTestByApplication(id);

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
        setError(err.message || "Unable to load Personality test");
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

useEffect(() => {
  const init = async () => {
    // Step 1: enter fullscreen first
    await enterFullscreen();

    // Step 2: wait a bit so video DOM is mounted
    setTimeout(() => {
      setVideoReady(true);
    }, 300);
  };

  init();

  return () => {
    stopCamera();
    exitFullscreen();
  };
}, []);

useEffect(() => {
  if (!cameraReady) return;

  startCamera();
}, [cameraReady]);

useEffect(() => {
  if (!videoReady) return;

  startCamera();
}, [videoReady]);

useEffect(() => {
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(
  "https://justadudewhohacks.github.io/face-api.js/models"
);
    setModelLoaded(true);
    console.log("Model loaded");
  };

  loadModels();
}, []);

useEffect(() => {
  if (!modelLoaded) return;

  let interval;

  const startDetection = () => {
    interval = setInterval(async () => {
      if (!videoRef.current) return;

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      console.log("Faces detected:", detections.length);

      // ===== NO FACE =====
      if (detections.length === 0) {
        setNoFaceCount((prev) => {
          const newCount = prev + 1;
          console.log("No face count:", newCount);

          if (newCount >= 2) {
            console.log("⚠️ No face warning triggered");
            setWarnings((w) => w + 1);
            return 0;
          }

          return newCount;
        });
      } else {
        setNoFaceCount(0);
      }

      // ===== MULTIPLE FACE =====
      if (detections.length > 1) {
        setMultiFaceCount((prev) => {
          const newCount = prev + 1;
          console.log("Multiple face count:", newCount);

          if (newCount >= 2) {
            console.log("⚠️ Multiple face warning triggered");
            setWarnings((w) => w + 1);
            return 0;
          }

          return newCount;
        });
      } else {
        setMultiFaceCount(0);
      }
    }, 1000);
  };

  // 🔥 wait until video is actually ready
  const checkVideoReady = setInterval(() => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      clearInterval(checkVideoReady);
      startDetection();
    }
  }, 500);

  return () => {
    clearInterval(interval);
    clearInterval(checkVideoReady);
  };
}, [modelLoaded]);

useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // user switched tab
      setWarnings((prev) => prev + 1);
      setTabSwitchCount((prev) => prev + 1);
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}, []);

useEffect(() => {
  if (warnings > 3 && !submitted) {
    alert("Too many violations. Test will be submitted automatically.");
    handleSubmit();
  }
}, [warnings]);

  const handleOptionChange = (questionId, option) => {
  setAnswers((prev) => ({
    ...prev,
    [questionId]: option,
  }));

  setQuestionStatus((prev) => ({
    ...prev,
    [questionId]: {
      ...prev[questionId],
      visited: true,
      selectedAnswer: option,
    },
  }));
};
const handleSaveAndNext = () => {
  const currentQuestion = questions[currentQuestionIndex];

  setQuestionStatus((prev) => ({
    ...prev,
    [currentQuestion._id]: {
      ...prev[currentQuestion._id],
      visited: true,
    },
  }));

  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);
  }
};
const handleMarkForReview = () => {
  const currentQuestion = questions[currentQuestionIndex];

  setQuestionStatus((prev) => ({
    ...prev,
    [currentQuestion._id]: {
      ...prev[currentQuestion._id],
      markedForReview: true,
      visited: true,
    },
  }));

  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);
  }
};
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    streamRef.current = stream;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  } catch (err) {
    console.error("Camera error:", err);
  }
};

const stopCamera = () => {
  if (streamRef.current) {
    streamRef.current.getTracks().forEach((track) => track.stop());
  }
};

const enterFullscreen = async () => {
  try {
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }

    // 🔥 FIX: re-attach stream after fullscreen
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  } catch (err) {
    console.error("Fullscreen error:", err);
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
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

      const result = await submitPersonalityTest(id, formattedAnswers);

      setSubmitResult(result);
      setSubmitted(true);
    } catch (err) {
      alert(err.message || "Error submitting Personality test");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Header />
        <ApplicantRibbon />

        <main className="mx-auto max-w-5xl px-4 py-6">
          <Card className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Loading Personality test...
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
              Personality Test
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
              Personality Test Not Started
            </h1>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Your Personality test has been assigned, but it is not active yet.
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
              Personality Test Window Closed
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

      <main className="w-full px-4 py-4">
        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {paper?.title || "Personality Test"}
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vacancy: {application?.vacancyTitle}
            </p>
          </div>

          <Badge variant={timeLeft <= 60 ? "danger" : "warning"}>
            Time Left: {formatTime(timeLeft)}
          </Badge>
          <Badge variant={warnings > 2 ? "danger" : "warning"}>
            Warnings: {warnings}/3
          </Badge>
        </section>

        {submitted ? (
          <Card className="space-y-3 text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Personality Test Submitted
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
<div className="grid h-[calc(100vh-180px)] grid-cols-12 gap-4">

  {/* LEFT QUESTION PALETTE */}
  <div className="col-span-12 lg:col-span-2">

    <Card className="sticky top-2 flex h-full flex-col space-y-5 overflow-y-auto">

      {/* TITLE */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Question Palette
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Navigate through all questions
        </p>
      </div>

      {/* QUESTION NUMBERS */}
      <div className="grid grid-cols-4 gap-3">

        {questions.map((q, index) => {
          const status = questionStatus[q._id];

          let bg =
            "bg-white text-gray-800 border border-gray-300";

          // CURRENT QUESTION
          if (index === currentQuestionIndex) {
            bg = "bg-blue-700 text-white";
          }

          // MARKED FOR REVIEW
          else if (status?.markedForReview) {
            bg = "bg-yellow-400 text-black";
          }

          // ANSWERED
          else if (status?.selectedAnswer) {
            bg = "bg-green-600 text-white";
          }

          // VISITED
          else if (status?.visited) {
            bg = "bg-red-500 text-white";
          }

          return (
            <button
              key={q._id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`h-11 w-11 rounded-full text-sm font-semibold transition duration-200 hover:scale-105 ${bg}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* LEGEND */}
      <div className="space-y-3 border-t border-gray-200 pt-4 text-sm dark:border-gray-700">

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-blue-700"></div>
          <span className="text-gray-700 dark:text-gray-200">
            Current Question
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-green-600"></div>
          <span className="text-gray-700 dark:text-gray-200">
            Answered
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
          <span className="text-gray-700 dark:text-gray-200">
            Marked for Review
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-red-500"></div>
          <span className="text-gray-700 dark:text-gray-200">
            Visited
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border border-gray-400 bg-white"></div>
          <span className="text-gray-700 dark:text-gray-200">
            Not Visited
          </span>
        </div>
      </div>
    </Card>
  </div>

  {/* RIGHT QUESTION SECTION */}
  <div className="col-span-12 lg:col-span-10">

    <Card className="flex h-full flex-col space-y-6 overflow-y-auto">

      {/* QUESTION HEADER */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>

          <h2 className="mt-2 text-lg font-semibold leading-7 text-gray-800 dark:text-white">
            {questions[currentQuestionIndex]?.question}
          </h2>
        </div>

        <Badge variant="info">
          {questions[currentQuestionIndex]?.marks || 1} Mark
        </Badge>
      </div>

      {/* OPTIONS */}
      <div className="grid gap-4">

        {questions[currentQuestionIndex]?.options.map((option) => (

          <label
            key={option}
            className={`cursor-pointer rounded-xl border px-4 py-4 transition duration-200 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700
              
              ${
                answers[
                  questions[currentQuestionIndex]?._id
                ] === option
                  ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-gray-700"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
              }
            `}
          >
            <div className="flex items-center gap-3">

              <input
                type="radio"
                name={`question-${questions[currentQuestionIndex]?._id}`}
                value={option}
                checked={
                  answers[
                    questions[currentQuestionIndex]?._id
                  ] === option
                }
                onChange={() =>
                  handleOptionChange(
                    questions[currentQuestionIndex]?._id,
                    option
                  )
                }
                className="h-4 w-4 accent-blue-700"
              />

              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {option}
              </span>
            </div>
          </label>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">

        {/* PREVIOUS */}
        <Button
          variant="secondary"
          onClick={() =>
            setCurrentQuestionIndex((prev) =>
              Math.max(prev - 1, 0)
            )
          }
        >
          Previous
        </Button>

        {/* SAVE NEXT */}
        <Button onClick={handleSaveAndNext}>
          Save & Next
        </Button>

        {/* MARK REVIEW */}
        <Button
          variant="secondary"
          onClick={handleMarkForReview}
        >
          Mark for Review
        </Button>

        {/* CLEAR RESPONSE */}
        <Button
          variant="secondary"
          onClick={() => {
            const qId =
              questions[currentQuestionIndex]?._id;

            setAnswers((prev) => ({
              ...prev,
              [qId]: "",
            }));

            setQuestionStatus((prev) => ({
              ...prev,
              [qId]: {
                ...prev[qId],
                selectedAnswer: "",
              },
            }));
          }}
        >
          Clear Response
        </Button>

        {/* SUBMIT */}
        <Button
          variant="danger"
          onClick={() => {
            const confirmSubmit = window.confirm(
              "Are you sure you want to submit the test?"
            );

            if (confirmSubmit) {
              handleSubmit();
            }
          }}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Test"}
        </Button>
      </div>
    </Card>
  </div>
</div>
        )}
      </main>
      <div
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "220px",
    height: "160px",
    backgroundColor: "black",
    borderRadius: "12px",
    overflow: "hidden",
    zIndex: 99999, // 🔥 important
    border: "2px solid white"
  }}
>
       <video
  ref={videoRef}
  autoPlay
  muted
  playsInline
  onLoadedData={() => setVideoReady(true)}  // 🔥 ADD THIS
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }}
/>
      </div>
    </div>
  );
}