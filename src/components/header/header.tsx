import { SearchBar } from "..";

const Header = () => {
  return (
    <header className="flex w-full justify-between items-center py-4 text-neutral-200">
      <p className="text-xl font-bold">ManagemateAI</p>
      <SearchBar />
    </header>
  );
};

export default Header;
