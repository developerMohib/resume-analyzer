import type { Route } from "./+types/home";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";
import { usePuterStore } from "~/lib/puter";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Welcome to Resume Analyzer with smart feedback for your dream job!" },
  ];
}

export default function Home() {

  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    } else {
      setLoadingResumes(true);
      kv.get("resumes").then((res) => {
        console.log("resumes from kv", res);
        setLoadingResumes(false);
      });
    }
  }, [auth.isAuthenticated, navigate, kv]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      {/* {window.puter.ai.} */}

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-50" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume, ind) => (
              <ResumeCard key={ind} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
