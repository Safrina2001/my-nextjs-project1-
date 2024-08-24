export default function Home() {
    return (
      <div>
        <h1>Welcome to Next.js!</h1>
      </div>
    );
  }
  const annotationRoutes = require('./routes/annotations');
  app.use('/api/annotations', annotationRoutes);
  
  