interface ProjectCardBodyProps {
  title: string
  description: string
}

export function ProjectCardBody({ title, description }: ProjectCardBodyProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="text-heading-md font-bold text-neutral-900 line-clamp-1">{title}</h3>
      <p className="text-body-md text-neutral-500 line-clamp-2">{description}</p>
    </div>
  )
}
