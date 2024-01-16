import {useEffect, useRef, useState} from "react";
import Tags from "./components/Tags";
import List from "./components/List";
import info from "./DummyData";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const [dialogBoxActive, setDialogBoxActive] = useState(false);
  const filteredInfo = info.filter((item) => tags.includes(item.email));
  useEffect(() => {
    if (dialogRef.current != null && inputRef.current != null) {
      document.addEventListener("click", (e) => {
        if (
          dialogRef.current.contains(e.target) === false &&
          inputRef.current.contains(e.target) === false
        )
          setDialogBoxActive(false);
      });
    }
  }, [dialogRef, inputRef]);
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && inputRef.current.value === "") {
      const lastTagEmail = filteredInfo[filteredInfo.length - 1].email;
      const lastTagEl = document.querySelectorAll(
        `[data-id="${lastTagEmail}"]`
      )[0];
      lastTagEl.dataset.delete = "yes";
      console.log(lastTagEl.dataset.delete);
      lastTagEl.focus();
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {dialogBoxActive && (
            <div
              ref={dialogRef}
              className="absolute w-[400px] h-[300px] top-8 overflow-y-scroll"
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
