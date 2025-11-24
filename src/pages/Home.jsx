import Carousel from "../components/Carousel";
import { CardNews, CardNews2, CardNews3 } from "../components/CardN";

function Home() {
  return (
    <>
      <Carousel />

      {/* section cards news */}
      <div className="container">
        <section className="card-news">
          <div className="container text-center">
            <div className="row justify-content-center align-items-center">
              <div className="col">Company News</div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <CardNews />
              <CardNews2 />
              <CardNews3 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
