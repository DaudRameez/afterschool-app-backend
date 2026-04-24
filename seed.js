import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const lessons = [
  { id: 1,  subject: 'Football',            location: 'Dubai',     price: 50, spaces: 5, icon: 'fa-futbol',           image: '/images/football.png' },
  { id: 2,  subject: 'Art & Craft',         location: 'Sharjah',   price: 45, spaces: 5, icon: 'fa-paint-brush',      image: '/images/art.png' },
  { id: 3,  subject: 'Coding Club',         location: 'Abu Dhabi', price: 65, spaces: 5, icon: 'fa-code',             image: '/images/coding.png' },
  { id: 4,  subject: 'Science Experiments', location: 'Dubai',     price: 55, spaces: 5, icon: 'fa-flask',            image: '/images/science.png' },
  { id: 5,  subject: 'Creative Writing',    location: 'Sharjah',   price: 40, spaces: 5, icon: 'fa-pen-nib',          image: '/images/writing.png' },
  { id: 6,  subject: 'Math Club',           location: 'Dubai',     price: 35, spaces: 5, icon: 'fa-square-root-alt',  image: '/images/math.png' },
  { id: 7,  subject: 'Music Band',          location: 'Abu Dhabi', price: 50, spaces: 5, icon: 'fa-music',            image: '/images/music.png' },
  { id: 8,  subject: 'Drama & Theatre',     location: 'Sharjah',   price: 60, spaces: 5, icon: 'fa-theater-masks',    image: '/images/drama.png' },
  { id: 9,  subject: 'Gardening Club',      location: 'Dubai',     price: 30, spaces: 5, icon: 'fa-leaf',             image: '/images/gardening.png' },
  { id: 10, subject: 'Yoga & Fitness',      location: 'Abu Dhabi', price: 50, spaces: 5, icon: 'fa-dumbbell',         image: '/images/yoga.png' }
]

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  const db = client.db('afterschool')
  await db.collection('lessons').deleteMany({})
  await db.collection('lessons').insertMany(lessons)
  console.log('Database seeded with', lessons.length, 'lessons')
  await client.close()
}

seed().catch(err => { console.error(err); process.exit(1) })
