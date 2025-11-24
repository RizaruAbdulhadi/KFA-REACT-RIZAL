import Carousel from "../components/Carousel";
import { CardNews, CardNews2, CardNews3, CardNews4 } from "../components/CardN";

function Home() {
  return (
    <>
      {/* section cards news */}
      <div className="container-fluid">
        <section className="card-news">
          <Carousel />
          <div className="container text-center">
            <div className="mx-auto p-2 mt-4 mb-5">
              <span
                className="col"
                style={{
                  borderBottom: "2px solid #6EC1E4",
                  paddingBottom: "2px",
                  fontFamily: "Montserrat",
                  fontSize: 27,
                }}
              >
                Berita
              </span>
            </div>
          </div>
        </section>

        <div className="container text-center">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            <div className="col">
              <CardNews />
            </div>

            <div className="col">
              <CardNews2 />
            </div>

            <div className="col">
              <CardNews3 />
            </div>

            <div className="col">
              <CardNews4 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
