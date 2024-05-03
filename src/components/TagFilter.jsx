const TagFilter = ({ tags, selectedTag, onSelectTag }) => {
          return (
            <ul className="flex text-xs mx-auto border w-6/12 justify-around">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${
                    tag === selectedTag ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => onSelectTag(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          );
        };
        
        export default TagFilter;
        