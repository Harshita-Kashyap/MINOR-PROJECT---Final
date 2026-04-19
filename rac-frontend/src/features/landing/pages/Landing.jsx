import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LandingLayout from "../../../layouts/LandingLayout";
import HomeNoticeModal from "../components/HomeNoticeModal";

export default function Landing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isNoticeOpen, setIsNoticeOpen] = useState(true);

  useEffect(() => {
    const shouldOpen = searchParams.get("notice");

    if (shouldOpen === "open") {
      setIsNoticeOpen(true);
      setSearchParams({}, { replace: true });
    } else {
      setIsNoticeOpen(true);
    }
  }, [searchParams, setSearchParams]);

  const handleCloseNotice = () => {
    setIsNoticeOpen(false);
  };

  return (
    <>
      <LandingLayout />
      <HomeNoticeModal isOpen={isNoticeOpen} onClose={handleCloseNotice} />
    </>
  );
}