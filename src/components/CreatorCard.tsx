import React from 'react'
import { CreatorType } from '../types/collection'
import { Skeleton } from './ui/skeleton';
import {Link} from 'react-router-dom'
// Credit to shadCn for an amazing collection of UI components
const CreatorCard = ({creator} : {creator: CreatorType}) => {
  const [loadingContext, setLoadingContext] = React.useState(true);
  return (
    <div className="w-[200px]">
      <Link to={`/view-creator/${creator.id}`}>
      <div className="overflow-hidden rounded-md">
        {loadingContext && <Skeleton className="w-[200px] h-[300px]" />}
          <img
            onLoad={() => setLoadingContext(false)}
            className={`${loadingContext ? 'hidden': ''} w-[200px] h-[300px] object-cover transition-all hover:scale-105 bg-gradient-to-r to-gray-800  hover:opacity-100 opacity-80`}
            src={creator.imageURL ? creator.imageURL : 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80'}
            alt={creator.name ? creator.name : 'creator'}
            width="200px"
            height="300px"
          />
      </div>
      </Link>
      <div className="space-y-1 pt-1">
        <h3 className="leading-none text-left text-lg font-bold line-clamp-1">{creator.name}</h3>
        <p className="text-left text-xs line-clamp-2">{creator.description}</p>
      </div>
    </div>
  );
}

export default CreatorCard