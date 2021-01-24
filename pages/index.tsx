import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import styles from '../styles/Home.module.css';
import NightSky from '../components/NightSky';
import { MessageTypeEnum } from '../models/MessageTypeEnum';

dayjs.extend(isBetween);

const pickRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const getMessage = (): { message: string; type: MessageTypeEnum } => {
  const hour = dayjs().hour();
  let message: string | undefined;
  let type: MessageTypeEnum | undefined;
  if (hour >= 20 && hour < 22) {
    message = 'I mean, why not.';
    type = MessageTypeEnum.Probably;
  } else if (hour === 22) {
    message = 'Yes.';
    type = MessageTypeEnum.NeutralYes;
  } else if (hour > 22 || hour < 2) {
    message = 'Yes. Seriously.';
    type = MessageTypeEnum.ConfidentYes;
  } else if (hour >= 2 && hour < 7) {
    message = 'Obviously YES !';
    type = MessageTypeEnum.ImperativeYes;
  } else {
    message = pickRandomItem(['Nope.', 'No.', 'Noppity nope.', 'Absolutely not.']);
    type = MessageTypeEnum.Nope;
  }

  return { message, type };
};

const Home: React.FC = () => {
  const typerRef = useRef<TypewriterClass>();
  const lastDisplayedMessageType = useRef<MessageTypeEnum>();

  useEffect(() => {
    setInterval(() => {
      const { message, type } = getMessage();

      if (type !== lastDisplayedMessageType.current) {
        const writer = typerRef.current;
        writer?.deleteAll().typeString(message).start();
      }
    }, 60000);
  }, []);

  return (
    <>
      <Head>
        <title>Should I go to sleep ?</title>
      </Head>

      <div className={styles.main}>
        <NightSky />
        <Typewriter
          onInit={(t) => {
            typerRef.current = t;
            const { message, type } = getMessage();
            lastDisplayedMessageType.current = type;

            t.typeString('Mmmmh...').pauseFor(1000).deleteAll().typeString(message).start();
          }}
        />
      </div>
    </>
  );
};

export default Home;
