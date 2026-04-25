export const getCandidateName = (candidate) =>
  candidate?.userId?.name || candidate?.name || "N/A";

export const getCandidateEmail = (candidate) =>
  candidate?.userId?.email || "N/A";

export const getVacancyTitle = (candidate) =>
  candidate?.vacancyId?.title || candidate?.vacancyTitle || candidate?.vacancy || "N/A";

export const formatStage = (stage) =>
  stage ? stage.replaceAll("_", " ") : "N/A";

export const getTechnicalScore = (candidate) =>
  candidate?.technicalScore ?? candidate?.technical ?? "-";

export const getPersonalityScore = (candidate) =>
  candidate?.personalityScore ?? candidate?.personality ?? "-";

export const getCompositeScore = (candidate) =>
  Number(candidate?.verificationScore || 0) +
  Number(candidate?.technicalScore || 0) +
  Number(candidate?.personalityScore || 0);

export const isReadyForEvaluation = (candidate) =>
  candidate?.currentStage === "FINAL_REVIEW" &&
  ["NOT_DECIDED", "PENDING", undefined, null].includes(candidate?.finalStatus);

export const getStageBadgeVariant = (stage) => {
  switch (stage) {
    case "FINAL_REVIEW":
      return "warning";
    case "COMPLETED":
      return "success";
    case "VERIFICATION_REJECTED":
      return "danger";
    default:
      return "info";
  }
};