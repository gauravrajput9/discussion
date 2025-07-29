"use client";

import { useRouter } from "next/navigation";

type GoBackButtonProps = {
  slug: string;
};

const GoBackButton = ({ slug }: GoBackButtonProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push(`/topics/${slug}`);
  };

  return (
    <button
      onClick={handleGoBack}
      className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
    >
      Go Back to <span className="ml-2 font-semibold">{slug.toUpperCase()}</span>
    </button>
  );
};

export default GoBackButton;
