import Carousel from "../components/Carousel";
import CardNews from "../components/CardN";

function Home() {
  return (
    <>
      <Carousel />

      {/* section cards news */}
      <section className="card-news">
        <div className="container text-center">
          <div className="row justify-content-center align-items-center">
            <div className="col">Company News</div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col">
            <CardNews />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
