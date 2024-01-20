/* eslint-disable react/prop-types */
import {RxCross1} from "react-icons/rx";
const Tags = ({name = "Akif Ahmed", email, image, setTags}) => {
  const handleClick = () => {
    setTags((prev) => {
      return prev.filter((item) => {
        if (item === email) return false;
        else return true;
      });
    });
  };

  return (
    <div
      data-id={email}
      className={`w-fit h-fit px-3 py-2 bg-slate-100 rounded-2xl  
      flex items-center gap-3 hover:border-2 focus:border-4 focus:border-yellow-600 hover:border-black`}
    >
      <div className="overflow-hidden w-7 h-7 rounded-full">
        <img src={image} alt="" />
      </div>
      <span>{name}</span>
      <RxCross1
        onClick={handleClick}
        className="w-7 h-7 p-1 hover:bg-slate-300 hover:rounded-full"
      />
    </div>
  );
};

export default Tags;
