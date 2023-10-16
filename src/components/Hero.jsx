import { BsArrowDown, BsSearch } from "react-icons/bs";

const Hero = () => {
  return (
    <section className="container_hero">
      <article>
        <h4>PRIMAVERA/VERANO 2023</h4>
        <h2>
          Mantenete <span>SPICY</span>
        </h2>
        <h6>Descubrí la colección más ardiente de la temporada</h6>
        <div className="container_input">
          <input type="text" placeholder="Buscá tu producto" />
          <button>
            <BsSearch />
          </button>
        </div>
      </article>
    </section>
  );
};

export default Hero;
