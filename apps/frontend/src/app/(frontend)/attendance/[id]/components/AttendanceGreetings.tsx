'use client';

import { useRef } from 'react';

import { Schedule, User } from '@/payload-types';

import { AuroraText } from '@/components/magicui/aurora-text';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  event: Schedule;
  user: User;
};

export const AttendanceGreetings = ({ event, user }: Props) => {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="relative max-w-2xl overflow-hidden">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{new Date(event.date).toDateString()}</CardDescription>
          {event.description && (
            <CardDescription>
              <p>Description: {event.description}</p>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <SparklesText className="text-3xl">
            Thank you for joining us <AuroraText>{user?.name}</AuroraText> — your attendance is
            recorded!
          </SparklesText>
        </CardContent>
        <BorderBeam duration={10} size={100} />
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
      </Card>
    </div>
  );
};
