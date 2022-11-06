export const GalleryList = ({ array }) => {
  return (
    <ul>
      {array.map(({ title, id, votes }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes: {votes}</p>
            <button type="button">Open Poster</button>
          </li>
        );
      })}
    </ul>
  );
};
