import { PrismaClient } from '@prisma/client'
import * as bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = bcryptjs.hashSync('123456', 10)
  await prisma.appointment.deleteMany()
  await prisma.entrepreneurProfile.deleteMany()
  await prisma.user.deleteMany()

  // Cria usuário cliente
  const client = await prisma.user.create({
    data: {
      name: 'User Name',
      email: 'p2@correo.com',
      password: hashedPassword,
      role: 'client',
    },
  })

  // Cria usuário empreendedor com perfil
  const entrepreneur = await prisma.user.create({
    data: {
      name: 'Empreendedor João',
      email: 'p1@correo.com',
      password: hashedPassword,
      role: 'entrepreneur',
      profile: {
        create: {
          businessName: 'Cortes do João',
          themeColor: '#3498db',
          logoUrl: 'https://via.placeholder.com/150',
          description: 'Especialista em cortes masculinos modernos.',
          slug: 'joao-cortes',
          availableDays: ['monday', 'wednesday'],
          availableHours: ['09:00', '10:00', '11:00'],
          services: ['Corte simples', 'Barba completa'],
        },
      },
    },
    include: {
      profile: true,
    },
  })

  // Cria agendamento
  const appointment = await prisma.appointment.create({
    data: {
      clientId: client.id,
      entrepreneurId: entrepreneur.profile!.id,
      date: new Date('2025-04-21'), 
      time: '10:00:00', 
      notes: 'Quero corte + barba',
      status: 'confirmed',
    },
  })

  console.log('Client created:', client)
  console.log('Entrepreneur created:', entrepreneur)
  console.log('Appointment created:', appointment)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
