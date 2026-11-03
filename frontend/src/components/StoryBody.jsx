import { Num } from "@/components/Num";

const parse = (body) => {
  const blocks = [];
  body.split("\n").forEach((line) => {
    if (line.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") last.items.push(line.slice(2));
      else blocks.push({ type: "ul", items: [line.slice(2)] });
    } else if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4) });
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) });
    else if (line.startsWith("> ")) blocks.push({ type: "quote", text: line.slice(2) });
    else blocks.push({ type: "p", text: line });
  });
  return blocks;
};

const Block = ({ b }) => {
  if (b.type === "h2") return <h2 className="story-h2">{b.text}</h2>;
  if (b.type === "h3") return <h3 className="story-h3">{b.text}</h3>;
  if (b.type === "quote") return <p className="story-quote">{b.text}</p>;
  if (b.type === "ul")
    return (
      <ul className="list-disc pl-5 flex flex-col gap-2">
        {b.items.map((i) => <li key={i}><Num text={i} /></li>)}
      </ul>
    );
  return <p><Num text={b.text} /></p>;
};

export const StoryBody = ({ body }) => (
  <div className="story-body" data-testid="story-body">
    {parse(body).map((b, i) => <Block key={i} b={b} />)}
  </div>
);
