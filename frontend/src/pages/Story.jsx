import { Navigate, useParams } from "react-router-dom";
import { stories } from "@/stories";
import { StoryBody } from "@/components/StoryBody";

export default function Story() {
  const { id } = useParams();
  const story = stories[Number(id) - 1];
  if (!story) return <Navigate to="/" replace />;
  return (
    <main data-testid={`story-page-${id}`} className="section">
      <article className="text-measure">
        <h1 data-testid="story-title" className="section-title">{story.title}</h1>
        <div data-testid="story-role" className="role-box mt-12">
          <strong>My role:</strong> {story.role}
        </div>
        <StoryBody body={story.body} />
      </article>
    </main>
  );
}
