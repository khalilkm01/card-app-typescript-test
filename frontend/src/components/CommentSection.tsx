import React, { useState } from "react";

interface CommentSectionProps {
  taskId: string;
}

export default function CommentSection({ taskId }: CommentSectionProps) {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setComment("");
  };

  return (
    <div>
      {/*<h3>Comments</h3>*/}
      {/*<form onSubmit={handleSubmit}>*/}
      {/*  <textarea value={comment} onChange={(e) => setComment(e.target.value)} />*/}
      {/*  <button type="submit">Add Comment</button>*/}
      {/*</form>*/}
    </div>
  );
}
