export const helper = array => {
  return array.map(
    ({ backdrop_path: image, id, title, vote_count: votes }) => ({
      image,
      id,
      title,
      votes,
    })
  );
};
