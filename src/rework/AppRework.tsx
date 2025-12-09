import { MusicProvider } from '../contexts/MusicContext';
import { ConfigBar } from '../components/ConfigBar';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { LearnModeRework } from './components/LearnModeRework';
import './AppRework.css';

function AppRework() {
  return (
    <MusicProvider>
      <div className="app">
        <LoadingOverlay />
        <ConfigBar />
        <main className="main-content">
          <LearnModeRework />
        </main>
      </div>
    </MusicProvider>
  );
}

export default AppRework;
