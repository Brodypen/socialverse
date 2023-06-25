import { useNavigate } from "react-router-dom";
const AddCreatorCard = () => {

  const navigate = useNavigate();
  return (
    <div className="w-[200px]">
      <div className="overflow-hidden border-2 border-solid rounded-md">
        <button className="w-[200px] h-[300px] object-cover transition-all hover:scale-110 bg-gradient-to-r to-gray-800  hover:opacity-100 opacity-80 flex justify-center items-center" onClick={() => navigate("/add-Creator")}>
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>
        </button>

        {/* <img
          className={`w-[200px] h-[300px] object-cover transition-all hover:scale-105 bg-gradient-to-r to-gray-800  hover:opacity-100 opacity-80`}
          src={User}
          width="200px"
          height="300px"
        /> */}
      </div>
    </div>
  );
};

export default AddCreatorCard;
