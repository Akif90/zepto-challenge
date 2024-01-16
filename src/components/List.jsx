/* eslint-disable react/prop-types */
import ListItems from "./ListItems";
import info from "../DummyData.js";

const List = ({tags, setTags, searchQuery}) => {
  const filteredInfo = info.filter((item) => {
    return (
      searchQuery === "" || item.name.toLowerCase().startsWith(searchQuery)
    );
  });
  return (
    <div className="w-full">
      {filteredInfo.map((item, ind) => {
        if (tags.includes(item.email) === false) {
          return (
            <ListItems
              setTags={setTags}
              key={filteredInfo[ind].email}
              index={ind}
              name={filteredInfo[ind].name}
              image={filteredInfo[ind].image}
              email={filteredInfo[ind].email}
            />
          );
        }
      })}
    </div>
  );
};

export default List;
