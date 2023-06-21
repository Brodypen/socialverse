import React from 'react'
import { CreatorType } from '../types/collection'
import { Skeleton } from './ui/skeleton';

// Credit to https://github.com/shadcn/ui/tree/main/apps/www/app/examples/music
const CreatorCard = ({creator} : {creator: CreatorType}) => {
  const [loadingContext, setLoadingContext] = React.useState(true);
  return (
    <div className="w-[200px]">
      <div className="overflow-hidden rounded-md">
        {loadingContext && <Skeleton className="w-[200px] h-[330px]" />}
          <img
            onLoad={() => setLoadingContext(false)}
            className={`${loadingContext ? 'hidden': ''} h-auto w-auto object-cover transition-all hover:scale-105 bg-gradient-to-r to-gray-800  hover:opacity-100 opacity-80`}
            src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80"
            width="200"
            height="330"
          />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="leading-none font-medium">{creator.name}</h3>
      </div>
    </div>
  );
}

export default CreatorCard