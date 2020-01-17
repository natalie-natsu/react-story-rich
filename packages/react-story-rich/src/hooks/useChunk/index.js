const useChunk = (chunk, { nav }) => (
  chunk.length > 0 ? nav.setChunk(chunk) : nav
);

export default useChunk;
