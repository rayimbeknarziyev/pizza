type Props = {
  active: number | null;
  onSelect: (index: number | null) => void;
};

function Categories({ active, onSelect }: Props) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="container flex items-center justify-between mt-5">
      <div className="flex gap-3 overflow-x-auto flex-nowrap p-2">
        {categories.map((name, index) => (
          <button
            key={index}
            onClick={() => onSelect(index === 0 ? null : index - 1)} 
            className={`btn ${
              active === (index === 0 ? null : index - 1)
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div>
        <p className="font-bold text-sm text-[#2C2C2C]">
          Сортировка по:
          <select className="mx-2">
            <option value="popularity">популярности</option>
            <option value="price">по цене</option>
            <option value="alphabet">по алфавиту</option>
          </select>
        </p>
      </div>
    </div>
  );
}

export default Categories;
