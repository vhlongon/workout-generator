import { User } from '@prisma/client';
import { db } from './client';

const email = 'test@test.com';
const createMockData = async (): Promise<User> => {
  const user = await db.user.upsert({
    where: { email },
    update: {},
    create: {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '1',
      name: 'John Doe',
      email,
      workouts: {
        create: {
          name: 'Test Workout',
          target: 'FULL_BODY',
          mode: 'HYPERTROPHY',
          exercises: {
            create: [
              {
                name: 'Test Exercise 1',
                sets: 3,
                reps: [8, 12],
              },
              {
                name: 'Test Exercise 2',
                sets: 4,
                reps: [10, 15],
              },
            ],
          },
        },
      },
    },
    include: {
      workouts: {
        include: {
          exercises: true,
        },
      },
    },
  });

  return user;
};

createMockData()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
