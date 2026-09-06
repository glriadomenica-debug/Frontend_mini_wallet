import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
}

export default function BackButton({ label = "Back" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        border
        border-gray-200
        bg-white
        text-gray-600
        text-sm
        font-medium
        hover:bg-gray-50
        hover:text-gray-800
        transition-all
        duration-200
        shadow-sm
      "
    >
      <FiArrowLeft size={17} />
      {label}
    </button>
  );
}
