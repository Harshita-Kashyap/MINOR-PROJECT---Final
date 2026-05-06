import Header from "../../landing/components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Guidelines = () => {
  const [agreed, setAgreed] = useState(false);

  const videoRef = useRef(null);

  const [cameraAllowed, setCameraAllowed] =
    useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { id, type } = useParams();

  // DYNAMIC CONTENT
  const isPersonality =
    type === "personality";

  const testTitle = isPersonality
    ? "PERSONALITY TEST"
    : "TECHNICAL TEST";

  const overviewTitle = isPersonality
    ? "Personality Assessment Overview"
    : "Technical Assessment Overview";

  const pageTitle = isPersonality
    ? "Personality Test Guidelines"
    : "Technical Test Guidelines";

  const startButtonText = isPersonality
    ? "Start Personality Test"
    : "Start Technical Test";

  const aboutText = isPersonality
    ? "This assessment evaluates behavioral traits, communication style, workplace suitability, decision-making ability, and psychological aptitude."
    : "This assessment evaluates technical knowledge, analytical thinking, subject expertise, coding ability, and problem-solving skills.";

  useEffect(() => {
    const timer = setTimeout(() => {
      startCamera();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: true,
            audio: false,
          }
        );

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata =
          () => {
            videoRef.current.play();
          };

        // FIX BLACK FRAME
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject =
              stream;
          }
        }, 100);
      }

      setCameraAllowed(true);
      setError("");
    } catch (err) {
      setError(
        "Camera permission is required to start the test."
      );

      setCameraAllowed(false);
    }
  };

  const handleStart = () => {
    if (!cameraAllowed) return;

    const tracks =
      videoRef.current.srcObject.getTracks();

    tracks.forEach((track) => track.stop());

    navigate(
      `/applicant/${type}-test/${id}`
    );
  };

  return (
    <>
      <Header />

      <div
        style={{
          minHeight: "100vh",
          background: "#f4f6fb",
          fontFamily:
            "'Segoe UI', Arial, sans-serif",
          display: "flex",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            display: "flex",
            gap: "30px",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT SIDEBAR */}
          <div
            style={{
              width: "320px",
              background: "#ffffff",
              borderRadius: "12px",
              padding: "25px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#2563eb",
                fontWeight: "600",
                marginBottom: "8px",
                letterSpacing: "1px",
              }}
            >
              {testTitle}
            </p>

            <h2
              style={{
                fontSize: "24px",
                marginBottom: "20px",
                color: "#111827",
                lineHeight: "1.4",
              }}
            >
              {overviewTitle}
            </h2>

            {/* ABOUT TEST */}
            <div
              style={{
                marginBottom: "25px",
                padding: "14px",
                borderRadius: "10px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
              }}
            >
              <h4
                style={{
                  marginBottom: "10px",
                  color: "#1d4ed8",
                  fontSize: "15px",
                }}
              >
                About the Test
              </h4>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.8",
                  color: "#374151",
                }}
              >
                {aboutText}
              </p>
            </div>

            {/* OVERVIEW */}
            <div
              style={{
                lineHeight: "2",
                fontSize: "15px",
                color: "#374151",
              }}
            >
              <p>
                📝{" "}
                <strong>
                  Total Questions:
                </strong>{" "}
                30
              </p>

              <p>
                🎯{" "}
                <strong>
                  Total Marks:
                </strong>{" "}
                30
              </p>

              <p>
                ⏱{" "}
                <strong>Duration:</strong>{" "}
                30 Minutes
              </p>

              <p>
                ⚠️{" "}
                <strong>
                  Maximum Warnings:
                </strong>{" "}
                3
              </p>

              <p>
                🤖{" "}
                <strong>
                  AI Proctoring:
                </strong>{" "}
                Enabled
              </p>

              <p>
                📷{" "}
                <strong>
                  Camera Access:
                </strong>{" "}
                Mandatory
              </p>
            </div>

            {/* STATUS */}
            <div
              style={{
                marginTop: "25px",
                padding: "12px",
                borderRadius: "8px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                fontSize: "14px",
              }}
            >
              {cameraAllowed ? (
                <span
                  style={{
                    color: "green",
                  }}
                >
                  ✔ System Check Completed
                </span>
              ) : (
                <span
                  style={{
                    color: "#d97706",
                  }}
                >
                  ⏳ Waiting for Camera Access
                </span>
              )}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div
            style={{
              flex: 1,
              background: "#ffffff",
              borderRadius: "12px",
              padding: "40px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h1
              style={{
                fontSize: "32px",
                marginBottom: "10px",
                color: "#111827",
                fontWeight: "600",
              }}
            >
              {pageTitle}
            </h1>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "30px",
                fontSize: "15px",
              }}
            >
              • Please read all instructions
              carefully before starting the
              examination.
            </p>

            {/* GUIDELINES */}
            <div
              style={{
                lineHeight: "2",
                fontSize: "15px",
                color: "#374151",
              }}
            >
              <h3
                style={{
                  color: "#2563eb",
                }}
              >
                1. General Instructions
              </h3>

              <ul>
                <li>
                  • The examination will be
                  conducted in online mode.
                </li>

                <li>
                  • Read all questions
                  carefully before answering.
                </li>

                <li>
                  • Once submitted, answers
                  cannot be modified.
                </li>

                <li>
                  • Do not refresh or close
                  the browser window.
                </li>
              </ul>

              <h3
                style={{
                  marginTop: "25px",
                  color: "#dc2626",
                }}
              >
                2. Proctoring Rules
              </h3>

              <ul>
                <li>
                  • Your webcam will remain
                  active throughout the test.
                </li>

                <li>
                  • Your face must remain
                  clearly visible.
                </li>

                <li>
                  • Tab switching or
                  minimizing the screen is
                  prohibited.
                </li>

                <li>
                  • Use of mobile phones is
                  strictly prohibited.
                </li>

                <li>
                  • Multiple faces may trigger
                  automatic warnings.
                </li>
              </ul>

              <h3
                style={{
                  marginTop: "25px",
                  color: "#059669",
                }}
              >
                3. Technical Requirements
              </h3>

              <ul>
                <li>
                  • Ensure stable internet
                  connectivity.
                </li>

                <li>
                  • Allow camera access when
                  prompted.
                </li>

                <li>
                  • Use Chrome or Edge browser
                  for best experience.
                </li>

                <li>
                  • Close unnecessary
                  background applications.
                </li>
              </ul>
            </div>

            {/* WARNING */}
            <div
              style={{
                marginTop: "30px",
                padding: "16px",
                background: "#fff7ed",
                border:
                  "1px solid #fdba74",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#9a3412",
              }}
            >
              ⚠️ Any suspicious activity or
              repeated violations may lead to
              automatic submission of the
              examination.
            </div>

            {/* DECLARATION */}
            <div
              style={{
                marginTop: "30px",
                padding: "18px",
                border:
                  "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "#f9fafb",
              }}
            >
              <label
                style={{
                  fontSize: "15px",
                  color: "#111827",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    marginRight: "12px",
                    transform:
                      "scale(1.2)",
                  }}
                  onChange={(e) =>
                    setAgreed(
                      e.target.checked
                    )
                  }
                />

                I have read and understood
                all the instructions mentioned
                above and agree to comply
                with the examination rules.
              </label>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleStart}
              disabled={
                !cameraAllowed || !agreed
              }
              style={{
                marginTop: "30px",
                padding:
                  "14px 42px",
                fontSize: "16px",
                fontWeight: "600",
                background:
                  cameraAllowed &&
                  agreed
                    ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                    : "#9ca3af",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor:
                  cameraAllowed &&
                  agreed
                    ? "pointer"
                    : "not-allowed",
                boxShadow:
                  cameraAllowed &&
                  agreed
                    ? "0 8px 20px rgba(37,99,235,0.25)"
                    : "none",
              }}
            >
              {startButtonText}
            </button>

            {error && (
              <p
                style={{
                  marginTop: "12px",
                  color: "red",
                  fontSize: "14px",
                }}
              >
                {error}
              </p>
            )}
          </div>
        </div>

        {/* CAMERA */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "220px",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#fff",
            border: cameraAllowed
              ? "3px solid #22c55e"
              : "3px solid #d1d5db",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              background: "#000",
            }}
          />

          <div
            style={{
              padding: "8px",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            {cameraAllowed ? (
              <span
                style={{
                  color: "green",
                }}
              >
                ✔ Camera Active
              </span>
            ) : (
              <span
                style={{
                  color: "#d97706",
                }}
              >
                ⏳ Initializing...
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Guidelines;