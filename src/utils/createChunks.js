const createChunks = (file, chunkSize) => {
  const res = [];
  for (let i = 0; i < file.size; i += chunkSize) {
    res.push(file.slice(i, i + chunkSize));
  }
  return res
};

export default createChunks;