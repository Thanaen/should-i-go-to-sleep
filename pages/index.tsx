import React from 'react';
import Head from 'next/head';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const getMessage = () => {
  const hour = dayjs().hour();
  let message: string | undefined;
  if (hour >= 20 && hour < 22) {
    message = 'I mean, why not.';
  } else if (hour === 22) {
    message = 'Yes.';
  } else if (hour > 22 || hour < 2) {
    message = 'Yes. Seriously.';
  } else if (hour >= 2 && hour < 7) {
    message = 'Obviously YES !';
  } else {
    message = 'Nope.';
  }

  return message;
};

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Should I go to sleep ?</title>
      </Head>
      <span>
        <Typist>
          Mmmmh...
          <Typist.Delay ms={500} /> {getMessage()}
        </Typist>
      </span>
    </>
  );
};

export default Home;
