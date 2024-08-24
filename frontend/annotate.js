import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AnnotateVideo = () => {
  const videoRef = useRef(null);
  const [annotations, setAnnotations] = useState([]);
  const [currentAnnotation, setCurrentAnnotation] = useState(null);

  const handleVideoClick = (e) => {
    const rect = videoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentAnnotation({
      position: { x, y },
      timestamp: videoRef.current.currentTime,
      comment: '',
      text: '',
    });
  };

  const handleSaveAnnotation = () => {
    if (currentAnnotation) {
      axios.post('/api/annotations', {
        ...currentAnnotation,
        videoId: 'someVideoId',
      }).then(response => {
        setAnnotations([...annotations, response.data]);
        setCurrentAnnotation(null);
      });
    }
  };

  useEffect(() => {
    axios.get('/api/annotations/someVideoId').then(response => {
      setAnnotations(response.data);
    });
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        width="600"
        onClick={handleVideoClick}
        controls
      >
        <source src="path/to/your/video.mp4" type="video/mp4" />
      </video>
      {currentAnnotation && (
        <div style={{
          position: 'absolute',
          left: currentAnnotation.position.x,
          top: currentAnnotation.position.y,
          background: 'rgba(255, 255, 0, 0.5)',
        }}>
          <input
            type="text"
            placeholder="Comment"
            value={currentAnnotation.comment}
            onChange={(e) => setCurrentAnnotation({
              ...currentAnnotation,
              comment: e.target.value,
            })}
          />
          <input
            type="text"
            placeholder="Text"
            value={currentAnnotation.text}
            onChange={(e) => setCurrentAnnotation({
              ...currentAnnotation,
              text: e.target.value,
            })}
          />
          <button onClick={handleSaveAnnotation}>Save</button>
        </div>
      )}
      {annotations.map((annotation, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: annotation.position.x,
            top: annotation.position.y,
            background: 'rgba(255, 0, 0, 0.5)',
          }}
        >
          <p>{annotation.comment}</p>
          <p>{annotation.text}</p>
        </div>
      ))}
    </div>
  );
};

export default AnnotateVideo;
useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = videoRef.current.currentTime;
      setAnnotations(annotations.filter(annotation => {
        return Math.abs(annotation.timestamp - currentTime) < 0.5;
      }));
    }, 100);
    return () => clearInterval(interval);
  }, [annotations]);
  