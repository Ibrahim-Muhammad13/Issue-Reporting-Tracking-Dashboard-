"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Comment } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

export function CommentsSection({
  comments,
  onPostComment,
}: {
  comments: Comment[];
  onPostComment: (message: string) => void;
}) {
  const [draft, setDraft] = useState("");

  function handlePost() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onPostComment(trimmed);
    setDraft("");
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {comments.length === 0 ? (
          <p className="text-sm text-ink-secondary">No comments yet. Start the conversation below.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex gap-2.5">
              <Avatar name={c.author} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-ink">{c.author}</span>
                  <span className="text-xs text-ink-secondary">{c.role}</span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-ink">{c.message}</p>
                <p className="mt-1 text-xs text-ink-faint">{formatDateTime(c.timestamp)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex gap-2.5 border-t border-border pt-4">
        <Avatar name="Jordan Blake" />
        <div className="flex-1">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a comment for the site team…"
            rows={2}
            className="w-full resize-none rounded-md border border-border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handlePost}
              disabled={!draft.trim()}
              className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
