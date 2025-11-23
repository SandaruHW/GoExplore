
export const destinations = [
  {
    id: 'sl1',
    name: 'Sigiriya Rock Fortress',
    location: 'Central Province',
    country: 'Sri Lanka',
    description: 'Ancient rock citadel rising 200m with frescoes and panoramic views',
    longDescription: 'UNESCO World Heritage Site built in the 5th century. Known as the "Lion Rock", this ancient fortress features breathtaking frescoes and a palace on top with 360° jungle views.',
    rating: 4.9,
    reviews: 18300,
    image: 'https://images.pexels.com/photos/9013701/pexels-photo-9013701.jpeg', // Unsplash: Dramatic rock climb
    gallery: [
      'https://images.pexels.com/photos/9013701/pexels-photo-9013701.jpeg', // Main view
      'https://images.pexels.com/photos/6045035/pexels-photo-6045035.jpeg', // Pexels: Aerial shot
      'https://images.pexels.com/photos/999068/pexels-photo-999068.jpeg', // Pixabay: Frescoes (use direct download link from site)
    ],
    badge: 'Must-Visit',
    category: 'Heritage',
  },
  {
    id: 'sl2',
    name: 'Mirissa Beach',
    location: 'Southern Province',
    country: 'Sri Lanka',
    description: 'Golden sands, whale watching and epic sunsets',
    longDescription: 'Famous for whale & dolphin tours, rope swings and the best coconut cocktails in Sri Lanka.',
    rating: 4.8,
    reviews: 14200,
    image: 'https://images.pexels.com/photos/29644514/pexels-photo-29644514.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels: Aerial ocean view
    gallery: [
      'https://images.pexels.com/photos/29644514/pexels-photo-29644514.jpeg?auto=compress&cs=tinysrgb&w=800', // Main beach
      'https://images.unsplash.com/photo-1588666308234-832e7d3b07b9?w=800&h=600&fit=crop', // Unsplash: Palm-lined shore
    ],
    badge: 'Popular',
    category: 'Beaches',
  },
  {
    id: 'sl3',
    name: 'Ella',
    location: 'Uva Province',
    country: 'Sri Lanka',
    description: 'Misty hills, Nine Arch Bridge and scenic train rides',
    longDescription: 'Laid-back hill town surrounded by tea plantations and the iconic Nine Arch Bridge.',
    rating: 4.9,
    reviews: 15800,
    image: 'https://images.pexels.com/photos/12147639/pexels-photo-12147639.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels: Nine Arch Bridge with train
    gallery: [
      'https://images.pexels.com/photos/12147639/pexels-photo-12147639.jpeg?auto=compress&cs=tinysrgb&w=800', // Iconic bridge
      'https://images.unsplash.com/photo-1588673433079-0f8b1a8d2f0e?w=800&h=600&fit=crop', // Unsplash: Tea hills
      'https://pixabay.com/get/gd4e5f2a1b3c7e9f2a.jpg?attachment&format=jpg&token=exp=1732400000~hmac=example', // Pixabay: Scenic train (direct from site)
    ],
    badge: 'Trending',
    category: 'Nature',
  },
  {
    id: 'sl4',
    name: 'Kandy',
    location: 'Central Province',
    country: 'Sri Lanka',
    description: 'Temple of the Tooth and beautiful lake',
    longDescription: 'Cultural capital of Sri Lanka, home to the sacred Temple of the Tooth Relic.',
    rating: 4.7,
    reviews: 11200,
    image: 'https://images.pexels.com/photos/14041994/pexels-photo-14041994.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels: Temple reflection in lake
    gallery: [
      'https://images.pexels.com/photos/14041994/pexels-photo-14041994.jpeg?auto=compress&cs=tinysrgb&w=800', // Temple close-up
      'https://pixabay.com/get/gd5e6f3b4c8d1e2f3b.jpg?attachment&format=jpg&token=exp=1732400000~hmac=example', // Pixabay: Lake view
    ],
    badge: 'Cultural',
    category: 'Heritage',
  },
  {
    id: 'sl5',
    name: 'Yala National Park',
    location: 'Southern Province',
    country: 'Sri Lanka',
    description: 'Highest leopard density in the world',
    longDescription: 'Best place in Asia to see leopards in the wild + elephants and sloth bears.',
    rating: 4.8,
    reviews: 9800,
    image: 'https://images.pexels.com/photos/17281950/pexels-photo-17281950.jpeg', // Unsplash: Leopard in scrub
    gallery: [
      'https://images.pexels.com/photos/33130315/pexels-photo-33130315.jpeg', // Leopard spot
      'https://images.pexels.com/photos/1459398/pexels-photo-1459398.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels: Safari jeep with elephants
    ],
    badge: 'Wildlife',
    category: 'Nature',
  },
  {
    id: 'sl6',
    name: 'Galle Fort',
    location: 'Southern Province',
    country: 'Sri Lanka',
    description: 'UNESCO Dutch fort with ocean views',
    longDescription: 'Walk the ramparts at sunset and explore 400-year-old streets.',
    rating: 4.8,
    reviews: 10700,
    image: 'https://images.pexels.com/photos/2933943/pexels-photo-2933943.jpeg', // Pexels: Fort walls by sea
    gallery: [
      'https://images.pexels.com/photos/2405163/pexels-photo-2405163.jpeg?auto=compress&cs=tinysrgb&w=800', // Ramparts
      'https://images.unsplash.com/photo-1571993142257-e990d4f53f03?w=800&h=600&fit=crop', // Unsplash: Cobblestone streets
    ],
    badge: 'Heritage',
    category: 'Heritage',
  },
  {
    id: 'sl7',
    name: 'Unawatuna Beach',
    location: 'Southern Province',
    country: 'Sri Lanka',
    description: 'Coral reefs and turtle snorkeling',
    longDescription: 'Calm bay perfect for swimming and snorkeling with sea turtles.',
    rating: 4.7,
    reviews: 8900,
    image: 'https://images.pexels.com/photos/319893/pexels-photo-319893.jpeg', // Unsplash: Turquoise bay with palms
    gallery: [
      'https://images.unsplash.com/photo-1590523732602-0c4e6d4a3f3b?w=800&h=600&fit=crop', // Beach curve
      'https://images.pexels.com/photos/4166765/pexels-photo-4166765.jpeg?auto=compress&cs=tinysrgb&w=800', // Pexels: Snorkeling spot
    ],
    badge: 'Popular',
    category: 'Beaches',
  },
  {
    id: 'sl8',
    name: 'Colombo',
    location: 'Western Province',
    country: 'Sri Lanka',
    description: 'Vibrant capital with colonial charm',
    longDescription: 'Mix of colonial architecture, street food and modern skyline.',
    rating: 4.5,
    reviews: 7600,
    image: 'https://images.pexels.com/photos/30379285/pexels-photo-30379285.jpeg', // Pexels: Skyline with high-rises
    gallery: [
      'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800', // Modern skyline
      'https://images.unsplash.com/photo-1571993178476-2a0e7a17f0a9?w=800&h=600&fit=crop', // Unsplash: Colonial buildings
    ],
    badge: 'Urban',
    category: 'Cities',
  },
];