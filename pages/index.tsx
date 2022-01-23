import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// components
import AppHead from '@/components/atoms/Head';
import AppHeader from '@/components/organisms/AppHeader';
import AppHero from '@/components/atoms/Hero';
import AppSection from '@/components/atoms/Section';
import AppBanner from '@/components/atoms/Banner';
import AppFooter from '@/components/atoms/Footer';
import AppNearby from '@/components/atoms/Nearby';
import AppMobileNavigation from '@/components/atoms/NavigationMobile';
// typings
import { IExploreNearby, ILiveAnywhere } from 'typings';

interface IHomeDataProps {
  exploreNearby: IExploreNearby[];
  liveAnywhere: ILiveAnywhere[];
}

const Home: FC<IHomeDataProps> = ({ exploreNearby, liveAnywhere }) => {
  return (
    <>
      <AppHead />
      <AppHeader exploreNearby={exploreNearby} />
      <main>
        {/* hero */}
        <AppHero />
        {/* explore nearby section */}
        <AppSection
          title="Explore Nearby"
          className="grid grid-cols-2 lg:gap-x-4 gap-x-1 gap-y-2 sm:grid-cols-3 lg:grid-cols-4"
        >
          {exploreNearby.map((data, index) => (
            <AppNearby key={index} data={data} />
          ))}
        </AppSection>
        {/* live anywhere section */}
        <AppSection
          title="Live Anywhere"
          className="grid grid-cols-2 lg:gap-x-4 gap-x-1 gap-y-2 lg:grid-cols-4"
        >
          {liveAnywhere.map((data, index) => (
            <Link key={index} href="/search">
              <a>
                <div className="p-2 duration-300 lg:p-3 gap-y-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl">
                  <div className="relative w-full h-40 mb-2 md:h-60 lg:h-72">
                    <Image
                      src={data.img}
                      alt={data.title}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL={data.img}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium leading-5 text-gray-500 text-md md:text-xl">
                      {data.title}
                    </h3>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </AppSection>
        {/* bottom banner */}
        <AppBanner />
      </main>
      {/* footer */}
      <AppFooter />
    </>
  );
};

export const getStaticProps = async () => {
  const exploreNearbyResponse = await fetch('https://jsonkeeper.com/b/4G1G');
  const exploreNearby = await exploreNearbyResponse.json();

  const liveAnywhereResponse = await fetch('https://jsonkeeper.com/b/VHHT');
  const liveAnywhere = await liveAnywhereResponse.json();

  return {
    props: { exploreNearby, liveAnywhere },
  };
};

export default Home;
