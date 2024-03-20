import React, { useState, useEffect, useRef } from 'react';
import Sub from './Sub';

function SubDetail(props) {
const [pages, setPages] = useState([]);
const subType = props.subType;
const titleRef = useRef('');

useEffect(() => {
  async function fetchpages(cat) {
    const response = await fetch(`/api/subs/${cat}/0/20`);
    const data = await response.json();
    if (data[0]) setPages(data);
  }

  if (subType === 'music') {
    titleRef.current = 'Music';
    fetchpages(5);
  } else if (subType === 'comedie') {
    titleRef.current = 'Comedies';
    fetchpages(4);
  } else if (subType === 'series') {
    titleRef.current = 'Series';
    fetchpages(2);
  } else if (subType === 'films') {
    titleRef.current = 'Films';
    fetchpages(3);
  } else if (subType === 'others') {
    titleRef.current = 'Others';
    fetchpages(1);
  }
}, [subType]);

return (
<>
<div className="voir_plus_romance" id="voir_plus_romance">
<div className="mt-4 ml-6">
<label className="font-semibold text-blue-500">{titleRef.current}</label>
</div>
<div className="grid place-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:gap-y-12 md:ml-10 lg:grid-cols-4 lg:gap-y-12 lg:ml-10 xl:grid-cols-5 xl:ml-10 xl:gap-y-12">
{pages.map((page) => {
return <Sub key={page.ID} page={page} />;
})}
</div>
</div>
</>
);
}

export default SubDetail;