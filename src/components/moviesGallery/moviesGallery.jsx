export const GalleryList = ({ array, onClick }) => {
  return (
    <ul>
      {array.map(({ title, id, votes, image }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes: {votes}</p>
            <button type="button" onClick={() => onClick({ title, image })}>
              Open Poster
            </button>
          </li>
        );
      })}
    </ul>
  );
};
