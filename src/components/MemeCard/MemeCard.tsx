import Card from 'react-bootstrap/Card';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import { MdOutlineStarBorder } from 'react-icons/md';
import { BsTags } from 'react-icons/bs';
import './MemeCard.scss';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function MemeCard() {
  return (
    <Card className="CardStyle" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle>Author created at ...</Card.Subtitle>

        <Card.Img variant="top" src="public/favicon.ico" />
        <section>
          <BsTags />
          <div>
            <Card.Link href="#">TAGS</Card.Link>
            <Card.Link href="#">TAGS</Card.Link>
            <Card.Link href="#">TAGS</Card.Link>
          </div>
        </section>

        <div>
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
  );
}

export default MemeCard;
