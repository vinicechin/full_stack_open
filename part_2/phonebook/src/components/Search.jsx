export function Search(searchValue, handleOnSearchValueChange) {
  return (
    <div>
      Search <input value={searchValue} onChange={handleOnSearchValueChange} />
    </div>
  );
}