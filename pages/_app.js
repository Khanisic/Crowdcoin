import { CampaignProvider } from '../context/CampaignContext'
import '../styles/globals.css';

const Campaign = ({ Component, pageProps }) => (

  <CampaignProvider>
    <Component {...pageProps} />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600&family=Poppins:wght@600&display=swap');
    </style>

  </CampaignProvider>

);


export default Campaign
