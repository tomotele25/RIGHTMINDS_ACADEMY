import Layout from "@/components/Layout";
import React from "react";
import { useState } from "react";
import Link from "next/link";
const Course = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      department: "Computer Science",
      level: 100,
      instructor: "Dr. Ada Lovelace",
      description: "Foundations of computing and programming concepts.",
      pdfUrl: "/pdfs/intro-to-cs.pdf",
    },
    {
      id: 2,
      title: "Organic Chemistry I",
      department: "Biochemistry",
      level: 200,
      instructor: "Prof. Mariam Okon",
      description:
        "Study of structure, properties, and reactions of organic compounds.",
      pdfUrl: "/pdfs/organic-chem.pdf",
    },
    {
      id: 3,
      title: "Business Communication",
      department: "Business Administration",
      level: 300,
      instructor: "Mr. John Martins",
      description: "Effective communication in business environments.",
      pdfUrl: "/pdfs/business-comm.pdf",
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      department: "Computer Science",
      level: 200,
      instructor: "Dr. Grace Turing",
      description: "Essential algorithms and data manipulation techniques.",
      pdfUrl: "/pdfs/dsa.pdf",
    },
    {
      id: 5,
      title: "Molecular Biology",
      department: "Biochemistry",
      level: 300,
      instructor: "Dr. Ibrahim Musa",
      description: "Structure and function of biological macromolecules.",
      pdfUrl: "/pdfs/molecular-bio.pdf",
    },
    {
      id: 6,
      title: "Strategic Management",
      department: "Business Administration",
      level: 400,
      instructor: "Prof. Kemi Bello",
      description: "Long-term business strategies and planning.",
      pdfUrl: "/pdfs/strategic-mgt.pdf",
    },
  ];

  return (
    <div>
      <Layout>
        <div className="">
          <span className="text-black font-semibold text-center md:text-2xl">
            <h1>Explore PDF materials curated by your department and level.</h1>
          </span>
          <div className="pt-10">
            <div className="flex flex-col md:flex-row md:items-end gap-6 px-4 md:px-10 bg-white shadow-sm rounded-md p-5">
              {/* Department */}
              <div className="flex-1 grid gap-2">
                <label className="text-sm font-medium text-black">
                  Department
                </label>
                <select className="text-black px-4 py-2 border rounded-lg border-gray-300">
                  <option value="">Biochemistry</option>
                  <option value="">Chemistry</option>
                  <option value="">Microbiology</option>
                </select>
              </div>

              {/* Level */}
              <div className="flex-1 grid gap-2">
                <label className="text-sm font-medium text-black">Level</label>
                <select className="text-black px-4 py-2 border rounded-lg border-gray-300">
                  <option value="">100lvl</option>
                  <option value="">200lvl</option>
                  <option value="">300lvl</option>
                </select>
              </div>

              {/* Search */}
              <div className="flex-1 grid gap-2">
                <label className="text-sm font-medium text-black">Search</label>
                <input
                  type="text"
                  placeholder="e.g. Data Structures"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-10 ">
            {courses.map((course, index) => {
              return (
                <div className="bg-white hover:shadow-2xl transition duration-300 shadow p-5 rounded-lg flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <h1 className="text-lg font-semibold text-black line-clamp-2">
                      {course.title}
                    </h1>

                    <p className="text-slate-700 text-sm line-clamp-2">
                      {course.description || "No description available"}
                    </p>

                    <p className="text-slate-700 text-sm font-medium">
                      {course.department} / {course.level} Level
                    </p>
                    <p className="text-gray-500 text-sm">
                      Instructor: {course.instructor}
                    </p>
                  </div>

                  <Link
                    href="/pdf_reader"
                    className="mt-4 inline-block bg-blue-700 text-white text-sm text-center px-4 py-2 rounded-lg w-full hover:bg-blue-800 transition"
                  >
                    View Course
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Course;
