const CACHE_NAME = 'mon-site-cache-v1';
const CACHE_LOGO = 'mon-site-logo';
const cacheName = 'downloaded-videos-cache';

const urlsToCache = ['/downloads'];
const cache_logo = ['/logo/TeramaFlixpic.png', '/logo/TeramaFlixnam.png','/img/logo.png']

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
    // Cache the image logo
    caches.open(CACHE_LOGO).then((cache) => {
      fetch(cache_logo[0]).then((response) => {
        cache.put(cache_logo[0], response.clone());
      });
    }),
    caches.open(CACHE_LOGO).then((cache) => {
      fetch(cache_logo[1]).then((response) => {
        cache.put(cache_logo[1], response.clone());
      });
    }),
    caches.open(CACHE_LOGO).then((cache) => {
      fetch(cache_logo[2]).then((response) => {
        cache.put(cache_logo[2], response.clone());
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request && event.request.url && event.request.url.endsWith('.mp4')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchedResponse) => {
          console.log(`Video fetched: ${event.request.url}`);
          return fetchedResponse;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});


self.addEventListener('message', (event) => {
  console.log('Message received:', event.data);

  if (event.data && event.data.type === 'CACHE_VIDEO') {
    const {
      url,
      video_Image,
      Body,
      Cat,
      CatPage,
      Categorie,
      Category,
      Channel,
      Cover,
      Created_at,
      Hours,
      ID,
      Image,
      Likes,
      Mail,
      NextVideo,
      PageName,
      PageCreated,
      Photo,
      Short,
      Title,
      User,
      UserId,
      Uuid,
      Video,
      Views,
      Visible,
      uniid,
    } = event.data;

    const newUrl ='/Watch?v=' + uniid;

    caches.open(CACHE_NAME).then((cache) => {
      cache.add(newUrl);
      console.log(`URL cached: ${newUrl}`);
    });

    // Cache the video with correct Content-Type
    caches.open(cacheName).then(async (cache) => {
      try {
        const videoResponse = await fetch(url);

        if (!videoResponse.ok) {
          throw new Error(`Failed to fetch video: ${url}`);
        }

        const videoBlob = await videoResponse.blob();
        console.log(videoBlob);
        await cache.put(url, new Response(videoBlob, {
          headers: { 'Content-Type': 'video/mp4' }
        }));
        console.log(`Video cached: ${url}`);
      } catch (error) {
        console.error('Error caching video:', error);
      }
    });

    // Cache the video image
    caches.open(cacheName).then((cache) => {
      console.log("Photo_Image",Photo)
      fetch(video_Image).then((response) => {
        cache.put(video_Image, response.clone());
        console.log('Image cached successfully.');
      });
    });

    // Create video data object
    const videoCacheData = {
      Body,
      Cat,
      CatPage,
      Categorie,
      Category,
      Channel,
      Cover,
      Created_at,
      Hours,
      ID,
      Image,
      Likes,
      Mail,
      NextVideo,
      PageName,
      PageCreated,
      Photo,
      Short,
      Title,
      User,
      UserId,
      Uuid,
      Video,
      Views,
      Visible,
      uniid,
    };

    // Cache the video data as JSON using a unique key
    const videoDataKey = `video-${videoCacheData.uniid}_data`; // Create unique key
    caches.open(cacheName).then((cache) => {
      const videoDataJson = JSON.stringify(videoCacheData);
      return cache.put(videoDataKey, new Response(videoDataJson)); // Added return
    }).then(() => {
      console.log('Video data cached successfully.');
    });
  }
});

/*const CACHE_NAME = 'mon-site-cache-v1';
const CACHE_LOGO = 'mon-site-logo';
const cacheName = 'downloaded-videos-cache';

const urlsToCache = ['/downloads'];
const cache_logo = ['/logo/TeramaFlixpic.png', '/logo/TeramaFlixnam.png','/img/logo.png']

self.addEventListener('install', (event) => {
  console.log('Service worker installed');

  const cachePromises = [
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
    ...cache_logo.map((logoUrl) =>
      caches.open(CACHE_LOGO).then((cache) => {
        return fetch(logoUrl).then((response) => cache.put(logoUrl, response.clone()));
      })
    )
  ];

  event.waitUntil(Promise.all(cachePromises));
  self.skipWaiting();
});


self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Check if it's a video request
  if (request.url && request.url.endsWith('.mp4')) {
    event.respondWith(cacheVideo(request));
  } else {
    // Handle other requests (optional: customize behavior)
    event.respondWith(caches.match(request).then((response) => response || fetch(request)));
  }
});

async function cacheVideo(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log(`Video served from cache: ${request.url}`);
    return cachedResponse;
  }

  const fetchedResponse = await fetch(request);
  console.log(`Video fetched: ${request.url}`);
  const cache = await caches.open(CACHE_NAME); // Assuming CACHE_NAME is defined
  await cache.put(request, fetchedResponse.clone()); // Clone to avoid modifying original response
  return fetchedResponse;
}




self.addEventListener('message', async (event) => {
  console.log('Message received:', event.data);

  if (event.data && event.data.type === 'CACHE_VIDEO') {
    const { url, video_Image, uniid, ...videoData } = event.data; // Destructure data

    const newUrl = `/Watch?v=${uniid}`;

    try {
      // Cache the video with correct Content-Type
      const cache = await caches.open(CACHE_NAME);
      const videoResponse = await fetch(url);

      if (!videoResponse.ok) {
        throw new Error(`Failed to fetch video: ${url}`);
      }

      const videoBlob = await videoResponse.blob();
      await cache.put(url, new Response(videoBlob, { headers: { 'Content-Type': 'video/mp4' } }));
      console.log(`Video cached: ${url}`);

      // Cache the video image
      await cache.put(video_Image, await fetch(video_Image).then((response) => response.clone()));
      console.log('Image cached successfully.');

      // Cache the video data as JSON using a unique key
      const videoDataKey = `video-${uniid}_data`;
      const videoDataJson = JSON.stringify(videoData);
      await cache.put(videoDataKey, new Response(videoDataJson));
      console.log('Video data cached successfully.');

      // Update UI or notify user (optional)
      // ...

    } catch (error) {
      console.error('Error caching video or image:', error);
      // Handle errors appropriately (e.g., notify user)
    }
  }
});


*/