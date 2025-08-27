import { AppProvider } from '../context/AppContext';
import CustomCursor from '../components/CustomCursor';
import './globals.css';

// This metadata applies to all pages but can be overridden by specific pages
export const metadata = {
  title: {
    template: '%s | MovingBytes',
    default: 'MovingBytes - AI & Cybersecurity Solutions',
  },
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