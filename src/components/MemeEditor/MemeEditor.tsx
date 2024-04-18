import React, { useState, useEffect } from 'react';
import { Form, Stack } from 'react-bootstrap';
import './MemeEditor.scss';

type MemeEditorProps = {
  meme: File | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

function MemeEditor({ meme, canvasRef }: MemeEditorProps) {
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');
  const [topTextLength, setTopTextLength] = useState<number>(0);
  const [bottomTextLength, setBottomTextLength] = useState<number>(0);
  const maxTextLength = 50;

  const handleTopTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxTextLength) {
      setTopText(newText);
      setTopTextLength(newText.length);
    }
  };

  const handleBottomTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxTextLength) {
      setBottomText(newText);
      setBottomTextLength(newText.length);
    }
  };

  // Function to setup text styles
  const setupTextStyles = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'white';
    ctx.font = '50px impact';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
  };

  // Function to split text into multiple lines
  const splitTextIntoLines = (text: string, maxWidth: number): string[] => {
    // Split the text into words using the space character as the separator
    const words = text.split(' ');
    // Create an array to store the lines
    const lines = [];
    // Create a variable to store the current line
    let currentLine = '';

    words.forEach((word) => {
      if (currentLine.length + word.length <= maxWidth) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }
    // Add the current line to the lines array
    return lines;
  };

  useEffect(() => {
    const generateText = () => {
      if (!canvasRef.current || !meme) return; // handle the case where the canvas or image is null

      const canvas = canvasRef.current; // To interact with the canvas, we need to get the 2D context.
      const ctx = canvas.getContext('2d'); // 2D to render shapes, text, images, etc.

      const img = new Image(); // Create an image element
      img.src = URL.createObjectURL(meme); // Set the image source to the uploaded image

      img.onload = () => {
        if (!canvasRef.current || !ctx) return; // handle the case where the canvas or context is null

        canvas.width = 500; // Set dimensions
        canvas.height = 500;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing the image

        const aspectRatio = img.width / img.height;

        // Determine the dimensions of the scaled image based on the canvas size
        let scaledWidth = canvas.width;
        let scaledHeight = scaledWidth / aspectRatio;

        // If the scaled height is greater than the canvas height, scale the width based on the canvas height
        if (scaledHeight > canvas.height) {
          scaledHeight = canvas.height;
          scaledWidth = scaledHeight * aspectRatio;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image on the canvas

        // Call the function to setup text styles
        setupTextStyles(ctx);

        const maxLineWidth = canvas.width - 100; // Maximum width for the text (100 pixels from each side)
        const lineHeight = 50; // Height of each line

        // Split top and bottom text into multiple lines if needed
        const maxWidth = 20;
        const topLines = splitTextIntoLines(topText, maxWidth);
        const bottomLines = splitTextIntoLines(bottomText, maxWidth);

        // Draw top text
        topLines.forEach((line, index) => {
          ctx.fillText(line, canvas.width / 2, 30 + index * lineHeight);
        });

        // Draw bottom text
        bottomLines.forEach((line, index) => {
          ctx.fillText(
            line,
            canvas.width / 2,
            canvas.height - 80 - (bottomLines.length - index - 1) * lineHeight
          );
        });
        // Draw the text with black outline
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.fillStyle = 'transparent';
        topLines.forEach((line, index) => {
          ctx.strokeText(line, canvas.width / 2, 30 + index * lineHeight);
        });
        bottomLines.forEach((line, index) => {
          ctx.strokeText(
            line,
            canvas.width / 2,
            canvas.height - 80 - (bottomLines.length - index - 1) * lineHeight
          );
        });
      };
    };

    generateText();
  }, [meme, topText, bottomText]);

  return (
    <div className="meme-container">
      <Stack direction="horizontal" gap={3}>
        <div>{meme && <canvas ref={canvasRef} width={500} height={500} />}</div>

        <div className="text-inputs">
          <h3>Customes ton meme ! </h3>
          <Form.Text className="text-muted">
            {topTextLength}/{maxTextLength}
          </Form.Text>
          <input
            className="top-text form-control col-lg-8 mb-2"
            type="text"
            placeholder="Top Text"
            value={topText}
            onChange={handleTopTextChange}
            maxLength={maxTextLength}
          />

          <input
            className="bottom-text form-control col-lg-8 mb-2"
            type="text"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={handleBottomTextChange}
            maxLength={maxTextLength}
          />
          <Form.Text className="text-muted">
            {bottomTextLength}/{maxTextLength}
          </Form.Text>
        </div>
      </Stack>
    </div>
  );
}

export default MemeEditor;
