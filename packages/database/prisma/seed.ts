import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function seed() {
  const alex = await prisma.appUser.create({
    data: {
      name: 'Linuxgunter',
      height: 179,
      weight: 74
    }
  })

  const laura = await prisma.appUser.create({
    data: {
      name: 'Lilis',
      height: 160,
      weight: 64
    }
  })

  const benchPress = await prisma.exercise.create({
    data: {
      name: 'Bench Press',
      category: 'Chest'
    }
  })

  const peckDeck = await prisma.exercise.create({
    data: {
      name: 'Peck Deck',
      category: 'Chest'
    }
  })

  const squat = await prisma.exercise.create({
    data: {
      name: 'Squat',
      category: 'Legs'
    }
  })

  await prisma.routine.create({
    data: {
      category: 'Chest',
      name: 'Default Chest Routine',
      routineExercises: {
        createMany: {
          data: [{ exerciseId: benchPress.id }, { exerciseId: peckDeck.id }]
        }
      },
      favoriteRoutine: {
        create: {
          userId: alex.id
        }
      }
    }
  })

  await prisma.routine.create({
    data: {
      category: 'Chest',
      name: 'Default Chest Routine',
      routineExercises: {
        create: {
          exerciseId: squat.id
        }
      },
      favoriteRoutine: {
        create: {
          userId: laura.id
        }
      }
    }
  })

  await prisma.set.create({
    data: {
      repetitions: 12,
      weight: 70,
      exerciseId: benchPress.id,
      feeling: 'Good',
      userId: alex.id
    }
  })

  await prisma.set.create({
    data: {
      repetitions: 10,
      weight: 70,
      exerciseId: benchPress.id,
      feeling: 'Good',
      userId: alex.id
    }
  })

  await prisma.set.create({
    data: {
      repetitions: 8,
      weight: 70,
      exerciseId: benchPress.id,
      feeling: 'Good',
      userId: alex.id
    }
  })

  await prisma.set.create({
    data: {
      repetitions: 8,
      weight: 40,
      exerciseId: squat.id,
      feeling: 'Good',
      userId: laura.id
    }
  })

  await prisma.goal.create({
    data: {
      targetSets: 5,
      targetWeight: 100,
      userId: alex.id,
      exerciseId: benchPress.id
    }
  })
}

seed()
  .then(() => console.log('Database seed was successful'))
  .catch((error) => console.error('Database seed error', error))
