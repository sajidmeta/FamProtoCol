"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const TeleApp: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'FamProtocolBot');  // Your Bot Username
    script.setAttribute('data-size', 'medium');  // Widget Size: small, medium, large
    script.setAttribute('data-auth-url','');  // Back-End Callback URL
    script.setAttribute('data-request-access', 'write');  // Permissions requested from the user
    document.getElementById('telegram-login')?.appendChild(script);
  }, []);

  const router = useRouter();

  useEffect(() => {
    // Function to handle API call after route change
    const handleRouteChange = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const telegramData = {
        id: urlParams.get('id'),
        first_name: urlParams.get('first_name'),
        last_name: urlParams.get('last_name'),
        username: urlParams.get('username'),
        photo_url: urlParams.get('photo_url'),
      };

      try {
        // Call your API route to save Telegram data
        const authToken = `Bearer ${ Cookies.get( '_fam_token' ) }`;
        console.log("step1, telegramData:",telegramData);
        const response = await axios.get( `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/telegram/callback`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
          },
          params:telegramData,
          withCredentials:true
        } );
        console.log("step2, response:",response);
      } catch (error) {
        console.error('Error saving Telegram data:', error);
        // notify('error','Failed to save Telegram data. Please try again.');
      }
    };

    // Trigger the function when URL changes
    handleRouteChange();

  }, [router]);


  return (
    <div className="App flex">
      <div id="telegram-login"></div>
    </div>
  );
};

export default TeleApp;
