import { Inter } from 'next/font/google';
import { GetServerSidePropsContext } from 'next';
import WeatherScreen from '../../src/screens/weather';

const inter = Inter({ subsets: ['latin'] })

export default function Home(props: any) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <WeatherScreen data={props.data} error={props.error} />
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: any }> {
  let componentServerSideProps = await WeatherScreen.getServerSideProps(context);
  return {
      props: {
          ...componentServerSideProps.props,
      }
  };
}