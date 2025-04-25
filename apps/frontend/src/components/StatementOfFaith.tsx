import Image from 'next/image';

export const StatementOfFaith = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse items-center md:flex-row gap-8 md:gap-12">
          <Image src="/CJC-Logo.svg" width={200} height={200} alt="cjcrsg logo" />

          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  Statement{' '}
                </span>
                of Faith
              </h2>
              <p className="text-xl mt-4 align-top text-justify text-primary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
