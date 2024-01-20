import {useEffect, useRef, useState} from "react";
import Tags from "./components/Tags";
import List from "./components/List";
import info from "./DummyData";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  let flag = false;
  const [dialogBoxActive, setDialogBoxActive] = useState(false);
  const filteredInfo = info.filter((item) => tags.includes(item.email));
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setDialogBoxActive(false);
      }
    };
    document.addEventListener("click", (e) => handleClickOutside(e));
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && inputRef.current.value === "") {
      if (filteredInfo.length === 0) return;
      const lastTagEmail = filteredInfo[filteredInfo.length - 1].email;
      const lastTagEl = document.querySelectorAll(
        `[data-id="${lastTagEmail}"]`
      )[0];
      if (!flag) {
        lastTagEl.style.border = "2px solid black";
        flag = true;
      } else {
        flag = false;
        setTags(tags.filter((item) => item != lastTagEmail));
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-32 w-screen">
      <h1 className="text-4xl text-center font-serif">Pick Users</h1>
      <div className="flex mt-5 gap-4 items-center justify-start w-1/2 flex-wrap">
        {filteredInfo.map((item) => (
          <Tags
            key={item.email}
            name={item.name}
            email={item.email}
            image={item.image}
            setTags={setTags}
          />
        ))}
        <div className="relative">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search here..."
            value={searchQuery}
            onKeyDown={(e) => handleKeyDown(e)}
            className="focus:outline-none text-lg"
            onFocus={() => setDialogBoxActive(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          {dialogBoxActive && (
            <div
              ref={dialogRef}
              className="absolute w-[400px] h-fit top-8 overflow-y-scroll"
            >
              <List tags={tags} setTags={setTags} searchQuery={searchQuery} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
