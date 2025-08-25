import { AppProvider } from '../context/AppContext';
import CustomCursor from '../components/CustomCursor';
import './globals.css';

export const metadata = {
  title: 'MovingBytes - AI-Driven Technology Solutions Partner',
  description: 'From Data to Deployment. Custom AI models, data services, full-stack development, and cybersecurity solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <CustomCursor />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}