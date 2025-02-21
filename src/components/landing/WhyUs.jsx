import React from "react";
import ArticleGrid from "./ArticleGrid";

export default function WhyUs() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <p>Our Trust</p>
        <h1 className="text-5xl font-medium px-4 rounded-sm text-primary my-4">
          Why Trust Us?
        </h1>
        <h1 className="text-5xl font-medium px-4 rounded-sm text-primary my-4">
          See what <span className="bg-secondary px-2"> our experts</span> are
          saying.
        </h1>
        <ArticleGrid />
      </div>
    </div>
  );
}
