import { useState } from "react";
import LandingLayout from "../layouts/LandingLayout";

export default function Director() {
  const [activeTab, setActiveTab] = useState("brief");

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white shadow-sm">
        
        {/* TITLE */}
        <div className="border-b border-gray-200 px-6 py-5">
          <h1 className="text-4xl font-bold text-amber-900">Director</h1>
        </div>

        {/* TABS */}
        <div className="px-6 pt-4">
          <div className="flex border border-gray-300 bg-gray-50">
            
            <button
              className={`border-r border-gray-300 px-5 py-3 ${
                activeTab === "brief"
                  ? "bg-white text-gray-900"
                  : "text-blue-600 hover:bg-white"
              }`}
              onClick={() => setActiveTab("brief")}
            >
              Brief Profile
            </button>

            <button
              className={`px-5 py-3 ${
                activeTab === "former"
                  ? "bg-white text-gray-900"
                  : "text-blue-600 hover:bg-white"
              }`}
              onClick={() => setActiveTab("former")}
            >
              Former Director
            </button>

          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-5 text-[15px] leading-8 text-gray-800">
          
          {activeTab === "brief" ? (
            <div className="space-y-4">
              <p>
                <span className="font-bold">
                  Smt. KV Prabha, Scientist H
                </span>{" "}
                took over as Director RAC on 1st Mar 2023. She is a post
                graduate in Computer Science and MPhil in Computer Science
                with Data Mining as specialization.
              </p>

              <p>
                She has undergone training in Advanced Leadership courses in
                IIM(A) and ASCI. She joined DRDO in the year 1990 at DRDL
                Hyderabad and has extensively contributed to knowledge
                management initiatives and institutional development.
              </p>

              <p>
                She has contributed to various non-IT and IT initiatives such
                as knowledge sharing platforms, surveys, technical forums,
                document management systems, and innovation programs across
                DRDO labs.
              </p>

              <p>
                She played a major role in process re-engineering and
                implementation of workflow-based approvals, improving
                efficiency in project execution, procurement, testing, and
                administration.
              </p>

              <p>
                She also led initiatives for cluster-level online clearances,
                monitoring systems, and has experience in ISO, CMMI, and
                Information Security Management Systems.
              </p>

              <p>
                At RAC, she has established modern infrastructure including
                data centers, structured LAN systems, and has contributed to
                recruitment automation using AI-based systems.
              </p>

              <p>
                She has received recognition including National Science Day
                award for her contributions.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p>List of former Directors can be added here.</p>
              <ul className="list-disc pl-6">
                <li>Former Director 1</li>
                <li>Former Director 2</li>
                <li>Former Director 3</li>
              </ul>
            </div>
          )}

        </div>
      </div>
    </LandingLayout>
  );
}