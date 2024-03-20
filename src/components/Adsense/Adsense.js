import React, { useEffect } from 'react';

const Adsense = () => {
  // useEffect(() => {
  //   (window.adsbygoogle = window.adsbygoogle || []).push({});
  // }, []);

  return (
    <div>
      <ins
        className="adsbygoogle h-[50%]"
        data-ad-client="ca-pub-8097044169349946"
        data-ad-slot="8028293203"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default Adsense;