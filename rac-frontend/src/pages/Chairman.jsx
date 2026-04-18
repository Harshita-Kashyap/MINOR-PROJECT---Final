import { useState } from "react";
import LandingLayout from "../layouts/LandingLayout";

export default function Chairman() {
  const [activeTab, setActiveTab] = useState("brief");

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white shadow-sm dark:border-sky-900 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-400">
            Chairman
          </h1>
        </div>

        <div className="px-6 pt-4">
          <div className="flex flex-wrap border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
            <button
              className={`border-r border-gray-300 px-5 py-3 text-base dark:border-gray-700 ${
                activeTab === "brief"
                  ? "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                  : "bg-gray-50 text-blue-600 hover:bg-white dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("brief")}
            >
              Brief Profile
            </button>

            <button
              className={`px-5 py-3 text-base ${
                activeTab === "former"
                  ? "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                  : "bg-gray-50 text-blue-600 hover:bg-white dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("former")}
            >
              Former Chairmen
            </button>
          </div>
        </div>

        <div className="px-6 py-5 text-[15px] leading-8 text-gray-800 dark:text-gray-200">
          {activeTab === "brief" ? (
            <div className="space-y-4">
              <p>
                <span className="font-bold">Dr. Samir V Kamat</span>, Secretary,
                Department of Defence Research &amp; Development (DDR&amp;D) and
                Chairperson DRDO has been entrusted with the additional charge of
                the post of Chairman RAC with effect from 13-Jun-2025.
              </p>

              <p>
                Recruitment and Assessment Centre (RAC) is the corporate body of
                DRDO that manages scientific recruitment, assessment activities,
                and related manpower functions for technical and research roles.
              </p>

              <p>
                Under the leadership of the Chairman, RAC supports transparent,
                merit-based, and efficient selection processes for various
                scientific and technical positions.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p>
                Information about former Chairmen can be added here in list form.
              </p>
              <ul className="list-disc pl-6">
                <li>Former Chairman 1</li>
                <li>Former Chairman 2</li>
                <li>Former Chairman 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </LandingLayout>
  );
}