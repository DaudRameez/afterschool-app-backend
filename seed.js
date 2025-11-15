import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const lessons = [
  { id: 1, title: "Football", subject: "Sports", location: "Dubai", price: 50, spaces: 5, icon: "fa-futbol" },
{ id: 2, title: "Art & Craft", subject: "Arts", location: "Sharjah", price: 45, spaces: 5, icon: "fa-paint-brush" },
{ id: 3, title: "Coding Club", subject: "STEM", location: "Abu Dhabi", price: 65, spaces: 5, icon: "fa-code" },
{ id: 4, title: "Science Experiments", subject: "Science", location: "Dubai", price: 55, spaces: 5, icon: "fa-flask" },
{ id: 5, title: "Creative Writing", subject: "Language", location: "Sharjah", price: 40, spaces: 5, icon: "fa-pen-nib" },
{ id: 6, title: "Math Club", subject: "Mathematics", location: "Dubai", price: 35, spaces: 5, icon: "fa-square-root-alt" },
{ id: 7, title: "Music Band", subject: "Music", location: "Abu Dhabi", price: 50, spaces: 5, icon: "fa-music" },
{ id: 8, title: "Drama & Theatre", subject: "Performing Arts", location: "Sharjah", price: 60, spaces: 5, icon: "fa-theater-masks" },
{ id: 9, title: "Gardening Club", subject: "Environment", location: "Dubai", price: 30, spaces: 5, icon: "fa-leaf" },
{ id: 10, title: "Yoga & Fitness", subject: "Health", location: "Abu Dhabi", price: 50, spaces: 5, icon: "fa-dumbbell" },

]

const client = new MongoClient(process.env.MONGODB_URI)

async function seed() {
  await client.connect()
  const db = client.db('afterschool')
  await db.collection('activites').deleteMany({})
  await db.collection('activities').insertMany(lessons)
  console.log("Database seeded!")
  await client.close()
}

seed()
