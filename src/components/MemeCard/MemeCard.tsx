import Card from 'react-bootstrap/Card';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import { MdOutlineStarBorder } from 'react-icons/md';
import { BsTags } from 'react-icons/bs';
import './MemeCard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function MemeCard() {
  return (
    <div className="MemeCardContainer">
      <Card className="CardStyle" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle>Author created at ...</Card.Subtitle>

          <Card.Img variant="top" src="/favicon.ico" />
          <section>
            <BsTags />
            <div>
              <Card.Link href="#">TAGS</Card.Link>
              <Card.Link href="#">TAGS</Card.Link>
              <Card.Link href="#">TAGS</Card.Link>
            </div>
          </section>

          <div className="Emotes">
            <Button variant="primary">
              <FaComment />
            </Button>
            <Button variant="primary">
              <AiFillLike />
            </Button>
            <Button variant="primary">
              <AiFillDislike />
            </Button>
            <Button variant="primary">
              <FaDownload />
            </Button>
            <Button variant="primary">
              <MdOutlineStarBorder />
              {/* <MdOutlineStar /> */}
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="CardStyle" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle>Author created at ...</Card.Subtitle>

          <Card.Img variant="top" src="src/assets/Logo slogan noir.png" />
          <section>
            <BsTags />
            <div>
              <Card.Link href="#">TAGS</Card.Link>
              <Card.Link href="#">TAGS</Card.Link>
              <Card.Link href="#">TAGS</Card.Link>
            </div>
          </section>

          <div className="Emotes">
            <Button variant="primary">
              <FaComment />
            </Button>
            <Button variant="primary">
              <AiFillLike />
            </Button>
            <Button variant="primary">
              <AiFillDislike />
            </Button>
            <Button variant="primary">
              <FaDownload />
            </Button>
            <Button variant="primary">
              <MdOutlineStarBorder />
              {/* <MdOutlineStar /> */}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MemeCard;
