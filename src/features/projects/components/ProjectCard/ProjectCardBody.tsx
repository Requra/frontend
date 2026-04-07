interface ProjectCardBodyProps {
  name: string
  description: string
  searchQuery?: string
}

function HighlightedText({ text, query }: { text: string; query?: string }) {
  if (!query) return <>{text}</>;

  // Split text by query (case-insensitive)
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-warning-200 text-warning-900 rounded-[2px] px-0.5 py-0 font-medium">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function ProjectCardBody({ name, description, searchQuery }: ProjectCardBodyProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="text-heading-md font-bold text-neutral-900 line-clamp-1">
        <HighlightedText text={name} query={searchQuery} />
      </h3>
      <p className="text-body-md text-neutral-500 line-clamp-2">
        <HighlightedText text={description} query={searchQuery} />
      </p>
    </div>
  )
}
