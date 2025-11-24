import news1 from "../assets/images/news1.png";
import news2 from "../assets/images/news2.png";
import news3 from "../assets/images/news3.png";
import news4 from "../assets/images/news4.png";

export function CardNews() {
  return (
    <div className="card w-100 h-100">
      <img
        src={news1}
        className="img-thumbnail w-100"
        alt="..."
        style={{
          height: "200px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">Card title</h5>
        <p className="card-text flex-grow-1">
          Some quick example text to build on the card title and make up the
          bulk of the card’s content.
        </p>

        <a href="#" className="btn btn-primary mt-auto">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export function CardNews2() {
  return (
    <div className="card w-100 h-100">
      <img
        src={news2}
        className="img-thumbnail w-100"
        alt="..."
        style={{
          height: "200px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">Card title</h5>
        <p className="card-text flex-grow-1">
          Some quick example text to build on the card title and make up the
          bulk of the card’s content.
        </p>

        <a href="#" className="btn btn-primary mt-auto">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export function CardNews3() {
  return (
    <div className="card w-100 h-100">
      <img
        src={news3}
        className="img-thumbnail w-100"
        alt="..."
        style={{
          height: "200px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">Card title</h5>
        <p className="card-text flex-grow-1">
          Some quick example text to build on the card title and make up the
          bulk of the card’s content.
        </p>

        <a href="#" className="btn btn-primary mt-auto">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export function CardNews4() {
  return (
    <div className="card w-100 h-100">
      <img
        src={news4}
        className="img-thumbnail w-100"
        alt="..."
        style={{
          height: "200px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">Card title</h5>
        <p className="card-text flex-grow-1">
          Some quick example text to build on the card title and make up the
          bulk of the card’s content.
        </p>

        <a href="#" className="btn btn-primary mt-auto">
          Go somewhere
        </a>
      </div>
    </div>
  );
}
