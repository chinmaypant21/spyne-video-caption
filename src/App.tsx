import { Suspense, lazy, useState } from 'react';

const Player = lazy(() => import('./components/Player/Player'))
import Loading from './components/Loading/Loading';
import { isValidHttpUrl } from './libs/url';

import './App.css'

function App() {
  const [videoURL, setVideoURL] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const handleLoadVideo = () => {
    if(isValidHttpUrl(videoURL)){
      setShow(true);
    } else {
      alert('This is not a valid URL')
    }
  };

  return (
    <div className='home-container'>
      <div className='search-container'>
        <input
          type="text"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          placeholder="Enter Video URL"
        />

        <button onClick={handleLoadVideo}>Go</button>
      </div>

      {
        show && (
          <Suspense fallback={<Loading />}>
            <Player src={videoURL} />
          </Suspense>
        )
      }
    </div>
  )
}

export default App
