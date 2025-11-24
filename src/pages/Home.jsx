import Carousel from "../components/Carousel";
// import CardNews from "../components/CardNews";

function Home() {
  return (
    <>
      <Carousel />
      {/* section cards news */}
      <section className="=card-news">
        <div className="container text-center">
          <div className="row justify-content-center align=items-center">
            <div className="col">Company News</div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Card subtitle
              </h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card’s content.
              </p>
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Card subtitle
              </h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card’s content.
              </p>
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Card subtitle
              </h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card’s content.
              </p>
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
