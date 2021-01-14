import React from 'react';
import Head from 'next/head';
import Typewriter from 'typewriter-effect';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import styles from '../styles/Home.module.css';
import NightSky from '../components/NightSky';

dayjs.extend(isBetween);

const pickRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const getMessage = (): string => {
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
    message = pickRandomItem(['Nope.', 'No.', 'Noppity nope.', 'Absolutely not.']);
  }

  return message;
};

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Should I go to sleep ?</title>
      </Head>

      <div className={styles.main}>
        <NightSky />
        <Typewriter
          onInit={(t) => {
            t.typeString('Mmmmh... ').pauseFor(1000).deleteAll().typeString(getMessage()).start();
          }}
        />
      </div>
    </>
  );
};

export default Home;
