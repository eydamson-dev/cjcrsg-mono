import { Marquee } from '@/components/magicui/marquee';
import getPayloadClient from '@/lib/utils/getPayloadClient';
import Image from 'next/image';
import type { Media as MediaType } from '@/payload-types';

type MarqueColumnProps = { idx: number; imageArr: MediaType[] };

const MarqueColumn = ({ idx, imageArr }: MarqueColumnProps) => {
  const placeholder = 'https://placehold.co/600x400?text=placeholder';

  return (
    <Marquee reverse={idx % 2 === 0 ? true : false} pauseOnHover vertical className="[--duration:20s]">
      {imageArr.map(image => (
        <Image
          key={image.id}
          className="rounded-xl object-cover w-56 h-56"
          src={image?.url || placeholder}
          alt={image?.alt || ''}
          width={240}
          height={240}
        />
      ))}
    </Marquee>
  );
};

function distributeIntoThree<T>(arr: T[]): [T[], T[], T[]] {
  const result: [T[], T[], T[]] = [[], [], []];

  arr.forEach((item, index) => {
    result[index % 3].push(item);
  });

  return result;
}

export async function HeroMarquee() {
  const payload = await getPayloadClient();
  const images = await payload
    .find({
      collection: 'media',
      where: {
        tag: {
          equals: 'hero-marquee',
        },
      },
    })
    .then(data => {
      return data.docs || [];
    });

  const marqueeColumns = distributeIntoThree(images);

  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
      {marqueeColumns.map((imageArr, idx) => (
        <MarqueColumn key={idx} idx={idx} imageArr={imageArr} />
      ))}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background"></div>
    </div>
  );
}
