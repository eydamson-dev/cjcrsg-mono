import { JSX } from 'react';

import { GiftIcon, MapIcon, MedalIcon, PlaneIcon } from '@/components/Icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover';

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

/**
 * sunday service
 * youth service
 * midweek service
 */

export function DirectionAwareHoverDemo() {
  const imageUrl =
    '/CJC-Logo.svg';
  return (
    <div className="h-[40rem] relative  flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
        <p className="font-bold text-xl">In the mountains</p>
        <p className="font-normal text-sm">$1299 / night</p>
      </DirectionAwareHover>
    </div>
  );
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: 'Accessibility',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum',
  },
  {
    icon: <MapIcon />,
    title: 'Community',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum',
  },
  {
    icon: <PlaneIcon />,
    title: 'Scalability',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum',
  },
  {
    icon: <GiftIcon />,
    title: 'Gamification',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum',
  },
];

export const Schedules = () => {
  return (
    <section id="schedules" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        Find{' '}
        <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Your Time{' '}
        </span>
        for Worship
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Let’s celebrate faith together! Check out our service times and join us.
      </p>
      <div>
        <DirectionAwareHoverDemo />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
