import CourseProgressTable from "@/components/CourseProgressTable";
import Layout from "@/components/Layout";
import React from "react";

const Progress_Tracker = () => {
  return (
    <div>
      <Layout>
        <div className="flex justify-evenly">
          <div className="bg-slate-400 h-52 w-52 rounded-md"></div>
          <div className="bg-slate-400 h-52 w-52 rounded-md"></div>
          <div className="bg-slate-400 h-52 w-52 rounded-md"></div>
        </div>
        <div>{/* <CourseProgressTable /> */}
          
        </div>
      </Layout>
    </div>
  );
};

export default Progress_Tracker;
