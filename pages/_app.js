import { StyledEngineProvider } from '@mui/material/styles';
import { createStytchUIClient } from '@stytch/nextjs/ui';
import CssBaseline from '@mui/material/CssBaseline';
import { StytchProvider } from '@stytch/nextjs';

import Layout from '../components/layout/Layout';
import '../styles/globals.css';

const stytch = createStytchUIClient(process.env.NEXT_PUBLIC_STYTCH_TOKEN);

function MyApp({ Component, pageProps }) {
  return (
    <StytchProvider stytch={stytch}>
      {/* give custom styles precedence over Meterial Ui built-in styles */}
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyledEngineProvider>
    </StytchProvider >
  );
}

export default MyApp;
