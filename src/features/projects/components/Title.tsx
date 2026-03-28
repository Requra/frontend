interface IProps {
  title: string;
  description: string;
}

export const Title = ({ title, description }: IProps) => {
  return (
    <div className="mb-10 w-full flex flex-col items-center">
      <h1 className="text-page-title font-bold text-neutral-900 mb-2">
        {title}
      </h1>
      <p className="text-body-lg text-neutral-500">{description}</p>
    </div>
  );
};

