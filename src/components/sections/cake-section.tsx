import Image from 'next/image';

const Balloon = ({ className, colorClass, style }: { className?: string, colorClass: string, style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 100 125"
    className={`absolute w-24 h-32 drop-shadow-lg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M50,5C25.1,5,5,25.1,5,50s20.1,45,45,45s45-20.1,45-45S74.9,5,50,5z M50,90C27.9,90,10,72.1,10,50S27.9,10,50,10s40,17.9,40,40S72.1,90,50,90z"
      className={`${colorClass} opacity-80`}
      fill="currentColor"
    />
    <path
      d="M50,100c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S52.8,100,50,100z"
      className={`${colorClass} opacity-80`}
      fill="currentColor"
    />
    <path
      d="M48.5,115h3c0.6,0,1-0.4,1-1v-14c0-0.6-0.4-1-1-1h-3c-0.6,0-1,0.4-1,1v14C47.5,114.6,47.9,115,48.5,115z"
      className={`${colorClass} opacity-80`}
      fill="currentColor"
    />
    <path 
      d="M 65 25 C 60 20, 50 20, 40 30 C 35 35, 35 45, 40 50" 
      fill="none" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round"
      className="opacity-50"
    />
  </svg>
);


export function CakeSection() {
  return (
    <section id="cake" className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-primary/10">
      <div className="text-center z-10">
        <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90 animate-wiggle">
          Have a Slice!
        </h2>
        <p className="mt-4 font-body text-lg text-muted-foreground max-w-md mx-auto">
          Here's a little something sweet to celebrate your special day. Make a wish!
        </p>
      </div>
      
      <div className="relative mt-12 flex items-center justify-center z-10">
        <div className="animate-bobbing">
          <Image
            src="https://placehold.co/400x400.png"
            alt="A delicious birthday cake"
            width={400}
            height={400}
            className="rounded-full shadow-2xl object-cover border-8 border-background"
            data-ai-hint="birthday cake"
          />
        </div>

        {/* Balloons */}
        <div className="absolute inset-0">
          <Balloon className="bottom-0 -left-40 animate-bobbing" style={{ animationDelay: '0.5s' }} colorClass="text-accent" />
          <Balloon className="-top-20 -right-48 animate-bobbing" style={{ animationDelay: '1s' }} colorClass="text-secondary" />
          <Balloon className="-bottom-20 -right-32 animate-bobbing" style={{ animationDelay: '0.2s' }} colorClass="text-primary" />
          <Balloon className="top-10 -left-56 animate-bobbing" style={{ animationDelay: '1.2s' }} colorClass="text-yellow-300" />
        </div>
      </div>
    </section>
  );
}
