/* eslint-disable react/prop-types */

const ListItems = ({
  name = "Akif Ahmed",
  image = "./dummy.png",
  email = "akifahmed90@gmail.com",
  setTags,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    setTags((prev) => {
      return [...prev, email];
    });
  };
  return (
    <div
      onClick={handleClick}
      className="w-full cursor-pointer px-3 py-2 flex gap-3 justify-start items-center mt-2 hover:bg-slate-100"
    >
      <div className="overflow-hidden rounded-full h-full w-10">
        <img src={image} alt="avatar" />
      </div>
      <span className="flex-1 text-black  text-md">{name}</span>
      <span className="flex-1 text-slate-400 text-md">{email}</span>
    </div>
  );
};

export default ListItems;
