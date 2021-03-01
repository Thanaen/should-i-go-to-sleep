import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/Home.module.css';
import NightSky from '../components/NightSky';
import MessageTypeEnum from '../models/MessageTypeEnum';

dayjs.extend(isBetween);

const pickRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const typerRef = useRef<TypewriterClass>();
  const lastDisplayedMessageType = useRef<MessageTypeEnum>();

  const getMessage = (): { message: string; type: MessageTypeEnum } => {
    const hour = dayjs().hour();
    let message: string | undefined;
    let type: MessageTypeEnum | undefined;
    if (hour >= 20 && hour < 22) {
      message = pickRandomItem(t('messages.mokayList', { returnObjects: true }));
      type = MessageTypeEnum.Probably;
    } else if (hour === 22) {
      message = pickRandomItem(t('messages.yesList', { returnObjects: true }));
      type = MessageTypeEnum.NeutralYes;
    } else if (hour > 22 || hour < 2) {
      message = pickRandomItem(t('messages.clearlyYesList', { returnObjects: true }));
      type = MessageTypeEnum.ConfidentYes;
    } else if (hour >= 2 && hour < 7) {
      message = pickRandomItem(t('messages.obviouslyList', { returnObjects: true }));
      type = MessageTypeEnum.ImperativeYes;
    } else {
      message = pickRandomItem(t('messages.nopeList', { returnObjects: true }));
      type = MessageTypeEnum.Nope;
    }

    return { message, type };
  };

  useEffect(() => {
    setInterval(() => {
      const { message, type } = getMessage();

      if (type !== lastDisplayedMessageType.current) {
        const writer = typerRef.current;
        writer?.deleteAll().typeString(message).start();
      }
    }, 60000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
      </Head>

      <div className={styles.main}>
        <NightSky />
        <Typewriter
          onInit={(typeWriter) => {
            typerRef.current = typeWriter;
            const { message, type } = getMessage();
            lastDisplayedMessageType.current = type;

            typeWriter
              .typeString('Mmmmh...')
              .pauseFor(1000)
              .deleteAll()
              .typeString(message)
              .start();
          }}
        />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }): Promise<unknown> => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
